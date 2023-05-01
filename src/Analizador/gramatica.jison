

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
        let Return                      =   require("../Expresiones/Return").ReturnExpression;

        /*Instrucciones*/
        let Print                       =   require("../Instrucciones/Print").Print;
        let Declarar                    =   require("../Instrucciones/Declarar").Declarar;
        let Asignar                     =   require("../Instrucciones/Asignar").Asignar;
        let Funcion                     =   require("../Instrucciones/Funcion").Funcion;
        let Statement                   =   require("../Instrucciones/Statement").Statement;
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
              | DEC_VEC 
              | MOD_VEC
              | DEC_LIST
              | ADD_LIST
              | MOD_LIST
              | IF
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
              | MAIN ';'
              | LENGTH ';'

;


/*==================instrucciones=============================*/
DEC_VAR : TIPO id ';' {  $$ = new Declarar($2, $1, null, @1.first_line, @1.first_column); }
        | TIPO id '=' EXPRESIONES ';' { $$ = new Declarar($2, $1, $4, @1.first_line, @1.first_column ); }
;

ASIG_VAR : id '=' EXPRESIONES ';' { $$ = new Asignar($1, $3, @1.first_line, @1.first_column); }     
;

DEC_VEC : TIPO '[' ']' id '=' new TIPO '[' EXPRESIONES ']' ';'
        | TIPO '[' ']' id '=' '{' LISTA_VALORES '}' ';'
;

LISTA_VALORES : LISTA_VALORES ',' EXPRESIONES
              | EXPRESIONES
;

MOD_VEC : ACC_VEC '=' EXPRESIONES ';'
;


DEC_LIST : list '<' TIPO '>' id '=' new list '<' TIPO '>' ';'  {console.log("Se declaro la lista: " + $5); }
         | list '<' TIPO '>' id '=' TO_CHAR_ARRAY ';'
;

ADD_LIST : id '.' add '(' EXPRESIONES ')' ';' {console.log("Se agrego: "+ $5 + " en la lista: " + $1)}
;

MOD_LIST : ACC_LIST  '=' EXPRESIONES ';'
;





/*=======================SENTENCIAS===============================*/

IF : if '(' EXPRESIONES ')' '{' INSTRUCCIONES '}'
        | if '(' EXPRESIONES ')' '{' INSTRUCCIONES '}' ELSE
;

ELSE : else  IF
     | else '{' INSTRUCCIONES '}'
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

FOR : for '(' DECLARACION  EXPRESIONES ';' ACTUALIZACION ')' '{' INSTRUCCIONES '}' { console.log("Se inicializo un for con declaracion: " + $3 + " expresion: " + $5 + " y actualizcion: " + $7); }
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

RETURN : return ';'               { $$ = new Return(null, @1.first_line, @1.first_column); }      
       | return EXPRESIONES ';'   { $$ = new Return($1, @1.first_line, @1.first_column); }
;

/*===================FUNCIONES Y METODOS=======================*/

FUNCIONES : TIPO id '(' PARAMETROS ')' '{' STATEMENT '}' { $$ = new Funcion($1, $2, $4, $7, @1.first_line, @1.first_column)}
        | TIPO id '(' ')' '{' STATEMENT '}' { $$ = new Funcion($1, $2, [], $6, @1.first_line, @1.first_column)}
;

METODOS : void id '(' PARAMETROS ')' '{' STATEMENT '}'
        | void id '(' ')' '{' STATEMENT '}'
;

STATEMENT: INSTRUCCIONES { $$ = new Statement($1, @1.first_line, @1.first_column) }
;


PARAMETROS : PARAMETROS ',' PARAMETRO   { $1.push($3); $$ = $1 }
           | PARAMETRO                  { $$ = [$1]; }
;

PARAMETRO : TIPO id { $$ = new Parametros($1, $2, @1.first_line, @1.first_column); }
;



/*Para funciones*/
LLAMADA : id '(' PARAMETROS_LLAMADA ')' { $$ = new LlamadaFuncion($1, $3, @1.first_line, @1.first_column); }
        | id '(' ')' { $$ = new LlamadaFuncion($1, [], @1.first_line, @1.first_column); }
;

PARAMETROS_LLAMADA : PARAMETROS_LLAMADA ',' EXPRESIONES  { $1.push($3); $$ = $1; }
                   | EXPRESIONES { $$ = [$1]; }
;




/* ========================FUNCIONES=============================== */

PRINT : print '(' EXPRESIONES ')' ';' { $$ = new Print(@1.first_line, @1.first_column,$3); }
;




TO_LOWER : toLower '(' EXPRESIONES ')'
;

TO_UPPER : toUpper '(' EXPRESIONES ')'
;

LENGTH : length '(' EXP_LENGT ')'
;

EXP_LENGT : id
          | cadena
          | id '[' EXPRESIONES ']'
;

TRUNCATE : truncate '(' entero ')'
         | truncate '(' decimal ')'
         | truncate '(' id ')'
;

ROUND : round '(' EXPRESIONES ')'
;

TYPE_OF : typeof '(' EXPRESIONES ')'
;

TO_STRING : tostring '(' EXPRESIONES ')'
;

TO_CHAR_ARRAY : tochararray '(' EXPRESIONES ')'
;

MAIN : main id '(' ')'
     | main id '(' LISTA_VALORES ')' 
;


/*==================== expresiones ==========================*/
OP_TERNARIO : EXPRESIONES '?' EXPRESIONES ':' EXPRESIONES { $$ = new Ternario($1, $3, $5, @1.first_line, @1.first_column) }
;

CASTEO : '(' TIPO ')' EXPRESIONES
;

ACC_VEC : id '[' EXPRESIONES ']'
;

ACC_LIST: id '[' '[' EXPRESIONES ']' ']'
;





EXPRESIONES : ARITMETICAS               { $$ = $1; }
            | '(' EXPRESIONES ')'       { $$ = $2; }
            | RELACIONALES              { $$ = $1; console.log("Sube el relacional"); }
            | LOGICOS
            | ACC_LIST
            | ACC_VEC
            | LENGTH
            | LLAMADA                   { $$ = $1; }
            | CASTEO
            | TO_UPPER
            | TO_LOWER
            | TO_CHAR_ARRAY
            | TO_STRING
            | TYPE_OF
            | ROUND
            | TRUNCATE
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
            | '-' EXPRESIONES %prec negacion    {  $$ = new OperacionAritmetica($1, $2, $3, @1.first_line, @2.first_column); }
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
