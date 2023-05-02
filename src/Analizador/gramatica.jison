

/* Definicion lexica */
%lex

%options case-insensitive

%%
\s+                    {/* skip whitespace */}


/* ========================= COMENTARIOS ============================== */
"//".*                                 {/* IGNORE */}
\/\*([^*]|\*(?!\/))*\*\/    {/* IGNORE */}


/* =========================== PALABRAS RESERVADAS ========================== */
/*Tipos de datos*/
"int"                                           { return 'pint'; }
"double"                                        { return 'pdouble'; }
"boolean"                                       { return 'pboolean'; }
"char"                                          { return 'pchar'; }
"string"                                        { return 'pstring'; }
"true"                                          { return 'ptrue'; }
"false"                                         { return 'pfalse'; }
"new"                                           { return 'new'; }
"list"                                          { return 'list'; }
"add"                                           { return 'add'; }
"if"                                            { return 'if'; }
"else"                                          { return 'else'; }
"switch"                                        { return 'switch'; }
"case"                                          { return 'case'; }
"default"                                       { return 'default';}
"break"                                         { return 'break';}
"continue"                                      { return 'continue';}
"return"                                        { return 'return';}
"while"                                         { return 'while';}
"for"                                           { return 'for';}
"do"                                            { return 'do';}
"void"                                          { return 'void';}
"print"                                         { return 'print';}
"toLower"                                       { return 'toLower';}
"toUpper"                                       { return 'toUpper';}
"length"                                        { return 'length';}
"truncate"                                      { return 'truncate';}
"round"                                         { return 'round';}
"typeof"                                        { return 'typeof';}
"tostring"                                      { return 'tostring';}
"tochararray"                                   { return 'tochararray';}
"main"                                          { return 'main';}


/* ======================= EXPRESIONES REGULARES ============================= */
([a-zA-ZÑñ]|("_"[a-zA-ZÑñ]))([a-zA-ZÑñ]|[0-9]|"_")*                             yytext = yytext.toLowerCase();                  return 'id';
\"([a-zA-Z]|[0-9]|[!]|[#-&]|[(-/)]|[\:-@]|[\[]|[\]]|[_]|[\|]|\\t|\s)+\"         yytext = yytext.substr(1,yyleng-2);             return 'cadena';
\'[!-~]\'                                                                       yytext = yytext.substr(1,yyleng-2);             return 'caracter';
[0-9]+\.[0-9]+                                                                                                                  return 'decimal';
[0-9]+                                                                                                                          return 'entero';



/* ============================== SIGNOS ===================================== */
"++"                                            { return '++'; }
"--"                                            { return '--'; }

/*Operadores aritmeticos*/
"+"                                             { return '+'; }
"-"                                             { return '-'; }
"*"                                             { return '*'; }
"/"                                             { return '/'; }
"^"                                             { return '^'; }
"%"                                             { return '%'; }

/*Operadores relacionales*/
"=="                                            { return '=='; }
"!="                                            { return '!='; }
"<="                                            { return '<='; }
"<"                                             { return '<'; }
">="                                            { return '>='; }
">"                                             { return '>'; }

/*Operador ternario*/
"?"                                             { return '?'; }
":"                                             { return ':'; }

/*operadores logicos*/
"||"                                            { return '||'; }
"&&"                                            { return '&&'; }
"!"                                             { return '!'; }

/*signos de agrupacion*/
"("                                             { return '('; }
")"                                             { return ')'; }              
";"                                             { return ';'; }
"{"                                             { return '{'; }
"}"                                             { return '}'; }
"["                                             { return '['; }
"]"                                             { return ']'; }
"="                                             { return '='; }
","                                             { return ','; }
"."                                             { return '.'; }




<<EOF>>                 return 'EOF';
.       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
/lex

