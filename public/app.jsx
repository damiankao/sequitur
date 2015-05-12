var App = React.createClass({
    getInitialState: function() {
        return {
            'selectedTab':'blast', //blast, results, browser, help
            'result':[],
            'sequence':'',
            //browser states
            'browser_ref':'initRef',
            'browser_newRef':'',
            'browser_selected':'overview',
            'browser_data':null,
            'browser_trackStatus':[],
            'browser_feature':null,
            'browser_dragBar':-1,
            'browser_width':500,
            'browser_refChange':false,
            //menu
            'menuHeight':40,
            //blast
            'blast_width':500,
            'blast_input':">Notch\nGAAAAGTACTGTTCGAGCAGTTGTCAGGTGAAGTGTATGACGGGTGGTGCTGCGAGGTATCAGTGAACAGCAGCATGTTTTGACATATTTATATTTTAATGAACTTAATAAGAGCGAGTGGTGTTATTAGTGACACGATAGGAAGTGTAGTGCCAAATGTTGTTATTTTTAAGGGATGTATGAAGGATCTTTCTCCAGTATGTACTCCATGGGATTAATAAAGTGGCTGTTGATAGCATGCCTCTTGAGCTCTGCCCACGGATTTCGGTCGTGTTCCCCCAACCCTTGCAAGACGAGCGGCCAGTGCATCTCTGACCCCCGAGGGGAGTCCTACTGCAAATGCCCTGATCAGTTCGTCGGGGAGTACTGCCAGCACCTGAACCCTTGCCTCACGGGCCCAGGCCCTCGCTGTCAGAATGGTGGCACCTGCCAGGTGGTCCTCACGCCCTCTGGTGCCAAGTTCGAGTGCCACTGTCCTGTTGGCTACAACGCGTCCCTCTGTGAGATCGTGGTGCCCAATGTGTGCGACACGAGGCCGTGCCAGAACGGTGCCGCGTGCCAGCTCATCACCCTGGACAAGTACGTGTGCCAGTGTCCCTCGGGGTACAGGGGCGACCGCTGCGAGCAAGTGGACTACTGCGCCAAACAGCCTTGCAGGAACGGTGGCACGTGCCACTCCGGGACCTCCTCCTACACCTGTACCTGCCCTCCTGGCTTCGCCGGACCCACCTGCACCAGCGACATCGACGAATGTCTCAGTAACCCCTGCATCTACGGCCAGTGTCGCAACACCTTCGGGTCTTACTCATGTACGTGTAATGCTGGATACACGGGCACCAACTGCGAGAGCGTGTACGTGCCGTGTCAACCGTCCCCGTGCCGTAACGGAGGCATCTGCACACCTCAGGATCGTCTGTCCTACTCCTGCTCTTGTCCCTCAGGATTCGAAGGCGTCAACTGCGAAGTGAACATAGACGACTGCCACAACAACCTGTGTCAGAATGGTGGCACGTGCATTGATGGTGTGGATTCGTATACGTGCTCGTGCCCTGACACCTTCACCGGCCGCTACTGCGCTAACGACGTGGATGAGTGCCTCGCGTGGCCCTCCGTGTGCAAGAACGGAGCGACGTGCAGCAACACACACGGCGGCTTCTCGTGTATCTGCGTCAACGGCTGGACGGGCCAGGACTGCTCTGAGAACATTGATGACTGCAGCCAGAACCCGTGCTTCAACGGTGCCACGTGCATTGATAAAGTCGGCAAATACGTCTGCCAGTGTCAGCCTGGCACTACTGGCATTCTATGTCACTTGGACGACGCGTGCGCCAGCAACCCGTGCCATGAGAGCGCCACGTGTGACACTTCACCCATAGACGGCGGCTACATCTGCACCTGCCCCACTGGCTATACCAGTACCGACTGTACCGTCGATATTGACGAGTGCAAAGTGGGACTCATATGTGAACACAACGGGACGTGCGTCAACACTCCCGGCTCTTTTCGGTGTGACTGCTCCAAGGGCTTCACAGGGCCGCGCTGTGAGATCAATATAAACGAGTGTGAGTCGAACCCGTGCCAGAACCAGGGCACCTGTCTGGACGAGCGCGGTGCCTACAGATGTGTCTGTATGCCTGGTTATTCTGGCACCAACTGTGAAATAGACATCGACGAGTGTGCCAGCAGCCCGTGCCTCAACGGCGCCCTCTGCGACGACCGCATCAACGAGTTCCACTGCAACTGCTTCCCTGGCTTCACTGGCCGCCGCTGCGAAGTTAACATCGACGACTGCGTGTCCCAACCGTGCGAGAACGGCGCCACGTGCCTGGACCGCGTCAACAGCTACACATGCTCCTGCCAGGCCGGCTTTACTGGCAGGAACTGCGAGACAAACATCAACGACTGCTTGTCCTCTCCCTGCCGCCATGGGGATTGCAGAGACGGTAACGACTCCTACACTTGCGAATGTCACCCAGGCTACACGGGCCTCCTCTGCCAGACGGAGATCGATGAGTGCGCCATGGAGCCGTGCAAAAATGGCGGTATTTGCGAGAACAAAATCAACGGGTACACGTGCGACTGCCCCACTGGCACTGCCGGGGTGAACTGCGAGTATGACATCAACGAATGCTTCAGCAACCCTTGCAGGAACGGAGCTACTTGCATCAACGGCATCAACAAATACTCCTGCGACTGCGCACCGGGTTTTGCGGGCCATCACTGCGAAATTAACATTGATGAGTGCGCGTCGCAACCCTGCGCCAATGGAGGCGAGTGCATCGACTTGGTCAATGGTTACAAGTGCCGCTGTCCATCGGGCTACTTCGACGCCCATTGCTTGTCGAACGTGAACGAGTGCGCCAGCAGCCCATGCCGCAATGGCGGTACTTGTTACGATGACGTCAACAGGTTCATATGCAAGTGTCCCCCTGGGTACACGGGGCACCGCTGTGACATGGAGATCGATGAGTGCCAGTCCAACCCATGCCAGCATGGCGGCACTTGCCGAGACGCCCTCAACGCCTACTCTTGTACCTGCCCTGCGGGCTTCAGCGGCCGCAACTGCGAAGCCAACATTGATGACTGCCTCAGTAGACCTTGCTACAATGGCGGCACTTGCATTGATCTCGTTGACTCGTACAAGTGCGTGTGTGACTTGCCGTACACCGGCCGCAGCTGCGAGGTGCGTATGGACCCGTGCTCACCCAACAGATGCCAACACGGTGCCAAGTGTAACCCCATTGCCAACTACGTCGACTTTTTCTGCGACTGCAAACTTGGTTACACCGGACGTTTGTGCGATGAAGATATCAATGAGTGTACATACTCGCCGTCACCTTGCAAGAACGGAGCCACCTGCCGCAACACCAACGGCTCGTACACCTGTGAGTGCGCCTTGGGGTACGAGGGACGCGAGTGCACCATAAACACCAACGACTGCGCCAGCAACCCGTGCCTCAATGGCGGCACCTGCCGTGACGGCGTAGGGCACTACACCTGCATGTGTGTCGATGGCTTCGGTGGCGTCAACTGTCAAAACGATCTCGATGAGTGTGCCTCCAATCCCTGCCAGAATGGAGCAACTTGCCACGACTACGTCAACTCCTTTACGTGCCAGTGCCCCCTTGGCTTCTCAGGCACAAACTGCGAAGTGAATGACGAGGATTGCACCAGATCCTCTTGTATGAACAATGGCACCTGCAAAGATGGCATCAACTCCTACACGTGCGACTGCCTCCCTGGCTTTGTGGGATCTCACTGCCAGCATCACGTCAATGAGTGCGACTCGAATCCCTGCCAAAACAACGGCCGCTGCATTGACCATGTAGGCTATTACACCTGTTACTGCCCCTATGGCTATACAGGCAAGAACTGCGAGCGGTATGTGGACTGGTGTTCTTCAAGACCCTGTGACAATGGAGGCAAATGCATTCAGACGCGTAACACGTTCAGGTGTGAGTGTCCTCAGATGTGGACTGGAGCCTTGTGTGATGTTGCCACCGTGTCCTGCCTGGTTGCTGCTTCTAACAAGAACGTCCCCGTCTCCCAAGTGTGTCTTAATGGAGGCAAATGCTACGATAAAGGCAACTCCCATGAATGTCGCTGTCTGCCTGGCTATGAAGGATCATACTGTCAACATGAAATCAACGAGTGTGACTCGCAGCCATGTAAGAACGGCGCCACGTGTAACGATCACGTCGGCTCATACACGTGCACGTGCCGGCCCGGTTTCCAGGGTTTCGACTGCGAGTACAATATTGACGACTGCATACCGAACCCTTGCCGCAATGGTGGCGTGTGCCATGATCTCGTGAACGACGTACAGTGCTCGTGCCCGCATGGTACCATGGGTAAGATGTGCGAAATTAACCCAAACGACTGCTACGAAGGAGCGTGTCACAACGGTGGCACTTGTGTGGACAAAGTCGGTGGTATCGAGTGCCACTGCCGCCCGGGCTTTGTTGGAGCGCAGTGCGAAGGTGATGTCAATGAGTGTCTTTCCAGCCCCTGCCACTCTGAAGGCACTGCTGACTGCATACAGCTGGAGAACGACTTCCGCTGCCTGTGCAGGCCTGGTTACATGGGGCGCCTCTGCGATGCCAAAGTTTCCTTTGACTTGTGCACCGCCTCTTGCCGCAATGGTGGTGTGTGTGACTATGCTCACGGCAGAAACGTGTGCATATGTGCCGCGGGCTTTACAGGGAAGTATTGCGAGTTCCCTATCGATGTCTGCAGCAACCATTCATGCCAACCTGGCGAGATATGCCGGCCGTACGAGGGAGGCAAACGCTGTGCCAGTCTGAGGTCGCTTCCAGACTTTTGTGCCAACCGACCTTGTCAAAACGGTGGAACTTGCAAGGAGTTCACCAACGGTTATCACTGTTACTGCTTAGAAGGATATTCGGGCAGGAACTGTCAGGACAGAAACAAACAAGCGCTGCAGGATCGCTGCCGCGAGAACAAATGCGAAGCTAAAAAGAACAACAAGGTGTGTGACCCGGAATGCAACATCATCGAGTGCAATTTTGACGGCTATGAATGTTCCTTGGGTCGAAATCCGTGGGCCAACTGCGACGCGCCAATTGTTTGCTGGGAAGTGTTTGCTGATGGCTACTGCAACGAAGAATGTAACACTGCCAACTGCCTCCACGATGGACTGGATTGTCGCCAGATCAGCAGAGGAACTTGTAATGATATCTACGACGCCTACTGCGCCAAGAACTACGCCAACGGCTTCTGCGATCAGGGCTGCAACAACGCCGACTGCGGCTGGGACGGGCTCGACTGCGATGAAGATCCGCCCAAGCTGCTGGAAGGATCGCTCGAGGTAATCGTACGCATGTCGCCGTCTGATTTCAGAAAGAACAAGACGCAATTTCTGAGATATCTGAGCAATTTGTTGGACGCGCATGTCATTCTGCGACACGAGAATGCAGGCAATGAAATGATCTACCCGTATGAGAAGGATGACGTCGCTGGGTCCATTGTATTTGTTGAAGTAGACATACGGCGTTGTGAAGAGTCAGGGTCTTGCTACGAGAACATAGCGAGTGTCGCCAATCATTTGGCTGCCGTAGAGACCACAAACAAAGCGACGCAGTTCCCAATTTACTCGGTTATTGATCAGCCTGAGCCTTCCCCTAACAGCTACACATACGTCATCGTAACGCTCGTTGGCGTCGTTATCGTTGCTGGCATTCTGTTCATGGTAATCACTTCAACCAATCGTAAGAGAGCTCGGGGAGTGACATGGTTCCCTGAAGGTTTCTTCAACAAGTACTCGGCAAATCCTCCCATTGCCGAGCCGCCGCACCACAAAACGAACGATGGACAAGAGATGCATAATTTCGGTCAGCTGTCCAATCATCTTCCTGAGCTGGACATCACTACAGACAGCTGCGGAGATATCGCTCTGCCGTGCGACTTCAAAGACTGGAGCGATGACGACAGCGAGCTGCCCCCCAACAAACGGTCCAAGAAAGATGGCTCCTTTGGAGAGCCGCATCCCGTCCGGTCGGAATACGATGACAACGATCCTCGTCAGTGGACCAAGCAACATTTGGATGCTGCTGACATTAAGCATCCTGACGGCATAGAACTCACCCCTCCACAGACGGAGCAGGAAGACCAGGGTACTACCTCCAATGGTGTCGACCCCAAAGGTCCAATGGGTCTCACTCCATTGATGATTGCGTCGTTCAGAGGGGGCGGCTTGGAAGGATACACAGTCAAGGAAGAAGAAGACAGTTCGGCTGCAGTTATACAAGAACTCATCGAGCAAGGAGCCAAATTGAATGCTACAATGGACCGTACGGGAGAGACTTCCTTGCATCTTGCTGCCAGGTACGCGCGCGCTGACGCCGCCAAGAAGCTGCTGGACGCCAAAGCAGACGTGAACGCACAGGATGCTACTGGCAGGACTCCCCTACACGCTGCTGTAGCTGCCGATGCTCAGGGTGTCTTCCAGATCCTGCTGCGCAATCGCGACACCAAACTGGACATGAAGACGAACGACGGCACCACTCCCCTCATCCTGGCCTGCCGGCTGGCCATAGAAGGCATGGTAGAGGATCTTATCAACGCTGAGGCGGACATCAACGCTACCGACGACAGCGGCAAGACGGCACTGCACTGGGCCGCTTCCGTCAACAATGTAGAGGCTGTACAAATACTTATCAAACACGGTGCAAACTTCGACATTCAGGACAATAAGGATGAGACACCGCTCTTCCTGGCTGCGAGAGAGGGCAGTTACGAAGCTTGTCGTCTCCTGCTCGACCATTTCGCCAACCGTGACATCACGGATAACATGGAGCGGTTACCGGAGGACATGGCTGTCGAGCGCTACCACCATGACATTGTCAAGCTGTTGCGGGAACACCATCCTCGCTCCCCGCAGCTGCAACCCATGACCCACCCTCCTCCCAGCCTCGCTCACAACCATCTGTCCCAACACCCGGCCGTGGCTACACAGGTGGCTCCTCACAGATCTAACACGGCTCCCCGCAGCAAAGCCAAGCGACCCAAGTCTCAGGTGATGGCTCCTCCTGACGCTGAACTGGGTCCCGAGAGTACAGTGCTCAAGCGCAGCAGTAGCGTTAAAAAGAAGAGAGATCCCCCACCACCTCCTGGCTCCTCCGGTGAGATGCCGCCAAATTCCTTAGATGGTCACCGTATGATTTTCAAGACAGAAGCACCAATTCTGAATGCCGAGTACTCCGGTCCCCTGAGCATGCCTCAGTTCAGTGAATTGTCCCTCAAACAATCCAATCCAGCTTTTCACGGCTGCCTGACGACCCCCACATCCACAGGTGGCGTGCAGCAGCCGATTGAAAGCAACGACCCCTTCAATTTTATTCAACTACTCAACAGCGGCACGTCACCGTCATCTCTGCCACCCCAGCCGGTGGTGCACCAGCGGCAGCAGTCCATGCCTGCTGCCTTCCCTCCCGTCACTAGTCAGAGCCTCACTCCTCAGCAACAACAGCAGCAGCATCTCCATCTGCATAACAATCATGTGTCCCCTCCCCCTCCTCGAGGGGCACATTCTGCCCACACTTCTCCACAGTCCATGCCTATATATCCTCTGCATGTTCAAAATCCCCAAAACCCTTCCTCTCCCAATAAGCTACGGCCTCCTTTACCGACTTCTCCCACCTACTTAGCCGCACTTAGACAAGCGACCGCATCCTCTGGTTTTGATTTCCCCTCCACGTCCTCAGCCCAGAGCTCTGCGCATGAGGACCAACAACAGCAACAGCAGACTCGGGCCCAACAAAGTATGCCTCCTCGACACCCAGGCCCACAACCTCCACCTAACGTTTATCCTCACTATCCCACTCCTCCTTCCCACCACTCGGGGCTTGAAGGTACACCTCAGCACCCACCAAACCCCTCCAGTCACGACAGTTTCCCTACGCCCTCTCCGGAGTCCCCTGGTCAGTGGTCTAACGCGTCACCTCACAGTCAAGGGGACTGGTCAGAGAGCGTTCGCTCACCTCCTGTGAGTCAATTTGCTATGTCCTCTCAACAACAGCAAATACATCACCAACCACAGCACGTTTATCAAGTTAATTCTTTATTACATTCTCGACAAGCCCTCGGTCTTCCACCACAGCCCTCCGCTCCTCCACCTCCATCATCGCAACCCACACAAAACTCCATATATATCTAAAGGCATGTTATAGCGCAGCGTTCGTATGCTCGCACCGCCTCTTTCTGGCAGGTTACTGAGCTCAATGCCGCCATTTGTAAATTTTGTTTAAGTGACTTGTAAATAACGTTAGTTGTAAGGTCCTGTGCAGTGGCAGTATGTTATGGATGTACGTGGCAGGAGTGGGTGATGAACGTGCCTTTGCGCCGCTTCCTCTCGTTGTAAGGGGTCCCCGCTTTTGTATTTATTCCGTCTCTCCGCGTACTCATGGAGTGACGCAGTTCTTAAGCTTTGGTTGACTGAAATTTTCTAATTCGGCGTTAAAATTTTGACATTAACTAACTGAGATCCGGTGTTGTTGTAACTCTATGTAAACCTTCGCTTATCTGAGAAAAGGTTGGTAGTAGTATTTAATTCTATTGCTGTAATTTGACAGTATCTGGGGAGCCTTTCATAGGCTAATGTATTGCTTGGTCGGGTTATATTGCTGTTTTCTATTAGATGGATGCGCTAAGAACTTTTCAAATGCTAACTATGCCTTGACTGTTTTAAGTAATTCGAATGCTGCTGTTTGCTATTGGGACTCCGTGTCGACAGAAAATGTGCCTGAGTACCTTCCTGTGTATTATAAAAGTTATTGTTTATGATTTACGATCTCTTATATAATTAGTTTTAGAATACTCAATATTTTATTACGACATTAAAACAATTGTAGATTTTGTAGCTCAAAATGAATTTTAAAAGTAACTTATAATGTTTGCCTGAAGCTATCTTGTGACAATTTCCCTCCCTCCGCCTCGTCACGGATATCTTTTTCTTTCCTCATCTCCGCTTTAGTTTGTACCGTAGCCCCCCGCTCTTCGTAACTCCCCTATTCCTTAATGTGGTATTTCCTACATAATCAGAGTTACGTGATAAATTTTTTGATATTATCTACGAAAAATATCGTAAGCACTGACATATCTACGTACTCGCTATTTATAGCAGCTATTGTCCGCGTGGCATTGGCTTACACTGCCATATTACCTCCGTATTAACCAGATCCCT",
            "blast_inputType":"p",
            "blast_dbs":[],
            "blast_queries":[],
            "blast_jobs":[]
        }
    },

    debug: function() {
        return this.state;
    },

    menuClick: function(tab) {
        event.preventDefault();
        this.setState({'selectedTab':tab});
    },

    /////////////////////
    //browser functions//
    /////////////////////

    browser_trackDown: function(i) {
        event.preventDefault();
        this._browser_drag = true;
        this._browser_track = i;
    },

    browser_trackOver: function(i) {
        if (this._browser_drag) {
            this.setState({'browser_dragBar':i})
        }
    },

    browser_trackUp: function(i) {
        seeker.util.move(this.state.browser_trackStatus, this._browser_track, i);
        this.setState({'browser_dragBar':-1})
        this._browser_drag = false;
        this._browser_track = null;

        this.browser_refreshTrackOrder();
    },

    browser_drag: false,
    browser_track: null,

    browser_refreshTrackOrder: function() {
        var newTrackOrder = [];
        for (var i = 0 ; i < this.state.browser_trackStatus.length ; i ++ ) {
            if (this.state.browser_trackStatus[i][1]) {
                newTrackOrder.push(this.state.browser_trackStatus[i][0]);
            }
        }

        jsBrowser.setTrackOrder(newTrackOrder);
        jsBrowser.forceRender();
    },

    browser_colorboxClick: function(i) {
        this.state.browser_trackStatus[i][1] = this.state.browser_trackStatus[i][1] ? false : true;
        this.forceUpdate();
        this.browser_refreshTrackOrder();
    },

    browser_refClick: function() {
        this.setState({'browser_selected':'overview'});
    },

    browser_refChange: function(e) {
        if (!this.state.browser_refChange) {
            this.setState({'browser_refChange':true})
        } else {
            this.setState({'browser_refChange':false})

            if (this.state.browser_newRef.trim() != '') {
                refSocket.emit('ref',{'refName':this.state.browser_newRef.toLowerCase()});
            }
        }
    },

    browser_refInputChange: function(e) {
        this.state.browser_newRef = e.target.value;
    },

    ///////////////////
    //blast functions//
    ///////////////////

    blast_textChange: function(e) {
        this.setState({'blast_input':e.target.value})
    },

    blast_typeClick: function(type) {
        this.state.blast_inputType = type;
        for (var i = 0 ; i < this.state.blast_dbs.length ; i ++ ) {
            var db = this.state.blast_dbs[i];
            var prgs = this.blast_progSelect(type, db.type);

            db.programs = [];
            for (var a = 0 ; a < prgs.length ; a ++ ) {
                db.programs.push({"name":prgs[a],"checked":false});
            }
        }
        this.forceUpdate();
    },

    blast_progSelect: function(queryType, targetType) {
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

    blast_progClick: function(programState) {
        programState.checked = programState.checked ? false : true;
        this.forceUpdate()
    },

    blast_submit: function() {
        for (var i = 0 ; i < this.state.blast_dbs.length ; i ++ ) {
            var db = this.state.blast_dbs[i];
           
            for (var a = 0 ; a < db.programs.length ; a ++ ) {
                if (db.programs[a].checked) {
                    var job = {
                        "target":db.name,
                        "seq":this.state.blast_input,
                        "type":this.state.blast_inputType,
                        "prog":db.programs[a].name,
                        "status":'submitted',
                        "jobIndex":this.state.blast_jobs.length
                    };
                    this.state.blast_jobs.push(job);
                    blastSocket.emit('job', job);
                }
            }
        }
        this.forceUpdate();
    },

    blast_insertData: function(q,s,hsp, queries) {
        var qCheck = false;
        var dbCheck = false;
        var sCheck = false;

        for (var i = 0 ; i < queries.length ; i ++ ) {
            var query = queries[i];
            if (query.name == q) {
                qCheck = query;

                for (var b = 0 ; b < query.children.length ; b ++ ) {
                    var subject = query.children[b];
                    if (subject.name == s) {
                        sCheck = subject;
                        subject.children.push({'type':'hsp','parent':subject,'collapse':true,'id':subject.children.length,'name':'HSP' + subject.children.length,'data':hsp})
                        return;
                    }
                }

                break;
            }
        }

        if (!qCheck) {
            var tempQuery = {'type':'query','collapse':true,'id':queries.length,'name':q,'children':[]}
            var tempSubject = {'type':'subject','parent':tempQuery,'collapse':true,'id':0,'name':s,'children':[]};
            var tempHSP = {'type':'hsp','parent':tempSubject,'collapse':true,'id':0,'name':'HSP0','data':hsp};

            tempSubject.children.push(tempHSP);
            tempQuery.children.push(tempSubject);
            queries.push(tempQuery);

            return;
        }

        if (!sCheck) {
            var tempSubject = {'type':'subject','parent':qCheck,'collapse':true,'id':qCheck.children.length,'name':s,'children':[]};
            var tempHSP = {'type':'hsp','parent':tempSubject,'collapse':true,'id':0,'name':'HSP0','data':hsp};

            tempSubject.children.push(tempHSP);
            qCheck.children.push(tempSubject);

            return;
        }
    },

    blast_parse: function(data, ev) {

        //query -> database -> subject -> hsps
        //cols = qseqid sseqid qlen slen pident length qstart qend sstart send evalue

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

                this.blast_insertData(query, subject, hsp, this.state.blast_queries);
            }
        }

        this.blast_generateTrack();
    },

    blast_generateTrack: function() {
        for (var i = 0 ; i < this.state.blast_queries.length ; i ++ ) {
            var query = this.state.blast_queries[i];
            for (var a = 0 ; a < query.children.length ; a ++ ) {
                var subject = query.children[a];
                var strand;

                var hspSCoords = [];
                for (var b = 0 ; b < subject.children.length ; b ++ ) {
                    var hsp = subject.children[b];
                    if (hsp.data.sstart > hsp.data.send) {
                        strand = '-';
                    } else {
                        strand = '+';
                    }

                    hspSCoords.push([hsp.data.sstart,hsp.data.send]);
                }

                var unionSCoords = seeker.util.unionCoords(seeker.util.stableSortCoords(hspSCoords));
                var start = unionSCoords[0][0];
                var end = unionSCoords[unionSCoords.length - 1][1];

                var formattedCoords = [];
                for (var c = 0 ; c < unionSCoords.length ; c ++ ) {
                    formattedCoords.push([unionSCoords[c][0] - start, unionSCoords[c][1] - unionSCoords[c][0]]);
                }

                var featObj = {
                    'name':query.name,
                    'strand':strand,
                    'ref':subject.name,
                    'type':'Blast',
                    'level':0,
                    'coords':formattedCoords,
                    'start':start,
                    'end':end
                };

                if (this.blast_track[subject.name] == undefined) {
                    this.blast_track[subject.name] = [];
                }

                this.blast_track[subject.name].push(featObj);
            }
        }
    },

    blast_track: {},

    blast_jobFinished: function(index) {
        this.state.blast_jobs[index].status = 'finished';
        this.forceUpdate();
    },

    blast_goToRef: function(ref, start, end) {
        refSocket.emit('ref',{'refName':ref,'window':[start,end]});
        this.setState({'selectedTab':'browser'});
    },

    blast_toggleHSP: function(sbj) {
        sbj.collapse = sbj.collapse ? false : true;
        this.forceUpdate();
    },

    /////////////////
    //rendering app//
    /////////////////

    render: function() {
        //blast content
        var targetRows = [];
        for (var i = 0 ; i < this.state.blast_dbs.length ; i ++ ) {
            var s = this.state.blast_dbs[i];
            var progs = [];
            for (var a = 0 ; a < s.programs.length ; a ++ ) {
                progs.push(
                    <div className={'targetPrograms'}>
                        <input type='checkbox' onClick={this.blast_progClick.bind(this,s.programs[a])} checked={s.programs[a].checked}></input>
                        <label>{s.programs[a].name}</label>
                    </div>);

            }

            targetRows.push(
                <div className={'targetRow'} style={{'width':this.state.blast_width}}>
                    <div className={'targetName'}>{s.name}</div>
                    <div className={'targetDescription'}>{s.descr}</div>
                    {progs}
                </div>);
        }

        var blastResults = [];
        if (this.state.blast_queries.length == 0) {
            blastResults = (
                    <div style={{'text-align':'center'}}>
                        <div style={{'height':100}}></div>
                        No jobs submitted/finished
                    </div>
                )
        } else {
            var queries = [];
            for (var i = 0; i < this.state.blast_queries.length ; i ++ ) {
                var query = this.state.blast_queries[i];
                var allCoords = [];

                if (query.children.length > 0) {
                    var qlen = query.children[0].children[0].data.qlen;
                    var spineScale = d3.scale.linear()
                        .domain([1, qlen])
                        .range([1, dim[0] - this.state.blast_width - 400]);

                    var sbjs = [];
                    
                    for (var a = 0 ; a < query.children.length ; a ++ ) {
                        var subject = query.children[a];
                        var hspQCoords = [];
                        var hspEvals = [];
                        var hspSCoords = [];
                        var minEval = 1;
                        var maxEval = 0;

                        for (var b = 0 ; b < subject.children.length ; b ++ ) {
                            var hsp = subject.children[b];
                            var qCoord = [hsp.data.qstart,hsp.data.qend];
                            var sCoord = [hsp.data.sstart, hsp.data.send];
                            minEval = Math.min(hsp.data.evalue,minEval);
                            maxEval = Math.max(hsp.data.evalue,maxEval);

                            hspQCoords.push(qCoord);
                            hspSCoords.push(sCoord);
                            allCoords.push(qCoord);
                            hspEvals.push(hsp.data.evalue);
                        }

                        var unionQCoords = seeker.util.unionCoords(seeker.util.stableSortCoords(hspQCoords));
                        var unionSCoords = seeker.util.unionCoords(seeker.util.stableSortCoords(hspSCoords));
                        var unionSStart = unionSCoords[0][0];
                        var unionSEnd = unionSCoords[unionSCoords.length - 1][1];
                        var queryCov = seeker.util.coordLength(unionQCoords);

                        var pathString = '';

                        for (var d = 0 ; d < unionQCoords.length ; d ++ ) {
                            var qCoord = unionQCoords[d];
                            pathString += 'M ' + spineScale(qCoord[0]) + ',2 L ' + spineScale(qCoord[1]) + ',2 '
                        }

                        var color = a % 2 == 0 ? '#E8E8E8' : '#C4C4C4';

                        sbjs.push(
                                <tr style={{'background':color}}>
                                    <td className={'blastFirstColumn'}>{subject.name} <div onClick={this.blast_goToRef.bind(this, subject.name, unionSStart, unionSEnd)} className={'blastRefName'}>(view in browser)</div></td>
                                    <td>{subject.children.length} <div onClick={this.blast_toggleHSP.bind(this, subject)} className={'blastRefName'}>({subject.collapse ? "show HSPs" : "hide HSPs"})</div></td>
                                    <td>{queryCov} ({Math.round(queryCov / qlen * 100)}%)</td>
                                    <td>{minEval}</td>
                                    <td>{maxEval}</td>
                                </tr>
                            )

                        sbjs.push(<tr style={{'background':color}}>
                                        <td className={'blastFirstColumn'} style={{'font-size':10,'text-align':'right'}}>Tiled HSP</td>
                                        <td colSpan={'4'}>
                                            <svg className={"spineSVG"} style={{'width':spineScale(qlen)}}>
                                                <path d={pathString} stroke={'#636363'} strokeWidth={'3'}></path>
                                            </svg>
                                        </td>
                                    </tr>);

                        if (!subject.collapse) {
                            for (var x = 0 ; x < hspQCoords.length ; x ++ ) {
                                var qCoord = hspQCoords[x];
                                var hspPathString = 'M ' + spineScale(qCoord[0]) + ',2 L ' + spineScale(qCoord[1]) + ',2 '

                                sbjs.push(<tr style={{'background':color}}>
                                            <td className={'blastFirstColumn'} style={{'font-size':10,'text-align':'right'}}>e-value: {hspEvals[x]}</td>
                                            <td colSpan={'4'}>
                                                <svg className={"spineSVG"} style={{'width':spineScale(qlen)}}>
                                                    <path d={hspPathString} stroke={'#636363'} strokeWidth={'3'}></path>
                                                </svg>
                                            </td>
                                        </tr>);
                            }
                        }
                    }

                    var allUnionCoords = seeker.util.unionCoords(seeker.util.stableSortCoords(allCoords));
                    
                    queries.push(<div>
                            <table className={'blastTable'} style={{'width':dim[0] - this.state.blast_width - 60}}>
                                <tbody>
                                <tr style={{'font-size':'16px'}}>
                                    <td className={'blastFirstColumn'} style={{'font-weight':'bold','font-size':'16px'}}>{query.name}</td>
                                    <td colSpan={'2'}>
                                        coverage: {seeker.util.coordLength(allUnionCoords)} bases aligned of {qlen} bases ({Math.round(seeker.util.coordLength(allUnionCoords) / qlen * 10000) / 100}%)
                                    </td>
                                    <td colSpan={'2'}>
                                        {query.children.length} reference hits
                                    </td>
                                </tr>
                                <tr>
                                    <td className={'blastFirstColumn'} style={{'font-weight':'bold','font-size':'14px'}}></td>
                                    <td colSpan={'4'}>
                                        <div className={'spine'} style={{'width':spineScale(qlen)}}></div>
                                    </td>
                                </tr>
                                <tr style={{'font-weight':'bold'}}>
                                    <td>Reference hit</td>
                                    <td># of HSPs</td>
                                    <td>Query Coverage</td>
                                    <td>minimum e-value</td>
                                    <td>maximum e-value</td>
                                </tr>
                                {sbjs}
                                </tbody>
                            </table>
                        </div>)
                } else {
                    queries.push(<div>{query.name} - no hits</div>)
                }
            }

            blastResults = (
                <div>
                    {queries}
                </div>
            )
        }

        var blastContent = (
                <div>
                    <div style={{'width':this.state.blast_width,'height':dim[1] - this.state.menuHeight,'top':this.state.menuHeight}} className={'sidePanel'}>
                        <div className={'blastPanel'} style={{'height':dim[1] - this.state.menuHeight, 'overflow':'auto'}}>
                            <div className={'titlePanel'}>Input sequence</div>

                            <textarea style={{'height':dim[1] - this.state.menuHeight - 300, 'width':this.state.blast_width - 40}} onChange={this.blast_textChange} value={this.state.blast_input}></textarea>
                            <div className={'blastRadio'}>
                                <input type='radio' name='inType' onClick={this.blast_typeClick.bind(this,"n")} checked={this.state.blast_inputType == 'n' ? true : false}></input>
                                <label for='nucType'>Nucleotide</label>
                                <input type='radio' name='inType' onClick={this.blast_typeClick.bind(this,"p")} checked={this.state.blast_inputType == 'p' ? true : false}></input>
                                <label for='proType'>Protein</label>
                            </div>
                            {targetRows}
                            <div style={{'width':this.state.blast_width}} className={'blastButton'} onClick={this.blast_submit}>

                                <div>BLAST</div>
                                <div className={'blastJobStatus'} style={{'background':this.state.blast_jobs.filter(function(j) { return j.status == 'finished'; }).length == this.state.blast_jobs.length ? '#20B33D' : '#D12E2E'}}>
                                    {this.state.blast_jobs.filter(function(j) { return j.status == 'finished'; }).length} out of {this.state.blast_jobs.length} jobs finished
                                </div>
                                <div className={'loader'} style={{'left':(this.state.blast_width / 2) - 80, 'display':this.state.blast_jobs.filter(function(j) { return j.status == 'finished'; }).length == this.state.blast_jobs.length ? 'none':'block'}}></div>
                            </div>
                        </div>
                    </div>
                    <div className={'blastResultPanel'} style={{'width':dim[0] - this.state.blast_width - 40, 'height':dim[1] - 40 - this.state.menuHeight,'top':this.state.menuHeight, 'left':this.state.blast_width}}>
                        {blastResults}
                    </div>
                </div>
            );

        //brower content
        var browserContent;
        
        jsBrowser
            .whxy_delta(dim[0] - this.state.browser_width,dim[1] - this.state.menuHeight, this.state.browser_width, this.state.menuHeight)

        if (this.state.selectedTab == 'browser') {
            jsBrowser.container
                .style('display','block');

            jsBrowser
                .forceRender();
        } else {
            jsBrowser.container
                .style('display','none');
        }        

        if (this.state.browser_selected == 'overview') {
            var featTypeInfo = [];
            var colors = jsBrowser.trackColor();

            for (var i = 0 ; i < this.state.browser_trackStatus.length ; i ++ ) {
                var currentTrack = this.state.browser_trackStatus[i]

                var colorboxStyle = {'margin-right':'15px','border-radius':'5px','height':'20px','float':'left','width':'50px','background':currentTrack[1] ? colors[currentTrack[0]] : 'gray'};
                
                if (jsBrowser.data().typeIndex[currentTrack[0]] != undefined) {
                    featTypeInfo.push(
                        <div style={this.state.browser_dragBar == i ? {'border-bottom':'2px solid #131417'} : {}} className={'trackInfo'} onMouseDown={this.browser_trackDown.bind(this,i)} onMouseOver={this.browser_trackOver.bind(this,i)} onMouseUp={this.browser_trackUp.bind(this,i)}>
                            <div onClick={this.browser_colorboxClick.bind(this, i)} className={'trackColorbox'} style={colorboxStyle}>{currentTrack[1] ? 'on' : 'off'}</div>
                            {currentTrack[0]}
                            <div className={'tracksubInfo'}>number of features: {jsBrowser.data().typeIndex[currentTrack[0]].length}</div>
                        </div>
                        )
                }
            }

            var browserRefChange = (
                    <input onChange={this.browser_refInputChange} className={'browserRefInput'} style={{'width':this.state.browser_width - 150}} type='text'></input>
                );
            
            browserContent = (
                <div style={{'width':this.state.browser_width,'height':dim[1] - this.state.menuHeight,'top':this.state.menuHeight}} className={'sidePanel'}>
                    <div onClick={this.browser_refClick} className={'titlePanel'}>
                        {this.state.browser_refChange ? browserRefChange : this.state.browser_ref.toUpperCase()}
                        <div onClick={this.browser_refChange}className={'browserChangeRef'}>change</div>
                    </div>
                    <div className={'subtitlePanel'}>TRACKS</div>
                    <div className={'trackInfoContainer'} style={{'height':dim[1] - 35 - this.state.menuHeight, 'overflow':'auto'}}>
                        {featTypeInfo}
                        <div style={{'height':50}}></div>
                    </div>
                </div>
            )
        } else {
            var info = [];
            /*
            var jsObj = jsBrowser.data().featIndex[this.state.browser_selected];
            var extractCoords = [];
            for (var c = 0 ; c < jsObj.coords.length ; c ++ ) {
                var coord = jsObj.coords[c];
                extractCoords.push([coord[0] + jsObj.start, coord[0] + jsObj.start + coord[1]]);
            }

            seqSocket.emit('seq',{'seqName':jsObj.ref,'coords':extractCoords})
            */
            for (var i = 0 ; i < this.state.browser_feature.length ; i ++ ) {
                var featInfo = this.state.browser_feature[i];
                //different info types
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
                    tabDOM.push(<table style={{'width':this.state.blast_width - 40}} className={'feat_table'}>{rowsDOM}</table>);
                    info.push(<div className={'feat_info'}>
                            <div className={'feat_tupleKey'}>{featInfo[0]}</div>
                            {tabDOM}
                            </div>
                        )

                } else if (featInfo[1] == 'sequence') {

                } else if (featInfo[1] == 'linkout') {
                    
                }
            }

            browserContent = (
                <div style={{'width':this.state.browser_width,'height':dim[1] - this.state.menuHeight,'top':this.state.menuHeight}} className={'sidePanel'}>
                    <div onClick={this.browser_refClick} className={'titlePanel'}>{jsBrowser.data().name.toUpperCase()}</div>
                    <div className={'subtitlePanel'}>{this.state.browser_selected}</div>
                    <div className={'trackInfoContainer'} style={{'height':dim[1] - this.state.menuHeight - 35,'overflow':'auto'}}>
                        {info}
                        <div style={{'height':'50px'}}></div>
                    </div>
                </div>
            )
        }

        var helpContent;

        return (
                <div>

                    <ul className={'menuList'} style={{'height':this.state.menuHeight - 5}}>
                        <li onClick={this.menuClick.bind(this, 'blast')} style={{'background':this.state.selectedTab == 'blast' ? '#DB7332' : '#31343B'}}>Blast</li>
                        <li onClick={this.menuClick.bind(this, 'browser')} style={{'background':this.state.selectedTab == 'browser' ? '#DB7332' : '#31343B'}}>Browser</li>
                        <li onClick={this.menuClick.bind(this, 'help')} style={{'background':this.state.selectedTab == 'help' ? '#DB7332' : '#31343B'}}>Help</li>
                        <li style={{'float':'right','margin-right':'20px','font-size':14,'color':'white'}}>P. hawiensis Genome</li>
                    </ul>

                    <div style={{'display':this.state.selectedTab == 'blast' ? 'block' : 'none'}}>
                        {blastContent}
                    </div>

                    <div style={{'display':this.state.selectedTab == 'browser' ? 'block' : 'none'}}>
                        {browserContent}
                    </div>

                    <div style={{'display':this.state.selectedTab == 'help' ? 'block' : 'none'}}>
                        HELP CONTENT
                    </div>
                </div>
            )
    }
});

