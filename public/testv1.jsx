//blast input component
var BlastInput = React.createClass({
    getInitialState: function() {
        return {
            "inputSequence":">abdba\nCCGCTGCAGCCTTGCGATTCCAGTGTCTAATTCAGAAAAGGATTCATTTACCATCACAGGTAGTGGAGGTGTACACAGTTGTTATATTGTATACTAACCGTTCTGCAAATTATGTGAACAATGAGTTCCAATTATATCGATAGCATTTTACCAAAGTATCAAGCGGACTCAAGTGCAAGTAATTTAGTAAACTATAATAGCCAGAACAGAAGTATGTATCCATATGTGAGTGTGACTTCGCATCAGCTGGCATCCAACGTGGCCTCGAACATGTCACCGTTTAGTGCCATGGCTGCGTCTGCGGATAGTGACAAAACGTGTCGATATACCCAGTCCGGTGCCACAGACATGTCGCAATACGGTCTCAACCTTCAAAATTGTGCAACTACTAGTAACATGGCACAGTACTTCCATCAGAGCAACGCCACTAATCCTTTGAATCCGTGCACTCAACCTACGGCACCGTCTCCACATATACCGGATATTCCAAGATACCCTTGGATGTCCATCACAGACTGCTCAGGGCTGCAGCAATTATCCCTGTCACAAAATGGTCGAGGGATGTCATTCCTTGGTGCCATAGAGAACCAATGGCGTGGATTAGCAGCAAATTGGAACGGTCTGCCCTGGAGTCCGAACGGGTGCCCGCGGCGCCGAGGCCGACAGACCTACACAAGATTCCAAACATTGGAACTCGAAAAGGAATTTCATTTCAATCATTACCTTACACGGCGGCGGAGGATAGAGATAGCGCACGCCCTTTGTCTTACAGAACGACAGGTAAAAATTTGGTTTCAAAATCGGCGCATGAAGTTGAAGAAGGAACTTCGTGCAGTGAAGGAAATCAACGAACAGGTGCGTCGCGAACGAGAAGAAACCGAAAAGATGAAGGAGAAGGAAAAGACCAAGGACACAGCCAGTAACAGCAGCAGTGCTTCAAGTACCAACGGAAGTAACGGTGCGACCAACAATAATACCTCCAACGCCAACAGTCTGTCCCTAAGTAGTAACGGAGGGCCAGACACGCCTACCAATCCTCCTCCGATACACGGCGGTGGTGGAGACATTGGAGGTGGAGGTCTATCGGTTGACGGGAAGATTGTGACTTAACCGAAAGGTGAAAACATGAATTCATGCTAGTGTTTGCACTAGTGTTCTCACAGTTCAC\n>antennapedia\nGTCGGTTGCGAGTTGGTGGGAGGGTTGCCCGAGGCTCCCCAGTTACCCCCCGCAGTGGCGTCCAATCCAGCCGTGAGTTACCCCCACGTCCCAGACATGGCCAACATGTCCTCTTACTACACCTCATACCCTGACTATAGGCCCCCGCAACCACCCGACGAGTACCAAGTTAGTCAAGGCGGTGGCTGCGGGGAGTACGACCCTCGTATGCCCCCCCATGTTTATTACGCTCACCATCAACAAGGTTACCCTCGTTACCCTCCCTACGATCGGCTTATGAATAATTACTACGTGAACGCACAAACCCCGCAACATCCCCACACTCCGCACGGTCATCACCAACCACACGATCCTCATGACTATAGGGACCCGTCTCCAGCAGCTCCTACGTGCATGGGGCAGCAAGCTTCTCCTCCTTTGCAACAATACCCGTCATGCAAGATGCAAAATCAACCACAAGGTCAACAGCAGCAGGCTCAACAACAACCTCAGCAGCAACAAGCTATGCCCCAGCAAGGTCAGCAACCCCAGATGGAGCAACTTGGAGGTCCTCCTCAAGACACGGCTCATCATATGGCATCCCAAGATGGGTCACAACCCCAGGCGGCAGGGGTCTGGCCAGCGCAACAACATACTGGGCAACAACCTCCTTTACTACAACAACAACCACAAAACAATCAAGTCACCAACACATCACCGCTTTATCCTTGGATGAGAAGTCAATTCGCTGCTGAAAGGAAACGTGGCCGACAGACATATACCCGGTACCAGACGCTGGAACTTGAGAAAGAATTTCACTTTAATCGCTACCTGACGAGGCGACGGAGGATAGAAATCGCTCACGCTCTTTGTCTCACAGAACGACAGATCAAAATTTGGTTCCAAAATAGGAGGATGAAATGGAAGAAAGAAAACAAAACGAAGCCTGAAAGTAGCGGATCTTTATCAGAAACTCCCACACCTACTCCCACTTCACCTCAGTAATTCATCAATAATACATTTGAACATACCCTATTTCATTATTGCAGCTGCTCATGCATCGAAACAGCGAAGTTTGTGAAATCACATCATGCTTTTATTTCCTGAAAATTATGCACCAGTTGACGTTATGGCCGGTGGTATTGAAATACATCGCAAGACTGTAA",
            "inputType":"p",
            "dbs":[]
        };
    },

    _progClick: function(programState) {
        programState.checked = programState.checked ? false : true;
        this.setState();
    },

    _typeClick: function(type) {
        this.state.inputType = type;
        for (var i = 0 ; i < this.state.dbs.length ; i ++ ) {
            var db = this.state.dbs[i];
            var prgs = this._progSelect(type, db.type);

            db.programs = [];
            for (var a = 0 ; a < prgs.length ; a ++ ) {
                db.programs.push({"name":prgs[a],"checked":false});
            }
        }
        this.setState();
    },

    _progSelect: function(queryType, targetType) {
        if (queryType == 'p') {
            if (targetType == 'p') {
                return ['blastp'];
            } else if (targetType == 'n') {
                return ['tblastn'];
            }
        } else if (queryType == 'n') {
            if (targetType == 'p') {
                return ['blastx'];
            } else if (targetType == 'n') {
                return ['blastn','tblastx'];
            }
        }
    },

    _blastClick: function() {
        for (var i = 0 ; i < this.state.dbs.length ; i ++ ) {
            var db = this.state.dbs[i];
           
            for (var a = 0 ; a < db.programs.length ; a ++ ) {
                if (db.programs[a].checked) {
                    var job = {
                        "target":db.name,
                        "seq":this.state.inputSequence,
                        "type":this.state.inputType,
                        "prog":db.programs[a].name
                    };
                    socket.emit('job', job);
                }
            }
        }
    },

    _textChange: function(e) {
        this.setState({"inputSequence":e.target.value});
    },

    render: function() {
        var targetRows = [];
        for (var i = 0 ; i < this.state.dbs.length ; i ++ ) {
            var s = this.state.dbs[i];
            var progs = [];
            for (var a = 0 ; a < s.programs.length ; a ++ ) {
                progs.push(
                    <div className={'programs'}>
                        <input type='checkbox' onClick={this._progClick.bind(this,s.programs[a])} checked={s.programs[a].checked}></input>
                        <label>{s.programs[a].name}</label>
                    </div>);

            }

            targetRows.push(
                <div className={'targetRow'}>
                    <div className={'targetName'}>{s.name}</div>
                    <div className={'targetDescription'}>{s.descr}</div>
                    {progs}
                </div>);
        }

        return (<div>
            <textarea onChange={this._textChange} value={this.state.inputSequence}></textarea>
            <div>
                <input type='radio' name='inType' onClick={this._typeClick.bind(this,"n")} checked={this.state.inputType == 'n' ? true : false}></input>
                <label for='nucType'>Nucleotide</label>
                <input type='radio' name='inType' onClick={this._typeClick.bind(this,"p")} checked={this.state.inputType == 'p' ? true : false}></input>
                <label for='proType'>Protein</label>
            </div>
            {targetRows}
            <div id='blastButton' onClick={this._blastClick}>BLAST</div>
        </div>)
    }
});



