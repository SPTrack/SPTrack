process.env.AMBIENTE_PROCESSO = "desenvolvimento";
//process.env.AMBIENTE_PROCESSO = "producao";

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3333 : 8080;

var app = express();

var indexRouter = require("./src/routes/index");
var instituicaoRouter = require('./src/routes/instituicoes');
var usuarioRouter = require('./src/routes/usuarios');
var salaRouter = require('./src/routes/salas');
var medidasRouter = require('./src/routes/medidas');
var tarefasRouter = require('./src/routes/tarefas');
var processoRouter = require('./src/routes/processo');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/instituicoes", instituicaoRouter);
app.use("/usuarios", usuarioRouter);
app.use('/salas', salaRouter);
app.use('/medidas', medidasRouter);
app.use('/tarefas', tarefasRouter);
app.use('/processo',processoRouter);


app.listen(PORTA, function () {
    console.log(`Link: http://localhost:${PORTA}\nAmbiente: ${process.env.AMBIENTE_PROCESSO}`);
});