//declare variables
var jsBrowser = new seeker.browser()
    .attachTo(document.body)
    .whxy(500, 500, 400, 20);

var initRef = 'phaw_23.000000040';

var databaseMeta = {
    'phaw': {
        'tracks': {
            'Blast':'custom',
            'Transcriptome':'sparse',
            'Cufflinks assembly':'sparse',
            'Evidence Modeler':'sparse',
            'H. sapien proteome':'sparse',
            'M musculus proteome':'sparse',
            'D. pulex proteome':'sparse',
            'D. melanogaster proteome':'sparse',
            'C. elegans proteome':'sparse',
            'RNA-seq forward strand':'wiggle',
            'RNA-seq reverse strand':'wiggle',
        },
        'allTracks':['Blast','Evidence Modeler','Transcriptome','Cufflinks assembly','H. sapien proteome','M musculus proteome','D. pulex proteome','D. melanogaster proteome','C. elegans proteome']
    }
};

var app;
var initialized = false;
//sockets
var refSocket = io('http://148.251.54.48:8880/');
refSocket.on('result', function(res) {
    if (res.status == 'success') {
        var feats = res.data.trim().split('\n');
        //var db = res.db;

        var refObj = {
            'db':'phaw',
            'name':res.refName,
            'length':parseInt(feats[0]),
            'feats':[],
            'types':[],
            'trackTypes':{},
            'allTracks':databaseMeta['phaw'].allTracks
        }

        if (initialized) {
            if (app.blast_track[res.refName] != undefined) {
                refObj.types.push('Blast')
                var blastFeats = app.blast_track[res.refName];

                for (var i = 0 ; i < blastFeats.length ; i ++ ) {
                    refObj.feats.push(blastFeats[i]);
                    refObj.trackTypes['Blast'] = databaseMeta[refObj.db].tracks['Blast'];
                }
            }
        }

        for (var i = 1 ; i < feats.length ; i ++ ) {
            var cols = feats[i].split('\t');
            var coords = cols[4].split(';').map(function(item) {return item.split(',').map(function(c){return parseInt(c)})})

            var featObj = {
                'name':cols[0],
                'strand':cols[1],
                'ref':initRef,
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

        seeker.util.formatRef(refObj);

        jsBrowser.init(refObj, res.window.length > 0 ? res.window : [refObj.length * 0.3, refObj.length * 0.3 + 50000]);

        if (!initialized) {
            app = React.render(
                <App />,
                document.getElementById('app')
            );

            blastSocket = io('http://148.251.54.48:8882/');
            blastSocket.on('db', function (data) {
                app.setState({'blast_dbs':data});
                app.blast_typeClick('n');
            });

            blastSocket.on('result', function(data) {
                app.blast_jobFinished(data.jobIndex);
                app.blast_parse(data,1e-10);
                app.forceUpdate();
            })
            initialized = true;
        }

        var trackStatus = [];
        var trackOrder = jsBrowser.allTracks();

        for (var i = 0 ; i < trackOrder.length ; i ++ ) {
            if (jsBrowser.data().typeIndex[trackOrder[i]]) {
                trackStatus.push([trackOrder[i], true]);
            } else {
                trackStatus.push([trackOrder[i], false]);
            }
        }

        app.setState({'browser_ref':res.refName,'browser_trackStatus':trackStatus});
    } else {
        console.log(res.error)
    }
})

var sparseSocket = io('http://148.251.54.48:8881/');
sparseSocket.on('feat', function(d) {
    if (d.status == 'success') {
        var featObj = [];
        var data = d.data.split('>');
        var featName = data[0].trim();
        for (var i = 1 ; i < data.length ; i ++ ) {
            var meta = data[i].trim().split('\n');
            var key = meta[0].split('\t');
            featObj.push([key[0],key[1],meta.slice(1)])
        }

        app.setState({'browser_selected':featName,'browser_feature':featObj});
    } else {
        console.log(d.error);
    }
})

var seqSocket = io('http://148.251.54.48:8883/');
seqSocket.on('result', function(d) {
    console.log(d.data);
})

jsBrowser.hook_featureClick = function(featName) {
    sparseSocket.emit('feat',{'featName':featName})
}

var blastSocket;

var dim = seeker.util.winDimensions();

//initialize
refSocket.emit('ref',{'refName':initRef})