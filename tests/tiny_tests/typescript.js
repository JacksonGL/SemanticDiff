// Copyright 2013 the Octane Benchmark project authors. All rights reserved.
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above
//       copyright notice, this list of conditions and the following
//       disclaimer in the documentation and/or other materials provided
//       with the distribution.
//     * Neither the name of Google Inc. nor the names of its
//       contributors may be used to endorse or promote products derived
//       from this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

function setupTypescript() {
}


function tearDownTypescript() {
  compiler_input = null;
}


var parseErrors = [];


function runTypescript() {
  var compiler = createCompiler();
  compiler.addUnit(compiler_input, "compiler_input.ts");
  parseErrors = [];
  compiler.reTypeCheck();
  compiler.emit({
           createFile: function (fileName) { return outfile; },
           fileExists: function (path) { return false; },
           directoryExists: function (path) { return false; },
           resolvePath: function (path) { return path; }
  });
  
  if (parseErrors.length != 192 && parseErrors.length != 193) {
    throw new Error("Parse errors.");
  }
  compiler = null;
}

var outfile = {
  checksum: -412589664, 
  cumulative_checksum: 0,
  Write: function (s) { this.Verify(s); },
  WriteLine: function (s) { this.Verify(s + "\n"); },
  Close: function () {
    if (this.checksum != this.cumulative_checksum) {
      throw new Error("Wrong checksum.");
    }
    this.cumulative_checksum = 0;
  },
  Verify: function (s) {
    for(var i = 0; i < s.length; i++) {
      var c = s.charCodeAt(i);
      this.cumulative_checksum = (this.cumulative_checksum << 1) ^ c;
    }
  }
};


var outerr = {
  checksum: 0,
  cumulative_checksum: 0,
  Write: function (s) { this.Verify(s); },
  WriteLine: function (s) { this.Verify(s + "\n"); },
  Close: function () {
    if (this.checksum != this.cumulative_checksum) {
      throw new Error("Wrong checksum.");
    }
    this.cumulative_checksum = 0;
  },
  Verify: function (s) {
    for(var i = 0; i < s.length; i++) {
      var c = s.charCodeAt(i);
      this.cumulative_checksum = (this.cumulative_checksum << 1) ^ c;
    }
  }
};


function createCompiler() {
  var settings = new TypeScript.CompilationSettings();
  settings.codeGenTarget = TypeScript.CodeGenTarget.ES5;
  var compiler = new TypeScript.TypeScriptCompiler(
      outerr, new TypeScript.NullLogger, settings);
  compiler.setErrorCallback(function (start, len, message) { 
    parseErrors.push({ start: start, len: len, message: message }); 
  });
  compiler.parser.errorRecovery = true;
  compiler.typeCheck();
  return compiler
}

// The two files accompanying this benchmark contain a modified version of the
// Typescript compiler. They can be generated using the following instructions
// with the code available at:
//    http://typescript.codeplex.com/SourceControl/changeset/view/258e00903a9e
//
// 1) Copy the compiler from $TYPESCRIPT/bin/tsc.js to typescript-compiler.js
// 2) Remove the call to the batch compiler from the last line of tsc.js
// 3) Add this code after line 7963 (fix for Mozilla Firefox):
//    if (this.currentToken === undefined)
//      this.currentToken = this.scanner.scan();
// 4) Add this code after line 9142 (fix for Mozilla Firefox):
//    if (this.currentToken === undefined) {
//      this.currentToken = this.scanner.scan();
//      continue;
//    }
// 5) Generate the Typescript compiler input using the following command:
//    $ cat $TYPESCRIPT/src/compiler/*.ts | iconv -c -f utf8 -t ascii \
//      | dos2unix > /tmp/compiler_input
// 6) Run the following Python script to generate the reformatted input:
//    $ python script.py > typescript-input.js
//
// #!/usr/bin/env python
// import re;
// def escape_and_format(data, varname):
//   data = data.replace("\\", "\\\\").replace("\"", "\\\"")
//          .replace("\n", "\\n");
//   data = "var " + varname + " = \"" + data + "\""
//   print data; 
// result = open("/tmp/compiler_input", 'r');
// escape_and_format(result.read(), "compiler_input")
//
// The following is the original copyright notice present in the Typescript
// compiler source at the time this benchmark was generated:
//
/* *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved. 
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0  
 
THIS CODE IS PROVIDED *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE, 
MERCHANTABLITY OR NON-INFRINGEMENT. 
 
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */


var TypeScript;
(function (TypeScript) {
    function hasFlag(val, flag) {
        return (val & flag) != 0;
    }
    TypeScript.hasFlag = hasFlag;
    (function (ErrorRecoverySet) {
        ErrorRecoverySet._map = [];
        ErrorRecoverySet.None = 0;
        ErrorRecoverySet.Comma = 1;
        ErrorRecoverySet.SColon = 1 << 1;
        ErrorRecoverySet.Asg = 1 << 2;
        ErrorRecoverySet.BinOp = 1 << 3;
        ErrorRecoverySet.RBrack = 1 << 4;
        ErrorRecoverySet.RCurly = 1 << 5;
        ErrorRecoverySet.RParen = 1 << 6;
        ErrorRecoverySet.Dot = 1 << 7;
        ErrorRecoverySet.Colon = 1 << 8;
        ErrorRecoverySet.PrimType = 1 << 9;
        ErrorRecoverySet.AddOp = 1 << 10;
        ErrorRecoverySet.LCurly = 1 << 11;
        ErrorRecoverySet.PreOp = 1 << 12;
        ErrorRecoverySet.RegExp = 1 << 13;
        ErrorRecoverySet.LParen = 1 << 14;
        ErrorRecoverySet.LBrack = 1 << 15;
        ErrorRecoverySet.Scope = 1 << 16;
        ErrorRecoverySet.In = 1 << 17;
        ErrorRecoverySet.SCase = 1 << 18;
        ErrorRecoverySet.Else = 1 << 19;
        ErrorRecoverySet.Catch = 1 << 20;
        ErrorRecoverySet.Var = 1 << 21;
        ErrorRecoverySet.Stmt = 1 << 22;
        ErrorRecoverySet.While = 1 << 23;
        ErrorRecoverySet.ID = 1 << 24;
        ErrorRecoverySet.Prefix = 1 << 25;
        ErrorRecoverySet.Literal = 1 << 26;
        ErrorRecoverySet.RLit = 1 << 27;
        ErrorRecoverySet.Func = 1 << 28;
        ErrorRecoverySet.EOF = 1 << 29;
        ErrorRecoverySet.TypeScriptS = 1 << 30;
        ErrorRecoverySet.ExprStart = ErrorRecoverySet.SColon | ErrorRecoverySet.AddOp | ErrorRecoverySet.LCurly | ErrorRecoverySet.PreOp | ErrorRecoverySet.RegExp | ErrorRecoverySet.LParen | ErrorRecoverySet.LBrack | ErrorRecoverySet.ID | ErrorRecoverySet.Prefix | ErrorRecoverySet.RLit | ErrorRecoverySet.Func | ErrorRecoverySet.Literal;
        ErrorRecoverySet.StmtStart = ErrorRecoverySet.ExprStart | ErrorRecoverySet.SColon | ErrorRecoverySet.Var | ErrorRecoverySet.Stmt | ErrorRecoverySet.While | ErrorRecoverySet.TypeScriptS;
        ErrorRecoverySet.Postfix = ErrorRecoverySet.Dot | ErrorRecoverySet.LParen | ErrorRecoverySet.LBrack;
    })(TypeScript.ErrorRecoverySet || (TypeScript.ErrorRecoverySet = {}));
    var ErrorRecoverySet = TypeScript.ErrorRecoverySet;
    (function (AllowedElements) {
        AllowedElements._map = [];
        AllowedElements.None = 0;
        AllowedElements.ModuleDeclarations = 1 << 2;
        AllowedElements.ClassDeclarations = 1 << 3;
        AllowedElements.InterfaceDeclarations = 1 << 4;
        AllowedElements.AmbientDeclarations = 1 << 10;
        AllowedElements.Properties = 1 << 11;
        AllowedElements.Global = AllowedElements.ModuleDeclarations | AllowedElements.ClassDeclarations | AllowedElements.InterfaceDeclarations | AllowedElements.AmbientDeclarations;
        AllowedElements.QuickParse = AllowedElements.Global | AllowedElements.Properties;
    })(TypeScript.AllowedElements || (TypeScript.AllowedElements = {}));
    var AllowedElements = TypeScript.AllowedElements;
    (function (Modifiers) {
        Modifiers._map = [];
        Modifiers.None = 0;
        Modifiers.Private = 1;
        Modifiers.Public = 1 << 1;
        Modifiers.Readonly = 1 << 2;
        Modifiers.Ambient = 1 << 3;
        Modifiers.Exported = 1 << 4;
        Modifiers.Getter = 1 << 5;
        Modifiers.Setter = 1 << 6;
        Modifiers.Static = 1 << 7;
    })(TypeScript.Modifiers || (TypeScript.Modifiers = {}));
    var Modifiers = TypeScript.Modifiers;
    (function (ASTFlags) {
        ASTFlags._map = [];
        ASTFlags.None = 0;
        ASTFlags.ExplicitSemicolon = 1;
        ASTFlags.AutomaticSemicolon = 1 << 1;
        ASTFlags.Writeable = 1 << 2;
        ASTFlags.Error = 1 << 3;
        ASTFlags.DotLHSPartial = 1 << 4;
        ASTFlags.DotLHS = 1 << 5;
        ASTFlags.IsStatement = 1 << 6;
        ASTFlags.StrictMode = 1 << 7;
        ASTFlags.PossibleOptionalParameter = 1 << 8;
        ASTFlags.ClassBaseConstructorCall = 1 << 9;
        ASTFlags.OptionalName = 1 << 10;
        ASTFlags.SkipNextRParen = 1 << 11;
    })(TypeScript.ASTFlags || (TypeScript.ASTFlags = {}));
    var ASTFlags = TypeScript.ASTFlags;
    (function (DeclFlags) {
        DeclFlags._map = [];
        DeclFlags.None = 0;
        DeclFlags.Exported = 1;
        DeclFlags.Private = 1 << 1;
        DeclFlags.Public = 1 << 2;
        DeclFlags.Ambient = 1 << 3;
        DeclFlags.Static = 1 << 4;
        DeclFlags.LocalStatic = 1 << 5;
        DeclFlags.GetAccessor = 1 << 6;
        DeclFlags.SetAccessor = 1 << 7;
    })(TypeScript.DeclFlags || (TypeScript.DeclFlags = {}));
    var DeclFlags = TypeScript.DeclFlags;
    (function (ModuleFlags) {
        ModuleFlags._map = [];
        ModuleFlags.None = 0;
        ModuleFlags.Exported = 1;
        ModuleFlags.Private = 1 << 1;
        ModuleFlags.Public = 1 << 2;
        ModuleFlags.Ambient = 1 << 3;
        ModuleFlags.Static = 1 << 4;
        ModuleFlags.LocalStatic = 1 << 5;
        ModuleFlags.GetAccessor = 1 << 6;
        ModuleFlags.SetAccessor = 1 << 7;
        ModuleFlags.IsEnum = 1 << 8;
        ModuleFlags.ShouldEmitModuleDecl = 1 << 9;
        ModuleFlags.IsWholeFile = 1 << 10;
        ModuleFlags.IsDynamic = 1 << 11;
        ModuleFlags.MustCaptureThis = 1 << 12;
    })(TypeScript.ModuleFlags || (TypeScript.ModuleFlags = {}));
    var ModuleFlags = TypeScript.ModuleFlags;
    (function (SymbolFlags) {
        SymbolFlags._map = [];
        SymbolFlags.None = 0;
        SymbolFlags.Exported = 1;
        SymbolFlags.Private = 1 << 1;
        SymbolFlags.Public = 1 << 2;
        SymbolFlags.Ambient = 1 << 3;
        SymbolFlags.Static = 1 << 4;
        SymbolFlags.LocalStatic = 1 << 5;
        SymbolFlags.GetAccessor = 1 << 6;
        SymbolFlags.SetAccessor = 1 << 7;
        SymbolFlags.Property = 1 << 8;
        SymbolFlags.Readonly = 1 << 9;
        SymbolFlags.ModuleMember = 1 << 10;
        SymbolFlags.InterfaceMember = 1 << 11;
        SymbolFlags.ClassMember = 1 << 12;
        SymbolFlags.BuiltIn = 1 << 13;
        SymbolFlags.TypeSetDuringScopeAssignment = 1 << 14;
        SymbolFlags.Constant = 1 << 15;
        SymbolFlags.Optional = 1 << 16;
        SymbolFlags.RecursivelyReferenced = 1 << 17;
        SymbolFlags.Bound = 1 << 18;
        SymbolFlags.CompilerGenerated = 1 << 19;
    })(TypeScript.SymbolFlags || (TypeScript.SymbolFlags = {}));
    var SymbolFlags = TypeScript.SymbolFlags;
    (function (VarFlags) {
        VarFlags._map = [];
        VarFlags.None = 0;
        VarFlags.Exported = 1;
        VarFlags.Private = 1 << 1;
        VarFlags.Public = 1 << 2;
        VarFlags.Ambient = 1 << 3;
        VarFlags.Static = 1 << 4;
        VarFlags.LocalStatic = 1 << 5;
        VarFlags.GetAccessor = 1 << 6;
        VarFlags.SetAccessor = 1 << 7;
        VarFlags.AutoInit = 1 << 8;
        VarFlags.Property = 1 << 9;
        VarFlags.Readonly = 1 << 10;
        VarFlags.Class = 1 << 11;
        VarFlags.ClassProperty = 1 << 12;
        VarFlags.ClassBodyProperty = 1 << 13;
        VarFlags.ClassConstructorProperty = 1 << 14;
        VarFlags.ClassSuperMustBeFirstCallInConstructor = 1 << 15;
        VarFlags.Constant = 1 << 16;
        VarFlags.MustCaptureThis = 1 << 17;
    })(TypeScript.VarFlags || (TypeScript.VarFlags = {}));
    var VarFlags = TypeScript.VarFlags;
    (function (FncFlags) {
        FncFlags._map = [];
        FncFlags.None = 0;
        FncFlags.Exported = 1;
        FncFlags.Private = 1 << 1;
        FncFlags.Public = 1 << 2;
        FncFlags.Ambient = 1 << 3;
        FncFlags.Static = 1 << 4;
        FncFlags.LocalStatic = 1 << 5;
        FncFlags.GetAccessor = 1 << 6;
        FncFlags.SetAccessor = 1 << 7;
        FncFlags.Definition = 1 << 8;
        FncFlags.Signature = 1 << 9;
        FncFlags.Method = 1 << 10;
        FncFlags.HasReturnExpression = 1 << 11;
        FncFlags.CallMember = 1 << 12;
        FncFlags.ConstructMember = 1 << 13;
        FncFlags.HasSelfReference = 1 << 14;
        FncFlags.IsFatArrowFunction = 1 << 15;
        FncFlags.IndexerMember = 1 << 16;
        FncFlags.IsFunctionExpression = 1 << 17;
        FncFlags.ClassMethod = 1 << 18;
        FncFlags.ClassPropertyMethodExported = 1 << 19;
        FncFlags.HasSuperReferenceInFatArrowFunction = 1 << 20;
        FncFlags.IsPropertyBound = 1 << 21;
    })(TypeScript.FncFlags || (TypeScript.FncFlags = {}));
    var FncFlags = TypeScript.FncFlags;
    (function (SignatureFlags) {
        SignatureFlags._map = [];
        SignatureFlags.None = 0;
        SignatureFlags.IsIndexer = 1;
        SignatureFlags.IsStringIndexer = 1 << 1;
        SignatureFlags.IsNumberIndexer = 1 << 2;
    })(TypeScript.SignatureFlags || (TypeScript.SignatureFlags = {}));
    var SignatureFlags = TypeScript.SignatureFlags;
                    function ToDeclFlags(fncOrVarOrSymbolOrModuleFlags) {
        return fncOrVarOrSymbolOrModuleFlags;
    }
    TypeScript.ToDeclFlags = ToDeclFlags;
    (function (TypeFlags) {
        TypeFlags._map = [];
        TypeFlags.None = 0;
        TypeFlags.HasImplementation = 1;
        TypeFlags.HasSelfReference = 1 << 1;
        TypeFlags.MergeResult = 1 << 2;
        TypeFlags.IsEnum = 1 << 3;
        TypeFlags.BuildingName = 1 << 4;
        TypeFlags.HasBaseType = 1 << 5;
        TypeFlags.HasBaseTypeOfObject = 1 << 6;
        TypeFlags.IsClass = 1 << 7;
    })(TypeScript.TypeFlags || (TypeScript.TypeFlags = {}));
    var TypeFlags = TypeScript.TypeFlags;
    (function (TypeRelationshipFlags) {
        TypeRelationshipFlags._map = [];
        TypeRelationshipFlags.SuccessfulComparison = 0;
        TypeRelationshipFlags.SourceIsNullTargetIsVoidOrUndefined = 1;
        TypeRelationshipFlags.RequiredPropertyIsMissing = 1 << 1;
        TypeRelationshipFlags.IncompatibleSignatures = 1 << 2;
        TypeRelationshipFlags.SourceSignatureHasTooManyParameters = 3;
        TypeRelationshipFlags.IncompatibleReturnTypes = 1 << 4;
        TypeRelationshipFlags.IncompatiblePropertyTypes = 1 << 5;
        TypeRelationshipFlags.IncompatibleParameterTypes = 1 << 6;
    })(TypeScript.TypeRelationshipFlags || (TypeScript.TypeRelationshipFlags = {}));
    var TypeRelationshipFlags = TypeScript.TypeRelationshipFlags;
    (function (CodeGenTarget) {
        CodeGenTarget._map = [];
        CodeGenTarget.ES3 = 0;
        CodeGenTarget.ES5 = 1;
    })(TypeScript.CodeGenTarget || (TypeScript.CodeGenTarget = {}));
    var CodeGenTarget = TypeScript.CodeGenTarget;
    (function (ModuleGenTarget) {
        ModuleGenTarget._map = [];
        ModuleGenTarget.Synchronous = 0;
        ModuleGenTarget.Asynchronous = 1;
        ModuleGenTarget.Local = 1 << 1;
    })(TypeScript.ModuleGenTarget || (TypeScript.ModuleGenTarget = {}));
    var ModuleGenTarget = TypeScript.ModuleGenTarget;
    TypeScript.codeGenTarget = CodeGenTarget.ES3;
    TypeScript.moduleGenTarget = ModuleGenTarget.Synchronous;
    TypeScript.optimizeModuleCodeGen = true;
    function flagsToString(e, flags) {
        var builder = "";
        for(var i = 1; i < (1 << 31); i = i << 1) {
            if((flags & i) != 0) {
                for(var k in e) {
                    if(e[k] == i) {
                        if(builder.length > 0) {
                            builder += "|";
                        }
                        builder += k;
                        break;
                    }
                }
            }
        }
        return builder;
    }
    TypeScript.flagsToString = flagsToString;
})(TypeScript || (TypeScript = {}));
var TypeScript;
(function (TypeScript) {
    (function (NodeType) {
        NodeType._map = [];
        NodeType._map[0] = "None";
        NodeType.None = 0;
        NodeType._map[1] = "Empty";
        NodeType.Empty = 1;
        NodeType._map[2] = "EmptyExpr";
        NodeType.EmptyExpr = 2;
        NodeType._map[3] = "True";
        NodeType.True = 3;
        NodeType._map[4] = "False";
        NodeType.False = 4;
        NodeType._map[5] = "This";
        NodeType.This = 5;
        NodeType._map[6] = "Super";
        NodeType.Super = 6;
        NodeType._map[7] = "QString";
        NodeType.QString = 7;
        NodeType._map[8] = "Regex";
        NodeType.Regex = 8;
        NodeType._map[9] = "Null";
        NodeType.Null = 9;
        NodeType._map[10] = "ArrayLit";
        NodeType.ArrayLit = 10;
        NodeType._map[11] = "ObjectLit";
        NodeType.ObjectLit = 11;
        NodeType._map[12] = "Void";
        NodeType.Void = 12;
        NodeType._map[13] = "Comma";
        NodeType.Comma = 13;
        NodeType._map[14] = "Pos";
        NodeType.Pos = 14;
        NodeType._map[15] = "Neg";
        NodeType.Neg = 15;
        NodeType._map[16] = "Delete";
        NodeType.Delete = 16;
        NodeType._map[17] = "Await";
        NodeType.Await = 17;
        NodeType._map[18] = "In";
        NodeType.In = 18;
        NodeType._map[19] = "Dot";
        NodeType.Dot = 19;
        NodeType._map[20] = "From";
        NodeType.From = 20;
        NodeType._map[21] = "Is";
        NodeType.Is = 21;
        NodeType._map[22] = "InstOf";
        NodeType.InstOf = 22;
        NodeType._map[23] = "Typeof";
        NodeType.Typeof = 23;
        NodeType._map[24] = "NumberLit";
        NodeType.NumberLit = 24;
        NodeType._map[25] = "Name";
        NodeType.Name = 25;
        NodeType._map[26] = "TypeRef";
        NodeType.TypeRef = 26;
        NodeType._map[27] = "Index";
        NodeType.Index = 27;
        NodeType._map[28] = "Call";
        NodeType.Call = 28;
        NodeType._map[29] = "New";
        NodeType.New = 29;
        NodeType._map[30] = "Asg";
        NodeType.Asg = 30;
        NodeType._map[31] = "AsgAdd";
        NodeType.AsgAdd = 31;
        NodeType._map[32] = "AsgSub";
        NodeType.AsgSub = 32;
        NodeType._map[33] = "AsgDiv";
        NodeType.AsgDiv = 33;
        NodeType._map[34] = "AsgMul";
        NodeType.AsgMul = 34;
        NodeType._map[35] = "AsgMod";
        NodeType.AsgMod = 35;
        NodeType._map[36] = "AsgAnd";
        NodeType.AsgAnd = 36;
        NodeType._map[37] = "AsgXor";
        NodeType.AsgXor = 37;
        NodeType._map[38] = "AsgOr";
        NodeType.AsgOr = 38;
        NodeType._map[39] = "AsgLsh";
        NodeType.AsgLsh = 39;
        NodeType._map[40] = "AsgRsh";
        NodeType.AsgRsh = 40;
        NodeType._map[41] = "AsgRs2";
        NodeType.AsgRs2 = 41;
        NodeType._map[42] = "ConditionalExpression";
        NodeType.ConditionalExpression = 42;
        NodeType._map[43] = "LogOr";
        NodeType.LogOr = 43;
        NodeType._map[44] = "LogAnd";
        NodeType.LogAnd = 44;
        NodeType._map[45] = "Or";
        NodeType.Or = 45;
        NodeType._map[46] = "Xor";
        NodeType.Xor = 46;
        NodeType._map[47] = "And";
        NodeType.And = 47;
        NodeType._map[48] = "Eq";
        NodeType.Eq = 48;
        NodeType._map[49] = "Ne";
        NodeType.Ne = 49;
        NodeType._map[50] = "Eqv";
        NodeType.Eqv = 50;
        NodeType._map[51] = "NEqv";
        NodeType.NEqv = 51;
        NodeType._map[52] = "Lt";
        NodeType.Lt = 52;
        NodeType._map[53] = "Le";
        NodeType.Le = 53;
        NodeType._map[54] = "Gt";
        NodeType.Gt = 54;
        NodeType._map[55] = "Ge";
        NodeType.Ge = 55;
        NodeType._map[56] = "Add";
        NodeType.Add = 56;
        NodeType._map[57] = "Sub";
        NodeType.Sub = 57;
        NodeType._map[58] = "Mul";
        NodeType.Mul = 58;
        NodeType._map[59] = "Div";
        NodeType.Div = 59;
        NodeType._map[60] = "Mod";
        NodeType.Mod = 60;
        NodeType._map[61] = "Lsh";
        NodeType.Lsh = 61;
        NodeType._map[62] = "Rsh";
        NodeType.Rsh = 62;
        NodeType._map[63] = "Rs2";
        NodeType.Rs2 = 63;
        NodeType._map[64] = "Not";
        NodeType.Not = 64;
        NodeType._map[65] = "LogNot";
        NodeType.LogNot = 65;
        NodeType._map[66] = "IncPre";
        NodeType.IncPre = 66;
        NodeType._map[67] = "DecPre";
        NodeType.DecPre = 67;
        NodeType._map[68] = "IncPost";
        NodeType.IncPost = 68;
        NodeType._map[69] = "DecPost";
        NodeType.DecPost = 69;
        NodeType._map[70] = "TypeAssertion";
        NodeType.TypeAssertion = 70;
        NodeType._map[71] = "FuncDecl";
        NodeType.FuncDecl = 71;
        NodeType._map[72] = "Member";
        NodeType.Member = 72;
        NodeType._map[73] = "VarDecl";
        NodeType.VarDecl = 73;
        NodeType._map[74] = "ArgDecl";
        NodeType.ArgDecl = 74;
        NodeType._map[75] = "Return";
        NodeType.Return = 75;
        NodeType._map[76] = "Break";
        NodeType.Break = 76;
        NodeType._map[77] = "Continue";
        NodeType.Continue = 77;
        NodeType._map[78] = "Throw";
        NodeType.Throw = 78;
        NodeType._map[79] = "For";
        NodeType.For = 79;
        NodeType._map[80] = "ForIn";
        NodeType.ForIn = 80;
        NodeType._map[81] = "If";
        NodeType.If = 81;
        NodeType._map[82] = "While";
        NodeType.While = 82;
        NodeType._map[83] = "DoWhile";
        NodeType.DoWhile = 83;
        NodeType._map[84] = "Block";
        NodeType.Block = 84;
        NodeType._map[85] = "Case";
        NodeType.Case = 85;
        NodeType._map[86] = "Switch";
        NodeType.Switch = 86;
        NodeType._map[87] = "Try";
        NodeType.Try = 87;
        NodeType._map[88] = "TryCatch";
        NodeType.TryCatch = 88;
        NodeType._map[89] = "TryFinally";
        NodeType.TryFinally = 89;
        NodeType._map[90] = "Finally";
        NodeType.Finally = 90;
        NodeType._map[91] = "Catch";
        NodeType.Catch = 91;
        NodeType._map[92] = "List";
        NodeType.List = 92;
        NodeType._map[93] = "Script";
        NodeType.Script = 93;
        NodeType._map[94] = "ClassDeclaration";
        NodeType.ClassDeclaration = 94;
        NodeType._map[95] = "InterfaceDeclaration";
        NodeType.InterfaceDeclaration = 95;
        NodeType._map[96] = "ModuleDeclaration";
        NodeType.ModuleDeclaration = 96;
        NodeType._map[97] = "ImportDeclaration";
        NodeType.ImportDeclaration = 97;
        NodeType._map[98] = "With";
        NodeType.With = 98;
        NodeType._map[99] = "Label";
        NodeType.Label = 99;
        NodeType._map[100] = "LabeledStatement";
        NodeType.LabeledStatement = 100;
        NodeType._map[101] = "EBStart";
        NodeType.EBStart = 101;
        NodeType._map[102] = "GotoEB";
        NodeType.GotoEB = 102;
        NodeType._map[103] = "EndCode";
        NodeType.EndCode = 103;
        NodeType._map[104] = "Error";
        NodeType.Error = 104;
        NodeType._map[105] = "Comment";
        NodeType.Comment = 105;
        NodeType._map[106] = "Debugger";
        NodeType.Debugger = 106;
        NodeType.GeneralNode = NodeType.FuncDecl;
        NodeType.LastAsg = NodeType.AsgRs2;
    })(TypeScript.NodeType || (TypeScript.NodeType = {}));
    var NodeType = TypeScript.NodeType;
})(TypeScript || (TypeScript = {}));
var TypeScript;
(function (TypeScript) {
    var BlockIntrinsics = (function () {
        function BlockIntrinsics() {
            this.prototype = undefined;
            this.toString = undefined;
            this.toLocaleString = undefined;
            this.valueOf = undefined;
            this.hasOwnProperty = undefined;
            this.propertyIsEnumerable = undefined;
            this.isPrototypeOf = undefined;
            this["constructor"] = undefined;
        }
        return BlockIntrinsics;
    })();
    TypeScript.BlockIntrinsics = BlockIntrinsics;    
    var StringHashTable = (function () {
        function StringHashTable() {
            this.itemCount = 0;
            this.table = (new BlockIntrinsics());
        }
        StringHashTable.prototype.getAllKeys = function () {
            var result = [];
            for(var k in this.table) {
                if(this.table[k] != undefined) {
                    result[result.length] = k;
                }
            }
            return result;
        };
        StringHashTable.prototype.add = function (key, data) {
            if(this.table[key] != undefined) {
                return false;
            }
            this.table[key] = data;
            this.itemCount++;
            return true;
        };
        StringHashTable.prototype.addOrUpdate = function (key, data) {
            if(this.table[key] != undefined) {
                this.table[key] = data;
                return false;
            }
            this.table[key] = data;
            this.itemCount++;
            return true;
        };
        StringHashTable.prototype.map = function (fn, context) {
            for(var k in this.table) {
                var data = this.table[k];
                if(data != undefined) {
                    fn(k, this.table[k], context);
                }
            }
        };
        StringHashTable.prototype.every = function (fn, context) {
            for(var k in this.table) {
                var data = this.table[k];
                if(data != undefined) {
                    if(!fn(k, this.table[k], context)) {
                        return false;
                    }
                }
            }
            return true;
        };
        StringHashTable.prototype.some = function (fn, context) {
            for(var k in this.table) {
                var data = this.table[k];
                if(data != undefined) {
                    if(fn(k, this.table[k], context)) {
                        return true;
                    }
                }
            }
            return false;
        };
        StringHashTable.prototype.count = function () {
            return this.itemCount;
        };
        StringHashTable.prototype.lookup = function (key) {
            var data = this.table[key];
            if(data != undefined) {
                return data;
            } else {
                return (null);
            }
        };
        return StringHashTable;
    })();
    TypeScript.StringHashTable = StringHashTable;    
    var DualStringHashTable = (function () {
        function DualStringHashTable(primaryTable, secondaryTable) {
            this.primaryTable = primaryTable;
            this.secondaryTable = secondaryTable;
            this.insertPrimary = true;
        }
        DualStringHashTable.prototype.getAllKeys = function () {
            return this.primaryTable.getAllKeys().concat(this.secondaryTable.getAllKeys());
        };
        DualStringHashTable.prototype.add = function (key, data) {
            if(this.insertPrimary) {
                return this.primaryTable.add(key, data);
            } else {
                return this.secondaryTable.add(key, data);
            }
        };
        DualStringHashTable.prototype.addOrUpdate = function (key, data) {
            if(this.insertPrimary) {
                return this.primaryTable.addOrUpdate(key, data);
            } else {
                return this.secondaryTable.addOrUpdate(key, data);
            }
        };
        DualStringHashTable.prototype.map = function (fn, context) {
            this.primaryTable.map(fn, context);
            this.secondaryTable.map(fn, context);
        };
        DualStringHashTable.prototype.every = function (fn, context) {
            return this.primaryTable.every(fn, context) && this.secondaryTable.every(fn, context);
        };
        DualStringHashTable.prototype.some = function (fn, context) {
            return this.primaryTable.some(fn, context) || this.secondaryTable.some(fn, context);
        };
        DualStringHashTable.prototype.count = function () {
            return this.primaryTable.count() + this.secondaryTable.count();
        };
        DualStringHashTable.prototype.lookup = function (key) {
            var data = this.primaryTable.lookup(key);
            if(data != undefined) {
                return data;
            } else {
                return this.secondaryTable.lookup(key);
            }
        };
        return DualStringHashTable;
    })();
    TypeScript.DualStringHashTable = DualStringHashTable;    
    function numberHashFn(key) {
        var c2 = 668265261;
        key = (key ^ 61) ^ (key >>> 16);
        key = key + (key << 3);
        key = key ^ (key >>> 4);
        key = key * c2;
        key = key ^ (key >>> 15);
        return key;
    }
    TypeScript.numberHashFn = numberHashFn;
    function combineHashes(key1, key2) {
        return key2 ^ ((key1 >> 5) + key1);
    }
    TypeScript.combineHashes = combineHashes;
    var HashEntry = (function () {
        function HashEntry(key, data) {
            this.key = key;
            this.data = data;
        }
        return HashEntry;
    })();
    TypeScript.HashEntry = HashEntry;    
    var HashTable = (function () {
        function HashTable(size, hashFn, equalsFn) {
            this.size = size;
            this.hashFn = hashFn;
            this.equalsFn = equalsFn;
            this.itemCount = 0;
            this.table = new Array();
            for(var i = 0; i < this.size; i++) {
                this.table[i] = null;
            }
        }
        HashTable.prototype.add = function (key, data) {
            var current;
            var entry = new HashEntry(key, data);
            var val = this.hashFn(key);
            val = val % this.size;
            for(current = this.table[val]; current != null; current = current.next) {
                if(this.equalsFn(key, current.key)) {
                    return false;
                }
            }
            entry.next = this.table[val];
            this.table[val] = entry;
            this.itemCount++;
            return true;
        };
        HashTable.prototype.remove = function (key) {
            var current;
            var val = this.hashFn(key);
            val = val % this.size;
            var result = null;
            var prevEntry = null;
            for(current = this.table[val]; current != null; current = current.next) {
                if(this.equalsFn(key, current.key)) {
                    result = current.data;
                    this.itemCount--;
                    if(prevEntry) {
                        prevEntry.next = current.next;
                    } else {
                        this.table[val] = current.next;
                    }
                    break;
                }
                prevEntry = current;
            }
            return result;
        };
        HashTable.prototype.count = function () {
            return this.itemCount;
        };
        HashTable.prototype.lookup = function (key) {
            var current;
            var val = this.hashFn(key);
            val = val % this.size;
            for(current = this.table[val]; current != null; current = current.next) {
                if(this.equalsFn(key, current.key)) {
                    return (current.data);
                }
            }
            return (null);
        };
        return HashTable;
    })();
    TypeScript.HashTable = HashTable;    
    var SimpleHashTable = (function () {
        function SimpleHashTable() {
            this.keys = [];
            this.values = [];
        }
        SimpleHashTable.prototype.lookup = function (key, findValue) {
            var searchArray = this.keys;
            if(findValue) {
                searchArray = this.values;
            }
            for(var i = 0; i < searchArray.length; i++) {
                if(searchArray[i] == key) {
                    return {
                        key: this.keys[i],
                        data: this.values[i]
                    };
                }
            }
            return null;
        };
        SimpleHashTable.prototype.add = function (key, data) {
            var lookupData = this.lookup(key);
            if(lookupData) {
                return false;
            }
            this.keys[this.keys.length] = key;
            this.values[this.values.length] = data;
            return true;
        };
        return SimpleHashTable;
    })();
    TypeScript.SimpleHashTable = SimpleHashTable;    
})(TypeScript || (TypeScript = {}));
var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TypeScript;
(function (TypeScript) {
    var ASTSpan = (function () {
        function ASTSpan() {
            this.minChar = -1;
            this.limChar = -1;
        }
        return ASTSpan;
    })();
    TypeScript.ASTSpan = ASTSpan;    
    var AST = (function (_super) {
        __extends(AST, _super);
        function AST(nodeType) {
                _super.call(this);
            this.nodeType = nodeType;
            this.type = null;
            this.flags = TypeScript.ASTFlags.Writeable;
            this.passCreated = TypeScript.CompilerDiagnostics.analysisPass;
            this.preComments = null;
            this.postComments = null;
            this.docComments = null;
            this.isParenthesized = false;
        }
        AST.prototype.isExpression = function () {
            return false;
        };
        AST.prototype.isStatementOrExpression = function () {
            return false;
        };
        AST.prototype.isCompoundStatement = function () {
            return false;
        };
        AST.prototype.isLeaf = function () {
            return this.isStatementOrExpression() && (!this.isCompoundStatement());
        };
        AST.prototype.isDeclaration = function () {
            return false;
        };
        AST.prototype.typeCheck = function (typeFlow) {
            switch(this.nodeType) {
                case TypeScript.NodeType.Error:
                case TypeScript.NodeType.EmptyExpr: {
                    this.type = typeFlow.anyType;
                    break;

                }
                case TypeScript.NodeType.This: {
                    return typeFlow.typeCheckThis(this);

                }
                case TypeScript.NodeType.Null: {
                    this.type = typeFlow.nullType;
                    break;

                }
                case TypeScript.NodeType.False:
                case TypeScript.NodeType.True: {
                    this.type = typeFlow.booleanType;
                    break;

                }
                case TypeScript.NodeType.Super: {
                    return typeFlow.typeCheckSuper(this);

                }
                case TypeScript.NodeType.EndCode:
                case TypeScript.NodeType.Empty:
                case TypeScript.NodeType.Void: {
                    this.type = typeFlow.voidType;
                    break;

                }
                default: {
                    throw new Error("please implement in derived class");

                }
            }
            return this;
        };
        AST.prototype.emit = function (emitter, tokenId, startLine) {
            emitter.emitParensAndCommentsInPlace(this, true);
            switch(this.nodeType) {
                case TypeScript.NodeType.This: {
                    emitter.recordSourceMappingStart(this);
                    if(emitter.thisFnc && (TypeScript.hasFlag(emitter.thisFnc.fncFlags, TypeScript.FncFlags.IsFatArrowFunction))) {
                        emitter.writeToOutput("_this");
                    } else {
                        emitter.writeToOutput("this");
                    }
                    emitter.recordSourceMappingEnd(this);
                    break;

                }
                case TypeScript.NodeType.Null: {
                    emitter.recordSourceMappingStart(this);
                    emitter.writeToOutput("null");
                    emitter.recordSourceMappingEnd(this);
                    break;

                }
                case TypeScript.NodeType.False: {
                    emitter.recordSourceMappingStart(this);
                    emitter.writeToOutput("false");
                    emitter.recordSourceMappingEnd(this);
                    break;

                }
                case TypeScript.NodeType.True: {
                    emitter.recordSourceMappingStart(this);
                    emitter.writeToOutput("true");
                    emitter.recordSourceMappingEnd(this);
                    break;

                }
                case TypeScript.NodeType.Super: {
                    emitter.recordSourceMappingStart(this);
                    emitter.emitSuperReference();
                    emitter.recordSourceMappingEnd(this);
                    break;

                }
                case TypeScript.NodeType.EndCode:
                case TypeScript.NodeType.Error:
                case TypeScript.NodeType.EmptyExpr: {
                    break;

                }
                case TypeScript.NodeType.Empty: {
                    emitter.recordSourceMappingStart(this);
                    emitter.recordSourceMappingEnd(this);
                    break;

                }
                case TypeScript.NodeType.Void: {
                    emitter.recordSourceMappingStart(this);
                    emitter.writeToOutput("void ");
                    emitter.recordSourceMappingEnd(this);
                    break;

                }
                default: {
                    throw new Error("please implement in derived class");

                }
            }
            emitter.emitParensAndCommentsInPlace(this, false);
        };
        AST.prototype.print = function (context) {
            context.startLine();
            var lineCol = {
                line: -1,
                col: -1
            };
            var limLineCol = {
                line: -1,
                col: -1
            };
            if(context.parser !== null) {
                context.parser.getSourceLineCol(lineCol, this.minChar);
                context.parser.getSourceLineCol(limLineCol, this.limChar);
                context.write("(" + lineCol.line + "," + lineCol.col + ")--" + "(" + limLineCol.line + "," + limLineCol.col + "): ");
            }
            var lab = this.printLabel();
            if(TypeScript.hasFlag(this.flags, TypeScript.ASTFlags.Error)) {
                lab += " (Error)";
            }
            context.writeLine(lab);
        };
        AST.prototype.printLabel = function () {
            if(TypeScript.nodeTypeTable[this.nodeType] !== undefined) {
                return TypeScript.nodeTypeTable[this.nodeType];
            } else {
                return (TypeScript.NodeType)._map[this.nodeType];
            }
        };
        AST.prototype.addToControlFlow = function (context) {
            context.walker.options.goChildren = false;
            context.addContent(this);
        };
        AST.prototype.netFreeUses = function (container, freeUses) {
        };
        AST.prototype.treeViewLabel = function () {
            return (TypeScript.NodeType)._map[this.nodeType];
        };
        AST.getResolvedIdentifierName = function getResolvedIdentifierName(name) {
            if(!name) {
                return "";
            }
            var resolved = "";
            var start = 0;
            var i = 0;
            while(i <= name.length - 6) {
                if(name.charAt(i) == '\\' && name.charAt(i + 1) == 'u') {
                    var charCode = parseInt(name.substr(i + 2, 4), 16);
                    resolved += name.substr(start, i - start);
                    resolved += String.fromCharCode(charCode);
                    i += 6;
                    start = i;
                    continue;
                }
                i++;
            }
            resolved += name.substring(start);
            return resolved;
        }
        AST.prototype.getDocComments = function () {
            if(!this.isDeclaration() || !this.preComments || this.preComments.length == 0) {
                return [];
            }
            if(!this.docComments) {
                var preCommentsLength = this.preComments.length;
                var docComments = [];
                for(var i = preCommentsLength - 1; i >= 0; i--) {
                    if(this.preComments[i].isDocComment()) {
                        var prevDocComment = docComments.length > 0 ? docComments[docComments.length - 1] : null;
                        if(prevDocComment == null || (this.preComments[i].limLine == prevDocComment.minLine || this.preComments[i].limLine + 1 == prevDocComment.minLine)) {
                            docComments.push(this.preComments[i]);
                            continue;
                        }
                    }
                    break;
                }
                this.docComments = docComments.reverse();
            }
            return this.docComments;
        };
        return AST;
    })(ASTSpan);
    TypeScript.AST = AST;    
    var IncompleteAST = (function (_super) {
        __extends(IncompleteAST, _super);
        function IncompleteAST(min, lim) {
                _super.call(this, TypeScript.NodeType.Error);
            this.minChar = min;
            this.limChar = lim;
        }
        return IncompleteAST;
    })(AST);
    TypeScript.IncompleteAST = IncompleteAST;    
    var ASTList = (function (_super) {
        __extends(ASTList, _super);
        function ASTList() {
                _super.call(this, TypeScript.NodeType.List);
            this.enclosingScope = null;
            this.members = new Array();
        }
        ASTList.prototype.addToControlFlow = function (context) {
            var len = this.members.length;
            for(var i = 0; i < len; i++) {
                if(context.noContinuation) {
                    context.addUnreachable(this.members[i]);
                    break;
                } else {
                    this.members[i] = context.walk(this.members[i], this);
                }
            }
            context.walker.options.goChildren = false;
        };
        ASTList.prototype.append = function (ast) {
            this.members[this.members.length] = ast;
            return this;
        };
        ASTList.prototype.appendAll = function (ast) {
            if(ast.nodeType == TypeScript.NodeType.List) {
                var list = ast;
                for(var i = 0, len = list.members.length; i < len; i++) {
                    this.append(list.members[i]);
                }
            } else {
                this.append(ast);
            }
            return this;
        };
        ASTList.prototype.emit = function (emitter, tokenId, startLine) {
            emitter.recordSourceMappingStart(this);
            emitter.emitJavascriptList(this, null, TypeScript.TokenID.Semicolon, startLine, false, false);
            emitter.recordSourceMappingEnd(this);
        };
        ASTList.prototype.typeCheck = function (typeFlow) {
            var len = this.members.length;
            typeFlow.nestingLevel++;
            for(var i = 0; i < len; i++) {
                if(this.members[i]) {
                    this.members[i] = this.members[i].typeCheck(typeFlow);
                }
            }
            typeFlow.nestingLevel--;
            return this;
        };
        return ASTList;
    })(AST);
    TypeScript.ASTList = ASTList;    
    var Identifier = (function (_super) {
        __extends(Identifier, _super);
        function Identifier(actualText, hasEscapeSequence) {
                _super.call(this, TypeScript.NodeType.Name);
            this.actualText = actualText;
            this.hasEscapeSequence = hasEscapeSequence;
            this.sym = null;
            this.cloId = -1;
            this.setText(actualText, hasEscapeSequence);
        }
        Identifier.prototype.setText = function (actualText, hasEscapeSequence) {
            this.actualText = actualText;
            if(hasEscapeSequence) {
                this.text = AST.getResolvedIdentifierName(actualText);
            } else {
                this.text = actualText;
            }
        };
        Identifier.prototype.isMissing = function () {
            return false;
        };
        Identifier.prototype.isLeaf = function () {
            return true;
        };
        Identifier.prototype.treeViewLabel = function () {
            return "id: " + this.actualText;
        };
        Identifier.prototype.printLabel = function () {
            if(this.actualText) {
                return "id: " + this.actualText;
            } else {
                return "name node";
            }
        };
        Identifier.prototype.typeCheck = function (typeFlow) {
            return typeFlow.typeCheckName(this);
        };
        Identifier.prototype.emit = function (emitter, tokenId, startLine) {
            emitter.emitJavascriptName(this, true);
        };
        Identifier.fromToken = function fromToken(token) {
            return new Identifier(token.getText(), (token).hasEscapeSequence);
        }
        return Identifier;
    })(AST);
    TypeScript.Identifier = Identifier;    
    var MissingIdentifier = (function (_super) {
        __extends(MissingIdentifier, _super);
        function MissingIdentifier() {
                _super.call(this, "__missing");
        }
        MissingIdentifier.prototype.isMissing = function () {
            return true;
        };
        MissingIdentifier.prototype.emit = function (emitter, tokenId, startLine) {
        };
        return MissingIdentifier;
    })(Identifier);
    TypeScript.MissingIdentifier = MissingIdentifier;    
    var Label = (function (_super) {
        __extends(Label, _super);
        function Label(id) {
                _super.call(this, TypeScript.NodeType.Label);
            this.id = id;
        }
        Label.prototype.printLabel = function () {
            return this.id.actualText + ":";
        };
        Label.prototype.typeCheck = function (typeFlow) {
            this.type = typeFlow.voidType;
            return this;
        };
        Label.prototype.emit = function (emitter, tokenId, startLine) {
            emitter.emitParensAndCommentsInPlace(this, true);
            emitter.recordSourceMappingStart(this);
            emitter.recordSourceMappingStart(this.id);
            emitter.writeToOutput(this.id.actualText);
            emitter.recordSourceMappingEnd(this.id);
            emitter.writeLineToOutput(":");
            emitter.recordSourceMappingEnd(this);
            emitter.emitParensAndCommentsInPlace(this, false);
        };
        return Label;
    })(AST);
    TypeScript.Label = Label;    
    var Expression = (function (_super) {
        __extends(Expression, _super);
        function Expression(nodeType) {
                _super.call(this, nodeType);
        }
        Expression.prototype.isExpression = function () {
            return true;
        };
        Expression.prototype.isStatementOrExpression = function () {
            return true;
        };
        return Expression;
    })(AST);
    TypeScript.Expression = Expression;    
    var UnaryExpression = (function (_super) {
        __extends(UnaryExpression, _super);
        function UnaryExpression(nodeType, operand) {
                _super.call(this, nodeType);
            this.operand = operand;
            this.targetType = null;
            this.castTerm = null;
        }
        UnaryExpression.prototype.addToControlFlow = function (context) {
            _super.prototype.addToControlFlow.call(this, context);
            if(this.nodeType == TypeScript.NodeType.Throw) {
                context.returnStmt();
            }
        };
        UnaryExpression.prototype.typeCheck = function (typeFlow) {
            switch(this.nodeType) {
                case TypeScript.NodeType.Not: {
                    return typeFlow.typeCheckBitNot(this);

                }
                case TypeScript.NodeType.LogNot: {
                    return typeFlow.typeCheckLogNot(this);

                }
                case TypeScript.NodeType.Pos:
                case TypeScript.NodeType.Neg: {
                    return typeFlow.typeCheckUnaryNumberOperator(this);

                }
                case TypeScript.NodeType.IncPost:
                case TypeScript.NodeType.IncPre:
                case TypeScript.NodeType.DecPost:
                case TypeScript.NodeType.DecPre: {
                    return typeFlow.typeCheckIncOrDec(this);

                }
                case TypeScript.NodeType.ArrayLit: {
                    typeFlow.typeCheckArrayLit(this);
                    return this;

                }
                case TypeScript.NodeType.ObjectLit: {
                    typeFlow.typeCheckObjectLit(this);
                    return this;

                }
                case TypeScript.NodeType.Throw: {
                    this.operand = typeFlow.typeCheck(this.operand);
                    this.type = typeFlow.voidType;
                    return this;

                }
                case TypeScript.NodeType.Typeof: {
                    this.operand = typeFlow.typeCheck(this.operand);
                    this.type = typeFlow.stringType;
                    return this;

                }
                case TypeScript.NodeType.Delete: {
                    this.operand = typeFlow.typeCheck(this.operand);
                    this.type = typeFlow.booleanType;
                    break;

                }
                case TypeScript.NodeType.TypeAssertion: {
                    this.castTerm = typeFlow.typeCheck(this.castTerm);
                    var applyTargetType = !this.operand.isParenthesized;
                    var targetType = applyTargetType ? this.castTerm.type : null;
                    typeFlow.checker.typeCheckWithContextualType(targetType, typeFlow.checker.inProvisionalTypecheckMode(), true, this.operand);
                    typeFlow.castWithCoercion(this.operand, this.castTerm.type, false, true);
                    this.type = this.castTerm.type;
                    return this;

                }
                case TypeScript.NodeType.Void: {
                    this.operand = typeFlow.typeCheck(this.operand);
                    this.type = typeFlow.checker.undefinedType;
                    break;

                }
                default: {
                    throw new Error("please implement in derived class");

                }
            }
            return this;
        };
        UnaryExpression.prototype.emit = function (emitter, tokenId, startLine) {
            emitter.emitParensAndCommentsInPlace(this, true);
            emitter.recordSourceMappingStart(this);
            switch(this.nodeType) {
                case TypeScript.NodeType.IncPost: {
                    emitter.emitJavascript(this.operand, TypeScript.TokenID.PlusPlus, false);
                    emitter.writeToOutput("++");
                    break;

                }
                case TypeScript.NodeType.LogNot: {
                    emitter.writeToOutput("!");
                    emitter.emitJavascript(this.operand, TypeScript.TokenID.Exclamation, false);
                    break;

                }
                case TypeScript.NodeType.DecPost: {
                    emitter.emitJavascript(this.operand, TypeScript.TokenID.MinusMinus, false);
                    emitter.writeToOutput("--");
                    break;

                }
                case TypeScript.NodeType.ObjectLit: {
                    emitter.emitObjectLiteral(this.operand);
                    break;

                }
                case TypeScript.NodeType.ArrayLit: {
                    emitter.emitArrayLiteral(this.operand);
                    break;

                }
                case TypeScript.NodeType.Not: {
                    emitter.writeToOutput("~");
                    emitter.emitJavascript(this.operand, TypeScript.TokenID.Tilde, false);
                    break;

                }
                case TypeScript.NodeType.Neg: {
                    emitter.writeToOutput("-");
                    if(this.operand.nodeType == TypeScript.NodeType.Neg) {
                        this.operand.isParenthesized = true;
                    }
                    emitter.emitJavascript(this.operand, TypeScript.TokenID.Minus, false);
                    break;

                }
                case TypeScript.NodeType.Pos: {
                    emitter.writeToOutput("+");
                    if(this.operand.nodeType == TypeScript.NodeType.Pos) {
                        this.operand.isParenthesized = true;
                    }
                    emitter.emitJavascript(this.operand, TypeScript.TokenID.Plus, false);
                    break;

                }
                case TypeScript.NodeType.IncPre: {
                    emitter.writeToOutput("++");
                    emitter.emitJavascript(this.operand, TypeScript.TokenID.PlusPlus, false);
                    break;

                }
                case TypeScript.NodeType.DecPre: {
                    emitter.writeToOutput("--");
                    emitter.emitJavascript(this.operand, TypeScript.TokenID.MinusMinus, false);
                    break;

                }
                case TypeScript.NodeType.Throw: {
                    emitter.writeToOutput("throw ");
                    emitter.emitJavascript(this.operand, TypeScript.TokenID.Tilde, false);
                    emitter.writeToOutput(";");
                    break;

                }
                case TypeScript.NodeType.Typeof: {
                    emitter.writeToOutput("typeof ");
                    emitter.emitJavascript(this.operand, TypeScript.TokenID.Tilde, false);
                    break;

                }
                case TypeScript.NodeType.Delete: {
                    emitter.writeToOutput("delete ");
                    emitter.emitJavascript(this.operand, TypeScript.TokenID.Tilde, false);
                    break;

                }
                case TypeScript.NodeType.Void: {
                    emitter.writeToOutput("void ");
                    emitter.emitJavascript(this.operand, TypeScript.TokenID.Tilde, false);
                    break;

                }
                case TypeScript.NodeType.TypeAssertion: {
                    emitter.emitJavascript(this.operand, TypeScript.TokenID.Tilde, false);
                    break;

                }
                default: {
                    throw new Error("please implement in derived class");

                }
            }
            emitter.recordSourceMappingEnd(this);
            emitter.emitParensAndCommentsInPlace(this, false);
        };
        return UnaryExpression;
    })(Expression);
    TypeScript.UnaryExpression = UnaryExpression;    
    var CallExpression = (function (_super) {
        __extends(CallExpression, _super);
        function CallExpression(nodeType, target, arguments) {
                _super.call(this, nodeType);
            this.target = target;
            this.arguments = arguments;
            this.signature = null;
            this.minChar = this.target.minChar;
        }
        CallExpression.prototype.typeCheck = function (typeFlow) {
            if(this.nodeType == TypeScript.NodeType.New) {
                return typeFlow.typeCheckNew(this);
            } else {
                return typeFlow.typeCheckCall(this);
            }
        };
        CallExpression.prototype.emit = function (emitter, tokenId, startLine) {
            emitter.emitParensAndCommentsInPlace(this, true);
            emitter.recordSourceMappingStart(this);
            if(this.nodeType == TypeScript.NodeType.New) {
                emitter.emitNew(this.target, this.arguments);
            } else {
                emitter.emitCall(this, this.target, this.arguments);
            }
            emitter.recordSourceMappingEnd(this);
            emitter.emitParensAndCommentsInPlace(this, false);
        };
        return CallExpression;
    })(Expression);
    TypeScript.CallExpression = CallExpression;    
    var BinaryExpression = (function (_super) {
        __extends(BinaryExpression, _super);
        function BinaryExpression(nodeType, operand1, operand2) {
                _super.call(this, nodeType);
            this.operand1 = operand1;
            this.operand2 = operand2;
        }
        BinaryExpression.prototype.typeCheck = function (typeFlow) {
            switch(this.nodeType) {
                case TypeScript.NodeType.Dot: {
                    return typeFlow.typeCheckDotOperator(this);

                }
                case TypeScript.NodeType.Asg: {
                    return typeFlow.typeCheckAsgOperator(this);

                }
                case TypeScript.NodeType.Add:
                case TypeScript.NodeType.Sub:
                case TypeScript.NodeType.Mul:
                case TypeScript.NodeType.Div:
                case TypeScript.NodeType.Mod:
                case TypeScript.NodeType.Or:
                case TypeScript.NodeType.And: {
                    return typeFlow.typeCheckArithmeticOperator(this, false);

                }
                case TypeScript.NodeType.Xor: {
                    return typeFlow.typeCheckBitwiseOperator(this, false);

                }
                case TypeScript.NodeType.Ne:
                case TypeScript.NodeType.Eq: {
                    var text;
                    if(typeFlow.checker.styleSettings.eqeqeq) {
                        text = TypeScript.nodeTypeTable[this.nodeType];
                        typeFlow.checker.errorReporter.styleError(this, "use of " + text);
                    } else {
                        if(typeFlow.checker.styleSettings.eqnull) {
                            text = TypeScript.nodeTypeTable[this.nodeType];
                            if((this.operand2 !== null) && (this.operand2.nodeType == TypeScript.NodeType.Null)) {
                                typeFlow.checker.errorReporter.styleError(this, "use of " + text + " to compare with null");
                            }
                        }
                    }

                }
                case TypeScript.NodeType.Eqv:
                case TypeScript.NodeType.NEqv:
                case TypeScript.NodeType.Lt:
                case TypeScript.NodeType.Le:
                case TypeScript.NodeType.Ge:
                case TypeScript.NodeType.Gt: {
                    return typeFlow.typeCheckBooleanOperator(this);

                }
                case TypeScript.NodeType.Index: {
                    return typeFlow.typeCheckIndex(this);

                }
                case TypeScript.NodeType.Member: {
                    this.type = typeFlow.voidType;
                    return this;

                }
                case TypeScript.NodeType.LogOr: {
                    return typeFlow.typeCheckLogOr(this);

                }
                case TypeScript.NodeType.LogAnd: {
                    return typeFlow.typeCheckLogAnd(this);

                }
                case TypeScript.NodeType.AsgAdd:
                case TypeScript.NodeType.AsgSub:
                case TypeScript.NodeType.AsgMul:
                case TypeScript.NodeType.AsgDiv:
                case TypeScript.NodeType.AsgMod:
                case TypeScript.NodeType.AsgOr:
                case TypeScript.NodeType.AsgAnd: {
                    return typeFlow.typeCheckArithmeticOperator(this, true);

                }
                case TypeScript.NodeType.AsgXor: {
                    return typeFlow.typeCheckBitwiseOperator(this, true);

                }
                case TypeScript.NodeType.Lsh:
                case TypeScript.NodeType.Rsh:
                case TypeScript.NodeType.Rs2: {
                    return typeFlow.typeCheckShift(this, false);

                }
                case TypeScript.NodeType.AsgLsh:
                case TypeScript.NodeType.AsgRsh:
                case TypeScript.NodeType.AsgRs2: {
                    return typeFlow.typeCheckShift(this, true);

                }
                case TypeScript.NodeType.Comma: {
                    return typeFlow.typeCheckCommaOperator(this);

                }
                case TypeScript.NodeType.InstOf: {
                    return typeFlow.typeCheckInstOf(this);

                }
                case TypeScript.NodeType.In: {
                    return typeFlow.typeCheckInOperator(this);

                }
                case TypeScript.NodeType.From: {
                    typeFlow.checker.errorReporter.simpleError(this, "Illegal use of 'from' keyword in binary expression");
                    break;

                }
                default: {
                    throw new Error("please implement in derived class");

                }
            }
            return this;
        };
        BinaryExpression.prototype.emit = function (emitter, tokenId, startLine) {
            var binTokenId = TypeScript.nodeTypeToTokTable[this.nodeType];
            emitter.emitParensAndCommentsInPlace(this, true);
            emitter.recordSourceMappingStart(this);
            if(binTokenId != undefined) {
                emitter.emitJavascript(this.operand1, binTokenId, false);
                if(TypeScript.tokenTable[binTokenId].text == "instanceof") {
                    emitter.writeToOutput(" instanceof ");
                } else {
                    if(TypeScript.tokenTable[binTokenId].text == "in") {
                        emitter.writeToOutput(" in ");
                    } else {
                        emitter.writeToOutputTrimmable(" " + TypeScript.tokenTable[binTokenId].text + " ");
                    }
                }
                emitter.emitJavascript(this.operand2, binTokenId, false);
            } else {
                switch(this.nodeType) {
                    case TypeScript.NodeType.Dot: {
                        if(!emitter.tryEmitConstant(this)) {
                            emitter.emitJavascript(this.operand1, TypeScript.TokenID.Dot, false);
                            emitter.writeToOutput(".");
                            emitter.emitJavascriptName(this.operand2, false);
                        }
                        break;

                    }
                    case TypeScript.NodeType.Index: {
                        emitter.emitIndex(this.operand1, this.operand2);
                        break;

                    }
                    case TypeScript.NodeType.Member: {
                        if(this.operand2.nodeType == TypeScript.NodeType.FuncDecl && (this.operand2).isAccessor()) {
                            var funcDecl = this.operand2;
                            if(TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.GetAccessor)) {
                                emitter.writeToOutput("get ");
                            } else {
                                emitter.writeToOutput("set ");
                            }
                            emitter.emitJavascript(this.operand1, TypeScript.TokenID.Colon, false);
                        } else {
                            emitter.emitJavascript(this.operand1, TypeScript.TokenID.Colon, false);
                            emitter.writeToOutputTrimmable(": ");
                        }
                        emitter.emitJavascript(this.operand2, TypeScript.TokenID.Comma, false);
                        break;

                    }
                    case TypeScript.NodeType.Comma: {
                        emitter.emitJavascript(this.operand1, TypeScript.TokenID.Comma, false);
                        if(emitter.emitState.inObjectLiteral) {
                            emitter.writeLineToOutput(", ");
                        } else {
                            emitter.writeToOutput(",");
                        }
                        emitter.emitJavascript(this.operand2, TypeScript.TokenID.Comma, false);
                        break;

                    }
                    case TypeScript.NodeType.Is: {
                        throw new Error("should be de-sugared during type check");

                    }
                    default: {
                        throw new Error("please implement in derived class");

                    }
                }
            }
            emitter.recordSourceMappingEnd(this);
            emitter.emitParensAndCommentsInPlace(this, false);
        };
        return BinaryExpression;
    })(Expression);
    TypeScript.BinaryExpression = BinaryExpression;    
    var ConditionalExpression = (function (_super) {
        __extends(ConditionalExpression, _super);
        function ConditionalExpression(operand1, operand2, operand3) {
                _super.call(this, TypeScript.NodeType.ConditionalExpression);
            this.operand1 = operand1;
            this.operand2 = operand2;
            this.operand3 = operand3;
        }
        ConditionalExpression.prototype.typeCheck = function (typeFlow) {
            return typeFlow.typeCheckQMark(this);
        };
        ConditionalExpression.prototype.emit = function (emitter, tokenId, startLine) {
            emitter.emitParensAndCommentsInPlace(this, true);
            emitter.recordSourceMappingStart(this);
            emitter.emitJavascript(this.operand1, TypeScript.TokenID.Question, false);
            emitter.writeToOutput(" ? ");
            emitter.emitJavascript(this.operand2, TypeScript.TokenID.Question, false);
            emitter.writeToOutput(" : ");
            emitter.emitJavascript(this.operand3, TypeScript.TokenID.Question, false);
            emitter.recordSourceMappingEnd(this);
            emitter.emitParensAndCommentsInPlace(this, false);
        };
        return ConditionalExpression;
    })(Expression);
    TypeScript.ConditionalExpression = ConditionalExpression;    
    var NumberLiteral = (function (_super) {
        __extends(NumberLiteral, _super);
        function NumberLiteral(value, hasEmptyFraction) {
                _super.call(this, TypeScript.NodeType.NumberLit);
            this.value = value;
            this.hasEmptyFraction = hasEmptyFraction;
            this.isNegativeZero = false;
        }
        NumberLiteral.prototype.typeCheck = function (typeFlow) {
            this.type = typeFlow.doubleType;
            return this;
        };
        NumberLiteral.prototype.treeViewLabel = function () {
            return "num: " + this.printLabel();
        };
        NumberLiteral.prototype.emit = function (emitter, tokenId, startLine) {
            emitter.emitParensAndCommentsInPlace(this, true);
            emitter.recordSourceMappingStart(this);
            if(this.isNegativeZero) {
                emitter.writeToOutput("-");
            }
            emitter.writeToOutput(this.value.toString());
            if(this.hasEmptyFraction) {
                emitter.writeToOutput(".0");
            }
            emitter.recordSourceMappingEnd(this);
            emitter.emitParensAndCommentsInPlace(this, false);
        };
        NumberLiteral.prototype.printLabel = function () {
            if(Math.floor(this.value) != this.value) {
                return this.value.toFixed(2).toString();
            } else {
                if(this.hasEmptyFraction) {
                    return this.value.toString() + ".0";
                } else {
                    return this.value.toString();
                }
            }
        };
        return NumberLiteral;
    })(Expression);
    TypeScript.NumberLiteral = NumberLiteral;    
    var RegexLiteral = (function (_super) {
        __extends(RegexLiteral, _super);
        function RegexLiteral(regex) {
                _super.call(this, TypeScript.NodeType.Regex);
            this.regex = regex;
        }
        RegexLiteral.prototype.typeCheck = function (typeFlow) {
            this.type = typeFlow.regexType;
            return this;
        };
        RegexLiteral.prototype.emit = function (emitter, tokenId, startLine) {
            emitter.emitParensAndCommentsInPlace(this, true);
            emitter.recordSourceMappingStart(this);
            emitter.writeToOutput(this.regex.toString());
            emitter.recordSourceMappingEnd(this);
            emitter.emitParensAndCommentsInPlace(this, false);
        };
        return RegexLiteral;
    })(Expression);
    TypeScript.RegexLiteral = RegexLiteral;    
    var StringLiteral = (function (_super) {
        __extends(StringLiteral, _super);
        function StringLiteral(text) {
                _super.call(this, TypeScript.NodeType.QString);
            this.text = text;
        }
        StringLiteral.prototype.emit = function (emitter, tokenId, startLine) {
            emitter.emitParensAndCommentsInPlace(this, true);
            emitter.recordSourceMappingStart(this);
            emitter.emitStringLiteral(this.text);
            emitter.recordSourceMappingEnd(this);
            emitter.emitParensAndCommentsInPlace(this, false);
        };
        StringLiteral.prototype.typeCheck = function (typeFlow) {
            this.type = typeFlow.stringType;
            return this;
        };
        StringLiteral.prototype.treeViewLabel = function () {
            return "st: " + this.text;
        };
        StringLiteral.prototype.printLabel = function () {
            return this.text;
        };
        return StringLiteral;
    })(Expression);
    TypeScript.StringLiteral = StringLiteral;    
    var ModuleElement = (function (_super) {
        __extends(ModuleElement, _super);
        function ModuleElement(nodeType) {
                _super.call(this, nodeType);
        }
        return ModuleElement;
    })(AST);
    TypeScript.ModuleElement = ModuleElement;    
    var ImportDeclaration = (function (_super) {
        __extends(ImportDeclaration, _super);
        function ImportDeclaration(id, alias) {
                _super.call(this, TypeScript.NodeType.ImportDeclaration);
            this.id = id;
            this.alias = alias;
            this.varFlags = TypeScript.VarFlags.None;
            this.isDynamicImport = false;
        }
        ImportDeclaration.prototype.isStatementOrExpression = function () {
            return true;
        };
        ImportDeclaration.prototype.isDeclaration = function () {
            return true;
        };
        ImportDeclaration.prototype.emit = function (emitter, tokenId, startLine) {
            var mod = this.alias.type;
            if(!this.isDynamicImport || (this.id.sym && !(this.id.sym).onlyReferencedAsTypeRef)) {
                var prevModAliasId = emitter.modAliasId;
                var prevFirstModAlias = emitter.firstModAlias;
                emitter.recordSourceMappingStart(this);
                emitter.emitParensAndCommentsInPlace(this, true);
                emitter.writeToOutput("var " + this.id.actualText + " = ");
                emitter.modAliasId = this.id.actualText;
                emitter.firstModAlias = this.firstAliasedModToString();
                emitter.emitJavascript(this.alias, TypeScript.TokenID.Tilde, false);
                if(!this.isDynamicImport) {
                    emitter.writeToOutput(";");
                }
                emitter.emitParensAndCommentsInPlace(this, false);
                emitter.recordSourceMappingEnd(this);
                emitter.modAliasId = prevModAliasId;
                emitter.firstModAlias = prevFirstModAlias;
            }
        };
        ImportDeclaration.prototype.typeCheck = function (typeFlow) {
            return typeFlow.typeCheckImportDecl(this);
        };
        ImportDeclaration.prototype.getAliasName = function (aliasAST) {
            if (typeof aliasAST === "undefined") { aliasAST = this.alias; }
            if(aliasAST.nodeType == TypeScript.NodeType.Name) {
                return (aliasAST).actualText;
            } else {
                var dotExpr = aliasAST;
                return this.getAliasName(dotExpr.operand1) + "." + this.getAliasName(dotExpr.operand2);
            }
        };
        ImportDeclaration.prototype.firstAliasedModToString = function () {
            if(this.alias.nodeType == TypeScript.NodeType.Name) {
                return (this.alias).actualText;
            } else {
                var dotExpr = this.alias;
                var firstMod = dotExpr.operand1;
                return firstMod.actualText;
            }
        };
        return ImportDeclaration;
    })(ModuleElement);
    TypeScript.ImportDeclaration = ImportDeclaration;    
    var BoundDecl = (function (_super) {
        __extends(BoundDecl, _super);
        function BoundDecl(id, nodeType, nestingLevel) {
                _super.call(this, nodeType);
            this.id = id;
            this.nestingLevel = nestingLevel;
            this.init = null;
            this.typeExpr = null;
            this.varFlags = TypeScript.VarFlags.None;
            this.sym = null;
        }
        BoundDecl.prototype.isDeclaration = function () {
            return true;
        };
        BoundDecl.prototype.isStatementOrExpression = function () {
            return true;
        };
        BoundDecl.prototype.isPrivate = function () {
            return TypeScript.hasFlag(this.varFlags, TypeScript.VarFlags.Private);
        };
        BoundDecl.prototype.isPublic = function () {
            return TypeScript.hasFlag(this.varFlags, TypeScript.VarFlags.Public);
        };
        BoundDecl.prototype.isProperty = function () {
            return TypeScript.hasFlag(this.varFlags, TypeScript.VarFlags.Property);
        };
        BoundDecl.prototype.typeCheck = function (typeFlow) {
            return typeFlow.typeCheckBoundDecl(this);
        };
        BoundDecl.prototype.printLabel = function () {
            return this.treeViewLabel();
        };
        return BoundDecl;
    })(AST);
    TypeScript.BoundDecl = BoundDecl;    
    var VarDecl = (function (_super) {
        __extends(VarDecl, _super);
        function VarDecl(id, nest) {
                _super.call(this, id, TypeScript.NodeType.VarDecl, nest);
        }
        VarDecl.prototype.isAmbient = function () {
            return TypeScript.hasFlag(this.varFlags, TypeScript.VarFlags.Ambient);
        };
        VarDecl.prototype.isExported = function () {
            return TypeScript.hasFlag(this.varFlags, TypeScript.VarFlags.Exported);
        };
        VarDecl.prototype.isStatic = function () {
            return TypeScript.hasFlag(this.varFlags, TypeScript.VarFlags.Static);
        };
        VarDecl.prototype.emit = function (emitter, tokenId, startLine) {
            emitter.emitJavascriptVarDecl(this, tokenId);
        };
        VarDecl.prototype.treeViewLabel = function () {
            return "var " + this.id.actualText;
        };
        return VarDecl;
    })(BoundDecl);
    TypeScript.VarDecl = VarDecl;    
    var ArgDecl = (function (_super) {
        __extends(ArgDecl, _super);
        function ArgDecl(id) {
                _super.call(this, id, TypeScript.NodeType.ArgDecl, 0);
            this.isOptional = false;
            this.parameterPropertySym = null;
        }
        ArgDecl.prototype.isOptionalArg = function () {
            return this.isOptional || this.init;
        };
        ArgDecl.prototype.treeViewLabel = function () {
            return "arg: " + this.id.actualText;
        };
        ArgDecl.prototype.emit = function (emitter, tokenId, startLine) {
            emitter.emitParensAndCommentsInPlace(this, true);
            emitter.recordSourceMappingStart(this);
            emitter.writeToOutput(this.id.actualText);
            emitter.recordSourceMappingEnd(this);
            emitter.emitParensAndCommentsInPlace(this, false);
        };
        return ArgDecl;
    })(BoundDecl);
    TypeScript.ArgDecl = ArgDecl;    
    var internalId = 0;
    var FuncDecl = (function (_super) {
        __extends(FuncDecl, _super);
        function FuncDecl(name, bod, isConstructor, arguments, vars, scopes, statics, nodeType) {
                _super.call(this, nodeType);
            this.name = name;
            this.bod = bod;
            this.isConstructor = isConstructor;
            this.arguments = arguments;
            this.vars = vars;
            this.scopes = scopes;
            this.statics = statics;
            this.hint = null;
            this.fncFlags = TypeScript.FncFlags.None;
            this.returnTypeAnnotation = null;
            this.variableArgList = false;
            this.jumpRefs = null;
            this.internalNameCache = null;
            this.tmp1Declared = false;
            this.enclosingFnc = null;
            this.freeVariables = [];
            this.unitIndex = -1;
            this.classDecl = null;
            this.boundToProperty = null;
            this.isOverload = false;
            this.innerStaticFuncs = [];
            this.isTargetTypedAsMethod = false;
            this.isInlineCallLiteral = false;
            this.accessorSymbol = null;
            this.leftCurlyCount = 0;
            this.rightCurlyCount = 0;
            this.returnStatementsWithExpressions = [];
            this.scopeType = null;
            this.endingToken = null;
        }
        FuncDecl.prototype.isDeclaration = function () {
            return true;
        };
        FuncDecl.prototype.internalName = function () {
            if(this.internalNameCache == null) {
                var extName = this.getNameText();
                if(extName) {
                    this.internalNameCache = "_internal_" + extName;
                } else {
                    this.internalNameCache = "_internal_" + internalId++;
                }
            }
            return this.internalNameCache;
        };
        FuncDecl.prototype.hasSelfReference = function () {
            return TypeScript.hasFlag(this.fncFlags, TypeScript.FncFlags.HasSelfReference);
        };
        FuncDecl.prototype.setHasSelfReference = function () {
            this.fncFlags |= TypeScript.FncFlags.HasSelfReference;
        };
        FuncDecl.prototype.hasSuperReferenceInFatArrowFunction = function () {
            return TypeScript.hasFlag(this.fncFlags, TypeScript.FncFlags.HasSuperReferenceInFatArrowFunction);
        };
        FuncDecl.prototype.setHasSuperReferenceInFatArrowFunction = function () {
            this.fncFlags |= TypeScript.FncFlags.HasSuperReferenceInFatArrowFunction;
        };
        FuncDecl.prototype.addCloRef = function (id, sym) {
            if(this.envids == null) {
                this.envids = new Array();
            }
            this.envids[this.envids.length] = id;
            var outerFnc = this.enclosingFnc;
            if(sym) {
                while(outerFnc && (outerFnc.type.symbol != sym.container)) {
                    outerFnc.addJumpRef(sym);
                    outerFnc = outerFnc.enclosingFnc;
                }
            }
            return this.envids.length - 1;
        };
        FuncDecl.prototype.addJumpRef = function (sym) {
            if(this.jumpRefs == null) {
                this.jumpRefs = new Array();
            }
            var id = new Identifier(sym.name);
            this.jumpRefs[this.jumpRefs.length] = id;
            id.sym = sym;
            id.cloId = this.addCloRef(id, null);
        };
        FuncDecl.prototype.buildControlFlow = function () {
            var entry = new TypeScript.BasicBlock();
            var exit = new TypeScript.BasicBlock();
            var context = new TypeScript.ControlFlowContext(entry, exit);
            var controlFlowPrefix = function (ast, parent, walker) {
                ast.addToControlFlow(walker.state);
                return ast;
            };
            var walker = TypeScript.getAstWalkerFactory().getWalker(controlFlowPrefix, null, null, context);
            context.walker = walker;
            walker.walk(this.bod, this);
            return context;
        };
        FuncDecl.prototype.typeCheck = function (typeFlow) {
            return typeFlow.typeCheckFunction(this);
        };
        FuncDecl.prototype.emit = function (emitter, tokenId, startLine) {
            emitter.emitJavascriptFunction(this);
        };
        FuncDecl.prototype.getNameText = function () {
            if(this.name) {
                return this.name.actualText;
            } else {
                return this.hint;
            }
        };
        FuncDecl.prototype.isMethod = function () {
            return (this.fncFlags & TypeScript.FncFlags.Method) != TypeScript.FncFlags.None;
        };
        FuncDecl.prototype.isCallMember = function () {
            return TypeScript.hasFlag(this.fncFlags, TypeScript.FncFlags.CallMember);
        };
        FuncDecl.prototype.isConstructMember = function () {
            return TypeScript.hasFlag(this.fncFlags, TypeScript.FncFlags.ConstructMember);
        };
        FuncDecl.prototype.isIndexerMember = function () {
            return TypeScript.hasFlag(this.fncFlags, TypeScript.FncFlags.IndexerMember);
        };
        FuncDecl.prototype.isSpecialFn = function () {
            return this.isCallMember() || this.isIndexerMember() || this.isConstructMember();
        };
        FuncDecl.prototype.isAnonymousFn = function () {
            return this.name === null;
        };
        FuncDecl.prototype.isAccessor = function () {
            return TypeScript.hasFlag(this.fncFlags, TypeScript.FncFlags.GetAccessor) || TypeScript.hasFlag(this.fncFlags, TypeScript.FncFlags.SetAccessor);
        };
        FuncDecl.prototype.isGetAccessor = function () {
            return TypeScript.hasFlag(this.fncFlags, TypeScript.FncFlags.GetAccessor);
        };
        FuncDecl.prototype.isSetAccessor = function () {
            return TypeScript.hasFlag(this.fncFlags, TypeScript.FncFlags.SetAccessor);
        };
        FuncDecl.prototype.isAmbient = function () {
            return TypeScript.hasFlag(this.fncFlags, TypeScript.FncFlags.Ambient);
        };
        FuncDecl.prototype.isExported = function () {
            return TypeScript.hasFlag(this.fncFlags, TypeScript.FncFlags.Exported);
        };
        FuncDecl.prototype.isPrivate = function () {
            return TypeScript.hasFlag(this.fncFlags, TypeScript.FncFlags.Private);
        };
        FuncDecl.prototype.isPublic = function () {
            return TypeScript.hasFlag(this.fncFlags, TypeScript.FncFlags.Public);
        };
        FuncDecl.prototype.isStatic = function () {
            return TypeScript.hasFlag(this.fncFlags, TypeScript.FncFlags.Static);
        };
        FuncDecl.prototype.treeViewLabel = function () {
            if(this.name == null) {
                return "funcExpr";
            } else {
                return "func: " + this.name.actualText;
            }
        };
        FuncDecl.prototype.ClearFlags = function () {
            this.fncFlags = TypeScript.FncFlags.None;
        };
        FuncDecl.prototype.isSignature = function () {
            return (this.fncFlags & TypeScript.FncFlags.Signature) != TypeScript.FncFlags.None;
        };
        return FuncDecl;
    })(AST);
    TypeScript.FuncDecl = FuncDecl;    
    var LocationInfo = (function () {
        function LocationInfo(filename, lineMap, unitIndex) {
            this.filename = filename;
            this.lineMap = lineMap;
            this.unitIndex = unitIndex;
        }
        return LocationInfo;
    })();
    TypeScript.LocationInfo = LocationInfo;    
    TypeScript.unknownLocationInfo = new LocationInfo("unknown", null, -1);
    var Script = (function (_super) {
        __extends(Script, _super);
        function Script(vars, scopes) {
                _super.call(this, new Identifier("script"), null, false, null, vars, scopes, null, TypeScript.NodeType.Script);
            this.locationInfo = null;
            this.referencedFiles = [];
            this.requiresGlobal = false;
            this.requiresExtendsBlock = false;
            this.isResident = false;
            this.isDeclareFile = false;
            this.hasBeenTypeChecked = false;
            this.topLevelMod = null;
            this.leftCurlyCount = 0;
            this.rightCurlyCount = 0;
            this.containsUnicodeChar = false;
            this.containsUnicodeCharInComment = false;
            this.externallyVisibleImportedSymbols = [];
            this.vars = vars;
            this.scopes = scopes;
        }
        Script.prototype.setCachedEmitRequired = function (value) {
            this.cachedEmitRequired = value;
            return this.cachedEmitRequired;
        };
        Script.prototype.typeCheck = function (typeFlow) {
            return typeFlow.typeCheckScript(this);
        };
        Script.prototype.treeViewLabel = function () {
            return "Script";
        };
        Script.prototype.emitRequired = function (emitOptions) {
            if(this.cachedEmitRequired != undefined) {
                return this.cachedEmitRequired;
            }
            if(!this.isDeclareFile && !this.isResident && this.bod) {
                for(var i = 0, len = this.bod.members.length; i < len; i++) {
                    var stmt = this.bod.members[i];
                    if(stmt.nodeType == TypeScript.NodeType.ModuleDeclaration) {
                        if(!TypeScript.hasFlag((stmt).modFlags, TypeScript.ModuleFlags.ShouldEmitModuleDecl | TypeScript.ModuleFlags.Ambient)) {
                            return this.setCachedEmitRequired(true);
                        }
                    } else {
                        if(stmt.nodeType == TypeScript.NodeType.ClassDeclaration) {
                            if(!TypeScript.hasFlag((stmt).varFlags, TypeScript.VarFlags.Ambient)) {
                                return this.setCachedEmitRequired(true);
                            }
                        } else {
                            if(stmt.nodeType == TypeScript.NodeType.VarDecl) {
                                if(!TypeScript.hasFlag((stmt).varFlags, TypeScript.VarFlags.Ambient)) {
                                    return this.setCachedEmitRequired(true);
                                }
                            } else {
                                if(stmt.nodeType == TypeScript.NodeType.FuncDecl) {
                                    if(!(stmt).isSignature()) {
                                        return this.setCachedEmitRequired(true);
                                    }
                                } else {
                                    if(stmt.nodeType != TypeScript.NodeType.InterfaceDeclaration && stmt.nodeType != TypeScript.NodeType.Empty) {
                                        return this.setCachedEmitRequired(true);
                                    }
                                }
                            }
                        }
                    }
                }
                if(emitOptions.emitComments && ((this.bod.preComments && this.bod.preComments.length > 0) || (this.bod.postComments && this.bod.postComments.length > 0))) {
                    return this.setCachedEmitRequired(true);
                }
            }
            return this.setCachedEmitRequired(false);
        };
        Script.prototype.emit = function (emitter, tokenId, startLine) {
            if(this.emitRequired(emitter.emitOptions)) {
                emitter.emitParensAndCommentsInPlace(this.bod, true);
                emitter.emitJavascriptList(this.bod, null, TypeScript.TokenID.Semicolon, true, false, false, true, this.requiresExtendsBlock);
                emitter.emitParensAndCommentsInPlace(this.bod, false);
            }
        };
        Script.prototype.AddExternallyVisibleImportedSymbol = function (symbol, checker) {
            if(this.isExternallyVisibleSymbol(symbol)) {
                return;
            }
            if(!symbol.getType().symbol.isExternallyVisible(checker)) {
                var quotes = "";
                var moduleName = symbol.getType().symbol.prettyName;
                if(!TypeScript.isQuoted(moduleName)) {
                    quotes = "'";
                }
                checker.errorReporter.simpleError(symbol.declAST, "Externally visible import statement uses non exported module " + quotes + moduleName + quotes);
            }
            this.externallyVisibleImportedSymbols.push(symbol);
        };
        Script.prototype.isExternallyVisibleSymbol = function (symbol) {
            for(var i = 0; i < this.externallyVisibleImportedSymbols.length; i++) {
                if(this.externallyVisibleImportedSymbols[i] == symbol) {
                    return true;
                }
            }
            return false;
        };
        return Script;
    })(FuncDecl);
    TypeScript.Script = Script;    
    var NamedDeclaration = (function (_super) {
        __extends(NamedDeclaration, _super);
        function NamedDeclaration(nodeType, name, members) {
                _super.call(this, nodeType);
            this.name = name;
            this.members = members;
            this.leftCurlyCount = 0;
            this.rightCurlyCount = 0;
        }
        NamedDeclaration.prototype.isDeclaration = function () {
            return true;
        };
        return NamedDeclaration;
    })(ModuleElement);
    TypeScript.NamedDeclaration = NamedDeclaration;    
    var ModuleDeclaration = (function (_super) {
        __extends(ModuleDeclaration, _super);
        function ModuleDeclaration(name, members, vars, scopes, endingToken) {
                _super.call(this, TypeScript.NodeType.ModuleDeclaration, name, members);
            this.endingToken = endingToken;
            this.modFlags = TypeScript.ModuleFlags.ShouldEmitModuleDecl;
            this.amdDependencies = [];
            this.containsUnicodeChar = false;
            this.containsUnicodeCharInComment = false;
            this.vars = vars;
            this.scopes = scopes;
            this.prettyName = this.name.actualText;
        }
        ModuleDeclaration.prototype.isExported = function () {
            return TypeScript.hasFlag(this.modFlags, TypeScript.ModuleFlags.Exported);
        };
        ModuleDeclaration.prototype.isAmbient = function () {
            return TypeScript.hasFlag(this.modFlags, TypeScript.ModuleFlags.Ambient);
        };
        ModuleDeclaration.prototype.isEnum = function () {
            return TypeScript.hasFlag(this.modFlags, TypeScript.ModuleFlags.IsEnum);
        };
        ModuleDeclaration.prototype.recordNonInterface = function () {
            this.modFlags &= ~TypeScript.ModuleFlags.ShouldEmitModuleDecl;
        };
        ModuleDeclaration.prototype.typeCheck = function (typeFlow) {
            return typeFlow.typeCheckModule(this);
        };
        ModuleDeclaration.prototype.emit = function (emitter, tokenId, startLine) {
            if(!TypeScript.hasFlag(this.modFlags, TypeScript.ModuleFlags.ShouldEmitModuleDecl)) {
                emitter.emitParensAndCommentsInPlace(this, true);
                emitter.recordSourceMappingStart(this);
                emitter.emitJavascriptModule(this);
                emitter.recordSourceMappingEnd(this);
                emitter.emitParensAndCommentsInPlace(this, false);
            }
        };
        return ModuleDeclaration;
    })(NamedDeclaration);
    TypeScript.ModuleDeclaration = ModuleDeclaration;    
    var TypeDeclaration = (function (_super) {
        __extends(TypeDeclaration, _super);
        function TypeDeclaration(nodeType, name, extendsList, implementsList, members) {
                _super.call(this, nodeType, name, members);
            this.extendsList = extendsList;
            this.implementsList = implementsList;
            this.varFlags = TypeScript.VarFlags.None;
        }
        TypeDeclaration.prototype.isExported = function () {
            return TypeScript.hasFlag(this.varFlags, TypeScript.VarFlags.Exported);
        };
        TypeDeclaration.prototype.isAmbient = function () {
            return TypeScript.hasFlag(this.varFlags, TypeScript.VarFlags.Ambient);
        };
        return TypeDeclaration;
    })(NamedDeclaration);
    TypeScript.TypeDeclaration = TypeDeclaration;    
    var ClassDeclaration = (function (_super) {
        __extends(ClassDeclaration, _super);
        function ClassDeclaration(name, members, extendsList, implementsList) {
                _super.call(this, TypeScript.NodeType.ClassDeclaration, name, extendsList, implementsList, members);
            this.knownMemberNames = {
            };
            this.constructorDecl = null;
            this.constructorNestingLevel = 0;
            this.endingToken = null;
        }
        ClassDeclaration.prototype.typeCheck = function (typeFlow) {
            return typeFlow.typeCheckClass(this);
        };
        ClassDeclaration.prototype.emit = function (emitter, tokenId, startLine) {
            emitter.emitJavascriptClass(this);
        };
        return ClassDeclaration;
    })(TypeDeclaration);
    TypeScript.ClassDeclaration = ClassDeclaration;    
    var InterfaceDeclaration = (function (_super) {
        __extends(InterfaceDeclaration, _super);
        function InterfaceDeclaration(name, members, extendsList, implementsList) {
                _super.call(this, TypeScript.NodeType.InterfaceDeclaration, name, extendsList, implementsList, members);
        }
        InterfaceDeclaration.prototype.typeCheck = function (typeFlow) {
            return typeFlow.typeCheckInterface(this);
        };
        InterfaceDeclaration.prototype.emit = function (emitter, tokenId, startLine) {
        };
        return InterfaceDeclaration;
    })(TypeDeclaration);
    TypeScript.InterfaceDeclaration = InterfaceDeclaration;    
    var Statement = (function (_super) {
        __extends(Statement, _super);
        function Statement(nodeType) {
                _super.call(this, nodeType);
            this.flags |= TypeScript.ASTFlags.IsStatement;
        }
        Statement.prototype.isLoop = function () {
            return false;
        };
        Statement.prototype.isStatementOrExpression = function () {
            return true;
        };
        Statement.prototype.isCompoundStatement = function () {
            return this.isLoop();
        };
        Statement.prototype.typeCheck = function (typeFlow) {
            this.type = typeFlow.voidType;
            return this;
        };
        return Statement;
    })(ModuleElement);
    TypeScript.Statement = Statement;    
    var LabeledStatement = (function (_super) {
        __extends(LabeledStatement, _super);
        function LabeledStatement(labels, stmt) {
                _super.call(this, TypeScript.NodeType.LabeledStatement);
            this.labels = labels;
            this.stmt = stmt;
        }
        LabeledStatement.prototype.emit = function (emitter, tokenId, startLine) {
            emitter.emitParensAndCommentsInPlace(this, true);
            emitter.recordSourceMappingStart(this);
            if(this.labels) {
                var labelsLen = this.labels.members.length;
                for(var i = 0; i < labelsLen; i++) {
                    this.labels.members[i].emit(emitter, tokenId, startLine);
                }
            }
            this.stmt.emit(emitter, tokenId, true);
            emitter.recordSourceMappingEnd(this);
            emitter.emitParensAndCommentsInPlace(this, false);
        };
        LabeledStatement.prototype.typeCheck = function (typeFlow) {
            typeFlow.typeCheck(this.labels);
            this.stmt = this.stmt.typeCheck(typeFlow);
            return this;
        };
        LabeledStatement.prototype.addToControlFlow = function (context) {
            var beforeBB = context.current;
            var bb = new TypeScript.BasicBlock();
            context.current = bb;
            beforeBB.addSuccessor(bb);
        };
        return LabeledStatement;
    })(Statement);
    TypeScript.LabeledStatement = LabeledStatement;    
    var Block = (function (_super) {
        __extends(Block, _super);
        function Block(statements, isStatementBlock) {
                _super.call(this, TypeScript.NodeType.Block);
            this.statements = statements;
            this.isStatementBlock = isStatementBlock;
        }
        Block.prototype.emit = function (emitter, tokenId, startLine) {
            emitter.emitParensAndCommentsInPlace(this, true);
            emitter.recordSourceMappingStart(this);
            if(this.isStatementBlock) {
                emitter.writeLineToOutput(" {");
                emitter.indenter.increaseIndent();
            } else {
                emitter.setInVarBlock(this.statements.members.length);
            }
            var temp = emitter.setInObjectLiteral(false);
            if(this.statements) {
                emitter.emitJavascriptList(this.statements, null, TypeScript.TokenID.Semicolon, true, false, false);
            }
            if(this.isStatementBlock) {
                emitter.indenter.decreaseIndent();
                emitter.emitIndent();
                emitter.writeToOutput("}");
            }
            emitter.setInObjectLiteral(temp);
            emitter.recordSourceMappingEnd(this);
            emitter.emitParensAndCommentsInPlace(this, false);
        };
        Block.prototype.addToControlFlow = function (context) {
            var afterIfNeeded = new TypeScript.BasicBlock();
            context.pushStatement(this, context.current, afterIfNeeded);
            if(this.statements) {
                context.walk(this.statements, this);
            }
            context.walker.options.goChildren = false;
            context.popStatement();
            if(afterIfNeeded.predecessors.length > 0) {
                context.current.addSuccessor(afterIfNeeded);
                context.current = afterIfNeeded;
            }
        };
        Block.prototype.typeCheck = function (typeFlow) {
            if(!typeFlow.checker.styleSettings.emptyBlocks) {
                if((this.statements === null) || (this.statements.members.length == 0)) {
                    typeFlow.checker.errorReporter.styleError(this, "empty block");
                }
            }
            typeFlow.typeCheck(this.statements);
            return this;
        };
        return Block;
    })(Statement);
    TypeScript.Block = Block;    
    var Jump = (function (_super) {
        __extends(Jump, _super);
        function Jump(nodeType) {
                _super.call(this, nodeType);
            this.target = null;
            this.resolvedTarget = null;
        }
        Jump.prototype.hasExplicitTarget = function () {
            return (this.target);
        };
        Jump.prototype.setResolvedTarget = function (parser, stmt) {
            if(stmt.isLoop()) {
                this.resolvedTarget = stmt;
                return true;
            }
            if(this.nodeType === TypeScript.NodeType.Continue) {
                parser.reportParseError("continue statement applies only to loops");
                return false;
            } else {
                if((stmt.nodeType == TypeScript.NodeType.Switch) || this.hasExplicitTarget()) {
                    this.resolvedTarget = stmt;
                    return true;
                } else {
                    parser.reportParseError("break statement with no label can apply only to a loop or switch statement");
                    return false;
                }
            }
        };
        Jump.prototype.addToControlFlow = function (context) {
            _super.prototype.addToControlFlow.call(this, context);
            context.unconditionalBranch(this.resolvedTarget, (this.nodeType == TypeScript.NodeType.Continue));
        };
        Jump.prototype.emit = function (emitter, tokenId, startLine) {
            emitter.emitParensAndCommentsInPlace(this, true);
            emitter.recordSourceMappingStart(this);
            if(this.nodeType == TypeScript.NodeType.Break) {
                emitter.writeToOutput("break");
            } else {
                emitter.writeToOutput("continue");
            }
            if(this.hasExplicitTarget()) {
                emitter.writeToOutput(" " + this.target);
            }
            emitter.recordSourceMappingEnd(this);
            emitter.writeToOutput(";");
            emitter.emitParensAndCommentsInPlace(this, false);
        };
        return Jump;
    })(Statement);
    TypeScript.Jump = Jump;    
    var WhileStatement = (function (_super) {
        __extends(WhileStatement, _super);
        function WhileStatement(cond) {
                _super.call(this, TypeScript.NodeType.While);
            this.cond = cond;
            this.body = null;
        }
        WhileStatement.prototype.isLoop = function () {
            return true;
        };
        WhileStatement.prototype.emit = function (emitter, tokenId, startLine) {
            emitter.emitParensAndCommentsInPlace(this, true);
            emitter.recordSourceMappingStart(this);
            var temp = emitter.setInObjectLiteral(false);
            emitter.writeToOutput("while(");
            emitter.emitJavascript(this.cond, TypeScript.TokenID.While, false);
            emitter.writeToOutput(")");
            emitter.emitJavascriptStatements(this.body, false);
            emitter.setInObjectLiteral(temp);
            emitter.recordSourceMappingEnd(this);
            emitter.emitParensAndCommentsInPlace(this, false);
        };
        WhileStatement.prototype.typeCheck = function (typeFlow) {
            return typeFlow.typeCheckWhile(this);
        };
        WhileStatement.prototype.addToControlFlow = function (context) {
            var loopHeader = context.current;
            var loopStart = new TypeScript.BasicBlock();
            var afterLoop = new TypeScript.BasicBlock();
            loopHeader.addSuccessor(loopStart);
            context.current = loopStart;
            context.addContent(this.cond);
            var condBlock = context.current;
            var targetInfo = null;
            if(this.body) {
                context.current = new TypeScript.BasicBlock();
                condBlock.addSuccessor(context.current);
                context.pushStatement(this, loopStart, afterLoop);
                context.walk(this.body, this);
                targetInfo = context.popStatement();
            }
            if(!(context.noContinuation)) {
                var loopEnd = context.current;
                loopEnd.addSuccessor(loopStart);
            }
            context.current = afterLoop;
            condBlock.addSuccessor(afterLoop);
            context.noContinuation = false;
            context.walker.options.goChildren = false;
        };
        return WhileStatement;
    })(Statement);
    TypeScript.WhileStatement = WhileStatement;    
    var DoWhileStatement = (function (_super) {
        __extends(DoWhileStatement, _super);
        function DoWhileStatement() {
                _super.call(this, TypeScript.NodeType.DoWhile);
            this.body = null;
            this.whileAST = null;
            this.cond = null;
        }
        DoWhileStatement.prototype.isLoop = function () {
            return true;
        };
        DoWhileStatement.prototype.emit = function (emitter, tokenId, startLine) {
            emitter.emitParensAndCommentsInPlace(this, true);
            emitter.recordSourceMappingStart(this);
            var temp = emitter.setInObjectLiteral(false);
            emitter.writeToOutput("do");
            emitter.emitJavascriptStatements(this.body, true);
            emitter.recordSourceMappingStart(this.whileAST);
            emitter.writeToOutput("while");
            emitter.recordSourceMappingEnd(this.whileAST);
            emitter.writeToOutput('(');
            emitter.emitJavascript(this.cond, TypeScript.TokenID.CloseParen, false);
            emitter.writeToOutput(")");
            emitter.setInObjectLiteral(temp);
            emitter.recordSourceMappingEnd(this);
            emitter.writeToOutput(";");
            emitter.emitParensAndCommentsInPlace(this, false);
        };
        DoWhileStatement.prototype.typeCheck = function (typeFlow) {
            return typeFlow.typeCheckDoWhile(this);
        };
        DoWhileStatement.prototype.addToControlFlow = function (context) {
            var loopHeader = context.current;
            var loopStart = new TypeScript.BasicBlock();
            var afterLoop = new TypeScript.BasicBlock();
            loopHeader.addSuccessor(loopStart);
            context.current = loopStart;
            var targetInfo = null;
            if(this.body) {
                context.pushStatement(this, loopStart, afterLoop);
                context.walk(this.body, this);
                targetInfo = context.popStatement();
            }
            if(!(context.noContinuation)) {
                var loopEnd = context.current;
                loopEnd.addSuccessor(loopStart);
                context.addContent(this.cond);
                context.current = afterLoop;
                loopEnd.addSuccessor(afterLoop);
            } else {
                context.addUnreachable(this.cond);
            }
            context.walker.options.goChildren = false;
        };
        return DoWhileStatement;
    })(Statement);
    TypeScript.DoWhileStatement = DoWhileStatement;    
    var IfStatement = (function (_super) {
        __extends(IfStatement, _super);
        function IfStatement(cond) {
                _super.call(this, TypeScript.NodeType.If);
            this.cond = cond;
            this.elseBod = null;
            this.statement = new ASTSpan();
        }
        IfStatement.prototype.isCompoundStatement = function () {
            return true;
        };
        IfStatement.prototype.emit = function (emitter, tokenId, startLine) {
            emitter.emitParensAndCommentsInPlace(this, true);
            emitter.recordSourceMappingStart(this);
            var temp = emitter.setInObjectLiteral(false);
            emitter.recordSourceMappingStart(this.statement);
            emitter.writeToOutput("if(");
            emitter.emitJavascript(this.cond, TypeScript.TokenID.If, false);
            emitter.writeToOutput(")");
            emitter.recordSourceMappingEnd(this.statement);
            emitter.emitJavascriptStatements(this.thenBod, true);
            if(this.elseBod) {
                if(this.elseBod.nodeType === TypeScript.NodeType.If) {
                    emitter.writeToOutput(" else ");
                    this.elseBod.emit(emitter, tokenId, false);
                } else {
                    emitter.writeToOutput(" else");
                    emitter.emitJavascriptStatements(this.elseBod, true);
                }
            }
            emitter.setInObjectLiteral(temp);
            emitter.recordSourceMappingEnd(this);
            emitter.emitParensAndCommentsInPlace(this, false);
        };
        IfStatement.prototype.typeCheck = function (typeFlow) {
            return typeFlow.typeCheckIf(this);
        };
        IfStatement.prototype.addToControlFlow = function (context) {
            this.cond.addToControlFlow(context);
            var afterIf = new TypeScript.BasicBlock();
            var beforeIf = context.current;
            context.pushStatement(this, beforeIf, afterIf);
            var hasContinuation = false;
            context.current = new TypeScript.BasicBlock();
            beforeIf.addSuccessor(context.current);
            context.walk(this.thenBod, this);
            if(!context.noContinuation) {
                hasContinuation = true;
                context.current.addSuccessor(afterIf);
            }
            if(this.elseBod) {
                context.current = new TypeScript.BasicBlock();
                context.noContinuation = false;
                beforeIf.addSuccessor(context.current);
                context.walk(this.elseBod, this);
                if(!context.noContinuation) {
                    hasContinuation = true;
                    context.current.addSuccessor(afterIf);
                } else {
                    if(hasContinuation) {
                        context.noContinuation = false;
                    }
                }
            } else {
                beforeIf.addSuccessor(afterIf);
                context.noContinuation = false;
                hasContinuation = true;
            }
            var targetInfo = context.popStatement();
            if(afterIf.predecessors.length > 0) {
                context.noContinuation = false;
                hasContinuation = true;
            }
            if(hasContinuation) {
                context.current = afterIf;
            }
            context.walker.options.goChildren = false;
        };
        return IfStatement;
    })(Statement);
    TypeScript.IfStatement = IfStatement;    
    var ReturnStatement = (function (_super) {
        __extends(ReturnStatement, _super);
        function ReturnStatement() {
                _super.call(this, TypeScript.NodeType.Return);
            this.returnExpression = null;
        }
        ReturnStatement.prototype.emit = function (emitter, tokenId, startLine) {
            emitter.emitParensAndCommentsInPlace(this, true);
            emitter.recordSourceMappingStart(this);
            var temp = emitter.setInObjectLiteral(false);
            if(this.returnExpression) {
                emitter.writeToOutput("return ");
                emitter.emitJavascript(this.returnExpression, TypeScript.TokenID.Semicolon, false);
                if(this.returnExpression.nodeType === TypeScript.NodeType.FuncDecl) {
                    emitter.writeToOutput(";");
                }
            } else {
                emitter.writeToOutput("return;");
            }
            emitter.setInObjectLiteral(temp);
            emitter.recordSourceMappingEnd(this);
            emitter.emitParensAndCommentsInPlace(this, false);
        };
        ReturnStatement.prototype.addToControlFlow = function (context) {
            _super.prototype.addToControlFlow.call(this, context);
            context.returnStmt();
        };
        ReturnStatement.prototype.typeCheck = function (typeFlow) {
            return typeFlow.typeCheckReturn(this);
        };
        return ReturnStatement;
    })(Statement);
    TypeScript.ReturnStatement = ReturnStatement;    
    var EndCode = (function (_super) {
        __extends(EndCode, _super);
        function EndCode() {
                _super.call(this, TypeScript.NodeType.EndCode);
        }
        return EndCode;
    })(AST);
    TypeScript.EndCode = EndCode;    
    var ForInStatement = (function (_super) {
        __extends(ForInStatement, _super);
        function ForInStatement(lval, obj) {
                _super.call(this, TypeScript.NodeType.ForIn);
            this.lval = lval;
            this.obj = obj;
            this.statement = new ASTSpan();
            if(this.lval && (this.lval.nodeType == TypeScript.NodeType.VarDecl)) {
                (this.lval).varFlags |= TypeScript.VarFlags.AutoInit;
            }
        }
        ForInStatement.prototype.isLoop = function () {
            return true;
        };
        ForInStatement.prototype.isFiltered = function () {
            if(this.body) {
                var singleItem = null;
                if(this.body.nodeType == TypeScript.NodeType.List) {
                    var stmts = this.body;
                    if(stmts.members.length == 1) {
                        singleItem = stmts.members[0];
                    }
                } else {
                    singleItem = this.body;
                }
                if(singleItem !== null) {
                    if(singleItem.nodeType == TypeScript.NodeType.Block) {
                        var block = singleItem;
                        if((block.statements !== null) && (block.statements.members.length == 1)) {
                            singleItem = block.statements.members[0];
                        }
                    }
                    if(singleItem.nodeType == TypeScript.NodeType.If) {
                        var cond = (singleItem).cond;
                        if(cond.nodeType == TypeScript.NodeType.Call) {
                            var target = (cond).target;
                            if(target.nodeType == TypeScript.NodeType.Dot) {
                                var binex = target;
                                if((binex.operand1.nodeType == TypeScript.NodeType.Name) && (this.obj.nodeType == TypeScript.NodeType.Name) && ((binex.operand1).actualText == (this.obj).actualText)) {
                                    var prop = binex.operand2;
                                    if(prop.actualText == "hasOwnProperty") {
                                        var args = (cond).arguments;
                                        if((args !== null) && (args.members.length == 1)) {
                                            var arg = args.members[0];
                                            if((arg.nodeType == TypeScript.NodeType.Name) && (this.lval.nodeType == TypeScript.NodeType.Name)) {
                                                if(((this.lval).actualText) == (arg).actualText) {
                                                    return true;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return false;
        };
        ForInStatement.prototype.emit = function (emitter, tokenId, startLine) {
            emitter.emitParensAndCommentsInPlace(this, true);
            emitter.recordSourceMappingStart(this);
            var temp = emitter.setInObjectLiteral(false);
            emitter.recordSourceMappingStart(this.statement);
            emitter.writeToOutput("for(");
            emitter.emitJavascript(this.lval, TypeScript.TokenID.For, false);
            emitter.writeToOutput(" in ");
            emitter.emitJavascript(this.obj, TypeScript.TokenID.For, false);
            emitter.writeToOutput(")");
            emitter.recordSourceMappingEnd(this.statement);
            emitter.emitJavascriptStatements(this.body, true);
            emitter.setInObjectLiteral(temp);
            emitter.recordSourceMappingEnd(this);
            emitter.emitParensAndCommentsInPlace(this, false);
        };
        ForInStatement.prototype.typeCheck = function (typeFlow) {
            if(typeFlow.checker.styleSettings.forin) {
                if(!this.isFiltered()) {
                    typeFlow.checker.errorReporter.styleError(this, "no hasOwnProperty filter");
                }
            }
            return typeFlow.typeCheckForIn(this);
        };
        ForInStatement.prototype.addToControlFlow = function (context) {
            if(this.lval) {
                context.addContent(this.lval);
            }
            if(this.obj) {
                context.addContent(this.obj);
            }
            var loopHeader = context.current;
            var loopStart = new TypeScript.BasicBlock();
            var afterLoop = new TypeScript.BasicBlock();
            loopHeader.addSuccessor(loopStart);
            context.current = loopStart;
            if(this.body) {
                context.pushStatement(this, loopStart, afterLoop);
                context.walk(this.body, this);
                context.popStatement();
            }
            if(!(context.noContinuation)) {
                var loopEnd = context.current;
                loopEnd.addSuccessor(loopStart);
            }
            context.current = afterLoop;
            context.noContinuation = false;
            loopHeader.addSuccessor(afterLoop);
            context.walker.options.goChildren = false;
        };
        return ForInStatement;
    })(Statement);
    TypeScript.ForInStatement = ForInStatement;    
    var ForStatement = (function (_super) {
        __extends(ForStatement, _super);
        function ForStatement(init) {
                _super.call(this, TypeScript.NodeType.For);
            this.init = init;
        }
        ForStatement.prototype.isLoop = function () {
            return true;
        };
        ForStatement.prototype.emit = function (emitter, tokenId, startLine) {
            emitter.emitParensAndCommentsInPlace(this, true);
            emitter.recordSourceMappingStart(this);
            var temp = emitter.setInObjectLiteral(false);
            emitter.writeToOutput("for(");
            if(this.init) {
                if(this.init.nodeType != TypeScript.NodeType.List) {
                    emitter.emitJavascript(this.init, TypeScript.TokenID.For, false);
                } else {
                    emitter.setInVarBlock((this.init).members.length);
                    emitter.emitJavascriptList(this.init, null, TypeScript.TokenID.For, false, false, false);
                }
            }
            emitter.writeToOutput("; ");
            emitter.emitJavascript(this.cond, TypeScript.TokenID.For, false);
            emitter.writeToOutput("; ");
            emitter.emitJavascript(this.incr, TypeScript.TokenID.For, false);
            emitter.writeToOutput(")");
            emitter.emitJavascriptStatements(this.body, true);
            emitter.setInObjectLiteral(temp);
            emitter.recordSourceMappingEnd(this);
            emitter.emitParensAndCommentsInPlace(this, false);
        };
        ForStatement.prototype.typeCheck = function (typeFlow) {
            return typeFlow.typeCheckFor(this);
        };
        ForStatement.prototype.addToControlFlow = function (context) {
            if(this.init) {
                context.addContent(this.init);
            }
            var loopHeader = context.current;
            var loopStart = new TypeScript.BasicBlock();
            var afterLoop = new TypeScript.BasicBlock();
            loopHeader.addSuccessor(loopStart);
            context.current = loopStart;
            var condBlock = null;
            var continueTarget = loopStart;
            var incrBB = null;
            if(this.incr) {
                incrBB = new TypeScript.BasicBlock();
                continueTarget = incrBB;
            }
            if(this.cond) {
                condBlock = context.current;
                context.addContent(this.cond);
                context.current = new TypeScript.BasicBlock();
                condBlock.addSuccessor(context.current);
            }
            var targetInfo = null;
            if(this.body) {
                context.pushStatement(this, continueTarget, afterLoop);
                context.walk(this.body, this);
                targetInfo = context.popStatement();
            }
            if(this.incr) {
                if(context.noContinuation) {
                    if(incrBB.predecessors.length == 0) {
                        context.addUnreachable(this.incr);
                    }
                } else {
                    context.current.addSuccessor(incrBB);
                    context.current = incrBB;
                    context.addContent(this.incr);
                }
            }
            var loopEnd = context.current;
            if(!(context.noContinuation)) {
                loopEnd.addSuccessor(loopStart);
            }
            if(condBlock) {
                condBlock.addSuccessor(afterLoop);
                context.noContinuation = false;
            }
            if(afterLoop.predecessors.length > 0) {
                context.noContinuation = false;
                context.current = afterLoop;
            }
            context.walker.options.goChildren = false;
        };
        return ForStatement;
    })(Statement);
    TypeScript.ForStatement = ForStatement;    
    var WithStatement = (function (_super) {
        __extends(WithStatement, _super);
        function WithStatement(expr) {
                _super.call(this, TypeScript.NodeType.With);
            this.expr = expr;
            this.withSym = null;
        }
        WithStatement.prototype.isCompoundStatement = function () {
            return true;
        };
        WithStatement.prototype.emit = function (emitter, tokenId, startLine) {
            emitter.emitParensAndCommentsInPlace(this, true);
            emitter.recordSourceMappingStart(this);
            emitter.writeToOutput("with (");
            if(this.expr) {
                emitter.emitJavascript(this.expr, TypeScript.TokenID.With, false);
            }
            emitter.writeToOutput(")");
            emitter.emitJavascriptStatements(this.body, true);
            emitter.recordSourceMappingEnd(this);
            emitter.emitParensAndCommentsInPlace(this, false);
        };
        WithStatement.prototype.typeCheck = function (typeFlow) {
            return typeFlow.typeCheckWith(this);
        };
        return WithStatement;
    })(Statement);
    TypeScript.WithStatement = WithStatement;    
    var SwitchStatement = (function (_super) {
        __extends(SwitchStatement, _super);
        function SwitchStatement(val) {
                _super.call(this, TypeScript.NodeType.Switch);
            this.val = val;
            this.defaultCase = null;
            this.statement = new ASTSpan();
        }
        SwitchStatement.prototype.isCompoundStatement = function () {
            return true;
        };
        SwitchStatement.prototype.emit = function (emitter, tokenId, startLine) {
            emitter.emitParensAndCommentsInPlace(this, true);
            emitter.recordSourceMappingStart(this);
            var temp = emitter.setInObjectLiteral(false);
            emitter.recordSourceMappingStart(this.statement);
            emitter.writeToOutput("switch(");
            emitter.emitJavascript(this.val, TypeScript.TokenID.Identifier, false);
            emitter.writeToOutput(")");
            emitter.recordSourceMappingEnd(this.statement);
            emitter.writeLineToOutput(" {");
            emitter.indenter.increaseIndent();
            var casesLen = this.caseList.members.length;
            for(var i = 0; i < casesLen; i++) {
                var caseExpr = this.caseList.members[i];
                emitter.emitJavascript(caseExpr, TypeScript.TokenID.Case, true);
            }
            emitter.indenter.decreaseIndent();
            emitter.emitIndent();
            emitter.writeToOutput("}");
            emitter.setInObjectLiteral(temp);
            emitter.recordSourceMappingEnd(this);
            emitter.emitParensAndCommentsInPlace(this, false);
        };
        SwitchStatement.prototype.typeCheck = function (typeFlow) {
            var len = this.caseList.members.length;
            this.val = typeFlow.typeCheck(this.val);
            for(var i = 0; i < len; i++) {
                this.caseList.members[i] = typeFlow.typeCheck(this.caseList.members[i]);
            }
            this.defaultCase = typeFlow.typeCheck(this.defaultCase);
            this.type = typeFlow.voidType;
            return this;
        };
        SwitchStatement.prototype.addToControlFlow = function (context) {
            var condBlock = context.current;
            context.addContent(this.val);
            var execBlock = new TypeScript.BasicBlock();
            var afterSwitch = new TypeScript.BasicBlock();
            condBlock.addSuccessor(execBlock);
            context.pushSwitch(execBlock);
            context.current = execBlock;
            context.pushStatement(this, execBlock, afterSwitch);
            context.walk(this.caseList, this);
            context.popSwitch();
            var targetInfo = context.popStatement();
            var hasCondContinuation = (this.defaultCase == null);
            if(this.defaultCase == null) {
                condBlock.addSuccessor(afterSwitch);
            }
            if(afterSwitch.predecessors.length > 0) {
                context.noContinuation = false;
                context.current = afterSwitch;
            } else {
                context.noContinuation = true;
            }
            context.walker.options.goChildren = false;
        };
        return SwitchStatement;
    })(Statement);
    TypeScript.SwitchStatement = SwitchStatement;    
    var CaseStatement = (function (_super) {
        __extends(CaseStatement, _super);
        function CaseStatement() {
                _super.call(this, TypeScript.NodeType.Case);
            this.expr = null;
        }
        CaseStatement.prototype.emit = function (emitter, tokenId, startLine) {
            emitter.emitParensAndCommentsInPlace(this, true);
            emitter.recordSourceMappingStart(this);
            if(this.expr) {
                emitter.writeToOutput("case ");
                emitter.emitJavascript(this.expr, TypeScript.TokenID.Identifier, false);
            } else {
                emitter.writeToOutput("default");
            }
            emitter.writeToOutput(":");
            if(this.body.members.length == 1 && this.body.members[0].nodeType == TypeScript.NodeType.Block) {
                emitter.emitJavascriptStatements(this.body, false);
            } else {
                emitter.writeLineToOutput("");
                emitter.indenter.increaseIndent();
                emitter.emitBareJavascriptStatements(this.body);
                emitter.indenter.decreaseIndent();
            }
            emitter.recordSourceMappingEnd(this);
            emitter.emitParensAndCommentsInPlace(this, false);
        };
        CaseStatement.prototype.typeCheck = function (typeFlow) {
            this.expr = typeFlow.typeCheck(this.expr);
            typeFlow.typeCheck(this.body);
            this.type = typeFlow.voidType;
            return this;
        };
        CaseStatement.prototype.addToControlFlow = function (context) {
            var execBlock = new TypeScript.BasicBlock();
            var sw = context.currentSwitch[context.currentSwitch.length - 1];
            if(this.expr) {
                var exprBlock = new TypeScript.BasicBlock();
                context.current = exprBlock;
                sw.addSuccessor(exprBlock);
                context.addContent(this.expr);
                exprBlock.addSuccessor(execBlock);
            } else {
                sw.addSuccessor(execBlock);
            }
            context.current = execBlock;
            if(this.body) {
                context.walk(this.body, this);
            }
            context.noContinuation = false;
            context.walker.options.goChildren = false;
        };
        return CaseStatement;
    })(Statement);
    TypeScript.CaseStatement = CaseStatement;    
    var TypeReference = (function (_super) {
        __extends(TypeReference, _super);
        function TypeReference(term, arrayCount) {
                _super.call(this, TypeScript.NodeType.TypeRef);
            this.term = term;
            this.arrayCount = arrayCount;
        }
        TypeReference.prototype.emit = function (emitter, tokenId, startLine) {
            throw new Error("should not emit a type ref");
        };
        TypeReference.prototype.typeCheck = function (typeFlow) {
            var prevInTCTR = typeFlow.inTypeRefTypeCheck;
            typeFlow.inTypeRefTypeCheck = true;
            var typeLink = TypeScript.getTypeLink(this, typeFlow.checker, true);
            typeFlow.checker.resolveTypeLink(typeFlow.scope, typeLink, false);
            if(this.term) {
                typeFlow.typeCheck(this.term);
            }
            typeFlow.checkForVoidConstructor(typeLink.type, this);
            this.type = typeLink.type;
            if(this.term) {
                this.term.type = this.type;
            }
            typeFlow.inTypeRefTypeCheck = prevInTCTR;
            return this;
        };
        return TypeReference;
    })(AST);
    TypeScript.TypeReference = TypeReference;    
    var TryFinally = (function (_super) {
        __extends(TryFinally, _super);
        function TryFinally(tryNode, finallyNode) {
                _super.call(this, TypeScript.NodeType.TryFinally);
            this.tryNode = tryNode;
            this.finallyNode = finallyNode;
        }
        TryFinally.prototype.isCompoundStatement = function () {
            return true;
        };
        TryFinally.prototype.emit = function (emitter, tokenId, startLine) {
            emitter.recordSourceMappingStart(this);
            emitter.emitJavascript(this.tryNode, TypeScript.TokenID.Try, false);
            emitter.emitJavascript(this.finallyNode, TypeScript.TokenID.Finally, false);
            emitter.recordSourceMappingEnd(this);
        };
        TryFinally.prototype.typeCheck = function (typeFlow) {
            this.tryNode = typeFlow.typeCheck(this.tryNode);
            this.finallyNode = typeFlow.typeCheck(this.finallyNode);
            this.type = typeFlow.voidType;
            return this;
        };
        TryFinally.prototype.addToControlFlow = function (context) {
            var afterFinally = new TypeScript.BasicBlock();
            context.walk(this.tryNode, this);
            var finBlock = new TypeScript.BasicBlock();
            if(context.current) {
                context.current.addSuccessor(finBlock);
            }
            context.current = finBlock;
            context.pushStatement(this, null, afterFinally);
            context.walk(this.finallyNode, this);
            if(!context.noContinuation && context.current) {
                context.current.addSuccessor(afterFinally);
            }
            if(afterFinally.predecessors.length > 0) {
                context.current = afterFinally;
            } else {
                context.noContinuation = true;
            }
            context.popStatement();
            context.walker.options.goChildren = false;
        };
        return TryFinally;
    })(Statement);
    TypeScript.TryFinally = TryFinally;    
    var TryCatch = (function (_super) {
        __extends(TryCatch, _super);
        function TryCatch(tryNode, catchNode) {
                _super.call(this, TypeScript.NodeType.TryCatch);
            this.tryNode = tryNode;
            this.catchNode = catchNode;
        }
        TryCatch.prototype.isCompoundStatement = function () {
            return true;
        };
        TryCatch.prototype.emit = function (emitter, tokenId, startLine) {
            emitter.emitParensAndCommentsInPlace(this, true);
            emitter.recordSourceMappingStart(this);
            emitter.emitJavascript(this.tryNode, TypeScript.TokenID.Try, false);
            emitter.emitJavascript(this.catchNode, TypeScript.TokenID.Catch, false);
            emitter.recordSourceMappingEnd(this);
            emitter.emitParensAndCommentsInPlace(this, false);
        };
        TryCatch.prototype.addToControlFlow = function (context) {
            var beforeTry = context.current;
            var tryBlock = new TypeScript.BasicBlock();
            beforeTry.addSuccessor(tryBlock);
            context.current = tryBlock;
            var afterTryCatch = new TypeScript.BasicBlock();
            context.pushStatement(this, null, afterTryCatch);
            context.walk(this.tryNode, this);
            if(!context.noContinuation) {
                if(context.current) {
                    context.current.addSuccessor(afterTryCatch);
                }
            }
            context.current = new TypeScript.BasicBlock();
            beforeTry.addSuccessor(context.current);
            context.walk(this.catchNode, this);
            context.popStatement();
            if(!context.noContinuation) {
                if(context.current) {
                    context.current.addSuccessor(afterTryCatch);
                }
            }
            context.current = afterTryCatch;
            context.walker.options.goChildren = false;
        };
        TryCatch.prototype.typeCheck = function (typeFlow) {
            this.tryNode = typeFlow.typeCheck(this.tryNode);
            this.catchNode = typeFlow.typeCheck(this.catchNode);
            this.type = typeFlow.voidType;
            return this;
        };
        return TryCatch;
    })(Statement);
    TypeScript.TryCatch = TryCatch;    
    var Try = (function (_super) {
        __extends(Try, _super);
        function Try(body) {
                _super.call(this, TypeScript.NodeType.Try);
            this.body = body;
        }
        Try.prototype.emit = function (emitter, tokenId, startLine) {
            emitter.emitParensAndCommentsInPlace(this, true);
            emitter.recordSourceMappingStart(this);
            emitter.writeToOutput("try ");
            emitter.emitJavascript(this.body, TypeScript.TokenID.Try, false);
            emitter.recordSourceMappingEnd(this);
            emitter.emitParensAndCommentsInPlace(this, false);
        };
        Try.prototype.typeCheck = function (typeFlow) {
            this.body = typeFlow.typeCheck(this.body);
            return this;
        };
        Try.prototype.addToControlFlow = function (context) {
            if(this.body) {
                context.walk(this.body, this);
            }
            context.walker.options.goChildren = false;
            context.noContinuation = false;
        };
        return Try;
    })(Statement);
    TypeScript.Try = Try;    
    var Catch = (function (_super) {
        __extends(Catch, _super);
        function Catch(param, body) {
                _super.call(this, TypeScript.NodeType.Catch);
            this.param = param;
            this.body = body;
            this.statement = new ASTSpan();
            this.containedScope = null;
            if(this.param) {
                this.param.varFlags |= TypeScript.VarFlags.AutoInit;
            }
        }
        Catch.prototype.emit = function (emitter, tokenId, startLine) {
            emitter.emitParensAndCommentsInPlace(this, true);
            emitter.recordSourceMappingStart(this);
            emitter.writeToOutput(" ");
            emitter.recordSourceMappingStart(this.statement);
            emitter.writeToOutput("catch (");
            emitter.emitJavascript(this.param, TypeScript.TokenID.OpenParen, false);
            emitter.writeToOutput(")");
            emitter.recordSourceMappingEnd(this.statement);
            emitter.emitJavascript(this.body, TypeScript.TokenID.Catch, false);
            emitter.recordSourceMappingEnd(this);
            emitter.emitParensAndCommentsInPlace(this, false);
        };
        Catch.prototype.addToControlFlow = function (context) {
            if(this.param) {
                context.addContent(this.param);
                var bodBlock = new TypeScript.BasicBlock();
                context.current.addSuccessor(bodBlock);
                context.current = bodBlock;
            }
            if(this.body) {
                context.walk(this.body, this);
            }
            context.noContinuation = false;
            context.walker.options.goChildren = false;
        };
        Catch.prototype.typeCheck = function (typeFlow) {
            var prevScope = typeFlow.scope;
            typeFlow.scope = this.containedScope;
            this.param = typeFlow.typeCheck(this.param);
            var exceptVar = new TypeScript.ValueLocation();
            var varSym = new TypeScript.VariableSymbol((this.param).id.text, this.param.minChar, typeFlow.checker.locationInfo.unitIndex, exceptVar);
            exceptVar.symbol = varSym;
            exceptVar.typeLink = new TypeScript.TypeLink();
            exceptVar.typeLink.type = typeFlow.anyType;
            var thisFnc = typeFlow.thisFnc;
            if(thisFnc && thisFnc.type) {
                exceptVar.symbol.container = thisFnc.type.symbol;
            } else {
                exceptVar.symbol.container = null;
            }
            this.param.sym = exceptVar.symbol;
            typeFlow.scope.enter(exceptVar.symbol.container, this.param, exceptVar.symbol, typeFlow.checker.errorReporter, false, false, false);
            this.body = typeFlow.typeCheck(this.body);
            if(typeFlow.checker.inProvisionalTypecheckMode()) {
                var table = typeFlow.scope.getTable();
                (table).secondaryTable.table[exceptVar.symbol.name] = undefined;
            }
            this.type = typeFlow.voidType;
            typeFlow.scope = prevScope;
            return this;
        };
        return Catch;
    })(Statement);
    TypeScript.Catch = Catch;    
    var Finally = (function (_super) {
        __extends(Finally, _super);
        function Finally(body) {
                _super.call(this, TypeScript.NodeType.Finally);
            this.body = body;
        }
        Finally.prototype.emit = function (emitter, tokenId, startLine) {
            emitter.emitParensAndCommentsInPlace(this, true);
            emitter.recordSourceMappingStart(this);
            emitter.writeToOutput("finally");
            emitter.emitJavascript(this.body, TypeScript.TokenID.Finally, false);
            emitter.recordSourceMappingEnd(this);
            emitter.emitParensAndCommentsInPlace(this, false);
        };
        Finally.prototype.addToControlFlow = function (context) {
            if(this.body) {
                context.walk(this.body, this);
            }
            context.walker.options.goChildren = false;
            context.noContinuation = false;
        };
        Finally.prototype.typeCheck = function (typeFlow) {
            this.body = typeFlow.typeCheck(this.body);
            return this;
        };
        return Finally;
    })(Statement);
    TypeScript.Finally = Finally;    
    var Comment = (function (_super) {
        __extends(Comment, _super);
        function Comment(content, isBlockComment, endsLine) {
                _super.call(this, TypeScript.NodeType.Comment);
            this.content = content;
            this.isBlockComment = isBlockComment;
            this.endsLine = endsLine;
            this.text = null;
            this.docCommentText = null;
        }
        Comment.prototype.getText = function () {
            if(this.text == null) {
                if(this.isBlockComment) {
                    this.text = this.content.split("\n");
                    for(var i = 0; i < this.text.length; i++) {
                        this.text[i] = this.text[i].replace(/^\s+|\s+$/g, '');
                    }
                } else {
                    this.text = [
                        (this.content.replace(/^\s+|\s+$/g, ''))
                    ];
                }
            }
            return this.text;
        };
        Comment.prototype.isDocComment = function () {
            if(this.isBlockComment) {
                return this.content.charAt(2) == "*";
            }
            return false;
        };
        Comment.prototype.getDocCommentText = function () {
            if(this.docCommentText == null) {
                this.docCommentText = Comment.cleanJSDocComment(this.content);
            }
            return this.docCommentText;
        };
        Comment.consumeLeadingSpace = function consumeLeadingSpace(line, startIndex, maxSpacesToRemove) {
            var endIndex = line.length;
            if(maxSpacesToRemove != undefined) {
                endIndex = TypeScript.min(startIndex + maxSpacesToRemove, endIndex);
            }
            for(; startIndex < endIndex; startIndex++) {
                var charCode = line.charCodeAt(startIndex);
                if(charCode != TypeScript.LexCodeSpace && charCode != TypeScript.LexCodeTAB) {
                    return startIndex;
                }
            }
            if(endIndex != line.length) {
                return endIndex;
            }
            return -1;
        }
        Comment.isSpaceChar = function isSpaceChar(line, index) {
            var length = line.length;
            if(index < length) {
                var charCode = line.charCodeAt(index);
                return charCode == TypeScript.LexCodeSpace || charCode == TypeScript.LexCodeTAB;
            }
            return index == length;
        }
        Comment.cleanDocCommentLine = function cleanDocCommentLine(line, jsDocStyleComment, jsDocLineSpaceToRemove) {
            var nonSpaceIndex = Comment.consumeLeadingSpace(line, 0);
            if(nonSpaceIndex != -1) {
                var jsDocSpacesRemoved = nonSpaceIndex;
                if(jsDocStyleComment && line.charAt(nonSpaceIndex) == '*') {
                    var startIndex = nonSpaceIndex + 1;
                    nonSpaceIndex = Comment.consumeLeadingSpace(line, startIndex, jsDocLineSpaceToRemove);
                    if(nonSpaceIndex != -1) {
                        jsDocSpacesRemoved = nonSpaceIndex - startIndex;
                    } else {
                        return null;
                    }
                }
                return {
                    minChar: nonSpaceIndex,
                    limChar: line.charAt(line.length - 1) == "\r" ? line.length - 1 : line.length,
                    jsDocSpacesRemoved: jsDocSpacesRemoved
                };
            }
            return null;
        }
        Comment.cleanJSDocComment = function cleanJSDocComment(content, spacesToRemove) {
            var docCommentLines = [];
            content = content.replace("/**", "");
            if(content.length >= 2 && content.charAt(content.length - 1) == "/" && content.charAt(content.length - 2) == "*") {
                content = content.substring(0, content.length - 2);
            }
            var lines = content.split("\n");
            var inParamTag = false;
            for(var l = 0; l < lines.length; l++) {
                var line = lines[l];
                var cleanLinePos = Comment.cleanDocCommentLine(line, true, spacesToRemove);
                if(!cleanLinePos) {
                    continue;
                }
                var docCommentText = "";
                var prevPos = cleanLinePos.minChar;
                for(var i = line.indexOf("@", cleanLinePos.minChar); 0 <= i && i < cleanLinePos.limChar; i = line.indexOf("@", i + 1)) {
                    var wasInParamtag = inParamTag;
                    if(line.indexOf("param", i + 1) == i + 1 && Comment.isSpaceChar(line, i + 6)) {
                        if(!wasInParamtag) {
                            docCommentText += line.substring(prevPos, i);
                        }
                        prevPos = i;
                        inParamTag = true;
                    } else {
                        if(wasInParamtag) {
                            prevPos = i;
                            inParamTag = false;
                        }
                    }
                }
                if(!inParamTag) {
                    docCommentText += line.substring(prevPos, cleanLinePos.limChar);
                }
                var newCleanPos = Comment.cleanDocCommentLine(docCommentText, false);
                if(newCleanPos) {
                    if(spacesToRemove == undefined) {
                        spacesToRemove = cleanLinePos.jsDocSpacesRemoved;
                    }
                    docCommentLines.push(docCommentText);
                }
            }
            return docCommentLines.join("\n");
        }
        Comment.getDocCommentText = function getDocCommentText(comments) {
            var docCommentText = [];
            for(var c = 0; c < comments.length; c++) {
                var commentText = comments[c].getDocCommentText();
                if(commentText != "") {
                    docCommentText.push(commentText);
                }
            }
            return docCommentText.join("\n");
        }
        Comment.getParameterDocCommentText = function getParameterDocCommentText(param, fncDocComments) {
            if(fncDocComments.length == 0 || !fncDocComments[0].isBlockComment) {
                return "";
            }
            for(var i = 0; i < fncDocComments.length; i++) {
                var commentContents = fncDocComments[i].content;
                for(var j = commentContents.indexOf("@param", 0); 0 <= j; j = commentContents.indexOf("@param", j)) {
                    j += 6;
                    if(!Comment.isSpaceChar(commentContents, j)) {
                        continue;
                    }
                    j = Comment.consumeLeadingSpace(commentContents, j);
                    if(j == -1) {
                        break;
                    }
                    if(commentContents.charCodeAt(j) == TypeScript.LexCodeLC) {
                        j++;
                        var charCode = 0;
                        for(var curlies = 1; j < commentContents.length; j++) {
                            charCode = commentContents.charCodeAt(j);
                            if(charCode == TypeScript.LexCodeLC) {
                                curlies++;
                                continue;
                            }
                            if(charCode == TypeScript.LexCodeRC) {
                                curlies--;
                                if(curlies == 0) {
                                    break;
                                } else {
                                    continue;
                                }
                            }
                            if(charCode == TypeScript.LexCodeAtSign) {
                                break;
                            }
                        }
                        if(j == commentContents.length) {
                            break;
                        }
                        if(charCode == TypeScript.LexCodeAtSign) {
                            continue;
                        }
                        j = Comment.consumeLeadingSpace(commentContents, j + 1);
                        if(j == -1) {
                            break;
                        }
                    }
                    if(param != commentContents.substr(j, param.length) || !Comment.isSpaceChar(commentContents, j + param.length)) {
                        continue;
                    }
                    j = Comment.consumeLeadingSpace(commentContents, j + param.length);
                    if(j == -1) {
                        return "";
                    }
                    var endOfParam = commentContents.indexOf("@", j);
                    var paramHelpString = commentContents.substring(j, endOfParam < 0 ? commentContents.length : endOfParam);
                    var paramSpacesToRemove = undefined;
                    var paramLineIndex = commentContents.substring(0, j).lastIndexOf("\n") + 1;
                    if(paramLineIndex != 0) {
                        if(paramLineIndex < j && commentContents.charAt(paramLineIndex + 1) == "\r") {
                            paramLineIndex++;
                        }
                    }
                    var startSpaceRemovalIndex = Comment.consumeLeadingSpace(commentContents, paramLineIndex);
                    if(startSpaceRemovalIndex != j && commentContents.charAt(startSpaceRemovalIndex) == "*") {
                        paramSpacesToRemove = j - startSpaceRemovalIndex - 1;
                    }
                    return Comment.cleanJSDocComment(paramHelpString, paramSpacesToRemove);
                }
            }
            return "";
        }
        Comment.getDocCommentTextOfSignatures = function getDocCommentTextOfSignatures(signatures) {
            var comments = [];
            for(var i = 0; i < signatures.length; i++) {
                var signatureDocComment = TypeScript.Comment.getDocCommentText(signatures[i].declAST.getDocComments());
                if(signatureDocComment != "") {
                    comments.push(signatureDocComment);
                }
            }
            return comments.join("\n");
        }
        return Comment;
    })(AST);
    TypeScript.Comment = Comment;    
    var DebuggerStatement = (function (_super) {
        __extends(DebuggerStatement, _super);
        function DebuggerStatement() {
                _super.call(this, TypeScript.NodeType.Debugger);
        }
        DebuggerStatement.prototype.emit = function (emitter, tokenId, startLine) {
            emitter.emitParensAndCommentsInPlace(this, true);
            emitter.recordSourceMappingStart(this);
            emitter.writeLineToOutput("debugger;");
            emitter.recordSourceMappingEnd(this);
            emitter.emitParensAndCommentsInPlace(this, false);
        };
        return DebuggerStatement;
    })(Statement);
    TypeScript.DebuggerStatement = DebuggerStatement;    
})(TypeScript || (TypeScript = {}));
var TypeScript;
(function (TypeScript) {
    var AstWalkOptions = (function () {
        function AstWalkOptions() {
            this.goChildren = true;
            this.goNextSibling = true;
            this.reverseSiblings = false;
        }
        AstWalkOptions.prototype.stopWalk = function (stop) {
            if (typeof stop === "undefined") { stop = true; }
            this.goChildren = !stop;
            this.goNextSibling = !stop;
        };
        return AstWalkOptions;
    })();
    TypeScript.AstWalkOptions = AstWalkOptions;    
    var AstWalker = (function () {
        function AstWalker(childrenWalkers, pre, post, options, state) {
            this.childrenWalkers = childrenWalkers;
            this.pre = pre;
            this.post = post;
            this.options = options;
            this.state = state;
        }
        AstWalker.prototype.walk = function (ast, parent) {
            var preAst = this.pre(ast, parent, this);
            if(preAst === undefined) {
                preAst = ast;
            }
            if(this.options.goChildren) {
                var svGoSib = this.options.goNextSibling;
                this.options.goNextSibling = true;
                this.childrenWalkers[ast.nodeType](ast, parent, this);
                this.options.goNextSibling = svGoSib;
            } else {
                this.options.goChildren = true;
            }
            if(this.post) {
                var postAst = this.post(preAst, parent, this);
                if(postAst === undefined) {
                    postAst = preAst;
                }
                return postAst;
            } else {
                return preAst;
            }
        };
        return AstWalker;
    })();    
    var AstWalkerFactory = (function () {
        function AstWalkerFactory() {
            this.childrenWalkers = [];
            this.initChildrenWalkers();
        }
        AstWalkerFactory.prototype.walk = function (ast, pre, post, options, state) {
            return this.getWalker(pre, post, options, state).walk(ast, null);
        };
        AstWalkerFactory.prototype.getWalker = function (pre, post, options, state) {
            return this.getSlowWalker(pre, post, options, state);
        };
        AstWalkerFactory.prototype.getSlowWalker = function (pre, post, options, state) {
            if(!options) {
                options = new AstWalkOptions();
            }
            return new AstWalker(this.childrenWalkers, pre, post, options, state);
        };
        AstWalkerFactory.prototype.initChildrenWalkers = function () {
            this.childrenWalkers[TypeScript.NodeType.None] = ChildrenWalkers.walkNone;
            this.childrenWalkers[TypeScript.NodeType.Empty] = ChildrenWalkers.walkNone;
            this.childrenWalkers[TypeScript.NodeType.EmptyExpr] = ChildrenWalkers.walkNone;
            this.childrenWalkers[TypeScript.NodeType.True] = ChildrenWalkers.walkNone;
            this.childrenWalkers[TypeScript.NodeType.False] = ChildrenWalkers.walkNone;
            this.childrenWalkers[TypeScript.NodeType.This] = ChildrenWalkers.walkNone;
            this.childrenWalkers[TypeScript.NodeType.Super] = ChildrenWalkers.walkNone;
            this.childrenWalkers[TypeScript.NodeType.QString] = ChildrenWalkers.walkNone;
            this.childrenWalkers[TypeScript.NodeType.Regex] = ChildrenWalkers.walkNone;
            this.childrenWalkers[TypeScript.NodeType.Null] = ChildrenWalkers.walkNone;
            this.childrenWalkers[TypeScript.NodeType.ArrayLit] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.ObjectLit] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.Void] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.Comma] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.Pos] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.Neg] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.Delete] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.Await] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.In] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.Dot] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.From] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.Is] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.InstOf] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.Typeof] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.NumberLit] = ChildrenWalkers.walkNone;
            this.childrenWalkers[TypeScript.NodeType.Name] = ChildrenWalkers.walkNone;
            this.childrenWalkers[TypeScript.NodeType.TypeRef] = ChildrenWalkers.walkTypeReferenceChildren;
            this.childrenWalkers[TypeScript.NodeType.Index] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.Call] = ChildrenWalkers.walkCallExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.New] = ChildrenWalkers.walkCallExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.Asg] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.AsgAdd] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.AsgSub] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.AsgDiv] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.AsgMul] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.AsgMod] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.AsgAnd] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.AsgXor] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.AsgOr] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.AsgLsh] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.AsgRsh] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.AsgRs2] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.ConditionalExpression] = ChildrenWalkers.walkTrinaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.LogOr] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.LogAnd] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.Or] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.Xor] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.And] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.Eq] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.Ne] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.Eqv] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.NEqv] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.Lt] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.Le] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.Gt] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.Ge] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.Add] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.Sub] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.Mul] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.Div] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.Mod] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.Lsh] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.Rsh] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.Rs2] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.Not] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.LogNot] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.IncPre] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.DecPre] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.IncPost] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.DecPost] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.TypeAssertion] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.FuncDecl] = ChildrenWalkers.walkFuncDeclChildren;
            this.childrenWalkers[TypeScript.NodeType.Member] = ChildrenWalkers.walkBinaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.VarDecl] = ChildrenWalkers.walkBoundDeclChildren;
            this.childrenWalkers[TypeScript.NodeType.ArgDecl] = ChildrenWalkers.walkBoundDeclChildren;
            this.childrenWalkers[TypeScript.NodeType.Return] = ChildrenWalkers.walkReturnStatementChildren;
            this.childrenWalkers[TypeScript.NodeType.Break] = ChildrenWalkers.walkNone;
            this.childrenWalkers[TypeScript.NodeType.Continue] = ChildrenWalkers.walkNone;
            this.childrenWalkers[TypeScript.NodeType.Throw] = ChildrenWalkers.walkUnaryExpressionChildren;
            this.childrenWalkers[TypeScript.NodeType.For] = ChildrenWalkers.walkForStatementChildren;
            this.childrenWalkers[TypeScript.NodeType.ForIn] = ChildrenWalkers.walkForInStatementChildren;
            this.childrenWalkers[TypeScript.NodeType.If] = ChildrenWalkers.walkIfStatementChildren;
            this.childrenWalkers[TypeScript.NodeType.While] = ChildrenWalkers.walkWhileStatementChildren;
            this.childrenWalkers[TypeScript.NodeType.DoWhile] = ChildrenWalkers.walkDoWhileStatementChildren;
            this.childrenWalkers[TypeScript.NodeType.Block] = ChildrenWalkers.walkBlockChildren;
            this.childrenWalkers[TypeScript.NodeType.Case] = ChildrenWalkers.walkCaseStatementChildren;
            this.childrenWalkers[TypeScript.NodeType.Switch] = ChildrenWalkers.walkSwitchStatementChildren;
            this.childrenWalkers[TypeScript.NodeType.Try] = ChildrenWalkers.walkTryChildren;
            this.childrenWalkers[TypeScript.NodeType.TryCatch] = ChildrenWalkers.walkTryCatchChildren;
            this.childrenWalkers[TypeScript.NodeType.TryFinally] = ChildrenWalkers.walkTryFinallyChildren;
            this.childrenWalkers[TypeScript.NodeType.Finally] = ChildrenWalkers.walkFinallyChildren;
            this.childrenWalkers[TypeScript.NodeType.Catch] = ChildrenWalkers.walkCatchChildren;
            this.childrenWalkers[TypeScript.NodeType.List] = ChildrenWalkers.walkListChildren;
            this.childrenWalkers[TypeScript.NodeType.Script] = ChildrenWalkers.walkScriptChildren;
            this.childrenWalkers[TypeScript.NodeType.ClassDeclaration] = ChildrenWalkers.walkClassDeclChildren;
            this.childrenWalkers[TypeScript.NodeType.InterfaceDeclaration] = ChildrenWalkers.walkTypeDeclChildren;
            this.childrenWalkers[TypeScript.NodeType.ModuleDeclaration] = ChildrenWalkers.walkModuleDeclChildren;
            this.childrenWalkers[TypeScript.NodeType.ImportDeclaration] = ChildrenWalkers.walkImportDeclChildren;
            this.childrenWalkers[TypeScript.NodeType.With] = ChildrenWalkers.walkWithStatementChildren;
            this.childrenWalkers[TypeScript.NodeType.Label] = ChildrenWalkers.walkLabelChildren;
            this.childrenWalkers[TypeScript.NodeType.LabeledStatement] = ChildrenWalkers.walkLabeledStatementChildren;
            this.childrenWalkers[TypeScript.NodeType.EBStart] = ChildrenWalkers.walkNone;
            this.childrenWalkers[TypeScript.NodeType.GotoEB] = ChildrenWalkers.walkNone;
            this.childrenWalkers[TypeScript.NodeType.EndCode] = ChildrenWalkers.walkNone;
            this.childrenWalkers[TypeScript.NodeType.Error] = ChildrenWalkers.walkNone;
            this.childrenWalkers[TypeScript.NodeType.Comment] = ChildrenWalkers.walkNone;
            this.childrenWalkers[TypeScript.NodeType.Debugger] = ChildrenWalkers.walkNone;
            for(var e in (TypeScript.NodeType)._map) {
                if((this.childrenWalkers)[e] === undefined) {
                    throw new Error("initWalkers function is not up to date with enum content!");
                }
            }
        };
        return AstWalkerFactory;
    })();
    TypeScript.AstWalkerFactory = AstWalkerFactory;    
    var globalAstWalkerFactory;
    function getAstWalkerFactory() {
        if(!globalAstWalkerFactory) {
            globalAstWalkerFactory = new AstWalkerFactory();
        }
        return globalAstWalkerFactory;
    }
    TypeScript.getAstWalkerFactory = getAstWalkerFactory;
    var ChildrenWalkers;
    (function (ChildrenWalkers) {
        function walkNone(preAst, parent, walker) {
        }
        ChildrenWalkers.walkNone = walkNone;
        function walkListChildren(preAst, parent, walker) {
            var len = preAst.members.length;
            if(walker.options.reverseSiblings) {
                for(var i = len - 1; i >= 0; i--) {
                    if(walker.options.goNextSibling) {
                        preAst.members[i] = walker.walk(preAst.members[i], preAst);
                    }
                }
            } else {
                for(var i = 0; i < len; i++) {
                    if(walker.options.goNextSibling) {
                        preAst.members[i] = walker.walk(preAst.members[i], preAst);
                    }
                }
            }
        }
        ChildrenWalkers.walkListChildren = walkListChildren;
        function walkUnaryExpressionChildren(preAst, parent, walker) {
            if(preAst.castTerm) {
                preAst.castTerm = walker.walk(preAst.castTerm, preAst);
            }
            if(preAst.operand) {
                preAst.operand = walker.walk(preAst.operand, preAst);
            }
        }
        ChildrenWalkers.walkUnaryExpressionChildren = walkUnaryExpressionChildren;
        function walkBinaryExpressionChildren(preAst, parent, walker) {
            if(walker.options.reverseSiblings) {
                if(preAst.operand2) {
                    preAst.operand2 = walker.walk(preAst.operand2, preAst);
                }
                if((preAst.operand1) && (walker.options.goNextSibling)) {
                    preAst.operand1 = walker.walk(preAst.operand1, preAst);
                }
            } else {
                if(preAst.operand1) {
                    preAst.operand1 = walker.walk(preAst.operand1, preAst);
                }
                if((preAst.operand2) && (walker.options.goNextSibling)) {
                    preAst.operand2 = walker.walk(preAst.operand2, preAst);
                }
            }
        }
        ChildrenWalkers.walkBinaryExpressionChildren = walkBinaryExpressionChildren;
        function walkTypeReferenceChildren(preAst, parent, walker) {
            if(preAst.term) {
                preAst.term = walker.walk(preAst.term, preAst);
            }
        }
        ChildrenWalkers.walkTypeReferenceChildren = walkTypeReferenceChildren;
        function walkCallExpressionChildren(preAst, parent, walker) {
            if(!walker.options.reverseSiblings) {
                preAst.target = walker.walk(preAst.target, preAst);
            }
            if(preAst.arguments && (walker.options.goNextSibling)) {
                preAst.arguments = walker.walk(preAst.arguments, preAst);
            }
            if((walker.options.reverseSiblings) && (walker.options.goNextSibling)) {
                preAst.target = walker.walk(preAst.target, preAst);
            }
        }
        ChildrenWalkers.walkCallExpressionChildren = walkCallExpressionChildren;
        function walkTrinaryExpressionChildren(preAst, parent, walker) {
            if(preAst.operand1) {
                preAst.operand1 = walker.walk(preAst.operand1, preAst);
            }
            if(preAst.operand2 && (walker.options.goNextSibling)) {
                preAst.operand2 = walker.walk(preAst.operand2, preAst);
            }
            if(preAst.operand3 && (walker.options.goNextSibling)) {
                preAst.operand3 = walker.walk(preAst.operand3, preAst);
            }
        }
        ChildrenWalkers.walkTrinaryExpressionChildren = walkTrinaryExpressionChildren;
        function walkFuncDeclChildren(preAst, parent, walker) {
            if(preAst.name) {
                preAst.name = walker.walk(preAst.name, preAst);
            }
            if(preAst.arguments && (preAst.arguments.members.length > 0) && (walker.options.goNextSibling)) {
                preAst.arguments = walker.walk(preAst.arguments, preAst);
            }
            if(preAst.returnTypeAnnotation && (walker.options.goNextSibling)) {
                preAst.returnTypeAnnotation = walker.walk(preAst.returnTypeAnnotation, preAst);
            }
            if(preAst.bod && (preAst.bod.members.length > 0) && (walker.options.goNextSibling)) {
                preAst.bod = walker.walk(preAst.bod, preAst);
            }
        }
        ChildrenWalkers.walkFuncDeclChildren = walkFuncDeclChildren;
        function walkBoundDeclChildren(preAst, parent, walker) {
            if(preAst.id) {
                preAst.id = walker.walk(preAst.id, preAst);
            }
            if(preAst.init) {
                preAst.init = walker.walk(preAst.init, preAst);
            }
            if((preAst.typeExpr) && (walker.options.goNextSibling)) {
                preAst.typeExpr = walker.walk(preAst.typeExpr, preAst);
            }
        }
        ChildrenWalkers.walkBoundDeclChildren = walkBoundDeclChildren;
        function walkReturnStatementChildren(preAst, parent, walker) {
            if(preAst.returnExpression) {
                preAst.returnExpression = walker.walk(preAst.returnExpression, preAst);
            }
        }
        ChildrenWalkers.walkReturnStatementChildren = walkReturnStatementChildren;
        function walkForStatementChildren(preAst, parent, walker) {
            if(preAst.init) {
                preAst.init = walker.walk(preAst.init, preAst);
            }
            if(preAst.cond && walker.options.goNextSibling) {
                preAst.cond = walker.walk(preAst.cond, preAst);
            }
            if(preAst.incr && walker.options.goNextSibling) {
                preAst.incr = walker.walk(preAst.incr, preAst);
            }
            if(preAst.body && walker.options.goNextSibling) {
                preAst.body = walker.walk(preAst.body, preAst);
            }
        }
        ChildrenWalkers.walkForStatementChildren = walkForStatementChildren;
        function walkForInStatementChildren(preAst, parent, walker) {
            preAst.lval = walker.walk(preAst.lval, preAst);
            if(walker.options.goNextSibling) {
                preAst.obj = walker.walk(preAst.obj, preAst);
            }
            if(preAst.body && (walker.options.goNextSibling)) {
                preAst.body = walker.walk(preAst.body, preAst);
            }
        }
        ChildrenWalkers.walkForInStatementChildren = walkForInStatementChildren;
        function walkIfStatementChildren(preAst, parent, walker) {
            preAst.cond = walker.walk(preAst.cond, preAst);
            if(preAst.thenBod && (walker.options.goNextSibling)) {
                preAst.thenBod = walker.walk(preAst.thenBod, preAst);
            }
            if(preAst.elseBod && (walker.options.goNextSibling)) {
                preAst.elseBod = walker.walk(preAst.elseBod, preAst);
            }
        }
        ChildrenWalkers.walkIfStatementChildren = walkIfStatementChildren;
        function walkWhileStatementChildren(preAst, parent, walker) {
            preAst.cond = walker.walk(preAst.cond, preAst);
            if(preAst.body && (walker.options.goNextSibling)) {
                preAst.body = walker.walk(preAst.body, preAst);
            }
        }
        ChildrenWalkers.walkWhileStatementChildren = walkWhileStatementChildren;
        function walkDoWhileStatementChildren(preAst, parent, walker) {
            preAst.cond = walker.walk(preAst.cond, preAst);
            if(preAst.body && (walker.options.goNextSibling)) {
                preAst.body = walker.walk(preAst.body, preAst);
            }
        }
        ChildrenWalkers.walkDoWhileStatementChildren = walkDoWhileStatementChildren;
        function walkBlockChildren(preAst, parent, walker) {
            if(preAst.statements) {
                preAst.statements = walker.walk(preAst.statements, preAst);
            }
        }
        ChildrenWalkers.walkBlockChildren = walkBlockChildren;
        function walkCaseStatementChildren(preAst, parent, walker) {
            if(preAst.expr) {
                preAst.expr = walker.walk(preAst.expr, preAst);
            }
            if(preAst.body && walker.options.goNextSibling) {
                preAst.body = walker.walk(preAst.body, preAst);
            }
        }
        ChildrenWalkers.walkCaseStatementChildren = walkCaseStatementChildren;
        function walkSwitchStatementChildren(preAst, parent, walker) {
            if(preAst.val) {
                preAst.val = walker.walk(preAst.val, preAst);
            }
            if((preAst.caseList) && walker.options.goNextSibling) {
                preAst.caseList = walker.walk(preAst.caseList, preAst);
            }
        }
        ChildrenWalkers.walkSwitchStatementChildren = walkSwitchStatementChildren;
        function walkTryChildren(preAst, parent, walker) {
            if(preAst.body) {
                preAst.body = walker.walk(preAst.body, preAst);
            }
        }
        ChildrenWalkers.walkTryChildren = walkTryChildren;
        function walkTryCatchChildren(preAst, parent, walker) {
            if(preAst.tryNode) {
                preAst.tryNode = walker.walk(preAst.tryNode, preAst);
            }
            if((preAst.catchNode) && walker.options.goNextSibling) {
                preAst.catchNode = walker.walk(preAst.catchNode, preAst);
            }
        }
        ChildrenWalkers.walkTryCatchChildren = walkTryCatchChildren;
        function walkTryFinallyChildren(preAst, parent, walker) {
            if(preAst.tryNode) {
                preAst.tryNode = walker.walk(preAst.tryNode, preAst);
            }
            if(preAst.finallyNode && walker.options.goNextSibling) {
                preAst.finallyNode = walker.walk(preAst.finallyNode, preAst);
            }
        }
        ChildrenWalkers.walkTryFinallyChildren = walkTryFinallyChildren;
        function walkFinallyChildren(preAst, parent, walker) {
            if(preAst.body) {
                preAst.body = walker.walk(preAst.body, preAst);
            }
        }
        ChildrenWalkers.walkFinallyChildren = walkFinallyChildren;
        function walkCatchChildren(preAst, parent, walker) {
            if(preAst.param) {
                preAst.param = walker.walk(preAst.param, preAst);
            }
            if((preAst.body) && walker.options.goNextSibling) {
                preAst.body = walker.walk(preAst.body, preAst);
            }
        }
        ChildrenWalkers.walkCatchChildren = walkCatchChildren;
        function walkRecordChildren(preAst, parent, walker) {
            preAst.name = walker.walk(preAst.name, preAst);
            if(walker.options.goNextSibling && preAst.members) {
                preAst.members = walker.walk(preAst.members, preAst);
            }
        }
        ChildrenWalkers.walkRecordChildren = walkRecordChildren;
        function walkNamedTypeChildren(preAst, parent, walker) {
            walkRecordChildren(preAst, parent, walker);
        }
        ChildrenWalkers.walkNamedTypeChildren = walkNamedTypeChildren;
        function walkClassDeclChildren(preAst, parent, walker) {
            walkNamedTypeChildren(preAst, parent, walker);
            if(walker.options.goNextSibling && preAst.extendsList) {
                preAst.extendsList = walker.walk(preAst.extendsList, preAst);
            }
            if(walker.options.goNextSibling && preAst.implementsList) {
                preAst.implementsList = walker.walk(preAst.implementsList, preAst);
            }
        }
        ChildrenWalkers.walkClassDeclChildren = walkClassDeclChildren;
        function walkScriptChildren(preAst, parent, walker) {
            if(preAst.bod) {
                preAst.bod = walker.walk(preAst.bod, preAst);
            }
        }
        ChildrenWalkers.walkScriptChildren = walkScriptChildren;
        function walkTypeDeclChildren(preAst, parent, walker) {
            walkNamedTypeChildren(preAst, parent, walker);
            if(walker.options.goNextSibling && preAst.extendsList) {
                preAst.extendsList = walker.walk(preAst.extendsList, preAst);
            }
            if(walker.options.goNextSibling && preAst.implementsList) {
                preAst.implementsList = walker.walk(preAst.implementsList, preAst);
            }
        }
        ChildrenWalkers.walkTypeDeclChildren = walkTypeDeclChildren;
        function walkModuleDeclChildren(preAst, parent, walker) {
            walkRecordChildren(preAst, parent, walker);
        }
        ChildrenWalkers.walkModuleDeclChildren = walkModuleDeclChildren;
        function walkImportDeclChildren(preAst, parent, walker) {
            if(preAst.id) {
                preAst.id = walker.walk(preAst.id, preAst);
            }
            if(preAst.alias) {
                preAst.alias = walker.walk(preAst.alias, preAst);
            }
        }
        ChildrenWalkers.walkImportDeclChildren = walkImportDeclChildren;
        function walkWithStatementChildren(preAst, parent, walker) {
            if(preAst.expr) {
                preAst.expr = walker.walk(preAst.expr, preAst);
            }
            if(preAst.body && walker.options.goNextSibling) {
                preAst.body = walker.walk(preAst.body, preAst);
            }
        }
        ChildrenWalkers.walkWithStatementChildren = walkWithStatementChildren;
        function walkLabelChildren(preAst, parent, walker) {
        }
        ChildrenWalkers.walkLabelChildren = walkLabelChildren;
        function walkLabeledStatementChildren(preAst, parent, walker) {
            preAst.labels = walker.walk(preAst.labels, preAst);
            if(walker.options.goNextSibling) {
                preAst.stmt = walker.walk(preAst.stmt, preAst);
            }
        }
        ChildrenWalkers.walkLabeledStatementChildren = walkLabeledStatementChildren;
    })(ChildrenWalkers || (ChildrenWalkers = {}));
})(TypeScript || (TypeScript = {}));
var TypeScript;
(function (TypeScript) {
    (function (AstWalkerWithDetailCallback) {
        function walk(script, callback) {
            var pre = function (cur, parent) {
                walker.options.goChildren = AstWalkerCallback(true, cur, callback);
                return cur;
            };
            var post = function (cur, parent) {
                AstWalkerCallback(false, cur, callback);
                return cur;
            };
            var walker = TypeScript.getAstWalkerFactory().getWalker(pre, post);
            walker.walk(script, null);
        }
        AstWalkerWithDetailCallback.walk = walk;
        function AstWalkerCallback(pre, ast, callback) {
            var nodeType = ast.nodeType;
            var callbackString = (TypeScript.NodeType)._map[nodeType] + "Callback";
            if(callback[callbackString]) {
                return callback[callbackString](pre, ast);
            }
            if(callback.DefaultCallback) {
                return callback.DefaultCallback(pre, ast);
            }
            return true;
        }
    })(TypeScript.AstWalkerWithDetailCallback || (TypeScript.AstWalkerWithDetailCallback = {}));
    var AstWalkerWithDetailCallback = TypeScript.AstWalkerWithDetailCallback;
})(TypeScript || (TypeScript = {}));
var TypeScript;
(function (TypeScript) {
    function lastOf(items) {
        return (items === null || items.length === 0) ? null : items[items.length - 1];
    }
    TypeScript.lastOf = lastOf;
    function max(a, b) {
        return a >= b ? a : b;
    }
    TypeScript.max = max;
    function min(a, b) {
        return a <= b ? a : b;
    }
    TypeScript.min = min;
    var AstPath = (function () {
        function AstPath() {
            this.asts = [];
            this.top = -1;
        }
        AstPath.reverseIndexOf = function reverseIndexOf(items, index) {
            return (items === null || items.length <= index) ? null : items[items.length - index - 1];
        }
        AstPath.prototype.clone = function () {
            var clone = new AstPath();
            clone.asts = this.asts.map(function (value) {
                return value;
            });
            clone.top = this.top;
            return clone;
        };
        AstPath.prototype.pop = function () {
            var head = this.ast();
            this.up();
            while(this.asts.length > this.count()) {
                this.asts.pop();
            }
            return head;
        };
        AstPath.prototype.push = function (ast) {
            while(this.asts.length > this.count()) {
                this.asts.pop();
            }
            this.top = this.asts.length;
            this.asts.push(ast);
        };
        AstPath.prototype.up = function () {
            if(this.top <= -1) {
                throw new Error("Invalid call to 'up'");
            }
            this.top--;
        };
        AstPath.prototype.down = function () {
            if(this.top == this.ast.length - 1) {
                throw new Error("Invalid call to 'down'");
            }
            this.top++;
        };
        AstPath.prototype.nodeType = function () {
            if(this.ast() == null) {
                return TypeScript.NodeType.None;
            }
            return this.ast().nodeType;
        };
        AstPath.prototype.ast = function () {
            return AstPath.reverseIndexOf(this.asts, this.asts.length - (this.top + 1));
        };
        AstPath.prototype.parent = function () {
            return AstPath.reverseIndexOf(this.asts, this.asts.length - this.top);
        };
        AstPath.prototype.count = function () {
            return this.top + 1;
        };
        AstPath.prototype.get = function (index) {
            return this.asts[index];
        };
        AstPath.prototype.isNameOfClass = function () {
            if(this.ast() === null || this.parent() === null) {
                return false;
            }
            return (this.ast().nodeType === TypeScript.NodeType.Name) && (this.parent().nodeType === TypeScript.NodeType.ClassDeclaration) && ((this.parent()).name === this.ast());
        };
        AstPath.prototype.isNameOfInterface = function () {
            if(this.ast() === null || this.parent() === null) {
                return false;
            }
            return (this.ast().nodeType === TypeScript.NodeType.Name) && (this.parent().nodeType === TypeScript.NodeType.InterfaceDeclaration) && ((this.parent()).name === this.ast());
        };
        AstPath.prototype.isNameOfArgument = function () {
            if(this.ast() === null || this.parent() === null) {
                return false;
            }
            return (this.ast().nodeType === TypeScript.NodeType.Name) && (this.parent().nodeType === TypeScript.NodeType.ArgDecl) && ((this.parent()).id === this.ast());
        };
        AstPath.prototype.isNameOfVariable = function () {
            if(this.ast() === null || this.parent() === null) {
                return false;
            }
            return (this.ast().nodeType === TypeScript.NodeType.Name) && (this.parent().nodeType === TypeScript.NodeType.VarDecl) && ((this.parent()).id === this.ast());
        };
        AstPath.prototype.isNameOfModule = function () {
            if(this.ast() === null || this.parent() === null) {
                return false;
            }
            return (this.ast().nodeType === TypeScript.NodeType.Name) && (this.parent().nodeType === TypeScript.NodeType.ModuleDeclaration) && ((this.parent()).name === this.ast());
        };
        AstPath.prototype.isNameOfFunction = function () {
            if(this.ast() === null || this.parent() === null) {
                return false;
            }
            return (this.ast().nodeType === TypeScript.NodeType.Name) && (this.parent().nodeType === TypeScript.NodeType.FuncDecl) && ((this.parent()).name === this.ast());
        };
        AstPath.prototype.isChildOfScript = function () {
            var ast = lastOf(this.asts);
            return this.count() >= 3 && this.asts[this.top] === ast && this.asts[this.top - 1].nodeType === TypeScript.NodeType.List && this.asts[this.top - 2].nodeType === TypeScript.NodeType.Script;
        };
        AstPath.prototype.isChildOfModule = function () {
            var ast = lastOf(this.asts);
            return this.count() >= 3 && this.asts[this.top] === ast && this.asts[this.top - 1].nodeType === TypeScript.NodeType.List && this.asts[this.top - 2].nodeType === TypeScript.NodeType.ModuleDeclaration;
        };
        AstPath.prototype.isChildOfClass = function () {
            var ast = lastOf(this.asts);
            return this.count() >= 3 && this.asts[this.top] === ast && this.asts[this.top - 1].nodeType === TypeScript.NodeType.List && this.asts[this.top - 2].nodeType === TypeScript.NodeType.ClassDeclaration;
        };
        AstPath.prototype.isArgumentOfClassConstructor = function () {
            var ast = lastOf(this.asts);
            return this.count() >= 5 && this.asts[this.top] === ast && this.asts[this.top - 1].nodeType === TypeScript.NodeType.List && this.asts[this.top - 2].nodeType === TypeScript.NodeType.FuncDecl && this.asts[this.top - 3].nodeType === TypeScript.NodeType.List && this.asts[this.top - 4].nodeType === TypeScript.NodeType.ClassDeclaration && ((this.asts[this.top - 2]).isConstructor) && ((this.asts[this.top - 2]).arguments === this.asts[this.top - 1]) && ((this.asts[this.top - 4]).constructorDecl === this.asts[this.top - 2]);
        };
        AstPath.prototype.isChildOfInterface = function () {
            var ast = lastOf(this.asts);
            return this.count() >= 3 && this.asts[this.top] === ast && this.asts[this.top - 1].nodeType === TypeScript.NodeType.List && this.asts[this.top - 2].nodeType === TypeScript.NodeType.InterfaceDeclaration;
        };
        AstPath.prototype.isTopLevelImplicitModule = function () {
            return this.count() >= 1 && this.asts[this.top].nodeType === TypeScript.NodeType.ModuleDeclaration && TypeScript.hasFlag((this.asts[this.top]).modFlags, TypeScript.ModuleFlags.IsWholeFile);
        };
        AstPath.prototype.isBodyOfTopLevelImplicitModule = function () {
            return this.count() >= 2 && this.asts[this.top - 0].nodeType === TypeScript.NodeType.List && this.asts[this.top - 1].nodeType === TypeScript.NodeType.ModuleDeclaration && (this.asts[this.top - 1]).members == this.asts[this.top - 0] && TypeScript.hasFlag((this.asts[this.top - 1]).modFlags, TypeScript.ModuleFlags.IsWholeFile);
        };
        AstPath.prototype.isBodyOfScript = function () {
            return this.count() >= 2 && this.asts[this.top - 1].nodeType === TypeScript.NodeType.Script && (this.asts[this.top - 1]).bod == this.asts[this.top - 0];
        };
        AstPath.prototype.isBodyOfSwitch = function () {
            return this.count() >= 2 && this.asts[this.top - 1].nodeType === TypeScript.NodeType.Switch && (this.asts[this.top - 1]).caseList == this.asts[this.top - 0];
        };
        AstPath.prototype.isBodyOfModule = function () {
            return this.count() >= 2 && this.asts[this.top - 1].nodeType === TypeScript.NodeType.ModuleDeclaration && (this.asts[this.top - 1]).members == this.asts[this.top - 0];
        };
        AstPath.prototype.isBodyOfClass = function () {
            return this.count() >= 2 && this.asts[this.top - 1].nodeType === TypeScript.NodeType.ClassDeclaration && (this.asts[this.top - 1]).members == this.asts[this.top - 0];
        };
        AstPath.prototype.isBodyOfFunction = function () {
            return this.count() >= 2 && this.asts[this.top - 1].nodeType === TypeScript.NodeType.FuncDecl && (this.asts[this.top - 1]).bod == this.asts[this.top - 0];
        };
        AstPath.prototype.isBodyOfInterface = function () {
            return this.count() >= 2 && this.asts[this.top - 1].nodeType === TypeScript.NodeType.InterfaceDeclaration && (this.asts[this.top - 1]).members == this.asts[this.top - 0];
        };
        AstPath.prototype.isBodyOfBlock = function () {
            return this.count() >= 2 && this.asts[this.top - 1].nodeType === TypeScript.NodeType.Block && (this.asts[this.top - 1]).statements == this.asts[this.top - 0];
        };
        AstPath.prototype.isBodyOfFor = function () {
            return this.count() >= 2 && this.asts[this.top - 1].nodeType === TypeScript.NodeType.For && (this.asts[this.top - 1]).body == this.asts[this.top - 0];
        };
        AstPath.prototype.isBodyOfCase = function () {
            return this.count() >= 2 && this.asts[this.top - 1].nodeType === TypeScript.NodeType.Case && (this.asts[this.top - 1]).body == this.asts[this.top - 0];
        };
        AstPath.prototype.isBodyOfTry = function () {
            return this.count() >= 2 && this.asts[this.top - 1].nodeType === TypeScript.NodeType.Try && (this.asts[this.top - 1]).body == this.asts[this.top - 0];
        };
        AstPath.prototype.isBodyOfCatch = function () {
            return this.count() >= 2 && this.asts[this.top - 1].nodeType === TypeScript.NodeType.Catch && (this.asts[this.top - 1]).body == this.asts[this.top - 0];
        };
        AstPath.prototype.isBodyOfDoWhile = function () {
            return this.count() >= 2 && this.asts[this.top - 1].nodeType === TypeScript.NodeType.DoWhile && (this.asts[this.top - 1]).body == this.asts[this.top - 0];
        };
        AstPath.prototype.isBodyOfWhile = function () {
            return this.count() >= 2 && this.asts[this.top - 1].nodeType === TypeScript.NodeType.While && (this.asts[this.top - 1]).body == this.asts[this.top - 0];
        };
        AstPath.prototype.isBodyOfForIn = function () {
            return this.count() >= 2 && this.asts[this.top - 1].nodeType === TypeScript.NodeType.ForIn && (this.asts[this.top - 1]).body == this.asts[this.top - 0];
        };
        AstPath.prototype.isBodyOfWith = function () {
            return this.count() >= 2 && this.asts[this.top - 1].nodeType === TypeScript.NodeType.With && (this.asts[this.top - 1]).body == this.asts[this.top - 0];
        };
        AstPath.prototype.isBodyOfFinally = function () {
            return this.count() >= 2 && this.asts[this.top - 1].nodeType === TypeScript.NodeType.Finally && (this.asts[this.top - 1]).body == this.asts[this.top - 0];
        };
        AstPath.prototype.isCaseOfSwitch = function () {
            return this.count() >= 3 && this.asts[this.top - 2].nodeType === TypeScript.NodeType.Switch && this.asts[this.top - 1].nodeType === TypeScript.NodeType.List && (this.asts[this.top - 2]).caseList == this.asts[this.top - 1];
        };
        AstPath.prototype.isDefaultCaseOfSwitch = function () {
            return this.count() >= 3 && this.asts[this.top - 2].nodeType === TypeScript.NodeType.Switch && this.asts[this.top - 1].nodeType === TypeScript.NodeType.List && (this.asts[this.top - 2]).caseList == this.asts[this.top - 1] && (this.asts[this.top - 2]).defaultCase == this.asts[this.top - 0];
        };
        AstPath.prototype.isListOfObjectLit = function () {
            return this.count() >= 2 && this.asts[this.top - 1].nodeType === TypeScript.NodeType.ObjectLit && this.asts[this.top - 0].nodeType === TypeScript.NodeType.List && (this.asts[this.top - 1]).operand == this.asts[this.top - 0];
        };
        AstPath.prototype.isBodyOfObjectLit = function () {
            return this.isListOfObjectLit();
        };
        AstPath.prototype.isEmptyListOfObjectLit = function () {
            return this.count() >= 2 && this.asts[this.top - 1].nodeType === TypeScript.NodeType.ObjectLit && this.asts[this.top - 0].nodeType === TypeScript.NodeType.List && (this.asts[this.top - 1]).operand == this.asts[this.top - 0] && (this.asts[this.top - 0]).members.length == 0;
        };
        AstPath.prototype.isMemberOfObjectLit = function () {
            return this.count() >= 3 && this.asts[this.top - 2].nodeType === TypeScript.NodeType.ObjectLit && this.asts[this.top - 1].nodeType === TypeScript.NodeType.List && this.asts[this.top - 0].nodeType === TypeScript.NodeType.Member && (this.asts[this.top - 2]).operand == this.asts[this.top - 1];
        };
        AstPath.prototype.isNameOfMemberOfObjectLit = function () {
            return this.count() >= 4 && this.asts[this.top - 3].nodeType === TypeScript.NodeType.ObjectLit && this.asts[this.top - 2].nodeType === TypeScript.NodeType.List && this.asts[this.top - 1].nodeType === TypeScript.NodeType.Member && this.asts[this.top - 0].nodeType === TypeScript.NodeType.Name && (this.asts[this.top - 3]).operand == this.asts[this.top - 2];
        };
        AstPath.prototype.isListOfArrayLit = function () {
            return this.count() >= 2 && this.asts[this.top - 1].nodeType === TypeScript.NodeType.ArrayLit && this.asts[this.top - 0].nodeType === TypeScript.NodeType.List && (this.asts[this.top - 1]).operand == this.asts[this.top - 0];
        };
        AstPath.prototype.isTargetOfMember = function () {
            return this.count() >= 2 && this.asts[this.top - 1].nodeType === TypeScript.NodeType.Member && (this.asts[this.top - 1]).operand1 === this.asts[this.top - 0];
        };
        AstPath.prototype.isMemberOfMember = function () {
            return this.count() >= 2 && this.asts[this.top - 1].nodeType === TypeScript.NodeType.Member && (this.asts[this.top - 1]).operand2 === this.asts[this.top - 0];
        };
        AstPath.prototype.isItemOfList = function () {
            return this.count() >= 2 && this.asts[this.top - 1].nodeType === TypeScript.NodeType.List;
        };
        AstPath.prototype.isThenOfIf = function () {
            return this.count() >= 2 && this.asts[this.top - 1].nodeType === TypeScript.NodeType.If && (this.asts[this.top - 1]).thenBod == this.asts[this.top - 0];
        };
        AstPath.prototype.isElseOfIf = function () {
            return this.count() >= 2 && this.asts[this.top - 1].nodeType === TypeScript.NodeType.If && (this.asts[this.top - 1]).elseBod == this.asts[this.top - 0];
        };
        AstPath.prototype.isBodyOfDefaultCase = function () {
            return this.isBodyOfCase();
        };
        AstPath.prototype.isSingleStatementList = function () {
            return this.count() >= 1 && this.asts[this.top].nodeType === TypeScript.NodeType.List && (this.asts[this.top]).members.length === 1;
        };
        AstPath.prototype.isArgumentListOfFunction = function () {
            return this.count() >= 2 && this.asts[this.top - 0].nodeType === TypeScript.NodeType.List && this.asts[this.top - 1].nodeType === TypeScript.NodeType.FuncDecl && (this.asts[this.top - 1]).arguments === this.asts[this.top - 0];
        };
        AstPath.prototype.isArgumentOfFunction = function () {
            return this.count() >= 3 && this.asts[this.top - 1].nodeType === TypeScript.NodeType.List && this.asts[this.top - 2].nodeType === TypeScript.NodeType.FuncDecl && (this.asts[this.top - 2]).arguments === this.asts[this.top - 1];
        };
        AstPath.prototype.isArgumentListOfCall = function () {
            return this.count() >= 2 && this.asts[this.top - 0].nodeType === TypeScript.NodeType.List && this.asts[this.top - 1].nodeType === TypeScript.NodeType.Call && (this.asts[this.top - 1]).arguments === this.asts[this.top - 0];
        };
        AstPath.prototype.isArgumentListOfNew = function () {
            return this.count() >= 2 && this.asts[this.top - 0].nodeType === TypeScript.NodeType.List && this.asts[this.top - 1].nodeType === TypeScript.NodeType.New && (this.asts[this.top - 1]).arguments === this.asts[this.top - 0];
        };
        AstPath.prototype.isSynthesizedBlock = function () {
            return this.count() >= 1 && this.asts[this.top - 0].nodeType === TypeScript.NodeType.Block && (this.asts[this.top - 0]).isStatementBlock === false;
        };
        return AstPath;
    })();
    TypeScript.AstPath = AstPath;    
    function isValidAstNode(ast) {
        if(ast === null) {
            return false;
        }
        if(ast.minChar === -1 || ast.limChar === -1) {
            return false;
        }
        return true;
    }
    TypeScript.isValidAstNode = isValidAstNode;
    var AstPathContext = (function () {
        function AstPathContext() {
            this.path = new TypeScript.AstPath();
        }
        return AstPathContext;
    })();
    TypeScript.AstPathContext = AstPathContext;    
    (function (GetAstPathOptions) {
        GetAstPathOptions._map = [];
        GetAstPathOptions.Default = 0;
        GetAstPathOptions.EdgeInclusive = 1;
        GetAstPathOptions.DontPruneSearchBasedOnPosition = 1 << 1;
    })(TypeScript.GetAstPathOptions || (TypeScript.GetAstPathOptions = {}));
    var GetAstPathOptions = TypeScript.GetAstPathOptions;
    function getAstPathToPosition(script, pos, options) {
        if (typeof options === "undefined") { options = GetAstPathOptions.Default; }
        var lookInComments = function (comments) {
            if(comments && comments.length > 0) {
                for(var i = 0; i < comments.length; i++) {
                    var minChar = comments[i].minChar;
                    var limChar = comments[i].limChar;
                    if(!comments[i].isBlockComment) {
                        limChar++;
                    }
                    if(pos >= minChar && pos < limChar) {
                        ctx.path.push(comments[i]);
                    }
                }
            }
        };
        var pre = function (cur, parent, walker) {
            if(isValidAstNode(cur)) {
                var inclusive = TypeScript.hasFlag(options, GetAstPathOptions.EdgeInclusive) || cur.nodeType === TypeScript.NodeType.Name || pos === script.limChar;
                var minChar = cur.minChar;
                var limChar = cur.limChar + (inclusive ? 1 : 0);
                if(pos >= minChar && pos < limChar) {
                    var previous = ctx.path.ast();
                    if(previous == null || (cur.minChar >= previous.minChar && cur.limChar <= previous.limChar)) {
                        ctx.path.push(cur);
                    } else {
                    }
                }
                if(pos < limChar) {
                    lookInComments(cur.preComments);
                }
                if(pos >= minChar) {
                    lookInComments(cur.postComments);
                }
                if(!TypeScript.hasFlag(options, GetAstPathOptions.DontPruneSearchBasedOnPosition)) {
                    walker.options.goChildren = (minChar <= pos && pos <= limChar);
                }
            }
            return cur;
        };
        var ctx = new AstPathContext();
        TypeScript.getAstWalkerFactory().walk(script, pre, null, null, ctx);
        return ctx.path;
    }
    TypeScript.getAstPathToPosition = getAstPathToPosition;
    function getTokenizationOffset(script, position) {
        var bestOffset = 0;
        var pre = function (cur, parent, walker) {
            if(TypeScript.isValidAstNode(cur)) {
                if(cur.minChar <= position) {
                    bestOffset = max(bestOffset, cur.minChar);
                }
                if(cur.minChar > position || cur.limChar < bestOffset) {
                    walker.options.goChildren = false;
                }
            }
            return cur;
        };
        TypeScript.getAstWalkerFactory().walk(script, pre);
        return bestOffset;
    }
    TypeScript.getTokenizationOffset = getTokenizationOffset;
    function walkAST(ast, callback) {
        var pre = function (cur, parent, walker) {
            var path = walker.state;
            path.push(cur);
            callback(path, walker);
            return cur;
        };
        var post = function (cur, parent, walker) {
            var path = walker.state;
            path.pop();
            return cur;
        };
        var path = new AstPath();
        TypeScript.getAstWalkerFactory().walk(ast, pre, post, null, path);
    }
    TypeScript.walkAST = walkAST;
})(TypeScript || (TypeScript = {}));
var TypeScript;
(function (TypeScript) {
    var AstLogger = (function () {
        function AstLogger(logger) {
            this.logger = logger;
        }
        AstLogger.prototype.logScript = function (script) {
            var _this = this;
            this.logLinemap(script.locationInfo.lineMap);
            var stack = [];
            var pre = function (cur, parent) {
                stack.push(cur);
                var indent = (stack.length - 1) * 2;
                _this.logComments(script, cur.preComments, indent);
                _this.logNode(script, cur, indent);
                _this.logComments(script, cur.postComments, indent);
                return cur;
            };
            var post = function (cur, parent) {
                stack.pop();
                return cur;
            };
            TypeScript.getAstWalkerFactory().walk(script, pre, post);
        };
        AstLogger.prototype.logNode = function (script, cur, indent) {
            var msg = this.addPadding("", indent, "| ", true);
            msg = msg.concat("+ " + cur.treeViewLabel());
            msg = this.addPadding(msg, 70, " ", false);
            msg = msg + this.addLineColumn(script, cur.minChar);
            msg = this.addPadding(msg, 80, " ", false);
            msg = msg + "=> ";
            msg = msg + this.addLineColumn(script, cur.limChar);
            msg = this.addPadding(msg, 102, " ", false);
            msg = msg.concat("[" + this.addPadding(cur.minChar.toString(), 1, " ", true) + ", " + this.addPadding(cur.limChar.toString(), 1, " ", true) + "]");
            msg = this.addPadding(msg, 115, " ", false);
            msg = msg.concat("sym=" + (cur).sym);
            msg = this.addPadding(msg, 135, " ", false);
            msg = msg.concat("type=" + (cur.type === null ? "null" : cur.type.getTypeName()));
            this.logger.log(msg);
        };
        AstLogger.prototype.logComments = function (script, comments, indent) {
            if(comments == null) {
                return;
            }
            for(var i = 0; i < comments.length; i++) {
                this.logNode(script, comments[i], indent);
            }
        };
        AstLogger.prototype.logLinemap = function (linemap) {
            var result = "[";
            for(var i = 0; i < linemap.length; i++) {
                if(i > 0) {
                    result += ",";
                }
                result += linemap[i];
            }
            result += "]";
            this.logger.log("linemap: " + result);
        };
        AstLogger.prototype.addPadding = function (s, targetLength, paddingString, leftPadding) {
            var result = (leftPadding ? "" : s);
            for(var i = s.length; i < targetLength; i++) {
                result = result + paddingString;
            }
            result = result + (leftPadding ? s : "");
            return result;
        };
        AstLogger.prototype.addLineColumn = function (script, position) {
            var lineInfo = {
                line: -1,
                col: -1
            };
            TypeScript.getSourceLineColFromMap(lineInfo, position, script.locationInfo.lineMap);
            if(lineInfo.col !== -1) {
                lineInfo.col++;
            }
            return "(" + lineInfo.line + ", " + lineInfo.col + ")";
        };
        return AstLogger;
    })();
    TypeScript.AstLogger = AstLogger;    
})(TypeScript || (TypeScript = {}));
var TypeScript;
(function (TypeScript) {
    var Binder = (function () {
        function Binder(checker) {
            this.checker = checker;
        }
        Binder.prototype.resolveBaseTypeLinks = function (typeLinks, scope) {
            var extendsList = null;
            if(typeLinks) {
                extendsList = new Array();
                for(var i = 0, len = typeLinks.length; i < len; i++) {
                    extendsList[i] = this.checker.resolveBaseTypeLink(typeLinks[i], scope);
                }
            }
            return extendsList;
        };
        Binder.prototype.resolveBases = function (scope, type) {
            type.extendsList = this.resolveBaseTypeLinks(type.extendsTypeLinks, scope);
            var i = 0, len = type.extendsList.length;
            var derivedIsClass = type.isClassInstance();
            for(; i < len; i++) {
                var baseIsClass = type.extendsList[i].isClassInstance();
                if(type.extendsList[i] != this.checker.anyType) {
                    var baseRef = type.extendsTypeLinks[i].ast;
                    if(derivedIsClass) {
                        if(!baseIsClass) {
                            this.checker.errorReporter.simpleError(baseRef, "A class may only extend other classes, " + type.extendsList[i].symbol.fullName() + " is not a class.");
                        }
                    } else {
                        if(baseIsClass) {
                            this.checker.errorReporter.simpleError(baseRef, "An interface may only extend other interfaces, " + type.extendsList[i].symbol.fullName() + " is a class.");
                        }
                    }
                }
            }
            type.implementsList = this.resolveBaseTypeLinks(type.implementsTypeLinks, scope);
            if(type.implementsList) {
                for(i = 0 , len = type.implementsList.length; i < len; i++) {
                    var iface = type.implementsList[i];
                    var baseRef = type.implementsTypeLinks[i].ast;
                    if(iface.isClassInstance()) {
                        if(derivedIsClass) {
                            this.checker.errorReporter.simpleError(baseRef, "A class may only implement an interface; " + iface.symbol.fullName() + " is a class.");
                        }
                    }
                }
            }
        };
        Binder.prototype.resolveSignatureGroup = function (signatureGroup, scope, instanceType) {
            var supplyVar = !(signatureGroup.hasImplementation);
            for(var i = 0, len = signatureGroup.signatures.length; i < len; i++) {
                var signature = signatureGroup.signatures[i];
                if(instanceType) {
                    signature.returnType.type = instanceType;
                } else {
                    this.checker.resolveTypeLink(scope, signature.returnType, supplyVar);
                }
                var paramLen = signature.parameters.length;
                for(var j = 0; j < paramLen; j++) {
                    this.bindSymbol(scope, signature.parameters[j]);
                }
                if(signature.hasVariableArgList) {
                    var lastParam = signature.parameters[paramLen - 1];
                    lastParam.argsOffset = paramLen - 1;
                    if(!lastParam.getType().isArray()) {
                        this.checker.errorReporter.simpleErrorFromSym(lastParam, "... parameter must have array type");
                        lastParam.parameter.typeLink.type = this.checker.makeArrayType(lastParam.parameter.typeLink.type);
                    }
                }
            }
        };
        Binder.prototype.bindType = function (scope, type, instanceType) {
            if(instanceType) {
                this.bindType(scope, instanceType, null);
            }
            if(type.hasMembers()) {
                var members = type.members;
                var ambientMembers = type.ambientMembers;
                var typeMembers = type.getAllEnclosedTypes();
                var ambientTypeMembers = type.getAllAmbientEnclosedTypes();
                var memberScope = new TypeScript.SymbolTableScope(members, ambientMembers, typeMembers, ambientTypeMembers, type.symbol);
                var agg = new TypeScript.SymbolAggregateScope(type.symbol);
                var prevCurrentModDecl = this.checker.currentModDecl;
                var prevBindStatus = this.checker.inBind;
                agg.addParentScope(memberScope);
                agg.addParentScope(scope);
                if(type.isModuleType()) {
                    this.checker.currentModDecl = type.symbol.declAST;
                    this.checker.inBind = true;
                }
                if(members) {
                    this.bind(agg, type.members.allMembers);
                }
                if(typeMembers) {
                    this.bind(agg, typeMembers.allMembers);
                }
                if(ambientMembers) {
                    this.bind(agg, ambientMembers.allMembers);
                }
                if(ambientTypeMembers) {
                    this.bind(agg, ambientTypeMembers.allMembers);
                }
                this.checker.currentModDecl = prevCurrentModDecl;
                this.checker.inBind = prevBindStatus;
            }
            if(type.extendsTypeLinks) {
                this.resolveBases(scope, type);
            }
            if(type.construct) {
                this.resolveSignatureGroup(type.construct, scope, instanceType);
            }
            if(type.call) {
                this.resolveSignatureGroup(type.call, scope, null);
            }
            if(type.index) {
                this.resolveSignatureGroup(type.index, scope, null);
            }
            if(type.elementType) {
                this.bindType(scope, type.elementType, null);
            }
        };
        Binder.prototype.bindSymbol = function (scope, symbol) {
            if(!symbol.bound) {
                var prevLocationInfo = this.checker.locationInfo;
                if((this.checker.units) && (symbol.unitIndex >= 0) && (symbol.unitIndex < this.checker.units.length)) {
                    this.checker.locationInfo = this.checker.units[symbol.unitIndex];
                }
                switch(symbol.kind()) {
                    case TypeScript.SymbolKind.Type: {
                        if(symbol.flags & TypeScript.SymbolFlags.Bound) {
                            break;
                        }
                        var typeSymbol = symbol;
                        typeSymbol.flags |= TypeScript.SymbolFlags.Bound;
                        if(typeSymbol.aliasLink && !typeSymbol.type && typeSymbol.aliasLink.alias.nodeType == TypeScript.NodeType.Name) {
                            var modPath = (typeSymbol.aliasLink.alias).text;
                            var modSym = this.checker.findSymbolForDynamicModule(modPath, this.checker.locationInfo.filename, function (id) {
                                return scope.find(id, false, true);
                            });
                            if(modSym) {
                                typeSymbol.type = modSym.getType();
                            }
                        }
                        if(typeSymbol.type && typeSymbol.type != this.checker.gloModType) {
                            this.bindType(scope, typeSymbol.type, typeSymbol.instanceType);
                            if(typeSymbol.type.isModuleType()) {
                                for(var i = 0; i < typeSymbol.expansions.length; i++) {
                                    this.bindType(scope, typeSymbol.expansions[i], typeSymbol.instanceType);
                                }
                            }
                        }
                        break;

                    }
                    case TypeScript.SymbolKind.Field: {
                        this.checker.resolveTypeLink(scope, (symbol).field.typeLink, false);
                        break;

                    }
                    case TypeScript.SymbolKind.Parameter: {
                        this.checker.resolveTypeLink(scope, (symbol).parameter.typeLink, true);
                        break;

                    }
                }
                this.checker.locationInfo = prevLocationInfo;
            }
            symbol.bound = true;
        };
        Binder.prototype.bind = function (scope, table) {
            table.map(function (key, sym, binder) {
                binder.bindSymbol(scope, sym);
            }, this);
        };
        return Binder;
    })();
    TypeScript.Binder = Binder;    
})(TypeScript || (TypeScript = {}));
var TypeScript;
(function (TypeScript) {
    var Base64Format = (function () {
        function Base64Format() { }
        Base64Format.encodedValues = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        Base64Format.encode = function encode(inValue) {
            if(inValue < 64) {
                return Base64Format.encodedValues.charAt(inValue);
            }
            throw TypeError(inValue + ": not a 64 based value");
        }
        Base64Format.decodeChar = function decodeChar(inChar) {
            if(inChar.length === 1) {
                return Base64Format.encodedValues.indexOf(inChar);
            } else {
                throw TypeError('"' + inChar + '" must have length 1');
            }
        }
        return Base64Format;
    })();    
    var Base64VLQFormat = (function () {
        function Base64VLQFormat() { }
        Base64VLQFormat.encode = function encode(inValue) {
            if(inValue < 0) {
                inValue = ((-inValue) << 1) + 1;
            } else {
                inValue = inValue << 1;
            }
            var encodedStr = "";
            do {
                var currentDigit = inValue & 31;
                inValue = inValue >> 5;
                if(inValue > 0) {
                    currentDigit = currentDigit | 32;
                }
                encodedStr = encodedStr + Base64Format.encode(currentDigit);
            }while(inValue > 0)
            return encodedStr;
        }
        Base64VLQFormat.decode = function decode(inString) {
            var result = 0;
            var negative = false;
            var shift = 0;
            for(var i = 0; i < inString.length; i++) {
                var byte = Base64Format.decodeChar(inString[i]);
                if(i === 0) {
                    if((byte & 1) === 1) {
                        negative = true;
                    }
                    result = (byte >> 1) & 15;
                } else {
                    result = result | ((byte & 31) << shift);
                }
                shift += (i == 0) ? 4 : 5;
                if((byte & 32) === 32) {
                } else {
                    return {
                        value: negative ? -(result) : result,
                        rest: inString.substr(i + 1)
                    };
                }
            }
            throw new Error('Base64 value "' + inString + '" finished with a continuation bit');
        }
        return Base64VLQFormat;
    })();
    TypeScript.Base64VLQFormat = Base64VLQFormat;    
})(TypeScript || (TypeScript = {}));
var JSON2 = {
};
((function () {
    'use strict';
    function f(n) {
        return n < 10 ? '0' + n : n;
    }
    if(typeof Date.prototype.toJSON !== 'function') {
        Date.prototype.toJSON = function (key) {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z' : null;
        };
        var strProto = String.prototype;
        var numProto = Number.prototype;
        numProto.JSON = strProto.JSON = (Boolean).prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
'\b': '\\b',
'\t': '\\t',
'\n': '\\n',
'\f': '\\f',
'\r': '\\r',
'"': '\\"',
'\\': '\\\\'    }, rep;
    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }
    function str(key, holder) {
        var i, k = null, v, length, mind = gap, partial, value = holder[key];
        if(value && typeof value === 'object' && typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }
        if(typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }
        switch(typeof value) {
            case 'string': {
                return quote(value);

            }
            case 'number': {
                return isFinite(value) ? String(value) : 'null';

            }
            case 'boolean':
            case 'null': {
                return String(value);

            }
            case 'object': {
                if(!value) {
                    return 'null';
                }
                gap += indent;
                partial = [];
                if(Object.prototype.toString.apply(value, []) === '[object Array]') {
                    length = value.length;
                    for(i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null';
                    }
                    v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
                    gap = mind;
                    return v;
                }
                if(rep && typeof rep === 'object') {
                    length = rep.length;
                    for(i = 0; i < length; i += 1) {
                        if(typeof rep[i] === 'string') {
                            k = rep[i];
                            v = str(k, value);
                            if(v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                } else {
                    for(k in value) {
                        if(Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if(v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                }
                v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
                gap = mind;
                return v;

            }
        }
    }
    if(typeof JSON2.stringify !== 'function') {
        JSON2.stringify = function (value, replacer, space) {
            var i;
            gap = '';
            indent = '';
            if(typeof space === 'number') {
                for(i = 0; i < space; i += 1) {
                    indent += ' ';
                }
            } else {
                if(typeof space === 'string') {
                    indent = space;
                }
            }
            rep = replacer;
            if(replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }
            return str('', {
                '': value
            });
        };
    }
    if(typeof JSON2.parse !== 'function') {
        JSON2.parse = function (text, reviver) {
            var j;
            function walk(holder, key) {
                var k = null, v, value = holder[key];
                if(value && typeof value === 'object') {
                    for(k in value) {
                        if(Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if(v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }
            text = String(text);
            cx.lastIndex = 0;
            if(cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }
            if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                j = eval('(' + text + ')');
                return typeof reviver === 'function' ? walk({
                    '': j
                }, '') : j;
            }
            throw new SyntaxError('JSON.parse');
        };
    }
})());
var TypeScript;
(function (TypeScript) {
    var SourceMapPosition = (function () {
        function SourceMapPosition() { }
        return SourceMapPosition;
    })();
    TypeScript.SourceMapPosition = SourceMapPosition;    
    var SourceMapping = (function () {
        function SourceMapping() {
            this.start = new SourceMapPosition();
            this.end = new SourceMapPosition();
            this.nameIndex = -1;
            this.childMappings = [];
        }
        return SourceMapping;
    })();
    TypeScript.SourceMapping = SourceMapping;    
    var SourceMapper = (function () {
        function SourceMapper(tsFileName, jsFileName, jsFile, sourceMapOut, errorReporter) {
            this.jsFile = jsFile;
            this.sourceMapOut = sourceMapOut;
            this.errorReporter = errorReporter;
            this.sourceMappings = [];
            this.currentMappings = [];
            this.names = [];
            this.currentNameIndex = [];
            this.currentMappings.push(this.sourceMappings);
            jsFileName = TypeScript.switchToForwardSlashes(jsFileName);
            this.jsFileName = TypeScript.getPrettyName(jsFileName, false, true);
            var removalIndex = jsFileName.lastIndexOf(this.jsFileName);
            var fixedPath = jsFileName.substring(0, removalIndex);
            this.tsFileName = TypeScript.getRelativePathToFixedPath(fixedPath, tsFileName);
        }
        SourceMapper.MapFileExtension = ".map";
        SourceMapper.EmitSourceMapping = function EmitSourceMapping(allSourceMappers) {
            var sourceMapper = allSourceMappers[0];
            sourceMapper.jsFile.WriteLine("//@ sourceMappingURL=" + sourceMapper.jsFileName + SourceMapper.MapFileExtension);
            var sourceMapOut = sourceMapper.sourceMapOut;
            var mappingsString = "";
            var tsFiles = [];
            var prevEmittedColumn = 0;
            var prevEmittedLine = 0;
            var prevSourceColumn = 0;
            var prevSourceLine = 0;
            var prevSourceIndex = 0;
            var prevNameIndex = 0;
            var namesList = [];
            var namesCount = 0;
            var emitComma = false;
            var recordedPosition = null;
            for(var sourceMapperIndex = 0; sourceMapperIndex < allSourceMappers.length; sourceMapperIndex++) {
                sourceMapper = allSourceMappers[sourceMapperIndex];
                var currentSourceIndex = tsFiles.length;
                tsFiles.push(sourceMapper.tsFileName);
                if(sourceMapper.names.length > 0) {
                    namesList.push.apply(namesList, sourceMapper.names);
                }
                var recordSourceMapping = function (mappedPosition, nameIndex) {
                    if(recordedPosition != null && recordedPosition.emittedColumn == mappedPosition.emittedColumn && recordedPosition.emittedLine == mappedPosition.emittedLine) {
                        return;
                    }
                    if(prevEmittedLine !== mappedPosition.emittedLine) {
                        while(prevEmittedLine < mappedPosition.emittedLine) {
                            prevEmittedColumn = 0;
                            mappingsString = mappingsString + ";";
                            prevEmittedLine++;
                        }
                        emitComma = false;
                    } else {
                        if(emitComma) {
                            mappingsString = mappingsString + ",";
                        }
                    }
                    mappingsString = mappingsString + TypeScript.Base64VLQFormat.encode(mappedPosition.emittedColumn - prevEmittedColumn);
                    prevEmittedColumn = mappedPosition.emittedColumn;
                    mappingsString = mappingsString + TypeScript.Base64VLQFormat.encode(currentSourceIndex - prevSourceIndex);
                    prevSourceIndex = currentSourceIndex;
                    mappingsString = mappingsString + TypeScript.Base64VLQFormat.encode(mappedPosition.sourceLine - 1 - prevSourceLine);
                    prevSourceLine = mappedPosition.sourceLine - 1;
                    mappingsString = mappingsString + TypeScript.Base64VLQFormat.encode(mappedPosition.sourceColumn - prevSourceColumn);
                    prevSourceColumn = mappedPosition.sourceColumn;
                    if(nameIndex >= 0) {
                        mappingsString = mappingsString + TypeScript.Base64VLQFormat.encode(namesCount + nameIndex - prevNameIndex);
                        prevNameIndex = namesCount + nameIndex;
                    }
                    emitComma = true;
                    recordedPosition = mappedPosition;
                };
                var recordSourceMappingSiblings = function (sourceMappings) {
                    for(var i = 0; i < sourceMappings.length; i++) {
                        var sourceMapping = sourceMappings[i];
                        recordSourceMapping(sourceMapping.start, sourceMapping.nameIndex);
                        recordSourceMappingSiblings(sourceMapping.childMappings);
                        recordSourceMapping(sourceMapping.end, sourceMapping.nameIndex);
                    }
                };
                recordSourceMappingSiblings(sourceMapper.sourceMappings, -1);
                namesCount = namesCount + sourceMapper.names.length;
            }
            if(mappingsString != "") {
                sourceMapOut.Write(JSON2.stringify({
                    version: 3,
                    file: sourceMapper.jsFileName,
                    sources: tsFiles,
                    names: namesList,
                    mappings: mappingsString
                }));
            }
            try  {
                sourceMapOut.Close();
            } catch (ex) {
                sourceMapper.errorReporter.emitterError(null, ex.message);
            }
        }
        return SourceMapper;
    })();
    TypeScript.SourceMapper = SourceMapper;    
})(TypeScript || (TypeScript = {}));
var TypeScript;
(function (TypeScript) {
    (function (EmitContainer) {
        EmitContainer._map = [];
        EmitContainer._map[0] = "Prog";
        EmitContainer.Prog = 0;
        EmitContainer._map[1] = "Module";
        EmitContainer.Module = 1;
        EmitContainer._map[2] = "DynamicModule";
        EmitContainer.DynamicModule = 2;
        EmitContainer._map[3] = "Class";
        EmitContainer.Class = 3;
        EmitContainer._map[4] = "Constructor";
        EmitContainer.Constructor = 4;
        EmitContainer._map[5] = "Function";
        EmitContainer.Function = 5;
        EmitContainer._map[6] = "Args";
        EmitContainer.Args = 6;
        EmitContainer._map[7] = "Interface";
        EmitContainer.Interface = 7;
    })(TypeScript.EmitContainer || (TypeScript.EmitContainer = {}));
    var EmitContainer = TypeScript.EmitContainer;
    var EmitState = (function () {
        function EmitState() {
            this.column = 0;
            this.line = 0;
            this.pretty = false;
            this.inObjectLiteral = false;
            this.container = EmitContainer.Prog;
        }
        return EmitState;
    })();
    TypeScript.EmitState = EmitState;    
    var EmitOptions = (function () {
        function EmitOptions(settings) {
            this.ioHost = null;
            this.outputMany = true;
            this.commonDirectoryPath = "";
            this.minWhitespace = settings.minWhitespace;
            this.propagateConstants = settings.propagateConstants;
            this.emitComments = settings.emitComments;
            this.outputOption = settings.outputOption;
        }
        EmitOptions.prototype.mapOutputFileName = function (fileName, extensionChanger) {
            if(this.outputMany) {
                var updatedFileName = fileName;
                if(this.outputOption != "") {
                    updatedFileName = fileName.replace(this.commonDirectoryPath, "");
                    updatedFileName = this.outputOption + updatedFileName;
                }
                return extensionChanger(updatedFileName, false);
            } else {
                return extensionChanger(this.outputOption, true);
            }
        };
        return EmitOptions;
    })();
    TypeScript.EmitOptions = EmitOptions;    
    var Indenter = (function () {
        function Indenter() {
            this.indentAmt = 0;
        }
        Indenter.indentStep = 4;
        Indenter.indentStepString = "    ";
        Indenter.indentStrings = [];
        Indenter.prototype.increaseIndent = function () {
            this.indentAmt += Indenter.indentStep;
        };
        Indenter.prototype.decreaseIndent = function () {
            this.indentAmt -= Indenter.indentStep;
        };
        Indenter.prototype.getIndent = function () {
            var indentString = Indenter.indentStrings[this.indentAmt];
            if(indentString === undefined) {
                indentString = "";
                for(var i = 0; i < this.indentAmt; i = i + Indenter.indentStep) {
                    indentString += Indenter.indentStepString;
                }
                Indenter.indentStrings[this.indentAmt] = indentString;
            }
            return indentString;
        };
        return Indenter;
    })();
    TypeScript.Indenter = Indenter;    
    var Emitter = (function () {
        function Emitter(checker, emittingFileName, outfile, emitOptions, errorReporter) {
            this.checker = checker;
            this.emittingFileName = emittingFileName;
            this.outfile = outfile;
            this.emitOptions = emitOptions;
            this.errorReporter = errorReporter;
            this.prologueEmitted = false;
            this.thisClassNode = null;
            this.thisFnc = null;
            this.moduleDeclList = [];
            this.moduleName = "";
            this.emitState = new EmitState();
            this.indenter = new Indenter();
            this.ambientModule = false;
            this.modAliasId = null;
            this.firstModAlias = null;
            this.allSourceMappers = [];
            this.sourceMapper = null;
            this.captureThisStmtString = "var _this = this;";
            this.varListCountStack = [
                0
            ];
        }
        Emitter.prototype.setSourceMappings = function (mapper) {
            this.allSourceMappers.push(mapper);
            this.sourceMapper = mapper;
        };
        Emitter.prototype.writeToOutput = function (s) {
            this.outfile.Write(s);
            this.emitState.column += s.length;
        };
        Emitter.prototype.writeToOutputTrimmable = function (s) {
            if(this.emitOptions.minWhitespace) {
                s = s.replace(/[\s]*/g, '');
            }
            this.writeToOutput(s);
        };
        Emitter.prototype.writeLineToOutput = function (s) {
            if(this.emitOptions.minWhitespace) {
                this.writeToOutput(s);
                var c = s.charCodeAt(s.length - 1);
                if(!((c == TypeScript.LexCodeSpace) || (c == TypeScript.LexCodeSMC) || (c == TypeScript.LexCodeLBR))) {
                    this.writeToOutput(' ');
                }
            } else {
                this.outfile.WriteLine(s);
                this.emitState.column = 0;
                this.emitState.line++;
            }
        };
        Emitter.prototype.writeCaptureThisStatement = function (ast) {
            this.emitIndent();
            this.recordSourceMappingStart(ast);
            this.writeToOutput(this.captureThisStmtString);
            this.recordSourceMappingEnd(ast);
            this.writeLineToOutput("");
        };
        Emitter.prototype.setInVarBlock = function (count) {
            this.varListCountStack[this.varListCountStack.length - 1] = count;
        };
        Emitter.prototype.setInObjectLiteral = function (val) {
            var temp = this.emitState.inObjectLiteral;
            this.emitState.inObjectLiteral = val;
            return temp;
        };
        Emitter.prototype.setContainer = function (c) {
            var temp = this.emitState.container;
            this.emitState.container = c;
            return temp;
        };
        Emitter.prototype.getIndentString = function () {
            if(this.emitOptions.minWhitespace) {
                return "";
            } else {
                return this.indenter.getIndent();
            }
        };
        Emitter.prototype.emitIndent = function () {
            this.writeToOutput(this.getIndentString());
        };
        Emitter.prototype.emitCommentInPlace = function (comment) {
            this.recordSourceMappingStart(comment);
            var text = comment.getText();
            var hadNewLine = false;
            if(comment.isBlockComment) {
                if(this.emitState.column == 0) {
                    this.emitIndent();
                }
                this.writeToOutput(text[0]);
                if(text.length > 1 || comment.endsLine) {
                    this.writeLineToOutput("");
                    for(var i = 1; i < text.length; i++) {
                        this.emitIndent();
                        this.writeLineToOutput(text[i]);
                    }
                    hadNewLine = true;
                }
            } else {
                if(this.emitState.column == 0) {
                    this.emitIndent();
                }
                this.writeLineToOutput(text[0]);
                hadNewLine = true;
            }
            if(hadNewLine) {
                this.emitIndent();
            } else {
                this.writeToOutput(" ");
            }
            this.recordSourceMappingEnd(comment);
        };
        Emitter.prototype.emitParensAndCommentsInPlace = function (ast, pre) {
            var comments = pre ? ast.preComments : ast.postComments;
            if(ast.isParenthesized && !pre) {
                this.writeToOutput(")");
            }
            if(this.emitOptions.emitComments && comments && comments.length != 0) {
                for(var i = 0; i < comments.length; i++) {
                    this.emitCommentInPlace(comments[i]);
                }
            }
            if(ast.isParenthesized && pre) {
                this.writeToOutput("(");
            }
        };
        Emitter.prototype.emitObjectLiteral = function (content) {
            this.writeLineToOutput("{");
            this.indenter.increaseIndent();
            var inObjectLiteral = this.setInObjectLiteral(true);
            this.emitJavascriptList(content, ",", TypeScript.TokenID.Comma, true, false, false);
            this.setInObjectLiteral(inObjectLiteral);
            this.indenter.decreaseIndent();
            this.emitIndent();
            this.writeToOutput("}");
        };
        Emitter.prototype.emitArrayLiteral = function (content) {
            this.writeToOutput("[");
            if(content) {
                this.writeLineToOutput("");
                this.indenter.increaseIndent();
                this.emitJavascriptList(content, ", ", TypeScript.TokenID.Comma, true, false, false);
                this.indenter.decreaseIndent();
                this.emitIndent();
            }
            this.writeToOutput("]");
        };
        Emitter.prototype.emitNew = function (target, args) {
            this.writeToOutput("new ");
            if(target.nodeType == TypeScript.NodeType.TypeRef) {
                var typeRef = target;
                if(typeRef.arrayCount) {
                    this.writeToOutput("Array()");
                } else {
                    this.emitJavascript(typeRef.term, TypeScript.TokenID.Tilde, false);
                    this.writeToOutput("()");
                }
            } else {
                this.emitJavascript(target, TypeScript.TokenID.Tilde, false);
                this.recordSourceMappingStart(args);
                this.writeToOutput("(");
                this.emitJavascriptList(args, ", ", TypeScript.TokenID.Comma, false, false, false);
                this.writeToOutput(")");
                this.recordSourceMappingEnd(args);
            }
        };
        Emitter.prototype.tryEmitConstant = function (dotExpr) {
            if(!this.emitOptions.propagateConstants) {
                return false;
            }
            var propertyName = dotExpr.operand2;
            if(propertyName && propertyName.sym && propertyName.sym.isVariable()) {
                if(TypeScript.hasFlag(propertyName.sym.flags, TypeScript.SymbolFlags.Constant)) {
                    if(propertyName.sym.declAST) {
                        var boundDecl = propertyName.sym.declAST;
                        if(boundDecl.init && (boundDecl.init.nodeType == TypeScript.NodeType.NumberLit)) {
                            var numLit = boundDecl.init;
                            this.writeToOutput(numLit.value.toString());
                            var comment = " /* ";
                            comment += propertyName.actualText;
                            comment += " */ ";
                            this.writeToOutput(comment);
                            return true;
                        }
                    }
                }
            }
            return false;
        };
        Emitter.prototype.emitCall = function (callNode, target, args) {
            if(!this.emitSuperCall(callNode)) {
                if(!TypeScript.hasFlag(callNode.flags, TypeScript.ASTFlags.ClassBaseConstructorCall)) {
                    if(target.nodeType == TypeScript.NodeType.FuncDecl && !target.isParenthesized) {
                        this.writeToOutput("(");
                    }
                    if(callNode.target.nodeType == TypeScript.NodeType.Super && this.emitState.container == EmitContainer.Constructor) {
                        this.writeToOutput("_super.call");
                    } else {
                        this.emitJavascript(target, TypeScript.TokenID.OpenParen, false);
                    }
                    if(target.nodeType == TypeScript.NodeType.FuncDecl && !target.isParenthesized) {
                        this.writeToOutput(")");
                    }
                    this.recordSourceMappingStart(args);
                    this.writeToOutput("(");
                    if(callNode.target.nodeType == TypeScript.NodeType.Super && this.emitState.container == EmitContainer.Constructor) {
                        this.writeToOutput("this");
                        if(args && args.members.length) {
                            this.writeToOutput(", ");
                        }
                    }
                    this.emitJavascriptList(args, ", ", TypeScript.TokenID.Comma, false, false, false);
                    this.writeToOutput(")");
                    this.recordSourceMappingEnd(args);
                } else {
                    this.indenter.decreaseIndent();
                    this.indenter.decreaseIndent();
                    var constructorCall = new TypeScript.ASTList();
                    constructorCall.members[0] = callNode;
                    this.emitConstructorCalls(constructorCall, this.thisClassNode);
                    this.indenter.increaseIndent();
                    this.indenter.increaseIndent();
                }
            }
        };
        Emitter.prototype.emitConstructorCalls = function (bases, classDecl) {
            if(bases == null) {
                return;
            }
            var basesLen = bases.members.length;
            this.recordSourceMappingStart(classDecl);
            for(var i = 0; i < basesLen; i++) {
                var baseExpr = bases.members[i];
                var baseSymbol = null;
                if(baseExpr.nodeType == TypeScript.NodeType.Call) {
                    baseSymbol = (baseExpr).target.type.symbol;
                } else {
                    baseSymbol = baseExpr.type.symbol;
                }
                var baseName = baseSymbol.name;
                if(baseSymbol.declModule != classDecl.type.symbol.declModule) {
                    baseName = baseSymbol.fullName();
                }
                if(baseExpr.nodeType == TypeScript.NodeType.Call) {
                    this.emitIndent();
                    this.writeToOutput("_super.call(this");
                    var args = (baseExpr).arguments;
                    if(args && (args.members.length > 0)) {
                        this.writeToOutput(", ");
                        this.emitJavascriptList(args, ", ", TypeScript.TokenID.Comma, false, false, false);
                    }
                    this.writeToOutput(")");
                } else {
                    if(baseExpr.type && (baseExpr.type.isClassInstance())) {
                        this.emitIndent();
                        this.writeToOutput(classDecl.name.actualText + "._super.constructor");
                        this.writeToOutput(".call(this)");
                    }
                }
            }
            this.recordSourceMappingEnd(classDecl);
        };
        Emitter.prototype.emitInnerFunction = function (funcDecl, printName, isMember, bases, hasSelfRef, classDecl) {
            var isClassConstructor = funcDecl.isConstructor && TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.ClassMethod);
            var hasNonObjectBaseType = isClassConstructor && TypeScript.hasFlag(this.thisClassNode.type.instanceType.typeFlags, TypeScript.TypeFlags.HasBaseType) && !TypeScript.hasFlag(this.thisClassNode.type.instanceType.typeFlags, TypeScript.TypeFlags.HasBaseTypeOfObject);
            var classPropertiesMustComeAfterSuperCall = hasNonObjectBaseType && TypeScript.hasFlag((this.thisClassNode).varFlags, TypeScript.VarFlags.ClassSuperMustBeFirstCallInConstructor);
            var shouldParenthesize = TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.IsFunctionExpression) && !funcDecl.isParenthesized && !funcDecl.isAccessor() && (TypeScript.hasFlag(funcDecl.flags, TypeScript.ASTFlags.ExplicitSemicolon) || TypeScript.hasFlag(funcDecl.flags, TypeScript.ASTFlags.AutomaticSemicolon));
            this.emitParensAndCommentsInPlace(funcDecl, true);
            if(shouldParenthesize) {
                this.writeToOutput("(");
            }
            this.recordSourceMappingStart(funcDecl);
            if(!(funcDecl.isAccessor() && (funcDecl.accessorSymbol).isObjectLitField)) {
                this.writeToOutput("function ");
            }
            if(printName) {
                var id = funcDecl.getNameText();
                if(id && !funcDecl.isAccessor()) {
                    if(funcDecl.name) {
                        this.recordSourceMappingStart(funcDecl.name);
                    }
                    this.writeToOutput(id);
                    if(funcDecl.name) {
                        this.recordSourceMappingEnd(funcDecl.name);
                    }
                }
            }
            this.writeToOutput("(");
            var argsLen = 0;
            var i = 0;
            var arg;
            var defaultArgs = [];
            if(funcDecl.arguments) {
                var tempContainer = this.setContainer(EmitContainer.Args);
                argsLen = funcDecl.arguments.members.length;
                var printLen = argsLen;
                if(funcDecl.variableArgList) {
                    printLen--;
                }
                for(i = 0; i < printLen; i++) {
                    arg = funcDecl.arguments.members[i];
                    if(arg.init) {
                        defaultArgs.push(arg);
                    }
                    this.emitJavascript(arg, TypeScript.TokenID.OpenParen, false);
                    if(i < (printLen - 1)) {
                        this.writeToOutput(", ");
                    }
                }
                this.setContainer(tempContainer);
            }
            this.writeLineToOutput(") {");
            if(funcDecl.isConstructor) {
                this.recordSourceMappingNameStart("constructor");
            } else {
                if(funcDecl.isGetAccessor()) {
                    this.recordSourceMappingNameStart("get_" + funcDecl.getNameText());
                } else {
                    if(funcDecl.isSetAccessor()) {
                        this.recordSourceMappingNameStart("set_" + funcDecl.getNameText());
                    } else {
                        this.recordSourceMappingNameStart(funcDecl.getNameText());
                    }
                }
            }
            this.indenter.increaseIndent();
            for(i = 0; i < defaultArgs.length; i++) {
                var arg = defaultArgs[i];
                this.emitIndent();
                this.recordSourceMappingStart(arg);
                this.writeToOutput("if (typeof " + arg.id.actualText + " === \"undefined\") { ");
                this.recordSourceMappingStart(arg.id);
                this.writeToOutput(arg.id.actualText);
                this.recordSourceMappingEnd(arg.id);
                this.writeToOutput(" = ");
                this.emitJavascript(arg.init, TypeScript.TokenID.OpenParen, false);
                this.writeLineToOutput("; }");
                this.recordSourceMappingEnd(arg);
            }
            if(funcDecl.isConstructor && ((funcDecl.classDecl).varFlags & TypeScript.VarFlags.MustCaptureThis)) {
                this.writeCaptureThisStatement(funcDecl);
            }
            if(funcDecl.isConstructor && !classPropertiesMustComeAfterSuperCall) {
                if(funcDecl.arguments) {
                    argsLen = funcDecl.arguments.members.length;
                    for(i = 0; i < argsLen; i++) {
                        arg = funcDecl.arguments.members[i];
                        if((arg.varFlags & TypeScript.VarFlags.Property) != TypeScript.VarFlags.None) {
                            this.emitIndent();
                            this.recordSourceMappingStart(arg);
                            this.recordSourceMappingStart(arg.id);
                            this.writeToOutput("this." + arg.id.actualText);
                            this.recordSourceMappingEnd(arg.id);
                            this.writeToOutput(" = ");
                            this.recordSourceMappingStart(arg.id);
                            this.writeToOutput(arg.id.actualText);
                            this.recordSourceMappingEnd(arg.id);
                            this.writeLineToOutput(";");
                            this.recordSourceMappingEnd(arg);
                        }
                    }
                }
                if(!TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.ClassMethod)) {
                    this.emitConstructorCalls(bases, classDecl);
                }
            }
            if(hasSelfRef) {
                this.writeCaptureThisStatement(funcDecl);
            }
            if(funcDecl.variableArgList) {
                argsLen = funcDecl.arguments.members.length;
                var lastArg = funcDecl.arguments.members[argsLen - 1];
                this.emitIndent();
                this.recordSourceMappingStart(lastArg);
                this.writeToOutput("var ");
                this.recordSourceMappingStart(lastArg.id);
                this.writeToOutput(lastArg.id.actualText);
                this.recordSourceMappingEnd(lastArg.id);
                this.writeLineToOutput(" = [];");
                this.recordSourceMappingEnd(lastArg);
                this.emitIndent();
                this.writeToOutput("for (");
                this.recordSourceMappingStart(lastArg);
                this.writeToOutput("var _i = 0;");
                this.recordSourceMappingEnd(lastArg);
                this.writeToOutput(" ");
                this.recordSourceMappingStart(lastArg);
                this.writeToOutput("_i < (arguments.length - " + (argsLen - 1) + ")");
                this.recordSourceMappingEnd(lastArg);
                this.writeToOutput("; ");
                this.recordSourceMappingStart(lastArg);
                this.writeToOutput("_i++");
                this.recordSourceMappingEnd(lastArg);
                this.writeLineToOutput(") {");
                this.indenter.increaseIndent();
                this.emitIndent();
                this.recordSourceMappingStart(lastArg);
                this.writeToOutput(lastArg.id.actualText + "[_i] = arguments[_i + " + (argsLen - 1) + "];");
                this.recordSourceMappingEnd(lastArg);
                this.writeLineToOutput("");
                this.indenter.decreaseIndent();
                this.emitIndent();
                this.writeLineToOutput("}");
            }
            if(funcDecl.isConstructor && TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.ClassMethod) && !classPropertiesMustComeAfterSuperCall) {
                var nProps = (this.thisClassNode.members).members.length;
                for(var i = 0; i < nProps; i++) {
                    if((this.thisClassNode.members).members[i].nodeType == TypeScript.NodeType.VarDecl) {
                        var varDecl = (this.thisClassNode.members).members[i];
                        if(!TypeScript.hasFlag(varDecl.varFlags, TypeScript.VarFlags.Static) && varDecl.init) {
                            this.emitIndent();
                            this.emitJavascriptVarDecl(varDecl, TypeScript.TokenID.Tilde);
                            this.writeLineToOutput("");
                        }
                    }
                }
            }
            this.emitBareJavascriptStatements(funcDecl.bod, classPropertiesMustComeAfterSuperCall);
            this.indenter.decreaseIndent();
            this.emitIndent();
            this.recordSourceMappingStart(funcDecl.endingToken);
            this.writeToOutput("}");
            this.recordSourceMappingNameEnd();
            this.recordSourceMappingEnd(funcDecl.endingToken);
            this.recordSourceMappingEnd(funcDecl);
            if(shouldParenthesize) {
                this.writeToOutput(")");
            }
            this.recordSourceMappingEnd(funcDecl);
            this.emitParensAndCommentsInPlace(funcDecl, false);
            if(!isMember && !TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.IsFunctionExpression) && (TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.Definition) || funcDecl.isConstructor)) {
                this.writeLineToOutput("");
            } else {
                if(TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.IsFunctionExpression)) {
                    if(TypeScript.hasFlag(funcDecl.flags, TypeScript.ASTFlags.ExplicitSemicolon) || TypeScript.hasFlag(funcDecl.flags, TypeScript.ASTFlags.AutomaticSemicolon)) {
                        this.writeLineToOutput(";");
                    }
                }
            }
        };
        Emitter.prototype.emitJavascriptModule = function (moduleDecl) {
            var modName = moduleDecl.name.actualText;
            if(TypeScript.isTSFile(modName)) {
                moduleDecl.name.setText(modName.substring(0, modName.length - 3));
            } else {
                if(TypeScript.isSTRFile(modName)) {
                    moduleDecl.name.setText(modName.substring(0, modName.length - 4));
                }
            }
            if(!TypeScript.hasFlag(moduleDecl.modFlags, TypeScript.ModuleFlags.Ambient)) {
                var isDynamicMod = TypeScript.hasFlag(moduleDecl.modFlags, TypeScript.ModuleFlags.IsDynamic);
                var prevOutFile = this.outfile;
                var prevOutFileName = this.emittingFileName;
                var prevAllSourceMappers = this.allSourceMappers;
                var prevSourceMapper = this.sourceMapper;
                var prevColumn = this.emitState.column;
                var prevLine = this.emitState.line;
                var temp = this.setContainer(EmitContainer.Module);
                var svModuleName = this.moduleName;
                var isExported = TypeScript.hasFlag(moduleDecl.modFlags, TypeScript.ModuleFlags.Exported);
                this.moduleDeclList[this.moduleDeclList.length] = moduleDecl;
                var isWholeFile = TypeScript.hasFlag(moduleDecl.modFlags, TypeScript.ModuleFlags.IsWholeFile);
                this.moduleName = moduleDecl.name.actualText;
                if(isDynamicMod) {
                    var tsModFileName = TypeScript.stripQuotes(moduleDecl.name.actualText);
                    var modFilePath = TypeScript.trimModName(tsModFileName) + ".js";
                    modFilePath = this.emitOptions.mapOutputFileName(modFilePath, TypeScript.TypeScriptCompiler.mapToJSFileName);
                    if(this.emitOptions.ioHost) {
                        if(TypeScript.switchToForwardSlashes(modFilePath) != TypeScript.switchToForwardSlashes(this.emittingFileName)) {
                            this.emittingFileName = modFilePath;
                            var useUTF8InOutputfile = moduleDecl.containsUnicodeChar || (this.emitOptions.emitComments && moduleDecl.containsUnicodeCharInComment);
                            this.outfile = this.createFile(this.emittingFileName, useUTF8InOutputfile);
                            if(prevSourceMapper != null) {
                                this.allSourceMappers = [];
                                var sourceMappingFile = this.createFile(this.emittingFileName + TypeScript.SourceMapper.MapFileExtension, false);
                                this.setSourceMappings(new TypeScript.SourceMapper(tsModFileName, this.emittingFileName, this.outfile, sourceMappingFile, this.errorReporter));
                                this.emitState.column = 0;
                                this.emitState.line = 0;
                            }
                        } else {
                            TypeScript.CompilerDiagnostics.assert(this.emitOptions.outputMany, "Cannot have dynamic modules compiling into single file");
                        }
                    }
                    this.setContainer(EmitContainer.DynamicModule);
                    this.recordSourceMappingStart(moduleDecl);
                    if(TypeScript.moduleGenTarget == TypeScript.ModuleGenTarget.Asynchronous) {
                        var dependencyList = "[\"require\", \"exports\"";
                        var importList = "require, exports";
                        var importStatement = null;
                        for(var i = 0; i < (moduleDecl.mod).importedModules.length; i++) {
                            importStatement = (moduleDecl.mod).importedModules[i];
                            if(importStatement.id.sym && !(importStatement.id.sym).onlyReferencedAsTypeRef) {
                                if(i <= (moduleDecl.mod).importedModules.length - 1) {
                                    dependencyList += ", ";
                                    importList += ", ";
                                }
                                importList += "__" + importStatement.id.actualText + "__";
                                dependencyList += importStatement.firstAliasedModToString();
                            }
                        }
                        for(var i = 0; i < moduleDecl.amdDependencies.length; i++) {
                            dependencyList += ", \"" + moduleDecl.amdDependencies[i] + "\"";
                        }
                        dependencyList += "]";
                        this.writeLineToOutput("define(" + dependencyList + "," + " function(" + importList + ") {");
                    } else {
                    }
                } else {
                    if(!isExported) {
                        this.recordSourceMappingStart(moduleDecl);
                        this.writeToOutput("var ");
                        this.recordSourceMappingStart(moduleDecl.name);
                        this.writeToOutput(this.moduleName);
                        this.recordSourceMappingEnd(moduleDecl.name);
                        this.writeLineToOutput(";");
                        this.recordSourceMappingEnd(moduleDecl);
                        this.emitIndent();
                    }
                    this.writeToOutput("(");
                    this.recordSourceMappingStart(moduleDecl);
                    this.writeToOutput("function (");
                    this.recordSourceMappingStart(moduleDecl.name);
                    this.writeToOutput(this.moduleName);
                    this.recordSourceMappingEnd(moduleDecl.name);
                    this.writeLineToOutput(") {");
                }
                if(!isWholeFile) {
                    this.recordSourceMappingNameStart(this.moduleName);
                }
                if(!isDynamicMod || TypeScript.moduleGenTarget == TypeScript.ModuleGenTarget.Asynchronous) {
                    this.indenter.increaseIndent();
                }
                if(moduleDecl.modFlags & TypeScript.ModuleFlags.MustCaptureThis) {
                    this.writeCaptureThisStatement(moduleDecl);
                }
                this.emitJavascriptList(moduleDecl.members, null, TypeScript.TokenID.Semicolon, true, false, false);
                if(!isDynamicMod || TypeScript.moduleGenTarget == TypeScript.ModuleGenTarget.Asynchronous) {
                    this.indenter.decreaseIndent();
                }
                this.emitIndent();
                if(isDynamicMod) {
                    if(TypeScript.moduleGenTarget == TypeScript.ModuleGenTarget.Asynchronous) {
                        this.writeLineToOutput("})");
                    } else {
                    }
                    if(!isWholeFile) {
                        this.recordSourceMappingNameEnd();
                    }
                    this.recordSourceMappingEnd(moduleDecl);
                    if(this.outfile != prevOutFile) {
                        this.Close();
                        if(prevSourceMapper != null) {
                            this.allSourceMappers = prevAllSourceMappers;
                            this.sourceMapper = prevSourceMapper;
                            this.emitState.column = prevColumn;
                            this.emitState.line = prevLine;
                        }
                        this.outfile = prevOutFile;
                        this.emittingFileName = prevOutFileName;
                    }
                } else {
                    var containingMod = null;
                    if(moduleDecl.type && moduleDecl.type.symbol.container && moduleDecl.type.symbol.container.declAST) {
                        containingMod = moduleDecl.type.symbol.container.declAST;
                    }
                    var parentIsDynamic = containingMod && TypeScript.hasFlag(containingMod.modFlags, TypeScript.ModuleFlags.IsDynamic);
                    this.recordSourceMappingStart(moduleDecl.endingToken);
                    if(temp == EmitContainer.Prog && isExported) {
                        this.writeToOutput("}");
                        if(!isWholeFile) {
                            this.recordSourceMappingNameEnd();
                        }
                        this.recordSourceMappingEnd(moduleDecl.endingToken);
                        this.writeLineToOutput(")(this." + this.moduleName + " || (this." + this.moduleName + " = {}));");
                    } else {
                        if(isExported || temp == EmitContainer.Prog) {
                            var dotMod = svModuleName != "" ? (parentIsDynamic ? "exports" : svModuleName) + "." : svModuleName;
                            this.writeToOutput("}");
                            if(!isWholeFile) {
                                this.recordSourceMappingNameEnd();
                            }
                            this.recordSourceMappingEnd(moduleDecl.endingToken);
                            this.writeLineToOutput(")(" + dotMod + this.moduleName + " || (" + dotMod + this.moduleName + " = {}));");
                        } else {
                            if(!isExported && temp != EmitContainer.Prog) {
                                this.writeToOutput("}");
                                if(!isWholeFile) {
                                    this.recordSourceMappingNameEnd();
                                }
                                this.recordSourceMappingEnd(moduleDecl.endingToken);
                                this.writeLineToOutput(")(" + this.moduleName + " || (" + this.moduleName + " = {}));");
                            } else {
                                this.writeToOutput("}");
                                if(!isWholeFile) {
                                    this.recordSourceMappingNameEnd();
                                }
                                this.recordSourceMappingEnd(moduleDecl.endingToken);
                                this.writeLineToOutput(")();");
                            }
                        }
                    }
                    this.recordSourceMappingEnd(moduleDecl);
                    if(temp != EmitContainer.Prog && isExported) {
                        this.emitIndent();
                        this.recordSourceMappingStart(moduleDecl);
                        if(parentIsDynamic) {
                            this.writeLineToOutput("var " + this.moduleName + " = exports." + this.moduleName + ";");
                        } else {
                            this.writeLineToOutput("var " + this.moduleName + " = " + svModuleName + "." + this.moduleName + ";");
                        }
                        this.recordSourceMappingEnd(moduleDecl);
                    }
                }
                this.setContainer(temp);
                this.moduleName = svModuleName;
                this.moduleDeclList.length--;
            }
        };
        Emitter.prototype.emitIndex = function (operand1, operand2) {
            var temp = this.setInObjectLiteral(false);
            this.emitJavascript(operand1, TypeScript.TokenID.Tilde, false);
            this.writeToOutput("[");
            this.emitJavascriptList(operand2, ", ", TypeScript.TokenID.Comma, false, false, false);
            this.writeToOutput("]");
            this.setInObjectLiteral(temp);
        };
        Emitter.prototype.emitStringLiteral = function (text) {
            this.writeToOutput(text);
        };
        Emitter.prototype.emitJavascriptFunction = function (funcDecl) {
            if(TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.Signature) || funcDecl.isOverload) {
                return;
            }
            var temp;
            var tempFnc = this.thisFnc;
            this.thisFnc = funcDecl;
            if(funcDecl.isConstructor) {
                temp = this.setContainer(EmitContainer.Constructor);
            } else {
                temp = this.setContainer(EmitContainer.Function);
            }
            var bases = null;
            var hasSelfRef = false;
            var funcName = funcDecl.getNameText();
            if((this.emitState.inObjectLiteral || !funcDecl.isAccessor()) && ((temp != EmitContainer.Constructor) || ((funcDecl.fncFlags & TypeScript.FncFlags.Method) == TypeScript.FncFlags.None))) {
                var tempLit = this.setInObjectLiteral(false);
                if(this.thisClassNode) {
                    bases = this.thisClassNode.extendsList;
                }
                hasSelfRef = Emitter.shouldCaptureThis(funcDecl);
                this.recordSourceMappingStart(funcDecl);
                if(TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.Exported | TypeScript.FncFlags.ClassPropertyMethodExported) && funcDecl.type.symbol.container == this.checker.gloMod && !funcDecl.isConstructor) {
                    this.writeToOutput("this." + funcName + " = ");
                    this.emitInnerFunction(funcDecl, false, false, bases, hasSelfRef, this.thisClassNode);
                } else {
                    this.emitInnerFunction(funcDecl, (funcDecl.name && !funcDecl.name.isMissing()), false, bases, hasSelfRef, this.thisClassNode);
                }
                this.setInObjectLiteral(tempLit);
            }
            this.setContainer(temp);
            this.thisFnc = tempFnc;
            if(TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.Definition)) {
                if(TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.Static)) {
                    if(this.thisClassNode) {
                        if(funcDecl.isAccessor()) {
                            this.emitPropertyAccessor(funcDecl, this.thisClassNode.name.actualText, false);
                        } else {
                            this.emitIndent();
                            this.recordSourceMappingStart(funcDecl);
                            this.writeLineToOutput(this.thisClassNode.name.actualText + "." + funcName + " = " + funcName + ";");
                            this.recordSourceMappingEnd(funcDecl);
                        }
                    }
                } else {
                    if((this.emitState.container == EmitContainer.Module || this.emitState.container == EmitContainer.DynamicModule) && TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.Exported | TypeScript.FncFlags.ClassPropertyMethodExported)) {
                        this.emitIndent();
                        var modName = this.emitState.container == EmitContainer.Module ? this.moduleName : "exports";
                        this.recordSourceMappingStart(funcDecl);
                        this.writeLineToOutput(modName + "." + funcName + " = " + funcName + ";");
                        this.recordSourceMappingEnd(funcDecl);
                    }
                }
            }
        };
        Emitter.prototype.emitAmbientVarDecl = function (varDecl) {
            if(varDecl.init) {
                this.emitParensAndCommentsInPlace(varDecl, true);
                this.recordSourceMappingStart(varDecl);
                this.recordSourceMappingStart(varDecl.id);
                this.writeToOutput(varDecl.id.actualText);
                this.recordSourceMappingEnd(varDecl.id);
                this.writeToOutput(" = ");
                this.emitJavascript(varDecl.init, TypeScript.TokenID.Comma, false);
                this.recordSourceMappingEnd(varDecl);
                this.writeToOutput(";");
                this.emitParensAndCommentsInPlace(varDecl, false);
            }
        };
        Emitter.prototype.varListCount = function () {
            return this.varListCountStack[this.varListCountStack.length - 1];
        };
        Emitter.prototype.emitVarDeclVar = function () {
            if(this.varListCount() >= 0) {
                this.writeToOutput("var ");
                this.setInVarBlock(-this.varListCount());
            }
            return true;
        };
        Emitter.prototype.onEmitVar = function () {
            if(this.varListCount() > 0) {
                this.setInVarBlock(this.varListCount() - 1);
            } else {
                if(this.varListCount() < 0) {
                    this.setInVarBlock(this.varListCount() + 1);
                }
            }
        };
        Emitter.prototype.emitJavascriptVarDecl = function (varDecl, tokenId) {
            if((varDecl.varFlags & TypeScript.VarFlags.Ambient) == TypeScript.VarFlags.Ambient) {
                this.emitAmbientVarDecl(varDecl);
                this.onEmitVar();
            } else {
                var sym = varDecl.sym;
                var hasInitializer = (varDecl.init != null);
                this.emitParensAndCommentsInPlace(varDecl, true);
                this.recordSourceMappingStart(varDecl);
                if(sym && sym.isMember() && sym.container && (sym.container.kind() == TypeScript.SymbolKind.Type)) {
                    var type = (sym.container).type;
                    if(type.isClass() && (!TypeScript.hasFlag(sym.flags, TypeScript.SymbolFlags.ModuleMember))) {
                        if(this.emitState.container != EmitContainer.Args) {
                            if(TypeScript.hasFlag(sym.flags, TypeScript.SymbolFlags.Static)) {
                                this.writeToOutput(sym.container.name + ".");
                            } else {
                                this.writeToOutput("this.");
                            }
                        }
                    } else {
                        if(type.hasImplementation()) {
                            if(!TypeScript.hasFlag(sym.flags, TypeScript.SymbolFlags.Exported) && (sym.container == this.checker.gloMod || !TypeScript.hasFlag(sym.flags, TypeScript.SymbolFlags.Property))) {
                                this.emitVarDeclVar();
                            } else {
                                if(TypeScript.hasFlag(varDecl.varFlags, TypeScript.VarFlags.LocalStatic)) {
                                    this.writeToOutput(".");
                                } else {
                                    if(this.emitState.container == EmitContainer.DynamicModule) {
                                        this.writeToOutput("exports.");
                                    } else {
                                        this.writeToOutput(this.moduleName + ".");
                                    }
                                }
                            }
                        } else {
                            if(tokenId != TypeScript.TokenID.OpenParen) {
                                if(TypeScript.hasFlag(sym.flags, TypeScript.SymbolFlags.Exported) && sym.container == this.checker.gloMod) {
                                    this.writeToOutput("this.");
                                } else {
                                    this.emitVarDeclVar();
                                }
                            }
                        }
                    }
                } else {
                    if(tokenId != TypeScript.TokenID.OpenParen) {
                        this.emitVarDeclVar();
                    }
                }
                this.recordSourceMappingStart(varDecl.id);
                this.writeToOutput(varDecl.id.actualText);
                this.recordSourceMappingEnd(varDecl.id);
                if(hasInitializer) {
                    this.writeToOutputTrimmable(" = ");
                    this.varListCountStack.push(0);
                    this.emitJavascript(varDecl.init, TypeScript.TokenID.Comma, false);
                    this.varListCountStack.pop();
                }
                this.onEmitVar();
                if((tokenId != TypeScript.TokenID.OpenParen)) {
                    if(this.varListCount() < 0) {
                        this.writeToOutput(", ");
                    } else {
                        if(tokenId != TypeScript.TokenID.For) {
                            this.writeToOutputTrimmable(";");
                        }
                    }
                }
                this.recordSourceMappingEnd(varDecl);
                this.emitParensAndCommentsInPlace(varDecl, false);
            }
        };
        Emitter.prototype.declEnclosed = function (moduleDecl) {
            if(moduleDecl == null) {
                return true;
            }
            for(var i = 0, len = this.moduleDeclList.length; i < len; i++) {
                if(this.moduleDeclList[i] == moduleDecl) {
                    return true;
                }
            }
            return false;
        };
        Emitter.prototype.emitJavascriptName = function (name, addThis) {
            var sym = name.sym;
            this.emitParensAndCommentsInPlace(name, true);
            this.recordSourceMappingStart(name);
            if(!name.isMissing()) {
                if(addThis && (this.emitState.container != EmitContainer.Args) && sym) {
                    if(sym.container && (sym.container.name != TypeScript.globalId)) {
                        if(TypeScript.hasFlag(sym.flags, TypeScript.SymbolFlags.Static) && (TypeScript.hasFlag(sym.flags, TypeScript.SymbolFlags.Property))) {
                            if(sym.declModule && TypeScript.hasFlag(sym.declModule.modFlags, TypeScript.ModuleFlags.IsDynamic)) {
                                this.writeToOutput("exports.");
                            } else {
                                this.writeToOutput(sym.container.name + ".");
                            }
                        } else {
                            if(sym.kind() == TypeScript.SymbolKind.Field) {
                                var fieldSym = sym;
                                if(TypeScript.hasFlag(fieldSym.flags, TypeScript.SymbolFlags.ModuleMember)) {
                                    if((sym.container != this.checker.gloMod) && ((TypeScript.hasFlag(sym.flags, TypeScript.SymbolFlags.Property)) || TypeScript.hasFlag(sym.flags, TypeScript.SymbolFlags.Exported))) {
                                        if(TypeScript.hasFlag(sym.declModule.modFlags, TypeScript.ModuleFlags.IsDynamic)) {
                                            this.writeToOutput("exports.");
                                        } else {
                                            this.writeToOutput(sym.container.name + ".");
                                        }
                                    }
                                } else {
                                    if(sym.isInstanceProperty()) {
                                        this.emitThis();
                                        this.writeToOutput(".");
                                    }
                                }
                            } else {
                                if(sym.kind() == TypeScript.SymbolKind.Type) {
                                    if(sym.isInstanceProperty()) {
                                        var typeSym = sym;
                                        var type = typeSym.type;
                                        if(type.call && !TypeScript.hasFlag(sym.flags, TypeScript.SymbolFlags.ModuleMember)) {
                                            this.emitThis();
                                            this.writeToOutput(".");
                                        }
                                    } else {
                                        if((sym.unitIndex != this.checker.locationInfo.unitIndex) || (!this.declEnclosed(sym.declModule))) {
                                            this.writeToOutput(sym.container.name + ".");
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        if(sym.container == this.checker.gloMod && TypeScript.hasFlag(sym.flags, TypeScript.SymbolFlags.Exported) && !TypeScript.hasFlag(sym.flags, TypeScript.SymbolFlags.Ambient) && !((sym.isType() || sym.isMember()) && sym.declModule && TypeScript.hasFlag(sym.declModule.modFlags, TypeScript.ModuleFlags.Ambient)) && this.emitState.container == EmitContainer.Prog && sym.declAST.nodeType != TypeScript.NodeType.FuncDecl) {
                            this.writeToOutput("this.");
                        }
                    }
                }
                if(sym && sym.declAST && sym.declAST.nodeType == TypeScript.NodeType.ModuleDeclaration && (TypeScript.hasFlag((sym.declAST).modFlags, TypeScript.ModuleFlags.IsDynamic))) {
                    var moduleDecl = sym.declAST;
                    if(TypeScript.moduleGenTarget == TypeScript.ModuleGenTarget.Asynchronous) {
                        this.writeLineToOutput("__" + this.modAliasId + "__;");
                    } else {
                        var modPath = name.actualText;
                        var isAmbient = moduleDecl.mod.symbol.declAST && TypeScript.hasFlag((moduleDecl.mod.symbol.declAST).modFlags, TypeScript.ModuleFlags.Ambient);
                        modPath = isAmbient ? modPath : this.firstModAlias ? this.firstModAlias : TypeScript.quoteBaseName(modPath);
                        modPath = isAmbient ? modPath : (!TypeScript.isRelative(TypeScript.stripQuotes(modPath)) ? TypeScript.quoteStr("./" + TypeScript.stripQuotes(modPath)) : modPath);
                        this.writeToOutput("require(" + modPath + ")");
                    }
                } else {
                    this.writeToOutput(name.actualText);
                }
            }
            this.recordSourceMappingEnd(name);
            this.emitParensAndCommentsInPlace(name, false);
        };
        Emitter.prototype.emitJavascriptStatements = function (stmts, emitEmptyBod) {
            if(stmts) {
                if(stmts.nodeType != TypeScript.NodeType.Block) {
                    var hasContents = (stmts && (stmts.nodeType != TypeScript.NodeType.List || ((stmts).members.length > 0)));
                    if(emitEmptyBod || hasContents) {
                        var hasOnlyBlockStatement = ((stmts.nodeType == TypeScript.NodeType.Block) || ((stmts.nodeType == TypeScript.NodeType.List) && ((stmts).members.length == 1) && ((stmts).members[0].nodeType == TypeScript.NodeType.Block)));
                        this.recordSourceMappingStart(stmts);
                        if(!hasOnlyBlockStatement) {
                            this.writeLineToOutput(" {");
                            this.indenter.increaseIndent();
                        }
                        this.emitJavascriptList(stmts, null, TypeScript.TokenID.Semicolon, true, false, false);
                        if(!hasOnlyBlockStatement) {
                            this.writeLineToOutput("");
                            this.indenter.decreaseIndent();
                            this.emitIndent();
                            this.writeToOutput("}");
                        }
                        this.recordSourceMappingEnd(stmts);
                    }
                } else {
                    this.emitJavascript(stmts, TypeScript.TokenID.Semicolon, true);
                }
            } else {
                if(emitEmptyBod) {
                    this.writeToOutput("{ }");
                }
            }
        };
        Emitter.prototype.emitBareJavascriptStatements = function (stmts, emitClassPropertiesAfterSuperCall) {
            if (typeof emitClassPropertiesAfterSuperCall === "undefined") { emitClassPropertiesAfterSuperCall = false; }
            if(stmts.nodeType != TypeScript.NodeType.Block) {
                if(stmts.nodeType == TypeScript.NodeType.List) {
                    var stmtList = stmts;
                    if((stmtList.members.length == 2) && (stmtList.members[0].nodeType == TypeScript.NodeType.Block) && (stmtList.members[1].nodeType == TypeScript.NodeType.EndCode)) {
                        this.emitJavascript(stmtList.members[0], TypeScript.TokenID.Semicolon, true);
                        this.writeLineToOutput("");
                    } else {
                        this.emitJavascriptList(stmts, null, TypeScript.TokenID.Semicolon, true, false, emitClassPropertiesAfterSuperCall);
                    }
                } else {
                    this.emitJavascript(stmts, TypeScript.TokenID.Semicolon, true);
                }
            } else {
                this.emitJavascript(stmts, TypeScript.TokenID.Semicolon, true);
            }
        };
        Emitter.prototype.recordSourceMappingNameStart = function (name) {
            if(this.sourceMapper) {
                var finalName = name;
                if(!name) {
                    finalName = "";
                } else {
                    if(this.sourceMapper.currentNameIndex.length > 0) {
                        finalName = this.sourceMapper.names[this.sourceMapper.currentNameIndex.length - 1] + "." + name;
                    }
                }
                this.sourceMapper.names.push(finalName);
                this.sourceMapper.currentNameIndex.push(this.sourceMapper.names.length - 1);
            }
        };
        Emitter.prototype.recordSourceMappingNameEnd = function () {
            if(this.sourceMapper) {
                this.sourceMapper.currentNameIndex.pop();
            }
        };
        Emitter.prototype.recordSourceMappingStart = function (ast) {
            if(this.sourceMapper && TypeScript.isValidAstNode(ast)) {
                var lineCol = {
                    line: -1,
                    col: -1
                };
                var sourceMapping = new TypeScript.SourceMapping();
                sourceMapping.start.emittedColumn = this.emitState.column;
                sourceMapping.start.emittedLine = this.emitState.line;
                TypeScript.getSourceLineColFromMap(lineCol, ast.minChar, this.checker.locationInfo.lineMap);
                sourceMapping.start.sourceColumn = lineCol.col;
                sourceMapping.start.sourceLine = lineCol.line;
                TypeScript.getSourceLineColFromMap(lineCol, ast.limChar, this.checker.locationInfo.lineMap);
                sourceMapping.end.sourceColumn = lineCol.col;
                sourceMapping.end.sourceLine = lineCol.line;
                if(this.sourceMapper.currentNameIndex.length > 0) {
                    sourceMapping.nameIndex = this.sourceMapper.currentNameIndex[this.sourceMapper.currentNameIndex.length - 1];
                }
                var siblings = this.sourceMapper.currentMappings[this.sourceMapper.currentMappings.length - 1];
                siblings.push(sourceMapping);
                this.sourceMapper.currentMappings.push(sourceMapping.childMappings);
            }
        };
        Emitter.prototype.recordSourceMappingEnd = function (ast) {
            if(this.sourceMapper && TypeScript.isValidAstNode(ast)) {
                this.sourceMapper.currentMappings.pop();
                var siblings = this.sourceMapper.currentMappings[this.sourceMapper.currentMappings.length - 1];
                var sourceMapping = siblings[siblings.length - 1];
                sourceMapping.end.emittedColumn = this.emitState.column;
                sourceMapping.end.emittedLine = this.emitState.line;
            }
        };
        Emitter.prototype.Close = function () {
            if(this.sourceMapper != null) {
                TypeScript.SourceMapper.EmitSourceMapping(this.allSourceMappers);
            }
            try  {
                this.outfile.Close();
            } catch (ex) {
                this.errorReporter.emitterError(null, ex.message);
            }
        };
        Emitter.prototype.emitJavascriptList = function (ast, delimiter, tokenId, startLine, onlyStatics, emitClassPropertiesAfterSuperCall, emitPrologue, requiresExtendsBlock) {
            if (typeof emitClassPropertiesAfterSuperCall === "undefined") { emitClassPropertiesAfterSuperCall = false; }
            if (typeof emitPrologue === "undefined") { emitPrologue = false; }
            if(ast == null) {
                return;
            } else {
                if(ast.nodeType != TypeScript.NodeType.List) {
                    this.emitPrologue(emitPrologue);
                    this.emitJavascript(ast, tokenId, startLine);
                } else {
                    var list = ast;
                    if(list.members.length == 0) {
                        return;
                    }
                    this.emitParensAndCommentsInPlace(ast, true);
                    var len = list.members.length;
                    for(var i = 0; i < len; i++) {
                        if(emitPrologue) {
                            if(i == 1 || !TypeScript.hasFlag(list.flags, TypeScript.ASTFlags.StrictMode)) {
                                this.emitPrologue(requiresExtendsBlock);
                                emitPrologue = false;
                            }
                        }
                        if(i == 1 && emitClassPropertiesAfterSuperCall) {
                            var constructorDecl = (this.thisClassNode).constructorDecl;
                            if(constructorDecl && constructorDecl.arguments) {
                                var argsLen = constructorDecl.arguments.members.length;
                                for(var iArg = 0; iArg < argsLen; iArg++) {
                                    var arg = constructorDecl.arguments.members[iArg];
                                    if((arg.varFlags & TypeScript.VarFlags.Property) != TypeScript.VarFlags.None) {
                                        this.emitIndent();
                                        this.recordSourceMappingStart(arg);
                                        this.recordSourceMappingStart(arg.id);
                                        this.writeToOutput("this." + arg.id.actualText);
                                        this.recordSourceMappingEnd(arg.id);
                                        this.writeToOutput(" = ");
                                        this.recordSourceMappingStart(arg.id);
                                        this.writeToOutput(arg.id.actualText);
                                        this.recordSourceMappingEnd(arg.id);
                                        this.writeLineToOutput(";");
                                        this.recordSourceMappingEnd(arg);
                                    }
                                }
                            }
                            var nProps = (this.thisClassNode.members).members.length;
                            for(var iMember = 0; iMember < nProps; iMember++) {
                                if((this.thisClassNode.members).members[iMember].nodeType == TypeScript.NodeType.VarDecl) {
                                    var varDecl = (this.thisClassNode.members).members[iMember];
                                    if(!TypeScript.hasFlag(varDecl.varFlags, TypeScript.VarFlags.Static) && varDecl.init) {
                                        this.emitIndent();
                                        this.emitJavascriptVarDecl(varDecl, TypeScript.TokenID.Tilde);
                                        this.writeLineToOutput("");
                                    }
                                }
                            }
                        }
                        var emitNode = list.members[i];
                        var isStaticDecl = (emitNode.nodeType == TypeScript.NodeType.FuncDecl && TypeScript.hasFlag((emitNode).fncFlags, TypeScript.FncFlags.Static)) || (emitNode.nodeType == TypeScript.NodeType.VarDecl && TypeScript.hasFlag((emitNode).varFlags, TypeScript.VarFlags.Static));
                        if(onlyStatics ? !isStaticDecl : isStaticDecl) {
                            continue;
                        }
                        this.emitJavascript(emitNode, tokenId, startLine);
                        if(delimiter && (i < (len - 1))) {
                            if(startLine) {
                                this.writeLineToOutput(delimiter);
                            } else {
                                this.writeToOutput(delimiter);
                            }
                        } else {
                            if(startLine && (emitNode.nodeType != TypeScript.NodeType.ModuleDeclaration) && (emitNode.nodeType != TypeScript.NodeType.InterfaceDeclaration) && (!((emitNode.nodeType == TypeScript.NodeType.VarDecl) && ((((emitNode).varFlags) & TypeScript.VarFlags.Ambient) == TypeScript.VarFlags.Ambient) && (((emitNode).init) == null)) && this.varListCount() >= 0) && (emitNode.nodeType != TypeScript.NodeType.Block || (emitNode).isStatementBlock) && (emitNode.nodeType != TypeScript.NodeType.EndCode) && (emitNode.nodeType != TypeScript.NodeType.FuncDecl)) {
                                this.writeLineToOutput("");
                            }
                        }
                    }
                    this.emitParensAndCommentsInPlace(ast, false);
                }
            }
        };
        Emitter.prototype.emitJavascript = function (ast, tokenId, startLine) {
            if(ast == null) {
                return;
            }
            if(startLine && (this.indenter.indentAmt > 0) && (ast.nodeType != TypeScript.NodeType.List) && (ast.nodeType != TypeScript.NodeType.Block)) {
                if((ast.nodeType != TypeScript.NodeType.InterfaceDeclaration) && (!((ast.nodeType == TypeScript.NodeType.VarDecl) && ((((ast).varFlags) & TypeScript.VarFlags.Ambient) == TypeScript.VarFlags.Ambient) && (((ast).init) == null)) && this.varListCount() >= 0) && (ast.nodeType != TypeScript.NodeType.EndCode) && ((ast.nodeType != TypeScript.NodeType.FuncDecl) || (this.emitState.container != EmitContainer.Constructor))) {
                    this.emitIndent();
                }
            }
            ast.emit(this, tokenId, startLine);
            if((tokenId == TypeScript.TokenID.Semicolon) && (ast.nodeType < TypeScript.NodeType.GeneralNode)) {
                this.writeToOutput(";");
            }
        };
        Emitter.prototype.emitPropertyAccessor = function (funcDecl, className, isProto) {
            if(!(funcDecl.accessorSymbol).hasBeenEmitted) {
                var accessorSymbol = funcDecl.accessorSymbol;
                this.emitIndent();
                this.recordSourceMappingStart(funcDecl);
                this.writeLineToOutput("Object.defineProperty(" + className + (isProto ? ".prototype, \"" : ", \"") + funcDecl.name.actualText + "\"" + ", {");
                this.indenter.increaseIndent();
                if(accessorSymbol.getter) {
                    var getter = accessorSymbol.getter.declAST;
                    this.emitIndent();
                    this.recordSourceMappingStart(getter);
                    this.writeToOutput("get: ");
                    this.emitInnerFunction(getter, false, isProto, null, Emitter.shouldCaptureThis(getter), null);
                    this.writeLineToOutput(",");
                }
                if(accessorSymbol.setter) {
                    var setter = accessorSymbol.setter.declAST;
                    this.emitIndent();
                    this.recordSourceMappingStart(setter);
                    this.writeToOutput("set: ");
                    this.emitInnerFunction(setter, false, isProto, null, Emitter.shouldCaptureThis(setter), null);
                    this.writeLineToOutput(",");
                }
                this.emitIndent();
                this.writeLineToOutput("enumerable: true,");
                this.emitIndent();
                this.writeLineToOutput("configurable: true");
                this.indenter.decreaseIndent();
                this.emitIndent();
                this.writeLineToOutput("});");
                this.recordSourceMappingEnd(funcDecl);
                accessorSymbol.hasBeenEmitted = true;
            }
        };
        Emitter.prototype.emitPrototypeMember = function (member, className) {
            if(member.nodeType == TypeScript.NodeType.FuncDecl) {
                var funcDecl = member;
                if(funcDecl.isAccessor()) {
                    this.emitPropertyAccessor(funcDecl, className, true);
                } else {
                    this.emitIndent();
                    this.recordSourceMappingStart(funcDecl);
                    this.writeToOutput(className + ".prototype." + funcDecl.getNameText() + " = ");
                    this.emitInnerFunction(funcDecl, false, true, null, Emitter.shouldCaptureThis(funcDecl), null);
                    this.writeLineToOutput(";");
                }
            } else {
                if(member.nodeType == TypeScript.NodeType.VarDecl) {
                    var varDecl = member;
                    if(varDecl.init) {
                        this.emitIndent();
                        this.recordSourceMappingStart(varDecl);
                        this.recordSourceMappingStart(varDecl.id);
                        this.writeToOutput(className + ".prototype." + varDecl.id.actualText);
                        this.recordSourceMappingEnd(varDecl.id);
                        this.writeToOutput(" = ");
                        this.emitJavascript(varDecl.init, TypeScript.TokenID.Equals, false);
                        this.recordSourceMappingEnd(varDecl);
                        this.writeLineToOutput(";");
                    }
                }
            }
        };
        Emitter.prototype.emitAddBaseMethods = function (className, base, classDecl) {
            if(base.members) {
                var baseSymbol = base.symbol;
                var baseName = baseSymbol.name;
                if(baseSymbol.declModule != classDecl.type.symbol.declModule) {
                    baseName = baseSymbol.fullName();
                }
                base.members.allMembers.map(function (key, s, c) {
                    var sym = s;
                    if((sym.kind() == TypeScript.SymbolKind.Type) && (sym).type.call) {
                        this.recordSourceMappingStart(sym.declAST);
                        this.writeLineToOutput(className + ".prototype." + sym.name + " = " + baseName + ".prototype." + sym.name + ";");
                        this.recordSourceMappingEnd(sym.declAST);
                    }
                }, null);
            }
            if(base.extendsList) {
                for(var i = 0, len = base.extendsList.length; i < len; i++) {
                    this.emitAddBaseMethods(className, base.extendsList[i], classDecl);
                }
            }
        };
        Emitter.prototype.emitJavascriptClass = function (classDecl) {
            if(!TypeScript.hasFlag(classDecl.varFlags, TypeScript.VarFlags.Ambient)) {
                var svClassNode = this.thisClassNode;
                var i = 0;
                this.thisClassNode = classDecl;
                var className = classDecl.name.actualText;
                this.emitParensAndCommentsInPlace(classDecl, true);
                var temp = this.setContainer(EmitContainer.Class);
                this.recordSourceMappingStart(classDecl);
                if(TypeScript.hasFlag(classDecl.varFlags, TypeScript.VarFlags.Exported) && classDecl.type.symbol.container == this.checker.gloMod) {
                    this.writeToOutput("this." + className);
                } else {
                    this.writeToOutput("var " + className);
                }
                var hasBaseClass = classDecl.extendsList && classDecl.extendsList.members.length;
                var baseNameDecl = null;
                var baseName = null;
                if(hasBaseClass) {
                    this.writeLineToOutput(" = (function (_super) {");
                } else {
                    this.writeLineToOutput(" = (function () {");
                }
                this.recordSourceMappingNameStart(className);
                this.indenter.increaseIndent();
                if(hasBaseClass) {
                    baseNameDecl = classDecl.extendsList.members[0];
                    baseName = baseNameDecl.nodeType == TypeScript.NodeType.Call ? (baseNameDecl).target : baseNameDecl;
                    this.emitIndent();
                    this.writeLineToOutput("__extends(" + className + ", _super);");
                }
                this.emitIndent();
                var constrDecl = classDecl.constructorDecl;
                if(constrDecl) {
                    this.emitJavascript(classDecl.constructorDecl, TypeScript.TokenID.OpenParen, false);
                } else {
                    var wroteProps = 0;
                    this.recordSourceMappingStart(classDecl);
                    this.indenter.increaseIndent();
                    this.writeToOutput("function " + classDecl.name.actualText + "() {");
                    this.recordSourceMappingNameStart("constructor");
                    if(hasBaseClass) {
                        this.writeLineToOutput("");
                        this.emitIndent();
                        this.writeLineToOutput("_super.apply(this, arguments);");
                        wroteProps++;
                    }
                    if(classDecl.varFlags & TypeScript.VarFlags.MustCaptureThis) {
                        this.writeCaptureThisStatement(classDecl);
                    }
                    var members = (this.thisClassNode.members).members;
                    for(var i = 0; i < members.length; i++) {
                        if(members[i].nodeType == TypeScript.NodeType.VarDecl) {
                            var varDecl = members[i];
                            if(!TypeScript.hasFlag(varDecl.varFlags, TypeScript.VarFlags.Static) && varDecl.init) {
                                this.writeLineToOutput("");
                                this.emitIndent();
                                this.emitJavascriptVarDecl(varDecl, TypeScript.TokenID.Tilde);
                                wroteProps++;
                            }
                        }
                    }
                    if(wroteProps) {
                        this.writeLineToOutput("");
                        this.indenter.decreaseIndent();
                        this.emitIndent();
                        this.writeLineToOutput("}");
                    } else {
                        this.writeLineToOutput(" }");
                        this.indenter.decreaseIndent();
                    }
                    this.recordSourceMappingNameEnd();
                    this.recordSourceMappingEnd(classDecl);
                }
                var membersLen = classDecl.members.members.length;
                for(var j = 0; j < membersLen; j++) {
                    var memberDecl = classDecl.members.members[j];
                    if(memberDecl.nodeType == TypeScript.NodeType.FuncDecl) {
                        var fn = memberDecl;
                        if(TypeScript.hasFlag(fn.fncFlags, TypeScript.FncFlags.Method) && !fn.isSignature()) {
                            if(!TypeScript.hasFlag(fn.fncFlags, TypeScript.FncFlags.Static)) {
                                this.emitPrototypeMember(fn, className);
                            } else {
                                if(fn.isAccessor()) {
                                    this.emitPropertyAccessor(fn, this.thisClassNode.name.actualText, false);
                                } else {
                                    this.emitIndent();
                                    this.recordSourceMappingStart(fn);
                                    this.writeToOutput(classDecl.name.actualText + "." + fn.name.actualText + " = ");
                                    this.emitInnerFunction(fn, (fn.name && !fn.name.isMissing()), true, null, Emitter.shouldCaptureThis(fn), null);
                                    this.writeLineToOutput(";");
                                }
                            }
                        }
                    } else {
                        if(memberDecl.nodeType == TypeScript.NodeType.VarDecl) {
                            var varDecl = memberDecl;
                            if(TypeScript.hasFlag(varDecl.varFlags, TypeScript.VarFlags.Static)) {
                                if(varDecl.init) {
                                    this.emitIndent();
                                    this.recordSourceMappingStart(varDecl);
                                    this.writeToOutput(classDecl.name.actualText + "." + varDecl.id.actualText + " = ");
                                    this.emitJavascript(varDecl.init, TypeScript.TokenID.Equals, false);
                                    this.writeLineToOutput(";");
                                    this.recordSourceMappingEnd(varDecl);
                                }
                            }
                        } else {
                            throw Error("We want to catch this");
                        }
                    }
                }
                this.emitIndent();
                this.recordSourceMappingStart(classDecl.endingToken);
                this.writeLineToOutput("return " + className + ";");
                this.recordSourceMappingEnd(classDecl.endingToken);
                this.indenter.decreaseIndent();
                this.emitIndent();
                this.recordSourceMappingStart(classDecl.endingToken);
                this.writeToOutput("}");
                this.recordSourceMappingNameEnd();
                this.recordSourceMappingEnd(classDecl.endingToken);
                this.recordSourceMappingStart(classDecl);
                this.writeToOutput(")(");
                if(hasBaseClass) {
                    this.emitJavascript(baseName, TypeScript.TokenID.Tilde, false);
                }
                this.writeToOutput(");");
                this.recordSourceMappingEnd(classDecl);
                if((temp == EmitContainer.Module || temp == EmitContainer.DynamicModule) && TypeScript.hasFlag(classDecl.varFlags, TypeScript.VarFlags.Exported)) {
                    this.writeLineToOutput("");
                    this.emitIndent();
                    var modName = temp == EmitContainer.Module ? this.moduleName : "exports";
                    this.recordSourceMappingStart(classDecl);
                    this.writeToOutput(modName + "." + className + " = " + className + ";");
                    this.recordSourceMappingEnd(classDecl);
                }
                this.emitIndent();
                this.recordSourceMappingEnd(classDecl);
                this.emitParensAndCommentsInPlace(classDecl, false);
                this.setContainer(temp);
                this.thisClassNode = svClassNode;
            }
        };
        Emitter.prototype.emitPrologue = function (reqInherits) {
            if(!this.prologueEmitted) {
                if(reqInherits) {
                    this.prologueEmitted = true;
                    this.writeLineToOutput("var __extends = this.__extends || function (d, b) {");
                    this.writeLineToOutput("    function __() { this.constructor = d; }");
                    this.writeLineToOutput("    __.prototype = b.prototype;");
                    this.writeLineToOutput("    d.prototype = new __();");
                    this.writeLineToOutput("};");
                }
                if(this.checker.mustCaptureGlobalThis) {
                    this.prologueEmitted = true;
                    this.writeLineToOutput(this.captureThisStmtString);
                }
            }
        };
        Emitter.prototype.emitSuperReference = function () {
            this.writeToOutput("_super.prototype");
        };
        Emitter.prototype.emitSuperCall = function (callEx) {
            if(callEx.target.nodeType == TypeScript.NodeType.Dot) {
                var dotNode = callEx.target;
                if(dotNode.operand1.nodeType == TypeScript.NodeType.Super) {
                    this.emitJavascript(dotNode, TypeScript.TokenID.OpenParen, false);
                    this.writeToOutput(".call(");
                    this.emitThis();
                    if(callEx.arguments && callEx.arguments.members.length > 0) {
                        this.writeToOutput(", ");
                        this.emitJavascriptList(callEx.arguments, ", ", TypeScript.TokenID.Comma, false, false, false);
                    }
                    this.writeToOutput(")");
                    return true;
                }
            }
            return false;
        };
        Emitter.prototype.emitThis = function () {
            if(this.thisFnc && !this.thisFnc.isMethod() && (!this.thisFnc.isConstructor)) {
                this.writeToOutput("_this");
            } else {
                this.writeToOutput("this");
            }
        };
        Emitter.shouldCaptureThis = function shouldCaptureThis(func) {
            return func.hasSelfReference() || func.hasSuperReferenceInFatArrowFunction();
        }
        Emitter.prototype.createFile = function (fileName, useUTF8) {
            try  {
                return this.emitOptions.ioHost.createFile(fileName, useUTF8);
            } catch (ex) {
                this.errorReporter.emitterError(null, ex.message);
            }
        };
        return Emitter;
    })();
    TypeScript.Emitter = Emitter;    
})(TypeScript || (TypeScript = {}));
var TypeScript;
(function (TypeScript) {
    var ErrorReporter = (function () {
        function ErrorReporter(outfile) {
            this.outfile = outfile;
            this.parser = null;
            this.checker = null;
            this.lineCol = {
                line: 0,
                col: 0
            };
            this.emitAsComments = true;
            this.hasErrors = false;
            this.pushToErrorSink = false;
            this.errorSink = [];
        }
        ErrorReporter.prototype.getCapturedErrors = function () {
            return this.errorSink;
        };
        ErrorReporter.prototype.freeCapturedErrors = function () {
            this.errorSink = [];
        };
        ErrorReporter.prototype.captureError = function (emsg) {
            this.errorSink[this.errorSink.length] = emsg;
        };
        ErrorReporter.prototype.setErrOut = function (outerr) {
            this.outfile = outerr;
            this.emitAsComments = false;
        };
        ErrorReporter.prototype.emitPrefix = function () {
            if(this.emitAsComments) {
                this.outfile.Write("// ");
            }
            this.outfile.Write(this.checker.locationInfo.filename + "(" + this.lineCol.line + "," + this.lineCol.col + "): ");
        };
        ErrorReporter.prototype.writePrefix = function (ast) {
            if(ast) {
                this.setError(ast);
            } else {
                this.lineCol.line = 0;
                this.lineCol.col = 0;
            }
            this.emitPrefix();
        };
        ErrorReporter.prototype.writePrefixFromSym = function (symbol) {
            if(symbol && this.checker.locationInfo.lineMap) {
                TypeScript.getSourceLineColFromMap(this.lineCol, symbol.location, this.checker.locationInfo.lineMap);
            } else {
                this.lineCol.line = -1;
                this.lineCol.col = -1;
            }
            this.emitPrefix();
        };
        ErrorReporter.prototype.setError = function (ast) {
            if(ast) {
                ast.flags |= TypeScript.ASTFlags.Error;
                if(this.checker.locationInfo.lineMap) {
                    TypeScript.getSourceLineColFromMap(this.lineCol, ast.minChar, this.checker.locationInfo.lineMap);
                }
            }
        };
        ErrorReporter.prototype.reportError = function (ast, message) {
            if(this.pushToErrorSink) {
                this.captureError(message);
                return;
            }
            this.hasErrors = true;
            if(ast && this.parser.errorRecovery && this.parser.errorCallback) {
                var len = (ast.limChar - ast.minChar);
                this.parser.errorCallback(ast.minChar, len, message, this.checker.locationInfo.unitIndex);
            } else {
                this.writePrefix(ast);
                this.outfile.WriteLine(message);
            }
        };
        ErrorReporter.prototype.reportErrorFromSym = function (symbol, message) {
            if(this.pushToErrorSink) {
                this.captureError(message);
                return;
            }
            this.hasErrors = true;
            if(this.parser.errorRecovery && this.parser.errorCallback) {
                this.parser.errorCallback(symbol.location, symbol.length, message, this.checker.locationInfo.unitIndex);
            } else {
                this.writePrefixFromSym(symbol);
                this.outfile.WriteLine(message);
            }
        };
        ErrorReporter.prototype.emitterError = function (ast, message) {
            this.reportError(ast, message);
            throw Error("EmitError");
        };
        ErrorReporter.prototype.duplicateIdentifier = function (ast, name) {
            this.reportError(ast, "Duplicate identifier '" + name + "'");
        };
        ErrorReporter.prototype.showRef = function (ast, text, symbol) {
            var defLineCol = {
                line: -1,
                col: -1
            };
            this.parser.getSourceLineCol(defLineCol, symbol.location);
            this.reportError(ast, "symbol " + text + " defined at (" + defLineCol.line + "," + defLineCol.col + ")");
        };
        ErrorReporter.prototype.unresolvedSymbol = function (ast, name) {
            this.reportError(ast, "The name '" + name + "' does not exist in the current scope");
        };
        ErrorReporter.prototype.symbolDoesNotReferToAValue = function (ast, name) {
            this.reportError(ast, "The name '" + name + "' does not refer to a value");
        };
        ErrorReporter.prototype.styleError = function (ast, msg) {
            var bkThrow = this.pushToErrorSink;
            this.pushToErrorSink = false;
            this.reportError(ast, "STYLE: " + msg);
            this.pushToErrorSink = bkThrow;
        };
        ErrorReporter.prototype.simpleError = function (ast, msg) {
            this.reportError(ast, msg);
        };
        ErrorReporter.prototype.simpleErrorFromSym = function (sym, msg) {
            this.reportErrorFromSym(sym, msg);
        };
        ErrorReporter.prototype.invalidSuperReference = function (ast) {
            this.simpleError(ast, "Keyword 'super' can only be used inside a class instance method");
        };
        ErrorReporter.prototype.valueCannotBeModified = function (ast) {
            this.simpleError(ast, "The left-hand side of an assignment expression must be a variable, property or indexer");
        };
        ErrorReporter.prototype.invalidCall = function (ast, nodeType, scope) {
            var targetType = ast.target.type;
            var typeName = targetType.getScopedTypeName(scope);
            if(targetType.construct && (nodeType == TypeScript.NodeType.Call)) {
                this.reportError(ast, "Value of type '" + typeName + "' is not callable.  Did you mean to include 'new'?");
            } else {
                var catString = (nodeType == TypeScript.NodeType.Call) ? "callable" : "newable";
                this.reportError(ast, "Value of type '" + typeName + "' is not " + catString);
            }
        };
        ErrorReporter.prototype.indexLHS = function (ast, scope) {
            var targetType = ast.operand1.type.getScopedTypeName(scope);
            var indexType = ast.operand2.type.getScopedTypeName(scope);
            this.simpleError(ast, "Value of type '" + targetType + "' is not indexable by type '" + indexType + "'");
        };
        ErrorReporter.prototype.incompatibleTypes = function (ast, t1, t2, op, scope, comparisonInfo) {
            if(!t1) {
                t1 = this.checker.anyType;
            }
            if(!t2) {
                t2 = this.checker.anyType;
            }
            var reason = comparisonInfo ? comparisonInfo.message : "";
            if(op) {
                this.reportError(ast, "Operator '" + op + "' cannot be applied to types '" + t1.getScopedTypeName(scope) + "' and '" + t2.getScopedTypeName(scope) + "'" + (reason ? ": " + reason : ""));
            } else {
                this.reportError(ast, "Cannot convert '" + t1.getScopedTypeName(scope) + "' to '" + t2.getScopedTypeName(scope) + "'" + (reason ? ": " + reason : ""));
            }
        };
        ErrorReporter.prototype.expectedClassOrInterface = function (ast) {
            this.simpleError(ast, "Expected var, class, interface, or module");
        };
        ErrorReporter.prototype.unaryOperatorTypeError = function (ast, op, type) {
            this.reportError(ast, "Operator '" + op + "' cannot be applied to type '" + type.getTypeName() + "'");
        };
        return ErrorReporter;
    })();
    TypeScript.ErrorReporter = ErrorReporter;    
})(TypeScript || (TypeScript = {}));
var TypeScript;
(function (TypeScript) {
    (function (TypeContext) {
        TypeContext._map = [];
        TypeContext.NoTypes = 0;
        TypeContext.ArraySuffix = 1;
        TypeContext.Primitive = 2;
        TypeContext.Named = 4;
        TypeContext.AllSimpleTypes = TypeContext.Primitive | TypeContext.Named;
        TypeContext.AllTypes = TypeContext.Primitive | TypeContext.Named | TypeContext.ArraySuffix;
    })(TypeScript.TypeContext || (TypeScript.TypeContext = {}));
    var TypeContext = TypeScript.TypeContext;
    (function (ParseState) {
        ParseState._map = [];
        ParseState._map[0] = "None";
        ParseState.None = 0;
        ParseState._map[1] = "StartScript";
        ParseState.StartScript = 1;
        ParseState._map[2] = "StartStatementList";
        ParseState.StartStatementList = 2;
        ParseState._map[3] = "StartStatement";
        ParseState.StartStatement = 3;
        ParseState._map[4] = "StartFncDecl";
        ParseState.StartFncDecl = 4;
        ParseState._map[5] = "FncDeclName";
        ParseState.FncDeclName = 5;
        ParseState._map[6] = "FncDeclArgs";
        ParseState.FncDeclArgs = 6;
        ParseState._map[7] = "FncDeclReturnType";
        ParseState.FncDeclReturnType = 7;
        ParseState._map[8] = "ForInit";
        ParseState.ForInit = 8;
        ParseState._map[9] = "ForInitAfterVar";
        ParseState.ForInitAfterVar = 9;
        ParseState._map[10] = "ForCondStart";
        ParseState.ForCondStart = 10;
        ParseState._map[11] = "EndStmtList";
        ParseState.EndStmtList = 11;
        ParseState._map[12] = "EndScript";
        ParseState.EndScript = 12;
    })(TypeScript.ParseState || (TypeScript.ParseState = {}));
    var ParseState = TypeScript.ParseState;
    var QuickParseResult = (function () {
        function QuickParseResult(Script, endLexState) {
            this.Script = Script;
            this.endLexState = endLexState;
        }
        return QuickParseResult;
    })();
    TypeScript.QuickParseResult = QuickParseResult;    
    var Parser = (function () {
        function Parser() {
            this.varLists = [];
            this.scopeLists = [];
            this.staticsLists = [];
            this.scanner = new TypeScript.Scanner();
            this.currentToken = null;
            this.needTerminator = false;
            this.inFunction = false;
            this.inInterfaceDecl = false;
            this.currentClassDecl = null;
            this.inFncDecl = false;
            this.anonId = new TypeScript.Identifier("_anonymous");
            this.style_requireSemi = false;
            this.style_funcInLoop = true;
            this.incremental = false;
            this.errorRecovery = false;
            this.outfile = undefined;
            this.errorCallback = null;
            this.state = ParseState.StartStatementList;
            this.ambientModule = false;
            this.ambientClass = false;
            this.topLevel = true;
            this.allowImportDeclaration = true;
            this.currentUnitIndex = (-1);
            this.prevIDTok = null;
            this.statementInfoStack = new Array();
            this.hasTopLevelImportOrExport = false;
            this.strictMode = false;
            this.nestingLevel = 0;
            this.prevExpr = null;
            this.currentClassDefinition = null;
            this.parsingClassConstructorDefinition = false;
            this.parsingDeclareFile = false;
            this.amdDependencies = [];
            this.inferPropertiesFromThisAssignment = false;
            this.requiresExtendsBlock = false;
            this.fname = "";
        }
        Parser.prototype.resetStmtStack = function () {
            this.statementInfoStack = new Array();
        };
        Parser.prototype.inLoop = function () {
            for(var j = this.statementInfoStack.length - 1; j >= 0; j--) {
                if(this.statementInfoStack[j].stmt.isLoop()) {
                    return true;
                }
            }
            return false;
        };
        Parser.prototype.pushStmt = function (stmt, labels) {
            var info = {
                stmt: stmt,
                labels: labels
            };
            this.statementInfoStack.push(info);
        };
        Parser.prototype.popStmt = function () {
            return this.statementInfoStack.pop();
        };
        Parser.prototype.resolveJumpTarget = function (jump) {
            var resolvedTarget = TypeScript.AST.getResolvedIdentifierName(jump.target);
            var len = this.statementInfoStack.length;
            for(var i = len - 1; i >= 0; i--) {
                var info = this.statementInfoStack[i];
                if(jump.target) {
                    if(info.labels && (info.labels.members.length > 0)) {
                        for(var j = 0, labLen = info.labels.members.length; j < labLen; j++) {
                            var label = info.labels.members[j];
                            if(label.id.text == resolvedTarget) {
                                jump.setResolvedTarget(this, info.stmt);
                                return;
                            }
                        }
                    }
                } else {
                    if(info.stmt.isLoop()) {
                        jump.setResolvedTarget(this, info.stmt);
                        return;
                    } else {
                        if((info.stmt.nodeType == TypeScript.NodeType.Switch) && (jump.nodeType == TypeScript.NodeType.Break)) {
                            jump.setResolvedTarget(this, info.stmt);
                            return;
                        }
                    }
                }
            }
            if(jump.target) {
                this.reportParseError("could not find enclosing statement with label " + jump.target);
            } else {
                if(jump.nodeType == TypeScript.NodeType.Break) {
                    this.reportParseError("break statement requires enclosing loop or switch");
                } else {
                    this.reportParseError("continue statement requires enclosing loop");
                }
            }
        };
        Parser.prototype.setErrorRecovery = function (outfile) {
            this.outfile = outfile;
            this.errorRecovery = true;
        };
        Parser.prototype.getSourceLineCol = function (lineCol, minChar) {
            TypeScript.getSourceLineColFromMap(lineCol, minChar, this.scanner.lineMap);
        };
        Parser.prototype.createRef = function (text, hasEscapeSequence, minChar) {
            var id = new TypeScript.Identifier(text, hasEscapeSequence);
            id.minChar = minChar;
            return id;
        };
        Parser.prototype.reportParseStyleError = function (message) {
            this.reportParseError("STYLE: " + message);
        };
        Parser.prototype.reportParseError = function (message, startPos, pos) {
            if (typeof startPos === "undefined") { startPos = this.scanner.startPos; }
            if (typeof pos === "undefined") { pos = this.scanner.pos; }
            var len = Math.max(1, pos - startPos);
            if(this.errorCallback) {
                this.errorCallback(startPos, len, message, this.currentUnitIndex);
            } else {
                if(this.errorRecovery) {
                    var lineCol = {
                        line: -1,
                        col: -1
                    };
                    this.getSourceLineCol(lineCol, startPos);
                    if(this.outfile) {
                        this.outfile.WriteLine("// " + this.fname + " (" + lineCol.line + "," + lineCol.col + "): " + message);
                    }
                } else {
                    throw new SyntaxError(this.fname + " (" + this.scanner.line + "," + this.scanner.col + "): " + message);
                }
            }
        };
        Parser.prototype.checkNextToken = function (tokenId, errorRecoverySet, errorText) {
            if (typeof errorText === "undefined") { errorText = null; }
            this.currentToken = this.scanner.scan();
            this.checkCurrentToken(tokenId, errorRecoverySet, errorText);
        };
        Parser.prototype.skip = function (errorRecoverySet) {
            errorRecoverySet |= TypeScript.ErrorRecoverySet.EOF;
            var ersTok = TypeScript.ErrorRecoverySet.None;
            var tokenInfo = TypeScript.lookupToken(this.currentToken.tokenId);
            if(tokenInfo != undefined) {
                ersTok = tokenInfo.ers;
            }
            var pendingRightCurlies = 0;
            while(((ersTok & errorRecoverySet) == TypeScript.ErrorRecoverySet.None) || (this.currentToken.tokenId == TypeScript.TokenID.CloseBrace) && (pendingRightCurlies > 0)) {
                if(this.currentToken.tokenId == TypeScript.TokenID.OpenBrace) {
                    pendingRightCurlies++;
                } else {
                    if(this.currentToken.tokenId == TypeScript.TokenID.CloseBrace) {
                        pendingRightCurlies--;
                    }
                }
                this.currentToken = this.scanner.scan();
                ersTok = TypeScript.ErrorRecoverySet.None;
                tokenInfo = TypeScript.lookupToken(this.currentToken.tokenId);
                if(tokenInfo != undefined) {
                    ersTok = tokenInfo.ers;
                }
            }
        };
        Parser.prototype.checkCurrentToken = function (tokenId, errorRecoverySet, errorText) {
            if (typeof errorText === "undefined") { errorText = null; }
            if(this.currentToken.tokenId != tokenId) {
                errorText = errorText == null ? ("Expected '" + TypeScript.tokenTable[tokenId].text + "'") : errorText;
                this.reportParseError(errorText);
                if(this.errorRecovery) {
                    this.skip(errorRecoverySet);
                }
            } else {
                this.currentToken = this.scanner.scan();
            }
        };
        Parser.prototype.pushDeclLists = function () {
            this.staticsLists.push(new TypeScript.ASTList());
            this.varLists.push(new TypeScript.ASTList());
            this.scopeLists.push(new TypeScript.ASTList());
        };
        Parser.prototype.popDeclLists = function () {
            this.staticsLists.pop();
            this.varLists.pop();
            this.scopeLists.pop();
        };
        Parser.prototype.topVarList = function () {
            return this.varLists[this.varLists.length - 1];
        };
        Parser.prototype.topScopeList = function () {
            return this.scopeLists[this.scopeLists.length - 1];
        };
        Parser.prototype.topStaticsList = function () {
            return this.staticsLists[this.staticsLists.length - 1];
        };
        Parser.prototype.parseComment = function (comment) {
            if(comment) {
                var c = new TypeScript.Comment(comment.value, comment.isBlock, comment.endsLine);
                c.minChar = comment.startPos;
                c.limChar = comment.startPos + comment.value.length;
                var lineCol = {
                    line: -1,
                    col: -1
                };
                this.getSourceLineCol(lineCol, c.minChar);
                c.minLine = lineCol.line;
                this.getSourceLineCol(lineCol, c.limChar);
                c.limLine = lineCol.line;
                if(!comment.isBlock && comment.value.length > 3 && comment.value.substring(0, 3) == "///") {
                    var dependencyPath = TypeScript.getAdditionalDependencyPath(comment.value);
                    if(dependencyPath) {
                        this.amdDependencies.push(dependencyPath);
                    }
                    if(TypeScript.getImplicitImport(comment.value)) {
                        this.hasTopLevelImportOrExport = true;
                    }
                }
                return c;
            } else {
                return null;
            }
        };
        Parser.prototype.parseCommentsInner = function (comments) {
            if(comments) {
                var commentASTs = new Array();
                for(var i = 0; i < comments.length; i++) {
                    commentASTs.push(this.parseComment(comments[i]));
                }
                return commentASTs;
            } else {
                return null;
            }
        };
        Parser.prototype.parseComments = function () {
            var comments = this.scanner.getComments();
            return this.parseCommentsInner(comments);
        };
        Parser.prototype.parseCommentsForLine = function (line) {
            var comments = this.scanner.getCommentsForLine(line);
            return this.parseCommentsInner(comments);
        };
        Parser.prototype.combineComments = function (comment1, comment2) {
            if(comment1 == null) {
                return comment2;
            } else {
                if(comment2 == null) {
                    return comment1;
                } else {
                    return comment1.concat(comment2);
                }
            }
        };
        Parser.prototype.parseEnumDecl = function (errorRecoverySet, modifiers) {
            var leftCurlyCount = this.scanner.leftCurlyCount;
            var rightCurlyCount = this.scanner.rightCurlyCount;
            var name = null;
            if((this.currentToken.tokenId == TypeScript.TokenID.Identifier) || TypeScript.convertTokToID(this.currentToken, this.strictMode)) {
                name = TypeScript.Identifier.fromToken(this.currentToken);
                name.minChar = this.scanner.startPos;
                name.limChar = this.scanner.pos;
                this.currentToken = this.scanner.scan();
            } else {
                this.reportParseError("Enum declaration requires identifier");
                if(this.errorRecovery) {
                    name = new TypeScript.MissingIdentifier();
                    name.minChar = this.scanner.startPos;
                    name.limChar = this.scanner.startPos;
                    name.flags |= TypeScript.ASTFlags.Error;
                }
            }
            var membersMinChar = this.scanner.startPos;
            this.checkCurrentToken(TypeScript.TokenID.OpenBrace, errorRecoverySet | TypeScript.ErrorRecoverySet.ID);
            this.pushDeclLists();
            var members = new TypeScript.ASTList();
            members.minChar = membersMinChar;
            var mapDecl = new TypeScript.VarDecl(new TypeScript.Identifier("_map"), 0);
            mapDecl.varFlags |= TypeScript.VarFlags.Exported;
            mapDecl.varFlags |= TypeScript.VarFlags.Private;
            mapDecl.varFlags |= (TypeScript.VarFlags.Property | TypeScript.VarFlags.Public);
            mapDecl.init = new TypeScript.UnaryExpression(TypeScript.NodeType.ArrayLit, null);
            members.append(mapDecl);
            var lastValue = null;
            for(; ; ) {
                var minChar = this.scanner.startPos;
                var limChar;
                var memberName = null;
                var memberValue = null;
                var preComments = null;
                var postComments = null;
                if((this.currentToken.tokenId == TypeScript.TokenID.Identifier) || TypeScript.convertTokToIDName(this.currentToken)) {
                    memberName = TypeScript.Identifier.fromToken(this.currentToken);
                    memberName.minChar = this.scanner.startPos;
                    memberName.limChar = this.scanner.pos;
                } else {
                    if(this.currentToken.tokenId == TypeScript.TokenID.CloseBrace) {
                        break;
                    } else {
                        this.reportParseError("Expected identifer of enum member");
                        if(this.errorRecovery) {
                            memberName = new TypeScript.MissingIdentifier();
                            memberName.minChar = this.scanner.startPos;
                            memberName.limChar = this.scanner.startPos;
                            memberName.flags |= TypeScript.ASTFlags.Error;
                        }
                    }
                }
                limChar = this.scanner.pos;
                preComments = this.parseComments();
                this.currentToken = this.scanner.scan();
                postComments = this.parseComments();
                if(this.currentToken.tokenId == TypeScript.TokenID.Equals) {
                    this.currentToken = this.scanner.scan();
                    memberValue = this.parseExpr(errorRecoverySet, TypeScript.OperatorPrecedence.Comma, true, TypeContext.NoTypes);
                    lastValue = memberValue;
                    limChar = memberValue.limChar;
                } else {
                    if(lastValue == null) {
                        memberValue = new TypeScript.NumberLiteral(0);
                        lastValue = memberValue;
                    } else {
                        memberValue = new TypeScript.NumberLiteral(lastValue.value + 1);
                        lastValue = memberValue;
                    }
                    var map = new TypeScript.BinaryExpression(TypeScript.NodeType.Asg, new TypeScript.BinaryExpression(TypeScript.NodeType.Index, new TypeScript.Identifier("_map"), memberValue), new TypeScript.StringLiteral('"' + memberName.actualText + '"'));
                    members.append(map);
                }
                var member = new TypeScript.VarDecl(memberName, this.nestingLevel);
                member.minChar = minChar;
                member.limChar = limChar;
                member.init = memberValue;
                member.typeExpr = new TypeScript.TypeReference(this.createRef(name.actualText, name.hasEscapeSequence, -1), 0);
                member.varFlags |= (TypeScript.VarFlags.Readonly | TypeScript.VarFlags.Property);
                if(memberValue.nodeType == TypeScript.NodeType.NumberLit) {
                    member.varFlags |= TypeScript.VarFlags.Constant;
                }
                member.preComments = preComments;
                members.append(member);
                member.postComments = postComments;
                member.varFlags |= TypeScript.VarFlags.Exported;
                if(this.currentToken.tokenId == TypeScript.TokenID.Comma) {
                    this.currentToken = this.scanner.scan();
                    member.postComments = this.combineComments(member.postComments, this.parseCommentsForLine(this.scanner.prevLine));
                    if((this.currentToken.tokenId == TypeScript.TokenID.Identifier) || (TypeScript.convertTokToIDName(this.currentToken))) {
                        continue;
                    }
                }
                break;
            }
            var endingToken = new TypeScript.ASTSpan();
            endingToken.minChar = this.scanner.startPos;
            endingToken.limChar = this.scanner.pos;
            this.checkCurrentToken(TypeScript.TokenID.CloseBrace, errorRecoverySet);
            members.limChar = this.scanner.lastTokenLimChar();
            var modDecl = new TypeScript.ModuleDeclaration(name, members, this.topVarList(), this.topScopeList(), endingToken);
            modDecl.modFlags |= TypeScript.ModuleFlags.IsEnum;
            this.popDeclLists();
            modDecl.leftCurlyCount = this.scanner.leftCurlyCount - leftCurlyCount;
            modDecl.rightCurlyCount = this.scanner.rightCurlyCount - rightCurlyCount;
            return modDecl;
        };
        Parser.prototype.parseDottedName = function (enclosedList) {
            this.currentToken = this.scanner.scan();
            if((this.currentToken.tokenId == TypeScript.TokenID.Identifier) || TypeScript.convertTokToID(this.currentToken, this.strictMode)) {
                var id = TypeScript.Identifier.fromToken(this.currentToken);
                id.preComments = this.parseComments();
                enclosedList[enclosedList.length] = id;
                id.minChar = this.scanner.startPos;
                id.limChar = this.scanner.pos;
                this.currentToken = this.scanner.scan();
                if(this.currentToken.tokenId == TypeScript.TokenID.Dot) {
                    this.parseDottedName(enclosedList);
                }
            } else {
                this.reportParseError("need identifier after '.'");
            }
        };
        Parser.prototype.isValidImportPath = function (importPath) {
            importPath = TypeScript.stripQuotes(importPath);
            if(!importPath || importPath.indexOf(':') != -1 || importPath.indexOf('\\') != -1 || importPath.charAt(0) == '/') {
                return false;
            }
            return true;
        };
        Parser.prototype.parseImportDeclaration = function (errorRecoverySet, modifiers) {
            var name = null;
            var alias = null;
            var importDecl = null;
            var minChar = this.scanner.startPos;
            var isDynamicImport = false;
            this.currentToken = this.scanner.scan();
            if(this.currentToken.tokenId == TypeScript.TokenID.Identifier || TypeScript.convertTokToID(this.currentToken, this.strictMode)) {
                name = TypeScript.Identifier.fromToken(this.currentToken);
            } else {
                this.reportParseError("Expected identifer after 'import'");
                name = new TypeScript.MissingIdentifier();
            }
            name.minChar = this.scanner.startPos;
            name.limChar = this.scanner.pos;
            this.currentToken = this.scanner.scan();
            this.checkCurrentToken(TypeScript.TokenID.Equals, errorRecoverySet | TypeScript.ErrorRecoverySet.ID);
            var aliasPreComments = this.parseComments();
            var limChar;
            if(this.currentToken.tokenId == TypeScript.TokenID.Identifier || TypeScript.convertTokToID(this.currentToken, this.strictMode)) {
                if(this.currentToken.tokenId == TypeScript.TokenID.Module) {
                    limChar = this.scanner.pos;
                    this.currentToken = this.scanner.scan();
                    if(this.currentToken.tokenId == TypeScript.TokenID.OpenParen) {
                        this.currentToken = this.scanner.scan();
                        if(this.currentToken.tokenId == TypeScript.TokenID.StringLiteral || this.currentToken.tokenId == TypeScript.TokenID.Identifier || TypeScript.convertTokToID(this.currentToken, this.strictMode)) {
                            if(this.currentToken.tokenId == TypeScript.TokenID.StringLiteral) {
                                if(this.topLevel) {
                                    this.hasTopLevelImportOrExport = true;
                                } else {
                                    if(!this.allowImportDeclaration) {
                                        this.reportParseError("Import declaration of external module is permitted only in global or top level dynamic modules");
                                    }
                                }
                                var aliasText = this.currentToken.getText();
                                alias = TypeScript.Identifier.fromToken(this.currentToken);
                                alias.minChar = this.scanner.startPos;
                                alias.limChar = this.scanner.pos;
                                if(!this.isValidImportPath((alias).text)) {
                                    this.reportParseError("Invalid import path");
                                }
                                isDynamicImport = true;
                                this.currentToken = this.scanner.scan();
                                alias.preComments = aliasPreComments;
                            } else {
                                alias = this.parseExpr(errorRecoverySet | TypeScript.ErrorRecoverySet.SColon, TypeScript.OperatorPrecedence.Assignment, true, TypeContext.NoTypes);
                                alias.preComments = aliasPreComments;
                            }
                        }
                        limChar = this.scanner.pos;
                        this.checkCurrentToken(TypeScript.TokenID.CloseParen, errorRecoverySet | TypeScript.ErrorRecoverySet.ID);
                        if(alias) {
                            alias.postComments = this.parseComments();
                        }
                    }
                } else {
                    alias = this.parseExpr(errorRecoverySet | TypeScript.ErrorRecoverySet.SColon, TypeScript.OperatorPrecedence.Assignment, true, TypeContext.NoTypes);
                    limChar = this.scanner.pos;
                }
            } else {
                this.reportParseError("Expected module name");
                alias = new TypeScript.MissingIdentifier();
                alias.minChar = this.scanner.startPos;
                if(this.currentToken.tokenId == TypeScript.TokenID.Semicolon) {
                    alias.limChar = this.scanner.startPos;
                } else {
                    alias.limChar = this.scanner.pos;
                    this.currentToken = this.scanner.scan();
                }
                alias.flags |= TypeScript.ASTFlags.Error;
                limChar = alias.limChar;
            }
            importDecl = new TypeScript.ImportDeclaration(name, alias);
            importDecl.isDynamicImport = isDynamicImport;
            importDecl.minChar = minChar;
            importDecl.limChar = limChar;
            return importDecl;
        };
        Parser.prototype.parseModuleDecl = function (errorRecoverySet, modifiers, preComments) {
            var leftCurlyCount = this.scanner.leftCurlyCount;
            var rightCurlyCount = this.scanner.rightCurlyCount;
            var svAmbient = this.ambientModule;
            var svTopLevel = this.topLevel;
            this.topLevel = false;
            if(this.parsingDeclareFile || svAmbient || TypeScript.hasFlag(modifiers, TypeScript.Modifiers.Ambient)) {
                this.ambientModule = true;
            }
            this.currentToken = this.scanner.scan();
            var name = null;
            var enclosedList = null;
            this.pushDeclLists();
            var minChar = this.scanner.startPos;
            var isDynamicMod = false;
            if((this.currentToken.tokenId == TypeScript.TokenID.Identifier) || (this.currentToken.tokenId == TypeScript.TokenID.StringLiteral) || (!TypeScript.isPrimitiveTypeToken(this.currentToken) && TypeScript.convertTokToID(this.currentToken, this.strictMode))) {
                var nameText = this.currentToken.getText();
                if(this.currentToken.tokenId == TypeScript.TokenID.StringLiteral) {
                    isDynamicMod = true;
                    if(!this.ambientModule) {
                        this.reportParseError("Only ambient dynamic modules may have string literal names");
                    }
                    if(!svTopLevel) {
                        this.reportParseError("Dynamic modules may not be nested within other modules");
                    }
                }
                name = TypeScript.Identifier.fromToken(this.currentToken);
                name.minChar = this.scanner.startPos;
                name.limChar = this.scanner.pos;
                this.currentToken = this.scanner.scan();
            } else {
                if(this.currentToken.tokenId == TypeScript.TokenID.OpenBrace) {
                    this.reportParseError("Module name missing");
                    name = new TypeScript.Identifier("");
                    name.minChar = minChar;
                    name.limChar = minChar;
                }
            }
            if(this.currentToken.tokenId == TypeScript.TokenID.Dot) {
                enclosedList = new Array();
                this.parseDottedName(enclosedList);
            }
            if(name == null) {
                name = new TypeScript.MissingIdentifier();
            }
            var moduleBody = new TypeScript.ASTList();
            var bodyMinChar = this.scanner.startPos;
            this.checkCurrentToken(TypeScript.TokenID.OpenBrace, errorRecoverySet | TypeScript.ErrorRecoverySet.ID);
            if(svTopLevel && isDynamicMod) {
                this.allowImportDeclaration = true;
            } else {
                this.allowImportDeclaration = false;
            }
            this.parseStatementList(errorRecoverySet | TypeScript.ErrorRecoverySet.RCurly, moduleBody, true, true, TypeScript.AllowedElements.Global, modifiers);
            moduleBody.minChar = bodyMinChar;
            moduleBody.limChar = this.scanner.pos;
            var endingToken = new TypeScript.ASTSpan();
            endingToken.minChar = this.scanner.startPos;
            endingToken.limChar = this.scanner.pos;
            this.checkCurrentToken(TypeScript.TokenID.CloseBrace, errorRecoverySet);
            var limChar = this.scanner.lastTokenLimChar();
            var moduleDecl;
            this.allowImportDeclaration = svTopLevel;
            if(enclosedList && (enclosedList.length > 0)) {
                var len = enclosedList.length;
                var innerName = enclosedList[len - 1];
                var innerDecl = new TypeScript.ModuleDeclaration(innerName, moduleBody, this.topVarList(), this.topScopeList(), endingToken);
                innerDecl.preComments = preComments;
                if(this.parsingDeclareFile || TypeScript.hasFlag(modifiers, TypeScript.Modifiers.Ambient)) {
                    innerDecl.modFlags |= TypeScript.ModuleFlags.Ambient;
                }
                innerDecl.modFlags |= TypeScript.ModuleFlags.Exported;
                innerDecl.minChar = minChar;
                innerDecl.limChar = limChar;
                this.popDeclLists();
                var outerModBod;
                for(var i = len - 2; i >= 0; i--) {
                    outerModBod = new TypeScript.ASTList();
                    outerModBod.append(innerDecl);
                    innerName = enclosedList[i];
                    innerDecl = new TypeScript.ModuleDeclaration(innerName, outerModBod, new TypeScript.ASTList(), new TypeScript.ASTList(), endingToken);
                    outerModBod.minChar = innerDecl.minChar = minChar;
                    outerModBod.limChar = innerDecl.limChar = limChar;
                    if(this.parsingDeclareFile || TypeScript.hasFlag(modifiers, TypeScript.Modifiers.Ambient)) {
                        innerDecl.modFlags |= TypeScript.ModuleFlags.Ambient;
                    }
                    innerDecl.modFlags |= TypeScript.ModuleFlags.Exported;
                }
                outerModBod = new TypeScript.ASTList();
                outerModBod.append(innerDecl);
                outerModBod.minChar = minChar;
                outerModBod.limChar = limChar;
                moduleDecl = new TypeScript.ModuleDeclaration(name, outerModBod, new TypeScript.ASTList(), new TypeScript.ASTList(), endingToken);
            } else {
                moduleDecl = new TypeScript.ModuleDeclaration(name, moduleBody, this.topVarList(), this.topScopeList(), endingToken);
                moduleDecl.preComments = preComments;
                this.popDeclLists();
            }
            if(this.parsingDeclareFile || svAmbient || TypeScript.hasFlag(modifiers, TypeScript.Modifiers.Ambient)) {
                moduleDecl.modFlags |= TypeScript.ModuleFlags.Ambient;
            }
            if(svAmbient || TypeScript.hasFlag(modifiers, TypeScript.Modifiers.Exported)) {
                moduleDecl.modFlags |= TypeScript.ModuleFlags.Exported;
            }
            if(isDynamicMod) {
                moduleDecl.modFlags |= TypeScript.ModuleFlags.IsDynamic;
            }
            this.ambientModule = svAmbient;
            this.topLevel = svTopLevel;
            moduleDecl.leftCurlyCount = this.scanner.leftCurlyCount - leftCurlyCount;
            moduleDecl.rightCurlyCount = this.scanner.rightCurlyCount - rightCurlyCount;
            moduleDecl.limChar = moduleBody.limChar;
            return moduleDecl;
        };
        Parser.prototype.parseTypeReferenceTail = function (errorRecoverySet, minChar, term) {
            var result = new TypeScript.TypeReference(term, 0);
            result.minChar = minChar;
            while(this.currentToken.tokenId == TypeScript.TokenID.OpenBracket) {
                this.currentToken = this.scanner.scan();
                result.arrayCount++;
                this.checkCurrentToken(TypeScript.TokenID.CloseBracket, errorRecoverySet | TypeScript.ErrorRecoverySet.LBrack);
            }
            result.limChar = this.scanner.lastTokenLimChar();
            return result;
        };
        Parser.prototype.parseNamedType = function (errorRecoverySet, minChar, term, tail) {
            this.currentToken = this.scanner.scan();
            if(this.currentToken.tokenId == TypeScript.TokenID.Dot) {
                var curpos = this.scanner.pos;
                this.currentToken = this.scanner.scan();
                if((this.currentToken.tokenId == TypeScript.TokenID.Identifier) || ((!this.errorRecovery || !this.scanner.lastTokenHadNewline()) && TypeScript.convertTokToID(this.currentToken, this.strictMode))) {
                    var op2 = TypeScript.Identifier.fromToken(this.currentToken);
                    op2.minChar = this.scanner.startPos;
                    op2.limChar = this.scanner.pos;
                    var dotNode = new TypeScript.BinaryExpression(TypeScript.NodeType.Dot, term, op2);
                    dotNode.minChar = term.minChar;
                    dotNode.limChar = op2.limChar;
                    return this.parseNamedType(errorRecoverySet, minChar, dotNode, tail);
                } else {
                    this.reportParseError("need identifier after '.'");
                    if(this.errorRecovery) {
                        term.flags |= TypeScript.ASTFlags.DotLHS;
                        term.limChar = this.scanner.lastTokenLimChar();
                        return term;
                    } else {
                        var eop2 = new TypeScript.MissingIdentifier();
                        eop2.minChar = this.scanner.pos;
                        eop2.limChar = this.scanner.pos;
                        var edotNode = new TypeScript.BinaryExpression(TypeScript.NodeType.Dot, term, eop2);
                        edotNode.flags |= TypeScript.ASTFlags.Error;
                        edotNode.minChar = term.minChar;
                        edotNode.limChar = eop2.limChar;
                        return this.parseNamedType(errorRecoverySet, minChar, edotNode, tail);
                    }
                }
            } else {
                if(tail) {
                    return this.parseTypeReferenceTail(errorRecoverySet, minChar, term);
                } else {
                    return term;
                }
            }
        };
        Parser.prototype.parseTypeReference = function (errorRecoverySet, allowVoid) {
            var minChar = this.scanner.startPos;
            var isConstructorMember = false;
            switch(this.currentToken.tokenId) {
                case TypeScript.TokenID.Void: {
                    if(!allowVoid) {
                        this.reportParseError("void not a valid type in this context");
                    }

                }
                case TypeScript.TokenID.Any:
                case TypeScript.TokenID.Number:
                case TypeScript.TokenID.Bool:
                case TypeScript.TokenID.String: {
                    var text = TypeScript.tokenTable[this.currentToken.tokenId].text;
                    var predefinedIdentifier = new TypeScript.Identifier(text);
                    predefinedIdentifier.minChar = minChar;
                    predefinedIdentifier.limChar = this.scanner.pos;
                    this.currentToken = this.scanner.scan();
                    return this.parseTypeReferenceTail(errorRecoverySet, minChar, predefinedIdentifier);
                }

                case TypeScript.TokenID.Identifier: {
                    var ident = this.createRef(this.currentToken.getText(), (this.currentToken).hasEscapeSequence, minChar);
                    ident.limChar = this.scanner.pos;
                    return this.parseNamedType(errorRecoverySet, minChar, ident, true);

                }
                case TypeScript.TokenID.OpenBrace: {
                    return this.parseObjectType(minChar, errorRecoverySet);

                }
                case TypeScript.TokenID.New: {
                    this.currentToken = this.scanner.scan();
                    if(this.currentToken.tokenId != TypeScript.TokenID.OpenParen) {
                        this.reportParseError("Expected '('");
                    } else {
                        isConstructorMember = true;
                    }

                }
                case TypeScript.TokenID.OpenParen: {
                    var formals = new TypeScript.ASTList();
                    var variableArgList = this.parseFormalParameterList(errorRecoverySet | TypeScript.ErrorRecoverySet.RParen, formals, false, true, false, false, false, false, null, true);
                    this.checkCurrentToken(TypeScript.TokenID.EqualsGreaterThan, errorRecoverySet);
                    var returnType = this.parseTypeReference(errorRecoverySet, true);
                    var funcDecl = new TypeScript.FuncDecl(null, null, false, formals, null, null, null, TypeScript.NodeType.FuncDecl);
                    funcDecl.returnTypeAnnotation = returnType;
                    funcDecl.variableArgList = variableArgList;
                    funcDecl.fncFlags |= TypeScript.FncFlags.Signature;
                    if(isConstructorMember) {
                        funcDecl.fncFlags |= TypeScript.FncFlags.ConstructMember;
                        funcDecl.hint = "_construct";
                        funcDecl.classDecl = null;
                    }
                    funcDecl.minChar = minChar;
                    return this.parseTypeReferenceTail(errorRecoverySet, minChar, funcDecl);
                }

                default: {
                    this.reportParseError("Expected type name");
                    var etr = new TypeScript.TypeReference(null, 0);
                    etr.flags |= TypeScript.ASTFlags.Error;
                    etr.minChar = this.scanner.pos;
                    etr.limChar = this.scanner.pos;
                    return etr;

                }
            }
        };
        Parser.prototype.parseObjectType = function (minChar, errorRecoverySet) {
            this.currentToken = this.scanner.scan();
            var members = new TypeScript.ASTList();
            members.minChar = minChar;
            var prevInInterfaceDecl = this.inInterfaceDecl;
            this.inInterfaceDecl = true;
            this.parseTypeMemberList(errorRecoverySet | TypeScript.ErrorRecoverySet.RCurly, members);
            this.inInterfaceDecl = prevInInterfaceDecl;
            this.checkCurrentToken(TypeScript.TokenID.CloseBrace, errorRecoverySet);
            var interfaceDecl = new TypeScript.InterfaceDeclaration(this.anonId, members, null, null);
            interfaceDecl.minChar = minChar;
            interfaceDecl.limChar = members.limChar;
            return this.parseTypeReferenceTail(errorRecoverySet, minChar, interfaceDecl);
        };
        Parser.prototype.parseFunctionBlock = function (errorRecoverySet, allowedElements, parentModifiers, bod, bodMinChar) {
            this.state = ParseState.StartStatementList;
            this.checkCurrentToken(TypeScript.TokenID.OpenBrace, errorRecoverySet | TypeScript.ErrorRecoverySet.StmtStart);
            var savedInFunction = this.inFunction;
            this.inFunction = true;
            this.parseStatementList(errorRecoverySet | TypeScript.ErrorRecoverySet.RCurly | TypeScript.ErrorRecoverySet.StmtStart, bod, true, false, allowedElements, parentModifiers);
            bod.minChar = bodMinChar;
            bod.limChar = this.scanner.pos;
            this.inFunction = savedInFunction;
            var ec = new TypeScript.EndCode();
            ec.minChar = bod.limChar;
            ec.limChar = ec.minChar;
            bod.append(ec);
        };
        Parser.prototype.parseFunctionStatements = function (errorRecoverySet, name, isConstructor, isMethod, args, allowedElements, minChar, requiresSignature, parentModifiers) {
            this.pushDeclLists();
            var svStmtStack = this.statementInfoStack;
            this.resetStmtStack();
            var bod = null;
            var wasShorthand = false;
            var isAnonLambda = false;
            var limChar;
            if(requiresSignature) {
                limChar = this.scanner.pos;
                if(this.currentToken.tokenId === TypeScript.TokenID.OpenBrace) {
                    this.reportParseError("Function declarations are not permitted within interfaces, ambient modules or classes");
                    bod = new TypeScript.ASTList();
                    var bodMinChar = this.scanner.startPos;
                    this.parseFunctionBlock(errorRecoverySet, allowedElements, parentModifiers, bod, bodMinChar);
                    this.checkCurrentToken(TypeScript.TokenID.CloseBrace, errorRecoverySet);
                    if(this.currentToken.tokenId === TypeScript.TokenID.Semicolon) {
                        this.currentToken = this.scanner.scan();
                    }
                } else {
                    this.checkCurrentToken(TypeScript.TokenID.Semicolon, errorRecoverySet, "Expected ';'");
                }
            } else {
                bod = new TypeScript.ASTList();
                var bodMinChar = this.scanner.startPos;
                if(this.currentToken.tokenId == TypeScript.TokenID.EqualsGreaterThan) {
                    if(isMethod) {
                        this.reportParseError("'=>' may not be used for class methods");
                    }
                    wasShorthand = true;
                    this.currentToken = this.scanner.scan();
                }
                if(wasShorthand && this.currentToken.tokenId != TypeScript.TokenID.OpenBrace) {
                    var retExpr = this.parseExpr(errorRecoverySet | TypeScript.ErrorRecoverySet.SColon, TypeScript.OperatorPrecedence.Assignment, true, TypeContext.NoTypes);
                    var retStmt = new TypeScript.ReturnStatement();
                    retStmt.returnExpression = retExpr;
                    retStmt.minChar = retExpr.minChar;
                    retStmt.limChar = retExpr.limChar;
                    bod.minChar = bodMinChar;
                    bod.append(retStmt);
                } else {
                    isAnonLambda = wasShorthand;
                    this.parseFunctionBlock(errorRecoverySet, allowedElements, parentModifiers, bod, bodMinChar);
                }
                limChar = this.scanner.pos;
            }
            var funcDecl = new TypeScript.FuncDecl(name, bod, isConstructor, args, this.topVarList(), this.topScopeList(), this.topStaticsList(), TypeScript.NodeType.FuncDecl);
            this.popDeclLists();
            var scopeList = this.topScopeList();
            scopeList.append(funcDecl);
            var staticFuncDecl = false;
            if(!requiresSignature) {
                if(!wasShorthand || isAnonLambda) {
                    funcDecl.endingToken = new TypeScript.ASTSpan();
                    funcDecl.endingToken.minChar = this.scanner.startPos;
                    funcDecl.endingToken.limChar = this.scanner.pos;
                    this.checkCurrentToken(TypeScript.TokenID.CloseBrace, errorRecoverySet);
                    if(isAnonLambda) {
                        funcDecl.fncFlags |= TypeScript.FncFlags.IsFatArrowFunction;
                    }
                } else {
                    funcDecl.fncFlags |= TypeScript.FncFlags.IsFatArrowFunction;
                    funcDecl.endingToken = new TypeScript.ASTSpan();
                    funcDecl.endingToken.minChar = bod.members[0].minChar;
                    funcDecl.endingToken.limChar = bod.members[0].limChar;
                }
            }
            funcDecl.minChar = minChar;
            funcDecl.limChar = limChar;
            if(!requiresSignature) {
                funcDecl.fncFlags |= TypeScript.FncFlags.Definition;
            }
            this.statementInfoStack = svStmtStack;
            return funcDecl;
        };
        Parser.prototype.transformAnonymousArgsIntoFormals = function (formals, argList) {
            var _this = this;
            var translateBinExOperand = function (operand) {
                if(operand.nodeType == TypeScript.NodeType.Comma) {
                    return _this.transformAnonymousArgsIntoFormals(formals, operand);
                } else {
                    if(operand.nodeType == TypeScript.NodeType.Name || operand.nodeType == TypeScript.NodeType.Asg) {
                        var opArg = operand.nodeType == TypeScript.NodeType.Asg ? (operand).operand1 : operand;
                        var arg = new TypeScript.ArgDecl(opArg);
                        arg.preComments = opArg.preComments;
                        arg.postComments = opArg.postComments;
                        arg.minChar = operand.minChar;
                        arg.limChar = operand.limChar;
                        if(TypeScript.hasFlag(opArg.flags, TypeScript.ASTFlags.PossibleOptionalParameter)) {
                            arg.isOptional = true;
                        }
                        if(operand.nodeType == TypeScript.NodeType.Asg) {
                            arg.init = (operand).operand2;
                        }
                        formals.append(arg);
                        return arg.isOptional || arg.init;
                    } else {
                        _this.reportParseError("Invalid lambda argument");
                    }
                }
                return false;
            };
            if(argList) {
                if(argList.nodeType == TypeScript.NodeType.Comma) {
                    var commaList = argList;
                    if(commaList.operand1.isParenthesized) {
                        this.reportParseError("Invalid lambda argument", commaList.operand1.minChar, commaList.operand1.limChar);
                    }
                    if(commaList.operand2.isParenthesized) {
                        this.reportParseError("Invalid lambda argument", commaList.operand2.minChar, commaList.operand2.limChar);
                    }
                    var isOptional = translateBinExOperand(commaList.operand1);
                    isOptional = translateBinExOperand(commaList.operand2) || isOptional;
                    return isOptional;
                } else {
                    return translateBinExOperand(argList);
                }
            }
        };
        Parser.prototype.parseFormalParameterList = function (errorRecoverySet, formals, isClassConstr, isSig, isIndexer, isGetter, isSetter, isLambda, preProcessedLambdaArgs, expectClosingRParen) {
            formals.minChar = this.scanner.startPos;
            if(isIndexer) {
                this.currentToken = this.scanner.scan();
            } else {
                if(!isLambda) {
                    this.checkCurrentToken(TypeScript.TokenID.OpenParen, errorRecoverySet | TypeScript.ErrorRecoverySet.RParen);
                }
            }
            var sawEllipsis = false;
            var firstArg = true;
            var hasOptional = false;
            var haveFirstArgID = false;
            if(isLambda && preProcessedLambdaArgs && preProcessedLambdaArgs.nodeType != TypeScript.NodeType.EmptyExpr) {
                hasOptional = this.transformAnonymousArgsIntoFormals(formals, preProcessedLambdaArgs);
                haveFirstArgID = true;
            }
            while(true) {
                var munchedArg = false;
                var argFlags = TypeScript.VarFlags.None;
                var argMinChar = this.scanner.startPos;
                if(this.inferPropertiesFromThisAssignment && this.currentToken.tokenId == TypeScript.TokenID.This) {
                    if(!isClassConstr) {
                        this.reportParseError("Instance property declarations using 'this' may only be used in class constructors");
                    }
                    this.currentToken = this.scanner.scan();
                    argFlags |= (TypeScript.VarFlags.Public | TypeScript.VarFlags.Property);
                    if(this.currentClassDefinition) {
                        this.currentClassDefinition.varFlags |= TypeScript.VarFlags.ClassSuperMustBeFirstCallInConstructor;
                    }
                }
                if(this.currentToken.tokenId == TypeScript.TokenID.Public) {
                    argFlags |= (TypeScript.VarFlags.Public | TypeScript.VarFlags.Property);
                    if(this.currentClassDefinition) {
                        this.currentClassDefinition.varFlags |= TypeScript.VarFlags.ClassSuperMustBeFirstCallInConstructor;
                    }
                } else {
                    if(this.currentToken.tokenId == TypeScript.TokenID.Private) {
                        argFlags |= (TypeScript.VarFlags.Private | TypeScript.VarFlags.Property);
                        if(this.currentClassDefinition) {
                            this.currentClassDefinition.varFlags |= TypeScript.VarFlags.ClassSuperMustBeFirstCallInConstructor;
                        }
                    } else {
                        if(this.currentToken.tokenId == TypeScript.TokenID.Static && isClassConstr) {
                            this.reportParseError("Static properties can not be declared as parameter properties");
                            this.currentToken = this.scanner.scan();
                        }
                    }
                }
                if(argFlags != TypeScript.VarFlags.None) {
                    if(!isClassConstr) {
                        this.reportParseError("only constructor parameters can be properties");
                    }
                    this.currentToken = this.scanner.scan();
                    if(TypeScript.isModifier(this.currentToken)) {
                        this.reportParseError("Multiple modifiers may not be applied to parameters");
                        this.currentToken = this.scanner.scan();
                    }
                    if(this.inferPropertiesFromThisAssignment && this.currentToken.tokenId == TypeScript.TokenID.This) {
                        if(!isClassConstr) {
                            this.reportParseError("Instance property declarations using 'this' may only be used in class constructors");
                        }
                        this.currentToken = this.scanner.scan();
                        this.currentToken = this.scanner.scan();
                    }
                } else {
                    if(this.currentToken.tokenId == TypeScript.TokenID.DotDotDot) {
                        sawEllipsis = true;
                        this.currentToken = this.scanner.scan();
                        if(!(this.currentToken.tokenId == TypeScript.TokenID.Identifier) || TypeScript.convertTokToID(this.currentToken, this.strictMode)) {
                            this.reportParseError("'...' parameters require both a parameter name and an array type annotation to be specified");
                            sawEllipsis = false;
                        }
                    }
                }
                var argId = null;
                if(!haveFirstArgID && (this.currentToken.tokenId == TypeScript.TokenID.Identifier) || TypeScript.convertTokToID(this.currentToken, this.strictMode)) {
                    argId = TypeScript.Identifier.fromToken(this.currentToken);
                    argId.minChar = this.scanner.startPos;
                    argId.limChar = this.scanner.pos;
                }
                if(haveFirstArgID || argId) {
                    munchedArg = true;
                    var type = null;
                    var arg = null;
                    if(haveFirstArgID && formals.members.length) {
                        arg = formals.members[formals.members.length - 1];
                        if(arg.isOptional) {
                            hasOptional = true;
                        }
                    } else {
                        arg = new TypeScript.ArgDecl(argId);
                        if(isGetter) {
                            this.reportParseError("Property getters may not take any arguments");
                        }
                        if(isSetter && !firstArg) {
                            this.reportParseError("Property setters may only take one argument");
                        }
                        arg.minChar = argMinChar;
                        arg.preComments = this.parseComments();
                        this.currentToken = this.scanner.scan();
                    }
                    if(this.currentToken.tokenId == TypeScript.TokenID.Question) {
                        arg.isOptional = true;
                        hasOptional = true;
                        this.currentToken = this.scanner.scan();
                    }
                    if(this.currentToken.tokenId == TypeScript.TokenID.Colon) {
                        this.currentToken = this.scanner.scan();
                        type = this.parseTypeReference(errorRecoverySet, false);
                    }
                    if(this.currentToken.tokenId == TypeScript.TokenID.Equals) {
                        if(isSig) {
                            this.reportParseError("Arguments in signatures may not have default values");
                        }
                        hasOptional = true;
                        this.currentToken = this.scanner.scan();
                        arg.init = this.parseExpr(TypeScript.ErrorRecoverySet.Comma | errorRecoverySet, TypeScript.OperatorPrecedence.Comma, false, TypeContext.NoTypes);
                    }
                    if(hasOptional && !arg.isOptionalArg() && !sawEllipsis) {
                        this.reportParseError("Optional parameters may only be followed by other optional parameters");
                    }
                    if(sawEllipsis && arg.isOptionalArg()) {
                        this.reportParseError("Varargs may not be optional or have default parameters");
                    }
                    if(sawEllipsis && !type) {
                        this.reportParseError("'...' parameters require both a parameter name and an array type annotation to be specified");
                    }
                    arg.postComments = this.parseComments();
                    arg.typeExpr = type;
                    arg.limChar = this.scanner.lastTokenLimChar();
                    arg.varFlags |= argFlags;
                    if(!haveFirstArgID) {
                        formals.append(arg);
                    } else {
                        haveFirstArgID = false;
                    }
                }
                firstArg = false;
                if(this.currentToken.tokenId == TypeScript.TokenID.Comma) {
                    if((munchedArg) && (!sawEllipsis)) {
                        this.currentToken = this.scanner.scan();
                        continue;
                    } else {
                        this.reportParseError("Unexpected ',' in argument list");
                        if(this.errorRecovery) {
                            this.currentToken = this.scanner.scan();
                            continue;
                        }
                    }
                } else {
                    break;
                }
            }
            if(isIndexer) {
                this.checkCurrentToken(TypeScript.TokenID.CloseBracket, errorRecoverySet | TypeScript.ErrorRecoverySet.LCurly | TypeScript.ErrorRecoverySet.SColon);
            } else {
                if(expectClosingRParen) {
                    this.checkCurrentToken(TypeScript.TokenID.CloseParen, errorRecoverySet | TypeScript.ErrorRecoverySet.LCurly | TypeScript.ErrorRecoverySet.SColon);
                }
            }
            formals.limChar = this.scanner.lastTokenLimChar();
            return sawEllipsis;
        };
        Parser.prototype.parseFncDecl = function (errorRecoverySet, isDecl, requiresSignature, isMethod, methodName, indexer, isStatic, markedAsAmbient, modifiers, lambdaArgContext, expectClosingRParen) {
            var leftCurlyCount = this.scanner.leftCurlyCount;
            var rightCurlyCount = this.scanner.rightCurlyCount;
            var prevInConstr = this.parsingClassConstructorDefinition;
            this.parsingClassConstructorDefinition = false;
            var name = null;
            var fnMin = this.scanner.startPos;
            var minChar = this.scanner.pos;
            var prevNestingLevel = this.nestingLevel;
            var preComments = this.parseComments();
            var isLambda = !!lambdaArgContext;
            this.nestingLevel = 0;
            if((!this.style_funcInLoop) && this.inLoop()) {
                this.reportParseStyleError("function declaration in loop");
            }
            if(!isMethod && !isStatic && !indexer && !lambdaArgContext) {
                this.currentToken = this.scanner.scan();
                this.state = ParseState.StartFncDecl;
                if((this.currentToken.tokenId != TypeScript.TokenID.Identifier) && (!TypeScript.convertTokToID(this.currentToken, this.strictMode))) {
                    if(isDecl) {
                        this.reportParseError("Function declaration must include identifier");
                        this.nestingLevel = prevNestingLevel;
                        return new TypeScript.IncompleteAST(fnMin, this.scanner.pos);
                    }
                } else {
                    name = TypeScript.Identifier.fromToken(this.currentToken);
                    name.minChar = this.scanner.startPos;
                    name.limChar = this.scanner.pos;
                    this.currentToken = this.scanner.scan();
                }
            } else {
                if(methodName) {
                    name = methodName;
                }
            }
            this.state = ParseState.FncDeclName;
            var args = new TypeScript.ASTList();
            var variableArgList = false;
            var isOverload = false;
            var isGetter = TypeScript.hasFlag(modifiers, TypeScript.Modifiers.Getter);
            var isSetter = TypeScript.hasFlag(modifiers, TypeScript.Modifiers.Setter);
            if((this.currentToken.tokenId == TypeScript.TokenID.OpenParen) || (indexer && (this.currentToken.tokenId == TypeScript.TokenID.OpenBracket)) || (lambdaArgContext && (lambdaArgContext.preProcessedLambdaArgs || this.currentToken.tokenId == TypeScript.TokenID.DotDotDot))) {
                variableArgList = this.parseFormalParameterList(errorRecoverySet, args, false, requiresSignature, indexer, isGetter, isSetter, isLambda, lambdaArgContext ? lambdaArgContext.preProcessedLambdaArgs : null, expectClosingRParen);
            }
            this.state = ParseState.FncDeclArgs;
            var returnType = null;
            if(this.currentToken.tokenId == TypeScript.TokenID.Colon) {
                this.currentToken = this.scanner.scan();
                if(TypeScript.hasFlag(modifiers, TypeScript.Modifiers.Setter)) {
                    this.reportParseError("Property setters may not declare a return type");
                }
                returnType = this.parseTypeReference(errorRecoverySet, true);
            }
            if(indexer && args.members.length == 0) {
                this.reportParseError("Index signatures require a parameter type to be specified");
            }
            this.state = ParseState.FncDeclReturnType;
            if(isLambda && this.currentToken.tokenId != TypeScript.TokenID.EqualsGreaterThan) {
                this.reportParseError("Expected '=>'");
            }
            if(isDecl && !(this.parsingDeclareFile || markedAsAmbient) && (!isMethod || !(this.ambientModule || this.ambientClass || this.inInterfaceDecl)) && this.currentToken.tokenId == TypeScript.TokenID.Semicolon) {
                isOverload = true;
                isDecl = false;
                requiresSignature = true;
            }
            var svInFncDecl = this.inFncDecl;
            this.inFncDecl = true;
            var funcDecl = this.parseFunctionStatements(errorRecoverySet | TypeScript.ErrorRecoverySet.RCurly, name, false, isMethod, args, TypeScript.AllowedElements.None, minChar, requiresSignature, TypeScript.Modifiers.None);
            this.inFncDecl = svInFncDecl;
            funcDecl.variableArgList = variableArgList;
            funcDecl.isOverload = isOverload;
            if(!requiresSignature) {
                funcDecl.fncFlags |= TypeScript.FncFlags.Definition;
            }
            if(isStatic) {
                funcDecl.fncFlags |= TypeScript.FncFlags.Static;
            }
            if(requiresSignature) {
                funcDecl.fncFlags |= TypeScript.FncFlags.Signature;
            }
            if(indexer) {
                funcDecl.fncFlags |= TypeScript.FncFlags.IndexerMember;
            }
            funcDecl.returnTypeAnnotation = returnType;
            if(isMethod) {
                funcDecl.fncFlags |= TypeScript.FncFlags.Method;
                funcDecl.fncFlags |= TypeScript.FncFlags.ClassPropertyMethodExported;
            }
            funcDecl.leftCurlyCount = this.scanner.leftCurlyCount - leftCurlyCount;
            funcDecl.rightCurlyCount = this.scanner.rightCurlyCount - rightCurlyCount;
            this.nestingLevel = prevNestingLevel;
            this.parsingClassConstructorDefinition = prevInConstr;
            funcDecl.preComments = preComments;
            return funcDecl;
        };
        Parser.prototype.convertToTypeReference = function (ast) {
            var result;
            switch(ast.nodeType) {
                case TypeScript.NodeType.TypeRef: {
                    return ast;

                }
                case TypeScript.NodeType.Name: {
                    result = new TypeScript.TypeReference(ast, 0);
                    result.minChar = ast.minChar;
                    result.limChar = ast.limChar;
                    return result;

                }
                case TypeScript.NodeType.Index: {
                    var expr = ast;
                    result = this.convertToTypeReference(expr.operand1);
                    if(result) {
                        result.arrayCount++;
                        result.minChar = expr.minChar;
                        result.limChar = expr.limChar;
                        return result;
                    } else {
                        var etr = new TypeScript.AST(TypeScript.NodeType.Error);
                        return etr;
                    }
                }

            }
            return null;
        };
        Parser.prototype.parseArgList = function (errorRecoverySet) {
            var args = new TypeScript.ASTList();
            args.minChar = this.scanner.startPos;
            this.currentToken = this.scanner.scan();
            if(this.currentToken.tokenId !== TypeScript.TokenID.CloseParen) {
                while(true) {
                    if(args.members.length > 65535) {
                        this.reportParseError("max number of args exceeded");
                        break;
                    }
                    var arg = this.parseExpr(TypeScript.ErrorRecoverySet.Comma | errorRecoverySet, TypeScript.OperatorPrecedence.Comma, true, TypeContext.NoTypes);
                    args.append(arg);
                    if(this.currentToken.tokenId != TypeScript.TokenID.Comma) {
                        break;
                    }
                    this.currentToken = this.scanner.scan();
                }
            }
            args.limChar = this.scanner.pos;
            return args;
        };
        Parser.prototype.parseBaseList = function (extendsList, implementsList, errorRecoverySet, isClass) {
            var keyword = true;
            var currentList = extendsList;
            for(; ; ) {
                if(keyword) {
                    if(this.currentToken.tokenId === TypeScript.TokenID.Implements) {
                        currentList = implementsList;
                    } else {
                        if(this.currentToken.tokenId == TypeScript.TokenID.Extends && !this.requiresExtendsBlock) {
                            this.requiresExtendsBlock = isClass;
                        }
                    }
                    this.currentToken = this.scanner.scan();
                    keyword = false;
                }
                var baseName = null;
                if((this.currentToken.tokenId == TypeScript.TokenID.Identifier) || TypeScript.convertTokToID(this.currentToken, this.strictMode)) {
                    var minChar = this.scanner.startPos;
                    baseName = TypeScript.Identifier.fromToken(this.currentToken);
                    baseName.minChar = minChar;
                    baseName.limChar = this.scanner.pos;
                    baseName = this.parseNamedType(errorRecoverySet | TypeScript.ErrorRecoverySet.LCurly, minChar, baseName, false);
                } else {
                    this.reportParseError("Expected base name");
                    if(this.errorRecovery) {
                        baseName = new TypeScript.MissingIdentifier();
                        baseName.minChar = this.scanner.pos;
                        baseName.limChar = this.scanner.pos;
                        baseName.flags |= TypeScript.ASTFlags.Error;
                    }
                }
                if(this.currentToken.tokenId == TypeScript.TokenID.OpenParen) {
                    if(isClass) {
                        this.reportParseError("Base classes may only be initialized via a 'super' call within the constructor body");
                    } else {
                        this.reportParseError("Interfaces may not be extended with a call expression");
                    }
                } else {
                    currentList.append(baseName);
                }
                if(isClass && currentList == extendsList && extendsList.members.length > 1) {
                    this.reportParseError("A class may only extend one other class");
                }
                if(this.currentToken.tokenId == TypeScript.TokenID.Comma) {
                    this.currentToken = this.scanner.scan();
                    continue;
                } else {
                    if((this.currentToken.tokenId == TypeScript.TokenID.Extends) || (this.currentToken.tokenId == TypeScript.TokenID.Implements)) {
                        if(this.currentToken.tokenId == TypeScript.TokenID.Extends && !this.requiresExtendsBlock) {
                            this.requiresExtendsBlock = isClass;
                        }
                        currentList = extendsList;
                        keyword = true;
                        continue;
                    }
                }
                break;
            }
        };
        Parser.prototype.parseClassDecl = function (errorRecoverySet, minChar, modifiers) {
            var leftCurlyCount = this.scanner.leftCurlyCount;
            var rightCurlyCount = this.scanner.rightCurlyCount;
            if((modifiers & TypeScript.Modifiers.Readonly) != TypeScript.Modifiers.None) {
                this.reportParseError("const modifier is implicit for class");
            }
            if(this.parsingDeclareFile || this.ambientModule) {
                modifiers |= TypeScript.Modifiers.Ambient;
                modifiers |= TypeScript.Modifiers.Exported;
            }
            var classIsMarkedAsAmbient = this.parsingDeclareFile || (modifiers & TypeScript.Modifiers.Ambient) != TypeScript.Modifiers.None;
            var svAmbientClass = this.ambientClass;
            this.ambientClass = classIsMarkedAsAmbient;
            this.currentToken = this.scanner.scan();
            var name = null;
            if((this.currentToken.tokenId == TypeScript.TokenID.Identifier) || (!TypeScript.isPrimitiveTypeToken(this.currentToken) && TypeScript.convertTokToID(this.currentToken, this.strictMode))) {
                name = TypeScript.Identifier.fromToken(this.currentToken);
                name.minChar = this.scanner.startPos;
                name.limChar = this.scanner.pos;
                this.currentToken = this.scanner.scan();
            } else {
                this.reportParseError("class missing name");
                if(this.errorRecovery) {
                    name = new TypeScript.MissingIdentifier();
                    name.minChar = this.scanner.pos;
                    name.limChar = this.scanner.pos;
                    name.flags |= TypeScript.ASTFlags.Error;
                }
            }
            var extendsList = null;
            var implementsList = null;
            var requiresSignature = false;
            if((this.currentToken.tokenId == TypeScript.TokenID.Extends) || (this.currentToken.tokenId == TypeScript.TokenID.Implements)) {
                extendsList = new TypeScript.ASTList();
                implementsList = new TypeScript.ASTList();
                this.parseBaseList(extendsList, implementsList, errorRecoverySet, true);
            }
            var classDecl = new TypeScript.ClassDeclaration(name, new TypeScript.ASTList(), extendsList, implementsList);
            this.currentClassDefinition = classDecl;
            this.parseClassElements(classDecl, errorRecoverySet, modifiers);
            if(this.ambientModule || this.parsingDeclareFile || TypeScript.hasFlag(modifiers, TypeScript.Modifiers.Exported)) {
                classDecl.varFlags |= TypeScript.VarFlags.Exported;
            }
            if(this.ambientModule || TypeScript.hasFlag(modifiers, TypeScript.Modifiers.Ambient)) {
                classDecl.varFlags |= TypeScript.VarFlags.Ambient;
            }
            classDecl.varFlags |= TypeScript.VarFlags.Class;
            this.ambientClass = svAmbientClass;
            classDecl.leftCurlyCount = this.scanner.leftCurlyCount - leftCurlyCount;
            classDecl.rightCurlyCount = this.scanner.rightCurlyCount - rightCurlyCount;
            return classDecl;
        };
        Parser.prototype.parseClassElements = function (classDecl, errorRecoverySet, parentModifiers) {
            var modifiers = parentModifiers;
            var resetModifiers = false;
            var membersMinChar = this.scanner.startPos;
            this.checkCurrentToken(TypeScript.TokenID.OpenBrace, errorRecoverySet);
            this.nestingLevel++;
            var currentMemberMinChar = this.scanner.startPos;
            var wasGetOrSetId = false;
            while(!(this.currentToken.tokenId == TypeScript.TokenID.CloseBrace || this.currentToken.tokenId == TypeScript.TokenID.EndOfFile)) {
                var scanNext = true;
                var publicOrPrivateFlags = TypeScript.Modifiers.Public | TypeScript.Modifiers.Private;
                if(this.currentToken.tokenId == TypeScript.TokenID.Get) {
                    if(modifiers & TypeScript.Modifiers.Getter) {
                        this.reportParseError("Duplicate 'get' declaration in class body");
                    }
                    if(modifiers & TypeScript.Modifiers.Setter) {
                        this.reportParseError("Getter already marked as a setter");
                    }
                    modifiers |= TypeScript.Modifiers.Getter;
                } else {
                    if(this.currentToken.tokenId == TypeScript.TokenID.Set) {
                        if(modifiers & TypeScript.Modifiers.Setter) {
                            this.reportParseError("Duplicate 'set' declaration in class body");
                        }
                        if(modifiers & TypeScript.Modifiers.Getter) {
                            this.reportParseError("Setter already marked as a getter");
                        }
                        modifiers |= TypeScript.Modifiers.Setter;
                    } else {
                        if(this.currentToken.tokenId == TypeScript.TokenID.Private) {
                            if(modifiers & publicOrPrivateFlags) {
                                this.reportParseError("Multiple modifiers may not be applied to class members");
                            }
                            modifiers |= TypeScript.Modifiers.Private;
                        } else {
                            if(this.currentToken.tokenId == TypeScript.TokenID.Public) {
                                if(modifiers & publicOrPrivateFlags) {
                                    this.reportParseError("Multiple modifiers may not be applied to class members");
                                }
                                modifiers |= TypeScript.Modifiers.Public;
                            } else {
                                if(this.currentToken.tokenId == TypeScript.TokenID.Static) {
                                    if(modifiers & TypeScript.Modifiers.Static) {
                                        this.reportParseError("Multiple modifiers may not be applied to class members");
                                    }
                                    modifiers |= TypeScript.Modifiers.Static;
                                } else {
                                    if(this.currentToken.tokenId == TypeScript.TokenID.Constructor) {
                                        if(modifiers != parentModifiers) {
                                            this.reportParseError("Constructors may not have modifiers");
                                        }
                                        this.parseClassConstructorDeclaration(currentMemberMinChar, errorRecoverySet, modifiers);
                                        scanNext = false;
                                        resetModifiers = true;
                                    } else {
                                        if(wasGetOrSetId || this.currentToken.tokenId == TypeScript.TokenID.Identifier || TypeScript.convertTokToIDName(this.currentToken)) {
                                            var idText = wasGetOrSetId ? ((modifiers & TypeScript.Modifiers.Getter) ? "get" : "set") : this.currentToken.getText();
                                            var id = wasGetOrSetId ? new TypeScript.Identifier(idText) : TypeScript.Identifier.fromToken(this.currentToken);
                                            id.minChar = this.scanner.startPos;
                                            id.limChar = this.scanner.pos;
                                            if(wasGetOrSetId) {
                                                modifiers = modifiers ^ ((modifiers & TypeScript.Modifiers.Getter) ? TypeScript.Modifiers.Getter : TypeScript.Modifiers.Setter);
                                                wasGetOrSetId = false;
                                            } else {
                                                this.currentToken = this.scanner.scan();
                                            }
                                            if(this.currentToken.tokenId == TypeScript.TokenID.OpenParen) {
                                                this.parseClassMemberFunctionDeclaration(id, currentMemberMinChar, errorRecoverySet, modifiers);
                                                scanNext = false;
                                            } else {
                                                if(modifiers & TypeScript.Modifiers.Getter || modifiers & TypeScript.Modifiers.Setter) {
                                                    this.reportParseError("Property accessors must be functions");
                                                }
                                                var varDecl = this.parseClassMemberVariableDeclaration(id, currentMemberMinChar, false, errorRecoverySet, modifiers);
                                                if(varDecl.init && varDecl.init.nodeType == TypeScript.NodeType.FuncDecl) {
                                                    if(this.currentToken.tokenId == TypeScript.TokenID.CloseBrace) {
                                                        scanNext = false;
                                                    }
                                                } else {
                                                    if(varDecl.init && varDecl.init.nodeType == TypeScript.NodeType.ObjectLit && this.currentToken.tokenId != TypeScript.TokenID.Semicolon) {
                                                        scanNext = false;
                                                        varDecl.init.flags |= TypeScript.ASTFlags.AutomaticSemicolon;
                                                    } else {
                                                        if(this.currentToken.tokenId != TypeScript.TokenID.Semicolon) {
                                                            this.reportParseError("Expected ';'");
                                                            scanNext = false;
                                                        }
                                                    }
                                                }
                                            }
                                            resetModifiers = true;
                                        } else {
                                            if(this.currentToken.tokenId == TypeScript.TokenID.Super) {
                                                this.reportParseError("Base class initializers must be the first statement in a class definition");
                                            } else {
                                                if(!wasGetOrSetId && ((modifiers & TypeScript.Modifiers.Getter) || (modifiers & TypeScript.Modifiers.Setter)) && ((this.currentToken.tokenId == TypeScript.TokenID.OpenParen) || (this.currentToken.tokenId == TypeScript.TokenID.Equals) || (this.currentToken.tokenId == TypeScript.TokenID.Colon) || (this.currentToken.tokenId == TypeScript.TokenID.Semicolon))) {
                                                    wasGetOrSetId = true;
                                                    scanNext = false;
                                                } else {
                                                    if(this.currentToken.tokenId != TypeScript.TokenID.Semicolon) {
                                                        this.reportParseError("Unexpected '" + this.currentToken.getText() + "' in class definition");
                                                        resetModifiers = true;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if(scanNext) {
                    this.currentToken = this.scanner.scan();
                    if (this.currentToken === undefined) this.currentToken = this.scanner.scan();
                }
                if(resetModifiers) {
                    modifiers = parentModifiers;
                    currentMemberMinChar = this.scanner.startPos;
                    resetModifiers = false;
                }
            }
            var membersLimChar = this.scanner.pos;
            if(this.currentToken.tokenId == TypeScript.TokenID.CloseBrace) {
                classDecl.endingToken = new TypeScript.ASTSpan();
                classDecl.endingToken.minChar = this.scanner.startPos;
                classDecl.endingToken.limChar = this.scanner.pos;
                if(!this.currentClassDefinition.members.members.length) {
                    this.currentClassDefinition.preComments = this.parseComments();
                }
                this.currentToken = this.scanner.scan();
            }
            this.nestingLevel--;
            this.currentClassDefinition.members.minChar = membersMinChar;
            this.currentClassDefinition.members.limChar = membersLimChar;
            this.currentClassDefinition.limChar = membersLimChar;
            this.currentClassDefinition = null;
        };
        Parser.prototype.parseClassConstructorDeclaration = function (minChar, errorRecoverySet, modifiers) {
            this.parsingClassConstructorDefinition = true;
            var isAmbient = this.parsingDeclareFile || TypeScript.hasFlag(modifiers, TypeScript.Modifiers.Ambient);
            var args = new TypeScript.ASTList();
            var variableArgList = false;
            var preComments = this.parseComments();
            this.currentToken = this.scanner.scan();
            if(this.currentToken.tokenId == TypeScript.TokenID.OpenParen) {
                variableArgList = this.parseFormalParameterList(errorRecoverySet, args, true, isAmbient, false, false, false, false, null, true);
                if(args.members.length > 0) {
                    var lastArg = args.members[args.members.length - 1];
                }
            }
            var requiresSignature = isAmbient || this.currentToken.tokenId == TypeScript.TokenID.Semicolon;
            if(requiresSignature) {
                for(var i = 0; i < args.members.length; i++) {
                    var arg = args.members[i];
                    if(TypeScript.hasFlag(arg.varFlags, TypeScript.VarFlags.Property)) {
                        this.reportParseError("Overload or ambient signatures may not specify parameter properties", arg.minChar, arg.limChar);
                    }
                }
            }
            if(!requiresSignature) {
                this.currentClassDefinition.constructorNestingLevel = this.nestingLevel + 1;
            }
            var constructorFuncDecl = this.parseFunctionStatements(errorRecoverySet | TypeScript.ErrorRecoverySet.RCurly, this.currentClassDefinition.name, true, false, args, TypeScript.AllowedElements.Properties, minChar, requiresSignature, modifiers);
            constructorFuncDecl.preComments = preComments;
            if(requiresSignature && !isAmbient) {
                constructorFuncDecl.isOverload = true;
            }
            constructorFuncDecl.variableArgList = variableArgList;
            this.currentClassDecl = null;
            constructorFuncDecl.returnTypeAnnotation = this.convertToTypeReference(this.currentClassDefinition.name);
            constructorFuncDecl.classDecl = this.currentClassDefinition;
            if(isAmbient) {
                constructorFuncDecl.fncFlags |= TypeScript.FncFlags.Ambient;
            }
            if(requiresSignature) {
                constructorFuncDecl.fncFlags |= TypeScript.FncFlags.Signature;
            }
            if(this.ambientModule || TypeScript.hasFlag(modifiers, TypeScript.Modifiers.Exported)) {
                constructorFuncDecl.fncFlags |= TypeScript.FncFlags.Exported;
            }
            if(this.currentClassDefinition.constructorDecl) {
                if(!isAmbient && !this.currentClassDefinition.constructorDecl.isSignature() && !constructorFuncDecl.isSignature()) {
                    this.reportParseError("Duplicate constructor definition");
                }
            }
            if(isAmbient || !constructorFuncDecl.isSignature()) {
                this.currentClassDefinition.constructorDecl = constructorFuncDecl;
            }
            constructorFuncDecl.fncFlags |= TypeScript.FncFlags.ClassMethod;
            this.currentClassDefinition.members.members[this.currentClassDefinition.members.members.length] = constructorFuncDecl;
            this.parsingClassConstructorDefinition = false;
            return constructorFuncDecl;
        };
        Parser.prototype.parseClassMemberVariableDeclaration = function (text, minChar, isDeclaredInConstructor, errorRecoverySet, modifiers) {
            var varDecl = new TypeScript.VarDecl(text, this.nestingLevel);
            varDecl.minChar = minChar;
            var isStatic = false;
            varDecl.preComments = this.parseComments();
            if(this.currentToken.tokenId == TypeScript.TokenID.Colon) {
                this.currentToken = this.scanner.scan();
                varDecl.typeExpr = this.parseTypeReference(errorRecoverySet | TypeScript.ErrorRecoverySet.Asg | TypeScript.ErrorRecoverySet.Comma, false);
                if(varDecl.typeExpr && varDecl.typeExpr.nodeType == TypeScript.NodeType.TypeRef) {
                    var typeExpr = (varDecl.typeExpr);
                    if(typeExpr.term && typeExpr.term.nodeType == TypeScript.NodeType.FuncDecl) {
                        typeExpr.term.preComments = varDecl.preComments;
                    }
                }
            }
            if(this.currentToken.tokenId == TypeScript.TokenID.Equals) {
                if(this.parsingDeclareFile || TypeScript.hasFlag(modifiers, TypeScript.Modifiers.Ambient)) {
                    this.reportParseError("context does not permit variable initializer");
                    if(this.errorRecovery) {
                        this.skip(errorRecoverySet);
                        varDecl.flags |= TypeScript.ASTFlags.Error;
                        varDecl.limChar = this.scanner.lastTokenLimChar();
                        return varDecl;
                    }
                }
                this.currentToken = this.scanner.scan();
                varDecl.init = this.parseExpr(TypeScript.ErrorRecoverySet.Comma | errorRecoverySet, TypeScript.OperatorPrecedence.Comma, true, TypeContext.NoTypes);
                varDecl.limChar = varDecl.init.limChar;
                if(!(modifiers & TypeScript.Modifiers.Static)) {
                    this.currentClassDefinition.varFlags |= TypeScript.VarFlags.ClassSuperMustBeFirstCallInConstructor;
                }
            } else {
                varDecl.limChar = this.scanner.pos;
            }
            if(modifiers & TypeScript.Modifiers.Static) {
                varDecl.varFlags |= TypeScript.VarFlags.Static;
                isStatic = true;
            }
            if((modifiers & TypeScript.Modifiers.Private) != TypeScript.Modifiers.None) {
                varDecl.varFlags |= TypeScript.VarFlags.Private;
            } else {
                varDecl.varFlags |= TypeScript.VarFlags.Public;
            }
            varDecl.varFlags |= TypeScript.VarFlags.Property;
            if(isDeclaredInConstructor) {
                varDecl.varFlags |= TypeScript.VarFlags.ClassConstructorProperty;
            }
            if(!isDeclaredInConstructor && !isStatic) {
                varDecl.varFlags |= TypeScript.VarFlags.ClassBodyProperty;
            }
            this.currentClassDefinition.knownMemberNames[text.actualText] = true;
            if(!isDeclaredInConstructor) {
                this.currentClassDefinition.members.members[this.currentClassDefinition.members.members.length] = varDecl;
            }
            varDecl.postComments = this.parseComments();
            return varDecl;
        };
        Parser.prototype.parseClassMemberFunctionDeclaration = function (methodName, minChar, errorRecoverySet, modifiers) {
            var wasAccessorID = this.prevIDTok != null;
            var isAccessor = TypeScript.hasFlag(modifiers, TypeScript.Modifiers.Getter) || TypeScript.hasFlag(modifiers, TypeScript.Modifiers.Setter);
            var isStatic = TypeScript.hasFlag(modifiers, TypeScript.Modifiers.Static);
            var isAmbient = this.ambientModule || TypeScript.hasFlag(modifiers, TypeScript.Modifiers.Ambient);
            errorRecoverySet |= TypeScript.ErrorRecoverySet.RParen;
            if(isAccessor && (modifiers & TypeScript.Modifiers.Ambient)) {
                this.reportParseError("Property accessors may not be declared in ambient classes");
            }
            var ast = this.parseFncDecl(errorRecoverySet, true, isAmbient, true, methodName, false, isStatic, isAmbient, modifiers, null, true);
            if(ast.nodeType == TypeScript.NodeType.Error) {
                return ast;
            }
            var funcDecl = ast;
            funcDecl.minChar = minChar;
            if(funcDecl.bod !== null) {
                funcDecl.limChar = funcDecl.bod.limChar;
            }
            if(modifiers & TypeScript.Modifiers.Private) {
                funcDecl.fncFlags |= TypeScript.FncFlags.Private;
            } else {
                funcDecl.fncFlags |= TypeScript.FncFlags.Public;
            }
            if(isStatic) {
                funcDecl.fncFlags |= TypeScript.FncFlags.Static;
            }
            if(isAccessor) {
                if(TypeScript.hasFlag(modifiers, TypeScript.Modifiers.Getter)) {
                    funcDecl.fncFlags |= TypeScript.FncFlags.GetAccessor;
                    funcDecl.hint = "get" + funcDecl.name.actualText;
                } else {
                    funcDecl.fncFlags |= TypeScript.FncFlags.SetAccessor;
                    funcDecl.hint = "set" + funcDecl.name.actualText;
                }
                funcDecl.fncFlags |= TypeScript.FncFlags.IsFunctionExpression;
                if(TypeScript.codeGenTarget < TypeScript.CodeGenTarget.ES5) {
                    this.reportParseError("Property accessors are only available when targeting ES5 or greater", funcDecl.minChar, funcDecl.limChar);
                }
            }
            funcDecl.fncFlags |= TypeScript.FncFlags.ClassMethod;
            this.currentClassDefinition.knownMemberNames[methodName.actualText] = true;
            this.currentClassDefinition.members.members[this.currentClassDefinition.members.members.length] = funcDecl;
            return funcDecl;
        };
        Parser.prototype.parseTypeMember = function (errorRecoverySet) {
            var minChar = this.scanner.startPos;
            var propertyDecl = this.parsePropertyDeclaration(errorRecoverySet, TypeScript.Modifiers.Public, true, false);
            if(propertyDecl) {
                propertyDecl.minChar = minChar;
                if(propertyDecl.nodeType == TypeScript.NodeType.VarDecl) {
                    this.checkCurrentToken(TypeScript.TokenID.Semicolon, errorRecoverySet);
                }
            }
            return propertyDecl;
        };
        Parser.prototype.parseTypeMemberList = function (errorRecoverySet, members) {
            errorRecoverySet |= TypeScript.ErrorRecoverySet.TypeScriptS;
            while(true) {
                switch(this.currentToken.tokenId) {
                    case TypeScript.TokenID.CloseBrace:
                    case TypeScript.TokenID.EndOfFile: {
                        members.limChar = this.scanner.pos;
                        return;

                    }
                }
                var element = this.parseTypeMember(errorRecoverySet);
                if(element) {
                    members.append(element);
                }
            }
        };
        Parser.prototype.parseInterfaceDecl = function (errorRecoverySet, modifiers) {
            var leftCurlyCount = this.scanner.leftCurlyCount;
            var rightCurlyCount = this.scanner.rightCurlyCount;
            this.currentToken = this.scanner.scan();
            var minChar = this.scanner.pos;
            var name = null;
            if((this.currentToken.tokenId == TypeScript.TokenID.Identifier) || (!TypeScript.isPrimitiveTypeToken(this.currentToken) && TypeScript.convertTokToID(this.currentToken, this.strictMode))) {
                name = TypeScript.Identifier.fromToken(this.currentToken);
                name.minChar = this.scanner.startPos;
                name.limChar = this.scanner.pos;
                this.currentToken = this.scanner.scan();
            } else {
                this.reportParseError("interface missing name");
                if(this.errorRecovery) {
                    name = new TypeScript.MissingIdentifier();
                    name.minChar = this.scanner.pos;
                    name.limChar = this.scanner.pos;
                    name.flags |= TypeScript.ASTFlags.Error;
                }
            }
            var extendsList = null;
            var implementsList = null;
            if(this.currentToken.tokenId === TypeScript.TokenID.Extends || this.currentToken.tokenId === TypeScript.TokenID.Implements) {
                if(this.currentToken.tokenId === TypeScript.TokenID.Implements) {
                    this.reportParseError("Expected 'extends'");
                }
                extendsList = new TypeScript.ASTList();
                implementsList = new TypeScript.ASTList();
                extendsList.minChar = this.scanner.startPos;
                this.parseBaseList(extendsList, implementsList, errorRecoverySet, false);
            }
            var membersMinChar = this.scanner.startPos;
            this.checkCurrentToken(TypeScript.TokenID.OpenBrace, errorRecoverySet | TypeScript.ErrorRecoverySet.TypeScriptS);
            var members = new TypeScript.ASTList();
            members.minChar = membersMinChar;
            var prevInInterfaceDecl = this.inInterfaceDecl;
            this.inInterfaceDecl = true;
            this.parseTypeMemberList(errorRecoverySet | TypeScript.ErrorRecoverySet.RCurly, members);
            this.inInterfaceDecl = prevInInterfaceDecl;
            this.checkCurrentToken(TypeScript.TokenID.CloseBrace, errorRecoverySet);
            var interfaceDecl = new TypeScript.InterfaceDeclaration(name, members, extendsList, null);
            if(TypeScript.hasFlag(modifiers, TypeScript.Modifiers.Private)) {
                interfaceDecl.varFlags |= TypeScript.VarFlags.Private;
            }
            if(TypeScript.hasFlag(modifiers, TypeScript.Modifiers.Public)) {
                interfaceDecl.varFlags |= TypeScript.VarFlags.Public;
            }
            if(this.parsingDeclareFile || this.ambientModule || TypeScript.hasFlag(modifiers, TypeScript.Modifiers.Exported)) {
                interfaceDecl.varFlags |= TypeScript.VarFlags.Exported;
            }
            interfaceDecl.limChar = members.limChar;
            interfaceDecl.leftCurlyCount = this.scanner.leftCurlyCount - leftCurlyCount;
            interfaceDecl.rightCurlyCount = this.scanner.rightCurlyCount - rightCurlyCount;
            return interfaceDecl;
        };
        Parser.prototype.makeVarDecl = function (id, nest) {
            var varDecl = new TypeScript.VarDecl(id, nest);
            var currentVarList = this.topVarList();
            if(currentVarList) {
                currentVarList.append(varDecl);
            }
            return varDecl;
        };
        Parser.prototype.parsePropertyDeclaration = function (errorRecoverySet, modifiers, requireSignature, isStatic) {
            var text = null;
            var minChar = this.scanner.startPos;
            var nameLimChar = minChar;
            var isNew = false;
            var isIndexer = false;
            var wasAccessorID = this.prevIDTok != null;
            var isAccessor = TypeScript.hasFlag(modifiers, TypeScript.Modifiers.Getter) || TypeScript.hasFlag(modifiers, TypeScript.Modifiers.Setter);
            if(this.parsingDeclareFile || this.ambientModule || TypeScript.hasFlag(modifiers, TypeScript.Modifiers.Ambient)) {
                requireSignature = true;
            }
            if(this.currentToken.tokenId == TypeScript.TokenID.OpenParen && !wasAccessorID) {
                if(!requireSignature && !isStatic) {
                    this.reportParseError("Expected identifier in property declaration");
                    if(this.errorRecovery) {
                        this.skip(errorRecoverySet);
                        text = new TypeScript.MissingIdentifier();
                    }
                }
            } else {
                if(this.currentToken.tokenId == TypeScript.TokenID.New) {
                    if(requireSignature) {
                        this.currentToken = this.scanner.scan();
                        if(this.currentToken.tokenId == TypeScript.TokenID.OpenParen) {
                            isNew = true;
                        }
                    }
                    if(!isNew) {
                        if(!requireSignature) {
                            this.currentToken = this.scanner.scan();
                        }
                        text = new TypeScript.Identifier("new");
                        text.minChar = this.scanner.pos - 3;
                        text.limChar = this.scanner.pos;
                        nameLimChar = this.scanner.pos;
                    }
                } else {
                    if((this.currentToken.tokenId == TypeScript.TokenID.OpenBracket) && requireSignature) {
                        isIndexer = true;
                        text = new TypeScript.Identifier("__item");
                    } else {
                        if((this.currentToken.tokenId != TypeScript.TokenID.Identifier) && (!TypeScript.convertTokToIDName(this.currentToken)) && !wasAccessorID) {
                            this.reportParseError("Expected identifier in property declaration");
                            if(this.errorRecovery) {
                                var eminChar = this.scanner.startPos;
                                var curpos = this.scanner.pos;
                                this.skip(errorRecoverySet & (~TypeScript.ErrorRecoverySet.Comma));
                                if(this.scanner.pos == curpos) {
                                    this.currentToken = this.scanner.scan();
                                }
                                var epd = new TypeScript.VarDecl(new TypeScript.MissingIdentifier(), this.nestingLevel);
                                epd.flags |= TypeScript.ASTFlags.Error;
                                epd.minChar = eminChar;
                                epd.limChar = this.scanner.lastTokenLimChar();
                                return epd;
                            }
                        } else {
                            if(wasAccessorID) {
                                text = TypeScript.Identifier.fromToken(this.prevIDTok);
                                text.minChar = this.scanner.lastTokenLimChar() - 3;
                                text.limChar = this.scanner.lastTokenLimChar();
                                nameLimChar = text.limChar;
                                if(TypeScript.codeGenTarget < TypeScript.CodeGenTarget.ES5) {
                                    this.reportParseError("Property accessors are only available when targeting ES5 or greater");
                                }
                                if(this.currentToken.getText() == text.actualText && this.currentToken != this.prevIDTok) {
                                    this.currentToken = this.scanner.scan();
                                }
                                this.prevIDTok = null;
                            } else {
                                text = TypeScript.Identifier.fromToken(this.currentToken);
                                text.minChar = this.scanner.startPos;
                                text.limChar = this.scanner.pos;
                                nameLimChar = this.scanner.pos;
                                this.currentToken = this.scanner.scan();
                            }
                        }
                    }
                }
            }
            if(this.currentToken.tokenId == TypeScript.TokenID.Question) {
                if(this.inInterfaceDecl && text) {
                    text.flags |= TypeScript.ASTFlags.OptionalName;
                } else {
                    this.reportParseError("Optional properties may only be declared on interface or object types");
                }
                this.currentToken = this.scanner.scan();
            }
            if((this.currentToken.tokenId == TypeScript.TokenID.OpenParen) || (isIndexer && (this.currentToken.tokenId == TypeScript.TokenID.OpenBracket))) {
                var ers = errorRecoverySet | TypeScript.ErrorRecoverySet.RParen;
                if(isIndexer) {
                    ers = errorRecoverySet | TypeScript.ErrorRecoverySet.RBrack;
                }
                var ast = this.parseFncDecl(ers, true, requireSignature, !this.inFncDecl, text, isIndexer, isStatic, (this.parsingDeclareFile || TypeScript.hasFlag(modifiers, TypeScript.Modifiers.Ambient)), modifiers, null, true);
                var funcDecl;
                if(ast.nodeType == TypeScript.NodeType.Error) {
                    return ast;
                } else {
                    funcDecl = ast;
                }
                if(funcDecl.name) {
                    funcDecl.name.minChar = minChar;
                    funcDecl.name.limChar = nameLimChar;
                }
                if((modifiers & TypeScript.Modifiers.Public) != TypeScript.Modifiers.None) {
                    funcDecl.fncFlags |= TypeScript.FncFlags.Public;
                }
                if((modifiers & TypeScript.Modifiers.Private) != TypeScript.Modifiers.None) {
                    funcDecl.fncFlags |= TypeScript.FncFlags.Private;
                }
                if(isStatic) {
                    funcDecl.fncFlags |= TypeScript.FncFlags.Static;
                }
                if(this.parsingDeclareFile || TypeScript.hasFlag(modifiers, TypeScript.Modifiers.Ambient)) {
                    funcDecl.fncFlags |= TypeScript.FncFlags.Ambient;
                }
                if(isAccessor) {
                    if(TypeScript.hasFlag(modifiers, TypeScript.Modifiers.Getter)) {
                        funcDecl.fncFlags |= TypeScript.FncFlags.GetAccessor;
                        funcDecl.hint = "get" + funcDecl.name.actualText;
                    } else {
                        funcDecl.fncFlags |= TypeScript.FncFlags.SetAccessor;
                        funcDecl.hint = "set" + funcDecl.name.actualText;
                    }
                    funcDecl.fncFlags |= TypeScript.FncFlags.IsFunctionExpression;
                    if(modifiers & TypeScript.Modifiers.Ambient) {
                        this.reportParseError("Property accessors may not be declared in ambient types");
                    }
                }
                if(text == null) {
                    if(isNew) {
                        funcDecl.fncFlags |= TypeScript.FncFlags.ConstructMember;
                        funcDecl.hint = "_construct";
                        funcDecl.classDecl = this.currentClassDecl;
                    } else {
                        funcDecl.hint = "_call";
                        funcDecl.fncFlags |= TypeScript.FncFlags.CallMember;
                    }
                }
                return funcDecl;
            } else {
                var varDecl = new TypeScript.VarDecl(text, this.nestingLevel);
                varDecl.preComments = this.parseComments();
                varDecl.minChar = minChar;
                if(this.currentToken.tokenId == TypeScript.TokenID.Colon) {
                    this.currentToken = this.scanner.scan();
                    varDecl.typeExpr = this.parseTypeReference(errorRecoverySet | TypeScript.ErrorRecoverySet.Asg | TypeScript.ErrorRecoverySet.Comma, false);
                    if(varDecl.typeExpr && varDecl.typeExpr.nodeType == TypeScript.NodeType.TypeRef) {
                        var typeExpr = (varDecl.typeExpr);
                        if(typeExpr.term && typeExpr.term.nodeType == TypeScript.NodeType.FuncDecl) {
                            typeExpr.term.preComments = varDecl.preComments;
                        }
                    }
                }
                if(this.currentToken.tokenId == TypeScript.TokenID.Equals) {
                    if(requireSignature) {
                        this.reportParseError("context does not permit variable initializer");
                        if(this.errorRecovery) {
                            this.skip(errorRecoverySet);
                            varDecl.flags |= TypeScript.ASTFlags.Error;
                            varDecl.limChar = this.scanner.lastTokenLimChar();
                            return varDecl;
                        }
                    }
                    this.currentToken = this.scanner.scan();
                    varDecl.init = this.parseExpr(TypeScript.ErrorRecoverySet.Comma | errorRecoverySet, TypeScript.OperatorPrecedence.Comma, true, TypeContext.NoTypes);
                    varDecl.limChar = varDecl.init.limChar;
                    if(varDecl.init.nodeType == TypeScript.NodeType.FuncDecl) {
                        var funcDecl = varDecl.init;
                        funcDecl.hint = varDecl.id.text;
                        funcDecl.boundToProperty = varDecl;
                    } else {
                        if(isAccessor) {
                            this.reportParseError("Accessors may only be functions");
                        }
                    }
                } else {
                    varDecl.limChar = this.scanner.pos;
                }
                if((modifiers & TypeScript.Modifiers.Readonly) != TypeScript.Modifiers.None) {
                    varDecl.varFlags |= TypeScript.VarFlags.Readonly;
                }
                if(isStatic) {
                    varDecl.varFlags |= TypeScript.VarFlags.Static;
                }
                if((modifiers & TypeScript.Modifiers.Public) != TypeScript.Modifiers.None) {
                    varDecl.varFlags |= TypeScript.VarFlags.Public;
                }
                if((modifiers & TypeScript.Modifiers.Private) != TypeScript.Modifiers.None) {
                    varDecl.varFlags |= TypeScript.VarFlags.Private;
                }
                varDecl.varFlags |= TypeScript.VarFlags.Property;
                return varDecl;
            }
        };
        Parser.prototype.parseVariableDeclaration = function (errorRecoverySet, modifiers, allowIn, isStatic) {
            var isConst = TypeScript.hasFlag(modifiers, TypeScript.Modifiers.Readonly);
            var minChar = this.scanner.startPos;
            var varDecl = null;
            var declList = null;
            var multivar = false;
            this.currentToken = this.scanner.scan();
            var varDeclPreComments = this.parseComments();
            while(true) {
                if((this.currentToken.tokenId != TypeScript.TokenID.Identifier) && (!TypeScript.convertTokToID(this.currentToken, this.strictMode))) {
                    this.reportParseError("Expected identifier in variable declaration");
                    if(this.errorRecovery) {
                        varDecl = new TypeScript.VarDecl(new TypeScript.MissingIdentifier(), this.nestingLevel);
                        varDecl.minChar = minChar;
                        this.skip(errorRecoverySet);
                        varDecl.flags |= TypeScript.ASTFlags.Error;
                        varDecl.limChar = this.scanner.lastTokenLimChar();
                        return varDecl;
                    }
                }
                var varDeclName = TypeScript.Identifier.fromToken(this.currentToken);
                if(this.strictMode && (varDeclName.text == "eval")) {
                    this.reportParseError("'eval' may not name a variable in strict mode");
                }
                varDecl = this.makeVarDecl(varDeclName, this.nestingLevel);
                varDecl.id.minChar = this.scanner.startPos;
                varDecl.id.limChar = this.scanner.pos;
                varDecl.preComments = varDeclPreComments;
                if(isStatic) {
                    varDecl.varFlags |= TypeScript.VarFlags.Static;
                }
                if(TypeScript.hasFlag(modifiers, TypeScript.Modifiers.Readonly)) {
                    varDecl.varFlags |= TypeScript.VarFlags.Readonly;
                }
                if(this.parsingDeclareFile || this.ambientModule || TypeScript.hasFlag(modifiers, TypeScript.Modifiers.Ambient)) {
                    varDecl.varFlags |= TypeScript.VarFlags.Ambient;
                }
                if(this.parsingDeclareFile || this.ambientModule || TypeScript.hasFlag(modifiers, TypeScript.Modifiers.Exported)) {
                    varDecl.varFlags |= TypeScript.VarFlags.Exported;
                }
                varDecl.minChar = minChar;
                if(declList) {
                    declList.append(varDecl);
                }
                this.currentToken = this.scanner.scan();
                if(this.currentToken.tokenId == TypeScript.TokenID.Colon) {
                    this.currentToken = this.scanner.scan();
                    var prevInFncDecl = this.inFncDecl;
                    this.inFncDecl = false;
                    varDecl.typeExpr = this.parseTypeReference(errorRecoverySet | TypeScript.ErrorRecoverySet.Asg | TypeScript.ErrorRecoverySet.Comma, false);
                    this.inFncDecl = prevInFncDecl;
                }
                if(this.currentToken.tokenId == TypeScript.TokenID.Equals) {
                    if(TypeScript.hasFlag(varDecl.varFlags, TypeScript.VarFlags.Ambient)) {
                        this.reportParseError("Ambient variable can not have an initializer");
                    }
                    this.currentToken = this.scanner.scan();
                    varDecl.init = this.parseExpr(TypeScript.ErrorRecoverySet.Comma | errorRecoverySet, TypeScript.OperatorPrecedence.Comma, allowIn, TypeContext.NoTypes);
                    varDecl.limChar = varDecl.init.limChar;
                    if(varDecl.init.nodeType == TypeScript.NodeType.FuncDecl) {
                        var funcDecl = varDecl.init;
                        funcDecl.hint = varDecl.id.actualText;
                    }
                } else {
                    if(isConst) {
                        this.reportParseError("const declaration requires initializer");
                    }
                    varDecl.limChar = this.scanner.pos;
                }
                varDecl.postComments = this.parseCommentsForLine(this.scanner.line);
                if(this.currentToken.tokenId != TypeScript.TokenID.Comma) {
                    if(declList) {
                        declList.limChar = varDecl.limChar;
                        return declList;
                    } else {
                        return varDecl;
                    }
                }
                if(!multivar) {
                    declList = new TypeScript.ASTList();
                    declList.minChar = varDecl.minChar;
                    declList.append(varDecl);
                    multivar = true;
                }
                this.currentToken = this.scanner.scan();
                minChar = this.scanner.startPos;
            }
        };
        Parser.prototype.parseMemberList = function (errorRecoverySet) {
            var elements = new TypeScript.ASTList();
            if(this.currentToken.tokenId == TypeScript.TokenID.CloseBrace) {
                return elements;
            }
            var idHint = null;
            var memberName = null;
            var memberExpr = null;
            var member = null;
            var minChar = this.scanner.startPos;
            var isSet = false;
            var skippedTokenForGetSetId = false;
            var getSetTok = null;
            var getSetStartPos = 0;
            var getSetPos = 0;
            for(; ; ) {
                var accessorPattern = false;
                if(this.currentToken.tokenId == TypeScript.TokenID.Get || this.currentToken.tokenId == TypeScript.TokenID.Set) {
                    isSet = this.currentToken.tokenId == TypeScript.TokenID.Set;
                    getSetTok = this.currentToken;
                    getSetStartPos = this.scanner.startPos;
                    getSetPos = this.scanner.pos;
                    this.currentToken = this.scanner.scan();
                    if((this.currentToken.tokenId == TypeScript.TokenID.Identifier) || TypeScript.convertTokToIDName(this.currentToken)) {
                        idHint = isSet ? "set" : "get";
                        idHint = idHint + this.currentToken.getText();
                        memberName = TypeScript.Identifier.fromToken(this.currentToken);
                        memberName.minChar = this.scanner.startPos;
                        accessorPattern = true;
                        if(TypeScript.codeGenTarget < TypeScript.CodeGenTarget.ES5) {
                            this.reportParseError("Property accessors are only available when targeting ES5 or greater");
                        }
                    } else {
                        if(this.currentToken.tokenId != TypeScript.TokenID.Colon) {
                            this.reportParseError("Expected identifier, string or number as accessor name");
                        } else {
                            skippedTokenForGetSetId = true;
                            memberName = TypeScript.Identifier.fromToken(getSetTok);
                            memberName.minChar = getSetStartPos;
                            memberName.limChar = getSetPos;
                        }
                    }
                } else {
                    if((this.currentToken.tokenId == TypeScript.TokenID.Identifier) || TypeScript.convertTokToIDName(this.currentToken)) {
                        idHint = this.currentToken.getText();
                        memberName = TypeScript.Identifier.fromToken(this.currentToken);
                        memberName.minChar = this.scanner.startPos;
                        memberName.limChar = this.scanner.pos;
                    } else {
                        if(this.currentToken.tokenId == TypeScript.TokenID.StringLiteral) {
                            idHint = this.currentToken.getText();
                            memberName = new TypeScript.StringLiteral(idHint);
                            memberName.minChar = this.scanner.startPos;
                            memberName.limChar = this.scanner.pos;
                        } else {
                            if(this.currentToken.tokenId == TypeScript.TokenID.NumberLiteral) {
                                var ntok = this.currentToken;
                                idHint = ntok.value.toString();
                                memberName = new TypeScript.StringLiteral(idHint);
                                memberName.minChar = this.scanner.startPos;
                                memberName.limChar = this.scanner.pos;
                            } else {
                                this.reportParseError("Expected identifier, string or number as member name");
                                if(this.errorRecovery) {
                                    memberName = new TypeScript.MissingIdentifier();
                                    memberName.minChar = this.scanner.startPos;
                                    memberName.flags |= TypeScript.ASTFlags.Error;
                                    this.skip(errorRecoverySet | TypeScript.ErrorRecoverySet.Comma);
                                    memberName.limChar = this.scanner.lastTokenLimChar();
                                }
                            }
                        }
                    }
                }
                if(!skippedTokenForGetSetId) {
                    this.currentToken = this.scanner.scan();
                } else {
                    skippedTokenForGetSetId = false;
                }
                if(this.currentToken.tokenId == TypeScript.TokenID.Question) {
                    memberName.flags |= TypeScript.ASTFlags.OptionalName;
                    this.currentToken = this.scanner.scan();
                }
                if(accessorPattern) {
                    var args = new TypeScript.ASTList();
                    this.parseFormalParameterList(errorRecoverySet | TypeScript.ErrorRecoverySet.RParen, args, false, true, false, !isSet, isSet, false, null, true);
                    var funcDecl = this.parseFunctionStatements(errorRecoverySet | TypeScript.ErrorRecoverySet.RCurly, memberName, false, true, args, TypeScript.AllowedElements.None, this.scanner.startPos, false, TypeScript.Modifiers.None);
                    if(isSet && funcDecl.returnTypeAnnotation) {
                        this.reportParseError("Property setters may not declare a return type");
                    }
                    funcDecl.fncFlags |= isSet ? TypeScript.FncFlags.SetAccessor : TypeScript.FncFlags.GetAccessor;
                    funcDecl.fncFlags |= TypeScript.FncFlags.IsFunctionExpression;
                    funcDecl.hint = idHint;
                    memberExpr = funcDecl;
                    member = new TypeScript.BinaryExpression(TypeScript.NodeType.Member, memberName, memberExpr);
                    member.minChar = memberName.minChar;
                    if(memberExpr.nodeType == TypeScript.NodeType.FuncDecl) {
                        var funcDecl = memberExpr;
                        funcDecl.hint = idHint;
                    }
                } else {
                    if(this.currentToken.tokenId == TypeScript.TokenID.Colon) {
                        this.currentToken = this.scanner.scan();
                        memberExpr = this.parseExpr(TypeScript.ErrorRecoverySet.Comma | errorRecoverySet, TypeScript.OperatorPrecedence.Comma, true, TypeContext.NoTypes);
                        if(memberExpr.nodeType == TypeScript.NodeType.TypeRef) {
                            this.reportParseError("Expected 'new' on array declaration in member definition");
                        }
                        member = new TypeScript.BinaryExpression(TypeScript.NodeType.Member, memberName, memberExpr);
                        member.minChar = memberName.minChar;
                        if(memberExpr.nodeType == TypeScript.NodeType.FuncDecl) {
                            var funcDecl = memberExpr;
                            funcDecl.hint = idHint;
                        }
                    } else {
                        this.reportParseError("Expected ':' in member definition");
                        if(this.errorRecovery) {
                            this.skip(errorRecoverySet);
                            elements.flags |= TypeScript.ASTFlags.Error;
                            elements.minChar = minChar;
                            elements.limChar = this.scanner.lastTokenLimChar();
                            return elements;
                        }
                    }
                }
                idHint = null;
                elements.append(member);
                member.limChar = this.scanner.lastTokenLimChar();
                if(this.currentToken.tokenId != TypeScript.TokenID.Comma) {
                    break;
                } else {
                    this.currentToken = this.scanner.scan();
                }
                if(this.currentToken.tokenId == TypeScript.TokenID.CloseBrace) {
                    break;
                }
            }
            if(member) {
                elements.limChar = member.limChar;
            }
            elements.minChar = minChar;
            return elements;
        };
        Parser.prototype.parseArrayList = function (errorRecoverySet) {
            var elements = null;
            if(this.currentToken.tokenId == TypeScript.TokenID.CloseBracket) {
                return elements;
            } else {
                elements = new TypeScript.ASTList();
                elements.minChar = this.scanner.startPos;
            }
            var arg;
            for(; ; ) {
                if((this.currentToken.tokenId == TypeScript.TokenID.Comma) || (this.currentToken.tokenId == TypeScript.TokenID.CloseBracket)) {
                    arg = new TypeScript.AST(TypeScript.NodeType.EmptyExpr);
                } else {
                    arg = this.parseExpr(TypeScript.ErrorRecoverySet.Comma | errorRecoverySet, TypeScript.OperatorPrecedence.Comma, true, TypeContext.NoTypes);
                }
                elements.append(arg);
                if(this.currentToken.tokenId != TypeScript.TokenID.Comma) {
                    break;
                }
                this.currentToken = this.scanner.scan();
            }
            elements.limChar = this.scanner.lastTokenLimChar();
            return elements;
        };
        Parser.prototype.parseArrayLiteral = function (errorRecoverySet) {
            var arrayLiteral = null;
            arrayLiteral = new TypeScript.UnaryExpression(TypeScript.NodeType.ArrayLit, this.parseArrayList(errorRecoverySet));
            return arrayLiteral;
        };
        Parser.prototype.parseTerm = function (errorRecoverySet, allowCall, typeContext, inCast) {
            var ast = null;
            var sawId = false;
            var inNew = false;
            var minChar = this.scanner.startPos;
            var limChar = this.scanner.pos;
            var parseAsLambda = false;
            var expectlambdaRParen = false;
            switch(this.currentToken.tokenId) {
                case TypeScript.TokenID.Number:
                case TypeScript.TokenID.Bool:
                case TypeScript.TokenID.Any:
                case TypeScript.TokenID.String: {
                    var tid = new TypeScript.Identifier(TypeScript.tokenTable[this.currentToken.tokenId].text);
                    if(TypeScript.hasFlag(typeContext, TypeContext.Primitive)) {
                        ast = new TypeScript.TypeReference(tid, 0);
                        sawId = true;
                    } else {
                        ast = tid;
                        sawId = true;
                    }
                    ast.minChar = minChar;
                    this.currentToken = this.scanner.scan();
                    limChar = this.scanner.lastTokenLimChar();
                    break;

                }
                case TypeScript.TokenID.This: {
                    ast = new TypeScript.AST(TypeScript.NodeType.This);
                    ast.minChar = minChar;
                    this.currentToken = this.scanner.scan();
                    limChar = this.scanner.lastTokenLimChar();
                    break;

                }
                case TypeScript.TokenID.Super: {
                    ast = new TypeScript.AST(TypeScript.NodeType.Super);
                    ast.minChar = minChar;
                    this.currentToken = this.scanner.scan();
                    limChar = this.scanner.lastTokenLimChar();
                    break;

                }
                case TypeScript.TokenID.True: {
                    ast = new TypeScript.AST(TypeScript.NodeType.True);
                    this.currentToken = this.scanner.scan();
                    ast.minChar = minChar;
                    break;

                }
                case TypeScript.TokenID.False: {
                    ast = new TypeScript.AST(TypeScript.NodeType.False);
                    this.currentToken = this.scanner.scan();
                    ast.minChar = minChar;
                    break;

                }
                case TypeScript.TokenID.Null: {
                    ast = new TypeScript.AST(TypeScript.NodeType.Null);
                    this.currentToken = this.scanner.scan();
                    ast.minChar = minChar;
                    break;

                }
                case TypeScript.TokenID.New: {
                    minChar = this.scanner.pos;
                    this.currentToken = this.scanner.scan();
                    var target = this.parseTerm(errorRecoverySet, false, TypeContext.AllSimpleTypes, inCast);
                    if(target.nodeType == TypeScript.NodeType.Error || (target.nodeType == TypeScript.NodeType.Index && (target).operand1.nodeType == TypeScript.NodeType.TypeRef)) {
                        this.reportParseError("Cannot invoke 'new' on this expression");
                    } else {
                        ast = new TypeScript.CallExpression(TypeScript.NodeType.New, target, null);
                        ast.minChar = minChar;
                        limChar = this.scanner.lastTokenLimChar();
                        inNew = true;
                    }
                    break;

                }
                case TypeScript.TokenID.Function: {
                    minChar = this.scanner.pos;
                    ast = this.parseFncDecl(errorRecoverySet, false, false, false, null, false, false, false, TypeScript.Modifiers.None, null, true);
                    (ast).fncFlags |= TypeScript.FncFlags.IsFunctionExpression;
                    ast.minChar = minChar;
                    limChar = this.scanner.lastTokenLimChar();
                    ast.limChar = limChar;
                    break;

                }
            }
            if(ast == null) {
                if((this.currentToken.tokenId == TypeScript.TokenID.Identifier) || TypeScript.convertTokToID(this.currentToken, this.strictMode)) {
                    var idText = this.currentToken.getText();
                    ast = this.createRef(idText, (this.currentToken).hasEscapeSequence, minChar);
                    sawId = true;
                    ast.minChar = minChar;
                    this.currentToken = this.scanner.scan();
                    if(this.currentToken.tokenId == TypeScript.TokenID.Question) {
                        ast.flags |= TypeScript.ASTFlags.PossibleOptionalParameter;
                    }
                    limChar = this.scanner.lastTokenLimChar();
                }
            }
            if(inCast) {
                this.checkCurrentToken(TypeScript.TokenID.GreaterThan, errorRecoverySet);
            }
            if(ast == null) {
                switch(this.currentToken.tokenId) {
                    case TypeScript.TokenID.OpenParen: {
                        minChar = this.scanner.pos;
                        var prevTokId = this.scanner.previousToken().tokenId;
                        this.currentToken = this.scanner.scan();
                        var couldBeLambda = prevTokId == TypeScript.TokenID.OpenParen || prevTokId == TypeScript.TokenID.Comma || prevTokId == TypeScript.TokenID.EqualsEquals || prevTokId == TypeScript.TokenID.Colon;
                        if(couldBeLambda && this.currentToken.tokenId == TypeScript.TokenID.CloseParen) {
                            parseAsLambda = true;
                            expectlambdaRParen = false;
                            this.currentToken = this.scanner.scan();
                        } else {
                            if(couldBeLambda && this.currentToken.tokenId == TypeScript.TokenID.DotDotDot) {
                                parseAsLambda = true;
                                expectlambdaRParen = true;
                            } else {
                                ast = this.parseExpr(errorRecoverySet | TypeScript.ErrorRecoverySet.RParen, TypeScript.OperatorPrecedence.None, true, TypeContext.NoTypes, couldBeLambda);
                                limChar = this.scanner.lastTokenLimChar();
                                parseAsLambda = couldBeLambda && (ast.nodeType == TypeScript.NodeType.Name || ast.nodeType == TypeScript.NodeType.Comma) && (this.currentToken.tokenId == TypeScript.TokenID.Colon || this.currentToken.tokenId == TypeScript.TokenID.Question);
                                expectlambdaRParen = true;
                            }
                        }
                        if((ast && !parseAsLambda)) {
                            if(TypeScript.hasFlag(ast.flags, TypeScript.ASTFlags.SkipNextRParen)) {
                                ast.flags = ast.flags & (~(TypeScript.ASTFlags.SkipNextRParen));
                                break;
                            }
                            this.checkCurrentToken(TypeScript.TokenID.CloseParen, errorRecoverySet);
                            ast.isParenthesized = true;
                        }
                        break;

                    }
                    case TypeScript.TokenID.NumberLiteral: {
                        var numTok = this.currentToken;
                        this.currentToken = this.scanner.scan();
                        ast = new TypeScript.NumberLiteral(numTok.value, numTok.hasEmptyFraction);
                        ast.minChar = minChar;
                        limChar = this.scanner.lastTokenLimChar();
                        break;
                    }

                    case TypeScript.TokenID.StringLiteral: {
                        ast = new TypeScript.StringLiteral(this.currentToken.getText());
                        this.currentToken = this.scanner.scan();
                        ast.minChar = minChar;
                        limChar = this.scanner.lastTokenLimChar();
                        break;

                    }
                    case TypeScript.TokenID.RegularExpressionLiteral: {
                        var rtok = this.currentToken;
                        ast = new TypeScript.RegexLiteral(rtok.regex);
                        this.currentToken = this.scanner.scan();
                        ast.minChar = minChar;
                        limChar = this.scanner.lastTokenLimChar();
                        break;
                    }

                    case TypeScript.TokenID.OpenBracket: {
                        minChar = this.scanner.startPos;
                        this.currentToken = this.scanner.scan();
                        ast = this.parseArrayLiteral(TypeScript.ErrorRecoverySet.RBrack | errorRecoverySet);
                        ast.minChar = minChar;
                        limChar = this.scanner.pos;
                        this.checkCurrentToken(TypeScript.TokenID.CloseBracket, errorRecoverySet);
                        break;

                    }
                    case TypeScript.TokenID.OpenBrace: {
                        minChar = this.scanner.startPos;
                        this.currentToken = this.scanner.scan();
                        var members = this.parseMemberList(TypeScript.ErrorRecoverySet.RCurly | errorRecoverySet);
                        this.checkCurrentToken(TypeScript.TokenID.CloseBrace, errorRecoverySet);
                        ast = new TypeScript.UnaryExpression(TypeScript.NodeType.ObjectLit, members);
                        ast.minChar = minChar;
                        limChar = this.scanner.lastTokenLimChar();
                        members.minChar = minChar;
                        members.limChar = limChar;
                        break;

                    }
                    case TypeScript.TokenID.LessThan: {
                        minChar = this.scanner.startPos;
                        this.currentToken = this.scanner.scan();
                        var term = this.parseTypeReference(TypeScript.ErrorRecoverySet.BinOp, false);
                        this.checkCurrentToken(TypeScript.TokenID.GreaterThan, errorRecoverySet);
                        ast = new TypeScript.UnaryExpression(TypeScript.NodeType.TypeAssertion, this.parseExpr(errorRecoverySet, TypeScript.OperatorPrecedence.Unary, false, TypeContext.NoTypes));
                        (ast).castTerm = term;
                        break;

                    }
                    default: {
                        if(this.prevExpr && TypeScript.hasFlag(this.prevExpr.flags, TypeScript.ASTFlags.PossibleOptionalParameter)) {
                            parseAsLambda = true;
                            ast = this.prevExpr;
                        } else {
                            this.reportParseError("Check format of expression term");
                            if(this.errorRecovery) {
                                var ident = new TypeScript.MissingIdentifier();
                                ident.minChar = minChar;
                                ident.flags |= TypeScript.ASTFlags.Error;
                                this.skip(errorRecoverySet | TypeScript.ErrorRecoverySet.Postfix);
                                if((this.currentToken.tokenId == TypeScript.TokenID.Identifier) || TypeScript.convertTokToID(this.currentToken, this.strictMode)) {
                                    ident.setText(this.currentToken.getText(), (this.currentToken).hasEscapeSequence);
                                    this.currentToken = this.scanner.scan();
                                    limChar = this.scanner.lastTokenLimChar();
                                } else {
                                    limChar = this.scanner.lastTokenLimChar();
                                }
                                ast = ident;
                            }
                        }

                    }
                }
            }
            if(parseAsLambda) {
                if(this.currentToken.tokenId == TypeScript.TokenID.Colon || this.currentToken.tokenId == TypeScript.TokenID.Comma || this.currentToken.tokenId == TypeScript.TokenID.CloseParen || this.currentToken.tokenId == TypeScript.TokenID.DotDotDot) {
                    ast = this.parseLambdaExpr(errorRecoverySet, ast, true, expectlambdaRParen);
                    ast.minChar = minChar;
                    limChar = this.scanner.lastTokenLimChar();
                    ast.limChar = limChar;
                } else {
                    if(ast) {
                        ast.isParenthesized = true;
                    }
                }
            }
            if(sawId && (typeContext != TypeContext.NoTypes)) {
                typeContext |= TypeContext.ArraySuffix;
            }
            var postFix = this.parsePostfixOperators(errorRecoverySet, ast, allowCall, inNew, typeContext, minChar, limChar);
            if(postFix) {
                if(sawId && (postFix.nodeType == TypeScript.NodeType.Index)) {
                    var binExpr = postFix;
                    if(binExpr.operand2 == null) {
                        postFix = this.convertToTypeReference(postFix);
                    }
                }
                postFix.minChar = minChar;
                postFix.limChar = TypeScript.max(postFix.limChar, this.scanner.lastTokenLimChar());
                return postFix;
            } else {
                return new TypeScript.AST(TypeScript.NodeType.Error);
            }
        };
        Parser.prototype.parseLambdaExpr = function (errorRecoverySet, lambdaArgs, skipNextRParen, expectClosingRParen) {
            var ast = this.parseFncDecl(errorRecoverySet, false, false, false, null, false, false, false, TypeScript.Modifiers.None, {
                preProcessedLambdaArgs: lambdaArgs
            }, expectClosingRParen);
            (ast).fncFlags |= TypeScript.FncFlags.IsFunctionExpression;
            (ast).fncFlags |= TypeScript.FncFlags.IsFatArrowFunction;
            if(!skipNextRParen) {
                ast.flags |= TypeScript.ASTFlags.SkipNextRParen;
            }
            ast.limChar = this.scanner.lastTokenLimChar();
            ; ;
            return ast;
        };
        Parser.prototype.parseExpr = function (errorRecoverySet, minPrecedence, allowIn, typeContext, possiblyInLambda) {
            if (typeof possiblyInLambda === "undefined") { possiblyInLambda = false; }
            var ast = null;
            var tokenInfo = TypeScript.lookupToken(this.currentToken.tokenId);
            var canAssign = true;
            var idHint = null;
            var minChar = this.scanner.startPos;
            var preComments = this.parseComments();
            var exprIsAnonLambda = false;
            if((tokenInfo != undefined) && (tokenInfo.unopNodeType != TypeScript.NodeType.None)) {
                canAssign = false;
                this.currentToken = this.scanner.scan();
                var tempExpr = this.parseExpr(TypeScript.ErrorRecoverySet.BinOp | errorRecoverySet, tokenInfo.unopPrecedence, allowIn, TypeContext.NoTypes);
                if((tokenInfo.unopNodeType == TypeScript.NodeType.Pos) && (tempExpr.nodeType == TypeScript.NodeType.NumberLit)) {
                    ast = tempExpr;
                } else {
                    if((tokenInfo.unopNodeType == TypeScript.NodeType.Neg) && (tempExpr.nodeType == TypeScript.NodeType.NumberLit)) {
                        var numLit = tempExpr;
                        numLit.value = (-numLit.value);
                        if(numLit.value == 0) {
                            numLit.isNegativeZero = true;
                        }
                        ast = tempExpr;
                    } else {
                        ast = new TypeScript.UnaryExpression(tokenInfo.unopNodeType, tempExpr);
                        ast.limChar = tempExpr.limChar;
                    }
                }
                ast.minChar = minChar;
            } else {
                ast = this.parseTerm(TypeScript.ErrorRecoverySet.BinOp | TypeScript.ErrorRecoverySet.AddOp | errorRecoverySet, true, typeContext, false);
                var id;
                var temp;
                if(ast.nodeType == TypeScript.NodeType.Name) {
                    id = ast;
                    idHint = id.actualText;
                } else {
                    if(ast.nodeType == TypeScript.NodeType.Dot) {
                        var subsumedExpr = false;
                        if(this.inferPropertiesFromThisAssignment && (this.currentToken.tokenId == TypeScript.TokenID.Colon || this.currentToken.tokenId == TypeScript.TokenID.Equals) && this.parsingClassConstructorDefinition && this.nestingLevel == this.currentClassDefinition.constructorNestingLevel && (ast).operand1.nodeType == TypeScript.NodeType.This) {
                            if((ast).operand2.nodeType == TypeScript.NodeType.Name) {
                                var op2ID = ((ast).operand2);
                                if(!this.currentClassDefinition.knownMemberNames[op2ID.actualText]) {
                                    ast = this.parseClassMemberVariableDeclaration(op2ID, ast.minChar, true, errorRecoverySet, TypeScript.Modifiers.Public);
                                    subsumedExpr = true;
                                }
                            }
                        }
                        if(!subsumedExpr) {
                            temp = ast;
                            while(temp.nodeType == TypeScript.NodeType.Dot) {
                                var binExpr = temp;
                                temp = binExpr.operand2;
                            }
                            if(temp.nodeType == TypeScript.NodeType.Name) {
                                id = temp;
                                idHint = id.actualText;
                            }
                        }
                    }
                }
                if((!this.scanner.lastTokenHadNewline()) && ((this.currentToken.tokenId == TypeScript.TokenID.PlusPlus) || (this.currentToken.tokenId == TypeScript.TokenID.MinusMinus))) {
                    canAssign = false;
                    var operand = ast;
                    ast = new TypeScript.UnaryExpression((this.currentToken.tokenId == TypeScript.TokenID.PlusPlus) ? TypeScript.NodeType.IncPost : TypeScript.NodeType.DecPost, operand);
                    ast.limChar = this.scanner.pos;
                    ast.minChar = operand.minChar;
                    this.currentToken = this.scanner.scan();
                }
            }
            for(; ; ) {
                tokenInfo = TypeScript.lookupToken(this.currentToken.tokenId);
                if((tokenInfo == undefined) || (tokenInfo.binopNodeType == TypeScript.NodeType.None)) {
                    break;
                }
                if((!allowIn) && (tokenInfo.binopNodeType == TypeScript.NodeType.In)) {
                    break;
                }
                if(tokenInfo.binopPrecedence == TypeScript.OperatorPrecedence.Assignment) {
                    if(tokenInfo.binopPrecedence < minPrecedence) {
                        break;
                    }
                    if(!canAssign) {
                        this.reportParseError("illegal assignment");
                    }
                } else {
                    if(tokenInfo.binopPrecedence <= minPrecedence) {
                        break;
                    }
                }
                if(possiblyInLambda && this.currentToken.tokenId == TypeScript.TokenID.Comma && this.scanner.getLookAheadToken().tokenId == TypeScript.TokenID.DotDotDot) {
                    exprIsAnonLambda = true;
                    canAssign = false;
                    ast = this.parseLambdaExpr(errorRecoverySet, ast, false, true);
                    break;
                }
                this.currentToken = this.scanner.scan();
                canAssign = false;
                if(tokenInfo.binopNodeType == TypeScript.NodeType.ConditionalExpression) {
                    if(possiblyInLambda && (this.currentToken.tokenId == TypeScript.TokenID.Equals || this.currentToken.tokenId == TypeScript.TokenID.Colon || this.currentToken.tokenId == TypeScript.TokenID.CloseParen || this.currentToken.tokenId == TypeScript.TokenID.Comma)) {
                        exprIsAnonLambda = true;
                        canAssign = true;
                    } else {
                        this.prevExpr = ast;
                        var whenTrue = this.parseExpr(errorRecoverySet | TypeScript.ErrorRecoverySet.Colon, TypeScript.OperatorPrecedence.Assignment, allowIn, TypeContext.NoTypes);
                        this.prevExpr = null;
                        this.checkCurrentToken(TypeScript.TokenID.Colon, errorRecoverySet | TypeScript.ErrorRecoverySet.ExprStart);
                        var whenFalse = this.parseExpr(errorRecoverySet | TypeScript.ErrorRecoverySet.BinOp, TypeScript.OperatorPrecedence.Assignment, allowIn, TypeContext.NoTypes);
                        ast = new TypeScript.ConditionalExpression(ast, whenTrue, whenFalse);
                    }
                } else {
                    var tc = TypeContext.NoTypes;
                    var binExpr2;
                    binExpr2 = new TypeScript.BinaryExpression(tokenInfo.binopNodeType, ast, this.parseExpr(errorRecoverySet | TypeScript.ErrorRecoverySet.BinOp, tokenInfo.binopPrecedence, allowIn, TypeContext.NoTypes, possiblyInLambda));
                    if(binExpr2.operand2.nodeType == TypeScript.NodeType.FuncDecl) {
                        var funcDecl = binExpr2.operand2;
                        funcDecl.hint = idHint;
                    }
                    binExpr2.minChar = ast.minChar;
                    binExpr2.limChar = this.scanner.lastTokenLimChar();
                    idHint = null;
                    ast = binExpr2;
                }
            }
            if(canAssign) {
                ast.flags |= TypeScript.ASTFlags.Writeable;
            }
            if(!exprIsAnonLambda) {
                ast.minChar = minChar;
                ast.limChar = TypeScript.max(ast.limChar, this.scanner.lastTokenLimChar());
                ast.preComments = preComments;
                ast.postComments = this.parseCommentsForLine(this.scanner.line);
            }
            return ast;
        };
        Parser.prototype.parsePostfixOperators = function (errorRecoverySet, ast, allowCall, inNew, typeContext, lhsMinChar, lhsLimChar) {
            var count = 0;
            if(!ast) {
                ast = new TypeScript.AST(TypeScript.NodeType.EmptyExpr);
                ast.isParenthesized = true;
            }
            ast.minChar = lhsMinChar;
            ast.limChar = lhsLimChar;
            for(; ; ) {
                switch(this.currentToken.tokenId) {
                    case TypeScript.TokenID.OpenParen: {
                        if(inNew) {
                            var callExpr = ast;
                            callExpr.arguments = this.parseArgList(errorRecoverySet);
                            inNew = false;
                        } else {
                            if(!allowCall) {
                                return ast;
                            }
                            ast = new TypeScript.CallExpression(TypeScript.NodeType.Call, ast, this.parseArgList(errorRecoverySet));
                            ast.minChar = lhsMinChar;
                        }
                        ast.limChar = this.scanner.pos;
                        this.checkCurrentToken(TypeScript.TokenID.CloseParen, errorRecoverySet);
                        break;

                    }
                    case TypeScript.TokenID.OpenBracket: {
                        this.currentToken = this.scanner.scan();
                        if(this.currentToken.tokenId == TypeScript.TokenID.CloseBracket) {
                            if(TypeScript.hasFlag(typeContext, TypeContext.ArraySuffix)) {
                                this.currentToken = this.scanner.scan();
                                if(ast.nodeType == TypeScript.NodeType.TypeRef) {
                                    var typeRef = ast;
                                    typeRef.arrayCount++;
                                } else {
                                    ast = new TypeScript.BinaryExpression(TypeScript.NodeType.Index, ast, null);
                                }
                                ast.limChar = this.scanner.pos;
                                break;
                            }
                        }
                        ast = new TypeScript.BinaryExpression(TypeScript.NodeType.Index, ast, this.parseExpr(errorRecoverySet | TypeScript.ErrorRecoverySet.RBrack, TypeScript.OperatorPrecedence.None, true, TypeContext.NoTypes));
                        ast.minChar = lhsMinChar;
                        ast.limChar = this.scanner.pos;
                        this.checkCurrentToken(TypeScript.TokenID.CloseBracket, errorRecoverySet);
                        break;

                    }
                    case TypeScript.TokenID.Dot: {
                        var name = null;
                        var curpos = this.scanner.pos;
                        this.currentToken = this.scanner.scan();
                        if (this.currentToken === undefined) {
                            this.currentToken = this.scanner.scan();
                            continue;
                        }
                        if((this.currentToken.tokenId == TypeScript.TokenID.Identifier) || ((!this.errorRecovery || !this.scanner.lastTokenHadNewline()) && TypeScript.convertTokToIDName(this.currentToken))) {
                            ast.flags |= TypeScript.ASTFlags.DotLHS;
                            name = this.createRef(this.currentToken.getText(), (this.currentToken).hasEscapeSequence, this.scanner.startPos);
                            name.limChar = this.scanner.pos;
                            this.currentToken = this.scanner.scan();
                        } else {
                            this.reportParseError("Expected identifier following dot");
                            if(this.errorRecovery) {
                                this.skip(errorRecoverySet);
                                ast.flags |= (TypeScript.ASTFlags.Error | TypeScript.ASTFlags.DotLHS);
                                return ast;
                            } else {
                                name = new TypeScript.MissingIdentifier();
                            }
                        }
                        ast = new TypeScript.BinaryExpression(TypeScript.NodeType.Dot, ast, name);
                        ast.minChar = lhsMinChar;
                        ast.limChar = this.scanner.lastTokenLimChar();
                        break;
                    }

                    case TypeScript.TokenID.EqualsGreaterThan: {
                        ast = this.parseFncDecl(errorRecoverySet, false, false, false, null, false, false, false, TypeScript.Modifiers.None, {
                            preProcessedLambdaArgs: ast
                        }, false);
                        (ast).fncFlags |= TypeScript.FncFlags.IsFunctionExpression;
                        ast.minChar = lhsMinChar;
                        ast.limChar = this.scanner.lastTokenLimChar();
                        break;

                    }
                    default: {
                        return ast;

                    }
                }
            }
        };
        Parser.prototype.parseTry = function (tryNode, errorRecoverySet, parentModifiers) {
            var minChar = this.scanner.startPos;
            var preComments = this.parseComments();
            this.currentToken = this.scanner.scan();
            if(this.currentToken.tokenId != TypeScript.TokenID.OpenBrace) {
                this.reportParseError("Expected '{'");
                if(this.errorRecovery) {
                    var etryNode = tryNode;
                    etryNode.minChar = minChar;
                    etryNode.limChar = this.scanner.lastTokenLimChar();
                    etryNode.flags |= TypeScript.ASTFlags.Error;
                    return etryNode;
                }
            }
            tryNode.body = this.parseStatement(errorRecoverySet, TypeScript.AllowedElements.None, parentModifiers);
            tryNode.minChar = minChar;
            tryNode.limChar = tryNode.body.limChar;
            tryNode.preComments = preComments;
            tryNode.postComments = this.parseComments();
            return tryNode;
        };
        Parser.prototype.parseCatch = function (errorRecoverySet, parentModifiers) {
            var catchMinChar = this.scanner.startPos;
            var preComments = this.parseComments();
            this.currentToken = this.scanner.scan();
            this.checkCurrentToken(TypeScript.TokenID.OpenParen, errorRecoverySet | TypeScript.ErrorRecoverySet.ExprStart);
            if((this.currentToken.tokenId != TypeScript.TokenID.Identifier) || TypeScript.convertTokToID(this.currentToken, this.strictMode)) {
                this.reportParseError("Expected identifier in catch header");
                if(this.errorRecovery) {
                    this.skip(errorRecoverySet);
                    var ecatch = new TypeScript.Catch(new TypeScript.VarDecl(new TypeScript.MissingIdentifier(), this.nestingLevel), new TypeScript.Statement(TypeScript.NodeType.Empty));
                    ecatch.statement.minChar = catchMinChar;
                    ecatch.statement.limChar = this.scanner.pos;
                    ecatch.minChar = this.scanner.startPos;
                    ecatch.limChar = this.scanner.pos;
                    ecatch.flags |= TypeScript.ASTFlags.Error;
                    return ecatch;
                }
            }
            var param = new TypeScript.VarDecl(TypeScript.Identifier.fromToken(this.currentToken), this.nestingLevel);
            param.id.minChar = this.scanner.startPos;
            param.id.limChar = this.scanner.pos;
            param.minChar = param.id.minChar;
            param.limChar = param.id.limChar;
            this.currentToken = this.scanner.scan();
            var statementPos = this.scanner.pos;
            this.checkCurrentToken(TypeScript.TokenID.CloseParen, errorRecoverySet | TypeScript.ErrorRecoverySet.StmtStart);
            if(this.currentToken.tokenId != TypeScript.TokenID.OpenBrace) {
                this.reportParseError("Expected '{' to start catch body");
                if(this.errorRecovery) {
                    this.skip(errorRecoverySet);
                    var ecatch = new TypeScript.Catch(new TypeScript.VarDecl(new TypeScript.MissingIdentifier(), this.nestingLevel), new TypeScript.Statement(TypeScript.NodeType.Empty));
                    ecatch.statement.minChar = catchMinChar;
                    ecatch.statement.limChar = statementPos;
                    ecatch.minChar = this.scanner.startPos;
                    ecatch.limChar = this.scanner.pos;
                    ecatch.flags |= TypeScript.ASTFlags.Error;
                    return ecatch;
                }
            }
            var catchStmt = this.parseStatement(errorRecoverySet, TypeScript.AllowedElements.None, parentModifiers);
            var catchNode = new TypeScript.Catch(param, catchStmt);
            catchNode.statement.minChar = catchMinChar;
            catchNode.statement.limChar = statementPos;
            catchNode.minChar = catchMinChar;
            catchNode.limChar = catchStmt.limChar;
            catchNode.preComments = preComments;
            catchNode.postComments = this.parseComments();
            return catchNode;
        };
        Parser.prototype.parseFinally = function (errorRecoverySet, parentModifiers) {
            var finMinChar = this.scanner.startPos;
            var preComments = this.parseComments();
            this.currentToken = this.scanner.scan();
            if(this.currentToken.tokenId != TypeScript.TokenID.OpenBrace) {
                this.reportParseError("Expected '{' to start body of finally statement");
                if(this.errorRecovery) {
                    this.skip(errorRecoverySet);
                    var efin = new TypeScript.Finally(new TypeScript.Statement(TypeScript.NodeType.Empty));
                    efin.flags |= TypeScript.ASTFlags.Error;
                    efin.minChar = this.scanner.startPos;
                    efin.limChar = this.scanner.pos;
                    return efin;
                }
            }
            var finBody = this.parseStatement(errorRecoverySet, TypeScript.AllowedElements.None, parentModifiers);
            var fin = new TypeScript.Finally(finBody);
            fin.minChar = finMinChar;
            fin.limChar = fin.body.limChar;
            fin.preComments = preComments;
            fin.postComments = this.parseComments();
            return fin;
        };
        Parser.prototype.parseTryCatchFinally = function (errorRecoverySet, parentModifiers, labelList) {
            var tryPart = new TypeScript.Try(null);
            var tryMinChar = this.scanner.startPos;
            this.pushStmt(tryPart, labelList);
            this.parseTry(tryPart, errorRecoverySet | TypeScript.ErrorRecoverySet.Catch, parentModifiers);
            this.popStmt();
            var tc = null;
            var tf = null;
            if(this.currentToken.tokenId == TypeScript.TokenID.Catch) {
                var catchPart = this.parseCatch(errorRecoverySet | TypeScript.ErrorRecoverySet.Catch, parentModifiers);
                tc = new TypeScript.TryCatch(tryPart, catchPart);
                tc.minChar = tryPart.minChar;
                tc.limChar = catchPart.limChar;
            }
            if(this.currentToken.tokenId != TypeScript.TokenID.Finally) {
                if(tc == null) {
                    this.reportParseError("try with neither catch nor finally");
                    if(this.errorRecovery) {
                        var etf = new TypeScript.TryFinally(tryPart, new TypeScript.Finally(new TypeScript.AST(TypeScript.NodeType.Empty)));
                        etf.flags |= TypeScript.ASTFlags.Error;
                        etf.minChar = this.scanner.startPos;
                        etf.limChar = this.scanner.pos;
                        return etf;
                    }
                    return new TypeScript.TryFinally(tryPart, new TypeScript.Finally(new TypeScript.AST(TypeScript.NodeType.Empty)));
                } else {
                    return tc;
                }
            } else {
                if(tc) {
                    tryPart = tc;
                }
                var finallyPart = this.parseFinally(errorRecoverySet, parentModifiers);
                tf = new TypeScript.TryFinally(tryPart, finallyPart);
                tf.minChar = tryMinChar;
                tf.limChar = finallyPart.limChar;
                return tf;
            }
        };
        Parser.prototype.parseStatement = function (errorRecoverySet, allowedElements, parentModifiers) {
            var ast = null;
            var labelList = null;
            var astList = null;
            var temp;
            var modifiers = TypeScript.Modifiers.None;
            var minChar = this.scanner.startPos;
            var forInOk = false;
            var needTerminator = false;
            var fnOrVar = null;
            var preComments = this.parseComments();
            this.state = ParseState.StartStatement;
            function isAmbient() {
                return TypeScript.hasFlag(modifiers, TypeScript.Modifiers.Ambient) || TypeScript.hasFlag(parentModifiers, TypeScript.Modifiers.Ambient);
            }
            function mayNotBeExported() {
                if(TypeScript.hasFlag(modifiers, TypeScript.Modifiers.Exported)) {
                    this.reportError("Statement may not be exported");
                }
            }
            for(; ; ) {
                switch(this.currentToken.tokenId) {
                    case TypeScript.TokenID.EndOfFile: {
                        ast = new TypeScript.AST(TypeScript.NodeType.Error);
                        ast.minChar = minChar;
                        ast.limChar = this.scanner.pos;
                        break;

                    }
                    case TypeScript.TokenID.Function: {
                        if(this.parsingDeclareFile || isAmbient() || this.ambientModule) {
                            this.currentToken = this.scanner.scan();
                            fnOrVar = this.parsePropertyDeclaration(errorRecoverySet | TypeScript.ErrorRecoverySet.SColon, modifiers, true, false);
                            if(fnOrVar.nodeType == TypeScript.NodeType.VarDecl) {
                                this.reportParseError("function keyword can only introduce function declaration");
                            } else {
                                if((fnOrVar.nodeType == TypeScript.NodeType.FuncDecl) && ((fnOrVar).fncFlags , TypeScript.FncFlags.IsFatArrowFunction)) {
                                    needTerminator = true;
                                }
                            }
                            ast = fnOrVar;
                            if(this.parsingDeclareFile || this.ambientModule && ast.nodeType == TypeScript.NodeType.FuncDecl) {
                                (ast).fncFlags |= TypeScript.FncFlags.Exported;
                            }
                        } else {
                            ast = this.parseFncDecl(errorRecoverySet, true, false, false, null, false, false, isAmbient(), modifiers, null, true);
                            if(TypeScript.hasFlag((ast).fncFlags, TypeScript.FncFlags.IsFatArrowFunction)) {
                                needTerminator = true;
                            }
                            if(this.ambientModule) {
                                this.reportParseError("function declaration not permitted within ambient module");
                            }
                            if(TypeScript.hasFlag(modifiers, TypeScript.Modifiers.Exported)) {
                                (ast).fncFlags |= TypeScript.FncFlags.Exported;
                            }
                        }
                        break;

                    }
                    case TypeScript.TokenID.Module: {
                        if((allowedElements & TypeScript.AllowedElements.ModuleDeclarations) == TypeScript.AllowedElements.None) {
                            this.reportParseError("module not allowed in this context");
                            this.currentToken = this.scanner.scan();
                            ast = new TypeScript.AST(TypeScript.NodeType.Error);
                            ast.minChar = minChar;
                            ast.limChar = this.scanner.lastTokenLimChar();
                        } else {
                            ast = this.parseModuleDecl(errorRecoverySet, modifiers, preComments);
                            preComments = null;
                        }
                        break;

                    }
                    case TypeScript.TokenID.Import: {
                        if((allowedElements & TypeScript.AllowedElements.ModuleDeclarations) == TypeScript.AllowedElements.None) {
                            this.reportParseError("module not allowed in this context");
                            this.currentToken = this.scanner.scan();
                            ast = new TypeScript.AST(TypeScript.NodeType.Error);
                            ast.minChar = minChar;
                            ast.limChar = this.scanner.lastTokenLimChar();
                        } else {
                            if(TypeScript.hasFlag(modifiers, TypeScript.Modifiers.Exported)) {
                                this.reportParseError("export keyword not permitted on import declaration");
                            }
                            ast = this.parseImportDeclaration(errorRecoverySet, modifiers);
                            needTerminator = true;
                        }
                        break;

                    }
                    case TypeScript.TokenID.Export: {
                        if((allowedElements & TypeScript.AllowedElements.ModuleDeclarations) == TypeScript.AllowedElements.None) {
                            this.reportParseError("'export' statements are only allowed at the global and module levels");
                            this.currentToken = this.scanner.scan();
                            ast = new TypeScript.AST(TypeScript.NodeType.Error);
                            ast.minChar = minChar;
                            ast.limChar = this.scanner.lastTokenLimChar();
                        }
                        if(this.topLevel) {
                            this.hasTopLevelImportOrExport = true;
                        }
                        modifiers |= TypeScript.Modifiers.Exported;
                        this.currentToken = this.scanner.scan();
                        break;

                    }
                    case TypeScript.TokenID.Private: {
                        modifiers |= TypeScript.Modifiers.Private;
                        this.currentToken = this.scanner.scan();
                        if(this.parsingClassConstructorDefinition) {
                            if(!this.inferPropertiesFromThisAssignment) {
                                this.reportParseError("Property declarations are not permitted within constructor bodies");
                            }
                            minChar = this.scanner.pos;
                            if(this.inferPropertiesFromThisAssignment && (this.currentToken.tokenId != TypeScript.TokenID.This || (this.currentToken = this.scanner.scan()).tokenId != TypeScript.TokenID.Dot)) {
                                this.reportParseError("Expected 'this.' for property declaration");
                                this.currentToken = this.scanner.scan();
                                ast = new TypeScript.AST(TypeScript.NodeType.Error);
                                ast.minChar = minChar;
                                ast.limChar = this.scanner.lastTokenLimChar();
                            } else {
                                this.currentToken = this.scanner.scan();
                                var id = TypeScript.Identifier.fromToken(this.currentToken);
                                id.minChar = this.scanner.startPos;
                                id.limChar = this.scanner.pos;
                                this.currentToken = this.scanner.scan();
                                ast = this.parseClassMemberVariableDeclaration(id, minChar, this.parsingClassConstructorDefinition, errorRecoverySet, modifiers);
                            }
                        } else {
                            if(this.currentToken.tokenId != TypeScript.TokenID.Interface) {
                                if(this.currentToken.tokenId == TypeScript.TokenID.Get) {
                                    this.prevIDTok = this.currentToken;
                                    this.currentToken = this.scanner.scan();
                                    if(TypeScript.codeGenTarget < TypeScript.CodeGenTarget.ES5) {
                                        this.reportParseError("Property accessors are only available when targeting ES5 or greater");
                                    }
                                    if((this.currentToken.tokenId == TypeScript.TokenID.Identifier) || TypeScript.convertTokToID(this.currentToken, this.strictMode)) {
                                        modifiers |= TypeScript.Modifiers.Getter;
                                        this.prevIDTok = null;
                                    }
                                } else {
                                    if(this.currentToken.tokenId == TypeScript.TokenID.Set) {
                                        this.prevIDTok = this.currentToken;
                                        this.currentToken = this.scanner.scan();
                                        if(TypeScript.codeGenTarget < TypeScript.CodeGenTarget.ES5) {
                                            this.reportParseError("Property accessors are only available when targeting ES5 or greater");
                                        }
                                        if((this.currentToken.tokenId == TypeScript.TokenID.Identifier) || TypeScript.convertTokToID(this.currentToken, this.strictMode)) {
                                            modifiers |= TypeScript.Modifiers.Setter;
                                            this.prevIDTok = null;
                                        }
                                    }
                                }
                                fnOrVar = this.parsePropertyDeclaration(errorRecoverySet | TypeScript.ErrorRecoverySet.SColon, modifiers, isAmbient(), false);
                                if((fnOrVar.nodeType == TypeScript.NodeType.VarDecl) || ((fnOrVar.nodeType == TypeScript.NodeType.FuncDecl) && (TypeScript.hasFlag((fnOrVar).fncFlags, TypeScript.FncFlags.IsFatArrowFunction)))) {
                                    needTerminator = true;
                                }
                                ast = fnOrVar;
                            }
                        }
                        break;

                    }
                    case TypeScript.TokenID.Public: {
                        if(this.parsingClassConstructorDefinition) {
                            if(!this.inferPropertiesFromThisAssignment) {
                                this.reportParseError("Property declarations are not permitted within constructor bodies");
                            }
                            this.currentToken = this.scanner.scan();
                            minChar = this.scanner.pos;
                            modifiers |= TypeScript.Modifiers.Public;
                            if(this.inferPropertiesFromThisAssignment && (this.currentToken.tokenId != TypeScript.TokenID.This || (this.currentToken = this.scanner.scan()).tokenId != TypeScript.TokenID.Dot)) {
                                this.reportParseError("Expected 'this.' for property declaration");
                                this.currentToken = this.scanner.scan();
                                ast = new TypeScript.AST(TypeScript.NodeType.Error);
                                ast.minChar = minChar;
                                ast.limChar = this.scanner.lastTokenLimChar();
                            } else {
                                this.currentToken = this.scanner.scan();
                                var id = TypeScript.Identifier.fromToken(this.currentToken);
                                id.minChar = this.scanner.startPos;
                                id.limChar = this.scanner.pos;
                                this.currentToken = this.scanner.scan();
                                ast = this.parseClassMemberVariableDeclaration(id, minChar, this.parsingClassConstructorDefinition, errorRecoverySet, modifiers);
                            }
                        } else {
                            if((allowedElements & TypeScript.AllowedElements.Properties) == TypeScript.AllowedElements.None) {
                                this.reportParseError("'property' statements are only allowed within classes");
                                this.currentToken = this.scanner.scan();
                                ast = new TypeScript.AST(TypeScript.NodeType.Error);
                                ast.minChar = minChar;
                                ast.limChar = this.scanner.lastTokenLimChar();
                            } else {
                                modifiers |= TypeScript.Modifiers.Public;
                                this.currentToken = this.scanner.scan();
                                if(this.currentToken.tokenId == TypeScript.TokenID.Get) {
                                    this.prevIDTok = this.currentToken;
                                    this.currentToken = this.scanner.scan();
                                    if(TypeScript.codeGenTarget < TypeScript.CodeGenTarget.ES5) {
                                        this.reportParseError("Property accessors are only available when targeting ES5 or greater");
                                    }
                                    if((this.currentToken.tokenId == TypeScript.TokenID.Identifier) || TypeScript.convertTokToID(this.currentToken, this.strictMode)) {
                                        modifiers |= TypeScript.Modifiers.Getter;
                                        this.prevIDTok = null;
                                    }
                                } else {
                                    if(this.currentToken.tokenId == TypeScript.TokenID.Set) {
                                        this.prevIDTok = this.currentToken;
                                        this.currentToken = this.scanner.scan();
                                        if(TypeScript.codeGenTarget < TypeScript.CodeGenTarget.ES5) {
                                            this.reportParseError("Property accessors are only available when targeting ES5 or greater");
                                        }
                                        if((this.currentToken.tokenId == TypeScript.TokenID.Identifier) || TypeScript.convertTokToID(this.currentToken, this.strictMode)) {
                                            modifiers |= TypeScript.Modifiers.Setter;
                                            this.prevIDTok = null;
                                        }
                                    }
                                }
                                fnOrVar = this.parsePropertyDeclaration(errorRecoverySet | TypeScript.ErrorRecoverySet.SColon, modifiers, isAmbient(), false);
                                if((fnOrVar.nodeType == TypeScript.NodeType.VarDecl) || ((fnOrVar.nodeType == TypeScript.NodeType.FuncDecl) && TypeScript.hasFlag((fnOrVar).fncFlags, TypeScript.FncFlags.IsFatArrowFunction))) {
                                    needTerminator = true;
                                }
                                ast = fnOrVar;
                            }
                        }
                        break;

                    }
                    case TypeScript.TokenID.Declare: {
                        if(!(allowedElements & TypeScript.AllowedElements.AmbientDeclarations)) {
                            this.reportParseError("Ambient declarations are only allowed at the top-level or module scopes");
                        }
                        if(!this.parsingDeclareFile && TypeScript.hasFlag(parentModifiers, TypeScript.Modifiers.Ambient)) {
                            this.reportParseError("Duplicate ambient declaration in this context. (Is the enclosing module or class already ambient?)");
                        }
                        modifiers |= TypeScript.Modifiers.Ambient;
                        this.currentToken = this.scanner.scan();
                        break;

                    }
                    case TypeScript.TokenID.Class: {
                        if((allowedElements & TypeScript.AllowedElements.ClassDeclarations) == TypeScript.AllowedElements.None) {
                            this.reportParseError("class not allowed in this context");
                            this.currentToken = this.scanner.scan();
                            ast = new TypeScript.AST(TypeScript.NodeType.Error);
                            ast.minChar = minChar;
                            ast.limChar = this.scanner.lastTokenLimChar();
                        } else {
                            ast = this.parseClassDecl(errorRecoverySet, minChar, modifiers);
                        }
                        break;

                    }
                    case TypeScript.TokenID.Interface: {
                        if((allowedElements & TypeScript.AllowedElements.InterfaceDeclarations) == TypeScript.AllowedElements.None) {
                            this.reportParseError("interface not allowed in this context");
                            this.currentToken = this.scanner.scan();
                            ast = new TypeScript.AST(TypeScript.NodeType.Error);
                            ast.minChar = minChar;
                            ast.limChar = this.scanner.lastTokenLimChar();
                        } else {
                            ast = this.parseInterfaceDecl(errorRecoverySet, modifiers);
                        }
                        break;

                    }
                    case TypeScript.TokenID.Var: {
                        var declAst = this.parseVariableDeclaration(errorRecoverySet | TypeScript.ErrorRecoverySet.StmtStart, modifiers, true, false);
                        if(declAst.nodeType == TypeScript.NodeType.VarDecl) {
                            ast = declAst;
                        } else {
                            ast = new TypeScript.Block(declAst, false);
                        }
                        needTerminator = true;
                        break;

                    }
                    case TypeScript.TokenID.Static: {
                        if(this.currentClassDecl == null) {
                            this.reportParseError("Statics may only be class members");
                        }
                        mayNotBeExported();
                        modifiers |= TypeScript.Modifiers.Public;
                        this.currentToken = this.scanner.scan();
                        if(this.currentToken.tokenId == TypeScript.TokenID.Get) {
                            this.prevIDTok = this.currentToken;
                            this.currentToken = this.scanner.scan();
                            if(TypeScript.codeGenTarget < TypeScript.CodeGenTarget.ES5) {
                                this.reportParseError("Property accessors are only available when targeting ES5 or greater");
                            }
                            if((this.currentToken.tokenId == TypeScript.TokenID.Identifier) || TypeScript.convertTokToID(this.currentToken, this.strictMode)) {
                                modifiers |= TypeScript.Modifiers.Getter;
                                this.prevIDTok = null;
                            }
                        } else {
                            if(this.currentToken.tokenId == TypeScript.TokenID.Set) {
                                this.currentToken = this.scanner.scan();
                                if(TypeScript.codeGenTarget < TypeScript.CodeGenTarget.ES5) {
                                    this.reportParseError("Property accessors are only available when targeting ES5 or greater");
                                }
                                if((this.currentToken.tokenId == TypeScript.TokenID.Identifier) || TypeScript.convertTokToID(this.currentToken, this.strictMode)) {
                                    modifiers |= TypeScript.Modifiers.Setter;
                                }
                            }
                        }
                        if(isAmbient()) {
                            modifiers |= TypeScript.Modifiers.Ambient;
                        }
                        fnOrVar = this.parsePropertyDeclaration(errorRecoverySet | TypeScript.ErrorRecoverySet.SColon, modifiers, this.parsingDeclareFile || (modifiers & TypeScript.Modifiers.Ambient) != TypeScript.Modifiers.None, true);
                        var staticsList = this.topStaticsList();
                        if(staticsList && fnOrVar.nodeType == TypeScript.NodeType.VarDecl) {
                            staticsList.append(fnOrVar);
                        }
                        if(fnOrVar.nodeType == TypeScript.NodeType.VarDecl || ((fnOrVar.nodeType == TypeScript.NodeType.FuncDecl) && TypeScript.hasFlag((fnOrVar).fncFlags, TypeScript.FncFlags.IsFatArrowFunction))) {
                            needTerminator = true;
                        }
                        ast = fnOrVar;
                        break;

                    }
                    case TypeScript.TokenID.For: {
                        mayNotBeExported();
                        if(modifiers != TypeScript.Modifiers.None) {
                            this.reportParseError("syntax error: for statement does not take modifiers");
                        }
                        minChar = this.scanner.startPos;
                        this.checkNextToken(TypeScript.TokenID.OpenParen, errorRecoverySet | TypeScript.ErrorRecoverySet.ExprStart | TypeScript.ErrorRecoverySet.Var);
                        this.state = ParseState.ForInit;
                        forInOk = true;
                        switch(this.currentToken.tokenId) {
                            case TypeScript.TokenID.Var: {
                                temp = this.parseVariableDeclaration(errorRecoverySet | TypeScript.ErrorRecoverySet.SColon | TypeScript.ErrorRecoverySet.In, TypeScript.Modifiers.None, false, false);
                                break;

                            }
                            case TypeScript.TokenID.Semicolon: {
                                temp = null;
                                this.state = ParseState.ForCondStart;
                                break;

                            }
                            default: {
                                temp = this.parseExpr(errorRecoverySet | TypeScript.ErrorRecoverySet.SColon | TypeScript.ErrorRecoverySet.In, TypeScript.OperatorPrecedence.None, false, TypeContext.NoTypes);
                                break;

                            }
                        }
                        this.state = ParseState.ForInitAfterVar;
                        if(this.currentToken.tokenId == TypeScript.TokenID.In) {
                            if((temp == null) || (!forInOk)) {
                                this.reportParseError("malformed for statement");
                                if(this.errorRecovery) {
                                    this.skip(errorRecoverySet | TypeScript.ErrorRecoverySet.StmtStart);
                                    ast = new TypeScript.AST(TypeScript.NodeType.Empty);
                                    ast.flags |= TypeScript.ASTFlags.Error;
                                }
                            } else {
                                this.currentToken = this.scanner.scan();
                                var forInStmt = new TypeScript.ForInStatement(temp, this.parseExpr(TypeScript.ErrorRecoverySet.RParen | errorRecoverySet, TypeScript.OperatorPrecedence.Comma, false, TypeContext.NoTypes));
                                forInStmt.limChar = this.scanner.pos;
                                forInStmt.statement.minChar = minChar;
                                forInStmt.statement.limChar = this.scanner.pos;
                                this.checkCurrentToken(TypeScript.TokenID.CloseParen, TypeScript.ErrorRecoverySet.StmtStart | errorRecoverySet);
                                this.pushStmt(forInStmt, labelList);
                                forInStmt.body = this.parseStatement(errorRecoverySet, allowedElements, parentModifiers);
                                this.popStmt();
                                forInStmt.minChar = minChar;
                                ast = forInStmt;
                            }
                        } else {
                            var forStmt = new TypeScript.ForStatement(temp);
                            forStmt.minChar = minChar;
                            this.checkCurrentToken(TypeScript.TokenID.Semicolon, errorRecoverySet);
                            if(this.currentToken.tokenId == TypeScript.TokenID.Semicolon) {
                                forStmt.cond = null;
                            } else {
                                forStmt.cond = this.parseExpr(errorRecoverySet | TypeScript.ErrorRecoverySet.SColon | TypeScript.ErrorRecoverySet.RParen, TypeScript.OperatorPrecedence.None, true, TypeContext.NoTypes);
                                if(this.currentToken.tokenId != TypeScript.TokenID.Semicolon) {
                                    this.skip(errorRecoverySet | TypeScript.ErrorRecoverySet.StmtStart);
                                    ast = forStmt;
                                    ast.flags |= TypeScript.ASTFlags.Error;
                                }
                            }
                            this.currentToken = this.scanner.scan();
                            if(this.currentToken.tokenId == TypeScript.TokenID.CloseParen) {
                                forStmt.incr = null;
                            } else {
                                forStmt.incr = this.parseExpr(errorRecoverySet | TypeScript.ErrorRecoverySet.SColon | TypeScript.ErrorRecoverySet.RParen, TypeScript.OperatorPrecedence.None, true, TypeContext.NoTypes);
                            }
                            this.checkCurrentToken(TypeScript.TokenID.CloseParen, errorRecoverySet | TypeScript.ErrorRecoverySet.LCurly);
                            this.pushStmt(forStmt, labelList);
                            forStmt.body = this.parseStatement(errorRecoverySet, allowedElements, parentModifiers);
                            this.popStmt();
                            forStmt.limChar = forStmt.body.limChar;
                            ast = forStmt;
                        }
                        break;

                    }
                    case TypeScript.TokenID.With: {
 {
                            if(TypeScript.codeGenTarget < TypeScript.CodeGenTarget.ES5) {
                                this.reportParseError("'with' statements are only available in ES5 codegen mode or better");
                            }
                            if(this.strictMode) {
                                this.reportParseError("'with' statements are not available in strict mode");
                            }
                            mayNotBeExported();
                            if(modifiers != TypeScript.Modifiers.None) {
                                this.reportParseError("'with' statement does not take modifiers");
                            }
                            minChar = this.scanner.startPos;
                            this.checkNextToken(TypeScript.TokenID.OpenParen, errorRecoverySet | TypeScript.ErrorRecoverySet.ExprStart | TypeScript.ErrorRecoverySet.Var);
                            var expr = this.parseExpr(errorRecoverySet | TypeScript.ErrorRecoverySet.Colon, TypeScript.OperatorPrecedence.None, true, TypeContext.NoTypes);
                            this.checkCurrentToken(TypeScript.TokenID.CloseParen, errorRecoverySet | TypeScript.ErrorRecoverySet.LCurly);
                            var withStmt = new TypeScript.WithStatement(expr);
                            withStmt.body = this.parseStatement(errorRecoverySet, allowedElements, parentModifiers);
                            withStmt.minChar = minChar;
                            withStmt.limChar = withStmt.body.limChar;
                            ast = withStmt;
                        }
                        break;

                    }
                    case TypeScript.TokenID.Switch: {
                        mayNotBeExported();
                        if(modifiers != TypeScript.Modifiers.None) {
                            this.reportParseError("'switch' statement does not take modifiers");
                        }
                        this.checkNextToken(TypeScript.TokenID.OpenParen, errorRecoverySet | TypeScript.ErrorRecoverySet.ExprStart);
                        var switchStmt = new TypeScript.SwitchStatement(this.parseExpr(errorRecoverySet | TypeScript.ErrorRecoverySet.RParen, TypeScript.OperatorPrecedence.None, true, TypeContext.NoTypes));
                        switchStmt.statement.minChar = minChar;
                        switchStmt.statement.limChar = this.scanner.pos;
                        this.checkCurrentToken(TypeScript.TokenID.CloseParen, errorRecoverySet | TypeScript.ErrorRecoverySet.LCurly);
                        var caseListMinChar = this.scanner.startPos;
                        this.checkCurrentToken(TypeScript.TokenID.OpenBrace, errorRecoverySet | TypeScript.ErrorRecoverySet.SCase);
                        switchStmt.defaultCase = null;
                        switchStmt.caseList = new TypeScript.ASTList();
                        var caseStmt = null;
                        this.pushStmt(switchStmt, labelList);
                        for(; ; ) {
                            if((this.currentToken.tokenId == TypeScript.TokenID.Case) || (this.currentToken.tokenId == TypeScript.TokenID.Default)) {
                                var isDefault = (this.currentToken.tokenId == TypeScript.TokenID.Default);
                                caseStmt = new TypeScript.CaseStatement();
                                caseStmt.minChar = this.scanner.startPos;
                                this.currentToken = this.scanner.scan();
                                if(isDefault) {
                                    switchStmt.defaultCase = caseStmt;
                                } else {
                                    caseStmt.expr = this.parseExpr(errorRecoverySet | TypeScript.ErrorRecoverySet.Colon, TypeScript.OperatorPrecedence.None, true, TypeContext.NoTypes);
                                }
                                this.checkCurrentToken(TypeScript.TokenID.Colon, errorRecoverySet | TypeScript.ErrorRecoverySet.StmtStart);
                                caseStmt.body = new TypeScript.ASTList();
                                this.parseStatementList(errorRecoverySet | TypeScript.ErrorRecoverySet.RCurly, caseStmt.body, false, true, allowedElements, modifiers);
                                caseStmt.limChar = caseStmt.body.limChar;
                                switchStmt.caseList.append(caseStmt);
                            } else {
                                break;
                            }
                        }
                        switchStmt.caseList.minChar = caseListMinChar;
                        switchStmt.caseList.limChar = this.scanner.pos;
                        switchStmt.limChar = switchStmt.caseList.limChar;
                        this.checkCurrentToken(TypeScript.TokenID.CloseBrace, errorRecoverySet);
                        this.popStmt();
                        ast = switchStmt;
                        break;
                    }

                    case TypeScript.TokenID.While: {
                        mayNotBeExported();
                        if(modifiers != TypeScript.Modifiers.None) {
                            this.reportParseError("'while' statement does not take modifiers");
                        }
                        minChar = this.scanner.startPos;
                        this.checkNextToken(TypeScript.TokenID.OpenParen, TypeScript.ErrorRecoverySet.ExprStart | errorRecoverySet);
                        var whileStmt = new TypeScript.WhileStatement(this.parseExpr(errorRecoverySet | TypeScript.ErrorRecoverySet.RParen, TypeScript.OperatorPrecedence.None, true, TypeContext.NoTypes));
                        whileStmt.minChar = minChar;
                        this.checkCurrentToken(TypeScript.TokenID.CloseParen, errorRecoverySet | TypeScript.ErrorRecoverySet.StmtStart);
                        this.pushStmt(whileStmt, labelList);
                        whileStmt.body = this.parseStatement(errorRecoverySet, allowedElements, parentModifiers);
                        whileStmt.limChar = whileStmt.body.limChar;
                        this.popStmt();
                        ast = whileStmt;
                        break;
                    }

                    case TypeScript.TokenID.Do: {
                        mayNotBeExported();
                        if(modifiers != TypeScript.Modifiers.None) {
                            this.reportParseError("'do' statement does not take modifiers");
                        }
                        minChar = this.scanner.startPos;
                        this.currentToken = this.scanner.scan();
                        var doStmt = new TypeScript.DoWhileStatement();
                        doStmt.minChar = minChar;
                        this.pushStmt(doStmt, labelList);
                        doStmt.body = this.parseStatement(errorRecoverySet | TypeScript.ErrorRecoverySet.While, allowedElements, parentModifiers);
                        this.popStmt();
                        doStmt.whileAST = new TypeScript.Identifier("while");
                        doStmt.whileAST.minChar = this.scanner.startPos;
                        this.checkCurrentToken(TypeScript.TokenID.While, errorRecoverySet | TypeScript.ErrorRecoverySet.LParen);
                        doStmt.whileAST.limChar = doStmt.whileAST.minChar + 5;
                        this.checkCurrentToken(TypeScript.TokenID.OpenParen, errorRecoverySet | TypeScript.ErrorRecoverySet.ExprStart);
                        doStmt.cond = this.parseExpr(errorRecoverySet | TypeScript.ErrorRecoverySet.RParen, TypeScript.OperatorPrecedence.None, true, TypeContext.NoTypes);
                        doStmt.limChar = this.scanner.pos;
                        this.checkCurrentToken(TypeScript.TokenID.CloseParen, errorRecoverySet);
                        ast = doStmt;
                        if(this.currentToken.tokenId == TypeScript.TokenID.Semicolon) {
                            this.currentToken = this.scanner.scan();
                        }
                        break;
                    }

                    case TypeScript.TokenID.If: {
                        mayNotBeExported();
                        if(modifiers != TypeScript.Modifiers.None) {
                            this.reportParseError("if statement does not take modifiers");
                        }
                        minChar = this.scanner.startPos;
                        this.checkNextToken(TypeScript.TokenID.OpenParen, errorRecoverySet | TypeScript.ErrorRecoverySet.ExprStart);
                        var ifStmt = new TypeScript.IfStatement(this.parseExpr(errorRecoverySet | TypeScript.ErrorRecoverySet.LParen, TypeScript.OperatorPrecedence.None, true, TypeContext.NoTypes));
                        ifStmt.minChar = minChar;
                        ifStmt.statement.minChar = minChar;
                        ifStmt.statement.limChar = this.scanner.pos;
                        this.checkCurrentToken(TypeScript.TokenID.CloseParen, errorRecoverySet | TypeScript.ErrorRecoverySet.StmtStart);
                        this.pushStmt(ifStmt, labelList);
                        ifStmt.thenBod = this.parseStatement(TypeScript.ErrorRecoverySet.Else | errorRecoverySet, allowedElements, parentModifiers);
                        ifStmt.limChar = ifStmt.thenBod.limChar;
                        if(this.currentToken.tokenId == TypeScript.TokenID.Else) {
                            this.currentToken = this.scanner.scan();
                            ifStmt.elseBod = this.parseStatement(errorRecoverySet, allowedElements, parentModifiers);
                            ifStmt.limChar = ifStmt.elseBod.limChar;
                        }
                        this.popStmt();
                        ast = ifStmt;
                        break;
                    }

                    case TypeScript.TokenID.Try: {
                        mayNotBeExported();
                        if(modifiers != TypeScript.Modifiers.None) {
                            this.reportParseError("try statement does not take modifiers");
                        }
                        minChar = this.scanner.startPos;
                        ast = this.parseTryCatchFinally(errorRecoverySet, parentModifiers, labelList);
                        break;
                    }

                    case TypeScript.TokenID.OpenBrace: {
                        mayNotBeExported();
                        if(modifiers != TypeScript.Modifiers.None) {
                            this.reportParseError("block does not take modifiers");
                        }
                        minChar = this.scanner.startPos;
                        this.currentToken = this.scanner.scan();
                        var block = new TypeScript.Block(new TypeScript.ASTList(), true);
                        this.pushStmt(block, labelList);
                        this.parseStatementList(errorRecoverySet | TypeScript.ErrorRecoverySet.RCurly, block.statements, false, false, TypeScript.AllowedElements.None, modifiers);
                        this.popStmt();
                        block.statements.minChar = minChar;
                        block.statements.limChar = this.scanner.pos;
                        block.minChar = block.statements.minChar;
                        block.limChar = block.statements.limChar;
                        this.checkCurrentToken(TypeScript.TokenID.CloseBrace, errorRecoverySet);
                        ast = block;
                        break;
                    }

                    case TypeScript.TokenID.Semicolon: {
                        mayNotBeExported();
                        if(modifiers != TypeScript.Modifiers.None) {
                            this.reportParseError("modifier can not appear here");
                        }
                        ast = new TypeScript.AST(TypeScript.NodeType.Empty);
                        this.currentToken = this.scanner.scan();
                        break;

                    }
                    case TypeScript.TokenID.Break:
                    case TypeScript.TokenID.Continue: {
                        mayNotBeExported();
                        if(modifiers != TypeScript.Modifiers.None) {
                            this.reportParseError("modifiers can not appear before jump statement");
                        }
                        var jump = new TypeScript.Jump((this.currentToken.tokenId == TypeScript.TokenID.Break) ? TypeScript.NodeType.Break : TypeScript.NodeType.Continue);
                        this.currentToken = this.scanner.scan();
                        if((this.currentToken.tokenId == TypeScript.TokenID.Identifier) && (!this.scanner.lastTokenHadNewline())) {
                            jump.target = this.currentToken.getText();
                            this.currentToken = this.scanner.scan();
                        }
                        this.resolveJumpTarget(jump);
                        ast = jump;
                        needTerminator = true;
                        break;
                    }

                    case TypeScript.TokenID.Return: {
                        mayNotBeExported();
                        if(modifiers != TypeScript.Modifiers.None) {
                            this.reportParseError("modifiers can not appear before return statement");
                        }
                        if(!this.inFunction) {
                            this.reportParseError("return statement outside of function body");
                        }
                        minChar = this.scanner.startPos;
                        this.currentToken = this.scanner.scan();
                        var retStmt = new TypeScript.ReturnStatement();
                        retStmt.minChar = minChar;
                        if((this.currentToken.tokenId != TypeScript.TokenID.Semicolon) && (this.currentToken.tokenId != TypeScript.TokenID.CloseBrace) && (!(this.scanner.lastTokenHadNewline()))) {
                            retStmt.returnExpression = this.parseExpr(errorRecoverySet | TypeScript.ErrorRecoverySet.SColon, TypeScript.OperatorPrecedence.None, true, TypeContext.NoTypes);
                        }
                        needTerminator = true;
                        retStmt.limChar = this.scanner.lastTokenLimChar();
                        ast = retStmt;
                        break;
                    }

                    case TypeScript.TokenID.Throw: {
                        mayNotBeExported();
                        if(modifiers != TypeScript.Modifiers.None) {
                            this.reportParseError("modifiers can not appear before a throw statement");
                        }
                        minChar = this.scanner.startPos;
                        this.currentToken = this.scanner.scan();
                        if((this.currentToken.tokenId != TypeScript.TokenID.Semicolon) && (this.currentToken.tokenId != TypeScript.TokenID.CloseBrace) && (!(this.scanner.lastTokenHadNewline()))) {
                            temp = this.parseExpr(errorRecoverySet | TypeScript.ErrorRecoverySet.SColon, TypeScript.OperatorPrecedence.None, true, TypeContext.NoTypes);
                        } else {
                            this.reportParseError("throw with no target");
                            temp = null;
                        }
                        ast = new TypeScript.UnaryExpression(TypeScript.NodeType.Throw, temp);
                        ast.limChar = this.scanner.lastTokenLimChar();
                        needTerminator = true;
                        break;

                    }
                    case TypeScript.TokenID.Enum: {
                        this.currentToken = this.scanner.scan();
                        ast = this.parseEnumDecl(errorRecoverySet, modifiers);
                        ast.minChar = minChar;
                        ast.limChar = this.scanner.lastTokenLimChar();
                        if(this.parsingDeclareFile || this.ambientModule || TypeScript.hasFlag(modifiers, TypeScript.Modifiers.Ambient)) {
                            (ast).modFlags |= TypeScript.ModuleFlags.Ambient;
                        }
                        if(this.parsingDeclareFile || this.ambientModule || TypeScript.hasFlag(modifiers, TypeScript.Modifiers.Exported)) {
                            (ast).modFlags |= TypeScript.ModuleFlags.Exported;
                        }
                        break;

                    }
                    case TypeScript.TokenID.Debugger: {
                        mayNotBeExported();
                        if(modifiers != TypeScript.Modifiers.None) {
                            this.reportParseError("modifiers can not appear before debugger statement");
                        }
                        minChar = this.scanner.startPos;
                        this.currentToken = this.scanner.scan();
                        var debuggerStmt = new TypeScript.DebuggerStatement();
                        debuggerStmt.minChar = minChar;
                        needTerminator = true;
                        debuggerStmt.limChar = this.scanner.lastTokenLimChar();
                        ast = debuggerStmt;
                        break;

                    }
                    default: {
                        if(modifiers != TypeScript.Modifiers.None) {
                            this.reportParseError("modifiers can not appear before an expression statement or label");
                        }
                        minChar = this.scanner.startPos;
                        var svPos = this.scanner.pos;
                        temp = this.parseExpr(TypeScript.ErrorRecoverySet.Colon | TypeScript.ErrorRecoverySet.StmtStart | errorRecoverySet, TypeScript.OperatorPrecedence.None, true, TypeContext.NoTypes);
                        if(this.scanner.pos == svPos) {
                            this.currentToken = this.scanner.scan();
                            ast = temp;
                        } else {
                            if((this.currentToken.tokenId == TypeScript.TokenID.Colon) && (!this.scanner.lastTokenHadNewline()) && temp && (temp.nodeType == TypeScript.NodeType.Name)) {
                                if(labelList == null) {
                                    labelList = new TypeScript.ASTList();
                                }
                                labelList.append(new TypeScript.Label(temp));
                                this.currentToken = this.scanner.scan();
                            } else {
                                ast = temp;
                                needTerminator = true;
                            }
                        }

                    }
                }
                if(ast) {
                    break;
                }
            }
            if(needTerminator) {
                switch(this.currentToken.tokenId) {
                    case TypeScript.TokenID.Semicolon: {
                        this.currentToken = this.scanner.scan();
                        ast.flags |= TypeScript.ASTFlags.ExplicitSemicolon;
                        break;

                    }
                    case TypeScript.TokenID.EndOfFile: {
                        ast.limChar = this.scanner.pos;

                    }
                    case TypeScript.TokenID.CloseBrace: {
                        ast.flags |= TypeScript.ASTFlags.AutomaticSemicolon;
                        if(this.style_requireSemi) {
                            this.reportParseStyleError("no automatic semicolon");
                        }
                        break;

                    }
                    default: {
                        if(!this.scanner.lastTokenHadNewline()) {
                            this.reportParseError("Expected ';'");
                        } else {
                            ast.flags |= TypeScript.ASTFlags.AutomaticSemicolon;
                            if(this.style_requireSemi) {
                                this.reportParseStyleError("no automatic semicolon");
                            }
                        }
                        break;

                    }
                }
            }
            if(labelList) {
                ast = new TypeScript.LabeledStatement(labelList, ast);
            }
            ast.minChar = minChar;
            ast.limChar = TypeScript.max(ast.limChar, this.scanner.lastTokenLimChar());
            if(preComments) {
                ast.preComments = preComments;
            }
            if(this.ambientModule && (!this.okAmbientModuleMember(ast))) {
                this.reportParseError("statement not permitted within ambient module");
            }
            ast.flags |= TypeScript.ASTFlags.IsStatement;
            return ast;
        };
        Parser.prototype.okAmbientModuleMember = function (ast) {
            var nt = ast.nodeType;
            return (nt == TypeScript.NodeType.ClassDeclaration) || (nt == TypeScript.NodeType.ImportDeclaration) || (nt == TypeScript.NodeType.InterfaceDeclaration) || (nt == TypeScript.NodeType.ModuleDeclaration) || (nt == TypeScript.NodeType.Empty) || (nt == TypeScript.NodeType.VarDecl) || ((nt == TypeScript.NodeType.Block) && !(ast).isStatementBlock) || ((nt == TypeScript.NodeType.FuncDecl) && ((ast).isMethod()));
        };
        Parser.prototype.parseStatementList = function (errorRecoverySet, statements, sourceElms, noLeadingCase, allowedElements, parentModifiers) {
            var directivePrologue = sourceElms;
            statements.minChar = this.scanner.startPos;
            var limChar = this.scanner.pos;
            var innerStmts = (allowedElements & TypeScript.AllowedElements.ModuleDeclarations) == TypeScript.AllowedElements.None;
            var classNope = (allowedElements & TypeScript.AllowedElements.ClassDeclarations) == TypeScript.AllowedElements.None;
            errorRecoverySet |= TypeScript.ErrorRecoverySet.TypeScriptS | TypeScript.ErrorRecoverySet.RCurly;
            this.state = ParseState.StartStatementList;
            var oldStrictMode = this.strictMode;
            this.nestingLevel++;
            for(; ; ) {
                if((this.currentToken.tokenId == TypeScript.TokenID.CloseBrace) || (noLeadingCase && ((this.currentToken.tokenId == TypeScript.TokenID.Case) || (this.currentToken.tokenId == TypeScript.TokenID.Default))) || (innerStmts && (this.currentToken.tokenId == TypeScript.TokenID.Export)) || (classNope && (this.currentToken.tokenId == TypeScript.TokenID.Class)) || (this.currentToken.tokenId == TypeScript.TokenID.EndOfFile)) {
                    this.state = ParseState.EndStmtList;
                    statements.limChar = limChar;
                    if(statements.members.length == 0) {
                        statements.preComments = this.parseComments();
                    } else {
                        statements.postComments = this.parseComments();
                    }
                    this.strictMode = oldStrictMode;
                    this.nestingLevel--;
                    return;
                }
                var stmt = this.parseStatement(errorRecoverySet & (~(TypeScript.ErrorRecoverySet.Else | TypeScript.ErrorRecoverySet.RParen | TypeScript.ErrorRecoverySet.Catch | TypeScript.ErrorRecoverySet.Colon)), allowedElements, parentModifiers);
                if(stmt) {
                    stmt.postComments = this.combineComments(stmt.postComments, this.parseCommentsForLine(this.scanner.prevLine));
                    statements.append(stmt);
                    limChar = stmt.limChar;
                    if(directivePrologue) {
                        if(stmt.nodeType == TypeScript.NodeType.QString) {
                            var qstring = stmt;
                            if(qstring.text == "\"use strict\"") {
                                statements.flags |= TypeScript.ASTFlags.StrictMode;
                                this.strictMode = true;
                            } else {
                                directivePrologue = false;
                            }
                        } else {
                            directivePrologue = false;
                        }
                    }
                }
            }
        };
        Parser.prototype.quickParse = function (sourceText, filename, unitIndex) {
            var svGenTarget = TypeScript.moduleGenTarget;
            try  {
                TypeScript.moduleGenTarget = TypeScript.ModuleGenTarget.Local;
                var script = this.parse(sourceText, filename, unitIndex, TypeScript.AllowedElements.QuickParse);
                return new QuickParseResult(script, this.scanner.lexState);
            }finally {
                TypeScript.moduleGenTarget = svGenTarget;
            }
        };
        Parser.prototype.parse = function (sourceText, filename, unitIndex, allowedElements) {
            if (typeof allowedElements === "undefined") { allowedElements = TypeScript.AllowedElements.Global; }
            var _this = this;
            this.ambientModule = false;
            this.topLevel = true;
            this.hasTopLevelImportOrExport = false;
            this.requiresExtendsBlock = false;
            this.fname = filename;
            this.currentUnitIndex = unitIndex;
            this.amdDependencies = [];
            this.scanner.resetComments();
            this.scanner.setErrorHandler(function (message) {
                return _this.reportParseError(message);
            });
            this.scanner.setSourceText(sourceText, TypeScript.LexMode.File);
            var leftCurlyCount = this.scanner.leftCurlyCount;
            var rightCurlyCount = this.scanner.rightCurlyCount;
            var minChar = this.scanner.pos;
            this.currentToken = this.scanner.scan();
            this.pushDeclLists();
            var bod = new TypeScript.ASTList();
            bod.minChar = minChar;
            this.state = ParseState.StartScript;
            this.parsingDeclareFile = TypeScript.isDSTRFile(filename) || TypeScript.isDTSFile(filename);
            while(true) {
                this.parseStatementList(TypeScript.ErrorRecoverySet.EOF | TypeScript.ErrorRecoverySet.Func, bod, true, false, allowedElements, TypeScript.Modifiers.None);
                if(this.currentToken.tokenId === TypeScript.TokenID.EndOfFile) {
                    break;
                }
                var badToken = TypeScript.tokenTable[this.currentToken.tokenId];
                this.reportParseError("Unexpected statement block terminator '" + badToken.text + "'");
                this.currentToken = this.scanner.scan();
            }
            this.state = ParseState.EndScript;
            bod.limChar = this.scanner.pos;
            var topLevelMod = null;
            if(TypeScript.moduleGenTarget != TypeScript.ModuleGenTarget.Local && this.hasTopLevelImportOrExport) {
                var correctedFileName = TypeScript.switchToForwardSlashes(filename);
                var id = new TypeScript.Identifier(correctedFileName);
                topLevelMod = new TypeScript.ModuleDeclaration(id, bod, this.topVarList(), this.topScopeList(), null);
                topLevelMod.modFlags |= TypeScript.ModuleFlags.IsDynamic;
                topLevelMod.modFlags |= TypeScript.ModuleFlags.IsWholeFile;
                topLevelMod.modFlags |= TypeScript.ModuleFlags.Exported;
                if(this.parsingDeclareFile) {
                    topLevelMod.modFlags |= TypeScript.ModuleFlags.Ambient;
                }
                topLevelMod.minChar = minChar;
                topLevelMod.limChar = this.scanner.pos;
                topLevelMod.prettyName = TypeScript.getPrettyName(correctedFileName);
                topLevelMod.containsUnicodeChar = this.scanner.seenUnicodeChar;
                topLevelMod.containsUnicodeCharInComment = this.scanner.seenUnicodeCharInComment;
                topLevelMod.amdDependencies = this.amdDependencies;
                bod = new TypeScript.ASTList();
                bod.minChar = topLevelMod.minChar;
                bod.limChar = topLevelMod.limChar;
                bod.append(topLevelMod);
            }
            var script = new TypeScript.Script(this.topVarList(), this.topScopeList());
            script.bod = bod;
            this.popDeclLists();
            script.minChar = minChar;
            script.limChar = this.scanner.pos;
            script.locationInfo = new TypeScript.LocationInfo(filename, this.scanner.lineMap, unitIndex);
            script.leftCurlyCount = this.scanner.leftCurlyCount - leftCurlyCount;
            script.rightCurlyCount = this.scanner.rightCurlyCount - rightCurlyCount;
            script.isDeclareFile = this.parsingDeclareFile;
            script.topLevelMod = topLevelMod;
            script.containsUnicodeChar = this.scanner.seenUnicodeChar;
            script.containsUnicodeCharInComment = this.scanner.seenUnicodeCharInComment;
            script.requiresExtendsBlock = this.requiresExtendsBlock;
            return script;
        };
        return Parser;
    })();
    TypeScript.Parser = Parser;    
    function quickParse(logger, scopeStartAST, sourceText, minChar, limChar, errorCapture) {
        var fragment = sourceText.getText(minChar, limChar);
        logger.log("Quick parse range (" + minChar + "," + limChar + "): \"" + TypeScript.stringToLiteral(fragment, 100) + "\"");
        var quickParser = new Parser();
        quickParser.setErrorRecovery(null);
        quickParser.errorCallback = errorCapture;
        var quickClassDecl = new TypeScript.ClassDeclaration(null, null, null, null);
        quickParser.currentClassDecl = quickClassDecl;
        var result = quickParser.quickParse(new TypeScript.StringSourceText(fragment), "", 0);
        return result;
    }
    TypeScript.quickParse = quickParse;
})(TypeScript || (TypeScript = {}));
var TypeScript;
(function (TypeScript) {
    var PrintContext = (function () {
        function PrintContext(outfile, parser) {
            this.outfile = outfile;
            this.parser = parser;
            this.builder = "";
            this.indent1 = "  ";
            this.indentStrings = [];
            this.indentAmt = 0;
        }
        PrintContext.prototype.increaseIndent = function () {
            this.indentAmt++;
        };
        PrintContext.prototype.decreaseIndent = function () {
            this.indentAmt--;
        };
        PrintContext.prototype.startLine = function () {
            if(this.builder.length > 0) {
                TypeScript.CompilerDiagnostics.Alert(this.builder);
            }
            var indentString = this.indentStrings[this.indentAmt];
            if(indentString === undefined) {
                indentString = "";
                for(var i = 0; i < this.indentAmt; i++) {
                    indentString += this.indent1;
                }
                this.indentStrings[this.indentAmt] = indentString;
            }
            this.builder += indentString;
        };
        PrintContext.prototype.write = function (s) {
            this.builder += s;
        };
        PrintContext.prototype.writeLine = function (s) {
            this.builder += s;
            this.outfile.WriteLine(this.builder);
            this.builder = "";
        };
        return PrintContext;
    })();
    TypeScript.PrintContext = PrintContext;    
    function prePrintAST(ast, parent, walker) {
        var pc = walker.state;
        ast.print(pc);
        pc.increaseIndent();
        return ast;
    }
    TypeScript.prePrintAST = prePrintAST;
    function postPrintAST(ast, parent, walker) {
        var pc = walker.state;
        pc.decreaseIndent();
        return ast;
    }
    TypeScript.postPrintAST = postPrintAST;
})(TypeScript || (TypeScript = {}));
var TypeScript;
(function (TypeScript) {
    TypeScript.LexEOF = (-1);
    TypeScript.LexCodeNWL = 10;
    TypeScript.LexCodeRET = 13;
    TypeScript.LexCodeLS = 8232;
    TypeScript.LexCodePS = 8233;
    TypeScript.LexCodeTAB = 9;
    TypeScript.LexCodeVTAB = 11;
    TypeScript.LexCode_e = 'e'.charCodeAt(0);
    TypeScript.LexCode_E = 'E'.charCodeAt(0);
    TypeScript.LexCode_x = 'x'.charCodeAt(0);
    TypeScript.LexCode_X = 'X'.charCodeAt(0);
    TypeScript.LexCode_a = 'a'.charCodeAt(0);
    TypeScript.LexCode_A = 'A'.charCodeAt(0);
    TypeScript.LexCode_f = 'f'.charCodeAt(0);
    TypeScript.LexCode_F = 'F'.charCodeAt(0);
    TypeScript.LexCode_g = 'g'.charCodeAt(0);
    TypeScript.LexCode_m = 'm'.charCodeAt(0);
    TypeScript.LexCode_i = 'i'.charCodeAt(0);
    TypeScript.LexCode_u = 'u'.charCodeAt(0);
    TypeScript.LexCode_0 = '0'.charCodeAt(0);
    TypeScript.LexCode_9 = '9'.charCodeAt(0);
    TypeScript.LexCode_8 = '8'.charCodeAt(0);
    TypeScript.LexCode_7 = '7'.charCodeAt(0);
    TypeScript.LexCodeBSL = '\\'.charCodeAt(0);
    TypeScript.LexCodeSHP = '#'.charCodeAt(0);
    TypeScript.LexCodeBNG = '!'.charCodeAt(0);
    TypeScript.LexCodeQUO = '"'.charCodeAt(0);
    TypeScript.LexCodeAPO = '\''.charCodeAt(0);
    TypeScript.LexCodePCT = '%'.charCodeAt(0);
    TypeScript.LexCodeAMP = '&'.charCodeAt(0);
    TypeScript.LexCodeLPR = '('.charCodeAt(0);
    TypeScript.LexCodeRPR = ')'.charCodeAt(0);
    TypeScript.LexCodePLS = '+'.charCodeAt(0);
    TypeScript.LexCodeMIN = '-'.charCodeAt(0);
    TypeScript.LexCodeMUL = '*'.charCodeAt(0);
    TypeScript.LexCodeSLH = '/'.charCodeAt(0);
    TypeScript.LexCodeXOR = '^'.charCodeAt(0);
    TypeScript.LexCodeCMA = ','.charCodeAt(0);
    TypeScript.LexCodeDOT = '.'.charCodeAt(0);
    TypeScript.LexCodeLT = '<'.charCodeAt(0);
    TypeScript.LexCodeEQ = '='.charCodeAt(0);
    TypeScript.LexCodeGT = '>'.charCodeAt(0);
    TypeScript.LexCodeQUE = '?'.charCodeAt(0);
    TypeScript.LexCodeLBR = '['.charCodeAt(0);
    TypeScript.LexCodeRBR = ']'.charCodeAt(0);
    TypeScript.LexCodeUSC = '_'.charCodeAt(0);
    TypeScript.LexCodeLC = '{'.charCodeAt(0);
    TypeScript.LexCodeRC = '}'.charCodeAt(0);
    TypeScript.LexCodeBAR = '|'.charCodeAt(0);
    TypeScript.LexCodeTIL = '~'.charCodeAt(0);
    TypeScript.LexCodeCOL = ':'.charCodeAt(0);
    TypeScript.LexCodeSMC = ';'.charCodeAt(0);
    TypeScript.LexCodeUnderscore = '_'.charCodeAt(0);
    TypeScript.LexCodeDollar = '$'.charCodeAt(0);
    TypeScript.LexCodeSpace = 32;
    TypeScript.LexCodeAtSign = '@'.charCodeAt(0);
    TypeScript.LexCodeASCIIChars = 128;
    TypeScript.LexKeywordTable = undefined;
    var autoToken = new Array(TypeScript.LexCodeASCIIChars);
    var lexIdStartTable = new Array(TypeScript.LexCodeASCIIChars);
    var unicodeES3IdStart = [
        170, 
        170, 
        181, 
        181, 
        186, 
        186, 
        192, 
        214, 
        216, 
        246, 
        248, 
        543, 
        546, 
        563, 
        592, 
        685, 
        688, 
        696, 
        699, 
        705, 
        720, 
        721, 
        736, 
        740, 
        750, 
        750, 
        890, 
        890, 
        902, 
        902, 
        904, 
        906, 
        908, 
        908, 
        910, 
        929, 
        931, 
        974, 
        976, 
        983, 
        986, 
        1011, 
        1024, 
        1153, 
        1164, 
        1220, 
        1223, 
        1224, 
        1227, 
        1228, 
        1232, 
        1269, 
        1272, 
        1273, 
        1329, 
        1366, 
        1369, 
        1369, 
        1377, 
        1415, 
        1488, 
        1514, 
        1520, 
        1522, 
        1569, 
        1594, 
        1600, 
        1610, 
        1649, 
        1747, 
        1749, 
        1749, 
        1765, 
        1766, 
        1786, 
        1788, 
        1808, 
        1808, 
        1810, 
        1836, 
        1920, 
        1957, 
        2309, 
        2361, 
        2365, 
        2365, 
        2384, 
        2384, 
        2392, 
        2401, 
        2437, 
        2444, 
        2447, 
        2448, 
        2451, 
        2472, 
        2474, 
        2480, 
        2482, 
        2482, 
        2486, 
        2489, 
        2524, 
        2525, 
        2527, 
        2529, 
        2544, 
        2545, 
        2565, 
        2570, 
        2575, 
        2576, 
        2579, 
        2600, 
        2602, 
        2608, 
        2610, 
        2611, 
        2613, 
        2614, 
        2616, 
        2617, 
        2649, 
        2652, 
        2654, 
        2654, 
        2674, 
        2676, 
        2693, 
        2699, 
        2701, 
        2701, 
        2703, 
        2705, 
        2707, 
        2728, 
        2730, 
        2736, 
        2738, 
        2739, 
        2741, 
        2745, 
        2749, 
        2749, 
        2768, 
        2768, 
        2784, 
        2784, 
        2821, 
        2828, 
        2831, 
        2832, 
        2835, 
        2856, 
        2858, 
        2864, 
        2866, 
        2867, 
        2870, 
        2873, 
        2877, 
        2877, 
        2908, 
        2909, 
        2911, 
        2913, 
        2949, 
        2954, 
        2958, 
        2960, 
        2962, 
        2965, 
        2969, 
        2970, 
        2972, 
        2972, 
        2974, 
        2975, 
        2979, 
        2980, 
        2984, 
        2986, 
        2990, 
        2997, 
        2999, 
        3001, 
        3077, 
        3084, 
        3086, 
        3088, 
        3090, 
        3112, 
        3114, 
        3123, 
        3125, 
        3129, 
        3168, 
        3169, 
        3205, 
        3212, 
        3214, 
        3216, 
        3218, 
        3240, 
        3242, 
        3251, 
        3253, 
        3257, 
        3294, 
        3294, 
        3296, 
        3297, 
        3333, 
        3340, 
        3342, 
        3344, 
        3346, 
        3368, 
        3370, 
        3385, 
        3424, 
        3425, 
        3461, 
        3478, 
        3482, 
        3505, 
        3507, 
        3515, 
        3517, 
        3517, 
        3520, 
        3526, 
        3585, 
        3632, 
        3634, 
        3635, 
        3648, 
        3654, 
        3713, 
        3714, 
        3716, 
        3716, 
        3719, 
        3720, 
        3722, 
        3722, 
        3725, 
        3725, 
        3732, 
        3735, 
        3737, 
        3743, 
        3745, 
        3747, 
        3749, 
        3749, 
        3751, 
        3751, 
        3754, 
        3755, 
        3757, 
        3760, 
        3762, 
        3763, 
        3773, 
        3773, 
        3776, 
        3780, 
        3782, 
        3782, 
        3804, 
        3805, 
        3840, 
        3840, 
        3904, 
        3911, 
        3913, 
        3946, 
        3976, 
        3979, 
        4096, 
        4129, 
        4131, 
        4135, 
        4137, 
        4138, 
        4176, 
        4181, 
        4256, 
        4293, 
        4304, 
        4342, 
        4352, 
        4441, 
        4447, 
        4514, 
        4520, 
        4601, 
        4608, 
        4614, 
        4616, 
        4678, 
        4680, 
        4680, 
        4682, 
        4685, 
        4688, 
        4694, 
        4696, 
        4696, 
        4698, 
        4701, 
        4704, 
        4742, 
        4744, 
        4744, 
        4746, 
        4749, 
        4752, 
        4782, 
        4784, 
        4784, 
        4786, 
        4789, 
        4792, 
        4798, 
        4800, 
        4800, 
        4802, 
        4805, 
        4808, 
        4814, 
        4816, 
        4822, 
        4824, 
        4846, 
        4848, 
        4878, 
        4880, 
        4880, 
        4882, 
        4885, 
        4888, 
        4894, 
        4896, 
        4934, 
        4936, 
        4954, 
        5024, 
        5108, 
        5121, 
        5740, 
        5743, 
        5750, 
        5761, 
        5786, 
        5792, 
        5866, 
        6016, 
        6067, 
        6176, 
        6263, 
        6272, 
        6312, 
        7680, 
        7835, 
        7840, 
        7929, 
        7936, 
        7957, 
        7960, 
        7965, 
        7968, 
        8005, 
        8008, 
        8013, 
        8016, 
        8023, 
        8025, 
        8025, 
        8027, 
        8027, 
        8029, 
        8029, 
        8031, 
        8061, 
        8064, 
        8116, 
        8118, 
        8124, 
        8126, 
        8126, 
        8130, 
        8132, 
        8134, 
        8140, 
        8144, 
        8147, 
        8150, 
        8155, 
        8160, 
        8172, 
        8178, 
        8180, 
        8182, 
        8188, 
        8319, 
        8319, 
        8450, 
        8450, 
        8455, 
        8455, 
        8458, 
        8467, 
        8469, 
        8469, 
        8473, 
        8477, 
        8484, 
        8484, 
        8486, 
        8486, 
        8488, 
        8488, 
        8490, 
        8493, 
        8495, 
        8497, 
        8499, 
        8505, 
        8544, 
        8579, 
        12293, 
        12295, 
        12321, 
        12329, 
        12337, 
        12341, 
        12344, 
        12346, 
        12353, 
        12436, 
        12445, 
        12446, 
        12449, 
        12538, 
        12540, 
        12542, 
        12549, 
        12588, 
        12593, 
        12686, 
        12704, 
        12727, 
        13312, 
        13312, 
        19893, 
        19893, 
        19968, 
        19968, 
        40869, 
        40869, 
        40960, 
        42124, 
        44032, 
        44032, 
        55203, 
        55203, 
        63744, 
        64045, 
        64256, 
        64262, 
        64275, 
        64279, 
        64285, 
        64285, 
        64287, 
        64296, 
        64298, 
        64310, 
        64312, 
        64316, 
        64318, 
        64318, 
        64320, 
        64321, 
        64323, 
        64324, 
        64326, 
        64433, 
        64467, 
        64829, 
        64848, 
        64911, 
        64914, 
        64967, 
        65008, 
        65019, 
        65136, 
        65138, 
        65140, 
        65140, 
        65142, 
        65276, 
        65313, 
        65338, 
        65345, 
        65370, 
        65382, 
        65470, 
        65474, 
        65479, 
        65482, 
        65487, 
        65490, 
        65495, 
        65498, 
        65500
    ];
    var unicodeES3IdCont = [
        768, 
        846, 
        864, 
        866, 
        1155, 
        1158, 
        1425, 
        1441, 
        1443, 
        1465, 
        1467, 
        1469, 
        1471, 
        1471, 
        1473, 
        1474, 
        1476, 
        1476, 
        1611, 
        1621, 
        1632, 
        1641, 
        1648, 
        1648, 
        1750, 
        1756, 
        1759, 
        1764, 
        1767, 
        1768, 
        1770, 
        1773, 
        1776, 
        1785, 
        1809, 
        1809, 
        1840, 
        1866, 
        1958, 
        1968, 
        2305, 
        2307, 
        2364, 
        2364, 
        2366, 
        2381, 
        2385, 
        2388, 
        2402, 
        2403, 
        2406, 
        2415, 
        2433, 
        2435, 
        2492, 
        2492, 
        2494, 
        2500, 
        2503, 
        2504, 
        2507, 
        2509, 
        2519, 
        2519, 
        2530, 
        2531, 
        2534, 
        2543, 
        2562, 
        2562, 
        2620, 
        2620, 
        2622, 
        2626, 
        2631, 
        2632, 
        2635, 
        2637, 
        2662, 
        2673, 
        2689, 
        2691, 
        2748, 
        2748, 
        2750, 
        2757, 
        2759, 
        2761, 
        2763, 
        2765, 
        2790, 
        2799, 
        2817, 
        2819, 
        2876, 
        2876, 
        2878, 
        2883, 
        2887, 
        2888, 
        2891, 
        2893, 
        2902, 
        2903, 
        2918, 
        2927, 
        2946, 
        2947, 
        3006, 
        3010, 
        3014, 
        3016, 
        3018, 
        3021, 
        3031, 
        3031, 
        3047, 
        3055, 
        3073, 
        3075, 
        3134, 
        3140, 
        3142, 
        3144, 
        3146, 
        3149, 
        3157, 
        3158, 
        3174, 
        3183, 
        3202, 
        3203, 
        3262, 
        3268, 
        3270, 
        3272, 
        3274, 
        3277, 
        3285, 
        3286, 
        3302, 
        3311, 
        3330, 
        3331, 
        3390, 
        3395, 
        3398, 
        3400, 
        3402, 
        3405, 
        3415, 
        3415, 
        3430, 
        3439, 
        3458, 
        3459, 
        3530, 
        3530, 
        3535, 
        3540, 
        3542, 
        3542, 
        3544, 
        3551, 
        3570, 
        3571, 
        3633, 
        3633, 
        3636, 
        3642, 
        3655, 
        3662, 
        3664, 
        3673, 
        3761, 
        3761, 
        3764, 
        3769, 
        3771, 
        3772, 
        3784, 
        3789, 
        3792, 
        3801, 
        3864, 
        3865, 
        3872, 
        3881, 
        3893, 
        3893, 
        3895, 
        3895, 
        3897, 
        3897, 
        3902, 
        3903, 
        3953, 
        3972, 
        3974, 
        3975, 
        3984, 
        3991, 
        3993, 
        4028, 
        4038, 
        4038, 
        4140, 
        4146, 
        4150, 
        4153, 
        4160, 
        4169, 
        4182, 
        4185, 
        4969, 
        4977, 
        6068, 
        6099, 
        6112, 
        6121, 
        6160, 
        6169, 
        6313, 
        6313, 
        8255, 
        8256, 
        8400, 
        8412, 
        8417, 
        8417, 
        12330, 
        12335, 
        12441, 
        12442, 
        12539, 
        12539, 
        64286, 
        64286, 
        65056, 
        65059, 
        65075, 
        65076, 
        65101, 
        65103, 
        65296, 
        65305, 
        65343, 
        65343, 
        65381, 
        65381
    ];
    var unicodeES5IdStart = [
        170, 
        170, 
        181, 
        181, 
        186, 
        186, 
        192, 
        214, 
        216, 
        246, 
        248, 
        705, 
        710, 
        721, 
        736, 
        740, 
        748, 
        748, 
        750, 
        750, 
        880, 
        884, 
        886, 
        887, 
        890, 
        893, 
        902, 
        902, 
        904, 
        906, 
        908, 
        908, 
        910, 
        929, 
        931, 
        1013, 
        1015, 
        1153, 
        1162, 
        1319, 
        1329, 
        1366, 
        1369, 
        1369, 
        1377, 
        1415, 
        1488, 
        1514, 
        1520, 
        1522, 
        1568, 
        1610, 
        1646, 
        1647, 
        1649, 
        1747, 
        1749, 
        1749, 
        1765, 
        1766, 
        1774, 
        1775, 
        1786, 
        1788, 
        1791, 
        1791, 
        1808, 
        1808, 
        1810, 
        1839, 
        1869, 
        1957, 
        1969, 
        1969, 
        1994, 
        2026, 
        2036, 
        2037, 
        2042, 
        2042, 
        2048, 
        2069, 
        2074, 
        2074, 
        2084, 
        2084, 
        2088, 
        2088, 
        2112, 
        2136, 
        2208, 
        2208, 
        2210, 
        2220, 
        2308, 
        2361, 
        2365, 
        2365, 
        2384, 
        2384, 
        2392, 
        2401, 
        2417, 
        2423, 
        2425, 
        2431, 
        2437, 
        2444, 
        2447, 
        2448, 
        2451, 
        2472, 
        2474, 
        2480, 
        2482, 
        2482, 
        2486, 
        2489, 
        2493, 
        2493, 
        2510, 
        2510, 
        2524, 
        2525, 
        2527, 
        2529, 
        2544, 
        2545, 
        2565, 
        2570, 
        2575, 
        2576, 
        2579, 
        2600, 
        2602, 
        2608, 
        2610, 
        2611, 
        2613, 
        2614, 
        2616, 
        2617, 
        2649, 
        2652, 
        2654, 
        2654, 
        2674, 
        2676, 
        2693, 
        2701, 
        2703, 
        2705, 
        2707, 
        2728, 
        2730, 
        2736, 
        2738, 
        2739, 
        2741, 
        2745, 
        2749, 
        2749, 
        2768, 
        2768, 
        2784, 
        2785, 
        2821, 
        2828, 
        2831, 
        2832, 
        2835, 
        2856, 
        2858, 
        2864, 
        2866, 
        2867, 
        2869, 
        2873, 
        2877, 
        2877, 
        2908, 
        2909, 
        2911, 
        2913, 
        2929, 
        2929, 
        2947, 
        2947, 
        2949, 
        2954, 
        2958, 
        2960, 
        2962, 
        2965, 
        2969, 
        2970, 
        2972, 
        2972, 
        2974, 
        2975, 
        2979, 
        2980, 
        2984, 
        2986, 
        2990, 
        3001, 
        3024, 
        3024, 
        3077, 
        3084, 
        3086, 
        3088, 
        3090, 
        3112, 
        3114, 
        3123, 
        3125, 
        3129, 
        3133, 
        3133, 
        3160, 
        3161, 
        3168, 
        3169, 
        3205, 
        3212, 
        3214, 
        3216, 
        3218, 
        3240, 
        3242, 
        3251, 
        3253, 
        3257, 
        3261, 
        3261, 
        3294, 
        3294, 
        3296, 
        3297, 
        3313, 
        3314, 
        3333, 
        3340, 
        3342, 
        3344, 
        3346, 
        3386, 
        3389, 
        3389, 
        3406, 
        3406, 
        3424, 
        3425, 
        3450, 
        3455, 
        3461, 
        3478, 
        3482, 
        3505, 
        3507, 
        3515, 
        3517, 
        3517, 
        3520, 
        3526, 
        3585, 
        3632, 
        3634, 
        3635, 
        3648, 
        3654, 
        3713, 
        3714, 
        3716, 
        3716, 
        3719, 
        3720, 
        3722, 
        3722, 
        3725, 
        3725, 
        3732, 
        3735, 
        3737, 
        3743, 
        3745, 
        3747, 
        3749, 
        3749, 
        3751, 
        3751, 
        3754, 
        3755, 
        3757, 
        3760, 
        3762, 
        3763, 
        3773, 
        3773, 
        3776, 
        3780, 
        3782, 
        3782, 
        3804, 
        3807, 
        3840, 
        3840, 
        3904, 
        3911, 
        3913, 
        3948, 
        3976, 
        3980, 
        4096, 
        4138, 
        4159, 
        4159, 
        4176, 
        4181, 
        4186, 
        4189, 
        4193, 
        4193, 
        4197, 
        4198, 
        4206, 
        4208, 
        4213, 
        4225, 
        4238, 
        4238, 
        4256, 
        4293, 
        4295, 
        4295, 
        4301, 
        4301, 
        4304, 
        4346, 
        4348, 
        4680, 
        4682, 
        4685, 
        4688, 
        4694, 
        4696, 
        4696, 
        4698, 
        4701, 
        4704, 
        4744, 
        4746, 
        4749, 
        4752, 
        4784, 
        4786, 
        4789, 
        4792, 
        4798, 
        4800, 
        4800, 
        4802, 
        4805, 
        4808, 
        4822, 
        4824, 
        4880, 
        4882, 
        4885, 
        4888, 
        4954, 
        4992, 
        5007, 
        5024, 
        5108, 
        5121, 
        5740, 
        5743, 
        5759, 
        5761, 
        5786, 
        5792, 
        5866, 
        5870, 
        5872, 
        5888, 
        5900, 
        5902, 
        5905, 
        5920, 
        5937, 
        5952, 
        5969, 
        5984, 
        5996, 
        5998, 
        6000, 
        6016, 
        6067, 
        6103, 
        6103, 
        6108, 
        6108, 
        6176, 
        6263, 
        6272, 
        6312, 
        6314, 
        6314, 
        6320, 
        6389, 
        6400, 
        6428, 
        6480, 
        6509, 
        6512, 
        6516, 
        6528, 
        6571, 
        6593, 
        6599, 
        6656, 
        6678, 
        6688, 
        6740, 
        6823, 
        6823, 
        6917, 
        6963, 
        6981, 
        6987, 
        7043, 
        7072, 
        7086, 
        7087, 
        7098, 
        7141, 
        7168, 
        7203, 
        7245, 
        7247, 
        7258, 
        7293, 
        7401, 
        7404, 
        7406, 
        7409, 
        7413, 
        7414, 
        7424, 
        7615, 
        7680, 
        7957, 
        7960, 
        7965, 
        7968, 
        8005, 
        8008, 
        8013, 
        8016, 
        8023, 
        8025, 
        8025, 
        8027, 
        8027, 
        8029, 
        8029, 
        8031, 
        8061, 
        8064, 
        8116, 
        8118, 
        8124, 
        8126, 
        8126, 
        8130, 
        8132, 
        8134, 
        8140, 
        8144, 
        8147, 
        8150, 
        8155, 
        8160, 
        8172, 
        8178, 
        8180, 
        8182, 
        8188, 
        8305, 
        8305, 
        8319, 
        8319, 
        8336, 
        8348, 
        8450, 
        8450, 
        8455, 
        8455, 
        8458, 
        8467, 
        8469, 
        8469, 
        8473, 
        8477, 
        8484, 
        8484, 
        8486, 
        8486, 
        8488, 
        8488, 
        8490, 
        8493, 
        8495, 
        8505, 
        8508, 
        8511, 
        8517, 
        8521, 
        8526, 
        8526, 
        8544, 
        8584, 
        11264, 
        11310, 
        11312, 
        11358, 
        11360, 
        11492, 
        11499, 
        11502, 
        11506, 
        11507, 
        11520, 
        11557, 
        11559, 
        11559, 
        11565, 
        11565, 
        11568, 
        11623, 
        11631, 
        11631, 
        11648, 
        11670, 
        11680, 
        11686, 
        11688, 
        11694, 
        11696, 
        11702, 
        11704, 
        11710, 
        11712, 
        11718, 
        11720, 
        11726, 
        11728, 
        11734, 
        11736, 
        11742, 
        11823, 
        11823, 
        12293, 
        12295, 
        12321, 
        12329, 
        12337, 
        12341, 
        12344, 
        12348, 
        12353, 
        12438, 
        12445, 
        12447, 
        12449, 
        12538, 
        12540, 
        12543, 
        12549, 
        12589, 
        12593, 
        12686, 
        12704, 
        12730, 
        12784, 
        12799, 
        13312, 
        13312, 
        19893, 
        19893, 
        19968, 
        19968, 
        40908, 
        40908, 
        40960, 
        42124, 
        42192, 
        42237, 
        42240, 
        42508, 
        42512, 
        42527, 
        42538, 
        42539, 
        42560, 
        42606, 
        42623, 
        42647, 
        42656, 
        42735, 
        42775, 
        42783, 
        42786, 
        42888, 
        42891, 
        42894, 
        42896, 
        42899, 
        42912, 
        42922, 
        43000, 
        43009, 
        43011, 
        43013, 
        43015, 
        43018, 
        43020, 
        43042, 
        43072, 
        43123, 
        43138, 
        43187, 
        43250, 
        43255, 
        43259, 
        43259, 
        43274, 
        43301, 
        43312, 
        43334, 
        43360, 
        43388, 
        43396, 
        43442, 
        43471, 
        43471, 
        43520, 
        43560, 
        43584, 
        43586, 
        43588, 
        43595, 
        43616, 
        43638, 
        43642, 
        43642, 
        43648, 
        43695, 
        43697, 
        43697, 
        43701, 
        43702, 
        43705, 
        43709, 
        43712, 
        43712, 
        43714, 
        43714, 
        43739, 
        43741, 
        43744, 
        43754, 
        43762, 
        43764, 
        43777, 
        43782, 
        43785, 
        43790, 
        43793, 
        43798, 
        43808, 
        43814, 
        43816, 
        43822, 
        43968, 
        44002, 
        44032, 
        44032, 
        55203, 
        55203, 
        55216, 
        55238, 
        55243, 
        55291, 
        63744, 
        64109, 
        64112, 
        64217, 
        64256, 
        64262, 
        64275, 
        64279, 
        64285, 
        64285, 
        64287, 
        64296, 
        64298, 
        64310, 
        64312, 
        64316, 
        64318, 
        64318, 
        64320, 
        64321, 
        64323, 
        64324, 
        64326, 
        64433, 
        64467, 
        64829, 
        64848, 
        64911, 
        64914, 
        64967, 
        65008, 
        65019, 
        65136, 
        65140, 
        65142, 
        65276, 
        65313, 
        65338, 
        65345, 
        65370, 
        65382, 
        65470, 
        65474, 
        65479, 
        65482, 
        65487, 
        65490, 
        65495, 
        65498, 
        65500
    ];
    var unicodeES5IdCont = [
        768, 
        879, 
        1155, 
        1159, 
        1425, 
        1469, 
        1471, 
        1471, 
        1473, 
        1474, 
        1476, 
        1477, 
        1479, 
        1479, 
        1552, 
        1562, 
        1611, 
        1641, 
        1648, 
        1648, 
        1750, 
        1756, 
        1759, 
        1764, 
        1767, 
        1768, 
        1770, 
        1773, 
        1776, 
        1785, 
        1809, 
        1809, 
        1840, 
        1866, 
        1958, 
        1968, 
        1984, 
        1993, 
        2027, 
        2035, 
        2070, 
        2073, 
        2075, 
        2083, 
        2085, 
        2087, 
        2089, 
        2093, 
        2137, 
        2139, 
        2276, 
        2302, 
        2304, 
        2307, 
        2362, 
        2364, 
        2366, 
        2383, 
        2385, 
        2391, 
        2402, 
        2403, 
        2406, 
        2415, 
        2433, 
        2435, 
        2492, 
        2492, 
        2494, 
        2500, 
        2503, 
        2504, 
        2507, 
        2509, 
        2519, 
        2519, 
        2530, 
        2531, 
        2534, 
        2543, 
        2561, 
        2563, 
        2620, 
        2620, 
        2622, 
        2626, 
        2631, 
        2632, 
        2635, 
        2637, 
        2641, 
        2641, 
        2662, 
        2673, 
        2677, 
        2677, 
        2689, 
        2691, 
        2748, 
        2748, 
        2750, 
        2757, 
        2759, 
        2761, 
        2763, 
        2765, 
        2786, 
        2787, 
        2790, 
        2799, 
        2817, 
        2819, 
        2876, 
        2876, 
        2878, 
        2884, 
        2887, 
        2888, 
        2891, 
        2893, 
        2902, 
        2903, 
        2914, 
        2915, 
        2918, 
        2927, 
        2946, 
        2946, 
        3006, 
        3010, 
        3014, 
        3016, 
        3018, 
        3021, 
        3031, 
        3031, 
        3046, 
        3055, 
        3073, 
        3075, 
        3134, 
        3140, 
        3142, 
        3144, 
        3146, 
        3149, 
        3157, 
        3158, 
        3170, 
        3171, 
        3174, 
        3183, 
        3202, 
        3203, 
        3260, 
        3260, 
        3262, 
        3268, 
        3270, 
        3272, 
        3274, 
        3277, 
        3285, 
        3286, 
        3298, 
        3299, 
        3302, 
        3311, 
        3330, 
        3331, 
        3390, 
        3396, 
        3398, 
        3400, 
        3402, 
        3405, 
        3415, 
        3415, 
        3426, 
        3427, 
        3430, 
        3439, 
        3458, 
        3459, 
        3530, 
        3530, 
        3535, 
        3540, 
        3542, 
        3542, 
        3544, 
        3551, 
        3570, 
        3571, 
        3633, 
        3633, 
        3636, 
        3642, 
        3655, 
        3662, 
        3664, 
        3673, 
        3761, 
        3761, 
        3764, 
        3769, 
        3771, 
        3772, 
        3784, 
        3789, 
        3792, 
        3801, 
        3864, 
        3865, 
        3872, 
        3881, 
        3893, 
        3893, 
        3895, 
        3895, 
        3897, 
        3897, 
        3902, 
        3903, 
        3953, 
        3972, 
        3974, 
        3975, 
        3981, 
        3991, 
        3993, 
        4028, 
        4038, 
        4038, 
        4139, 
        4158, 
        4160, 
        4169, 
        4182, 
        4185, 
        4190, 
        4192, 
        4194, 
        4196, 
        4199, 
        4205, 
        4209, 
        4212, 
        4226, 
        4237, 
        4239, 
        4253, 
        4957, 
        4959, 
        5906, 
        5908, 
        5938, 
        5940, 
        5970, 
        5971, 
        6002, 
        6003, 
        6068, 
        6099, 
        6109, 
        6109, 
        6112, 
        6121, 
        6155, 
        6157, 
        6160, 
        6169, 
        6313, 
        6313, 
        6432, 
        6443, 
        6448, 
        6459, 
        6470, 
        6479, 
        6576, 
        6592, 
        6600, 
        6601, 
        6608, 
        6617, 
        6679, 
        6683, 
        6741, 
        6750, 
        6752, 
        6780, 
        6783, 
        6793, 
        6800, 
        6809, 
        6912, 
        6916, 
        6964, 
        6980, 
        6992, 
        7001, 
        7019, 
        7027, 
        7040, 
        7042, 
        7073, 
        7085, 
        7088, 
        7097, 
        7142, 
        7155, 
        7204, 
        7223, 
        7232, 
        7241, 
        7248, 
        7257, 
        7376, 
        7378, 
        7380, 
        7400, 
        7405, 
        7405, 
        7410, 
        7412, 
        7616, 
        7654, 
        7676, 
        7679, 
        8204, 
        8205, 
        8255, 
        8256, 
        8276, 
        8276, 
        8400, 
        8412, 
        8417, 
        8417, 
        8421, 
        8432, 
        11503, 
        11505, 
        11647, 
        11647, 
        11744, 
        11775, 
        12330, 
        12335, 
        12441, 
        12442, 
        42528, 
        42537, 
        42607, 
        42607, 
        42612, 
        42621, 
        42655, 
        42655, 
        42736, 
        42737, 
        43010, 
        43010, 
        43014, 
        43014, 
        43019, 
        43019, 
        43043, 
        43047, 
        43136, 
        43137, 
        43188, 
        43204, 
        43216, 
        43225, 
        43232, 
        43249, 
        43264, 
        43273, 
        43302, 
        43309, 
        43335, 
        43347, 
        43392, 
        43395, 
        43443, 
        43456, 
        43472, 
        43481, 
        43561, 
        43574, 
        43587, 
        43587, 
        43596, 
        43597, 
        43600, 
        43609, 
        43643, 
        43643, 
        43696, 
        43696, 
        43698, 
        43700, 
        43703, 
        43704, 
        43710, 
        43711, 
        43713, 
        43713, 
        43755, 
        43759, 
        43765, 
        43766, 
        44003, 
        44010, 
        44012, 
        44013, 
        44016, 
        44025, 
        64286, 
        64286, 
        65024, 
        65039, 
        65056, 
        65062, 
        65075, 
        65076, 
        65101, 
        65103, 
        65296, 
        65305, 
        65343, 
        65343
    ];
    function LexLookUpUnicodeMap(code, map) {
        var lo = 0;
        var hi = map.length;
        var mid;
        while(lo + 1 < hi) {
            mid = lo + (hi - lo) / 2;
            mid -= mid % 2;
            if(map[mid] <= code && code <= map[mid + 1]) {
                return true;
            }
            if(code < map[mid]) {
                hi = mid;
            } else {
                lo = mid + 2;
            }
        }
        return false;
    }
    TypeScript.LexLookUpUnicodeMap = LexLookUpUnicodeMap;
    function LexIsUnicodeDigit(code) {
        if(TypeScript.codeGenTarget == TypeScript.CodeGenTarget.ES3) {
            return LexLookUpUnicodeMap(code, unicodeES3IdCont);
        } else {
            return LexLookUpUnicodeMap(code, unicodeES5IdCont);
        }
    }
    TypeScript.LexIsUnicodeDigit = LexIsUnicodeDigit;
    function LexIsUnicodeIdStart(code) {
        if(TypeScript.codeGenTarget == TypeScript.CodeGenTarget.ES3) {
            return LexLookUpUnicodeMap(code, unicodeES3IdStart);
        } else {
            return LexLookUpUnicodeMap(code, unicodeES5IdStart);
        }
    }
    TypeScript.LexIsUnicodeIdStart = LexIsUnicodeIdStart;
    function LexInitialize() {
        TypeScript.initializeStaticTokens();
        autoToken[TypeScript.LexCodeLPR] = TypeScript.staticTokens[TypeScript.TokenID.OpenParen];
        autoToken[TypeScript.LexCodeRPR] = TypeScript.staticTokens[TypeScript.TokenID.CloseParen];
        autoToken[TypeScript.LexCodeCMA] = TypeScript.staticTokens[TypeScript.TokenID.Comma];
        autoToken[TypeScript.LexCodeSMC] = TypeScript.staticTokens[TypeScript.TokenID.Semicolon];
        autoToken[TypeScript.LexCodeLBR] = TypeScript.staticTokens[TypeScript.TokenID.OpenBracket];
        autoToken[TypeScript.LexCodeRBR] = TypeScript.staticTokens[TypeScript.TokenID.CloseBracket];
        autoToken[TypeScript.LexCodeTIL] = TypeScript.staticTokens[TypeScript.TokenID.Tilde];
        autoToken[TypeScript.LexCodeQUE] = TypeScript.staticTokens[TypeScript.TokenID.Question];
        autoToken[TypeScript.LexCodeLC] = TypeScript.staticTokens[TypeScript.TokenID.OpenBrace];
        autoToken[TypeScript.LexCodeRC] = TypeScript.staticTokens[TypeScript.TokenID.CloseBrace];
        autoToken[TypeScript.LexCodeCOL] = TypeScript.staticTokens[TypeScript.TokenID.Colon];
        TypeScript.LexKeywordTable = new TypeScript.StringHashTable();
        for(var i in (TypeScript.TokenID)._map) {
            if((i) <= TypeScript.TokenID.LimKeyword) {
                TypeScript.LexKeywordTable.add((TypeScript.TokenID)._map[i].toLowerCase(), i);
            }
        }
        for(var j = 0; j < TypeScript.LexCodeASCIIChars; j++) {
            if(LexIsIdentifierStartChar(j)) {
                lexIdStartTable[j] = true;
            } else {
                lexIdStartTable[j] = false;
            }
        }
    }
    TypeScript.LexInitialize = LexInitialize;
    function LexAdjustIndent(code, indentAmt) {
        if((code == TypeScript.LexCodeLBR) || (code == TypeScript.LexCodeLC) || (code == TypeScript.LexCodeLPR)) {
            return indentAmt + 1;
        } else {
            if((code == TypeScript.LexCodeRBR) || (code == TypeScript.LexCodeRC) || (code == TypeScript.LexCodeRPR)) {
                return indentAmt - 1;
            } else {
                return indentAmt;
            }
        }
    }
    TypeScript.LexAdjustIndent = LexAdjustIndent;
    function LexIsIdentifierStartChar(code) {
        return (((code >= 97) && (code <= 122)) || ((code >= 65) && (code <= 90)) || (code == TypeScript.LexCodeDollar) || (code == TypeScript.LexCodeUnderscore));
    }
    TypeScript.LexIsIdentifierStartChar = LexIsIdentifierStartChar;
    function LexIsDigit(code) {
        return ((code >= 48) && (code <= 57));
    }
    TypeScript.LexIsDigit = LexIsDigit;
    function LexIsIdentifierChar(code) {
        return lexIdStartTable[code] || LexIsDigit(code);
    }
    TypeScript.LexIsIdentifierChar = LexIsIdentifierChar;
    function LexMatchingOpen(code) {
        if(code == TypeScript.LexCodeRBR) {
            return TypeScript.LexCodeLBR;
        } else {
            if(code == TypeScript.LexCodeRC) {
                return TypeScript.LexCodeLC;
            } else {
                if(code == TypeScript.LexCodeRPR) {
                    return TypeScript.LexCodeLPR;
                } else {
                    return 0;
                }
            }
        }
    }
    TypeScript.LexMatchingOpen = LexMatchingOpen;
    (function (NumberScanState) {
        NumberScanState._map = [];
        NumberScanState._map[0] = "Start";
        NumberScanState.Start = 0;
        NumberScanState._map[1] = "InFraction";
        NumberScanState.InFraction = 1;
        NumberScanState._map[2] = "InEmptyFraction";
        NumberScanState.InEmptyFraction = 2;
        NumberScanState._map[3] = "InExponent";
        NumberScanState.InExponent = 3;
    })(TypeScript.NumberScanState || (TypeScript.NumberScanState = {}));
    var NumberScanState = TypeScript.NumberScanState;
    (function (LexState) {
        LexState._map = [];
        LexState._map[0] = "Start";
        LexState.Start = 0;
        LexState._map[1] = "InMultilineComment";
        LexState.InMultilineComment = 1;
        LexState._map[2] = "InMultilineSingleQuoteString";
        LexState.InMultilineSingleQuoteString = 2;
        LexState._map[3] = "InMultilineDoubleQuoteString";
        LexState.InMultilineDoubleQuoteString = 3;
    })(TypeScript.LexState || (TypeScript.LexState = {}));
    var LexState = TypeScript.LexState;
    (function (LexMode) {
        LexMode._map = [];
        LexMode._map[0] = "Line";
        LexMode.Line = 0;
        LexMode._map[1] = "File";
        LexMode.File = 1;
    })(TypeScript.LexMode || (TypeScript.LexMode = {}));
    var LexMode = TypeScript.LexMode;
    (function (CommentStyle) {
        CommentStyle._map = [];
        CommentStyle._map[0] = "Line";
        CommentStyle.Line = 0;
        CommentStyle._map[1] = "Block";
        CommentStyle.Block = 1;
    })(TypeScript.CommentStyle || (TypeScript.CommentStyle = {}));
    var CommentStyle = TypeScript.CommentStyle;
    var StringSourceText = (function () {
        function StringSourceText(text) {
            this.text = text;
        }
        StringSourceText.prototype.getText = function (start, end) {
            return this.text.substring(start, end);
        };
        StringSourceText.prototype.getLength = function () {
            return this.text.length;
        };
        return StringSourceText;
    })();
    TypeScript.StringSourceText = StringSourceText;    
    var SourceTextSegment = (function () {
        function SourceTextSegment(segmentStart, segmentEnd, segment) {
            this.segmentStart = segmentStart;
            this.segmentEnd = segmentEnd;
            this.segment = segment;
        }
        SourceTextSegment.prototype.charCodeAt = function (index) {
            return this.segment.charCodeAt(index - this.segmentStart);
        };
        SourceTextSegment.prototype.substring = function (start, end) {
            return this.segment.substring(start - this.segmentStart, end - this.segmentStart);
        };
        return SourceTextSegment;
    })();
    TypeScript.SourceTextSegment = SourceTextSegment;    
    var AggerateSourceTextSegment = (function () {
        function AggerateSourceTextSegment(seg1, seg2) {
            this.seg1 = seg1;
            this.seg2 = seg2;
        }
        AggerateSourceTextSegment.prototype.charCodeAt = function (index) {
            if(this.seg1.segmentStart <= index && index < this.seg1.segmentEnd) {
                return this.seg1.segment.charCodeAt(index - this.seg1.segmentStart);
            }
            return this.seg2.segment.charCodeAt(index - this.seg2.segmentStart);
        };
        AggerateSourceTextSegment.prototype.substring = function (start, end) {
            if(this.seg1.segmentStart <= start && end <= this.seg1.segmentEnd) {
                return this.seg1.segment.substring(start - this.seg1.segmentStart, end - this.seg1.segmentStart);
            }
            return this.seg2.segment.substring(start - this.seg2.segmentStart) + this.seg1.segment.substring(0, end - this.seg1.segmentStart);
        };
        return AggerateSourceTextSegment;
    })();
    TypeScript.AggerateSourceTextSegment = AggerateSourceTextSegment;    
    var ScannerTextStream = (function () {
        function ScannerTextStream(sourceText) {
            this.sourceText = sourceText;
            this.agg = new AggerateSourceTextSegment(ScannerTextStream.emptySegment, ScannerTextStream.emptySegment);
            this.len = this.sourceText.getLength();
        }
        ScannerTextStream.emptySegment = new SourceTextSegment(0, 0, "");
        ScannerTextStream.prototype.max = function (a, b) {
            return a >= b ? a : b;
        };
        ScannerTextStream.prototype.min = function (a, b) {
            return a <= b ? a : b;
        };
        ScannerTextStream.prototype.fetchSegment = function (start, end) {
            if(this.agg.seg1.segmentStart <= start && end <= this.agg.seg1.segmentEnd) {
                return this.agg.seg1;
            }
            if(this.agg.seg2.segmentStart <= start && end <= this.agg.seg1.segmentEnd) {
                return this.agg;
            }
            var prev = this.agg.seg1;
            var s = prev.segmentEnd;
            var e = TypeScript.max(s + 512, end);
            e = TypeScript.min(e, this.len);
            var src = this.sourceText.getText(s, e);
            var newSeg = new SourceTextSegment(s, e, src);
            this.agg.seg2 = prev;
            this.agg.seg1 = newSeg;
            return this.agg;
        };
        ScannerTextStream.prototype.charCodeAt = function (index) {
            return this.fetchSegment(index, index + 1).charCodeAt(index);
        };
        ScannerTextStream.prototype.substring = function (start, end) {
            return this.fetchSegment(start, end).substring(start, end);
        };
        return ScannerTextStream;
    })();
    TypeScript.ScannerTextStream = ScannerTextStream;    
    var SavedTokens = (function () {
        function SavedTokens() {
            this.prevToken = null;
            this.curSavedToken = null;
            this.prevSavedToken = null;
            this.prevToken = null;
            this.currentToken = 0;
            this.tokens = new Array();
            this.seenUnicodeChar = false;
            this.seenUnicodeCharInComment = false;
            this.prevLine = 1;
            this.line = 1;
            this.col = 0;
            this.lexState = LexState.Start;
            this.commentStack = new Array();
            this.lineMap = [];
        }
        SavedTokens.prototype.previousToken = function () {
            return this.prevToken;
        };
        SavedTokens.prototype.close = function () {
            this.currentToken = 0;
        };
        SavedTokens.prototype.addToken = function (tok, scanner) {
            this.tokens[this.currentToken++] = new TypeScript.SavedToken(tok, scanner.startPos, scanner.pos);
        };
        SavedTokens.prototype.scan = function () {
            this.startLine = this.line;
            this.startPos = this.col;
            if(this.currentTokenIndex == this.currentTokens.length) {
                if(this.line < this.lineMap.length) {
                    this.line++;
                    this.col = 0;
                    this.currentTokenIndex = 0;
                    this.currentTokens = this.tokensByLine[this.line];
                } else {
                    return TypeScript.staticTokens[TypeScript.TokenID.EndOfFile];
                }
            }
            if(this.currentTokenIndex < this.currentTokens.length) {
                this.prevToken = this.curSavedToken.tok;
                this.prevSavedToken = this.curSavedToken;
                this.curSavedToken = this.currentTokens[this.currentTokenIndex++];
                var curToken = this.curSavedToken.tok;
                this.pos = this.curSavedToken.limChar;
                this.col += (this.curSavedToken.limChar - this.curSavedToken.minChar);
                this.startPos = this.curSavedToken.minChar;
                this.prevLine = this.line;
                return curToken;
            } else {
                return TypeScript.staticTokens[TypeScript.TokenID.EndOfFile];
            }
        };
        SavedTokens.prototype.syncToTok = function (offset) {
            this.line = getLineNumberFromPosition(this.lineMap, offset);
            this.currentTokenIndex = 0;
            var tmpCol = offset - this.lineMap[this.line];
            while((this.lexStateByLine[this.line] == LexState.InMultilineComment) && (this.line > 0)) {
                this.line--;
                tmpCol = 0;
            }
            var lenMin1 = this.lineMap.length - 1;
            this.currentTokens = this.tokensByLine[this.line];
            while((this.currentTokens.length == 0) && (this.line < lenMin1)) {
                this.line++;
                this.currentTokens = this.tokensByLine[this.line];
                tmpCol = 0;
            }
            if(this.line <= lenMin1) {
                while((this.currentTokenIndex < this.currentTokens.length) && (tmpCol > this.currentTokens[this.currentTokenIndex].limChar)) {
                    this.currentTokenIndex++;
                }
                if(this.currentTokenIndex < this.currentTokens.length) {
                    this.col = this.currentTokens[this.currentTokenIndex].minChar;
                    return this.col + this.lineMap[this.line];
                }
            }
            return -1;
        };
        SavedTokens.prototype.lastTokenLimChar = function () {
            if(this.prevSavedToken !== null) {
                return this.prevSavedToken.limChar;
            } else {
                return 0;
            }
        };
        SavedTokens.prototype.lastTokenHadNewline = function () {
            return this.prevLine != this.startLine;
        };
        SavedTokens.prototype.pushComment = function (comment) {
            this.commentStack.push(comment);
        };
        SavedTokens.prototype.getComments = function () {
            var stack = this.commentStack;
            this.commentStack = [];
            return stack;
        };
        SavedTokens.prototype.getCommentsForLine = function (line) {
            var comments = null;
            while((this.commentStack.length > 0) && (this.commentStack[0].line == line)) {
                if(comments == null) {
                    comments = [
                        this.commentStack.shift()
                    ];
                } else {
                    comments = comments.concat([
                        this.commentStack.shift()
                    ]);
                }
            }
            return comments;
        };
        SavedTokens.prototype.resetComments = function () {
            this.commentStack = [];
        };
        SavedTokens.prototype.setSourceText = function (newSrc, textMode) {
        };
        SavedTokens.prototype.setErrorHandler = function (reportError) {
        };
        SavedTokens.prototype.getLookAheadToken = function () {
            throw new Error("Invalid operation.");
        };
        return SavedTokens;
    })();
    TypeScript.SavedTokens = SavedTokens;    
    var Scanner = (function () {
        function Scanner() {
            this.prevLine = 1;
            this.line = 1;
            this.col = 0;
            this.pos = 0;
            this.startPos = 0;
            this.len = 0;
            this.lineMap = [];
            this.ch = TypeScript.LexEOF;
            this.lexState = LexState.Start;
            this.mode = LexMode.File;
            this.scanComments = true;
            this.interveningWhitespace = false;
            this.interveningWhitespacePos = 0;
            this.leftCurlyCount = 0;
            this.rightCurlyCount = 0;
            this.commentStack = new Array();
            this.saveScan = null;
            this.seenUnicodeChar = false;
            this.seenUnicodeCharInComment = false;
            this.prevTok = TypeScript.staticTokens[TypeScript.TokenID.EndOfFile];
            this.startCol = this.col;
            this.startLine = this.line;
            this.lineMap[1] = 0;
            if(!TypeScript.LexKeywordTable) {
                LexInitialize();
            }
        }
        Scanner.prototype.previousToken = function () {
            return this.prevTok;
        };
        Scanner.prototype.setSourceText = function (newSrc, textMode) {
            this.mode = textMode;
            this.scanComments = (this.mode === LexMode.Line);
            this.pos = 0;
            this.interveningWhitespacePos = 0;
            this.startPos = 0;
            this.line = 1;
            this.col = 0;
            this.startCol = this.col;
            this.startLine = this.line;
            this.len = 0;
            this.src = newSrc.getText(0, newSrc.getLength());
            this.len = this.src.length;
            this.lineMap = [];
            this.lineMap[1] = 0;
            this.commentStack = [];
            this.leftCurlyCount = 0;
            this.rightCurlyCount = 0;
            this.seenUnicodeChar = false;
            this.seenUnicodeCharInComment = false;
        };
        Scanner.prototype.setErrorHandler = function (reportError) {
            this.reportError = reportError;
        };
        Scanner.prototype.setSaveScan = function (savedTokens) {
            this.saveScan = savedTokens;
        };
        Scanner.prototype.setText = function (newSrc, textMode) {
            this.setSourceText(new StringSourceText(newSrc), textMode);
        };
        Scanner.prototype.setScanComments = function (value) {
            this.scanComments = value;
        };
        Scanner.prototype.getLexState = function () {
            return this.lexState;
        };
        Scanner.prototype.tokenStart = function () {
            this.startPos = this.pos;
            this.startLine = this.line;
            this.startCol = this.col;
            this.interveningWhitespace = false;
        };
        Scanner.prototype.peekChar = function () {
            if(this.pos < this.len) {
                return this.src.charCodeAt(this.pos);
            } else {
                return TypeScript.LexEOF;
            }
        };
        Scanner.prototype.peekCharAt = function (index) {
            if(index < this.len) {
                return this.src.charCodeAt(index);
            } else {
                return TypeScript.LexEOF;
            }
        };
        Scanner.prototype.IsHexDigit = function (c) {
            return ((c >= TypeScript.LexCode_0) && (c <= TypeScript.LexCode_9)) || ((c >= TypeScript.LexCode_A) && (c <= TypeScript.LexCode_F)) || ((c >= TypeScript.LexCode_a) && (c <= TypeScript.LexCode_f));
        };
        Scanner.prototype.IsOctalDigit = function (c) {
            return ((c >= TypeScript.LexCode_0) && (c <= TypeScript.LexCode_7)) || ((c >= TypeScript.LexCode_a) && (c <= TypeScript.LexCode_f));
        };
        Scanner.prototype.scanHexDigits = function () {
            var atLeastOneDigit = false;
            for(; ; ) {
                if(this.IsHexDigit(this.ch)) {
                    this.nextChar();
                    atLeastOneDigit = true;
                } else {
                    if(atLeastOneDigit) {
                        return new TypeScript.NumberLiteralToken(parseInt(this.src.substring(this.startPos, this.pos)));
                    } else {
                        return null;
                    }
                }
            }
        };
        Scanner.prototype.scanOctalDigits = function () {
            var atLeastOneDigit = false;
            for(; ; ) {
                if(this.IsOctalDigit(this.ch)) {
                    this.nextChar();
                    atLeastOneDigit = true;
                } else {
                    if(atLeastOneDigit) {
                        return new TypeScript.NumberLiteralToken(parseInt(this.src.substring(this.startPos, this.pos)));
                    } else {
                        return null;
                    }
                }
            }
        };
        Scanner.prototype.scanDecimalNumber = function (state) {
            var atLeastOneDigit = false;
            var svPos = this.pos;
            var svCol = this.col;
            for(; ; ) {
                if(LexIsDigit(this.ch)) {
                    atLeastOneDigit = true;
                    if(this.ch != TypeScript.LexCode_0 && state == NumberScanState.InEmptyFraction) {
                        state = NumberScanState.InFraction;
                    }
                    this.nextChar();
                } else {
                    if(this.ch == TypeScript.LexCodeDOT) {
                        if(state == NumberScanState.Start) {
                            this.nextChar();
                            state = NumberScanState.InEmptyFraction;
                        } else {
                            if(atLeastOneDigit) {
                                return new TypeScript.NumberLiteralToken(parseFloat(this.src.substring(this.startPos, this.pos)), state == NumberScanState.InEmptyFraction);
                            } else {
                                this.pos = svPos;
                                this.col = svCol;
                                return null;
                            }
                        }
                    } else {
                        if((this.ch == TypeScript.LexCode_e) || (this.ch == TypeScript.LexCode_E)) {
                            if(state == NumberScanState.Start) {
                                if(atLeastOneDigit) {
                                    atLeastOneDigit = false;
                                    this.nextChar();
                                    state = NumberScanState.InExponent;
                                } else {
                                    this.pos = svPos;
                                    this.col = svCol;
                                    return null;
                                }
                            } else {
                                if(state == NumberScanState.InFraction || state == NumberScanState.InEmptyFraction) {
                                    this.nextChar();
                                    state = NumberScanState.InExponent;
                                    atLeastOneDigit = false;
                                } else {
                                    if(atLeastOneDigit) {
                                        return new TypeScript.NumberLiteralToken(parseFloat(this.src.substring(this.startPos, this.pos)));
                                    } else {
                                        this.pos = svPos;
                                        this.col = svCol;
                                        return null;
                                    }
                                }
                            }
                        } else {
                            if((this.ch == TypeScript.LexCodePLS) || (this.ch == TypeScript.LexCodeMIN)) {
                                if(state == NumberScanState.InExponent) {
                                    if(!atLeastOneDigit) {
                                        this.nextChar();
                                    } else {
                                        this.pos = svPos;
                                        this.col = svCol;
                                        return null;
                                    }
                                } else {
                                    if(state == NumberScanState.InEmptyFraction || state == NumberScanState.InFraction) {
                                        return new TypeScript.NumberLiteralToken(parseFloat(this.src.substring(this.startPos, this.pos)), state == NumberScanState.InEmptyFraction);
                                    } else {
                                        if(!atLeastOneDigit) {
                                            this.pos = svPos;
                                            this.col = svCol;
                                            return null;
                                        } else {
                                            return new TypeScript.NumberLiteralToken(parseFloat(this.src.substring(this.startPos, this.pos)));
                                        }
                                    }
                                }
                            } else {
                                if(!atLeastOneDigit) {
                                    this.pos = svPos;
                                    this.col = svCol;
                                    return null;
                                } else {
                                    return new TypeScript.NumberLiteralToken(parseFloat(this.src.substring(this.startPos, this.pos)), state == NumberScanState.InEmptyFraction);
                                }
                            }
                        }
                    }
                }
            }
        };
        Scanner.prototype.scanNumber = function () {
            if(this.peekChar() == TypeScript.LexCode_0) {
                switch(this.peekCharAt(this.pos + 1)) {
                    case TypeScript.LexCode_x:
                    case TypeScript.LexCode_X: {
                        this.advanceChar(2);
                        return this.scanHexDigits();

                    }
                    case TypeScript.LexCode_8:
                    case TypeScript.LexCode_9:
                    case TypeScript.LexCodeDOT: {
                        return this.scanDecimalNumber(NumberScanState.Start);

                    }
                    default: {
                        return this.scanOctalDigits();

                    }
                }
            } else {
                return this.scanDecimalNumber(NumberScanState.Start);
            }
        };
        Scanner.prototype.scanFraction = function () {
            return this.scanDecimalNumber(NumberScanState.InFraction);
        };
        Scanner.prototype.newLine = function () {
            this.col = 0;
            if(this.mode == LexMode.File) {
                this.line++;
                this.lineMap[this.line] = this.pos + 1;
            }
        };
        Scanner.prototype.finishMultilineComment = function () {
            var ch2;
            this.lexState = LexState.InMultilineComment;
            while(this.pos < this.len) {
                if(this.ch == TypeScript.LexCodeMUL) {
                    ch2 = this.peekCharAt(this.pos + 1);
                    if(ch2 == TypeScript.LexCodeSLH) {
                        this.advanceChar(2);
                        if(this.mode == LexMode.File) {
                            this.tokenStart();
                        }
                        this.lexState = LexState.Start;
                        return true;
                    }
                } else {
                    if(this.ch == TypeScript.LexCodeNWL) {
                        this.newLine();
                        if(this.mode == LexMode.Line) {
                            this.nextChar();
                            return false;
                        }
                    } else {
                        if(this.ch >= TypeScript.LexCodeASCIIChars) {
                            this.seenUnicodeCharInComment = true;
                        }
                    }
                }
                this.nextChar();
            }
            return false;
        };
        Scanner.prototype.pushComment = function (comment) {
            this.commentStack.push(comment);
        };
        Scanner.prototype.getComments = function () {
            var stack = this.commentStack;
            this.commentStack = [];
            return stack;
        };
        Scanner.prototype.getCommentsForLine = function (line) {
            var comments = null;
            while((this.commentStack.length > 0) && (this.commentStack[0].line == line)) {
                if(comments == null) {
                    comments = [
                        this.commentStack.shift()
                    ];
                } else {
                    comments = comments.concat([
                        this.commentStack.shift()
                    ]);
                }
            }
            return comments;
        };
        Scanner.prototype.resetComments = function () {
            this.commentStack = [];
        };
        Scanner.prototype.endsLine = function (c) {
            return (c == TypeScript.LexCodeNWL) || (c == TypeScript.LexCodeRET) || (c == TypeScript.LexCodeLS) || (c == TypeScript.LexCodePS);
        };
        Scanner.prototype.finishSinglelineComment = function () {
            while(this.pos < this.len) {
                if(this.endsLine(this.ch)) {
                    break;
                }
                if(this.ch >= TypeScript.LexCodeASCIIChars) {
                    this.seenUnicodeCharInComment = true;
                }
                this.nextChar();
            }
            if(this.mode == LexMode.File) {
                this.tokenStart();
            }
        };
        Scanner.prototype.tokenText = function () {
            return this.src.substring(this.startPos, this.pos);
        };
        Scanner.prototype.findClosingSLH = function () {
            var index = this.pos;
            var ch2 = this.src.charCodeAt(index);
            var prevCh = 0;
            var liveEsc = false;
            while(!this.endsLine(ch2) && (index < this.len)) {
                if((ch2 == TypeScript.LexCodeSLH) && (!liveEsc)) {
                    return index;
                }
                prevCh = ch2;
                index++;
                if(liveEsc) {
                    liveEsc = false;
                } else {
                    liveEsc = (prevCh == TypeScript.LexCodeBSL);
                }
                ch2 = this.src.charCodeAt(index);
            }
            return -1;
        };
        Scanner.prototype.speculateRegex = function () {
            if(TypeScript.noRegexTable[this.prevTok.tokenId] != undefined) {
                return null;
            }
            var svPos = this.pos;
            var svCol = this.col;
            var index = this.findClosingSLH();
            if(index > 0) {
                var pattern = this.src.substring(svPos, index);
                var flags = "";
                this.pos = index + 1;
                this.ch = this.peekChar();
                var flagsStart = this.pos;
                while((this.ch == TypeScript.LexCode_i) || (this.ch == TypeScript.LexCode_g) || (this.ch == TypeScript.LexCode_m)) {
                    this.nextChar();
                }
                if((this.pos - flagsStart) > 3) {
                    return null;
                } else {
                    flags = this.src.substring(flagsStart, this.pos);
                }
                var regex = undefined;
                try  {
                    regex = new RegExp(pattern, flags);
                } catch (regexException) {
                }
                if(regex) {
                    this.col = svCol + (this.pos - this.startPos);
                    return new TypeScript.RegularExpressionLiteralToken(regex);
                }
            }
            this.pos = svPos;
            this.col = svCol;
            return null;
        };
        Scanner.prototype.lastTokenHadNewline = function () {
            return this.prevLine != this.startLine;
        };
        Scanner.prototype.lastTokenLimChar = function () {
            return this.interveningWhitespace ? this.interveningWhitespacePos : this.startPos;
        };
        Scanner.prototype.advanceChar = function (amt) {
            this.pos += amt;
            this.col += amt;
            this.ch = this.peekChar();
        };
        Scanner.prototype.nextChar = function () {
            this.pos++;
            this.col++;
            this.ch = this.peekChar();
        };
        Scanner.prototype.getLookAheadToken = function () {
            var prevLine = this.prevLine;
            var line = this.line;
            var col = this.col;
            var pos = this.pos;
            var startPos = this.startPos;
            var startCol = this.startCol;
            var startLine = this.startLine;
            var ch = this.ch;
            var prevTok = this.prevTok;
            var lexState = this.lexState;
            var interveningWhitespace = this.interveningWhitespace;
            var interveningWhitespacePos = this.interveningWhitespacePos;
            var leftCurlyCount = this.leftCurlyCount;
            var rightCurlyCount = this.rightCurlyCount;
            var seenUnicodeChar = this.seenUnicodeChar;
            var seenUnicodeCharInComment = this.seenUnicodeCharInComment;
            var commentStackLength = this.commentStack.length;
            var lookAheadToken = this.scan();
            this.prevLine = prevLine;
            this.line = line;
            this.col = col;
            this.pos = pos;
            this.startPos = startPos;
            this.startCol = startCol;
            this.startLine = startLine;
            this.ch = ch;
            this.prevTok = prevTok;
            this.lexState = lexState;
            this.interveningWhitespace = interveningWhitespace;
            this.interveningWhitespacePos = interveningWhitespacePos;
            this.leftCurlyCount = leftCurlyCount;
            this.rightCurlyCount = rightCurlyCount;
            this.seenUnicodeChar = seenUnicodeChar;
            this.seenUnicodeCharInComment = seenUnicodeCharInComment;
            this.commentStack.length = commentStackLength;
            return lookAheadToken;
        };
        Scanner.prototype.scanInLine = function () {
            if((this.lexState == LexState.InMultilineComment) && (this.scanComments)) {
                this.ch = this.peekChar();
                var commentLine = this.line;
                this.finishMultilineComment();
                if(this.startPos < this.pos) {
                    var commentText = this.src.substring(this.startPos, this.pos);
                    this.tokenStart();
                    return new TypeScript.CommentToken(TypeScript.TokenID.Comment, commentText, true, this.startPos, commentLine, true);
                } else {
                    return TypeScript.staticTokens[TypeScript.TokenID.EndOfFile];
                }
            } else {
                if(this.lexState == LexState.InMultilineSingleQuoteString && this.pos < this.len) {
                    this.ch = TypeScript.LexCodeAPO;
                    this.lexState = LexState.Start;
                    return this.scanStringConstant();
                } else {
                    if(this.lexState == LexState.InMultilineDoubleQuoteString && this.pos < this.len) {
                        this.ch = TypeScript.LexCodeQUO;
                        this.lexState = LexState.Start;
                        return this.scanStringConstant();
                    }
                }
            }
            this.prevLine = this.line;
            var prevTok = this.innerScan();
            if(prevTok.tokenId != TypeScript.TokenID.Whitespace) {
                this.prevTok = prevTok;
            }
            return prevTok;
        };
        Scanner.prototype.scan = function () {
            this.prevLine = this.line;
            this.prevTok = this.innerScan();
            if(this.saveScan) {
                this.saveScan.addToken(this.prevTok, this);
            }
            return this.prevTok;
        };
        Scanner.prototype.isValidUnicodeIdentifierChar = function () {
            var valid = LexIsUnicodeIdStart(this.ch) || LexIsUnicodeDigit(this.ch);
            this.seenUnicodeChar = this.seenUnicodeChar || valid;
            return valid;
        };
        Scanner.prototype.scanStringConstant = function () {
            var endCode = this.ch;
            this.nextChar();
            scanStringConstantLoop:
for(; ; ) {
                switch(this.ch) {
                    case TypeScript.LexEOF: {
                        this.reportScannerError("Unterminated string constant");
                        break scanStringConstantLoop;

                    }
                    case TypeScript.LexCodeLS:
                    case TypeScript.LexCodePS: {
                        this.seenUnicodeChar = true;

                    }
                    case TypeScript.LexCodeRET:
                    case TypeScript.LexCodeNWL: {
                        this.reportScannerError("Unterminated string constant");
                        break scanStringConstantLoop;

                    }
                    case TypeScript.LexCodeAPO:
                    case TypeScript.LexCodeQUO: {
                        if(this.ch == endCode) {
                            this.nextChar();
                            break scanStringConstantLoop;
                        }
                        break;

                    }
                    case TypeScript.LexCodeBSL: {
                        this.nextChar();
                        switch(this.ch) {
                            case TypeScript.LexCodeAPO:
                            case TypeScript.LexCodeQUO:
                            case TypeScript.LexCodeBSL: {
                                this.nextChar();
                                continue scanStringConstantLoop;

                            }
                            case TypeScript.LexCodeLS:
                            case TypeScript.LexCodePS: {
                                this.seenUnicodeChar = true;

                            }
                            case TypeScript.LexCodeRET:
                            case TypeScript.LexCodeNWL: {
                                if(this.ch == TypeScript.LexCodeRET && this.peekCharAt(this.pos + 1) == TypeScript.LexCodeNWL) {
                                    this.nextChar();
                                }
                                this.nextChar();
                                this.newLine();
                                if(this.mode == LexMode.Line) {
                                    this.lexState = endCode == TypeScript.LexCodeAPO ? LexState.InMultilineSingleQuoteString : LexState.InMultilineDoubleQuoteString;
                                    break scanStringConstantLoop;
                                }
                                break;

                            }
                            case TypeScript.LexCode_x:
                            case TypeScript.LexCode_u: {
                                var expectedHexDigits = this.ch == TypeScript.LexCode_x ? 2 : 4;
                                this.nextChar();
                                for(var i = 0; i < expectedHexDigits; i++) {
                                    if(this.IsHexDigit(this.ch)) {
                                        this.nextChar();
                                    } else {
                                        this.reportScannerError("Invalid Unicode escape sequence");
                                        break;
                                    }
                                }
                                continue scanStringConstantLoop;

                            }
                        }
                        break;

                    }
                }
                if(this.ch >= TypeScript.LexCodeASCIIChars) {
                    this.seenUnicodeChar = true;
                }
                this.nextChar();
            }
            return new TypeScript.StringLiteralToken(this.src.substring(this.startPos, this.pos));
        };
        Scanner.prototype.scanIdentifier = function () {
            var hasEscape = false;
            var isFirstChar = (this.ch == TypeScript.LexCodeBSL);
            var hasUnicode = false;
            for(; ; ) {
                while(lexIdStartTable[this.ch] || LexIsDigit(this.ch) || (this.ch >= TypeScript.LexCodeASCIIChars && this.isValidUnicodeIdentifierChar())) {
                    this.nextChar();
                }
                if(this.ch == TypeScript.LexCodeBSL) {
                    this.nextChar();
                    if(this.ch == TypeScript.LexCode_u) {
                        this.nextChar();
                        for(var h = 0; h < 4; h++) {
                            if(this.IsHexDigit(this.ch)) {
                                this.nextChar();
                            } else {
                                this.reportScannerError("Invalid Unicode escape sequence");
                                return TypeScript.staticTokens[TypeScript.TokenID.Error];
                            }
                        }
                        var hexChar = parseInt(this.src.substring(this.pos - 4, this.pos), 16);
                        if(lexIdStartTable[hexChar] || (!isFirstChar && LexIsDigit(hexChar)) || (hexChar >= TypeScript.LexCodeASCIIChars && (LexIsUnicodeIdStart(hexChar) || (!isFirstChar && LexIsUnicodeDigit(hexChar))))) {
                        } else {
                            this.reportScannerError("Invalid identifier character");
                            return TypeScript.staticTokens[TypeScript.TokenID.Error];
                        }
                        hasEscape = true;
                        isFirstChar = false;
                        continue;
                    }
                    this.reportScannerError("Invalid Unicode escape sequence");
                    return TypeScript.staticTokens[TypeScript.TokenID.Error];
                }
                break;
            }
            var id;
            var text = this.src.substring(this.startPos, this.pos);
            if(!hasEscape && (id = TypeScript.LexKeywordTable.lookup(text)) != null) {
                return TypeScript.staticTokens[id];
            } else {
                return new TypeScript.IdentifierToken(text, hasEscape);
            }
        };
        Scanner.prototype.innerScan = function () {
            var rtok;
            this.tokenStart();
            this.ch = this.peekChar();
            start:
while(this.pos < this.len) {
                if(lexIdStartTable[this.ch] || this.ch == TypeScript.LexCodeBSL || (this.ch >= TypeScript.LexCodeASCIIChars && LexIsUnicodeIdStart(this.ch))) {
                    return this.scanIdentifier();
                } else {
                    if(this.ch == TypeScript.LexCodeSpace) {
                        if(!this.interveningWhitespace) {
                            this.interveningWhitespacePos = this.pos;
                        }
                        do {
                            this.nextChar();
                        }while(this.ch == TypeScript.LexCodeSpace)
                        if(this.mode == LexMode.Line) {
                            var whitespaceText = this.src.substring(this.startPos, this.pos);
                            return new TypeScript.WhitespaceToken(TypeScript.TokenID.Whitespace, whitespaceText);
                        } else {
                            this.tokenStart();
                            this.interveningWhitespace = true;
                        }
                    } else {
                        if(this.ch == TypeScript.LexCodeSLH) {
                            this.nextChar();
                            var commentText;
                            if(this.ch == TypeScript.LexCodeSLH) {
                                if(!this.interveningWhitespace) {
                                    this.interveningWhitespacePos = this.pos - 1;
                                }
                                var commentStartPos = this.pos - 1;
                                var commentStartLine = this.line;
                                this.finishSinglelineComment();
                                var commentText = this.src.substring(commentStartPos, this.pos);
                                var commentToken = new TypeScript.CommentToken(TypeScript.TokenID.Comment, commentText, false, commentStartPos, commentStartLine, false);
                                if(this.scanComments) {
                                    this.startPos = commentStartPos;
                                    return commentToken;
                                } else {
                                    this.pushComment(commentToken);
                                }
                                this.interveningWhitespace = true;
                            } else {
                                if(this.ch == TypeScript.LexCodeMUL) {
                                    if(!this.interveningWhitespace) {
                                        this.interveningWhitespacePos = this.pos - 1;
                                    }
                                    var commentStartPos = this.pos - 1;
                                    var commentStartLine = this.line;
                                    this.nextChar();
                                    this.finishMultilineComment();
                                    var commentText = this.src.substring(commentStartPos, this.pos);
                                    var endsLine = this.endsLine(this.peekChar());
                                    var commentToken = new TypeScript.CommentToken(TypeScript.TokenID.Comment, commentText, true, commentStartPos, commentStartLine, endsLine);
                                    if(this.scanComments) {
                                        this.startPos = commentStartPos;
                                        return commentToken;
                                    } else {
                                        this.pushComment(commentToken);
                                    }
                                    this.interveningWhitespace = true;
                                } else {
                                    var regexTok = this.speculateRegex();
                                    if(regexTok) {
                                        return regexTok;
                                    } else {
                                        if(this.peekCharAt(this.pos) == TypeScript.LexCodeEQ) {
                                            this.nextChar();
                                            return TypeScript.staticTokens[TypeScript.TokenID.SlashEquals];
                                        } else {
                                            return TypeScript.staticTokens[TypeScript.TokenID.Slash];
                                        }
                                    }
                                }
                            }
                        } else {
                            if(this.ch == TypeScript.LexCodeSMC) {
                                this.nextChar();
                                return TypeScript.staticTokens[TypeScript.TokenID.Semicolon];
                            } else {
                                if((this.ch == TypeScript.LexCodeAPO) || (this.ch == TypeScript.LexCodeQUO)) {
                                    return this.scanStringConstant();
                                } else {
                                    if(autoToken[this.ch]) {
                                        var atok = autoToken[this.ch];
                                        if(atok.tokenId == TypeScript.TokenID.OpenBrace) {
                                            this.leftCurlyCount++;
                                        } else {
                                            if(atok.tokenId == TypeScript.TokenID.CloseBrace) {
                                                this.rightCurlyCount++;
                                            }
                                        }
                                        this.nextChar();
                                        return atok;
                                    } else {
                                        if((this.ch >= TypeScript.LexCode_0) && (this.ch <= TypeScript.LexCode_9)) {
                                            rtok = this.scanNumber();
                                            if(rtok) {
                                                return rtok;
                                            } else {
                                                this.nextChar();
                                                return TypeScript.staticTokens[TypeScript.TokenID.Error];
                                            }
                                        } else {
                                            switch(this.ch) {
                                                case TypeScript.LexCodeTAB:
                                                case TypeScript.LexCodeVTAB: {
                                                    if(!this.interveningWhitespace) {
                                                        this.interveningWhitespacePos = this.pos;
                                                    }
                                                    if(this.mode == LexMode.Line) {
                                                        do {
                                                            this.nextChar();
                                                        }while((this.ch == TypeScript.LexCodeSpace) || (this.ch == 9))
                                                        var wsText = this.src.substring(this.startPos, this.pos);
                                                        return new TypeScript.WhitespaceToken(TypeScript.TokenID.Whitespace, wsText);
                                                    } else {
                                                        this.interveningWhitespace = true;
                                                    }

                                                }
                                                case 255:
                                                case 254:
                                                case 239:
                                                case 187:
                                                case 191:
                                                case TypeScript.LexCodeLS:
                                                case TypeScript.LexCodePS:
                                                case TypeScript.LexCodeNWL:
                                                case TypeScript.LexCodeRET: {
                                                    if(this.ch == TypeScript.LexCodeNWL) {
                                                        this.newLine();
                                                        if(this.mode == LexMode.Line) {
                                                            return TypeScript.staticTokens[TypeScript.TokenID.EndOfFile];
                                                        }
                                                    }
                                                    if(!this.interveningWhitespace) {
                                                        this.interveningWhitespacePos = this.pos;
                                                    }
                                                    this.nextChar();
                                                    this.tokenStart();
                                                    this.interveningWhitespace = true;
                                                    break;

                                                }
                                                case TypeScript.LexCodeDOT: {
                                                    if(this.peekCharAt(this.pos + 1) == TypeScript.LexCodeDOT) {
                                                        if(this.peekCharAt(this.pos + 2) == TypeScript.LexCodeDOT) {
                                                            this.advanceChar(3);
                                                            return TypeScript.staticTokens[TypeScript.TokenID.DotDotDot];
                                                        } else {
                                                            this.nextChar();
                                                            return TypeScript.staticTokens[TypeScript.TokenID.Dot];
                                                        }
                                                    } else {
                                                        this.nextChar();
                                                        rtok = this.scanFraction();
                                                        if(rtok) {
                                                            return rtok;
                                                        } else {
                                                            return TypeScript.staticTokens[TypeScript.TokenID.Dot];
                                                        }
                                                    }
                                                }

                                                case TypeScript.LexCodeEQ: {
                                                    if(this.peekCharAt(this.pos + 1) == TypeScript.LexCodeEQ) {
                                                        if(this.peekCharAt(this.pos + 2) == TypeScript.LexCodeEQ) {
                                                            this.advanceChar(3);
                                                            return TypeScript.staticTokens[TypeScript.TokenID.EqualsEqualsEquals];
                                                        } else {
                                                            this.advanceChar(2);
                                                            return TypeScript.staticTokens[TypeScript.TokenID.EqualsEquals];
                                                        }
                                                    } else {
                                                        if(this.peekCharAt(this.pos + 1) == TypeScript.LexCodeGT) {
                                                            this.advanceChar(2);
                                                            return TypeScript.staticTokens[TypeScript.TokenID.EqualsGreaterThan];
                                                        } else {
                                                            this.nextChar();
                                                            return TypeScript.staticTokens[TypeScript.TokenID.Equals];
                                                        }
                                                    }

                                                }
                                                case TypeScript.LexCodeBNG: {
                                                    if(this.peekCharAt(this.pos + 1) == TypeScript.LexCodeEQ) {
                                                        if(this.peekCharAt(this.pos + 2) == TypeScript.LexCodeEQ) {
                                                            this.advanceChar(3);
                                                            return TypeScript.staticTokens[TypeScript.TokenID.ExclamationEqualsEquals];
                                                        } else {
                                                            this.advanceChar(2);
                                                            return TypeScript.staticTokens[TypeScript.TokenID.ExclamationEquals];
                                                        }
                                                    } else {
                                                        this.nextChar();
                                                        return TypeScript.staticTokens[TypeScript.TokenID.Exclamation];
                                                    }

                                                }
                                                case TypeScript.LexCodePLS: {
                                                    if(this.peekCharAt(this.pos + 1) == TypeScript.LexCodeEQ) {
                                                        this.advanceChar(2);
                                                        return TypeScript.staticTokens[TypeScript.TokenID.PlusEquals];
                                                    } else {
                                                        if(this.peekCharAt(this.pos + 1) == TypeScript.LexCodePLS) {
                                                            this.advanceChar(2);
                                                            return TypeScript.staticTokens[TypeScript.TokenID.PlusPlus];
                                                        } else {
                                                            this.nextChar();
                                                            return TypeScript.staticTokens[TypeScript.TokenID.Plus];
                                                        }
                                                    }

                                                }
                                                case TypeScript.LexCodeMIN: {
                                                    if(this.peekCharAt(this.pos + 1) == TypeScript.LexCodeEQ) {
                                                        this.advanceChar(2);
                                                        return TypeScript.staticTokens[TypeScript.TokenID.MinusEquals];
                                                    } else {
                                                        if(this.peekCharAt(this.pos + 1) == TypeScript.LexCodeMIN) {
                                                            this.advanceChar(2);
                                                            return TypeScript.staticTokens[TypeScript.TokenID.MinusMinus];
                                                        } else {
                                                            this.nextChar();
                                                            return TypeScript.staticTokens[TypeScript.TokenID.Minus];
                                                        }
                                                    }

                                                }
                                                case TypeScript.LexCodeMUL: {
                                                    if(this.peekCharAt(this.pos + 1) == TypeScript.LexCodeEQ) {
                                                        this.advanceChar(2);
                                                        return TypeScript.staticTokens[TypeScript.TokenID.AsteriskEquals];
                                                    } else {
                                                        this.nextChar();
                                                        return TypeScript.staticTokens[TypeScript.TokenID.Asterisk];
                                                    }

                                                }
                                                case TypeScript.LexCodePCT: {
                                                    if(this.peekCharAt(this.pos + 1) == TypeScript.LexCodeEQ) {
                                                        this.advanceChar(2);
                                                        return TypeScript.staticTokens[TypeScript.TokenID.PercentEquals];
                                                    } else {
                                                        this.nextChar();
                                                        return TypeScript.staticTokens[TypeScript.TokenID.Percent];
                                                    }

                                                }
                                                case TypeScript.LexCodeLT: {
                                                    if(this.peekCharAt(this.pos + 1) == TypeScript.LexCodeLT) {
                                                        if(this.peekCharAt(this.pos + 2) == TypeScript.LexCodeEQ) {
                                                            this.advanceChar(3);
                                                            return TypeScript.staticTokens[TypeScript.TokenID.LessThanLessThanEquals];
                                                        } else {
                                                            this.advanceChar(2);
                                                            return TypeScript.staticTokens[TypeScript.TokenID.LessThanLessThan];
                                                        }
                                                    } else {
                                                        if(this.peekCharAt(this.pos + 1) == TypeScript.LexCodeEQ) {
                                                            this.advanceChar(2);
                                                            return TypeScript.staticTokens[TypeScript.TokenID.LessThanEquals];
                                                        } else {
                                                            this.nextChar();
                                                            return TypeScript.staticTokens[TypeScript.TokenID.LessThan];
                                                        }
                                                    }

                                                }
                                                case TypeScript.LexCodeGT: {
                                                    if(this.peekCharAt(this.pos + 1) == TypeScript.LexCodeGT) {
                                                        if(this.peekCharAt(this.pos + 2) == TypeScript.LexCodeEQ) {
                                                            this.advanceChar(3);
                                                            return TypeScript.staticTokens[TypeScript.TokenID.GreaterThanGreaterThanEquals];
                                                        } else {
                                                            if(this.peekCharAt(this.pos + 2) == TypeScript.LexCodeGT) {
                                                                if(this.peekCharAt(this.pos + 3) == TypeScript.LexCodeEQ) {
                                                                    this.advanceChar(4);
                                                                    return TypeScript.staticTokens[TypeScript.TokenID.GreaterThanGreaterThanGreaterThanEquals];
                                                                } else {
                                                                    this.advanceChar(3);
                                                                    return TypeScript.staticTokens[TypeScript.TokenID.GreaterThanGreaterThanGreaterThan];
                                                                }
                                                            } else {
                                                                this.advanceChar(2);
                                                                return TypeScript.staticTokens[TypeScript.TokenID.GreaterThanGreaterThan];
                                                            }
                                                        }
                                                    } else {
                                                        if(this.peekCharAt(this.pos + 1) == TypeScript.LexCodeEQ) {
                                                            this.advanceChar(2);
                                                            return TypeScript.staticTokens[TypeScript.TokenID.GreaterThanEquals];
                                                        } else {
                                                            this.nextChar();
                                                            return TypeScript.staticTokens[TypeScript.TokenID.GreaterThan];
                                                        }
                                                    }

                                                }
                                                case TypeScript.LexCodeXOR: {
                                                    if(this.peekCharAt(this.pos + 1) == TypeScript.LexCodeEQ) {
                                                        this.advanceChar(2);
                                                        return TypeScript.staticTokens[TypeScript.TokenID.CaretEquals];
                                                    } else {
                                                        this.nextChar();
                                                        return TypeScript.staticTokens[TypeScript.TokenID.Caret];
                                                    }

                                                }
                                                case TypeScript.LexCodeBAR: {
                                                    if(this.peekCharAt(this.pos + 1) == TypeScript.LexCodeEQ) {
                                                        this.advanceChar(2);
                                                        return TypeScript.staticTokens[TypeScript.TokenID.BarEquals];
                                                    } else {
                                                        if(this.peekCharAt(this.pos + 1) == TypeScript.LexCodeBAR) {
                                                            this.advanceChar(2);
                                                            return TypeScript.staticTokens[TypeScript.TokenID.BarBar];
                                                        } else {
                                                            this.nextChar();
                                                            return TypeScript.staticTokens[TypeScript.TokenID.Bar];
                                                        }
                                                    }

                                                }
                                                case TypeScript.LexCodeAMP: {
                                                    if(this.peekCharAt(this.pos + 1) == TypeScript.LexCodeEQ) {
                                                        this.advanceChar(2);
                                                        return TypeScript.staticTokens[TypeScript.TokenID.AmpersandEquals];
                                                    } else {
                                                        if(this.peekCharAt(this.pos + 1) == TypeScript.LexCodeAMP) {
                                                            this.advanceChar(2);
                                                            return TypeScript.staticTokens[TypeScript.TokenID.AmpersandAmpersand];
                                                        } else {
                                                            this.nextChar();
                                                            return TypeScript.staticTokens[TypeScript.TokenID.And];
                                                        }
                                                    }

                                                }
                                                default: {
                                                    this.reportScannerError("Invalid character");
                                                    this.nextChar();
                                                    continue start;

                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return TypeScript.staticTokens[TypeScript.TokenID.EndOfFile];
        };
        Scanner.prototype.reportScannerError = function (message) {
            if(this.reportError) {
                this.reportError(message);
            }
        };
        return Scanner;
    })();
    TypeScript.Scanner = Scanner;    
    function convertTokToIDName(tok) {
        return convertTokToIDBase(tok, true, false);
    }
    TypeScript.convertTokToIDName = convertTokToIDName;
    function convertTokToID(tok, strictMode) {
        return convertTokToIDBase(tok, false, strictMode);
    }
    TypeScript.convertTokToID = convertTokToID;
    function convertTokToIDBase(tok, identifierName, strictMode) {
        if(tok.tokenId <= TypeScript.TokenID.LimKeyword) {
            var tokInfo = TypeScript.lookupToken(tok.tokenId);
            if(tokInfo != undefined) {
                var resFlags = TypeScript.Reservation.Javascript | TypeScript.Reservation.JavascriptFuture;
                if(strictMode) {
                    resFlags |= TypeScript.Reservation.JavascriptFutureStrict;
                }
                if(identifierName || !TypeScript.hasFlag(tokInfo.reservation, resFlags)) {
                    return true;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    function getLineNumberFromPosition(lineMap, position) {
        if(position === -1) {
            return 0;
        }
        var min = 0;
        var max = lineMap.length - 1;
        while(min < max) {
            var med = (min + max) >> 1;
            if(position < lineMap[med]) {
                max = med - 1;
            } else {
                if(position < lineMap[med + 1]) {
                    min = max = med;
                } else {
                    min = med + 1;
                }
            }
        }
        return min;
    }
    TypeScript.getLineNumberFromPosition = getLineNumberFromPosition;
    function getSourceLineColFromMap(lineCol, minChar, lineMap) {
        var line = getLineNumberFromPosition(lineMap, minChar);
        if(line > 0) {
            lineCol.line = line;
            lineCol.col = (minChar - lineMap[line]);
        }
    }
    TypeScript.getSourceLineColFromMap = getSourceLineColFromMap;
    function getLineColumnFromPosition(script, position) {
        var result = {
            line: -1,
            col: -1
        };
        getSourceLineColFromMap(result, position, script.locationInfo.lineMap);
        if(result.col >= 0) {
            result.col++;
        }
        return result;
    }
    TypeScript.getLineColumnFromPosition = getLineColumnFromPosition;
    function getPositionFromLineColumn(script, line, column) {
        return script.locationInfo.lineMap[line] + (column - 1);
    }
    TypeScript.getPositionFromLineColumn = getPositionFromLineColumn;
    function isPrimitiveTypeToken(token) {
        switch(token.tokenId) {
            case TypeScript.TokenID.Any:
            case TypeScript.TokenID.Bool:
            case TypeScript.TokenID.Number:
            case TypeScript.TokenID.String: {
                return true;

            }
        }
        return false;
    }
    TypeScript.isPrimitiveTypeToken = isPrimitiveTypeToken;
    function isModifier(token) {
        switch(token.tokenId) {
            case TypeScript.TokenID.Public:
            case TypeScript.TokenID.Private:
            case TypeScript.TokenID.Static: {
                return true;

            }
        }
        return false;
    }
    TypeScript.isModifier = isModifier;
})(TypeScript || (TypeScript = {}));
var TypeScript;
(function (TypeScript) {
    var AssignScopeContext = (function () {
        function AssignScopeContext(scopeChain, typeFlow, modDeclChain) {
            this.scopeChain = scopeChain;
            this.typeFlow = typeFlow;
            this.modDeclChain = modDeclChain;
        }
        return AssignScopeContext;
    })();
    TypeScript.AssignScopeContext = AssignScopeContext;    
    function pushAssignScope(scope, context, type, classType, fnc) {
        var chain = new TypeScript.ScopeChain(null, context.scopeChain, scope);
        chain.thisType = type;
        chain.classType = classType;
        chain.fnc = fnc;
        context.scopeChain = chain;
    }
    TypeScript.pushAssignScope = pushAssignScope;
    function popAssignScope(context) {
        context.scopeChain = context.scopeChain.previous;
    }
    TypeScript.popAssignScope = popAssignScope;
    function instanceCompare(a, b) {
        if(((a == null) || (!a.isInstanceProperty()))) {
            return b;
        } else {
            return a;
        }
    }
    TypeScript.instanceCompare = instanceCompare;
    function instanceFilterStop(s) {
        return s.isInstanceProperty();
    }
    TypeScript.instanceFilterStop = instanceFilterStop;
    var ScopeSearchFilter = (function () {
        function ScopeSearchFilter(select, stop) {
            this.select = select;
            this.stop = stop;
            this.result = null;
        }
        ScopeSearchFilter.prototype.reset = function () {
            this.result = null;
        };
        ScopeSearchFilter.prototype.update = function (b) {
            this.result = this.select(this.result, b);
            if(this.result) {
                return this.stop(this.result);
            } else {
                return false;
            }
        };
        return ScopeSearchFilter;
    })();
    TypeScript.ScopeSearchFilter = ScopeSearchFilter;    
    TypeScript.instanceFilter = new ScopeSearchFilter(instanceCompare, instanceFilterStop);
    function preAssignModuleScopes(ast, context) {
        var moduleDecl = ast;
        var memberScope = null;
        var aggScope = null;
        if(moduleDecl.name && moduleDecl.mod) {
            moduleDecl.name.sym = moduleDecl.mod.symbol;
        }
        var mod = moduleDecl.mod;
        if(!mod) {
            return;
        }
        memberScope = new TypeScript.SymbolTableScope(mod.members, mod.ambientMembers, mod.enclosedTypes, mod.ambientEnclosedTypes, mod.symbol);
        mod.memberScope = memberScope;
        context.modDeclChain.push(moduleDecl);
        context.typeFlow.checker.currentModDecl = moduleDecl;
        aggScope = new TypeScript.SymbolAggregateScope(mod.symbol);
        aggScope.addParentScope(memberScope);
        aggScope.addParentScope(context.scopeChain.scope);
        pushAssignScope(aggScope, context, null, null, null);
        mod.containedScope = aggScope;
        if(mod.symbol) {
            context.typeFlow.addLocalsFromScope(mod.containedScope, mod.symbol, moduleDecl.vars, mod.members.privateMembers, true);
        }
    }
    TypeScript.preAssignModuleScopes = preAssignModuleScopes;
    function preAssignClassScopes(ast, context) {
        var classDecl = ast;
        var memberScope = null;
        var aggScope = null;
        if(classDecl.name && classDecl.type) {
            classDecl.name.sym = classDecl.type.symbol;
        }
        var classType = ast.type;
        if(classType) {
            var classSym = classType.symbol;
            memberScope = context.typeFlow.checker.scopeOf(classType);
            aggScope = new TypeScript.SymbolAggregateScope(classType.symbol);
            aggScope.addParentScope(memberScope);
            aggScope.addParentScope(context.scopeChain.scope);
            classType.containedScope = aggScope;
            classType.memberScope = memberScope;
            var instanceType = classType.instanceType;
            memberScope = context.typeFlow.checker.scopeOf(instanceType);
            instanceType.memberScope = memberScope;
            aggScope = new TypeScript.SymbolAggregateScope(instanceType.symbol);
            aggScope.addParentScope(context.scopeChain.scope);
            pushAssignScope(aggScope, context, instanceType, classType, null);
            instanceType.containedScope = aggScope;
        } else {
            ast.type = context.typeFlow.anyType;
        }
    }
    TypeScript.preAssignClassScopes = preAssignClassScopes;
    function preAssignInterfaceScopes(ast, context) {
        var interfaceDecl = ast;
        var memberScope = null;
        var aggScope = null;
        if(interfaceDecl.name && interfaceDecl.type) {
            interfaceDecl.name.sym = interfaceDecl.type.symbol;
        }
        var interfaceType = ast.type;
        memberScope = context.typeFlow.checker.scopeOf(interfaceType);
        interfaceType.memberScope = memberScope;
        aggScope = new TypeScript.SymbolAggregateScope(interfaceType.symbol);
        aggScope.addParentScope(memberScope);
        aggScope.addParentScope(context.scopeChain.scope);
        pushAssignScope(aggScope, context, null, null, null);
        interfaceType.containedScope = aggScope;
    }
    TypeScript.preAssignInterfaceScopes = preAssignInterfaceScopes;
    function preAssignWithScopes(ast, context) {
        var withStmt = ast;
        var withType = withStmt.type;
        var members = new TypeScript.ScopedMembers(new TypeScript.DualStringHashTable(new TypeScript.StringHashTable(), new TypeScript.StringHashTable()));
        var ambientMembers = new TypeScript.ScopedMembers(new TypeScript.DualStringHashTable(new TypeScript.StringHashTable(), new TypeScript.StringHashTable()));
        var withType = new TypeScript.Type();
        var withSymbol = new TypeScript.WithSymbol(withStmt.minChar, context.typeFlow.checker.locationInfo.unitIndex, withType);
        withType.members = members;
        withType.ambientMembers = ambientMembers;
        withType.symbol = withSymbol;
        withType.setHasImplementation();
        withStmt.type = withType;
        var withScope = new TypeScript.SymbolScopeBuilder(withType.members, withType.ambientMembers, null, null, context.scopeChain.scope, withType.symbol);
        pushAssignScope(withScope, context, null, null, null);
        withType.containedScope = withScope;
    }
    TypeScript.preAssignWithScopes = preAssignWithScopes;
    function preAssignFuncDeclScopes(ast, context) {
        var funcDecl = ast;
        var container = null;
        var localContainer = null;
        if(funcDecl.type) {
            localContainer = ast.type.symbol;
        }
        var isStatic = TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.Static);
        var isInnerStatic = isStatic && context.scopeChain.fnc != null;
        var parentScope = isInnerStatic ? context.scopeChain.fnc.type.memberScope : context.scopeChain.scope;
        if(context.scopeChain.thisType && (!funcDecl.isConstructor || TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.ClassMethod))) {
            var instType = context.scopeChain.thisType;
            if(!(instType.typeFlags & TypeScript.TypeFlags.IsClass) && !TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.ClassMethod)) {
                if(!funcDecl.isMethod() || isStatic) {
                    parentScope = instType.constructorScope;
                } else {
                    parentScope = instType.containedScope;
                }
            } else {
                if(context.scopeChain.previous.scope.container && context.scopeChain.previous.scope.container.declAST && context.scopeChain.previous.scope.container.declAST.nodeType == TypeScript.NodeType.FuncDecl && (context.scopeChain.previous.scope.container.declAST).isConstructor) {
                    parentScope = instType.constructorScope;
                } else {
                    if(isStatic && context.scopeChain.classType) {
                        parentScope = context.scopeChain.classType.containedScope;
                    } else {
                        parentScope = instType.containedScope;
                    }
                }
            }
            container = instType.symbol;
        } else {
            if(funcDecl.isConstructor && context.scopeChain.thisType) {
                container = context.scopeChain.thisType.symbol;
            }
        }
        if(funcDecl.type == null || TypeScript.hasFlag(funcDecl.type.symbol.flags, TypeScript.SymbolFlags.TypeSetDuringScopeAssignment)) {
            if(context.scopeChain.fnc && context.scopeChain.fnc.type) {
                container = context.scopeChain.fnc.type.symbol;
            }
            var funcScope = null;
            var outerFnc = context.scopeChain.fnc;
            var nameText = funcDecl.name ? funcDecl.name.actualText : null;
            var fgSym = null;
            if(isStatic) {
                if(outerFnc.type.members == null && container.getType().memberScope) {
                    outerFnc.type.members = ((container).type.memberScope).valueMembers;
                }
                funcScope = context.scopeChain.fnc.type.memberScope;
                outerFnc.innerStaticFuncs[outerFnc.innerStaticFuncs.length] = funcDecl;
            } else {
                funcScope = context.scopeChain.scope;
            }
            if(nameText && nameText != "__missing" && !funcDecl.isAccessor()) {
                if(isStatic) {
                    fgSym = funcScope.findLocal(nameText, false, false);
                } else {
                    fgSym = funcScope.findLocal(nameText, false, false);
                }
            }
            context.typeFlow.checker.createFunctionSignature(funcDecl, container, funcScope, fgSym, fgSym == null);
            if(!funcDecl.accessorSymbol && (funcDecl.fncFlags & TypeScript.FncFlags.ClassMethod) && container && ((!fgSym || fgSym.declAST.nodeType != TypeScript.NodeType.FuncDecl) && funcDecl.isAccessor()) || (fgSym && fgSym.isAccessor())) {
                funcDecl.accessorSymbol = context.typeFlow.checker.createAccessorSymbol(funcDecl, fgSym, container.getType(), (funcDecl.isMethod() && isStatic), true, funcScope, container);
            }
            funcDecl.type.symbol.flags |= TypeScript.SymbolFlags.TypeSetDuringScopeAssignment;
        }
        if(funcDecl.name && funcDecl.type) {
            funcDecl.name.sym = funcDecl.type.symbol;
        }
        funcDecl.scopeType = funcDecl.type;
        if(funcDecl.isOverload) {
            return;
        }
        var funcTable = new TypeScript.StringHashTable();
        var funcMembers = new TypeScript.ScopedMembers(new TypeScript.DualStringHashTable(funcTable, new TypeScript.StringHashTable()));
        var ambientFuncTable = new TypeScript.StringHashTable();
        var ambientFuncMembers = new TypeScript.ScopedMembers(new TypeScript.DualStringHashTable(ambientFuncTable, new TypeScript.StringHashTable()));
        var funcStaticTable = new TypeScript.StringHashTable();
        var funcStaticMembers = new TypeScript.ScopedMembers(new TypeScript.DualStringHashTable(funcStaticTable, new TypeScript.StringHashTable()));
        var ambientFuncStaticTable = new TypeScript.StringHashTable();
        var ambientFuncStaticMembers = new TypeScript.ScopedMembers(new TypeScript.DualStringHashTable(ambientFuncStaticTable, new TypeScript.StringHashTable()));
        funcDecl.unitIndex = context.typeFlow.checker.locationInfo.unitIndex;
        var locals = new TypeScript.SymbolScopeBuilder(funcMembers, ambientFuncMembers, null, null, parentScope, localContainer);
        var statics = new TypeScript.SymbolScopeBuilder(funcStaticMembers, ambientFuncStaticMembers, null, null, parentScope, null);
        if(funcDecl.isConstructor && context.scopeChain.thisType) {
            context.scopeChain.thisType.constructorScope = locals;
        }
        funcDecl.symbols = funcTable;
        if(!funcDecl.isSpecialFn()) {
            var group = funcDecl.type;
            var signature = funcDecl.signature;
            if(!funcDecl.isConstructor) {
                group.containedScope = locals;
                locals.container = group.symbol;
                group.memberScope = statics;
                statics.container = group.symbol;
            }
            funcDecl.enclosingFnc = context.scopeChain.fnc;
            group.enclosingType = isStatic ? context.scopeChain.classType : context.scopeChain.thisType;
            var fgSym = ast.type.symbol;
            if(((funcDecl.fncFlags & TypeScript.FncFlags.Signature) == TypeScript.FncFlags.None) && funcDecl.vars) {
                context.typeFlow.addLocalsFromScope(locals, fgSym, funcDecl.vars, funcTable, false);
                context.typeFlow.addLocalsFromScope(statics, fgSym, funcDecl.statics, funcStaticTable, false);
            }
            if(signature.parameters) {
                var len = signature.parameters.length;
                for(var i = 0; i < len; i++) {
                    var paramSym = signature.parameters[i];
                    context.typeFlow.checker.resolveTypeLink(locals, paramSym.parameter.typeLink, true);
                }
            }
            context.typeFlow.checker.resolveTypeLink(locals, signature.returnType, funcDecl.isSignature());
        }
        if(!funcDecl.isConstructor || TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.ClassMethod)) {
            var thisType = (funcDecl.isConstructor && TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.ClassMethod)) ? context.scopeChain.thisType : null;
            pushAssignScope(locals, context, thisType, null, funcDecl);
        }
        if(funcDecl.name && TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.IsFunctionExpression)) {
            if(funcDecl.name.sym) {
                funcTable.add(funcDecl.name.actualText, funcDecl.name.sym);
            }
        }
    }
    TypeScript.preAssignFuncDeclScopes = preAssignFuncDeclScopes;
    function preAssignCatchScopes(ast, context) {
        var catchBlock = ast;
        if(catchBlock.param) {
            var catchTable = new TypeScript.ScopedMembers(new TypeScript.DualStringHashTable(new TypeScript.StringHashTable(), new TypeScript.StringHashTable()));
            var catchLocals = new TypeScript.SymbolScopeBuilder(catchTable, null, null, null, context.scopeChain.scope, context.scopeChain.scope.container);
            catchBlock.containedScope = catchLocals;
            pushAssignScope(catchLocals, context, context.scopeChain.thisType, context.scopeChain.classType, context.scopeChain.fnc);
        }
    }
    TypeScript.preAssignCatchScopes = preAssignCatchScopes;
    function preAssignScopes(ast, parent, walker) {
        var context = walker.state;
        var go = true;
        if(ast) {
            if(ast.nodeType == TypeScript.NodeType.List) {
                var list = ast;
                list.enclosingScope = context.scopeChain.scope;
            } else {
                if(ast.nodeType == TypeScript.NodeType.ModuleDeclaration) {
                    preAssignModuleScopes(ast, context);
                } else {
                    if(ast.nodeType == TypeScript.NodeType.ClassDeclaration) {
                        preAssignClassScopes(ast, context);
                    } else {
                        if(ast.nodeType == TypeScript.NodeType.InterfaceDeclaration) {
                            preAssignInterfaceScopes(ast, context);
                        } else {
                            if(ast.nodeType == TypeScript.NodeType.With) {
                                preAssignWithScopes(ast, context);
                            } else {
                                if(ast.nodeType == TypeScript.NodeType.FuncDecl) {
                                    preAssignFuncDeclScopes(ast, context);
                                } else {
                                    if(ast.nodeType == TypeScript.NodeType.Catch) {
                                        preAssignCatchScopes(ast, context);
                                    } else {
                                        if(ast.nodeType == TypeScript.NodeType.TypeRef) {
                                            go = false;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        walker.options.goChildren = go;
        return ast;
    }
    TypeScript.preAssignScopes = preAssignScopes;
    function postAssignScopes(ast, parent, walker) {
        var context = walker.state;
        var go = true;
        if(ast) {
            if(ast.nodeType == TypeScript.NodeType.ModuleDeclaration) {
                var prevModDecl = ast;
                popAssignScope(context);
                context.modDeclChain.pop();
                if(context.modDeclChain.length >= 1) {
                    context.typeFlow.checker.currentModDecl = context.modDeclChain[context.modDeclChain.length - 1];
                }
            } else {
                if(ast.nodeType == TypeScript.NodeType.ClassDeclaration) {
                    popAssignScope(context);
                } else {
                    if(ast.nodeType == TypeScript.NodeType.InterfaceDeclaration) {
                        popAssignScope(context);
                    } else {
                        if(ast.nodeType == TypeScript.NodeType.With) {
                            popAssignScope(context);
                        } else {
                            if(ast.nodeType == TypeScript.NodeType.FuncDecl) {
                                var funcDecl = ast;
                                if((!funcDecl.isConstructor || TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.ClassMethod)) && !funcDecl.isOverload) {
                                    popAssignScope(context);
                                }
                            } else {
                                if(ast.nodeType == TypeScript.NodeType.Catch) {
                                    var catchBlock = ast;
                                    if(catchBlock.param) {
                                        popAssignScope(context);
                                    }
                                } else {
                                    go = false;
                                }
                            }
                        }
                    }
                }
            }
        }
        walker.options.goChildren = go;
        return ast;
    }
    TypeScript.postAssignScopes = postAssignScopes;
})(TypeScript || (TypeScript = {}));
var TypeScript;
(function (TypeScript) {
    var TypeCollectionContext = (function () {
        function TypeCollectionContext(scopeChain, checker) {
            this.scopeChain = scopeChain;
            this.checker = checker;
            this.script = null;
        }
        return TypeCollectionContext;
    })();
    TypeScript.TypeCollectionContext = TypeCollectionContext;    
    var MemberScopeContext = (function () {
        function MemberScopeContext(flow, pos, matchFlag) {
            this.flow = flow;
            this.pos = pos;
            this.matchFlag = matchFlag;
            this.type = null;
            this.ast = null;
            this.options = new TypeScript.AstWalkOptions();
        }
        return MemberScopeContext;
    })();
    TypeScript.MemberScopeContext = MemberScopeContext;    
    var EnclosingScopeContext = (function () {
        function EnclosingScopeContext(logger, script, text, pos, isMemberCompletion) {
            this.logger = logger;
            this.script = script;
            this.text = text;
            this.pos = pos;
            this.isMemberCompletion = isMemberCompletion;
            this.scopeGetter = null;
            this.objectLiteralScopeGetter = null;
            this.scopeStartAST = null;
            this.skipNextFuncDeclForClass = false;
            this.deepestModuleDecl = null;
            this.enclosingClassDecl = null;
            this.enclosingObjectLit = null;
            this.publicsOnly = true;
            this.useFullAst = false;
        }
        EnclosingScopeContext.prototype.getScope = function () {
            return this.scopeGetter();
        };
        EnclosingScopeContext.prototype.getObjectLiteralScope = function () {
            return this.objectLiteralScopeGetter();
        };
        EnclosingScopeContext.prototype.getScopeAST = function () {
            return this.scopeStartAST;
        };
        EnclosingScopeContext.prototype.getScopePosition = function () {
            return this.scopeStartAST.minChar;
        };
        EnclosingScopeContext.prototype.getScriptFragmentStartAST = function () {
            return this.scopeStartAST;
        };
        EnclosingScopeContext.prototype.getScriptFragmentPosition = function () {
            return this.getScriptFragmentStartAST().minChar;
        };
        EnclosingScopeContext.prototype.getScriptFragment = function () {
            if(this.scriptFragment == null) {
                var ast = this.getScriptFragmentStartAST();
                var minChar = ast.minChar;
                var limChar = (this.isMemberCompletion ? this.pos : this.pos + 1);
                this.scriptFragment = TypeScript.quickParse(this.logger, ast, this.text, minChar, limChar, null).Script;
            }
            return this.scriptFragment;
        };
        return EnclosingScopeContext;
    })();
    TypeScript.EnclosingScopeContext = EnclosingScopeContext;    
    function preFindMemberScope(ast, parent, walker) {
        var memScope = walker.state;
        if(TypeScript.hasFlag(ast.flags, memScope.matchFlag) && ((memScope.pos < 0) || (memScope.pos == ast.limChar))) {
            memScope.ast = ast;
            if((ast.type == null) && (memScope.pos >= 0)) {
                memScope.flow.inScopeTypeCheck(ast, memScope.scope);
            }
            memScope.type = ast.type;
            memScope.options.stopWalk();
        }
        return ast;
    }
    TypeScript.preFindMemberScope = preFindMemberScope;
    function pushTypeCollectionScope(container, valueMembers, ambientValueMembers, enclosedTypes, ambientEnclosedTypes, context, thisType, classType, moduleDecl) {
        var builder = new TypeScript.SymbolScopeBuilder(valueMembers, ambientValueMembers, enclosedTypes, ambientEnclosedTypes, null, container);
        var chain = new TypeScript.ScopeChain(container, context.scopeChain, builder);
        chain.thisType = thisType;
        chain.classType = classType;
        chain.moduleDecl = moduleDecl;
        context.scopeChain = chain;
    }
    TypeScript.pushTypeCollectionScope = pushTypeCollectionScope;
    function popTypeCollectionScope(context) {
        context.scopeChain = context.scopeChain.previous;
    }
    TypeScript.popTypeCollectionScope = popTypeCollectionScope;
    function preFindEnclosingScope(ast, parent, walker) {
        var context = walker.state;
        var minChar = ast.minChar;
        var limChar = ast.limChar;
        if(ast.nodeType == TypeScript.NodeType.Script && context.pos > limChar) {
            limChar = context.pos;
        }
        if((minChar <= context.pos) && (limChar >= context.pos)) {
            switch(ast.nodeType) {
                case TypeScript.NodeType.Script: {
                    var script = ast;
                    context.scopeGetter = function () {
                        return script.bod === null ? null : script.bod.enclosingScope;
                    };
                    context.scopeStartAST = script;
                    break;

                }
                case TypeScript.NodeType.ClassDeclaration: {
                    context.scopeGetter = function () {
                        return (ast.type === null || ast.type.instanceType.containedScope === null) ? null : ast.type.instanceType.containedScope;
                    };
                    context.scopeStartAST = ast;
                    context.enclosingClassDecl = ast;
                    break;

                }
                case TypeScript.NodeType.ObjectLit: {
                    var objectLit = ast;
                    if(objectLit.targetType) {
                        context.scopeGetter = function () {
                            return objectLit.targetType.containedScope;
                        };
                        context.objectLiteralScopeGetter = function () {
                            return objectLit.targetType.memberScope;
                        };
                        context.enclosingObjectLit = objectLit;
                    }
                    break;

                }
                case TypeScript.NodeType.ModuleDeclaration: {
                    context.deepestModuleDecl = ast;
                    context.scopeGetter = function () {
                        return ast.type === null ? null : ast.type.containedScope;
                    };
                    context.scopeStartAST = ast;
                    break;

                }
                case TypeScript.NodeType.InterfaceDeclaration: {
                    context.scopeGetter = function () {
                        return (ast.type === null) ? null : ast.type.containedScope;
                    };
                    context.scopeStartAST = ast;
                    break;

                }
                case TypeScript.NodeType.FuncDecl: {
 {
                        var funcDecl = ast;
                        if(context.skipNextFuncDeclForClass) {
                            context.skipNextFuncDeclForClass = false;
                        } else {
                            context.scopeGetter = function () {
                                if(funcDecl.isConstructor && TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.ClassMethod)) {
                                    if(ast.type && ast.type.enclosingType) {
                                        return ast.type.enclosingType.constructorScope;
                                    }
                                }
                                if(funcDecl.scopeType) {
                                    return funcDecl.scopeType.containedScope;
                                }
                                if(funcDecl.type) {
                                    return funcDecl.type.containedScope;
                                }
                                return null;
                            };
                            context.scopeStartAST = ast;
                        }
                    }
                    break;

                }
            }
            walker.options.goChildren = true;
        } else {
            walker.options.goChildren = false;
        }
        return ast;
    }
    TypeScript.preFindEnclosingScope = preFindEnclosingScope;
    function findEnclosingScopeAt(logger, script, text, pos, isMemberCompletion) {
        var context = new EnclosingScopeContext(logger, script, text, pos, isMemberCompletion);
        TypeScript.getAstWalkerFactory().walk(script, preFindEnclosingScope, null, null, context);
        if(context.scopeStartAST === null) {
            return null;
        }
        return context;
    }
    TypeScript.findEnclosingScopeAt = findEnclosingScopeAt;
})(TypeScript || (TypeScript = {}));
var TypeScript;
(function (TypeScript) {
    var Signature = (function () {
        function Signature() {
            this.hasVariableArgList = false;
            this.parameters = null;
            this.declAST = null;
            this.typeCheckStatus = TypeScript.TypeCheckStatus.NotStarted;
            this.nonOptionalParameterCount = 0;
        }
        Signature.prototype.specializeType = function (pattern, replacement, checker) {
            var result = new Signature();
            if(this.hasVariableArgList) {
                result.hasVariableArgList = true;
            }
            result.returnType = new TypeScript.TypeLink();
            if(this.returnType.type) {
                result.returnType.type = this.returnType.type.specializeType(pattern, replacement, checker, false);
            } else {
                result.returnType.type = checker.anyType;
            }
            if(this.parameters) {
                result.parameters = [];
                for(var i = 0, len = this.parameters.length; i < len; i++) {
                    var oldSym = this.parameters[i];
                    var paramDef = new TypeScript.ValueLocation();
                    var paramSym = new TypeScript.ParameterSymbol(oldSym.name, oldSym.location, checker.locationInfo.unitIndex, paramDef);
                    paramSym.declAST = this.declAST;
                    paramDef.symbol = paramSym;
                    paramDef.typeLink = new TypeScript.TypeLink();
                    result.parameters[i] = paramSym;
                    var oldType = oldSym.getType();
                    if(oldType) {
                        paramDef.typeLink.type = oldType.specializeType(pattern, replacement, checker, false);
                        paramSym.declAST.type = paramDef.typeLink.type;
                    } else {
                        paramDef.typeLink.type = checker.anyType;
                    }
                }
            }
            result.nonOptionalParameterCount = this.nonOptionalParameterCount;
            result.declAST = this.declAST;
            return result;
        };
        Signature.prototype.toString = function () {
            return this.toStringHelper(false, false, null);
        };
        Signature.prototype.toStringHelper = function (shortform, brackets, scope) {
            return this.toStringHelperEx(shortform, brackets, scope).toString();
        };
        Signature.prototype.toStringHelperEx = function (shortform, brackets, scope, prefix) {
            if (typeof prefix === "undefined") { prefix = ""; }
            var builder = new TypeScript.MemberNameArray();
            if(brackets) {
                builder.prefix = prefix + "[";
            } else {
                builder.prefix = prefix + "(";
            }
            var paramLen = this.parameters.length;
            var len = this.hasVariableArgList ? paramLen - 1 : paramLen;
            for(var i = 0; i < len; i++) {
                builder.add(TypeScript.MemberName.create(this.parameters[i].name + (this.parameters[i].isOptional() ? "?" : "") + ": "));
                builder.add(this.parameters[i].getType().getScopedTypeNameEx(scope));
                if(i < paramLen - 1) {
                    builder.add(TypeScript.MemberName.create(", "));
                }
            }
            if(this.hasVariableArgList) {
                builder.add(TypeScript.MemberName.create("..." + this.parameters[i].name + ": "));
                builder.add(this.parameters[i].getType().getScopedTypeNameEx(scope));
            }
            if(shortform) {
                if(brackets) {
                    builder.add(TypeScript.MemberName.create("] => "));
                } else {
                    builder.add(TypeScript.MemberName.create(") => "));
                }
            } else {
                if(brackets) {
                    builder.add(TypeScript.MemberName.create("]: "));
                } else {
                    builder.add(TypeScript.MemberName.create("): "));
                }
            }
            if(this.returnType.type) {
                builder.add(this.returnType.type.getScopedTypeNameEx(scope));
            } else {
                builder.add(TypeScript.MemberName.create("any"));
            }
            return builder;
        };
        return Signature;
    })();
    TypeScript.Signature = Signature;    
    var SignatureGroup = (function () {
        function SignatureGroup() {
            this.signatures = [];
            this.hasImplementation = true;
            this.definitionSignature = null;
            this.hasBeenTypechecked = false;
            this.flags = TypeScript.SignatureFlags.None;
        }
        SignatureGroup.prototype.addSignature = function (signature) {
            if(this.signatures == null) {
                this.signatures = new Array();
            }
            this.signatures[this.signatures.length] = signature;
            if(signature.declAST && !signature.declAST.isOverload && !signature.declAST.isSignature() && !TypeScript.hasFlag(signature.declAST.fncFlags, TypeScript.FncFlags.Ambient) && TypeScript.hasFlag(signature.declAST.fncFlags, TypeScript.FncFlags.Definition)) {
                this.definitionSignature = signature;
            }
        };
        SignatureGroup.prototype.toString = function () {
            return this.signatures.toString();
        };
        SignatureGroup.prototype.toStrings = function (prefix, shortform, scope) {
            var result = [];
            var len = this.signatures.length;
            if(len > 1) {
                shortform = false;
            }
            for(var i = 0; i < len; i++) {
                if(len > 1 && this.signatures[i] == this.definitionSignature) {
                    continue;
                }
                if(this.flags & TypeScript.SignatureFlags.IsIndexer) {
                    result.push(this.signatures[i].toStringHelperEx(shortform, true, scope));
                } else {
                    result.push(this.signatures[i].toStringHelperEx(shortform, false, scope, prefix));
                }
            }
            return result;
        };
        SignatureGroup.prototype.specializeType = function (pattern, replacement, checker) {
            var result = new SignatureGroup();
            if(this.signatures) {
                for(var i = 0, len = this.signatures.length; i < len; i++) {
                    result.addSignature(this.signatures[i].specializeType(pattern, replacement, checker));
                }
            }
            return result;
        };
        SignatureGroup.prototype.verifySignatures = function (checker) {
            var len = 0;
            if(this.signatures && ((len = this.signatures.length) > 0)) {
                for(var i = 0; i < len; i++) {
                    for(var j = i + 1; j < len; j++) {
                        if(this.signatures[i].declAST && this.signatures[j].declAST && (!TypeScript.hasFlag(this.signatures[i].declAST.fncFlags, TypeScript.FncFlags.Definition) && !TypeScript.hasFlag(this.signatures[j].declAST.fncFlags, TypeScript.FncFlags.Definition)) && checker.signaturesAreIdentical(this.signatures[i], this.signatures[j])) {
                            checker.errorReporter.simpleError(this.signatures[i].declAST, (this.signatures[i].declAST && this.signatures[i].declAST.name) ? "Signature for '" + this.signatures[i].declAST.name.actualText + "' is duplicated" : "Signature is duplicated");
                        }
                    }
                    if(this.definitionSignature) {
                        if(!checker.signatureIsAssignableToTarget(this.definitionSignature, this.signatures[i])) {
                            checker.errorReporter.simpleError(this.signatures[i].declAST, "Overload signature is not compatible with function definition");
                        }
                    }
                }
            }
        };
        SignatureGroup.prototype.typeCheck = function (checker, ast, hasConstruct) {
            if(this.hasBeenTypechecked) {
                return;
            }
            this.hasBeenTypechecked = true;
            var len = 0;
            if(this.signatures && ((len = this.signatures.length) > 0)) {
                for(var i = 0; i < len; i++) {
                    if(!hasConstruct && !this.definitionSignature && this.signatures[i].declAST && this.signatures[i].declAST.isOverload && !TypeScript.hasFlag(this.signatures[i].declAST.fncFlags, TypeScript.FncFlags.Ambient)) {
                        checker.errorReporter.simpleError(this.signatures[i].declAST, "Overload declaration lacks definition");
                    }
                    if(this.signatures[i].declAST && this.signatures[i].declAST.isConstructor && this.signatures[i].declAST.classDecl && this.signatures[i].declAST.classDecl.type.symbol.typeCheckStatus == TypeScript.TypeCheckStatus.NotStarted) {
                        checker.typeFlow.typeCheck(this.signatures[i].declAST.classDecl);
                    }
                    checker.typeFlow.typeCheck(this.signatures[i].declAST);
                }
                this.verifySignatures(checker);
            }
        };
        return SignatureGroup;
    })();
    TypeScript.SignatureGroup = SignatureGroup;    
})(TypeScript || (TypeScript = {}));
var TypeScript;
(function (TypeScript) {
    (function (TypeCheckStatus) {
        TypeCheckStatus._map = [];
        TypeCheckStatus._map[0] = "NotStarted";
        TypeCheckStatus.NotStarted = 0;
        TypeCheckStatus._map[1] = "Started";
        TypeCheckStatus.Started = 1;
        TypeCheckStatus._map[2] = "Finished";
        TypeCheckStatus.Finished = 2;
    })(TypeScript.TypeCheckStatus || (TypeScript.TypeCheckStatus = {}));
    var TypeCheckStatus = TypeScript.TypeCheckStatus;
    function aLexicallyEnclosesB(a, b) {
        if(a.declAST && b && b.declAST && a.declAST.nodeType == TypeScript.NodeType.FuncDecl) {
            return a.declAST.minChar <= b.declAST.minChar && a.declAST.limChar >= b.declAST.limChar;
        } else {
            return false;
        }
    }
    TypeScript.aLexicallyEnclosesB = aLexicallyEnclosesB;
    function aEnclosesB(a, b) {
        while(a.container) {
            if(a == b || aLexicallyEnclosesB(a.container, b)) {
                return true;
            }
            a = a.container;
        }
        return false;
    }
    TypeScript.aEnclosesB = aEnclosesB;
    var Symbol = (function () {
        function Symbol(name, location, length, unitIndex) {
            this.name = name;
            this.location = location;
            this.length = length;
            this.unitIndex = unitIndex;
            this.bound = false;
            this.flags = TypeScript.SymbolFlags.None;
            this.isObjectLitField = false;
            this.declAST = null;
            this.declModule = null;
            this.passSymbolCreated = TypeScript.CompilerDiagnostics.analysisPass;
        }
        Symbol.prototype.instanceScope = function () {
            return null;
        };
        Symbol.prototype.isVariable = function () {
            return false;
        };
        Symbol.prototype.isMember = function () {
            return false;
        };
        Symbol.prototype.isInferenceSymbol = function () {
            return false;
        };
        Symbol.prototype.isWith = function () {
            return false;
        };
        Symbol.prototype.writeable = function () {
            return false;
        };
        Symbol.prototype.isType = function () {
            return false;
        };
        Symbol.prototype.getType = function () {
            return null;
        };
        Symbol.prototype.isAccessor = function () {
            return false;
        };
        Symbol.prototype.isInstanceProperty = function () {
            return TypeScript.hasFlag(this.flags, TypeScript.SymbolFlags.Property) && (!TypeScript.hasFlag(this.flags, TypeScript.SymbolFlags.ModuleMember));
        };
        Symbol.prototype.getTypeName = function (scope) {
            return this.getTypeNameEx(scope).toString();
        };
        Symbol.prototype.getTypeNameEx = function (scope) {
            return TypeScript.MemberName.create(this.toString());
        };
        Symbol.prototype.getOptionalNameString = function () {
            return TypeScript.hasFlag(this.flags, TypeScript.SymbolFlags.Optional) ? "?" : "";
        };
        Symbol.prototype.pathToRoot = function () {
            var path = new Array();
            var node = this;
            while(node && (node.name != TypeScript.globalId)) {
                path[path.length] = node;
                node = node.container;
            }
            return path;
        };
        Symbol.prototype.findCommonAncestorPath = function (b) {
            if(this.container == null) {
                return new Array();
            }
            var aPath = this.container.pathToRoot();
            var bPath;
            if(b) {
                bPath = b.pathToRoot();
            } else {
                bPath = new Array();
            }
            var commonNodeIndex = -1;
            for(var i = 0, aLen = aPath.length; i < aLen; i++) {
                var aNode = aPath[i];
                for(var j = 0, bLen = bPath.length; j < bLen; j++) {
                    var bNode = bPath[j];
                    if(aNode == bNode) {
                        commonNodeIndex = i;
                        break;
                    }
                }
                if(commonNodeIndex >= 0) {
                    break;
                }
            }
            if(commonNodeIndex >= 0) {
                return aPath.slice(0, commonNodeIndex);
            } else {
                return aPath;
            }
        };
        Symbol.prototype.getPrettyName = function (scopeSymbol) {
            return this.name;
        };
        Symbol.prototype.scopeRelativeName = function (scope) {
            if(scope == null) {
                return this.getPrettyName(null) + this.getOptionalNameString();
            }
            var lca = this.findCommonAncestorPath(scope.container);
            var builder = "";
            for(var i = 0, len = lca.length; i < len; i++) {
                var prettyName = lca[i].getPrettyName(i == len - 1 ? scope.container : lca[i + 1]);
                builder = prettyName + "." + builder;
            }
            builder += this.getPrettyName(len == 0 ? scope.container : lca[0]) + this.getOptionalNameString();
            return builder;
        };
        Symbol.prototype.fullName = function () {
            var builder = this.name;
            var ancestor = this.container;
            while(ancestor && (ancestor.name != TypeScript.globalId)) {
                builder = ancestor.name + "." + builder;
                ancestor = ancestor.container;
            }
            return builder;
        };
        Symbol.prototype.isExternallyVisible = function (checker) {
            if(this == checker.gloMod) {
                return true;
            }
            if(TypeScript.hasFlag(this.flags, TypeScript.SymbolFlags.Private)) {
                return false;
            }
            if(!TypeScript.hasFlag(this.flags, TypeScript.SymbolFlags.Exported)) {
                return this.container == checker.gloMod;
            }
            return this.container.isExternallyVisible(checker);
        };
        Symbol.prototype.visible = function (scope, checker) {
            if(checker == null || this.container == checker.gloMod) {
                return true;
            }
            if(TypeScript.hasFlag(this.flags, TypeScript.SymbolFlags.ModuleMember)) {
                if(TypeScript.hasFlag(this.flags, TypeScript.SymbolFlags.Exported)) {
                    if(!TypeScript.hasFlag(this.flags, TypeScript.SymbolFlags.Private)) {
                        return true;
                    } else {
                        return aEnclosesB(this, scope.container);
                    }
                } else {
                    return checker && (checker.currentModDecl == this.declModule) || (checker.currentModDecl && checker.currentModDecl.mod && checker.currentModDecl.mod.symbol && this.declModule && this.declModule.mod && this.declModule.mod.symbol && aEnclosesB(checker.currentModDecl.mod.symbol, this.declModule.mod.symbol));
                }
            } else {
                var isFunction = this.declAST && this.declAST.nodeType == TypeScript.NodeType.FuncDecl;
                var isMethod = isFunction && (this.declAST).isMethod();
                var isStaticFunction = isFunction && TypeScript.hasFlag((this.declAST).fncFlags, TypeScript.FncFlags.Static);
                var isPrivateMethod = isMethod && TypeScript.hasFlag((this.declAST).fncFlags, TypeScript.FncFlags.Private);
                var isAlias = this.isType() && (this).aliasLink;
                if(this.isMember() || isMethod || isStaticFunction || isAlias) {
                    if(TypeScript.hasFlag(this.flags, TypeScript.SymbolFlags.Private) || isPrivateMethod) {
                        if(scope.container == null && this.container != scope.container) {
                            return false;
                        } else {
                            return this.container == null ? true : aEnclosesB(scope.container, this.container);
                        }
                    } else {
                        return true;
                    }
                } else {
                    if(this.container) {
                        return aEnclosesB(this, scope.container);
                    } else {
                        return true;
                    }
                }
            }
        };
        Symbol.prototype.addRef = function (identifier) {
            if(!this.refs) {
                this.refs = [];
            }
            this.refs[this.refs.length] = identifier;
        };
        Symbol.prototype.toString = function () {
            if(this.name) {
                return this.name;
            } else {
                return "_anonymous";
            }
        };
        Symbol.prototype.print = function (outfile) {
            outfile.Write(this.toString());
        };
        Symbol.prototype.specializeType = function (pattern, replacement, checker) {
            throw new Error("please implement in derived class");
        };
        Symbol.prototype.setType = function (type) {
            throw new Error("please implement in derived class");
        };
        Symbol.prototype.kind = function () {
            throw new Error("please implement in derived class");
        };
        Symbol.prototype.getInterfaceDeclFromSymbol = function (checker) {
            if(this.declAST != null) {
                if(this.declAST.nodeType == TypeScript.NodeType.InterfaceDeclaration) {
                    return this.declAST;
                } else {
                    if(this.container != null && this.container != checker.gloMod && this.container.declAST.nodeType == TypeScript.NodeType.InterfaceDeclaration) {
                        return this.container.declAST;
                    }
                }
            }
            return null;
        };
        Symbol.prototype.getVarDeclFromSymbol = function () {
            if(this.declAST != null && this.declAST.nodeType == TypeScript.NodeType.VarDecl) {
                return this.declAST;
            }
            return null;
        };
        Symbol.prototype.getDocComments = function () {
            if(this.declAST != null) {
                return this.declAST.getDocComments();
            }
            return [];
        };
        Symbol.prototype.isStatic = function () {
            return TypeScript.hasFlag(this.flags, TypeScript.SymbolFlags.Static);
        };
        return Symbol;
    })();
    TypeScript.Symbol = Symbol;    
    var ValueLocation = (function () {
        function ValueLocation() { }
        return ValueLocation;
    })();
    TypeScript.ValueLocation = ValueLocation;    
    var InferenceSymbol = (function (_super) {
        __extends(InferenceSymbol, _super);
        function InferenceSymbol(name, location, length, unitIndex) {
                _super.call(this, name, location, length, unitIndex);
            this.typeCheckStatus = TypeCheckStatus.NotStarted;
        }
        InferenceSymbol.prototype.isInferenceSymbol = function () {
            return true;
        };
        InferenceSymbol.prototype.transferVarFlags = function (varFlags) {
            if(TypeScript.hasFlag(varFlags, TypeScript.VarFlags.Ambient)) {
                this.flags |= TypeScript.SymbolFlags.Ambient;
            }
            if(TypeScript.hasFlag(varFlags, TypeScript.VarFlags.Constant)) {
                this.flags |= TypeScript.SymbolFlags.Constant;
            }
            if(TypeScript.hasFlag(varFlags, TypeScript.VarFlags.Static)) {
                this.flags |= TypeScript.SymbolFlags.Static;
            }
            if(TypeScript.hasFlag(varFlags, TypeScript.VarFlags.Property)) {
                this.flags |= TypeScript.SymbolFlags.Property;
            }
            if(TypeScript.hasFlag(varFlags, TypeScript.VarFlags.Private)) {
                this.flags |= TypeScript.SymbolFlags.Private;
            }
            if(TypeScript.hasFlag(varFlags, TypeScript.VarFlags.Public)) {
                this.flags |= TypeScript.SymbolFlags.Public;
            }
            if(TypeScript.hasFlag(varFlags, TypeScript.VarFlags.Readonly)) {
                this.flags |= TypeScript.SymbolFlags.Readonly;
            }
            if(TypeScript.hasFlag(varFlags, TypeScript.VarFlags.Exported)) {
                this.flags |= TypeScript.SymbolFlags.Exported;
            }
        };
        return InferenceSymbol;
    })(Symbol);
    TypeScript.InferenceSymbol = InferenceSymbol;    
    var TypeSymbol = (function (_super) {
        __extends(TypeSymbol, _super);
        function TypeSymbol(locName, location, length, unitIndex, type) {
                _super.call(this, locName, location, length, unitIndex);
            this.type = type;
            this.expansions = [];
            this.expansionsDeclAST = [];
            this.isDynamic = false;
            this.isMethod = false;
            this.aliasLink = null;
            this.onlyReferencedAsTypeRef = TypeScript.optimizeModuleCodeGen;
            this.prettyName = this.name;
        }
        TypeSymbol.prototype.addLocation = function (loc) {
            if(this.additionalLocations == null) {
                this.additionalLocations = [];
            }
            this.additionalLocations[this.additionalLocations.length] = loc;
        };
        TypeSymbol.prototype.kind = function () {
            return TypeScript.SymbolKind.Type;
        };
        TypeSymbol.prototype.isType = function () {
            return true;
        };
        TypeSymbol.prototype.getType = function () {
            return this.type;
        };
        TypeSymbol.prototype.getTypeNameEx = function (scope) {
            return this.type.getMemberTypeNameEx(this.name ? this.name + this.getOptionalNameString() : "", false, false, scope);
        };
        TypeSymbol.prototype.instanceScope = function () {
            if(!(this.type.typeFlags & TypeScript.TypeFlags.IsClass) && this.type.isClass()) {
                return this.type.instanceType.constructorScope;
            } else {
                return this.type.containedScope;
            }
        };
        TypeSymbol.prototype.toString = function () {
            var result = this.type.getTypeName();
            if(this.name) {
                result = this.name + ":" + result;
            }
            return result;
        };
        TypeSymbol.prototype.isClass = function () {
            return this.instanceType != null;
        };
        TypeSymbol.prototype.isFunction = function () {
            return this.declAST != null && this.declAST.nodeType == TypeScript.NodeType.FuncDecl;
        };
        TypeSymbol.prototype.specializeType = function (pattern, replacement, checker) {
            if(this.type == pattern) {
                return replacement.symbol;
            } else {
                var replType = this.type.specializeType(pattern, replacement, checker, false);
                if(replType != this.type) {
                    var result = new TypeSymbol(this.name, -1, 0, -1, replType);
                    return result;
                } else {
                    return this;
                }
            }
        };
        TypeSymbol.prototype.getPrettyName = function (scopeSymbol) {
            if(!!scopeSymbol && TypeScript.isQuoted(this.prettyName) && this.type.isModuleType()) {
                var symbolPath = scopeSymbol.pathToRoot();
                var prettyName = this.getPrettyNameOfDynamicModule(symbolPath);
                if(prettyName != null) {
                    return prettyName.name;
                }
            }
            return this.prettyName;
        };
        TypeSymbol.prototype.getPrettyNameOfDynamicModule = function (scopeSymbolPath) {
            var scopeSymbolPathLength = scopeSymbolPath.length;
            var externalSymbol = null;
            if(scopeSymbolPath.length > 0 && scopeSymbolPath[scopeSymbolPathLength - 1].getType().isModuleType() && (scopeSymbolPath[scopeSymbolPathLength - 1]).isDynamic) {
                if(scopeSymbolPathLength > 1 && scopeSymbolPath[scopeSymbolPathLength - 2].getType().isModuleType() && (scopeSymbolPath[scopeSymbolPathLength - 2]).isDynamic) {
                    var moduleType = scopeSymbolPath[scopeSymbolPathLength - 2].getType();
                    externalSymbol = moduleType.findDynamicModuleName(this.type);
                }
                if(externalSymbol == null) {
                    var moduleType = scopeSymbolPath[scopeSymbolPathLength - 1].getType();
                    externalSymbol = moduleType.findDynamicModuleName(this.type);
                }
            }
            return externalSymbol;
        };
        TypeSymbol.prototype.getDocComments = function () {
            var comments = [];
            if(this.declAST != null) {
                comments = comments.concat(this.declAST.getDocComments());
            }
            for(var i = 0; i < this.expansionsDeclAST.length; i++) {
                comments = comments.concat(this.expansionsDeclAST[i].getDocComments());
            }
            return comments;
        };
        return TypeSymbol;
    })(InferenceSymbol);
    TypeScript.TypeSymbol = TypeSymbol;    
    var WithSymbol = (function (_super) {
        __extends(WithSymbol, _super);
        function WithSymbol(location, unitIndex, withType) {
                _super.call(this, "with", location, 4, unitIndex, withType);
        }
        WithSymbol.prototype.isWith = function () {
            return true;
        };
        return WithSymbol;
    })(TypeSymbol);
    TypeScript.WithSymbol = WithSymbol;    
    var FieldSymbol = (function (_super) {
        __extends(FieldSymbol, _super);
        function FieldSymbol(name, location, unitIndex, canWrite, field) {
                _super.call(this, name, location, name.length, unitIndex);
            this.canWrite = canWrite;
            this.field = field;
            this.getter = null;
            this.setter = null;
            this.hasBeenEmitted = false;
            this.name = name;
            this.location = location;
        }
        FieldSymbol.prototype.kind = function () {
            return TypeScript.SymbolKind.Field;
        };
        FieldSymbol.prototype.writeable = function () {
            return this.isAccessor() ? this.setter != null : this.canWrite;
        };
        FieldSymbol.prototype.getType = function () {
            return this.field.typeLink.type;
        };
        FieldSymbol.prototype.getTypeNameEx = function (scope) {
            return TypeScript.MemberName.create(this.field.typeLink.type.getScopedTypeNameEx(scope), this.name + this.getOptionalNameString() + ": ", "");
        };
        FieldSymbol.prototype.isMember = function () {
            return true;
        };
        FieldSymbol.prototype.setType = function (type) {
            this.field.typeLink.type = type;
        };
        FieldSymbol.prototype.isAccessor = function () {
            return this.getter != null || this.setter != null;
        };
        FieldSymbol.prototype.isVariable = function () {
            return true;
        };
        FieldSymbol.prototype.toString = function () {
            return this.getTypeNameEx(null).toString();
        };
        FieldSymbol.prototype.specializeType = function (pattern, replacement, checker) {
            var rType = this.field.typeLink.type.specializeType(pattern, replacement, checker, false);
            if(rType != this.field.typeLink.type) {
                var fieldDef = new ValueLocation();
                var result = new FieldSymbol(this.name, 0, checker.locationInfo.unitIndex, this.canWrite, fieldDef);
                result.flags = this.flags;
                fieldDef.symbol = result;
                fieldDef.typeLink = new TypeScript.TypeLink();
                result.setType(rType);
                result.typeCheckStatus = TypeCheckStatus.Finished;
                return result;
            } else {
                return this;
            }
        };
        FieldSymbol.prototype.getDocComments = function () {
            if(this.getter != null || this.setter != null) {
                var comments = [];
                if(this.getter != null) {
                    comments = comments.concat(this.getter.getDocComments());
                }
                if(this.setter != null) {
                    comments = comments.concat(this.setter.getDocComments());
                }
                return comments;
            } else {
                if(this.declAST != null) {
                    return this.declAST.getDocComments();
                }
            }
            return [];
        };
        return FieldSymbol;
    })(InferenceSymbol);
    TypeScript.FieldSymbol = FieldSymbol;    
    var ParameterSymbol = (function (_super) {
        __extends(ParameterSymbol, _super);
        function ParameterSymbol(name, location, unitIndex, parameter) {
                _super.call(this, name, location, name.length, unitIndex);
            this.parameter = parameter;
            this.paramDocComment = null;
            this.funcDecl = null;
            this.argsOffset = (-1);
            this.name = name;
            this.location = location;
        }
        ParameterSymbol.prototype.kind = function () {
            return TypeScript.SymbolKind.Parameter;
        };
        ParameterSymbol.prototype.writeable = function () {
            return true;
        };
        ParameterSymbol.prototype.getType = function () {
            return this.parameter.typeLink.type;
        };
        ParameterSymbol.prototype.setType = function (type) {
            this.parameter.typeLink.type = type;
        };
        ParameterSymbol.prototype.isVariable = function () {
            return true;
        };
        ParameterSymbol.prototype.isOptional = function () {
            if(this.parameter && this.parameter.symbol && this.parameter.symbol.declAST) {
                return (this.parameter.symbol.declAST).isOptional;
            } else {
                return false;
            }
        };
        ParameterSymbol.prototype.getTypeNameEx = function (scope) {
            return TypeScript.MemberName.create(this.getType().getScopedTypeNameEx(scope), this.name + (this.isOptional() ? "?" : "") + ": ", "");
        };
        ParameterSymbol.prototype.toString = function () {
            return this.getTypeNameEx(null).toString();
        };
        ParameterSymbol.prototype.specializeType = function (pattern, replacement, checker) {
            var rType = this.parameter.typeLink.type.specializeType(pattern, replacement, checker, false);
            if(this.parameter.typeLink.type != rType) {
                var paramDef = new ValueLocation();
                var result = new ParameterSymbol(this.name, 0, checker.locationInfo.unitIndex, paramDef);
                paramDef.symbol = result;
                result.setType(rType);
                return result;
            } else {
                return this;
            }
        };
        ParameterSymbol.prototype.getParameterDocComments = function () {
            if(!this.paramDocComment) {
                var parameterComments = [];
                if(this.funcDecl) {
                    var fncDocComments = this.funcDecl.getDocComments();
                    var paramComment = TypeScript.Comment.getParameterDocCommentText(this.name, fncDocComments);
                    if(paramComment != "") {
                        parameterComments.push(paramComment);
                    }
                }
                var docComments = TypeScript.Comment.getDocCommentText(this.getDocComments());
                if(docComments != "") {
                    parameterComments.push(docComments);
                }
                this.paramDocComment = parameterComments.join("\n");
            }
            return this.paramDocComment;
        };
        return ParameterSymbol;
    })(InferenceSymbol);
    TypeScript.ParameterSymbol = ParameterSymbol;    
    var VariableSymbol = (function (_super) {
        __extends(VariableSymbol, _super);
        function VariableSymbol(name, location, unitIndex, variable) {
                _super.call(this, name, location, name.length, unitIndex);
            this.variable = variable;
        }
        VariableSymbol.prototype.kind = function () {
            return TypeScript.SymbolKind.Variable;
        };
        VariableSymbol.prototype.writeable = function () {
            return true;
        };
        VariableSymbol.prototype.getType = function () {
            return this.variable.typeLink.type;
        };
        VariableSymbol.prototype.getTypeNameEx = function (scope) {
            return TypeScript.MemberName.create(this.getType().getScopedTypeNameEx(scope), this.name + ": ", "");
        };
        VariableSymbol.prototype.setType = function (type) {
            this.variable.typeLink.type = type;
        };
        VariableSymbol.prototype.isVariable = function () {
            return true;
        };
        return VariableSymbol;
    })(InferenceSymbol);
    TypeScript.VariableSymbol = VariableSymbol;    
})(TypeScript || (TypeScript = {}));
var TypeScript;
(function (TypeScript) {
    var ScopedMembers = (function () {
        function ScopedMembers(dualMembers) {
            this.dualMembers = dualMembers;
            this.allMembers = this.dualMembers;
            this.publicMembers = this.dualMembers.primaryTable;
            this.privateMembers = this.dualMembers.secondaryTable;
        }
        ScopedMembers.prototype.addPublicMember = function (key, data) {
            return this.dualMembers.primaryTable.add(key, data);
        };
        ScopedMembers.prototype.addPrivateMember = function (key, data) {
            return this.dualMembers.secondaryTable.add(key, data);
        };
        return ScopedMembers;
    })();
    TypeScript.ScopedMembers = ScopedMembers;    
    (function (SymbolKind) {
        SymbolKind._map = [];
        SymbolKind._map[0] = "None";
        SymbolKind.None = 0;
        SymbolKind._map[1] = "Type";
        SymbolKind.Type = 1;
        SymbolKind._map[2] = "Field";
        SymbolKind.Field = 2;
        SymbolKind._map[3] = "Parameter";
        SymbolKind.Parameter = 3;
        SymbolKind._map[4] = "Variable";
        SymbolKind.Variable = 4;
    })(TypeScript.SymbolKind || (TypeScript.SymbolKind = {}));
    var SymbolKind = TypeScript.SymbolKind;
    var SymbolScope = (function () {
        function SymbolScope(container) {
            this.container = container;
        }
        SymbolScope.prototype.printLabel = function () {
            return "base";
        };
        SymbolScope.prototype.getAllSymbolNames = function (members) {
            return [
                "please", 
                "implement", 
                "in", 
                "derived", 
                "classes"
            ];
        };
        SymbolScope.prototype.getAllTypeSymbolNames = function (members) {
            return [
                "please", 
                "implement", 
                "in", 
                "derived", 
                "classes"
            ];
        };
        SymbolScope.prototype.getAllValueSymbolNames = function (members) {
            return [
                "please", 
                "implement", 
                "in", 
                "derived", 
                "classes"
            ];
        };
        SymbolScope.prototype.search = function (filter, name, publicOnly, typespace) {
            return null;
        };
        SymbolScope.prototype.findLocal = function (name, publicOnly, typespace) {
            return null;
        };
        SymbolScope.prototype.find = function (name, publicOnly, typespace) {
            return null;
        };
        SymbolScope.prototype.findImplementation = function (name, publicOnly, typespace) {
            return null;
        };
        SymbolScope.prototype.findAmbient = function (name, publicOnly, typespace) {
            return null;
        };
        SymbolScope.prototype.print = function (outfile) {
            if(this.container) {
                outfile.WriteLine(this.printLabel() + " scope with container: " + this.container.name + "...");
            } else {
                outfile.WriteLine(this.printLabel() + " scope...");
            }
        };
        SymbolScope.prototype.enter = function (container, ast, symbol, errorReporter, publicOnly, typespace, ambient) {
            throw new Error("please implement in derived class");
        };
        SymbolScope.prototype.getTable = function () {
            throw new Error("please implement in derived class");
        };
        return SymbolScope;
    })();
    TypeScript.SymbolScope = SymbolScope;    
    function symbolCanBeUsed(sym, publicOnly) {
        return publicOnly ? !(TypeScript.hasFlag(sym.flags, TypeScript.SymbolFlags.Private) || (sym.declAST && sym.declAST.nodeType == TypeScript.NodeType.FuncDecl && TypeScript.hasFlag((sym.declAST).fncFlags, TypeScript.FncFlags.Private))) : true;
    }
    var SymbolAggregateScope = (function (_super) {
        __extends(SymbolAggregateScope, _super);
        function SymbolAggregateScope(container) {
                _super.call(this, container);
            this.valueCache = null;
            this.valueImplCache = null;
            this.valueAmbientCache = null;
            this.typeCache = null;
            this.typeImplCache = null;
            this.typeAmbientCache = null;
            this.parents = null;
            this.container = container;
        }
        SymbolAggregateScope.prototype.printLabel = function () {
            return "agg";
        };
        SymbolAggregateScope.prototype.search = function (filter, name, publicOnly, typespace) {
            if(this.parents) {
                for(var i = 0; i < this.parents.length; i++) {
                    var sym = this.parents[i].search(filter, name, publicOnly, typespace);
                    if(sym) {
                        if(filter.update(sym)) {
                            return sym;
                        }
                    }
                }
            }
            return filter.result;
        };
        SymbolAggregateScope.prototype.getAllSymbolNames = function (members) {
            var result = [];
            if(this.parents) {
                for(var i = 0; i < this.parents.length; i++) {
                    var parentResult = this.parents[i].getAllSymbolNames(members);
                    if(parentResult) {
                        result = result.concat(parentResult);
                    }
                }
            }
            return result;
        };
        SymbolAggregateScope.prototype.getAllTypeSymbolNames = function (members) {
            var result = [];
            if(this.parents) {
                for(var i = 0; i < this.parents.length; i++) {
                    var parentResult = this.parents[i].getAllTypeSymbolNames(members);
                    if(parentResult) {
                        result = result.concat(parentResult);
                    }
                }
            }
            return result;
        };
        SymbolAggregateScope.prototype.getAllValueSymbolNames = function (members) {
            var result = [];
            if(this.parents) {
                for(var i = 0; i < this.parents.length; i++) {
                    var parentResult = this.parents[i].getAllValueSymbolNames(members);
                    if(parentResult) {
                        result = result.concat(parentResult);
                    }
                }
            }
            return result;
        };
        SymbolAggregateScope.prototype.print = function (outfile) {
            _super.prototype.print.call(this, outfile);
            if(this.parents) {
                for(var i = 0; i < this.parents.length; i++) {
                    this.parents[i].print(outfile);
                }
            }
        };
        SymbolAggregateScope.prototype.findImplementation = function (name, publicOnly, typespace) {
            var sym = null;
            var i = 0;
            var implCache = this.valueImplCache;
            if(typespace) {
                implCache = this.typeImplCache;
            }
            if(implCache && ((sym = implCache.lookup(name)) != null) && (publicOnly ? !(TypeScript.hasFlag(sym.flags, TypeScript.SymbolFlags.Private) || (sym.declAST && sym.declAST.nodeType == TypeScript.NodeType.FuncDecl && TypeScript.hasFlag((sym.declAST).fncFlags, TypeScript.FncFlags.Private))) : true)) {
                return sym;
            }
            if(this.parents) {
                for(i = 0; i < this.parents.length; i++) {
                    sym = this.parents[i].findImplementation(name, publicOnly, typespace);
                    if(sym) {
                        break;
                    }
                }
            }
            if(implCache) {
                if(typespace) {
                    this.typeImplCache = new TypeScript.StringHashTable();
                    implCache = this.typeImplCache;
                } else {
                    this.valueImplCache = new TypeScript.StringHashTable();
                    implCache = this.valueImplCache;
                }
            }
            implCache.add(name, sym);
            return sym;
        };
        SymbolAggregateScope.prototype.find = function (name, publicOnly, typespace) {
            var sym = null;
            var i = 0;
            var cache = this.valueCache;
            if(typespace) {
                cache = this.typeCache;
            }
            if(cache && ((sym = cache.lookup(name)) != null) && (publicOnly ? !(TypeScript.hasFlag(sym.flags, TypeScript.SymbolFlags.Private) || (sym.declAST && sym.declAST.nodeType == TypeScript.NodeType.FuncDecl && TypeScript.hasFlag((sym.declAST).fncFlags, TypeScript.FncFlags.Private))) : true)) {
                return sym;
            }
            if(this.parents) {
                for(i = 0; i < this.parents.length; i++) {
                    sym = this.parents[i].find(name, publicOnly, typespace);
                    if(sym) {
                        break;
                    }
                }
            }
            if(cache == null) {
                if(typespace) {
                    this.typeCache = new TypeScript.StringHashTable();
                    cache = this.typeCache;
                } else {
                    this.valueCache = new TypeScript.StringHashTable();
                    cache = this.valueCache;
                }
            }
            cache.add(name, sym);
            return sym;
        };
        SymbolAggregateScope.prototype.findAmbient = function (name, publicOnly, typespace) {
            var sym = null;
            var i = 0;
            var cache = this.valueAmbientCache;
            if(typespace) {
                cache = this.typeAmbientCache;
            }
            if(cache && ((sym = cache.lookup(name)) != null)) {
                return sym;
            }
            if(this.parents) {
                for(i = 0; i < this.parents.length; i++) {
                    sym = this.parents[i].findAmbient(name, publicOnly, typespace);
                    if(sym) {
                        break;
                    }
                }
            }
            if(cache == null) {
                if(typespace) {
                    this.typeAmbientCache = new TypeScript.StringHashTable();
                    cache = this.typeAmbientCache;
                } else {
                    this.valueAmbientCache = new TypeScript.StringHashTable();
                    cache = this.valueAmbientCache;
                }
            }
            cache.add(name, sym);
            return sym;
        };
        SymbolAggregateScope.prototype.addParentScope = function (parent) {
            if(this.parents == null) {
                this.parents = new Array();
            }
            this.parents[this.parents.length] = parent;
        };
        return SymbolAggregateScope;
    })(SymbolScope);
    TypeScript.SymbolAggregateScope = SymbolAggregateScope;    
    var SymbolTableScope = (function (_super) {
        __extends(SymbolTableScope, _super);
        function SymbolTableScope(valueMembers, ambientValueMembers, enclosedTypes, ambientEnclosedTypes, container) {
                _super.call(this, container);
            this.valueMembers = valueMembers;
            this.ambientValueMembers = ambientValueMembers;
            this.enclosedTypes = enclosedTypes;
            this.ambientEnclosedTypes = ambientEnclosedTypes;
            this.container = container;
        }
        SymbolTableScope.prototype.printLabel = function () {
            return "table";
        };
        SymbolTableScope.prototype.getAllSymbolNames = function (members) {
            var result = this.getAllTypeSymbolNames(members);
            return result.concat(this.getAllValueSymbolNames(members));
        };
        SymbolTableScope.prototype.getAllTypeSymbolNames = function (members) {
            var result = [];
            if(this.ambientEnclosedTypes) {
                result = result.concat(this.ambientEnclosedTypes.allMembers.getAllKeys());
            }
            if(this.enclosedTypes) {
                result = result.concat(this.enclosedTypes.allMembers.getAllKeys());
            }
            return result;
        };
        SymbolTableScope.prototype.getAllValueSymbolNames = function (members) {
            var result = [];
            if(this.ambientValueMembers) {
                result = result.concat(this.ambientValueMembers.allMembers.getAllKeys());
            }
            if(this.valueMembers) {
                result = result.concat(this.valueMembers.allMembers.getAllKeys());
            }
            return result;
        };
        SymbolTableScope.prototype.search = function (filter, name, publicOnly, typespace) {
            var sym = this.find(name, publicOnly, typespace);
            filter.update(sym);
            return filter.result;
        };
        SymbolTableScope.prototype.find = function (name, publicOnly, typespace) {
            var table = null;
            var ambientTable = null;
            if(typespace) {
                table = (this.enclosedTypes == null) ? null : publicOnly ? this.enclosedTypes.publicMembers : this.enclosedTypes.allMembers;
                ambientTable = (this.ambientEnclosedTypes == null) ? null : publicOnly ? this.ambientEnclosedTypes.publicMembers : this.ambientEnclosedTypes.allMembers;
            } else {
                table = (this.valueMembers == null) ? null : publicOnly ? this.valueMembers.publicMembers : this.valueMembers.allMembers;
                ambientTable = (this.ambientValueMembers == null) ? null : publicOnly ? this.ambientValueMembers.publicMembers : this.ambientValueMembers.allMembers;
            }
            if(ambientTable) {
                var s = ambientTable.lookup(name);
                if(s) {
                    return s;
                }
            }
            if(table) {
                var s = table.lookup(name);
                if(s) {
                    return s;
                }
            }
            return null;
        };
        SymbolTableScope.prototype.findAmbient = function (name, publicOnly, typespace) {
            var ambientTable = (this.ambientValueMembers == null) ? null : publicOnly ? this.ambientValueMembers.publicMembers : this.ambientValueMembers.allMembers;
            if(typespace) {
                ambientTable = (this.ambientEnclosedTypes == null) ? null : publicOnly ? this.ambientEnclosedTypes.publicMembers : this.ambientEnclosedTypes.allMembers;
            }
            if(ambientTable) {
                var s = ambientTable.lookup(name);
                if(s) {
                    return s;
                }
            }
            return null;
        };
        SymbolTableScope.prototype.print = function (outfile) {
            _super.prototype.print.call(this, outfile);
            if(this.ambientValueMembers) {
                this.ambientValueMembers.allMembers.map(function (key, sym, context) {
                    outfile.WriteLine("  " + key);
                }, null);
            }
            if(this.valueMembers) {
                this.valueMembers.allMembers.map(function (key, sym, context) {
                    outfile.WriteLine("  " + key);
                }, null);
            }
            if(this.ambientEnclosedTypes) {
                this.ambientEnclosedTypes.allMembers.map(function (key, sym, context) {
                    outfile.WriteLine("  " + key);
                }, null);
            }
            if(this.enclosedTypes) {
                this.enclosedTypes.allMembers.map(function (key, sym, context) {
                    outfile.WriteLine("  " + key);
                }, null);
            }
        };
        SymbolTableScope.prototype.findImplementation = function (name, publicOnly, typespace) {
            var sym = this.find(name, publicOnly, typespace);
            if(sym) {
                if(sym.kind() == SymbolKind.Type) {
                    var typeSym = sym;
                    if(!typeSym.type.hasImplementation()) {
                        sym = null;
                    }
                } else {
                    if(sym.container) {
                        if(sym.container.kind() == SymbolKind.Type) {
                            var ctypeSym = sym.container;
                            if(!ctypeSym.type.hasImplementation()) {
                                sym = null;
                            }
                        }
                    }
                }
            }
            return sym;
        };
        SymbolTableScope.prototype.getTable = function () {
            return this.valueMembers.publicMembers;
        };
        return SymbolTableScope;
    })(SymbolScope);
    TypeScript.SymbolTableScope = SymbolTableScope;    
    var SymbolScopeBuilder = (function (_super) {
        __extends(SymbolScopeBuilder, _super);
        function SymbolScopeBuilder(valueMembers, ambientValueMembers, enclosedTypes, ambientEnclosedTypes, parent, container) {
                _super.call(this, container);
            this.valueMembers = valueMembers;
            this.ambientValueMembers = ambientValueMembers;
            this.enclosedTypes = enclosedTypes;
            this.ambientEnclosedTypes = ambientEnclosedTypes;
            this.parent = parent;
            this.container = container;
        }
        SymbolScopeBuilder.prototype.printLabel = function () {
            return "builder";
        };
        SymbolScopeBuilder.prototype.getAllSymbolNames = function (members) {
            var result = this.getAllTypeSymbolNames(members);
            return result.concat(this.getAllValueSymbolNames(members));
        };
        SymbolScopeBuilder.prototype.getAllTypeSymbolNames = function (members) {
            var result = [];
            if(this.ambientEnclosedTypes) {
                result = result.concat(this.ambientEnclosedTypes.allMembers.getAllKeys());
            }
            if(this.enclosedTypes) {
                result = result.concat(this.enclosedTypes.allMembers.getAllKeys());
            }
            if(!members && this.parent) {
                var parentResult = this.parent.getAllTypeSymbolNames(members);
                if(parentResult) {
                    result = result.concat(parentResult);
                }
            }
            return result;
        };
        SymbolScopeBuilder.prototype.getAllValueSymbolNames = function (members) {
            var result = [];
            if(this.ambientValueMembers) {
                result = result.concat(this.ambientValueMembers.allMembers.getAllKeys());
            }
            if(this.valueMembers) {
                result = result.concat(this.valueMembers.allMembers.getAllKeys());
            }
            if(!members && this.parent) {
                var parentResult = this.parent.getAllValueSymbolNames(members);
                if(parentResult) {
                    result = result.concat(parentResult);
                }
            }
            return result;
        };
        SymbolScopeBuilder.prototype.search = function (filter, name, publicOnly, typespace) {
            var sym = null;
            var table = (this.valueMembers == null) ? null : publicOnly ? this.valueMembers.publicMembers : this.valueMembers.allMembers;
            var ambientTable = (this.ambientValueMembers == null) ? null : publicOnly ? this.ambientValueMembers.publicMembers : this.ambientValueMembers.allMembers;
            if(typespace) {
                table = (this.enclosedTypes == null) ? null : publicOnly ? this.enclosedTypes.publicMembers : this.enclosedTypes.allMembers;
                ambientTable = (this.ambientEnclosedTypes == null) ? null : publicOnly ? this.ambientEnclosedTypes.publicMembers : this.ambientEnclosedTypes.allMembers;
            }
            if(ambientTable) {
                if((sym = ambientTable.lookup(name)) != null) {
                    if(filter.update(sym)) {
                        return sym;
                    }
                }
            }
            if(table) {
                if((sym = table.lookup(name)) != null) {
                    if(filter.update(sym)) {
                        return sym;
                    }
                }
            }
            if(this.parent) {
                sym = this.parent.search(filter, name, publicOnly, typespace);
                if(sym) {
                    if(filter.update(sym)) {
                        return sym;
                    }
                }
            }
            return filter.result;
        };
        SymbolScopeBuilder.prototype.print = function (outfile) {
            _super.prototype.print.call(this, outfile);
            if(this.ambientValueMembers) {
                this.ambientValueMembers.allMembers.map(function (key, s, context) {
                    var sym = s;
                    outfile.WriteLine("  " + key);
                }, null);
            }
            if(this.valueMembers) {
                this.valueMembers.allMembers.map(function (key, s, context) {
                    var sym = s;
                    outfile.WriteLine("  " + key);
                }, null);
            }
            if(this.ambientEnclosedTypes) {
                this.ambientEnclosedTypes.allMembers.map(function (key, s, context) {
                    var sym = s;
                    outfile.WriteLine("  " + key);
                }, null);
            }
            if(this.enclosedTypes) {
                this.enclosedTypes.allMembers.map(function (key, s, context) {
                    var sym = s;
                    outfile.WriteLine("  " + key);
                }, null);
            }
            if(this.parent) {
                this.parent.print(outfile);
            }
        };
        SymbolScopeBuilder.prototype.find = function (name, publicOnly, typespace) {
            var sym = null;
            var table = (this.valueMembers == null) ? null : publicOnly ? this.valueMembers.publicMembers : this.valueMembers.allMembers;
            var ambientTable = (this.ambientValueMembers == null) ? null : publicOnly ? this.ambientValueMembers.publicMembers : this.ambientValueMembers.allMembers;
            if(typespace) {
                table = (this.enclosedTypes == null) ? null : publicOnly ? this.enclosedTypes.publicMembers : this.enclosedTypes.allMembers;
                ambientTable = (this.ambientEnclosedTypes == null) ? null : publicOnly ? this.ambientEnclosedTypes.publicMembers : this.ambientEnclosedTypes.allMembers;
            }
            if(ambientTable && ((sym = ambientTable.lookup(name)) != null)) {
                return sym;
            }
            if(table && ((sym = table.lookup(name)) != null)) {
                return sym;
            }
            if(this.parent) {
                return this.parent.find(name, publicOnly, typespace);
            }
            return null;
        };
        SymbolScopeBuilder.prototype.findAmbient = function (name, publicOnly, typespace) {
            var sym = null;
            var ambientTable = (this.ambientValueMembers == null) ? null : publicOnly ? this.ambientValueMembers.publicMembers : this.ambientValueMembers.allMembers;
            if(typespace) {
                ambientTable = (this.ambientEnclosedTypes == null) ? null : publicOnly ? this.ambientEnclosedTypes.publicMembers : this.ambientEnclosedTypes.allMembers;
            }
            if(ambientTable && ((sym = ambientTable.lookup(name)) != null)) {
                return sym;
            }
            if(this.parent) {
                return this.parent.findAmbient(name, publicOnly, typespace);
            }
            return null;
        };
        SymbolScopeBuilder.prototype.findLocal = function (name, publicOnly, typespace) {
            var sym = null;
            var table = (this.valueMembers == null) ? null : publicOnly ? this.valueMembers.publicMembers : this.valueMembers.allMembers;
            var ambientTable = (this.ambientValueMembers == null) ? null : publicOnly ? this.ambientValueMembers.publicMembers : this.ambientValueMembers.allMembers;
            if(typespace) {
                table = (this.enclosedTypes == null) ? null : publicOnly ? this.enclosedTypes.publicMembers : this.enclosedTypes.allMembers;
                ambientTable = (this.ambientEnclosedTypes == null) ? null : publicOnly ? this.ambientEnclosedTypes.publicMembers : this.ambientEnclosedTypes.allMembers;
            }
            if(table) {
                if((sym = table.lookup(name)) != null) {
                    if(sym) {
                        return sym;
                    }
                }
            }
            if(ambientTable) {
                if((sym = ambientTable.lookup(name)) != null) {
                    if(sym) {
                        return sym;
                    }
                }
            }
            return null;
        };
        SymbolScopeBuilder.prototype.enter = function (container, ast, symbol, errorReporter, insertAsPublic, typespace, ambient) {
            var table = null;
            if(ambient) {
                if(typespace) {
                    table = (this.ambientEnclosedTypes == null) ? null : insertAsPublic ? this.ambientEnclosedTypes.publicMembers : this.ambientEnclosedTypes.privateMembers;
                } else {
                    table = (this.ambientValueMembers == null) ? null : insertAsPublic ? this.ambientValueMembers.publicMembers : this.ambientValueMembers.privateMembers;
                }
            } else {
                if(typespace) {
                    table = (this.enclosedTypes == null) ? null : insertAsPublic ? this.enclosedTypes.publicMembers : this.enclosedTypes.privateMembers;
                } else {
                    table = (this.valueMembers == null) ? null : insertAsPublic ? this.valueMembers.publicMembers : this.valueMembers.privateMembers;
                }
            }
            if(table) {
                if(!table.add(symbol.name, symbol)) {
                    errorReporter.duplicateIdentifier(ast, symbol.name);
                }
            } else {
                TypeScript.CompilerDiagnostics.Alert("YYYYY");
            }
            symbol.container = container;
        };
        SymbolScopeBuilder.prototype.getTable = function () {
            return this.valueMembers.allMembers;
        };
        return SymbolScopeBuilder;
    })(SymbolScope);
    TypeScript.SymbolScopeBuilder = SymbolScopeBuilder;    
    var FilteredSymbolScope = (function (_super) {
        __extends(FilteredSymbolScope, _super);
        function FilteredSymbolScope(scope, container, filter) {
                _super.call(this, container);
            this.scope = scope;
            this.filter = filter;
        }
        FilteredSymbolScope.prototype.print = function (outfile) {
            this.scope.print(outfile);
        };
        FilteredSymbolScope.prototype.find = function (name, publicOnly, typespace) {
            this.filter.reset();
            return this.scope.search(this.filter, name, publicOnly, typespace);
        };
        FilteredSymbolScope.prototype.findLocal = function (name, publicOnly, typespace) {
            return this.scope.findLocal(name, publicOnly, typespace);
        };
        return FilteredSymbolScope;
    })(SymbolScope);
    TypeScript.FilteredSymbolScope = FilteredSymbolScope;    
    var FilteredSymbolScopeBuilder = (function (_super) {
        __extends(FilteredSymbolScopeBuilder, _super);
        function FilteredSymbolScopeBuilder(valueMembers, parent, container, filter) {
                _super.call(this, valueMembers, null, null, null, parent, container);
            this.filter = filter;
        }
        FilteredSymbolScopeBuilder.prototype.findLocal = function (name, publicOnly, typespace) {
            var sym = _super.prototype.findLocal.call(this, name, publicOnly, typespace);
            if(sym) {
                if(!this.filter(sym)) {
                    return null;
                }
            }
            return sym;
        };
        FilteredSymbolScopeBuilder.prototype.search = function (filter, name, publicOnly, typespace) {
            throw new Error("please implement");
        };
        FilteredSymbolScopeBuilder.prototype.find = function (name, publicOnly, typespace) {
            var sym = _super.prototype.findLocal.call(this, name, publicOnly, typespace);
            if(sym) {
                if(!this.filter(sym)) {
                    return null;
                }
            }
            return _super.prototype.find.call(this, name, publicOnly, typespace);
        };
        return FilteredSymbolScopeBuilder;
    })(SymbolScopeBuilder);
    TypeScript.FilteredSymbolScopeBuilder = FilteredSymbolScopeBuilder;    
})(TypeScript || (TypeScript = {}));
var TypeScript;
(function (TypeScript) {
    (function (TokenID) {
        TokenID._map = [];
        TokenID._map[0] = "Any";
        TokenID.Any = 0;
        TokenID._map[1] = "Bool";
        TokenID.Bool = 1;
        TokenID._map[2] = "Break";
        TokenID.Break = 2;
        TokenID._map[3] = "Case";
        TokenID.Case = 3;
        TokenID._map[4] = "Catch";
        TokenID.Catch = 4;
        TokenID._map[5] = "Class";
        TokenID.Class = 5;
        TokenID._map[6] = "Const";
        TokenID.Const = 6;
        TokenID._map[7] = "Continue";
        TokenID.Continue = 7;
        TokenID._map[8] = "Debugger";
        TokenID.Debugger = 8;
        TokenID._map[9] = "Default";
        TokenID.Default = 9;
        TokenID._map[10] = "Delete";
        TokenID.Delete = 10;
        TokenID._map[11] = "Do";
        TokenID.Do = 11;
        TokenID._map[12] = "Else";
        TokenID.Else = 12;
        TokenID._map[13] = "Enum";
        TokenID.Enum = 13;
        TokenID._map[14] = "Export";
        TokenID.Export = 14;
        TokenID._map[15] = "Extends";
        TokenID.Extends = 15;
        TokenID._map[16] = "Declare";
        TokenID.Declare = 16;
        TokenID._map[17] = "False";
        TokenID.False = 17;
        TokenID._map[18] = "Finally";
        TokenID.Finally = 18;
        TokenID._map[19] = "For";
        TokenID.For = 19;
        TokenID._map[20] = "Function";
        TokenID.Function = 20;
        TokenID._map[21] = "Constructor";
        TokenID.Constructor = 21;
        TokenID._map[22] = "Get";
        TokenID.Get = 22;
        TokenID._map[23] = "If";
        TokenID.If = 23;
        TokenID._map[24] = "Implements";
        TokenID.Implements = 24;
        TokenID._map[25] = "Import";
        TokenID.Import = 25;
        TokenID._map[26] = "In";
        TokenID.In = 26;
        TokenID._map[27] = "InstanceOf";
        TokenID.InstanceOf = 27;
        TokenID._map[28] = "Interface";
        TokenID.Interface = 28;
        TokenID._map[29] = "Let";
        TokenID.Let = 29;
        TokenID._map[30] = "Module";
        TokenID.Module = 30;
        TokenID._map[31] = "New";
        TokenID.New = 31;
        TokenID._map[32] = "Number";
        TokenID.Number = 32;
        TokenID._map[33] = "Null";
        TokenID.Null = 33;
        TokenID._map[34] = "Package";
        TokenID.Package = 34;
        TokenID._map[35] = "Private";
        TokenID.Private = 35;
        TokenID._map[36] = "Protected";
        TokenID.Protected = 36;
        TokenID._map[37] = "Public";
        TokenID.Public = 37;
        TokenID._map[38] = "Return";
        TokenID.Return = 38;
        TokenID._map[39] = "Set";
        TokenID.Set = 39;
        TokenID._map[40] = "Static";
        TokenID.Static = 40;
        TokenID._map[41] = "String";
        TokenID.String = 41;
        TokenID._map[42] = "Super";
        TokenID.Super = 42;
        TokenID._map[43] = "Switch";
        TokenID.Switch = 43;
        TokenID._map[44] = "This";
        TokenID.This = 44;
        TokenID._map[45] = "Throw";
        TokenID.Throw = 45;
        TokenID._map[46] = "True";
        TokenID.True = 46;
        TokenID._map[47] = "Try";
        TokenID.Try = 47;
        TokenID._map[48] = "TypeOf";
        TokenID.TypeOf = 48;
        TokenID._map[49] = "Var";
        TokenID.Var = 49;
        TokenID._map[50] = "Void";
        TokenID.Void = 50;
        TokenID._map[51] = "With";
        TokenID.With = 51;
        TokenID._map[52] = "While";
        TokenID.While = 52;
        TokenID._map[53] = "Yield";
        TokenID.Yield = 53;
        TokenID._map[54] = "Semicolon";
        TokenID.Semicolon = 54;
        TokenID._map[55] = "OpenParen";
        TokenID.OpenParen = 55;
        TokenID._map[56] = "CloseParen";
        TokenID.CloseParen = 56;
        TokenID._map[57] = "OpenBracket";
        TokenID.OpenBracket = 57;
        TokenID._map[58] = "CloseBracket";
        TokenID.CloseBracket = 58;
        TokenID._map[59] = "OpenBrace";
        TokenID.OpenBrace = 59;
        TokenID._map[60] = "CloseBrace";
        TokenID.CloseBrace = 60;
        TokenID._map[61] = "Comma";
        TokenID.Comma = 61;
        TokenID._map[62] = "Equals";
        TokenID.Equals = 62;
        TokenID._map[63] = "PlusEquals";
        TokenID.PlusEquals = 63;
        TokenID._map[64] = "MinusEquals";
        TokenID.MinusEquals = 64;
        TokenID._map[65] = "AsteriskEquals";
        TokenID.AsteriskEquals = 65;
        TokenID._map[66] = "SlashEquals";
        TokenID.SlashEquals = 66;
        TokenID._map[67] = "PercentEquals";
        TokenID.PercentEquals = 67;
        TokenID._map[68] = "AmpersandEquals";
        TokenID.AmpersandEquals = 68;
        TokenID._map[69] = "CaretEquals";
        TokenID.CaretEquals = 69;
        TokenID._map[70] = "BarEquals";
        TokenID.BarEquals = 70;
        TokenID._map[71] = "LessThanLessThanEquals";
        TokenID.LessThanLessThanEquals = 71;
        TokenID._map[72] = "GreaterThanGreaterThanEquals";
        TokenID.GreaterThanGreaterThanEquals = 72;
        TokenID._map[73] = "GreaterThanGreaterThanGreaterThanEquals";
        TokenID.GreaterThanGreaterThanGreaterThanEquals = 73;
        TokenID._map[74] = "Question";
        TokenID.Question = 74;
        TokenID._map[75] = "Colon";
        TokenID.Colon = 75;
        TokenID._map[76] = "BarBar";
        TokenID.BarBar = 76;
        TokenID._map[77] = "AmpersandAmpersand";
        TokenID.AmpersandAmpersand = 77;
        TokenID._map[78] = "Bar";
        TokenID.Bar = 78;
        TokenID._map[79] = "Caret";
        TokenID.Caret = 79;
        TokenID._map[80] = "And";
        TokenID.And = 80;
        TokenID._map[81] = "EqualsEquals";
        TokenID.EqualsEquals = 81;
        TokenID._map[82] = "ExclamationEquals";
        TokenID.ExclamationEquals = 82;
        TokenID._map[83] = "EqualsEqualsEquals";
        TokenID.EqualsEqualsEquals = 83;
        TokenID._map[84] = "ExclamationEqualsEquals";
        TokenID.ExclamationEqualsEquals = 84;
        TokenID._map[85] = "LessThan";
        TokenID.LessThan = 85;
        TokenID._map[86] = "LessThanEquals";
        TokenID.LessThanEquals = 86;
        TokenID._map[87] = "GreaterThan";
        TokenID.GreaterThan = 87;
        TokenID._map[88] = "GreaterThanEquals";
        TokenID.GreaterThanEquals = 88;
        TokenID._map[89] = "LessThanLessThan";
        TokenID.LessThanLessThan = 89;
        TokenID._map[90] = "GreaterThanGreaterThan";
        TokenID.GreaterThanGreaterThan = 90;
        TokenID._map[91] = "GreaterThanGreaterThanGreaterThan";
        TokenID.GreaterThanGreaterThanGreaterThan = 91;
        TokenID._map[92] = "Plus";
        TokenID.Plus = 92;
        TokenID._map[93] = "Minus";
        TokenID.Minus = 93;
        TokenID._map[94] = "Asterisk";
        TokenID.Asterisk = 94;
        TokenID._map[95] = "Slash";
        TokenID.Slash = 95;
        TokenID._map[96] = "Percent";
        TokenID.Percent = 96;
        TokenID._map[97] = "Tilde";
        TokenID.Tilde = 97;
        TokenID._map[98] = "Exclamation";
        TokenID.Exclamation = 98;
        TokenID._map[99] = "PlusPlus";
        TokenID.PlusPlus = 99;
        TokenID._map[100] = "MinusMinus";
        TokenID.MinusMinus = 100;
        TokenID._map[101] = "Dot";
        TokenID.Dot = 101;
        TokenID._map[102] = "DotDotDot";
        TokenID.DotDotDot = 102;
        TokenID._map[103] = "Error";
        TokenID.Error = 103;
        TokenID._map[104] = "EndOfFile";
        TokenID.EndOfFile = 104;
        TokenID._map[105] = "EqualsGreaterThan";
        TokenID.EqualsGreaterThan = 105;
        TokenID._map[106] = "Identifier";
        TokenID.Identifier = 106;
        TokenID._map[107] = "StringLiteral";
        TokenID.StringLiteral = 107;
        TokenID._map[108] = "RegularExpressionLiteral";
        TokenID.RegularExpressionLiteral = 108;
        TokenID._map[109] = "NumberLiteral";
        TokenID.NumberLiteral = 109;
        TokenID._map[110] = "Whitespace";
        TokenID.Whitespace = 110;
        TokenID._map[111] = "Comment";
        TokenID.Comment = 111;
        TokenID._map[112] = "Lim";
        TokenID.Lim = 112;
        TokenID.LimFixed = TokenID.EqualsGreaterThan;
        TokenID.LimKeyword = TokenID.Yield;
    })(TypeScript.TokenID || (TypeScript.TokenID = {}));
    var TokenID = TypeScript.TokenID;
    TypeScript.tokenTable = new Array();
    TypeScript.nodeTypeTable = new Array();
    TypeScript.nodeTypeToTokTable = new Array();
    TypeScript.noRegexTable = new Array();
    TypeScript.noRegexTable[TokenID.Identifier] = true;
    TypeScript.noRegexTable[TokenID.StringLiteral] = true;
    TypeScript.noRegexTable[TokenID.NumberLiteral] = true;
    TypeScript.noRegexTable[TokenID.RegularExpressionLiteral] = true;
    TypeScript.noRegexTable[TokenID.This] = true;
    TypeScript.noRegexTable[TokenID.PlusPlus] = true;
    TypeScript.noRegexTable[TokenID.MinusMinus] = true;
    TypeScript.noRegexTable[TokenID.CloseParen] = true;
    TypeScript.noRegexTable[TokenID.CloseBracket] = true;
    TypeScript.noRegexTable[TokenID.CloseBrace] = true;
    TypeScript.noRegexTable[TokenID.True] = true;
    TypeScript.noRegexTable[TokenID.False] = true;
    (function (OperatorPrecedence) {
        OperatorPrecedence._map = [];
        OperatorPrecedence._map[0] = "None";
        OperatorPrecedence.None = 0;
        OperatorPrecedence._map[1] = "Comma";
        OperatorPrecedence.Comma = 1;
        OperatorPrecedence._map[2] = "Assignment";
        OperatorPrecedence.Assignment = 2;
        OperatorPrecedence._map[3] = "Conditional";
        OperatorPrecedence.Conditional = 3;
        OperatorPrecedence._map[4] = "LogicalOr";
        OperatorPrecedence.LogicalOr = 4;
        OperatorPrecedence._map[5] = "LogicalAnd";
        OperatorPrecedence.LogicalAnd = 5;
        OperatorPrecedence._map[6] = "BitwiseOr";
        OperatorPrecedence.BitwiseOr = 6;
        OperatorPrecedence._map[7] = "BitwiseExclusiveOr";
        OperatorPrecedence.BitwiseExclusiveOr = 7;
        OperatorPrecedence._map[8] = "BitwiseAnd";
        OperatorPrecedence.BitwiseAnd = 8;
        OperatorPrecedence._map[9] = "Equality";
        OperatorPrecedence.Equality = 9;
        OperatorPrecedence._map[10] = "Relational";
        OperatorPrecedence.Relational = 10;
        OperatorPrecedence._map[11] = "Shift";
        OperatorPrecedence.Shift = 11;
        OperatorPrecedence._map[12] = "Additive";
        OperatorPrecedence.Additive = 12;
        OperatorPrecedence._map[13] = "Multiplicative";
        OperatorPrecedence.Multiplicative = 13;
        OperatorPrecedence._map[14] = "Unary";
        OperatorPrecedence.Unary = 14;
        OperatorPrecedence._map[15] = "Lim";
        OperatorPrecedence.Lim = 15;
    })(TypeScript.OperatorPrecedence || (TypeScript.OperatorPrecedence = {}));
    var OperatorPrecedence = TypeScript.OperatorPrecedence;
    (function (Reservation) {
        Reservation._map = [];
        Reservation.None = 0;
        Reservation.Javascript = 1;
        Reservation.JavascriptFuture = 2;
        Reservation.TypeScript = 4;
        Reservation.JavascriptFutureStrict = 8;
        Reservation.TypeScriptAndJS = Reservation.Javascript | Reservation.TypeScript;
        Reservation.TypeScriptAndJSFuture = Reservation.JavascriptFuture | Reservation.TypeScript;
        Reservation.TypeScriptAndJSFutureStrict = Reservation.JavascriptFutureStrict | Reservation.TypeScript;
    })(TypeScript.Reservation || (TypeScript.Reservation = {}));
    var Reservation = TypeScript.Reservation;
    var TokenInfo = (function () {
        function TokenInfo(tokenId, reservation, binopPrecedence, binopNodeType, unopPrecedence, unopNodeType, text, ers) {
            this.tokenId = tokenId;
            this.reservation = reservation;
            this.binopPrecedence = binopPrecedence;
            this.binopNodeType = binopNodeType;
            this.unopPrecedence = unopPrecedence;
            this.unopNodeType = unopNodeType;
            this.text = text;
            this.ers = ers;
        }
        return TokenInfo;
    })();
    TypeScript.TokenInfo = TokenInfo;    
    function setTokenInfo(tokenId, reservation, binopPrecedence, binopNodeType, unopPrecedence, unopNodeType, text, ers) {
        if(tokenId !== undefined) {
            TypeScript.tokenTable[tokenId] = new TokenInfo(tokenId, reservation, binopPrecedence, binopNodeType, unopPrecedence, unopNodeType, text, ers);
            if(binopNodeType != TypeScript.NodeType.None) {
                TypeScript.nodeTypeTable[binopNodeType] = text;
                TypeScript.nodeTypeToTokTable[binopNodeType] = tokenId;
            }
            if(unopNodeType != TypeScript.NodeType.None) {
                TypeScript.nodeTypeTable[unopNodeType] = text;
            }
        }
    }
    setTokenInfo(TokenID.Any, Reservation.TypeScript, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "any", TypeScript.ErrorRecoverySet.PrimType);
    setTokenInfo(TokenID.Bool, Reservation.TypeScript, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "bool", TypeScript.ErrorRecoverySet.PrimType);
    setTokenInfo(TokenID.Break, Reservation.TypeScriptAndJS, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "break", TypeScript.ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.Case, Reservation.TypeScriptAndJS, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "case", TypeScript.ErrorRecoverySet.SCase);
    setTokenInfo(TokenID.Catch, Reservation.TypeScriptAndJS, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "catch", TypeScript.ErrorRecoverySet.Catch);
    setTokenInfo(TokenID.Class, Reservation.TypeScriptAndJSFuture, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "class", TypeScript.ErrorRecoverySet.TypeScriptS);
    setTokenInfo(TokenID.Const, Reservation.TypeScriptAndJSFuture, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "const", TypeScript.ErrorRecoverySet.Var);
    setTokenInfo(TokenID.Continue, Reservation.TypeScriptAndJS, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "continue", TypeScript.ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.Debugger, Reservation.TypeScriptAndJS, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.Debugger, "debugger", TypeScript.ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.Default, Reservation.TypeScriptAndJS, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "default", TypeScript.ErrorRecoverySet.SCase);
    setTokenInfo(TokenID.Delete, Reservation.TypeScriptAndJS, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.Unary, TypeScript.NodeType.Delete, "delete", TypeScript.ErrorRecoverySet.Prefix);
    setTokenInfo(TokenID.Do, Reservation.TypeScriptAndJS, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "do", TypeScript.ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.Else, Reservation.TypeScriptAndJS, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "else", TypeScript.ErrorRecoverySet.Else);
    setTokenInfo(TokenID.Enum, Reservation.TypeScriptAndJSFuture, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "enum", TypeScript.ErrorRecoverySet.TypeScriptS);
    setTokenInfo(TokenID.Export, Reservation.TypeScriptAndJSFuture, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "export", TypeScript.ErrorRecoverySet.TypeScriptS);
    setTokenInfo(TokenID.Extends, Reservation.TypeScriptAndJSFuture, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "extends", TypeScript.ErrorRecoverySet.None);
    setTokenInfo(TokenID.Declare, Reservation.TypeScript, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "declare", TypeScript.ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.False, Reservation.TypeScriptAndJS, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "false", TypeScript.ErrorRecoverySet.RLit);
    setTokenInfo(TokenID.Finally, Reservation.TypeScriptAndJS, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "finally", TypeScript.ErrorRecoverySet.Catch);
    setTokenInfo(TokenID.For, Reservation.TypeScriptAndJS, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "for", TypeScript.ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.Function, Reservation.TypeScriptAndJS, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "function", TypeScript.ErrorRecoverySet.Func);
    setTokenInfo(TokenID.Constructor, Reservation.TypeScriptAndJSFutureStrict, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "constructor", TypeScript.ErrorRecoverySet.Func);
    setTokenInfo(TokenID.Get, Reservation.TypeScript, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "get", TypeScript.ErrorRecoverySet.Func);
    setTokenInfo(TokenID.Set, Reservation.TypeScript, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "set", TypeScript.ErrorRecoverySet.Func);
    setTokenInfo(TokenID.If, Reservation.TypeScriptAndJS, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "if", TypeScript.ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.Implements, Reservation.TypeScriptAndJSFutureStrict, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "implements", TypeScript.ErrorRecoverySet.None);
    setTokenInfo(TokenID.Import, Reservation.TypeScriptAndJSFuture, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "import", TypeScript.ErrorRecoverySet.TypeScriptS);
    setTokenInfo(TokenID.In, Reservation.TypeScriptAndJS, OperatorPrecedence.Relational, TypeScript.NodeType.In, OperatorPrecedence.None, TypeScript.NodeType.None, "in", TypeScript.ErrorRecoverySet.None);
    setTokenInfo(TokenID.InstanceOf, Reservation.TypeScriptAndJS, OperatorPrecedence.Relational, TypeScript.NodeType.InstOf, OperatorPrecedence.None, TypeScript.NodeType.None, "instanceof", TypeScript.ErrorRecoverySet.BinOp);
    setTokenInfo(TokenID.Interface, Reservation.TypeScriptAndJSFutureStrict, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "interface", TypeScript.ErrorRecoverySet.TypeScriptS);
    setTokenInfo(TokenID.Let, Reservation.JavascriptFutureStrict, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "let", TypeScript.ErrorRecoverySet.None);
    setTokenInfo(TokenID.Module, Reservation.TypeScript, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "module", TypeScript.ErrorRecoverySet.TypeScriptS);
    setTokenInfo(TokenID.New, Reservation.TypeScriptAndJS, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "new", TypeScript.ErrorRecoverySet.PreOp);
    setTokenInfo(TokenID.Number, Reservation.TypeScript, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "number", TypeScript.ErrorRecoverySet.PrimType);
    setTokenInfo(TokenID.Null, Reservation.TypeScriptAndJS, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "null", TypeScript.ErrorRecoverySet.RLit);
    setTokenInfo(TokenID.Package, Reservation.JavascriptFutureStrict, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "package", TypeScript.ErrorRecoverySet.None);
    setTokenInfo(TokenID.Private, Reservation.TypeScriptAndJSFutureStrict, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "private", TypeScript.ErrorRecoverySet.TypeScriptS);
    setTokenInfo(TokenID.Protected, Reservation.JavascriptFutureStrict, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "protected", TypeScript.ErrorRecoverySet.None);
    setTokenInfo(TokenID.Public, Reservation.TypeScriptAndJSFutureStrict, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "public", TypeScript.ErrorRecoverySet.TypeScriptS);
    setTokenInfo(TokenID.Return, Reservation.TypeScriptAndJS, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "return", TypeScript.ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.Static, Reservation.TypeScriptAndJSFutureStrict, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "static", TypeScript.ErrorRecoverySet.None);
    setTokenInfo(TokenID.String, Reservation.TypeScript, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "string", TypeScript.ErrorRecoverySet.PrimType);
    setTokenInfo(TokenID.Super, Reservation.TypeScriptAndJSFuture, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "super", TypeScript.ErrorRecoverySet.RLit);
    setTokenInfo(TokenID.Switch, Reservation.TypeScriptAndJS, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "switch", TypeScript.ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.This, Reservation.TypeScriptAndJS, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "this", TypeScript.ErrorRecoverySet.RLit);
    setTokenInfo(TokenID.Throw, Reservation.TypeScriptAndJS, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "throw", TypeScript.ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.True, Reservation.TypeScriptAndJS, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "true", TypeScript.ErrorRecoverySet.RLit);
    setTokenInfo(TokenID.Try, Reservation.TypeScriptAndJS, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "try", TypeScript.ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.TypeOf, Reservation.TypeScriptAndJS, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.Unary, TypeScript.NodeType.Typeof, "typeof", TypeScript.ErrorRecoverySet.Prefix);
    setTokenInfo(TokenID.Var, Reservation.TypeScriptAndJS, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "var", TypeScript.ErrorRecoverySet.Var);
    setTokenInfo(TokenID.Void, Reservation.TypeScriptAndJS, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.Unary, TypeScript.NodeType.Void, "void", TypeScript.ErrorRecoverySet.Prefix);
    setTokenInfo(TokenID.With, Reservation.TypeScriptAndJS, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.With, "with", TypeScript.ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.While, Reservation.TypeScriptAndJS, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "while", TypeScript.ErrorRecoverySet.While);
    setTokenInfo(TokenID.Yield, Reservation.JavascriptFutureStrict, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "yield", TypeScript.ErrorRecoverySet.None);
    setTokenInfo(TokenID.Identifier, Reservation.None, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "identifier", TypeScript.ErrorRecoverySet.ID);
    setTokenInfo(TokenID.NumberLiteral, Reservation.None, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "numberLiteral", TypeScript.ErrorRecoverySet.Literal);
    setTokenInfo(TokenID.RegularExpressionLiteral, Reservation.None, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "regex", TypeScript.ErrorRecoverySet.RegExp);
    setTokenInfo(TokenID.StringLiteral, Reservation.None, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "qstring", TypeScript.ErrorRecoverySet.Literal);
    setTokenInfo(TokenID.Semicolon, Reservation.None, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, ";", TypeScript.ErrorRecoverySet.SColon);
    setTokenInfo(TokenID.CloseParen, Reservation.None, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, ")", TypeScript.ErrorRecoverySet.RParen);
    setTokenInfo(TokenID.CloseBracket, Reservation.None, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "]", TypeScript.ErrorRecoverySet.RBrack);
    setTokenInfo(TokenID.OpenBrace, Reservation.None, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "{", TypeScript.ErrorRecoverySet.LCurly);
    setTokenInfo(TokenID.CloseBrace, Reservation.None, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "}", TypeScript.ErrorRecoverySet.RCurly);
    setTokenInfo(TokenID.DotDotDot, Reservation.None, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "...", TypeScript.ErrorRecoverySet.None);
    setTokenInfo(TokenID.Comma, Reservation.None, OperatorPrecedence.Comma, TypeScript.NodeType.Comma, OperatorPrecedence.None, TypeScript.NodeType.None, ",", TypeScript.ErrorRecoverySet.Comma);
    setTokenInfo(TokenID.Equals, Reservation.None, OperatorPrecedence.Assignment, TypeScript.NodeType.Asg, OperatorPrecedence.None, TypeScript.NodeType.None, "=", TypeScript.ErrorRecoverySet.Asg);
    setTokenInfo(TokenID.PlusEquals, Reservation.None, OperatorPrecedence.Assignment, TypeScript.NodeType.AsgAdd, OperatorPrecedence.None, TypeScript.NodeType.None, "+=", TypeScript.ErrorRecoverySet.BinOp);
    setTokenInfo(TokenID.MinusEquals, Reservation.None, OperatorPrecedence.Assignment, TypeScript.NodeType.AsgSub, OperatorPrecedence.None, TypeScript.NodeType.None, "-=", TypeScript.ErrorRecoverySet.BinOp);
    setTokenInfo(TokenID.AsteriskEquals, Reservation.None, OperatorPrecedence.Assignment, TypeScript.NodeType.AsgMul, OperatorPrecedence.None, TypeScript.NodeType.None, "*=", TypeScript.ErrorRecoverySet.BinOp);
    setTokenInfo(TokenID.SlashEquals, Reservation.None, OperatorPrecedence.Assignment, TypeScript.NodeType.AsgDiv, OperatorPrecedence.None, TypeScript.NodeType.None, "/=", TypeScript.ErrorRecoverySet.BinOp);
    setTokenInfo(TokenID.PercentEquals, Reservation.None, OperatorPrecedence.Assignment, TypeScript.NodeType.AsgMod, OperatorPrecedence.None, TypeScript.NodeType.None, "%=", TypeScript.ErrorRecoverySet.BinOp);
    setTokenInfo(TokenID.AmpersandEquals, Reservation.None, OperatorPrecedence.Assignment, TypeScript.NodeType.AsgAnd, OperatorPrecedence.None, TypeScript.NodeType.None, "&=", TypeScript.ErrorRecoverySet.BinOp);
    setTokenInfo(TokenID.CaretEquals, Reservation.None, OperatorPrecedence.Assignment, TypeScript.NodeType.AsgXor, OperatorPrecedence.None, TypeScript.NodeType.None, "^=", TypeScript.ErrorRecoverySet.BinOp);
    setTokenInfo(TokenID.BarEquals, Reservation.None, OperatorPrecedence.Assignment, TypeScript.NodeType.AsgOr, OperatorPrecedence.None, TypeScript.NodeType.None, "|=", TypeScript.ErrorRecoverySet.BinOp);
    setTokenInfo(TokenID.LessThanLessThanEquals, Reservation.None, OperatorPrecedence.Assignment, TypeScript.NodeType.AsgLsh, OperatorPrecedence.None, TypeScript.NodeType.None, "<<=", TypeScript.ErrorRecoverySet.BinOp);
    setTokenInfo(TokenID.GreaterThanGreaterThanEquals, Reservation.None, OperatorPrecedence.Assignment, TypeScript.NodeType.AsgRsh, OperatorPrecedence.None, TypeScript.NodeType.None, ">>=", TypeScript.ErrorRecoverySet.BinOp);
    setTokenInfo(TokenID.GreaterThanGreaterThanGreaterThanEquals, Reservation.None, OperatorPrecedence.Assignment, TypeScript.NodeType.AsgRs2, OperatorPrecedence.None, TypeScript.NodeType.None, ">>>=", TypeScript.ErrorRecoverySet.BinOp);
    setTokenInfo(TokenID.Question, Reservation.None, OperatorPrecedence.Conditional, TypeScript.NodeType.ConditionalExpression, OperatorPrecedence.None, TypeScript.NodeType.None, "?", TypeScript.ErrorRecoverySet.BinOp);
    setTokenInfo(TokenID.Colon, Reservation.None, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, ":", TypeScript.ErrorRecoverySet.Colon);
    setTokenInfo(TokenID.BarBar, Reservation.None, OperatorPrecedence.LogicalOr, TypeScript.NodeType.LogOr, OperatorPrecedence.None, TypeScript.NodeType.None, "||", TypeScript.ErrorRecoverySet.BinOp);
    setTokenInfo(TokenID.AmpersandAmpersand, Reservation.None, OperatorPrecedence.LogicalAnd, TypeScript.NodeType.LogAnd, OperatorPrecedence.None, TypeScript.NodeType.None, "&&", TypeScript.ErrorRecoverySet.BinOp);
    setTokenInfo(TokenID.Bar, Reservation.None, OperatorPrecedence.BitwiseOr, TypeScript.NodeType.Or, OperatorPrecedence.None, TypeScript.NodeType.None, "|", TypeScript.ErrorRecoverySet.BinOp);
    setTokenInfo(TokenID.Caret, Reservation.None, OperatorPrecedence.BitwiseExclusiveOr, TypeScript.NodeType.Xor, OperatorPrecedence.None, TypeScript.NodeType.None, "^", TypeScript.ErrorRecoverySet.BinOp);
    setTokenInfo(TokenID.And, Reservation.None, OperatorPrecedence.BitwiseAnd, TypeScript.NodeType.And, OperatorPrecedence.None, TypeScript.NodeType.None, "&", TypeScript.ErrorRecoverySet.BinOp);
    setTokenInfo(TokenID.EqualsEquals, Reservation.None, OperatorPrecedence.Equality, TypeScript.NodeType.Eq, OperatorPrecedence.None, TypeScript.NodeType.None, "==", TypeScript.ErrorRecoverySet.BinOp);
    setTokenInfo(TokenID.ExclamationEquals, Reservation.None, OperatorPrecedence.Equality, TypeScript.NodeType.Ne, OperatorPrecedence.None, TypeScript.NodeType.None, "!=", TypeScript.ErrorRecoverySet.BinOp);
    setTokenInfo(TokenID.EqualsEqualsEquals, Reservation.None, OperatorPrecedence.Equality, TypeScript.NodeType.Eqv, OperatorPrecedence.None, TypeScript.NodeType.None, "===", TypeScript.ErrorRecoverySet.BinOp);
    setTokenInfo(TokenID.ExclamationEqualsEquals, Reservation.None, OperatorPrecedence.Equality, TypeScript.NodeType.NEqv, OperatorPrecedence.None, TypeScript.NodeType.None, "!==", TypeScript.ErrorRecoverySet.BinOp);
    setTokenInfo(TokenID.LessThan, Reservation.None, OperatorPrecedence.Relational, TypeScript.NodeType.Lt, OperatorPrecedence.None, TypeScript.NodeType.None, "<", TypeScript.ErrorRecoverySet.BinOp);
    setTokenInfo(TokenID.LessThanEquals, Reservation.None, OperatorPrecedence.Relational, TypeScript.NodeType.Le, OperatorPrecedence.None, TypeScript.NodeType.None, "<=", TypeScript.ErrorRecoverySet.BinOp);
    setTokenInfo(TokenID.GreaterThan, Reservation.None, OperatorPrecedence.Relational, TypeScript.NodeType.Gt, OperatorPrecedence.None, TypeScript.NodeType.None, ">", TypeScript.ErrorRecoverySet.BinOp);
    setTokenInfo(TokenID.GreaterThanEquals, Reservation.None, OperatorPrecedence.Relational, TypeScript.NodeType.Ge, OperatorPrecedence.None, TypeScript.NodeType.None, ">=", TypeScript.ErrorRecoverySet.BinOp);
    setTokenInfo(TokenID.LessThanLessThan, Reservation.None, OperatorPrecedence.Shift, TypeScript.NodeType.Lsh, OperatorPrecedence.None, TypeScript.NodeType.None, "<<", TypeScript.ErrorRecoverySet.BinOp);
    setTokenInfo(TokenID.GreaterThanGreaterThan, Reservation.None, OperatorPrecedence.Shift, TypeScript.NodeType.Rsh, OperatorPrecedence.None, TypeScript.NodeType.None, ">>", TypeScript.ErrorRecoverySet.BinOp);
    setTokenInfo(TokenID.GreaterThanGreaterThanGreaterThan, Reservation.None, OperatorPrecedence.Shift, TypeScript.NodeType.Rs2, OperatorPrecedence.None, TypeScript.NodeType.None, ">>>", TypeScript.ErrorRecoverySet.BinOp);
    setTokenInfo(TokenID.Plus, Reservation.None, OperatorPrecedence.Additive, TypeScript.NodeType.Add, OperatorPrecedence.Unary, TypeScript.NodeType.Pos, "+", TypeScript.ErrorRecoverySet.AddOp);
    setTokenInfo(TokenID.Minus, Reservation.None, OperatorPrecedence.Additive, TypeScript.NodeType.Sub, OperatorPrecedence.Unary, TypeScript.NodeType.Neg, "-", TypeScript.ErrorRecoverySet.AddOp);
    setTokenInfo(TokenID.Asterisk, Reservation.None, OperatorPrecedence.Multiplicative, TypeScript.NodeType.Mul, OperatorPrecedence.None, TypeScript.NodeType.None, "*", TypeScript.ErrorRecoverySet.BinOp);
    setTokenInfo(TokenID.Slash, Reservation.None, OperatorPrecedence.Multiplicative, TypeScript.NodeType.Div, OperatorPrecedence.None, TypeScript.NodeType.None, "/", TypeScript.ErrorRecoverySet.BinOp);
    setTokenInfo(TokenID.Percent, Reservation.None, OperatorPrecedence.Multiplicative, TypeScript.NodeType.Mod, OperatorPrecedence.None, TypeScript.NodeType.None, "%", TypeScript.ErrorRecoverySet.BinOp);
    setTokenInfo(TokenID.Tilde, Reservation.None, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.Unary, TypeScript.NodeType.Not, "~", TypeScript.ErrorRecoverySet.PreOp);
    setTokenInfo(TokenID.Exclamation, Reservation.None, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.Unary, TypeScript.NodeType.LogNot, "!", TypeScript.ErrorRecoverySet.PreOp);
    setTokenInfo(TokenID.PlusPlus, Reservation.None, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.Unary, TypeScript.NodeType.IncPre, "++", TypeScript.ErrorRecoverySet.PreOp);
    setTokenInfo(TokenID.MinusMinus, Reservation.None, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.Unary, TypeScript.NodeType.DecPre, "--", TypeScript.ErrorRecoverySet.PreOp);
    setTokenInfo(TokenID.OpenParen, Reservation.None, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "(", TypeScript.ErrorRecoverySet.LParen);
    setTokenInfo(TokenID.OpenBracket, Reservation.None, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "[", TypeScript.ErrorRecoverySet.LBrack);
    setTokenInfo(TokenID.Dot, Reservation.None, OperatorPrecedence.Unary, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, ".", TypeScript.ErrorRecoverySet.Dot);
    setTokenInfo(TokenID.EndOfFile, Reservation.None, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "<EOF>", TypeScript.ErrorRecoverySet.EOF);
    setTokenInfo(TokenID.EqualsGreaterThan, Reservation.None, OperatorPrecedence.None, TypeScript.NodeType.None, OperatorPrecedence.None, TypeScript.NodeType.None, "=>", TypeScript.ErrorRecoverySet.None);
    function lookupToken(tokenId) {
        return TypeScript.tokenTable[tokenId];
    }
    TypeScript.lookupToken = lookupToken;
    (function (TokenClass) {
        TokenClass._map = [];
        TokenClass._map[0] = "Punctuation";
        TokenClass.Punctuation = 0;
        TokenClass._map[1] = "Keyword";
        TokenClass.Keyword = 1;
        TokenClass._map[2] = "Operator";
        TokenClass.Operator = 2;
        TokenClass._map[3] = "Comment";
        TokenClass.Comment = 3;
        TokenClass._map[4] = "Whitespace";
        TokenClass.Whitespace = 4;
        TokenClass._map[5] = "Identifier";
        TokenClass.Identifier = 5;
        TokenClass._map[6] = "NumberLiteral";
        TokenClass.NumberLiteral = 6;
        TokenClass._map[7] = "StringLiteral";
        TokenClass.StringLiteral = 7;
        TokenClass._map[8] = "RegExpLiteral";
        TokenClass.RegExpLiteral = 8;
    })(TypeScript.TokenClass || (TypeScript.TokenClass = {}));
    var TokenClass = TypeScript.TokenClass;
    var SavedToken = (function () {
        function SavedToken(tok, minChar, limChar) {
            this.tok = tok;
            this.minChar = minChar;
            this.limChar = limChar;
        }
        return SavedToken;
    })();
    TypeScript.SavedToken = SavedToken;    
    var Token = (function () {
        function Token(tokenId) {
            this.tokenId = tokenId;
        }
        Token.prototype.toString = function () {
            return "token: " + this.tokenId + " " + this.getText() + " (" + (TokenID)._map[this.tokenId] + ")";
        };
        Token.prototype.print = function (line, outfile) {
            outfile.WriteLine(this.toString() + ",on line" + line);
        };
        Token.prototype.getText = function () {
            return TypeScript.tokenTable[this.tokenId].text;
        };
        Token.prototype.classification = function () {
            if(this.tokenId <= TokenID.LimKeyword) {
                return TokenClass.Keyword;
            } else {
                var tokenInfo = lookupToken(this.tokenId);
                if(tokenInfo != undefined) {
                    if((tokenInfo.unopNodeType != TypeScript.NodeType.None) || (tokenInfo.binopNodeType != TypeScript.NodeType.None)) {
                        return TokenClass.Operator;
                    }
                }
            }
            return TokenClass.Punctuation;
        };
        return Token;
    })();
    TypeScript.Token = Token;    
    var NumberLiteralToken = (function (_super) {
        __extends(NumberLiteralToken, _super);
        function NumberLiteralToken(value, hasEmptyFraction) {
                _super.call(this, TokenID.NumberLiteral);
            this.value = value;
            this.hasEmptyFraction = hasEmptyFraction;
        }
        NumberLiteralToken.prototype.getText = function () {
            return this.hasEmptyFraction ? this.value.toString() + ".0" : this.value.toString();
        };
        NumberLiteralToken.prototype.classification = function () {
            return TokenClass.NumberLiteral;
        };
        return NumberLiteralToken;
    })(Token);
    TypeScript.NumberLiteralToken = NumberLiteralToken;    
    var StringLiteralToken = (function (_super) {
        __extends(StringLiteralToken, _super);
        function StringLiteralToken(value) {
                _super.call(this, TokenID.StringLiteral);
            this.value = value;
        }
        StringLiteralToken.prototype.getText = function () {
            return this.value;
        };
        StringLiteralToken.prototype.classification = function () {
            return TokenClass.StringLiteral;
        };
        return StringLiteralToken;
    })(Token);
    TypeScript.StringLiteralToken = StringLiteralToken;    
    var IdentifierToken = (function (_super) {
        __extends(IdentifierToken, _super);
        function IdentifierToken(value, hasEscapeSequence) {
                _super.call(this, TokenID.Identifier);
            this.value = value;
            this.hasEscapeSequence = hasEscapeSequence;
        }
        IdentifierToken.prototype.getText = function () {
            return this.value;
        };
        IdentifierToken.prototype.classification = function () {
            return TokenClass.Identifier;
        };
        return IdentifierToken;
    })(Token);
    TypeScript.IdentifierToken = IdentifierToken;    
    var WhitespaceToken = (function (_super) {
        __extends(WhitespaceToken, _super);
        function WhitespaceToken(tokenId, value) {
                _super.call(this, tokenId);
            this.value = value;
        }
        WhitespaceToken.prototype.getText = function () {
            return this.value;
        };
        WhitespaceToken.prototype.classification = function () {
            return TokenClass.Whitespace;
        };
        return WhitespaceToken;
    })(Token);
    TypeScript.WhitespaceToken = WhitespaceToken;    
    var CommentToken = (function (_super) {
        __extends(CommentToken, _super);
        function CommentToken(tokenID, value, isBlock, startPos, line, endsLine) {
                _super.call(this, tokenID);
            this.value = value;
            this.isBlock = isBlock;
            this.startPos = startPos;
            this.line = line;
            this.endsLine = endsLine;
        }
        CommentToken.prototype.getText = function () {
            return this.value;
        };
        CommentToken.prototype.classification = function () {
            return TokenClass.Comment;
        };
        return CommentToken;
    })(Token);
    TypeScript.CommentToken = CommentToken;    
    var RegularExpressionLiteralToken = (function (_super) {
        __extends(RegularExpressionLiteralToken, _super);
        function RegularExpressionLiteralToken(regex) {
                _super.call(this, TokenID.RegularExpressionLiteral);
            this.regex = regex;
        }
        RegularExpressionLiteralToken.prototype.getText = function () {
            return this.regex.toString();
        };
        RegularExpressionLiteralToken.prototype.classification = function () {
            return TokenClass.RegExpLiteral;
        };
        return RegularExpressionLiteralToken;
    })(Token);
    TypeScript.RegularExpressionLiteralToken = RegularExpressionLiteralToken;    
    TypeScript.staticTokens = new Array();
    function initializeStaticTokens() {
        for(var i = 0; i <= TokenID.LimFixed; i++) {
            TypeScript.staticTokens[i] = new Token(i);
        }
    }
    TypeScript.initializeStaticTokens = initializeStaticTokens;
})(TypeScript || (TypeScript = {}));
var TypeScript;
(function (TypeScript) {
    var ArrayCache = (function () {
        function ArrayCache() {
            this.arrayBase = null;
        }
        ArrayCache.prototype.specialize = function (arrInstType, checker) {
            if(this.arrayBase == null) {
                this.arrayBase = arrInstType.specializeType(checker.wildElm.type, this.arrayType.elementType, checker, true);
            }
            return this.arrayBase;
        };
        return ArrayCache;
    })();
    TypeScript.ArrayCache = ArrayCache;    
    var TypeComparisonInfo = (function () {
        function TypeComparisonInfo() {
            this.onlyCaptureFirstError = false;
            this.flags = TypeScript.TypeRelationshipFlags.SuccessfulComparison;
            this.message = "";
        }
        TypeComparisonInfo.prototype.addMessageToFront = function (message) {
            if(!this.onlyCaptureFirstError) {
                this.message = this.message ? message + ":\n\t" + this.message : message;
            } else {
                this.setMessage(message);
            }
        };
        TypeComparisonInfo.prototype.setMessage = function (message) {
            this.message = message;
        };
        return TypeComparisonInfo;
    })();
    TypeScript.TypeComparisonInfo = TypeComparisonInfo;    
    (function (TypeCheckCollectionMode) {
        TypeCheckCollectionMode._map = [];
        TypeCheckCollectionMode._map[0] = "Resident";
        TypeCheckCollectionMode.Resident = 0;
        TypeCheckCollectionMode._map[1] = "Transient";
        TypeCheckCollectionMode.Transient = 1;
    })(TypeScript.TypeCheckCollectionMode || (TypeScript.TypeCheckCollectionMode = {}));
    var TypeCheckCollectionMode = TypeScript.TypeCheckCollectionMode;
    var PersistentGlobalTypeState = (function () {
        function PersistentGlobalTypeState(errorReporter) {
            this.errorReporter = errorReporter;
            this.importedGlobalsTable = new TypeScript.ScopedMembers(new TypeScript.DualStringHashTable(new TypeScript.StringHashTable(), new TypeScript.StringHashTable()));
            this.importedGlobalsTypeTable = new TypeScript.ScopedMembers(new TypeScript.DualStringHashTable(new TypeScript.StringHashTable(), new TypeScript.StringHashTable()));
            this.globals = null;
            this.globalTypes = null;
            this.ambientGlobals = null;
            this.ambientGlobalTypes = null;
            this.residentGlobalValues = new TypeScript.StringHashTable();
            this.residentGlobalTypes = new TypeScript.StringHashTable();
            this.residentGlobalAmbientValues = new TypeScript.StringHashTable();
            this.residentGlobalAmbientTypes = new TypeScript.StringHashTable();
            this.residentTypeCheck = true;
            this.mod = null;
            this.gloMod = null;
            this.wildElm = null;
            this.importedGlobals = new TypeScript.SymbolScopeBuilder(null, this.importedGlobalsTable, null, this.importedGlobalsTypeTable, null, null);
            this.dualGlobalValues = new TypeScript.DualStringHashTable(this.residentGlobalValues, new TypeScript.StringHashTable());
            this.dualGlobalTypes = new TypeScript.DualStringHashTable(this.residentGlobalTypes, new TypeScript.StringHashTable());
            this.dualAmbientGlobalValues = new TypeScript.DualStringHashTable(this.residentGlobalAmbientValues, new TypeScript.StringHashTable());
            this.dualAmbientGlobalTypes = new TypeScript.DualStringHashTable(this.residentGlobalAmbientTypes, new TypeScript.StringHashTable());
            var dualGlobalScopedMembers = new TypeScript.ScopedMembers(new TypeScript.DualStringHashTable(this.dualGlobalValues, new TypeScript.StringHashTable()));
            var dualGlobalScopedAmbientMembers = new TypeScript.ScopedMembers(new TypeScript.DualStringHashTable(this.dualAmbientGlobalValues, new TypeScript.StringHashTable()));
            var dualGlobalScopedEnclosedTypes = new TypeScript.ScopedMembers(new TypeScript.DualStringHashTable(this.dualGlobalTypes, new TypeScript.StringHashTable()));
            var dualGlobalScopedAmbientEnclosedTypes = new TypeScript.ScopedMembers(new TypeScript.DualStringHashTable(this.dualAmbientGlobalTypes, new TypeScript.StringHashTable()));
            this.globalScope = new TypeScript.SymbolScopeBuilder(dualGlobalScopedMembers, dualGlobalScopedAmbientMembers, dualGlobalScopedEnclosedTypes, dualGlobalScopedAmbientEnclosedTypes, this.importedGlobals, null);
            this.voidType = this.enterPrimitive(TypeScript.Primitive.Void, "void");
            this.booleanType = this.enterPrimitive(TypeScript.Primitive.Boolean, "bool");
            this.doubleType = this.enterPrimitive(TypeScript.Primitive.Double, "number");
            this.importedGlobals.ambientEnclosedTypes.addPublicMember("number", this.doubleType.symbol);
            this.stringType = this.enterPrimitive(TypeScript.Primitive.String, "string");
            this.anyType = this.enterPrimitive(TypeScript.Primitive.Any, "any");
            this.nullType = this.enterPrimitive(TypeScript.Primitive.Null, "null");
            this.undefinedType = this.enterPrimitive(TypeScript.Primitive.Undefined, "undefined");
            this.setCollectionMode(TypeCheckCollectionMode.Resident);
            this.wildElm = new TypeScript.TypeSymbol("_element", -1, 0, -1, new TypeScript.Type());
            this.importedGlobalsTypeTable.addPublicMember(this.wildElm.name, this.wildElm);
            this.mod = new TypeScript.ModuleType(dualGlobalScopedEnclosedTypes, dualGlobalScopedAmbientEnclosedTypes);
            this.mod.members = dualGlobalScopedMembers;
            this.mod.ambientMembers = dualGlobalScopedAmbientMembers;
            this.mod.containedScope = this.globalScope;
            this.gloMod = new TypeScript.TypeSymbol(TypeScript.globalId, -1, 0, -1, this.mod);
            this.mod.members.addPublicMember(this.gloMod.name, this.gloMod);
            this.defineGlobalValue("undefined", this.undefinedType);
        }
        PersistentGlobalTypeState.prototype.enterPrimitive = function (flags, name) {
            var primitive = new TypeScript.Type();
            primitive.primitiveTypeClass = flags;
            var symbol = new TypeScript.TypeSymbol(name, -1, name.length, -1, primitive);
            symbol.typeCheckStatus = TypeScript.TypeCheckStatus.Finished;
            primitive.symbol = symbol;
            this.importedGlobals.enter(null, null, symbol, this.errorReporter, true, true, true);
            return primitive;
        };
        PersistentGlobalTypeState.prototype.setCollectionMode = function (mode) {
            this.residentTypeCheck = this.dualGlobalValues.insertPrimary = this.dualGlobalTypes.insertPrimary = this.dualAmbientGlobalValues.insertPrimary = this.dualAmbientGlobalTypes.insertPrimary = mode == TypeCheckCollectionMode.Resident;
        };
        PersistentGlobalTypeState.prototype.refreshPersistentState = function () {
            this.globals = new TypeScript.StringHashTable();
            this.globalTypes = new TypeScript.StringHashTable();
            this.ambientGlobals = new TypeScript.StringHashTable();
            this.ambientGlobalTypes = new TypeScript.StringHashTable();
            this.globalTypes.add(this.voidType.symbol.name, this.voidType.symbol);
            this.globalTypes.add(this.booleanType.symbol.name, this.booleanType.symbol);
            this.globalTypes.add(this.doubleType.symbol.name, this.doubleType.symbol);
            this.globalTypes.add("number", this.doubleType.symbol);
            this.globalTypes.add(this.stringType.symbol.name, this.stringType.symbol);
            this.globalTypes.add(this.anyType.symbol.name, this.anyType.symbol);
            this.globalTypes.add(this.nullType.symbol.name, this.nullType.symbol);
            this.globalTypes.add(this.undefinedType.symbol.name, this.undefinedType.symbol);
            this.dualGlobalValues.secondaryTable = this.globals;
            this.dualGlobalTypes.secondaryTable = this.globalTypes;
            this.dualAmbientGlobalValues.secondaryTable = this.ambientGlobals;
            this.dualAmbientGlobalTypes.secondaryTable = this.ambientGlobalTypes;
        };
        PersistentGlobalTypeState.prototype.defineGlobalValue = function (name, type) {
            var valueLocation = new TypeScript.ValueLocation();
            valueLocation.typeLink = new TypeScript.TypeLink();
            var sym = new TypeScript.VariableSymbol(name, 0, -1, valueLocation);
            sym.setType(type);
            sym.typeCheckStatus = TypeScript.TypeCheckStatus.Finished;
            sym.container = this.gloMod;
            this.importedGlobalsTable.addPublicMember(name, sym);
        };
        return PersistentGlobalTypeState;
    })();
    TypeScript.PersistentGlobalTypeState = PersistentGlobalTypeState;    
    var ContextualTypeContext = (function () {
        function ContextualTypeContext(contextualType, provisional, contextID) {
            this.contextualType = contextualType;
            this.provisional = provisional;
            this.contextID = contextID;
            this.targetSig = null;
            this.targetThis = null;
            this.targetAccessorType = null;
        }
        return ContextualTypeContext;
    })();
    TypeScript.ContextualTypeContext = ContextualTypeContext;    
    var ContextualTypingContextStack = (function () {
        function ContextualTypingContextStack(checker) {
            this.checker = checker;
            this.contextStack = [];
            this.hadProvisionalErrors = false;
        }
        ContextualTypingContextStack.contextID = TypeScript.TypeCheckStatus.Finished + 1;
        ContextualTypingContextStack.prototype.pushContextualType = function (type, provisional) {
            this.contextStack.push(new ContextualTypeContext(type, provisional, ContextualTypingContextStack.contextID++));
            this.checker.errorReporter.pushToErrorSink = provisional;
        };
        ContextualTypingContextStack.prototype.popContextualType = function () {
            var tc = this.contextStack.pop();
            this.checker.errorReporter.pushToErrorSink = this.isProvisional();
            this.hadProvisionalErrors = this.hadProvisionalErrors || (tc.provisional && (this.checker.errorReporter.getCapturedErrors().length));
            this.checker.errorReporter.freeCapturedErrors();
            return tc;
        };
        ContextualTypingContextStack.prototype.getContextualType = function () {
            return (!this.contextStack.length ? null : this.contextStack[this.contextStack.length - 1]);
        };
        ContextualTypingContextStack.prototype.getContextID = function () {
            return (!this.contextStack.length ? TypeScript.TypeCheckStatus.Finished : this.contextStack[this.contextStack.length - 1].contextID);
        };
        ContextualTypingContextStack.prototype.isProvisional = function () {
            return (!this.contextStack.length ? false : this.contextStack[this.contextStack.length - 1].provisional);
        };
        return ContextualTypingContextStack;
    })();
    TypeScript.ContextualTypingContextStack = ContextualTypingContextStack;    
    var TypeChecker = (function () {
        function TypeChecker(persistentState) {
            this.persistentState = persistentState;
            this.errorReporter = null;
            this.checkControlFlow = false;
            this.printControlFlowGraph = false;
            this.checkControlFlowUseDef = false;
            this.styleSettings = null;
            this.units = null;
            this.anon = "_anonymous";
            this.locationInfo = null;
            this.typeFlow = null;
            this.currentCompareA = null;
            this.currentCompareB = null;
            this.currentModDecl = null;
            this.inBind = false;
            this.inWith = false;
            this.errorsOnWith = true;
            this.currentContextualTypeContext = null;
            this.resolvingBases = false;
            this.canCallDefinitionSignature = false;
            this.assignableCache = {
            };
            this.subtypeCache = {
            };
            this.identicalCache = {
            };
            this.provisionalStartedTypecheckObjects = [];
            this.mustCaptureGlobalThis = false;
            this.voidType = this.persistentState.voidType;
            this.booleanType = this.persistentState.booleanType;
            this.numberType = this.persistentState.doubleType;
            this.stringType = this.persistentState.stringType;
            this.anyType = this.persistentState.anyType;
            this.nullType = this.persistentState.nullType;
            this.undefinedType = this.persistentState.undefinedType;
            this.globals = this.persistentState.dualGlobalValues;
            this.globalTypes = this.persistentState.dualGlobalTypes;
            this.ambientGlobals = this.persistentState.dualAmbientGlobalValues;
            this.ambientGlobalTypes = this.persistentState.dualAmbientGlobalTypes;
            this.gloModType = this.persistentState.mod;
            this.gloMod = this.persistentState.gloMod;
            this.wildElm = this.persistentState.wildElm;
            this.globalScope = this.persistentState.globalScope;
            this.typingContextStack = new ContextualTypingContextStack(this);
        }
        TypeChecker.prototype.setStyleOptions = function (style) {
            this.styleSettings = style;
        };
        TypeChecker.prototype.setContextualType = function (type, provisional) {
            this.typingContextStack.pushContextualType(type, provisional);
            this.currentContextualTypeContext = this.typingContextStack.getContextualType();
        };
        TypeChecker.prototype.unsetContextualType = function () {
            var lastTC = this.typingContextStack.popContextualType();
            this.currentContextualTypeContext = this.typingContextStack.getContextualType();
            return lastTC;
        };
        TypeChecker.prototype.hadProvisionalErrors = function () {
            return this.typingContextStack.hadProvisionalErrors;
        };
        TypeChecker.prototype.resetProvisionalErrors = function () {
            if(!this.typingContextStack.getContextualType()) {
                this.typingContextStack.hadProvisionalErrors = false;
            }
        };
        TypeChecker.prototype.typeCheckWithContextualType = function (contextType, provisional, condition, ast) {
            if(condition) {
                this.setContextualType(contextType, this.typingContextStack.isProvisional() || provisional);
            }
            this.typeFlow.typeCheck(ast);
            if(condition) {
                this.unsetContextualType();
            }
        };
        TypeChecker.prototype.resetTargetType = function () {
            this.currentContextualTypeContext = this.typingContextStack.getContextualType();
        };
        TypeChecker.prototype.killCurrentContextualType = function () {
            this.currentContextualTypeContext = null;
            this.errorReporter.pushToErrorSink = false;
        };
        TypeChecker.prototype.hasTargetType = function () {
            return this.currentContextualTypeContext && this.currentContextualTypeContext.contextualType;
        };
        TypeChecker.prototype.getTargetTypeContext = function () {
            return this.currentContextualTypeContext;
        };
        TypeChecker.prototype.inProvisionalTypecheckMode = function () {
            return this.typingContextStack.isProvisional();
        };
        TypeChecker.prototype.getTypeCheckFinishedStatus = function () {
            if(this.inProvisionalTypecheckMode()) {
                return this.typingContextStack.getContextID();
            }
            return TypeScript.TypeCheckStatus.Finished;
        };
        TypeChecker.prototype.typeStatusIsFinished = function (status) {
            return status == TypeScript.TypeCheckStatus.Finished || (this.inProvisionalTypecheckMode() && status == this.typingContextStack.getContextID());
        };
        TypeChecker.prototype.addStartedPTO = function (pto) {
            if(this.inProvisionalTypecheckMode()) {
                this.provisionalStartedTypecheckObjects[this.provisionalStartedTypecheckObjects.length] = pto;
            }
        };
        TypeChecker.prototype.cleanStartedPTO = function () {
            for(var i = 0; i < this.provisionalStartedTypecheckObjects.length; i++) {
                if(this.provisionalStartedTypecheckObjects[i].typeCheckStatus >= this.typingContextStack.getContextID()) {
                    this.provisionalStartedTypecheckObjects[i].typeCheckStatus = TypeScript.TypeCheckStatus.NotStarted;
                }
            }
            this.provisionalStartedTypecheckObjects = [];
        };
        TypeChecker.prototype.collectTypes = function (ast) {
            if(ast.nodeType == TypeScript.NodeType.Script) {
                var script = ast;
                this.locationInfo = script.locationInfo;
            }
            var globalChain = new TypeScript.ScopeChain(this.gloMod, null, this.globalScope);
            var context = new TypeScript.TypeCollectionContext(globalChain, this);
            TypeScript.getAstWalkerFactory().walk(ast, TypeScript.preCollectTypes, TypeScript.postCollectTypes, null, context);
        };
        TypeChecker.prototype.makeArrayType = function (type) {
            if(type.arrayCache == null) {
                type.arrayCache = new ArrayCache();
                type.arrayCache.arrayType = new TypeScript.Type();
                type.arrayCache.arrayType.elementType = type;
                type.arrayCache.arrayType.symbol = type.symbol;
            }
            return type.arrayCache.arrayType;
        };
        TypeChecker.prototype.getParameterList = function (funcDecl, container) {
            var args = funcDecl.arguments;
            var parameterTable = null;
            var parameterBuilder = null;
            var len = args.members.length;
            var nonOptionalParams = 0;
            var result = [];
            if(len > 0) {
                parameterTable = new TypeScript.ScopedMembers(new TypeScript.DualStringHashTable(new TypeScript.StringHashTable(), new TypeScript.StringHashTable()));
                parameterBuilder = new TypeScript.SymbolScopeBuilder(parameterTable, null, null, null, null, container);
                for(var i = 0; i < len; i++) {
                    var parameter = args.members[i];
                    var paramDef = new TypeScript.ValueLocation();
                    var parameterSymbol = new TypeScript.ParameterSymbol(parameter.id.text, parameter.minChar, this.locationInfo.unitIndex, paramDef);
                    parameterSymbol.declAST = parameter;
                    parameterSymbol.funcDecl = funcDecl;
                    parameter.id.sym = parameterSymbol;
                    parameter.sym = parameterSymbol;
                    paramDef.symbol = parameterSymbol;
                    paramDef.typeLink = TypeScript.getTypeLink(parameter.typeExpr, this, false);
                    parameterBuilder.enter(null, parameter, parameterSymbol, this.errorReporter, true, false, false);
                    result[result.length] = parameterSymbol;
                    if(!parameter.isOptionalArg()) {
                        nonOptionalParams++;
                    }
                }
            }
            return {
                parameters: result,
                nonOptionalParameterCount: nonOptionalParams
            };
        };
        TypeChecker.prototype.createFunctionSignature = function (funcDecl, container, scope, overloadGroupSym, addToScope) {
            var isExported = TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.Exported | TypeScript.FncFlags.ClassPropertyMethodExported) || container == this.gloMod;
            var isStatic = TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.Static);
            var isPrivate = TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.Private);
            var isDefinition = TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.Definition);
            var isAmbient = TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.Ambient);
            var isConstructor = funcDecl.isConstructMember() || funcDecl.isConstructor;
            var isGlobal = container == this.gloMod;
            var signature = new TypeScript.Signature();
            var isLambda = funcDecl.fncFlags & TypeScript.FncFlags.IsFunctionExpression;
            if(funcDecl.returnTypeAnnotation || isDefinition) {
                signature.returnType = TypeScript.getTypeLink(funcDecl.returnTypeAnnotation, this, false);
            } else {
                signature.returnType = new TypeScript.TypeLink();
                signature.returnType.type = this.anyType;
            }
            signature.hasVariableArgList = funcDecl.variableArgList;
            var sigData = this.getParameterList(funcDecl, container);
            signature.parameters = sigData.parameters;
            signature.nonOptionalParameterCount = sigData.nonOptionalParameterCount;
            funcDecl.signature = signature;
            signature.declAST = funcDecl;
            var useOverloadGroupSym = overloadGroupSym && overloadGroupSym.getType() && !overloadGroupSym.isAccessor() && (funcDecl.isSignature() || (isAmbient == TypeScript.hasFlag(overloadGroupSym.flags, TypeScript.SymbolFlags.Ambient)));
            if(useOverloadGroupSym && isPrivate != TypeScript.hasFlag(overloadGroupSym.flags, TypeScript.SymbolFlags.Private)) {
                this.errorReporter.simpleError(funcDecl, "Public/Private visibility of overloads does not agree");
            }
            var groupType = useOverloadGroupSym ? overloadGroupSym.getType() : new TypeScript.Type();
            if(isConstructor) {
                if(groupType.construct == null) {
                    groupType.construct = new TypeScript.SignatureGroup();
                }
                groupType.construct.addSignature(signature);
                groupType.construct.hasImplementation = !(funcDecl.isSignature());
                if(groupType.construct.hasImplementation) {
                    groupType.setHasImplementation();
                }
            } else {
                if(funcDecl.isIndexerMember()) {
                    if(groupType.index == null) {
                        groupType.index = new TypeScript.SignatureGroup();
                        groupType.index.flags |= TypeScript.SignatureFlags.IsIndexer;
                    }
                    groupType.index.addSignature(signature);
                    groupType.index.hasImplementation = !(funcDecl.isSignature());
                    if(groupType.index.hasImplementation) {
                        groupType.setHasImplementation();
                    }
                } else {
                    if(groupType.call == null) {
                        groupType.call = new TypeScript.SignatureGroup();
                    }
                    groupType.call.addSignature(signature);
                    groupType.call.hasImplementation = !(funcDecl.isSignature());
                    if(groupType.call.hasImplementation) {
                        groupType.setHasImplementation();
                    }
                }
            }
            var instanceType = groupType.instanceType;
            var funcName = null;
            var usedHint = false;
            if(funcDecl.name && !funcDecl.name.isMissing()) {
                funcName = funcDecl.name.text;
            } else {
                if(funcDecl.hint) {
                    funcName = funcDecl.hint;
                    usedHint = true;
                }
            }
            if(groupType.symbol == null) {
                groupType.symbol = new TypeScript.TypeSymbol(funcName ? funcName : this.anon, funcDecl.minChar, funcDecl.limChar - funcDecl.minChar, this.locationInfo.unitIndex, groupType);
                if(!useOverloadGroupSym) {
                    groupType.symbol.declAST = funcDecl;
                }
            }
            if(isStatic) {
                groupType.symbol.flags |= TypeScript.SymbolFlags.Static;
            }
            if(isAmbient) {
                groupType.symbol.flags |= TypeScript.SymbolFlags.Ambient;
            }
            if(isPrivate) {
                groupType.symbol.flags |= TypeScript.SymbolFlags.Private;
            }
            groupType.symbol.isMethod = funcDecl.isMethod();
            if(groupType.symbol.isMethod) {
                groupType.symbol.flags |= TypeScript.SymbolFlags.Property;
            }
            funcDecl.type = groupType;
            if(!isConstructor) {
                if(funcName && !isLambda && !funcDecl.isAccessor() && !usedHint) {
                    if(addToScope) {
                        if(funcDecl.isMethod() && isStatic) {
                            if(!(container).type.members.publicMembers.add(funcName, groupType.symbol)) {
                                this.errorReporter.duplicateIdentifier(funcDecl, funcName);
                            }
                            groupType.symbol.container = container;
                        } else {
                            if(overloadGroupSym == null || (overloadGroupSym.declAST && !(overloadGroupSym.declAST).isOverload && (container.isType()))) {
                                scope.enter(container, funcDecl, groupType.symbol, this.errorReporter, !isPrivate && (isExported || isStatic || isGlobal), false, isAmbient);
                            }
                        }
                    } else {
                        if(!funcDecl.isSpecialFn()) {
                            groupType.symbol.container = container;
                        }
                    }
                } else {
                    if(!funcDecl.isSpecialFn()) {
                        groupType.symbol.container = container;
                    }
                }
            }
            if(useOverloadGroupSym) {
                var overloadGroupType = overloadGroupSym ? overloadGroupSym.getType() : null;
                var classType = groupType;
                if(classType != overloadGroupType) {
                    if(classType.construct == null) {
                        if(overloadGroupType && overloadGroupType.construct) {
                            classType.construct = overloadGroupType.construct;
                        } else {
                            classType.construct = new TypeScript.SignatureGroup();
                        }
                    } else {
                        if(overloadGroupType) {
                            if(overloadGroupType.construct) {
                                classType.construct.signatures.concat(overloadGroupType.construct.signatures);
                            }
                        }
                    }
                    if(overloadGroupType) {
                        if(classType.call == null) {
                            classType.call = overloadGroupType.call;
                        } else {
                            if(overloadGroupType.call) {
                                classType.call.signatures.concat(overloadGroupType.call.signatures);
                            }
                        }
                        if(!isStatic) {
                            if(classType.instanceType == null) {
                                classType.instanceType = overloadGroupType.instanceType;
                            }
                            var instanceType = classType.instanceType;
                            if(instanceType) {
                                if(instanceType.call == null) {
                                    instanceType.call = overloadGroupType.call;
                                } else {
                                    if(overloadGroupType.call) {
                                        instanceType.call.signatures.concat(overloadGroupType.call.signatures);
                                    }
                                }
                            }
                        }
                        if(classType.index == null) {
                            classType.index = overloadGroupType.index;
                        } else {
                            if(overloadGroupType.index) {
                                classType.index.signatures.concat(overloadGroupType.index.signatures);
                            }
                        }
                    }
                }
            }
            return signature;
        };
        TypeChecker.prototype.createAccessorSymbol = function (funcDecl, fgSym, enclosingClass, addToMembers, isClassProperty, scope, container) {
            var accessorSym = null;
            var sig = funcDecl.signature;
            var nameText = funcDecl.name.text;
            var isStatic = TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.Static);
            var isPrivate = TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.Private);
            if(fgSym == null) {
                var field = new TypeScript.ValueLocation();
                accessorSym = new TypeScript.FieldSymbol(nameText, funcDecl.minChar, this.locationInfo.unitIndex, false, field);
                field.symbol = accessorSym;
                accessorSym.declAST = funcDecl;
                if(TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.GetAccessor)) {
                    if(accessorSym.getter) {
                        this.errorReporter.simpleError(funcDecl, "Redeclaration of property getter");
                    }
                    accessorSym.getter = sig.declAST.type.symbol;
                } else {
                    if(accessorSym.setter) {
                        this.errorReporter.simpleError(funcDecl, "Redeclaration of property setter");
                    }
                    accessorSym.setter = sig.declAST.type.symbol;
                }
                field.typeLink = TypeScript.getTypeLink(null, this, false);
                if(addToMembers) {
                    if(enclosingClass) {
                        if(!enclosingClass.members.publicMembers.add(nameText, accessorSym)) {
                            this.errorReporter.duplicateIdentifier(funcDecl, accessorSym.name);
                        }
                        accessorSym.container = enclosingClass.symbol;
                    } else {
                        this.errorReporter.simpleError(funcDecl, "Accessor property may not be added in this context");
                    }
                } else {
                    scope.enter(container, funcDecl, accessorSym, this.errorReporter, !isPrivate || isStatic, false, false);
                }
                if(isClassProperty) {
                    accessorSym.flags |= TypeScript.SymbolFlags.Property;
                }
                if(isStatic) {
                    accessorSym.flags |= TypeScript.SymbolFlags.Static;
                }
                if(isPrivate) {
                    accessorSym.flags |= TypeScript.SymbolFlags.Private;
                } else {
                    accessorSym.flags |= TypeScript.SymbolFlags.Public;
                }
            } else {
                accessorSym = (fgSym);
                if(isPrivate != TypeScript.hasFlag(accessorSym.flags, TypeScript.SymbolFlags.Private)) {
                    this.errorReporter.simpleError(funcDecl, "Getter and setter accessors do not agree in visibility");
                }
                if(TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.GetAccessor)) {
                    if(accessorSym.getter) {
                        this.errorReporter.simpleError(funcDecl, "Redeclaration of property getter");
                    }
                    accessorSym.getter = funcDecl.type.symbol;
                } else {
                    if(accessorSym.setter) {
                        this.errorReporter.simpleError(funcDecl, "Redeclaration of property setter");
                    }
                    accessorSym.setter = funcDecl.type.symbol;
                }
            }
            return accessorSym;
        };
        TypeChecker.prototype.addBases = function (resultScope, type, baseContext) {
            resultScope.addParentScope(new TypeScript.SymbolTableScope(type.members, type.ambientMembers, type.getAllEnclosedTypes(), type.getAllAmbientEnclosedTypes(), type.symbol));
            var i = 0;
            var parent;
            if(type.extendsList) {
                for(var len = type.extendsList.length; i < len; i++) {
                    parent = type.extendsList[i];
                    if(baseContext.baseId == parent.typeID) {
                        this.errorReporter.reportErrorFromSym(parent.symbol, "Type '" + baseContext.base + "' is recursively referenced as a base class of itself");
                        parent.symbol.flags |= TypeScript.SymbolFlags.RecursivelyReferenced;
                        break;
                    }
                    this.addBases(resultScope, parent, baseContext);
                }
            }
        };
        TypeChecker.prototype.scopeOf = function (type) {
            var resultScope = new TypeScript.SymbolAggregateScope(type.symbol);
            var baseContext = {
                base: type.symbol && type.symbol.name ? type.symbol.name : "{}",
                baseId: type.typeID
            };
            this.addBases(resultScope, type, baseContext);
            return resultScope;
        };
        TypeChecker.prototype.lookupMemberTypeSymbol = function (containingType, name) {
            var symbol = null;
            if(containingType.containedScope) {
                symbol = containingType.containedScope.find(name, false, true);
            } else {
                if(containingType.members) {
                    symbol = containingType.members.allMembers.lookup(name);
                    if(symbol == null && containingType.ambientMembers) {
                        symbol = containingType.ambientMembers.allMembers.lookup(name);
                    }
                }
            }
            if(symbol == null) {
                var typeMembers = containingType.getAllEnclosedTypes();
                var ambientTypeMembers = containingType.getAllAmbientEnclosedTypes();
                if(typeMembers) {
                    symbol = typeMembers.allMembers.lookup(name);
                    if(symbol == null && ambientTypeMembers) {
                        symbol = ambientTypeMembers.allMembers.lookup(name);
                    }
                }
            }
            if(symbol && symbol.isType()) {
                return symbol;
            } else {
                return null;
            }
        };
        TypeChecker.prototype.findSymbolForDynamicModule = function (idText, currentFileName, search) {
            var originalIdText = idText;
            var symbol = search(idText);
            if(symbol == null) {
                if(!symbol) {
                    idText = TypeScript.swapQuotes(originalIdText);
                    symbol = search(idText);
                }
                if(!symbol) {
                    idText = TypeScript.stripQuotes(originalIdText) + ".ts";
                    symbol = search(idText);
                }
                if(!symbol) {
                    idText = TypeScript.stripQuotes(originalIdText) + ".str";
                    symbol = search(idText);
                }
                if(!symbol) {
                    idText = TypeScript.stripQuotes(originalIdText) + ".d.ts";
                    symbol = search(idText);
                }
                if(!symbol) {
                    idText = TypeScript.stripQuotes(originalIdText) + ".d.str";
                    symbol = search(idText);
                }
                if(!symbol && !TypeScript.isRelative(originalIdText)) {
                    idText = originalIdText;
                    var strippedIdText = TypeScript.stripQuotes(idText);
                    var path = TypeScript.getRootFilePath(TypeScript.switchToForwardSlashes(currentFileName));
                    while(symbol == null && path != "") {
                        idText = TypeScript.normalizePath(path + strippedIdText + ".ts");
                        symbol = search(idText);
                        if(symbol == null) {
                            idText = TypeScript.changePathToSTR(idText);
                            symbol = search(idText);
                        }
                        if(symbol == null) {
                            idText = TypeScript.changePathToDTS(idText);
                            symbol = search(idText);
                        }
                        if(symbol == null) {
                            idText = TypeScript.changePathToDSTR(idText);
                            symbol = search(idText);
                        }
                        if(symbol == null) {
                            if(path === '/') {
                                path = '';
                            } else {
                                path = TypeScript.normalizePath(path + "..");
                                path = path && path != '/' ? path + '/' : path;
                            }
                        }
                    }
                }
            }
            return symbol;
        };
        TypeChecker.prototype.resolveTypeMember = function (scope, dotNode) {
            var lhs = dotNode.operand1;
            var rhs = dotNode.operand2;
            var resultType = this.anyType;
            var lhsType = this.anyType;
            if(lhs && rhs && (rhs.nodeType == TypeScript.NodeType.Name)) {
                if(lhs.nodeType == TypeScript.NodeType.Dot) {
                }
