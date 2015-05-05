(function() {
	/*
	Author: Damian Kao
	E-mail: damian.kao@gmail.com
	*/

	seeker = {};
	seeker.util = {}

	seeker.util.move = function(ar, old_index, new_index) {
        if (new_index >= ar.length) {
            var k = new_index - ar.length;
            while ((k--) + 1) {
                    ar.push(undefined);
            }
        }
        ar.splice(new_index, 0, ar.splice(old_index, 1)[0]);
	};

	seeker.util.unionCoords = function(positions) {
		var count = 0;
	    var posA = 0;
	    var out = [];
	    for (var i = 0 ; i < positions.length ; i ++ ) {
	        var position = positions[i];
	        if (count == 0) {
	            posA = position[1];
	        }
	        if (position[0] == 's') {
	            count += 1;
	        }
	        if (position[0] == 'e') {
	            count -= 1;
	        }

	        if (count == 0) {
	            out.push([posA, position[1]])
	        }
	    }

	    return out;
	};

	seeker.util.stableSortCoords = function(coords) {
		var positions = [];
        for (var i = 0 ; i < coords.length ; i ++ ) {
	        var coord = coords[i];
	        positions.push(['s',Math.min(coord[0], coord[1])]);
	        positions.push(['e',Math.max(coord[0], coord[1])]);
	    } 

	    positions.sort(function(a,b) {return a[0] > b[0] ? -1 : 1});

	    for (var i = 0 ; i < positions.length ; i ++ ) {
	        positions[i].push(i);
	    }

	    positions.sort(function(a,b) {
	        if (a[1] === b[1]) {    
	            return a[2] - b[2];
	        } else if (a[1] > b[1]) {
	            return 1;
	        } else {
	            return -1;
	        }
	    })

	    return positions;
	}

	seeker.util.coordLength = function(coords) {
		var total = 0;
	    for (var i = 0 ; i < coords.length ; i ++ ) {
	        total += coords[i][1] - coords[i][0] + 1
	    }
	    return total
	}

	seeker.util.formatRef = function(d) {
	    var refObj = d

	    //create additonal structures
	    refObj['featIndex'] = {};
	    refObj['intervals'] = [];
	    refObj['typeIndex'] = {};

	    for (var i = 0 ; i < refObj.types.length ; i ++ ) {
	        refObj.typeIndex[refObj.types[i]] = [];
	    }

	    for (var i = 0 ; i < refObj.feats.length ; i ++ ) {
	        refObj['featIndex'][refObj.feats[i].name] = refObj.feats[i];

	        var coords = refObj.feats[i].coords;

	        for (var a = 0 ; a < coords.length ; a ++ ) {
	            refObj.intervals.push(refObj.feats[i].start + coords[a][0]);
	            refObj.intervals.push(refObj.feats[i].start + coords[a][0] + coords[a][1]);
	        }

	        refObj.typeIndex[refObj.feats[i].type].push(refObj.feats[i]);
	    }

	    refObj['cf_feat'] = crossfilter(refObj.feats);
	    refObj['dim_start'] = refObj['cf_feat'].dimension(function(d) {return d.start});
	    refObj['dim_end'] = refObj['cf_feat'].dimension(function(d) {return d.end});
	    refObj['dim_type'] = refObj['cf_feat'].dimension(function(d) {return d.type});
	    refObj['levelIndex'] = {};
	    refObj['sumLevels'] = 0;
	}

	seeker.util.within = function(pos, coord) {
		if (pos >= coord[0] && pos <= coord[1]) {
			return true;
		}

		return false;
	}

	seeker.util.overlap = function(coordA, coordB) {
		if (seeker.util.within(coordA[0], coordB) || seeker.util.within(coordA[1], coordB) || seeker.util.within(coordB[0], coordA) || seeker.util.within(coordB[1], coordA)) {
			return true;
		}

		return false;
	}

	seeker.util.winDimensions = function() {
		if (typeof window.innerWidth !== 'undefined') {
			return [window.innerWidth,window.innerHeight];
		} else {
			return [document.getElementsByTagName('body')[0].clientWidth,document.getElementsByTagName('body')[0].clientHeight];
		}
	}

	seeker.util.mouseCoord = function(e) {
		e = e || window.event;
		var x = 0;
		var y = 0;

		if (e.pageX || e.pageY) {
			x = e.pageX -
			    (document.documentElement.scrollLeft || 
			    document.body.scrollLeft) +
			    document.documentElement.clientLeft;
			y = e.pageY -
			    (document.documentElement.scrollTop || 
			    document.body.scrollTop) +
			    document.documentElement.clientTop;;
		} else {
			x = e.clientX;
			y = e.clientY;
		}

		if (arguments[1]) {
			x += (document.documentElement.scrollLeft || 
			    document.body.scrollLeft) - 
			    document.documentElement.clientLeft;
			y += (document.documentElement.scrollTop || 
			    document.body.scrollTop) - 
			    document.documentElement.clientTop;
		}

		return [x,y];
	}

	seeker.util.injectScript = function(fileName, postLoad) {
		var old = document.getElementById('uploadScript');  
		var head = document.getElementsByTagName("head")[0];  

		if (old != null) {  
			for (var prop in old) {
				delete old[prop];
			}

			head.removeChild(old);  
			delete old;  
		} 

		var head = document.getElementsByTagName("head")[0];  
		script = document.createElement('script');  
		script.id = 'uploadScript';  
		script.type = 'text/javascript';  
		script.src = fileName;
		script.onload = postLoad;
		head.appendChild(script); 
	}

	seeker.util.pool = function(t) {
		this.type = t;
		this.free = [];
		this.created = 0;

		this.get = function() {
			if (this.free.length == 0) {
				var pool = this;
				var e = d3.ns.qualify(t);

    			var obj = e.local ? document.createElementNS(e.space, e.local) : document.createElement(e);
				obj.free = function() {
					d3.select(obj).on('click',null)
					obj.parentNode.removeChild(obj);
					pool.free.push(obj);
				}

				this.created += 1;

				return obj;
			} else {
				return this.free.pop();
			}
		}

		return this;
	}

	seeker.util.nearestInterval = function(intervals, query) {
		var i = 0
		var minDiff = Math.abs(query - intervals[0]);
	    var out = intervals[0];
	    for(i in intervals){
	         var dist = Math.abs(query - intervals[i]);
	         if(dist < minDiff){ 
	                minDiff = dist; 
	                out = intervals[i]; 
	            }
	      }
	    return [out, minDiff];
	}

	seeker.util.clone = function(obj) {
		//from stackoverflow
		//http://stackoverflow.com/questions/728360/most-elegant-way-to-clone-a-javascript-object
		var copy;

		// Handle the 3 simple types, and null or undefined
		if (null == obj || "object" != typeof obj) return obj;

		// Handle Date
		if (obj instanceof Date) {
		    copy = new Date();
		    copy.setTime(obj.getTime());
		    return copy;
		}

		// Handle Array
		if (obj instanceof Array) {
		    copy = [];
		    for (var i = 0, len = obj.length; i < len; i++) {
		        copy[i] = seeker.util.clone(obj[i]);
		    }
		    return copy;
		}

		// Handle Object
		if (obj instanceof Object) {
		    copy = {};
		    for (var attr in obj) {
		        if (obj.hasOwnProperty(attr)) copy[attr] = seeker.util.clone(obj[attr]);
		    }
		    return copy;
		}

	    throw new Error("Unable to copy obj! Its type isn't supported.");
	}
	

	//control

	seeker.base = function(e) {
		e = d3.ns.qualify(e);

    	this.container = d3.select(e.local ? document.createElementNS(e.space, e.local) : document.createElement(e));
    	this.container
    		.on('mousedown',function(evt) {
    			d3.event.stopPropagation();
    			document.activeElement.blur();
    		});

    	this.container.seeker = this;

    	return this;
	}

	seeker.base.prototype.attachTo = function(parent) {
		parent.appendChild(this.container.node());

		return this;
	}

	seeker.base.prototype.whxy = function(w,h,x,y) {
		var c = this.container;
		c
			.style('width',(w != -1) ? w : c.node().style.width)
			.style('height',(h != -1) ? h : c.node().style.height)
			.style('left',(x != -1) ? x : c.node().style.left)
			.style('top',(y != -1) ? y : c.node().style.top);

		return this;
	}

	seeker.base.prototype.id = function(val) {
		this.container.attr('id',val);

		return this;
	}

	seeker.base.prototype.hide = function() {
		this.container
			.style('visibility','hidden');

		return this;
	}

	seeker.base.prototype.show = function() {
		this.container
			.style('visibility','visible');

		return this;
	}

	seeker.blockscreen = function() {
		var base = new seeker.base('div')
			.attachTo(document.body)
			.id('blockscreen');

		base.update = function() {
			var dim = seeker.util.winDimensions();

			base
				.whxy(dim[0],dim[1],0,0);

			return base;
		}

		return base;
	}

	seeker.modalText = function(id) {
		var base = new seeker.base('div')
			.attachTo(document.body)
			.id(id);

		base.textBox = new seeker.base('textarea')
			.attachTo(base.container.node());

		base.close = new seeker.base('div')
			.attachTo(base.container.node());

		base.update = function() {
			var dim = seeker.util.winDimensions();
			base.container
				.style('background','white')
				.style('border','1px solid black')
				.style('position','absolute');

			base.textBox.container	
				.style('position','absolute')

			base.close.container
				.style('position','absolute')
				.on('click', function() {
					base.hide();
				})
				.text('close')

			base.textBox
				.whxy(dim[0] - 540, dim[1] - 260, 20, 20);

			base
				.whxy(dim[0] - 500,dim[1] - 200,250,100);

			base.close
				.whxy(50,15,((dim[0] - 540) / 2) - 25, dim[1] - 225)

			return base;
		}

		base.text = function(t) {
			base.textBox.container
				.text(t);

			return base;
		}

		return base;
	}

	//browser
	seeker.browser = function() {
		var settings = {
			'scrollInterval':10,
			'keyScrollInterval_small':20,
			'keyScrollInterval_large':100,
			'featureSpacing':45,
			'trackSpacing':30,
			'trackTopSpacing':50,
			'selectionbarHeight':40,
			'overviewHeight':60
		};

		var base = new seeker.base('div')
			.id('browser');

		base.container
			.style('position','absolute');

		var navUnderlay = new seeker.base('div')
			.attachTo(base.container.node());

		navUnderlay.container
			.style('position','absolute')
			.style('overflow','hidden')
			.style('left',0)
			.style('top',0)
			.style('background','#31343B')
			.style('height',settings.selectionbarHeight);

		var navBar = new seeker.base('div')
			.attachTo(navUnderlay.container.node());

		navBar.container
			.style('position','absolute')
			.style('left',0)
			.style('top',0)
			.style('height',settings.selectionbarHeight);

		navOverlay = new seeker.base('div')
			.attachTo(navUnderlay.container.node());

		navOverlay.container
			.style('position','absolute')
			.style('left',0)
			.style('top',0)
			.style('height',settings.selectionbarHeight);

		var overview = new seeker.base('div')
			.attachTo(base.container.node());

		overview.container
			.style('position','absolute')
			.style('left',0)
			.style('height',settings.overviewHeight);

		var overviewSVG = overview.container
			.append('svg')
			.style('position','absolute')
			.style('width','100%')
			.style('height',settings.overviewHeight)
			.style('background','#DB7332')
			.style('top',0)
			.style('left',0);

		var overviewRect = overviewSVG
			.append('rect')
			.attr('y',settings.overviewHeight - 20)
			.attr('x',0)
			.attr('width','100%')
			.attr('height',settings.overviewHeight - 20)
			.attr('fill','white');

		var overviewAxis = overviewSVG
			.append('g');

		var viewport = new seeker.base('div')
			.attachTo(base.container.node());
		viewport.container
			.style('position','absolute')
			.style('top',settings.selectionbarHeight)
			.style('overflow','hidden');

		var canvas = new seeker.base('svg')
			.attachTo(viewport.container.node());
		canvas.container
			.attr('id','canvas')
			.style('position','absolute')
			.style('top',0)
			.style('left',0);

		canvas.container
			.append('svg:defs')
				.append('svg:pattern')
					.attr('id','forward')
					.attr('width',12)
					.attr('height',6)
					.attr('patternUnits','userSpaceOnUse')
					.attr('x',0)
					.attr('y',-3)
					.append('path')
						.attr('d','M 0 3 L 12 3 M 0 6 L 6 3 L 0 0')
						.attr('stroke','#808080')
						.style('shape-rendering','crispEdges')
						.attr('stroke-width',1)
						.attr('fill','none');

		canvas.container
			.append('svg:defs')
				.append('svg:pattern')
					.attr('id','reverse')
					.attr('width',12)
					.attr('height',6)
					.attr('patternUnits','userSpaceOnUse')
					.attr('x',0)
					.attr('y',-3)
					.append('path')
						.attr('d','M 0 3 L 12 3 M 6 6 L 0 3 L 6 0')
						.attr('stroke','#808080')
						.style('shape-rendering','crispEdges')
						.attr('stroke-width',1)
						.attr('fill','none');

		canvas.container
			.append('svg:defs')
				.append('svg:pattern')
					.attr('id','unknown')
					.attr('width',12)
					.attr('height',6)
					.attr('patternUnits','userSpaceOnUse')
					.attr('x',0)
					.attr('y',-3)
					.append('path')
						.attr('d','M 0 3 L 12 3')
						.attr('stroke','#808080')
						.style('shape-rendering','crispEdges')
						.attr('stroke-width',1)
						.attr('fill','none');

		var scale = new seeker.base('div')
			.attachTo(base.container.node());
		scale.container
			.style('background','white')
			.style('position','absolute')
			.style('overflow','hidden')
			.style('top',settings.selectionbarHeight)
			.style('left',0)
			.style('height',20);

		var scaleCanvas = new seeker.base('svg')
			.id('scale')
			.attachTo(scale.container.node());

		var overviewMarker = new seeker.base('div')
			.id('marker')
			.attachTo(base.container.node());

		overviewMarker.container
			.style('position','absolute')
			.style('height',settings.overviewHeight + 2)
			.append('div')
				.style('width','100%')
				.style('height','100%')
				.style('background','white')
				.style('opacity',0.6);

		overviewMarkerHandleLeft = new seeker.base('div')
			.attachTo(overviewMarker.container.node());

		overviewMarkerHandleRight = new seeker.base('div')
			.attachTo(overviewMarker.container.node());

		overviewMarkerHandleLeft.container
			.style('position','absolute')
			.style('background','white')
			.style('opacity',0.7)
			.style('width',10)
			.style('height','100%')
			.style('top',0)
			.style('left',0)
			.style('border','1px solid black')
			.attr('class','overviewHandle');

		overviewMarkerHandleRight.container
			.style('position','absolute')
			.style('background','white')
			.style('opacity',0.7)
			.style('width',10)
			.style('height','100%')
			.style('top',0)
			.style('right',0)
			.style('border','1px solid black')
			.attr('class','overviewHandle');

		var baseMarker = new seeker.base('div')
			.attachTo(base.container.node());

		baseMarker.container
			.style('position','absolute')
			.style('background','#313841')
			.style('display','none');

		var baseLabel = new seeker.base('div')
			.attachTo(base.container.node());

		baseLabel.container
			.style('position','absolute')
			.style('background','white')
			.style('border','1px solid #313841')
			.style('padding','2 5 2 5')
			.style('display','none')
			.style('font-family','arial')
			.style('font-size','12px')
			.style('top',settings.selectionbarHeight + 25);

		var linePool = new seeker.util.pool('svg:line');
		var rectPool = new seeker.util.pool('svg:rect');
		var groupPool = new seeker.util.pool('svg:g');
		var labelPool = new seeker.util.pool('div');
		var selectionPool = new seeker.util.pool('div');

		var _refObj;

		var _startBP;
		var _endBP;

		var _startBound;
		var _endBound;

		var _screenStartBP;
		var _screenEndBP;

		var _windowBP;
		
		var _feats;
		var _featLabels;
		var _trackLabels;
		var _trackOrder;
		var _allTracks;
		var _trackY = {};

		
		var _fieldWidth;
		var _fieldReset = false;

		var _ticks;

		var _palette = ['#9E2121','#622C7A','#FC7632','#2C337A','#2C7A69','#337A2C','#7A5C2C','#A8DEFF','#B3E8A0','#F2E479'];

		base.bpToPx;
		base.pxToBp;

		base.overviewScaleX;
		base.overviewScaleY;

		base.selected;

		base.shift_down = false;
		base.alt_down = false;

		//public functions
		base.init = function(obj, window) {
			/*
			input object is:
				{'name':ref,
				'length': length,
				'feats':[],
				'types':[]};
			feat:
				{'coords':[[start,end],[start,end]...],
				'start':int,
				'end':int,
				'level':0,
				'name':name,
				'reference':ref,
				'strand':strand
				'tuple':[[key,value],...]
				'type': track
				}

				function formatRef(d) {
					refObj = null;
					refObj = d.refObj;

					//create additonal structures
					refObj['featIndex'] = {};
					refObj['intervals'] = [];
					refObj['typeIndex'] = {};

					for (var i = 0 ; i < refObj.types.length ; i ++ ) {
						refObj.typeIndex[refObj.types[i]] = [];
					}

					for (var i = 0 ; i < refObj.feats.length ; i ++ ) {
						refObj['featIndex'][refObj.feats[i].name] = refObj.feats[i];

						var coords = refObj.feats[i].coords;

						for (var a = 0 ; a < coords.length ; a ++ ) {
							refObj.intervals.push(refObj.feats[i].start + coords[a][0]);
							refObj.intervals.push(refObj.feats[i].start + coords[a][0] + coords[a][1]);
						}

						refObj.typeIndex[refObj.feats[i].type].push(refObj.feats[i]);
					}

					refObj['cf_feat'] = crossfilter(refObj.feats);
					refObj['dim_start'] = refObj['cf_feat'].dimension(function(d) {return d.start});
					refObj['dim_end'] = refObj['cf_feat'].dimension(function(d) {return d.end});
					refObj['dim_type'] = refObj['cf_feat'].dimension(function(d) {return d.type});
					refObj['levelIndex'] = {};
					refObj['sumLevels'] = 0;
				}
			*/

			base
				._load(obj)
				._relevel()
				._repts()
				._initialize()
				._renderOverview()
				._setWindow(window[0], window[1])
				._refield()
				._getWindowBP()
				._initTrackLabels()
				.render();

			return base;
		}

		base.whxy_delta = function(w, h ,x, y) {
			var dim = [parseInt(base.container.style('width')), parseInt(base.container.style('height'))];
			var noChange = true;
			if (dim[0] != w || dim[1] != h) {
				noChange = false;
			}

			base.whxy(w,h,x,y);

			if (!noChange) {

				base
					._initialize()
					._renderOverview()
					._setWindow(_startBP, _endBP)
					._refield()
					._getWindowBP()
					._initTrackLabels()
					.forceRender();
			}
		}

		base.render = function() {
			base
				._renderViewport()
				._renderMarker()
				._getWindowBP()
				._renderLabels();

			return base;
		}

		base.forceRender = function() {
			_fieldReset = true;
			base
				._gatherFeats()
				.render();

			return base;
		}

		base.hook_featureClick = null;

		base.hook_featureOver = null;

		base.hook_featureOut = null;
		
		base.data = function() {
			return _refObj;
		}

		base.trackOrder = function(tracks) {
			return _trackOrder;
		}

		base.allTracks = function() {
			return _allTracks;
		}

		base.setTrackOrder = function(tracks) {
			_trackOrder = tracks;
			base
				._initTrackLabels()
				.render();

			return base;
		}

		base.trackColor = function() {
			var colors = {};
			for (var i = 0 ; i < _allTracks.length ; i ++ ) {
				colors[_allTracks[i]] = _palette[i];
			}

			return colors;
		}

		base.trackHeights = function() {
			var heights = {};
			var ys = {}
			
			for (var i = 0 ; i < _trackOrder.length ; i ++ ) {
				var trackType = _trackOrder[i];
				heights[trackType] = (_refObj.levelIndex[_trackOrder[i]] * settings.featureSpacing) + settings.trackSpacing; 
				var y = settings.trackTopSpacing;
				for (var x = 0 ; x < i ; x ++ ) {
					y += (_refObj.levelIndex[_trackOrder[x]] * settings.featureSpacing) + settings.trackSpacing; 
				}

				ys[trackType] = y;
			}
			
			return [ys, heights];
		}

		base.window = function(start, end) {
			base
				._setWindow(start,end)
				._refield()
				.render();

			return base;
		}

		base.zoom = function(windowSize) {
			base._refieldCurrent();

			var half = parseInt(windowSize / 2);
			var mid = _startBP + parseInt(_windowBP / 2);
			var start = mid - half; 
			var end = mid + half;

			if (start < 1) {
				start = 1;
			}

			if (end > _refObj.length) {
				end = _refObj.length;
			}

			base.window(start, end);
			return base;
		}

		base.step = function(stepSize) {
			var newBP = base.pxToBp(viewport.container.node().scrollLeft + stepSize);

			if (newBP >= 0 && newBP <= _refObj.length - _windowBP) {
				viewport.container.node().scrollLeft += stepSize;
				navUnderlay.container.node().scrollLeft += stepSize;
			} else {
				if (stepSize < 0) {
					viewport.container.node().scrollLeft = base.bpToPx(0);
				} else {
					viewport.container.node().scrollLeft = base.bpToPx(_refObj.length - _windowBP);
				}
			}

			if (viewport.container.node().scrollLeft > _fieldWidth * 0.65 || viewport.container.node().scrollLeft < _fieldWidth * 0.1) {
				base
					._refieldCurrent()
					.render();
			}

			base
				.render();
		};

		base.jumpTo = function(bp) {
			var halfWindow = _windowBP / 2
			var start = parseInt(bp - halfWindow);
			var end = parseInt(bp + halfWindow);

			if (start < 1) {
				start = 1;
				end = _windowBP;
			}

			if (end > _refObj.length) {
				end = _refObj.length;
				start = _refObj.length - _windowBP;
			}

			base.window(start, end);
			return base;
		}

		base.jumpToFeature = function(name) {
			var jumpFeat = _refObj.featIndex[name];
			var winSize = (jumpFeat.end - jumpFeat.start) * 1.25
			var stab = ((jumpFeat.end - jumpFeat.start) / 2) + jumpFeat.start;
			base.selected = name;

			base
				.zoom(winSize)
				.jumpTo(stab);

			viewport.container.node().scrollTop = jumpFeat.level * settings.featureSpacing + _trackY[jumpFeat.type] - 100;
			return base;
		}

		//pseudo-private functions (try not to use these !!)
		base._addFeature = function(feat) {
			if (_refObj.featIndex[feat.name] == undefined) {
				if (_refObj.typeIndex[feat.type] == undefined) {
					_refObj.typeIndex[feat.type] = [];
					_refObj.types.push(feat.type);
				}

				_refObj.typeIndex[feat.type].push(feat);
				_refObj.feats.push(feat);
				_refObj.featIndex[feat.name] = feat;
				_refObj.cf_feat.add(feat);

				for ( a = 0 ; a < feat.coords.length ; a++ ) {
					var c = feat.coords[a];
					_refObj.intervals.push(feat.start + parseInt(c[0]))
					_refObj.intervals.push(feat.start + parseInt(c[0]) + parseInt(c[1]))
				}

				base
					._relevel()
					._repts()
					._initialize()
					._renderOverview()
					._refieldCurrent()
					._getWindowBP()
					.render();
			}

			return base;
		}

		base._load = function(obj) {
			_refObj = obj;
			_allTracks = _refObj.allTracks.slice();
			_trackOrder = [];
			for (var i = 0 ; i < _allTracks.length ; i ++ ) {
				if (_refObj.types.indexOf(_allTracks[i]) != -1) {
					_trackOrder.push(_allTracks[i]);
				}
			}

			return base;
		}

		base._relevel = function() {
			var spacing = 0;
			for (var t in _refObj['typeIndex']) {
				var t_feats = _refObj['typeIndex'][t];
				var t_levels = [];
				t_feats.sort(function(a,b) {return a.start - b.start});

				for (var i = 0 ; i < t_feats.length ; i ++ ) {
					var t_feat = t_feats[i];

					var l = null;
					for (var a = 0; a < t_levels.length ; a++ ) {
						if (t_feat.start > t_levels[a] + spacing) {
							l = a;
							t_levels[a] = t_feat.end;							

							break;
						}
					}

					if (l == null) {
						t_levels.push(t_feat.end);
						l = t_levels.length - 1;
					}

					_refObj['featIndex'][t_feat.name]['level'] = l;
				}
				_refObj['levelIndex'][t] = t_levels.length;
				_refObj['sumLevels'] += t_levels.length;
			}

			return base;
		}

		base._repts = function() {
			var coords = [];
			for (var i = 0 ; i < _refObj.feats.length ; i ++ ) {
				var feat = _refObj.feats[i];
				for (var a = 0 ; a < feat.coords.length ; a ++ ) {
					var coord = feat.coords[a];
					coords.push([feat.start + coord[0],'s'])
					coords.push([feat.start + coord[0] + coord[1],'e'])
				}
			}

			coords.sort(function(a,b) {return a[0] - b[0];});

			var current = 0;
		    var pts = [];
		    for (var i = 0 ; i < coords.length ; i ++ ) {
		    	var coord = coords[i];
		    	if (coord[1] == 's') {
		    		current += 1;
		    	} else {
		    		current -= 1;
		    	}
		    	pts.push([coord[0], current]);
		    }

		    pts.push([0,0])
		    pts.push([_refObj.length,0])
		    pts.sort(function(a, b) {return a[0] - b[0]});
		    _refObj['pts'] = pts;

			return base;
		}

		base._initialize = function() {
			var dim = [parseInt(base.container.style('width')), parseInt(base.container.style('height'))]
			
			base.overviewScaleX = d3.scale.linear()
			    .domain([1, _refObj.length])
			    .range([1, dim[0]]);

			base.overviewScaleX2 = d3.scale.linear()
			    .range([1, _refObj.length])
			    .domain([1, dim[0]]);

			base.overviewScaleY = d3.scale.linear()
			    .domain([0, d3.max(_refObj.pts,function(d) {return d[1]})])
			    .range([settings.overviewHeight - 20, 5]);

			return base;
		}

		base._initTrackLabels = function() {
			var trackPos = base.trackHeights();

			_trackLabels = viewport.container
				.selectAll('#trackLabel')
				.data(_trackOrder);

			_trackLabels
				.enter()
				.append('div')
				.attr('id','trackLabel');

			_trackLabels
				.exit()
				.remove();

			return base;
		}

		base._renderOverview = function() {
			var dim = [parseInt(base.container.style('width')), parseInt(base.container.style('height'))]

	        overviewSVG
				.select('#overviewPath')
				.remove();

			var overviewLine = overviewSVG
				.append('path')
				.attr('id','overviewPath')
				.style('stroke','none')
				.style('fill','white');

			var line = d3.svg.line()
				.x(function(d) {
					return base.overviewScaleX(d[0]);
				})
				.y(function(d) {
					return base.overviewScaleY(d[1]);
				})
				.interpolate('step-after');

			overviewLine
				.attr('d', line(_refObj['pts']) + 'z');

	        var ovAxis = d3.svg.axis()
	            .scale(base.overviewScaleX)
	            .tickSize(4,2,0)
	            .tickPadding(2)
	            .tickSubdivide(1)
	            .tickFormat(d3.format(",.3s"))
	            .ticks(Math.floor(dim[0] / 50));

			overviewAxis
				.style('font-family','arial')
				.style('font-size','11px')
				.style('fill','black')
				.attr('transform', 'translate(0,' + ((settings.overviewHeight - 21) + 1) + ')')
				.call(ovAxis);

			overviewAxis
				.selectAll('line')
				.style('stroke-width','1px')
				.style('stroke','black');

			return base;
		}

		base._setWindow = function(start, end) {
			var length = end - start + 1;

			_startBP = start;
			_startBound = start - length - 1;
			_endBP = end;
			_endBound = end + length;
			_windowBP = length;

			base.
				_gatherFeats()

			return base;
		}

		base._gatherFeats = function() {
			_refObj.dim_end.filterFunction(function(d) {
				return d > _startBound;
			})
			_refObj.dim_start.filterFunction(function(d) {
				return d < _endBound;
			})

			_refObj.dim_type.filterFunction(function(d) {
				if (_trackOrder.indexOf(d) != -1) {
					return true;
				} else {
					return false;
				}
			})

			_feats = _refObj.dim_start.bottom(Infinity);

			return base;
		}

		base._refield = function() {
			var dim = [parseInt(base.container.style('width')), parseInt(base.container.style('height'))]

			_fieldWidth = dim[0] * 3;

			_ticks = Math.floor(_fieldWidth / 100);

			base.bpToPx = d3.scale.linear()
			    .domain([_startBound, _endBound])
			    .range([1, _fieldWidth]);

			base.pxToBp = d3.scale.linear()
			    .domain([1, _fieldWidth])
			    .range([_startBound, _endBound]);
			
			viewport.container
				.style('width',dim[0])
				.style('height',dim[1] - (settings.selectionbarHeight + settings.overviewHeight) + 1);

			baseMarker.container
				.style('top',settings.selectionbarHeight)
				.style('width',1)
				.style('height',dim[1] - (settings.selectionbarHeight + settings.overviewHeight));

			canvas.container
				.style('width',_fieldWidth);

			viewport.container.node().scrollLeft = _fieldWidth / 2 - dim[0] / 2;

			overview.container
				.style('top',dim[1] - settings.overviewHeight)
				.style('width',dim[0]);

			overviewMarker.container
				.style('top',dim[1] - (settings.overviewHeight + 2));

			navBar.container
				.style('width',_fieldWidth);

			navOverlay.container
				.style('width',_fieldWidth);

			navUnderlay.container
				.style('width',dim[0]);

			navUnderlay.container.node().scrollLeft = _fieldWidth / 2 - dim[0] / 2;

			scaleCanvas.container
				.style('width',_fieldWidth);

			scale.container
				.style('width',dim[0]);

			scale.container.node().scrollLeft = _fieldWidth / 2 - dim[0] / 2;

			_fieldReset = true;
			return base;
		}

		base._refieldCurrent = function() {
			var length = _endBP - _startBP + 1;
			var newStart = Math.max(0,parseInt(base.pxToBp(viewport.container.node().scrollLeft)));
			var newEnd = newStart + length;
			if (newStart + length > _refObj.length) {
				newStart = _refObj.length - length
				newEnd = _refObj.length;
			}

			base
				._setWindow(newStart,newEnd)
				._refield()
				.render();

			return base;
		}

		base._renderViewport = function() {
			if (_fieldReset) {
				var scaleAxis = d3.svg.axis()
		            .scale(base.bpToPx)
		            .tickSize(5,3,0)
		            .tickPadding(5)
		            .tickSubdivide(1)
		            .tickFormat(d3.format(",.s"))
		            .ticks(_ticks);

				scaleCanvas.container
					.style('font-family','arial')
					.style('font-size','10px')
					.call(scaleAxis);

				scaleCanvas.container
					.selectAll('line')
					.style('stroke','black');

				var trackData = []
				for (var i = 0 ; i < _trackOrder.length ; i ++ ) {
					trackData.push({'feats':
						_feats.filter(function(d) {
							if (d.type == _trackOrder[i]) {
								return true;
							} else {
								return false;
							}
						}),
						'type':_refObj.trackTypes[_trackOrder[i]]
						}
					);
				}

				//peform d3 enter-exit cycle
				var track = canvas.container
					.selectAll('#track')
					.data(trackData)

				track
					.enter()
					.append(function() {return groupPool.get();})
					.attr('id','track')	

				track
					.exit()
					.each(function() {
						while (this.firstChild) {
							while (this.firstChild.firstChild) {
								this.firstChild.firstChild.free();
							}

	    					this.firstChild.free();
						}

						this.free();
					})

				track
					.attr('transform', function(d,i) {
						var trackType = _trackOrder[i];
						var y = settings.trackTopSpacing;
						for (var x = 0 ; x < i ; x ++ ) {
							y += (_refObj.levelIndex[_trackOrder[x]] * settings.featureSpacing) + settings.trackSpacing; 
						}
						_trackY[trackType] = y;
						return 'translate(0,' + y + ')';
					})
					.each(function(d,i) {
						if (d.type == 'sparse' || d.type == 'custom') {
							var t = d3.select(this);
							var feat = t
								.selectAll('#features')
								.data(function(d) {return d.feats}, function(d) {
									return d.name;
								});

							feat
								.enter()
								.append(function() {return groupPool.get();})
								.attr('id','features')
								.on('mouseover', function(d) {
									d3.event.preventDefault();
									d3.event.stopPropagation();
									document.body.style.cursor = 'pointer';
								})
								.on('mouseout', function(d) {
									d3.event.preventDefault();
									d3.event.stopPropagation();
									document.body.style.cursor = 'default';
								})
								.on('click', function(d) {
									if (base.hook_featureClick) {
										base.hook_featureClick(d.name);
									}
								})
									.append(function() {return rectPool.get()})
										.attr('id','spine')
										.style('shape-rendering','crispEdges')
										.style('stroke','none')
										.attr('fill',function(d, i) {
											if (d.strand == '+') {
												return 'url(#forward)'
											} else if (d.strand == '-') {
												return 'url(#reverse)'
											} else {
												return 'url(#unknown)'
											}
										})

							feat
								.exit()
								.each(function() {
									while (this.firstChild) {
				    					this.firstChild.free();
									}

									this.free();
								});

							var subfeat = feat
									.selectAll('#subfeatures')
									.data(function(d) {
										return d.coords;
									});

							subfeat
								.enter()
								.append(function() {return linePool.get();})
								.attr('id','subfeatures')
								.style('shape-rendering','crispEdges')
								.style('stroke-width','13px')
								.style('stroke', function() {
									return _palette[_allTracks.indexOf(_trackOrder[i])];
								})

							subfeat
								.exit()
								.each(function() {
									this.free();
								});


							//perform d3 style
							subfeat
								.attr('x1',function(d) {
									return parseInt(base.bpToPx(_startBound + d[0]));
								})
								.attr('y1',function(d) {
									return 0;
								})
								.attr('x2',function(d) {
									var x1 = parseInt(d3.select(this).attr('x1'));
									var x2 = base.bpToPx(_startBound + d[0] + d[1]);
									var length = x2 - x1;

									if (length > 1) {
										return parseInt(x2);
									} else {
										return x1 + 1;
									}
								})
								.attr('y2',function(d) {
									return 0;
								});

							feat
								.attr('transform',function(d) {
									var currentStart = base.bpToPx(d.start);
									return 'translate(' + currentStart + ',' + (_refObj.featIndex[d.name].level * settings.featureSpacing) + ')';					
								})
									.select('#spine')
									.attr('x',function(d) {
										return 0;
									})
									.attr('y',function(d) {
										return -3;
									})
									.attr('width',function(d) {
										return parseInt(base.bpToPx(_startBound + d.end - d.start + 1));
									})
									.attr('height',function(d) {
										return 6;
									});
						}
					})

				canvas.container
					.style('height',Math.max(parseInt(viewport.container.style('height')),settings.trackTopSpacing + (_refObj.sumLevels * settings.featureSpacing) + (settings.trackSpacing * _trackOrder.length)));

				if (_refObj.feats.length <= 500) {
					_featLabels = viewport.container
						.selectAll('#label')
						.data(_feats.filter(function(element) {
							return (base.bpToPx(element.end) - base.bpToPx(element.start)) > 100;
						}))

					_featLabels
						.enter()
						.append(function() {return labelPool.get();})
						.attr('id','label');

					_featLabels
						.exit()
						.each(function() {
							this.free();
						})
				} else {
					_featLabels = viewport.container
						.selectAll('#label')
						.each(function() {
							this.free();
						});
				}

				_fieldReset = false;
			}

			return base;
		}

		base._renderMarker = function() {
			var markerWidth = base.overviewScaleX(_windowBP);
			if (markerWidth < 1) {
				markerWidth = 1;
			}

			overviewMarker.container
				.style('width',markerWidth)	

			var viewStart = parseInt(base.overviewScaleX(parseInt(base.pxToBp(viewport.container.node().scrollLeft))));

			if (viewStart != parseInt(overviewMarker.container.node().style.left)) {
				overviewMarker.container.node().style.left = viewStart
			}

			return base;
		}

		base._renderLabels = function() {
			_featLabels
				.text(function(d) {
					return d.name
				})
				.style('position','absolute')
				.style('font-family','arial')
				.style('white-space','nowrap')
				.style('font-size',function(d) {
					if (d.name == base.selected) {
						return '18px';
					} else {
						return '12px';
					}
				})
				.style('font-weight', function(d) {
					if (d.name == base.selected) {
						return 'bold';
					} else {
						return 'normal';
					}
				})
				.style('left',function(d) {
					var divWidth = parseInt(d3.select(this).style('width'));
					var stab;

					if (d.start > _screenEndBP || d.end < _screenStartBP) {
						stab = d.start + ((d.end - d.start) / 2);
					} else {
						stab = Math.max(d.start,_screenStartBP) + ((Math.min(d.end,_screenEndBP) - Math.max(d.start,_screenStartBP)) / 2);
					}
					return base.bpToPx(stab) - divWidth / 2;
				})
				.style('top',function(d, i) {
					return 10 + _refObj.featIndex[d.name].level * settings.featureSpacing + _trackY[d.type];
				});

			var trackPos = base.trackHeights();
			_trackLabels
				.style('position','absolute')
				.style('top',function(d) {
					return parseInt(trackPos[0][d]) - settings.trackSpacing;
				})
				.style('left',base.bpToPx(_screenStartBP))
				.style('white-space','nowrap')
				.style('height',12)
				.style('padding-left',4)
				.style('color',function(d) {
					return _palette[_allTracks.indexOf(d)];
				})
				.style('border-left',function(d) {
					return '12px solid ' + _palette[_allTracks.indexOf(d)];
				})
				.style('font-size','11px')
				.style('opacity',0.7)
				.text(function(d) { return d});

			base.selected = null;
			return base;
		}

		base._getWindowBP = function() {
			_screenStartBP = base.pxToBp(viewport.container.node().scrollLeft);
			_screenEndBP = _screenStartBP + _windowBP;

			return base;
		}

		base._renderSelectionBar = function() {
			var mouseCoord = d3.mouse(viewport.container.node());
			var bp = Math.min(Math.max(parseInt(base.pxToBp(viewport.container.node().scrollLeft + mouseCoord[0])),0),_refObj.length);
			var nearest = seeker.util.nearestInterval(_refObj.intervals,bp);
			var bpX = mouseCoord[0];

			if (base.shift_down) {
				bp = nearest[0];
				bpX = base.bpToPx(bp) - viewport.container.node().scrollLeft;
			}

			baseMarker.container
				.style('left',bpX);

			baseLabel.container
				.html(bp)

			var viewportWidth = parseInt(viewport.container.style('width'));

			if (mouseCoord[0] > viewportWidth / 2) {
				baseLabel.container
					.style('left',null)
					.style('right',viewportWidth - bpX - 1)
			} else {
				baseLabel.container
					.style('right',null)
					.style('left',bpX)
			}

			return base;
		}

	
		//events
		Mousetrap.bind('s', function() {
			viewport.container.node().scrollTop += 20;
		}, 'keydown')

		Mousetrap.bind('w', function() {
			viewport.container.node().scrollTop -= 20;
		}, 'keydown')

		Mousetrap.bind('e', function(){
			base.zoom(parseInt(_windowBP * 0.80));
		},'keydown');

		Mousetrap.bind('q', function(){
			base.zoom(parseInt(_windowBP * 1.25));
		},'keydown');

		Mousetrap.bind('a', function(){
			base.step(-settings.keyScrollInterval_small);
		},'keydown');

		Mousetrap.bind('d', function(){
			base.step(settings.keyScrollInterval_small);
		},'keydown');

		Mousetrap.bind('shift', function(e) {
			e.preventDefault();
			base.shift_down = true;
		}, 'keydown')
		
		Mousetrap.bind('shift', function(e) {
			e.preventDefault();
			base.shift_down = false;
		}, 'keyup')

		Mousetrap.bind('alt', function(e) {
			e.preventDefault()
			base.alt_down = true;
		}, 'keydown')

		Mousetrap.bind('alt', function(e) {
			e.preventDefault()
			base.alt_down = false;
		}, 'keyup')


		//hooking events
		viewport.container
			.on('scroll', function() {
				scale.container.node().scrollLeft = viewport.container.node().scrollLeft;
				navUnderlay.container.node().scrollLeft = viewport.container.node().scrollLeft;
				base
					._getWindowBP()
					._renderLabels();
			})
			.on('mousewheel', function() {
				d3.event.preventDefault();
				viewport.container.node().scrollTop -= d3.event.wheelDeltaY;
				if (d3.event.wheelDeltaX != 0) {
					base.step(-d3.event.wheelDeltaX);
				}
			})
			.on('DOMMouseScroll', function() {
				d3.event.preventDefault();
				viewport.container.node().scrollTop -= d3.event.wheelDeltaY;
				if (d3.event.wheelDeltaX != 0) {
					base.step(-d3.event.wheelDeltaX);
				}
			})


		canvas.container
			.on('mouseover',function() {
				document.body.style.cursor = 'move';
			})
			.on('mouseout',function() {
				document.body.style.cursor = 'default';
			})
			.on('mousedown', function() {
				var downCoord = d3.mouse(document.body);
				var downScroll = [viewport.container.node().scrollLeft, viewport.container.node().scrollTop];
				d3.select(document.body)
					.on('mousemove', function() {
						d3.event.preventDefault();
						var coord = d3.mouse(document.body);
						var offX = coord[0] - downCoord[0];
						var offY = coord[1] - downCoord[1];
						
						if (base.pxToBp(downScroll[0] - offX) >= 0 && base.pxToBp(downScroll[0] - offX) <= _refObj.length - _windowBP) {
							viewport.container.node().scrollLeft = downScroll[0] - offX;
						} else if (base.pxToBp(downScroll[0] - offX) < 0) {
							viewport.container.node().scrollLeft = base.bpToPx(0);
						} else {
							viewport.container.node().scrollLeft = base.bpToPx(_refObj.length - _windowBP);
						}

						viewport.container.node().scrollTop = downScroll[1] - offY;

						base
							._renderMarker();
					})
					.on('mouseup', function() {
						base
							._refieldCurrent()
							.render();

						d3.select(document.body)
							.on('mousemove',null)
							.on('mouseup',null);
					});
			})
			.on('mousemove', function(d,i) {
				
			});

		overview.container
			.on('mousedown', function() {
				document.body.style.cursor = 'ew-resize'
				var bp = parseInt(base.overviewScaleX2(d3.mouse(overview.container.node())[0]));

				base.jumpTo(bp);

				var limit;
				d3.select(document.body)
					.on('mousemove', function() {
						d3.event.preventDefault();
						var bp = parseInt(base.overviewScaleX2(d3.mouse(overview.container.node())[0]));

						clearTimeout(limit);
						limit = setTimeout(function() {
							base.jumpTo(bp);
						},settings.scrollInterval);
					})
					.on('mouseup', function() {
						d3.select(document.body)
							.on('mousemove',null)
							.on('mouseup',null);
					})
			})
			.on('mouseover', function() {
				document.body.style.cursor = 'ew-resize'
			})
			.on('mouseout', function() {
				document.body.style.cursor = 'default';
			})

		overviewMarker.container
			.on('mousedown', function() {
				document.body.style.cursor = 'ew-resize'
				var limit;
				d3.select(document.body)
					.on('mousemove', function() {
						d3.event.preventDefault();
						var bp = parseInt(base.overviewScaleX2(d3.mouse(overview.container.node())[0]));

						clearTimeout(limit);
						limit = setTimeout(function() {
							base.jumpTo(bp);
						},settings.scrollInterval);
					})
					.on('mouseup', function() {
						d3.select(document.body)
							.on('mousemove',null)
							.on('mouseup',null);
					})
			})
			.on('mouseover', function() {
				document.body.style.cursor = 'ew-resize'
			})
			.on('mouseout', function() {
				document.body.style.cursor = 'default';
			})

		overviewMarkerHandleLeft.container
			.on('mousedown', function() {
				d3.event.preventDefault();
				d3.event.stopPropagation();
				base._refieldCurrent();
				var limit;
				d3.select(document.body)
					.on('mousemove', function() {
						d3.event.preventDefault();
						d3.event.stopPropagation();

						var start = parseInt(base.overviewScaleX2(d3.mouse(overview.container.node())[0]));
						if (start < 0) {
							start = 0;
						}

						if (start >= _endBP) {
							start = _endBP - 5;
						}

						clearTimeout(limit);
						limit = setTimeout(function() {
							base.window(start,_endBP);
						},settings.scrollInterval);
					})
					.on('mouseup', function() {
						d3.select(document.body)
							.on('mousemove',null)
							.on('mouseup',null);
					})
			})

		overviewMarkerHandleRight.container
			.on('mousedown', function() {
				d3.event.preventDefault();
				d3.event.stopPropagation();
				base._refieldCurrent();
				var limit;
				d3.select(document.body)
					.on('mousemove', function() {
						d3.event.preventDefault();
						d3.event.stopPropagation();

						var end = parseInt(base.overviewScaleX2(d3.mouse(overview.container.node())[0]));
						if (end > _refObj.length) {
							end = _refObj.length;
						}

						if (end <= _startBP) {
							end = _startBP + 5;
						}

						clearTimeout(limit);
						limit = setTimeout(function() {
							base.window(_startBP,end);
						},settings.scrollInterval);
					})
					.on('mouseup', function() {
						d3.select(document.body)
							.on('mousemove',null)
							.on('mouseup',null);
					})
			})

		navOverlay.container
			.on('mouseenter', function() {
				baseMarker.container
					.style('display','block')
				baseLabel.container	
					.style('display','block')
			})
			.on('mouseout', function() {
				baseMarker.container
					.style('display','none')
				baseLabel.container	
					.style('display','none')
			})
			.on('mousemove', function() {
				base._renderSelectionBar();
			})
			.on('click', function() {
				var mouseCoord = d3.mouse(viewport.container.node());
				var bp = Math.min(Math.max(parseInt(base.pxToBp(viewport.container.node().scrollLeft + mouseCoord[0])),0),_refObj.length);
				var nearest = seeker.util.nearestInterval(_refObj.intervals,bp);

				if (base.shift_down) {
					bp = nearest[0];
				}
			})

		return base;
	}
}());