/* Importaciones */
%{
        let TipoPrimitivo               =   require("../Entorno/Simbolos/TipoPrimitivo").TipoPrimitivo;
        
        /*Expresiones*/
        let Primitivo                   =   require("../Expresiones/Primitivo").Primitivo;                    
        let Acceso                      =   require("../Expresiones/Acceso").Acceso;
        let OperacionAritmetica         =   require("../Expresiones/OperacionAritmetica").OperacionAritmetica;
        let Relacional                  =   require("../Expresiones/Relacional").Relacional;
        let Ternario                    =   require("../Expresiones/Ternario").Ternario;
        let Logicas                     =   require("../Expresiones/Logicas").Logicas;
        let Parametros                  =   require("../Expresiones/Parametros").Parametros;
        let LlamadaFuncion              =   require("../Expresiones/LlamadaFuncion").LlamadaFuncion;
        let ToLower                     =   require("../Expresiones/ToLower").ToLower;
        let ToUpper                     =   require("../Expresiones/ToUpper").ToUpper;
        let Truncate                    =   require("../Expresiones/Truncate").Truncate;
        let Round                       =   require("../Expresiones/Round").Round;
        let Typeof                      =   require("../Expresiones/Typeof").Typeof;
        let ToString                    =   require("../Expresiones/ToString").ToString;
        let Casteo                      =   require("../Expresiones/Casteo").Casteo;
        let AccederLista                =   require("../Expresiones/AccederLista").AccederLista;
        let AccesoVector                =   require("../Expresiones/AccesoVector").AccesoVector;
        let Length                      =   require("../Expresiones/Length").Length;
        let ToCharArray                 =   require("../Expresiones/ToCharArray").ToCharArray;
        let ReturnExpresion             =   require("../Expresiones/ReturnExpresion").ReturnExpresion;
        


        /*Instrucciones*/
        let Print                       =   require("../Instrucciones/Print").Print;
        let Declarar                    =   require("../Instrucciones/Declarar").Declarar;
        let Asignar                     =   require("../Instrucciones/Asignar").Asignar;
        let Funcion                     =   require("../Instrucciones/Funcion").Funcion;
        let Statement                   =   require("../Instrucciones/Statement").Statement;
        let DeclararLista               =   require("../Instrucciones/DeclararLista").DeclararLista;
        let PushLista                   =   require("../Instrucciones/PushLista").PushLista;
        let ModificarLista              =   require("../Instrucciones/ModificarLista").ModificarLista;
        let DeclararVector              =   require("../Instrucciones/DeclararVector").DeclararVector;
        let ModificarVector             =   require("../Instrucciones/ModificarVector").ModificarVector;
        let DeclararVector2             =   require("../Instrucciones/DeclararVector2").DeclararVector2;
        let LlamadaMetodo               =   require("../Instrucciones/LlamadaMetodo").LlamadaMetodo;
        let Metodo                      =   require("../Instrucciones/Metodo").Metodo
        let If                          =   require("../Instrucciones/If").If;
        let Main                        =   require("../Instrucciones/Main").Main;

%}      



/* ================= ASOCIATIVIDAD y PRECEDENCIA DE OPERADORES ===============
%left '++' '--'

/*Operaciones aritmeticos*/
%right negacion '('
%left '^'
%left '*' '/' '%'
%left '+' '-'

/*Operaciones relacionales*/
%left '!=' '==' '>' '<' '<=' '>=' 

/*Operaciones logicos*/
%right '!'
%left '&&'
%left '||'






%start INI

%% /* lenguaje grammar */

INI : SENTENCIAS  EOF { return $1; };

SENTENCIAS : INSTRUCCIONES { $$ = $1; }
;



INSTRUCCIONES : INSTRUCCIONES INSTRUCCION { $1.push($2); $$ = $1;}
              | INSTRUCCION { $$ = [$1]; }
;

INSTRUCCION : DEC_VAR                   { $$ = $1; }
              | ASIG_VAR                { $$ = $1; }
              | DEC_VEC                 { $$ = $1; }
              | MOD_VEC                 { $$ = $1; }
              | DEC_LIST                { $$ = $1; }
              | ADD_LIST                { $$ = $1; }
              | MOD_LIST                { $$ = $1; }
              | LLAMADA_METODO          { $$ = $1; }
              | IF                      { $$ = $1; }
              | SWITCH_CASE
              | WHILE 
              | FOR
              | DO_WHILE
              | break ';'
              | continue ';'
              | RETURN                  { $$ = $1; }
              | EXPRESIONES '++' ';'
              | EXPRESIONES '--' ';'
              | METODOS
              | FUNCIONES               { $$ = $1; }
              | LLAMADA ';'             { $$ = $1; }
              | PRINT                   { $$ = $1; }
              | MAIN ';'                { $$ = $1; }

;


