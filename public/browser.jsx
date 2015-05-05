function move(ar, old_index, new_index) {
        if (new_index >= ar.length) {
                var k = new_index - ar.length;
                while ((k--) + 1) {
                        ar.push(undefined);
                }
        }
        ar.splice(new_index, 0, ar.splice(old_index, 1)[0]);
};

var MetaPanel = React.createClass({
    getInitialState: function() {
        var trackStatus = [];
        var trackOrder = browser.allTracks();
        for (var i = 0 ; i < trackOrder.length ; i ++ ) {
            if (this.props.data.typeIndex[trackOrder[i]]) {
                trackStatus.push([trackOrder[i], true]);
            } else {
                trackStatus.push([trackOrder[i], false]);
            }
        }

        return {
            'selected':'overview',
            'data':this.props.data,
            'trackStatus': trackStatus,
            'dragBar':-1,
            'feature':null
        }
    },

    _drag: false,

    _track: null,

    infoDown: function(i) {
        event.preventDefault();
        this._drag = true;
        this._track = i;
    },

    infoOver: function(i) {
        if (this._drag) {
            this.setState({'dragBar':i})
        }
    },

    infoUp: function(i) {
        move(this.state.trackStatus, this._track, i);
        this.setState({'dragBar':-1})
        this._drag = false;
        this._track = null;

        this.refreshTrackOrder();
    },

    refreshTrackOrder: function() {
        var newTrackOrder = [];
        for (var i = 0 ; i < this.state.trackStatus.length ; i ++ ) {
            if (this.state.trackStatus[i][1]) {
                newTrackOrder.push(this.state.trackStatus[i][0]);
            }
        }

        browser.setTrackOrder(newTrackOrder);
        browser.forceRender();
    },

    colorboxOver: function() {

    },

    colorboxOut: function() {

    },

    colorboxClick: function(i) {
        this.state.trackStatus[i][1] = this.state.trackStatus[i][1] ? false : true;
        this.forceUpdate();
        this.refreshTrackOrder();
    },

    refClick: function() {
        this.setState({'selected':'overview','feature':null});
    },

    render: function() {
        if (this.state.selected == 'overview') {
            var featTypeInfo = [];
            var colors = browser.trackColor();

            for (var i = 0 ; i < this.state.trackStatus.length ; i ++ ) {
                var currentTrack = this.state.trackStatus[i]

                var colorboxStyle = {'margin-right':'15px','border-radius':'5px','height':'20px','float':'left','width':'50px','background':currentTrack[1] ? colors[currentTrack[0]] : 'gray'};
                
                featTypeInfo.push(
                    <div style={this.state.dragBar == i ? {'border-bottom':'2px solid #131417'} : {}} className={'trackInfo'} onMouseDown={this.infoDown.bind(this,i)} onMouseOver={this.infoOver.bind(this,i)} onMouseUp={this.infoUp.bind(this,i)}>
                        <div onClick={this.colorboxClick.bind(this, i)} className={'trackColorbox'} style={colorboxStyle}>{currentTrack[1] ? 'on' : 'off'}</div>
                        {currentTrack[0]}
                        <div className={'tracksubInfo'}>number of features: {this.state.data.typeIndex[currentTrack[0]] ? this.state.data.typeIndex[currentTrack[0]].length : 0}</div>
                    </div>
                    )
            }

            return (
                <div style={{'width':this.props.width,'height':this.props.height,'top':this.props.top}} className={'sidePanel'}>
                    <div onClick={this.refClick} className={'titlePanel'}>{this.state.data.name.toUpperCase()}</div>
                    <div className={'subtitlePanel'}>TRACKS</div>
                    <div className={'trackInfoContainer'} style={{'height':dim[1] - 35, 'overflow':'auto'}}>
                        {featTypeInfo}
                    </div>
                </div>
            )
        } else {
            var info = [];

            for (var i = 0 ; i < this.state.feature.length ; i ++ ) {
                var featInfo = this.state.feature[i];
                if (featInfo[1] == 'tuple') {
                    info.push(<div className={'feat_info'}>
                            <div className={'feat_tupleKey'}>{featInfo[0]}</div>
                            <div className={'feat_tupleValue'}>{featInfo[2]}</div>
                            </div>
                        )
                } else if (featInfo[1] == 'table') {
                    var rows = featInfo[2];
                    var rowsDOM = [];
                    for (var r = 0 ; r < rows.length ; r ++ ) {
                        var cols = rows[r].split('\t')
                        var colDOM = [];
                        for (var c = 0 ; c < cols.length ; c ++ ) {
                            var col = cols[c];
                            colDOM.push(<td>{col}</td>)
                        }
                        rowsDOM.push(
                            <tr style={{'background':r % 2 == 0 ? '#4D525C' : '#32343B'}}>{colDOM}</tr>
                            )
                    }
                    var tabDOM = [];
                    tabDOM.push(<table style={{'width':panelWidth - 40}} className={'feat_table'}>{rowsDOM}</table>);
                    info.push(<div className={'feat_info'}>
                            <div className={'feat_tupleKey'}>{featInfo[0]}</div>
                            {tabDOM}
                            </div>
                        )

                }
            }

            return (
                <div style={{'width':panelWidth,'height':dim[1]}} className={'sidePanel'}>
                    <div onClick={this.refClick} className={'titlePanel'}>{this.state.data.name.toUpperCase()}</div>
                    <div className={'subtitlePanel'}>{this.state.selected}</div>
                    <div className={'trackInfoContainer'} style={{'height':dim[1] - 35,'overflow':'auto'}}>
                        {info}
                        <div style={{'height':'50px'}}></div>
                    </div>
                </div>
            )
        }
    }
});