var RootNode = React.createClass({
    getInitialState: function() {
        var data = this.props.node;
        if (data.children.length == 1) {
            data = data.children[0];
        }

        cursor = data.children[0];
        data.children[0].cursor = true;

        return data;
    },

    render: function() {
        var childTrees = [];
        for (var i = 0 ; i < this.state.children.length ; i ++ ) {
            var child = this.state.children[i];
            childTrees.push(<li key={i}><TreeNode node={child} /></li>)
        }
        

        return (
            <div>
                <ul className={'rootList'}>
                {childTrees}
                </ul>
            </div>
        )
    }
})


var TreeNode = React.createClass({
    getInitialState: function() {
        return this.props.node;
    },

    render: function() {
        var childNodes = [];
        if (this.state.children != undefined && this.state.collapse == false) {
            for (var i = 0 ; i < this.state.children.length ; i ++ ) {
                var child = this.state.children[i];
                childNodes.push(<li key={i}><TreeNode node={child} /></li>)
            }
        }

        var label = [];

        if (this.state.type != 'hsp') {
            label.push(<div className={this.state.collapse ? 'nodeClosed' : 'nodeOpen'} onClick={this.toggle}></div>);
        }

        label.push(<div className={this.state.cursor ? "nodeSelected" : "nodeNotSelected"} onClick={this.select}>{this.state.name}</div>);

        return (
            <div>
                <div className={'treeLabel'}>
                {label}
                </div>
                <ul className={'treeList'}>
                {childNodes}
                </ul>
            </div>
        )
    },

    toggle: function() {
        this.state.collapse = this.state.collapse ? false : true;
        this.forceUpdate();
    },

    select: function() {
        changeCursor(this.state);
    }
});