/*==================instrucciones=============================*/
DEC_VAR : TIPO id ';' {  $$ = new Declarar($2, $1, null, @1.first_line, @1.first_column); }
        | TIPO id '=' EXPRESIONES ';' { $$ = new Declarar($2, $1, $4, @1.first_line, @1.first_column ); }
;

ASIG_VAR : id '=' EXPRESIONES ';' { $$ = new Asignar($1, $3, @1.first_line, @1.first_column); }     
;

DEC_VEC : TIPO '[' ']' id '=' new TIPO '[' EXPRESIONES ']' ';' { $$ = new DeclararVector($4, $1, $9, @1.first_line, @1.first_column); }
        | TIPO '[' ']' id '=' '{' LISTA_VALORES '}' ';' { $$ = new DeclararVector2($4, $1, $7, @1.first_line, @1.first_column); }
;

LISTA_VALORES : LISTA_VALORES ',' EXPRESIONES { $1.push($3); $$ = $1; }
              | EXPRESIONES { $$ = [$1]; }
;

MOD_VEC : id '[' EXPRESIONES ']' '=' EXPRESIONES ';'  { $$ = new ModificarVector($1, $3, $6, @1.first_line, @1.first_column); }
;


DEC_LIST : list '<' TIPO '>' id '=' new list '<' TIPO '>' ';'  { $$ = new DeclararLista($5, $3, @1.first_line, @1.first_column, null); }
         | list '<' TIPO '>' id '=' TO_CHAR_ARRAY ';'          { $$ = new DeclararLista($5, $3, @1.first_line, @1.first_column, $7); }
;

TO_CHAR_ARRAY : tochararray '(' EXPRESIONES ')'  { $$ = new ToCharArray($3, @1.first_line, @1.first_column); }
; 

ADD_LIST : id '.' add '(' EXPRESIONES ')' ';'  { $$ = new PushLista($1, $5, @1.first_line, @1.first_column); }
;

MOD_LIST : id '[' '[' EXPRESIONES ']' ']'  '=' EXPRESIONES ';' { $$ = new ModificarLista($1, $4, $8, @1.first_line, @1.first_column) }
;





/*=======================SENTENCIAS===============================*/

IF : if '(' EXPRESIONES ')' STATEMENT ELSE  { $$ = new If($3, $5, $6, @1.first_line, @1.first_column); }
;

ELSE : else STATEMENT   { $$ = $2; }
     | else IF          { $$ = $2; }
     |                  { $$ = null; }
;



SWITCH_CASE : switch '(' EXPRESIONES ')' '{' CASE_LIST DEFAULT '}'
             | switch '(' EXPRESIONES ')' '{' CASE_LIST '}'
             | switch '(' EXPRESIONES ')' '{' DEFAULT '}'
;

CASE_LIST : CASE_LIST case EXPRESIONES ':' INSTRUCCIONES
          | case EXPRESIONES ':' INSTRUCCIONES
;

DEFAULT : default ':' INSTRUCCIONES
;

WHILE : while '(' EXPRESIONES ')' '{' INSTRUCCIONES '}' 
;

FOR : for '(' DECLARACION  EXPRESIONES ';' ACTUALIZACION ')' STATEMENT { console.log("Se inicializo un for con declaracion: " + $3 + " expresion: " + $5 + " y actualizcion: " + $7); }
;

DECLARACION : DEC_VAR
            | ASIG_VAR
;

ACTUALIZACION : EXPRESIONES '++'
              | EXPRESIONES '--'
              | ASIG_VAR
;

DO_WHILE : do '{' INSTRUCCIONES '}' while '(' EXPRESIONES ')' ';'
;

RETURN : return ';'               { $$ = new ReturnExpresion(null, @1.first_line, @1.first_column); }      
       | return EXPRESIONES ';'   { $$ = new ReturnExpresion($2, @1.first_line, @1.first_column); }
;

/*===================FUNCIONES Y METODOS=======================*/

FUNCIONES : TIPO id '(' PARAMETROS ')'  STATEMENT { $$ = new Funcion($1, $2, $4, $6, @1.first_line, @1.first_column)}
        | TIPO id '(' ')'  STATEMENT              { $$ = new Funcion($1, $2, [], $5, @1.first_line, @1.first_column)}
;