var panel;

var ajax = {};
ajax.x = function() {
    if (typeof XMLHttpRequest !== 'undefined') {
            return new XMLHttpRequest();  
    }
    var versions = [
            "MSXML2.XmlHttp.5.0",   
            "MSXML2.XmlHttp.4.0",  
            "MSXML2.XmlHttp.3.0",   
            "MSXML2.XmlHttp.2.0",  
            "Microsoft.XmlHttp"
    ];

    var xhr;
    for(var i = 0; i < versions.length; i++) {  
            try {  
                    xhr = new ActiveXObject(versions[i]);  
                    break;  
            } catch (e) {
            }
    }
    return xhr;
};

ajax.send = function(url, callback, method, data, sync) {
    var x = ajax.x();
    x.open(method, url, sync);
    x.onreadystatechange = function() {
            if (x.readyState == 4) {
                    callback(x.responseText)
            }
    };
    if (method == 'POST') {
            x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    x.send(data)
};

ajax.get = function(url, callback, sync) {
    ajax.send(url, callback, 'GET', null, sync)
};

function formatRef(d) {
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

var menuBarHeight = 35;

var dim = seeker.util.winDimensions();
var panelWidth = 500;
var browser = new seeker.browser()
    .attachTo(document.body)
    .whxy(dim[0] - panelWidth,dim[1] - menuBarHeight,panelWidth,menuBarHeight);

browser.hook_featureClick = function(featName) {
    sparseSocket.emit('feat',{'featName':featName})
}

var sidePanel = document.getElementById('sidePanel');

var refID = window.location.href.split('?')[1];
var domain = window.location.href.split('/')[0];

var databaseMeta = {
    'phaw': {
        'tracks': {
            'Transcriptome':'sparse',
            'Cufflinks assembly':'sparse',
            'Evidence Modeler':'sparse',
            'H. sapien proteome':'sparse',
            'M musculus proteome':'sparse',
            'D. pulex proteome':'sparse',
            'D. melanogaster proteome':'sparse',
            'C. elegans proteome':'sparse',
            'RNA-seq forward strand':'wiggle',
            'RNA-seq reverse strand':'wiggle'
        },
        'allTracks':['Evidence Modeler','Transcriptome','Cufflinks assembly','H. sapien proteome','M musculus proteome','D. pulex proteome','D. melanogaster proteome','C. elegans proteome']
    }
};

var refSocket = io('http://148.251.54.48:8883/');
refSocket.emit('ref',{'refName':refID})
refSocket.on('result', function(res) {

    var feats = res.data.trim().split('\n');
    //var db = res.db;

    var refObj = {
        'db':'phaw',
        'name':refID,
        'length':parseInt(feats[0]),
        'feats':[],
        'types':[],
        'trackTypes':{},
        'allTracks':databaseMeta['phaw'].allTracks
    }

    for (var i = 1 ; i < feats.length ; i ++ ) {
        var cols = feats[i].split('\t');
        var coords = cols[4].split(';').map(function(item) {return item.split(',').map(function(c){return parseInt(c)})})

        var featObj = {
            'name':cols[0],
            'strand':cols[1],
            'ref':refID,
            'type':cols[5],
            'level':0,
            'coords':coords,
            'start':parseInt(cols[2]),
            'end':parseInt(cols[3])
        };

        if (refObj.types.indexOf(cols[5]) == -1) {
            refObj.types.push(cols[5]);
            refObj.trackTypes[cols[5]] = databaseMeta[refObj.db].tracks[cols[5]];
        }

        refObj.feats.push(featObj);
    }

    formatRef(refObj);
    browser.init(refObj, [refObj.length * 0.3, refObj.length * 0.6]);
    panel = React.render(
        <MetaPanel data={refObj} width={panelWidth} height={dim[1] - menuBarHeight} left={0} top={menuBarHeight}/>,
        sidePanel
    );
    console.log(refObj)
})

var sparseSocket = io('http://148.251.54.48:8882/');
sparseSocket.on('result', function(d) {
    var featObj = [];
    var data = d.data.split('>');
    var featName = data[0];
    for (var i = 1 ; i < data.length ; i ++ ) {
        var meta = data[i].trim().split('\n');
        var key = meta[0].split('\t');
        featObj.push([key[0],key[1],meta.slice(1)])
    }
    panel.setState({'selected':featName,'feature':featObj});
})
