document.addEventListener('deviceready', onDeviceReady, false);

let banco;

function insert(){
    console.log("Function insert...");
    let login = document.getElementById("txtusuario").value;
    let pass = document.getElementById("txtsenha").value;

    banco.transaction(
        function(tx){
            tx.executeSql("INSERT INTO usuarios VALUES (?,?)", [login, pass]);
        },
        function(error){
            alert("ERROR durente a transacao com o banco: " + error.message);
        },
        function(){
            alert("Transacao realizada com sucesso!!");
        }
    );
}

function listen(){
    console.log("Fucntion listen...");

    banco.executeSql(
        "SELECT login AS uLoginName, pass AS uPassword FROM usuarios", [], function(txt, rs){
            alert(JSON.stringify(rs));
            alert(rs.rows.lenght);
            let h = 0;
            for(h = 0; h < rs.rows.lenght; h++){
                alert("Item: " +h);
                let recordItem = rs.rows.item(h);
                console.log(JSON.stringify(recordItem));
            }

        },
        function(error){
            alert("ERROR no Select: " + error.message);
    });
}

function startDb(){

}

function onDeviceReady() {
    startDb();

    document.getElementById("insert").addEventListener("click", insert);
    document.getElementById("listen").addEventListener("click", listen);
}
