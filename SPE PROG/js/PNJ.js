class PNJ {


    // constructeur
    PNJ::PNJ(){

        // GET DATABASE
        _Nodes = REQUEST.GET(#ID,#MDP,#DATABASE).JSONtoINT();


        // Variables
        nCurrentNode = 0;
        nNodeMax = _Nodes.length()-1;
        nSpeed = 


        // Methode
        initState("IDLE");

    }

    var sCurrentState;
    var myBody;
    var mySpawn;
    var myTarget;

    var nCurrentNode;
    var nNodeMax;
    var _Nodes;

    var nDir;
    var nSpeed;

    // _# STATE MACHINE
    function initState(var sNewState){
        
        // _$DEBUGSTATE
        //console.log(sNewState);

        if (sNewState == "IDLE"){
            // initalise les var de Spawn
            // initialisation des chemins
            // vider les var globales
            // ...
        }
        else if (sNewState == "SPAWN"){
            myBody.position = mySpawn.position;
        }
        else if (sNewState == "GET_NODE"){
            
            // Get #ID du NODE
            nCurrentNode ++;
            
            if (nCurrentNode > nNodeMax){
                nCurrentNode = 0;
            }

            myTarget = _Nodes[nCurrentNode];

            //GET DIRECTION
            nDir = myTarget.position - myBody.position;
        }


        // potentielles futures modifs
        else if (sNewNode == "PATROL"){

        }
        sCurrentState = sNewState;
    }

    function update(){
        if (sCurrentState == "IDLE"){
            exitState();
        }
        else if (sCurrentState == "SPAWN"){
            exitState();
        }
        else if (sCurrentState == "GET_NODE"){
            exitState();
        }
        else if (sCurrentState == "PATROL"){
            // var dt = ?
            myBody.position = nDir * dt * nSpeed;

            if (myBody.position - myTarget.position < 0.5f && myBody.position - myTarget.position > -0.5f ){
                exitState();
            }
        }
    }

    function exitState(){
        if (sCurrentState == "IDLE"){
            initState("SPAWN");
        }
        else if (sCurrentState == "SPAWN"){
            initState("GET_NODE")
        }
        else if (sCurrentState == "GET_NODE"){
            initState("PATROL");
        }
    }




}