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
                    jobCount += 1;
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
var inputDiv = document.getElementById('input');
var resultSVG = document.getElementById('result')

var nodeCount = 0;
var jobCount = 0;
var blastResults = {'type':'root','parent':false,'cursor':false,'collapse':false,'id':nodeCount++,'name':'root','children':[]};

var blastInput = React.render(
  <BlastInput />,
  inputDiv
);

var socket = io('http://148.251.54.48:8889/');
socket.on('db', function (data) {
    blastInput.state.dbs = data;
    blastInput._typeClick('n');
});

socket.on('result', function(data) {
    parseBlast(data, 1e-10);
    jobCount -= 0;
    console.log(blastResults)
})