//blast results parsing/manipulation
function insertBlastResult(q, s, db, hsp) {
    var qCheck = false;
    var dbCheck = false;
    var sCheck = false;

    for (var i = 0 ; i < blastResults.children.length ; i ++ ) {
        var query = blastResults.children[i];
        if (query.name == q) {
            qCheck = query;

            for (var a = 0 ; a < query.children.length ; a ++ ) {
                var database = query.children[a];
                if (database.name == db) {
                    dbCheck = database;

                    for (var b = 0 ; b < database.children.length ; b ++ ) {
                        var subject = database.children[b];
                        if (subject.name == s) {
                            sCheck = subject;
                            subject.children.push({'type':'hsp','parent':subject,'collapse':true,'id':subject.children.length,'name':'HSP' + subject.children.length,'data':hsp})
                            return;
                        }
                    }

                    break;
                }
            }

            break
        }
    }

    if (!qCheck) {
        var tempQuery = {'type':'query','parent':blastResults,'collapse':true,'id':blastResults.children.length,'name':q,'children':[]}
        var tempDB = {'type':'db','parent':tempQuery,'collapse':true,'id':0,'name':db,'children':[]};
        var tempSubject = {'type':'subject','parent':tempDB,'collapse':true,'id':0,'name':s,'children':[]};
        var tempHSP = {'type':'hsp','parent':tempSubject,'collapse':true,'id':0,'name':'HSP0','data':hsp};

        tempSubject.children.push(tempHSP);
        tempDB.children.push(tempSubject);
        tempQuery.children.push(tempDB);
        blastResults.children.push(tempQuery);

        return;
    }

    if (!dbCheck) {
        var tempDB = {'type':'db','parent':qCheck,'collapse':true,'id':qCheck.children.length,'name':db,'children':[]};
        var tempSubject = {'type':'subject','parent':tempDB,'collapse':true,'id':0,'name':s,'children':[]};
        var tempHSP = {'type':'hsp','parent':tempSubject,'collapse':true,'id':0,'name':'HSP0','data':hsp};

        tempSubject.children.push(tempHSP);
        tempDB.children.push(tempSubject);

        qCheck.children.push(tempDB);

        return;
    }

    if (!sCheck) {
        var tempSubject = {'type':'subject','parent':dbCheck,'collapse':true,'id':dbCheck.children.length,'name':s,'children':[]};
        var tempHSP = {'type':'hsp','parent':tempSubject,'collapse':true,'id':0,'name':'HSP0','data':hsp};

        tempSubject.children.push(tempHSP);

        dbCheck.children.push(tempSubject);

        return;
    }
}