METODOS : void id '(' PARAMETROS ')' STATEMENT { $$ = new Metodo($2, $4, $6, @1.first_line, @1.first_column); }
        | void id '(' ')'  STATEMENT           { $$ = new Metodo($2, [], $5, @1.first_line, @1.first_column); } 
;

STATEMENT: '{' INSTRUCCIONES '}' { $$ = new Statement($2, @1.first_line, @1.first_column) }
;


PARAMETROS : PARAMETROS ',' PARAMETRO   { $1.push($3); $$ = $1 }
           | PARAMETRO                  { $$ = [$1]; }
;

PARAMETRO : TIPO id { $$ = new Parametros($1, $2, @1.first_line, @1.first_column); }
;



/*Para funciones*/
LLAMADA_FUNCION : id '(' PARAMETROS_LLAMADA ')' { $$ = new LlamadaFuncion($1, $3, @1.first_line, @1.first_column); }
        | id '(' ')'            { $$ = new LlamadaFuncion($1, [], @1.first_line, @1.first_column); }
;

/*Para metodos*/
LLAMADA_METODO : id '(' PARAMETROS_LLAMADA ')' ';' { $$ = new LlamadaMetodo($1, $3, @1.first_line, @1.first_column); }
        | id '(' ')' ';'            { $$ = new LlamadaMetodo($1, [], @1.first_line, @1.first_column); }
;


PARAMETROS_LLAMADA : PARAMETROS_LLAMADA ',' EXPRESIONES  { $1.push($3); $$ = $1; }
                   | EXPRESIONES { $$ = [$1]; }
;




/* ========================FUNCIONES=============================== */

PRINT : print '(' EXPRESIONES ')' ';' { $$ = new Print(@1.first_line, @1.first_column,$3); }
;




TO_LOWER : toLower '(' EXPRESIONES ')' { $$ = new ToLower($3, @1.first_line, @1.first_column); }
;

TO_UPPER : toUpper '(' EXPRESIONES ')' { $$ = new ToUpper($3, @1.first_line, @1.first_column); }
;

LENGTH : length '(' EXP_LENGT ')' { $$ = new Length($3, @1.first_line, @1.first_column); }
;

EXP_LENGT : id                                  { $$ = new Acceso($1, @1.first_line, @1.first_column); }
          | cadena                              { $$ = new Primitivo(@1.first_line, @1.first_column, $1, TipoPrimitivo.String)}
          | id '[' EXPRESIONES ']'              { $$ = new AccesoVector($1, $3, @1.first_line, @1.first_column) }
          | id '[' '[' EXPRESIONES ']' ']'      { $$ = new AccederLista($1, $4, @1.first_line, @1.first_column); }
;

TRUNCATE : truncate '(' EXPRESIONES ')' { $$ = new Truncate($3, @1.first_line, @1.first_column); }
;

ROUND : round '(' EXPRESIONES ')' { $$ = new Round($3, @1.first_line, @1.first_column); }
;

TYPE_OF : typeof '(' EXPRESIONES ')' { $$ = new Typeof($3, @1.first_line, @1.first_column); }
;

TO_STRING : tostring '(' EXPRESIONES ')' { $$ = new ToString($3, @1.first_line, @1.first_column); }
;

CASTEO : '(' TIPO ')' EXPRESIONES  { $$ = new Casteo($2, $4, @1.first_line, @1.first_column); }
;

MAIN : main id '(' ')'                          { $$ = new Main($2, [], @1.first_line, @1.first_column); }
     | main id '(' PARAMETROS_LLAMADA ')'       { $$ = new Main($2, $4, @1.first_line, @1.first_column); }
;


/*==================== expresiones ==========================*/
OP_TERNARIO : EXPRESIONES '?' EXPRESIONES ':' EXPRESIONES { $$ = new Ternario($1, $3, $5, @1.first_line, @1.first_column) }
;



ACC_VEC : id '[' EXPRESIONES ']'  { $$ = new AccesoVector($1, $3, @1.first_line, @1.first_column) }
;

ACC_LIST: id '[' '[' EXPRESIONES ']' ']'  { $$ = new AccederLista($1, $4, @1.first_line, @1.first_column); }
;