function parseBlast(data, ev) {
    //query -> database -> subject -> hsps
    //cols = qseqid sseqid qlen slen pident length qstart qend sstart send evalue
    var db = data.db;

    var lines = data.result.trim().split('\n');
    var nodeCount = 0;
    for (var i = 0 ; i < lines.length ; i ++ ) {
        var cols = lines[i].split('\t');

        if (parseFloat(cols[10]) <= ev) {
            var query = cols[0];
            var subject = cols[1];
            var hsp = {
                'qlen':parseInt(cols[2]),
                'slen':parseInt(cols[3]),
                'pident':parseFloat(cols[4]),
                'length':parseInt(cols[5]),
                'qstart':parseInt(cols[6]),
                'qend':parseInt(cols[7]),
                'sstart':parseInt(cols[8]),
                'send':parseInt(cols[9]),
                'evalue':parseFloat(cols[10]),
            };

            insertBlastResult(query, subject, db, hsp);
        }
    }
}

//coordinate calculations
function stableSortCoords(coords) {
    var positions = [];
        for (var i = 0 ; i < coords.length ; i ++ ) {
        var coord = coords[i];
        positions.push(['s',coord[0]]);
        positions.push(['e',coord[1]]);
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

function unionCoords(positions) {
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
}

function coordLength(coords) {
    var total = 0;
    for (var i = 0 ; i < coords.length ; i ++ ) {
        total += coords[i][1] - coords[i][0] + 1
    }
    return total
}

function segmentCoverage(positions) {
    var count = 0;
    var prev = positions[0];
    var out = [];
    for (var i = 1 ; i < positions.length ; i ++ ) {
        var position = positions[i];
        
        if (prev[0] == 's') {
            count += 1;
        }
        if (prev[0] == 'e') {
            count -= 1;
        }

        out.push([prev[1], position[1], count])
        prev = position;
    }

    return out;
}

function winDim() {
    if (typeof window.innerWidth !== 'undefined') {
        return [window.innerWidth,window.innerHeight];
    } else {
        return [document.getElementsByTagName('body')[0].clientWidth,document.getElementsByTagName('body')[0].clientHeight];
    }
}

var dim = winDim();

//d3 rendering
function renderDB(data) {
    resultSbj.style.display = 'none';
    resultDB.style.display = 'block';

    var subjects = data.children;
    var qlen = data.children[0].children[0].data.qlen;

    var svg = d3.select(resultDB);

    var height = 400;
    var width = 600;
    var margins = 50;

    var queryScale = d3.scale.linear().domain([1, qlen]).range([50,width - 50])
    var queryAxis = d3.svg.axis().scale(queryScale)
        .tickSize(5,3,0)
        .tickPadding(5)
        .tickSubdivide(1)
        .tickFormat(d3.format(",.s"))
        .orient('top');

    svg
        .style('width',width)
        .style('height',height)

    var qAxis = svg.selectAll('#qAxis').empty() ? svg.append('g') : svg.select('#qAxis');
    var spine = svg.selectAll('#qSpine').empty() ? svg.append('rect') : svg.select('#qSpine');
    
    qAxis
        .attr('transform','translate(0,50)')
        .attr('id','qAxis');

    qAxis
        .style('font-family','arial')
        .style('font-size','12px')
        .call(queryAxis);

    qAxis
        .selectAll('line')
        .style('stroke-width','1px')
        .style('stroke','black');

    spine
        .attr('x',50)
        .attr('y',50)
        .attr('width', width - 100)
        .attr('height',5)
        .attr('id','qSpine');

    var unionHSPs = []
    for (var a = 0 ; a < subjects.length ; a ++ ) {
        var subject = subjects[a];
        var sbjCoords = [];
        for (var b = 0 ; b < subject.children.length ; b ++ ) {
            var hsp = subject.children[b];
            sbjCoords.push([hsp.data.qstart,hsp.data.qend]);
        }
        var unionHSP = unionCoords(stableSortCoords(sbjCoords));
        unionHSPs.push({'obj':subject,'union':unionHSP,'cov':Math.round(100 * coordLength(unionHSP) / qlen)});
    }

    var hitGroups = svg
        .selectAll('#hits')
        .data(unionHSPs, function(d) {
            return d.obj.name;
        });

    var startY = 90;

    hitGroups
        .enter()
        .append('g')
        .attr('id','hits')
            .append('text')
            .attr('id','hitLabel');

    hitGroups
        .exit()
        .remove();

    hitGroups
        .attr('transform',function(d,i) {
            return 'translate(0,' + (startY + (30 * i)) + ")";
        })

    hitGroups
        .selectAll('#hitLabel')
        .text(function(d,i) {
            return d['obj'].name + ' - ' + d['cov'] + "% coverage";
        })
        .attr('x',60)
        .attr('y',0)
        .style('font-family','arial')
        .style('font-size','12px');

    var hitHSPs = hitGroups
        .selectAll('#hsps')
        .data(function(d,i) {
            return d['union'];
        });

    hitHSPs
        .enter()
        .append('rect');

    hitHSPs
        .attr('id','hsps')
        .attr('x',function(d,i) {
            return queryScale(d[0]);
        })
        .attr('y',function(d,i) {
            return 4;
        })
        .attr('width',function(d,i) {
            return queryScale(d[1] - d[0] + 1) - margins;
        })
        .attr('height',5);

    hitHSPs
        .exit()
        .remove();
}

function renderSbj(data) {
    resultDB.style.display = 'none';
    resultSbj.style.display = 'block';

    var hsps = data.children;
    var slen = data.children[0].data.slen;

    var minCoord = slen;
    var maxCoord = 0;

    for (var i = 0 ; i < hsps.length ; i ++ ) {
        minCoord = Math.min(hsps[i].data['sstart'], minCoord);
        minCoord = Math.min(hsps[i].data['send'], minCoord);

        maxCoord = Math.max(hsps[i].data['sstart'], maxCoord);
        maxCoord = Math.max(hsps[i].data['send'], maxCoord);
    }

    minCoord = Math.max(1, minCoord - 50);
    maxCoord = Math.min(slen, maxCoord + 50);

    var height = 400;
    var width = 600;
    var margins = 50;

    var subjectScale = d3.scale.linear().domain([minCoord, maxCoord]).range([50,width - 50]);
    var subjectAxis = d3.svg.axis().scale(subjectScale)
        .tickSize(5,3,0)
        .tickPadding(5)
        .tickSubdivide(1)
        .tickFormat(d3.format(",.s"))
        .orient('top');

    var svg = d3.select(resultSbj);

    svg
        .style('width',width)
        .style('height',height)

    var sAxis = svg.selectAll('#sAxis').empty() ? svg.append('g') : svg.select('#sAxis');
    var spine = svg.selectAll('#sSpine').empty() ? svg.append('rect') : svg.select('#sSpine');
    
    sAxis
        .attr('transform','translate(0,50)')
        .attr('id','sAxis');

    sAxis
        .style('font-family','arial')
        .style('font-size','12px')
        .call(subjectAxis);

    sAxis
        .selectAll('line')
        .style('stroke-width','1px')
        .style('stroke','black');

    spine
        .attr('x',50)
        .attr('y',50)
        .attr('width', width - 100)
        .attr('height',5)
        .attr('id','sSpine');

    var hspGroups = svg
        .selectAll('#hsps')
        .data(hsps, function(d) {
            return d.parent.name + d.name;
        });

    hspGroups
        .exit()
        .remove();

    var startY = 90;

    var newGroups = hspGroups
        .enter()
        .append('g')
        .attr('id','hsps');

    newGroups
        .append('text')
        .attr('id','hspLabel');

    newGroups
        .append('rect')
        .attr('id','hspRect')

    hspGroups
        .attr('transform',function(d,i) {
            return 'translate(0,' + (startY + (30 * i)) + ")";
        })  

    hspGroups
        .selectAll('#hspLabel')
        .text(function(d,i) {
            return d.name
        })
        .attr('x',60)
        .attr('y',0)
        .style('font-family','arial')
        .style('font-size','12px');

    hspGroups
        .selectAll('#hspRect')
        .attr('x',function(d,i) {
            return subjectScale(Math.min(d.data.sstart,d.data.send));
        })
        .attr('y',function(d,i) {
            return 4;
        })
        .attr('width',function(d,i) {
            return subjectScale(Math.max(d.data.sstart,d.data.send)) - subjectScale(Math.min(d.data.sstart,d.data.send));
        })
        .attr('height',5);

}

//default variables/mounting
var resultTree = false;
var resultDiv = document.getElementById("resultDiv");
var resultDB = document.getElementById("db");
var resultSbj = document.getElementById("sbj");

var nodeCount = 0;
var blastResults = {'type':'root','parent':false,'cursor':false,'collapse':false,'id':nodeCount++,'name':'root','children':[]};

var blastInput = React.render(
  <BlastInput />,
  document.getElementById('input')
);

var socket = io('http://148.251.54.48:8889/');
socket.on('db', function (data) {
    blastInput.state.dbs = data;
    blastInput._typeClick('n');
});

socket.on('result', function(data) {
    parseBlast(data, 1e-10);
    input.style.display = 'none';

    if (!resultTree) {
        resultTree = React.render(
            <RootNode node={blastResults}/>,
            document.getElementById("resultTree")
        );
    }
})

//cursor
var cursor;

Mousetrap.bind('d', cursorRight);
Mousetrap.bind('a', cursorLeft);
Mousetrap.bind('s', cursorDown);
Mousetrap.bind('w', cursorUp);
Mousetrap.bind('space', toggleCollapse)

function changeCursor(loc) {
    cursor.cursor = false;
    cursor = loc;
    cursor.cursor = true;
    if (cursor.parent) {
        cursor.parent.collapse = false;
    }
    resultTree.forceUpdate();
    
    if (cursor.type == 'db') {
        renderDB(cursor);
    } else if (cursor.type == 'subject') {
        renderSbj(cursor);
    }
}

function toggleCollapse() {
    cursor.collapse = cursor.collapse ? false : true;
    resultTree.forceUpdate();
    return false;
}

function cursorRight() {
    if (cursor.children != undefined) {
        changeCursor(cursor.children[0]);
    }
}

function cursorLeft() {
    if (cursor.parent) {
        if (cursor.parent.name != resultTree.state.name) {
            changeCursor(cursor.parent);
        }
    }
}

function cursorUp() {
    if (cursor.id > 0) {
        var node = cursor.parent.children[cursor.id - 1];

        if (node.collapse) {
            changeCursor(node);
        } else {
            while (node.type != 'hsp' && !node.children[node.children.length - 1].collapse) {
                node = node.children[node.children.length - 1];
            }

            changeCursor(node.children[node.children.length - 1]);
        }
    } else {
        if (cursor.parent.name != resultTree.state.name) {
            changeCursor(cursor.parent);
        }
    }
}

function cursorDown() {
    if (!cursor.collapse && cursor.type != 'hsp') {
        changeCursor(cursor.children[0]);
    } else if (cursor.collapse) {
        var node = cursor;
        while (node.parent.name != 'root') {
            if (node.parent.children.length > parseInt(node.id) + 1) {
                break;
            }
            node = node.parent;
        }

        if (node.parent.children.length > parseInt(node.id) + 1) {
            changeCursor(node.parent.children[parseInt(node.id) + 1])
        }
    }
}