EXPRESIONES : ARITMETICAS               { $$ = $1; }
            | '(' EXPRESIONES ')'       { $$ = $2; }
            | RELACIONALES              { $$ = $1; }
            | LOGICOS                   { $$ = $1; }
            | ACC_LIST                  { $$ = $1; }
            | ACC_VEC                   { $$ = $1; }
            | LENGTH                    { $$ = $1; }
            | LLAMADA_FUNCION           { $$ = $1; }
            | CASTEO                    { $$ = $1; }
            | TO_UPPER                  { $$ = $1; }
            | TO_LOWER                  { $$ = $1; }
            | TO_STRING                 { $$ = $1; }
            | TYPE_OF                   { $$ = $1; }
            | ROUND                     { $$ = $1; }
            | TRUNCATE                  { $$ = $1; }
            | OP_TERNARIO               { $$ = $1; }
            | id                        { $$ = new Acceso($1, @1.first_line, @1.first_column); }
            | PRIMITIVOS                { $$ = $1; }        
;

LOGICOS : EXPRESIONES '&&' EXPRESIONES  { $$ = new Logicas($1, $2, $3, @1.first_line, @1.first_line); }
        | EXPRESIONES '||' EXPRESIONES  { $$ = new Logicas($1, $2, $3, @1.first_line, @1.first_line); }
        | '!' EXPRESIONES               { $$ = new Logicas(null, $1, $2, @1.first_line, @1.first_line); }
;

PRIMITIVOS : entero          { $$ = new Primitivo(@1.first_line, @1.first_column, $1, TipoPrimitivo.Integer)}
            | decimal         { $$ = new Primitivo(@1.first_line, @1.first_column, $1, TipoPrimitivo.Double)}
            | caracter        { $$ = new Primitivo(@1.first_line, @1.first_column, $1, TipoPrimitivo.Char)}
            | cadena          { $$ = new Primitivo(@1.first_line, @1.first_column, $1, TipoPrimitivo.String)}
            | pfalse          { $$ = new Primitivo(@1.first_line, @1.first_column, $1, TipoPrimitivo.Boolean)}
            | ptrue           { $$ = new Primitivo(@1.first_line, @1.first_column, $1, TipoPrimitivo.Boolean)} 
;

ARITMETICAS : EXPRESIONES '+' EXPRESIONES       {  $$ = new OperacionAritmetica($1, $2, $3, @1.first_line, @2.first_column); }   
            | EXPRESIONES '-' EXPRESIONES       {  $$ = new OperacionAritmetica($1, $2, $3, @1.first_line, @2.first_column); } 
            | EXPRESIONES '*' EXPRESIONES       {  $$ = new OperacionAritmetica($1, $2, $3, @1.first_line, @2.first_column); } 
            | EXPRESIONES '/' EXPRESIONES       {  $$ = new OperacionAritmetica($1, $2, $3, @1.first_line, @2.first_column); } 
            | EXPRESIONES '^' EXPRESIONES       {  $$ = new OperacionAritmetica($1, $2, $3, @1.first_line, @2.first_column); } 
            | EXPRESIONES '%' EXPRESIONES       {  $$ = new OperacionAritmetica($1, $2, $3, @1.first_line, @2.first_column); } 
            | '-' EXPRESIONES %prec negacion    
;

RELACIONALES : EXPRESIONES '==' EXPRESIONES     {  $$  = new Relacional($1, $2, $3, @1.first_line, @1.first_column); }
            | EXPRESIONES '!=' EXPRESIONES      {  $$  = new Relacional($1, $2, $3, @1.first_line, @1.first_column); }
            | EXPRESIONES '<' EXPRESIONES       {  $$  = new Relacional($1, $2, $3, @1.first_line, @1.first_column); }
            | EXPRESIONES '>' EXPRESIONES       {  $$  = new Relacional($1, $2, $3, @1.first_line, @1.first_column); }
            | EXPRESIONES '<=' EXPRESIONES      {  $$  = new Relacional($1, $2, $3, @1.first_line, @1.first_column); }
            | EXPRESIONES '>=' EXPRESIONES      {  $$  = new Relacional($1, $2, $3, @1.first_line, @1.first_column); }
;

TIPO : pint             { $$ = TipoPrimitivo.Integer; }     
     | pdouble          { $$ = TipoPrimitivo.Double; }
     | pboolean         { $$ = TipoPrimitivo.Boolean; }
     | pchar            { $$ = TipoPrimitivo.Char; }     
     | pstring          { $$ = TipoPrimitivo.String }
;
