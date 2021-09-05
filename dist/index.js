/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 7351:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issue = exports.issueCommand = void 0;
const os = __importStar(__nccwpck_require__(2087));
const utils_1 = __nccwpck_require__(5278);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 2186:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.notice = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
const command_1 = __nccwpck_require__(7351);
const file_command_1 = __nccwpck_require__(717);
const utils_1 = __nccwpck_require__(5278);
const os = __importStar(__nccwpck_require__(2087));
const path = __importStar(__nccwpck_require__(5622));
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        const delimiter = '_GitHubActionsFileCommandDelimeter_';
        const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        file_command_1.issueCommand('ENV', commandValue);
    }
    else {
        command_1.issueCommand('set-env', { name }, convertedVal);
    }
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        file_command_1.issueCommand('PATH', inputPath);
    }
    else {
        command_1.issueCommand('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.
 * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
 * Returns an empty string if the value is not defined.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    if (options && options.trimWhitespace === false) {
        return val;
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Gets the values of an multiline input.  Each value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string[]
 *
 */
function getMultilineInput(name, options) {
    const inputs = getInput(name, options)
        .split('\n')
        .filter(x => x !== '');
    return inputs;
}
exports.getMultilineInput = getMultilineInput;
/**
 * Gets the input value of the boolean type in the YAML 1.2 "core schema" specification.
 * Support boolean input list: `true | True | TRUE | false | False | FALSE` .
 * The return value is also in boolean type.
 * ref: https://yaml.org/spec/1.2/spec.html#id2804923
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   boolean
 */
function getBooleanInput(name, options) {
    const trueValue = ['true', 'True', 'TRUE'];
    const falseValue = ['false', 'False', 'FALSE'];
    const val = getInput(name, options);
    if (trueValue.includes(val))
        return true;
    if (falseValue.includes(val))
        return false;
    throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` +
        `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
}
exports.getBooleanInput = getBooleanInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    process.stdout.write(os.EOL);
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function error(message, properties = {}) {
    command_1.issueCommand('error', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds a warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function warning(message, properties = {}) {
    command_1.issueCommand('warning', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Adds a notice issue
 * @param message notice issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function notice(message, properties = {}) {
    command_1.issueCommand('notice', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.notice = notice;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 717:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

// For internal use, subject to change.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issueCommand = void 0;
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__nccwpck_require__(5747));
const os = __importStar(__nccwpck_require__(2087));
const utils_1 = __nccwpck_require__(5278);
function issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
exports.issueCommand = issueCommand;
//# sourceMappingURL=file-command.js.map

/***/ }),

/***/ 5278:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toCommandProperties = exports.toCommandValue = void 0;
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
/**
 *
 * @param annotationProperties
 * @returns The command properties to send with the actual annotation command
 * See IssueCommandProperties: https://github.com/actions/runner/blob/main/src/Runner.Worker/ActionCommandManager.cs#L646
 */
function toCommandProperties(annotationProperties) {
    if (!Object.keys(annotationProperties).length) {
        return {};
    }
    return {
        title: annotationProperties.title,
        line: annotationProperties.startLine,
        endLine: annotationProperties.endLine,
        col: annotationProperties.startColumn,
        endColumn: annotationProperties.endColumn
    };
}
exports.toCommandProperties = toCommandProperties;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 2426:
/***/ ((module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = void 0;
const core_1 = __nccwpck_require__(2685);
const draft7_1 = __nccwpck_require__(691);
const discriminator_1 = __nccwpck_require__(4025);
const draft7MetaSchema = __nccwpck_require__(278);
const META_SUPPORT_DATA = ["/properties"];
const META_SCHEMA_ID = "http://json-schema.org/draft-07/schema";
class Ajv extends core_1.default {
    _addVocabularies() {
        super._addVocabularies();
        draft7_1.default.forEach((v) => this.addVocabulary(v));
        if (this.opts.discriminator)
            this.addKeyword(discriminator_1.default);
    }
    _addDefaultMetaSchema() {
        super._addDefaultMetaSchema();
        if (!this.opts.meta)
            return;
        const metaSchema = this.opts.$data
            ? this.$dataMetaSchema(draft7MetaSchema, META_SUPPORT_DATA)
            : draft7MetaSchema;
        this.addMetaSchema(metaSchema, META_SCHEMA_ID, false);
        this.refs["http://json-schema.org/schema"] = META_SCHEMA_ID;
    }
    defaultMeta() {
        return (this.opts.defaultMeta =
            super.defaultMeta() || (this.getSchema(META_SCHEMA_ID) ? META_SCHEMA_ID : undefined));
    }
}
module.exports = exports = Ajv;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.default = Ajv;
var validate_1 = __nccwpck_require__(8955);
Object.defineProperty(exports, "KeywordCxt", ({ enumerable: true, get: function () { return validate_1.KeywordCxt; } }));
var codegen_1 = __nccwpck_require__(9179);
Object.defineProperty(exports, "_", ({ enumerable: true, get: function () { return codegen_1._; } }));
Object.defineProperty(exports, "str", ({ enumerable: true, get: function () { return codegen_1.str; } }));
Object.defineProperty(exports, "stringify", ({ enumerable: true, get: function () { return codegen_1.stringify; } }));
Object.defineProperty(exports, "nil", ({ enumerable: true, get: function () { return codegen_1.nil; } }));
Object.defineProperty(exports, "Name", ({ enumerable: true, get: function () { return codegen_1.Name; } }));
Object.defineProperty(exports, "CodeGen", ({ enumerable: true, get: function () { return codegen_1.CodeGen; } }));
//# sourceMappingURL=ajv.js.map

/***/ }),

/***/ 8358:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.regexpCode = exports.getProperty = exports.safeStringify = exports.stringify = exports.strConcat = exports.addCodeArg = exports.str = exports._ = exports.nil = exports._Code = exports.Name = exports.IDENTIFIER = exports._CodeOrName = void 0;
class _CodeOrName {
}
exports._CodeOrName = _CodeOrName;
exports.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
class Name extends _CodeOrName {
    constructor(s) {
        super();
        if (!exports.IDENTIFIER.test(s))
            throw new Error("CodeGen: name must be a valid identifier");
        this.str = s;
    }
    toString() {
        return this.str;
    }
    emptyStr() {
        return false;
    }
    get names() {
        return { [this.str]: 1 };
    }
}
exports.Name = Name;
class _Code extends _CodeOrName {
    constructor(code) {
        super();
        this._items = typeof code === "string" ? [code] : code;
    }
    toString() {
        return this.str;
    }
    emptyStr() {
        if (this._items.length > 1)
            return false;
        const item = this._items[0];
        return item === "" || item === '""';
    }
    get str() {
        var _a;
        return ((_a = this._str) !== null && _a !== void 0 ? _a : (this._str = this._items.reduce((s, c) => `${s}${c}`, "")));
    }
    get names() {
        var _a;
        return ((_a = this._names) !== null && _a !== void 0 ? _a : (this._names = this._items.reduce((names, c) => {
            if (c instanceof Name)
                names[c.str] = (names[c.str] || 0) + 1;
            return names;
        }, {})));
    }
}
exports._Code = _Code;
exports.nil = new _Code("");
function _(strs, ...args) {
    const code = [strs[0]];
    let i = 0;
    while (i < args.length) {
        addCodeArg(code, args[i]);
        code.push(strs[++i]);
    }
    return new _Code(code);
}
exports._ = _;
const plus = new _Code("+");
function str(strs, ...args) {
    const expr = [safeStringify(strs[0])];
    let i = 0;
    while (i < args.length) {
        expr.push(plus);
        addCodeArg(expr, args[i]);
        expr.push(plus, safeStringify(strs[++i]));
    }
    optimize(expr);
    return new _Code(expr);
}
exports.str = str;
function addCodeArg(code, arg) {
    if (arg instanceof _Code)
        code.push(...arg._items);
    else if (arg instanceof Name)
        code.push(arg);
    else
        code.push(interpolate(arg));
}
exports.addCodeArg = addCodeArg;
function optimize(expr) {
    let i = 1;
    while (i < expr.length - 1) {
        if (expr[i] === plus) {
            const res = mergeExprItems(expr[i - 1], expr[i + 1]);
            if (res !== undefined) {
                expr.splice(i - 1, 3, res);
                continue;
            }
            expr[i++] = "+";
        }
        i++;
    }
}
function mergeExprItems(a, b) {
    if (b === '""')
        return a;
    if (a === '""')
        return b;
    if (typeof a == "string") {
        if (b instanceof Name || a[a.length - 1] !== '"')
            return;
        if (typeof b != "string")
            return `${a.slice(0, -1)}${b}"`;
        if (b[0] === '"')
            return a.slice(0, -1) + b.slice(1);
        return;
    }
    if (typeof b == "string" && b[0] === '"' && !(a instanceof Name))
        return `"${a}${b.slice(1)}`;
    return;
}
function strConcat(c1, c2) {
    return c2.emptyStr() ? c1 : c1.emptyStr() ? c2 : str `${c1}${c2}`;
}
exports.strConcat = strConcat;
// TODO do not allow arrays here
function interpolate(x) {
    return typeof x == "number" || typeof x == "boolean" || x === null
        ? x
        : safeStringify(Array.isArray(x) ? x.join(",") : x);
}
function stringify(x) {
    return new _Code(safeStringify(x));
}
exports.stringify = stringify;
function safeStringify(x) {
    return JSON.stringify(x)
        .replace(/\u2028/g, "\\u2028")
        .replace(/\u2029/g, "\\u2029");
}
exports.safeStringify = safeStringify;
function getProperty(key) {
    return typeof key == "string" && exports.IDENTIFIER.test(key) ? new _Code(`.${key}`) : _ `[${key}]`;
}
exports.getProperty = getProperty;
function regexpCode(rx) {
    return new _Code(rx.toString());
}
exports.regexpCode = regexpCode;
//# sourceMappingURL=code.js.map

/***/ }),

/***/ 9179:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.or = exports.and = exports.not = exports.CodeGen = exports.operators = exports.varKinds = exports.ValueScopeName = exports.ValueScope = exports.Scope = exports.Name = exports.regexpCode = exports.stringify = exports.getProperty = exports.nil = exports.strConcat = exports.str = exports._ = void 0;
const code_1 = __nccwpck_require__(8358);
const scope_1 = __nccwpck_require__(2893);
var code_2 = __nccwpck_require__(8358);
Object.defineProperty(exports, "_", ({ enumerable: true, get: function () { return code_2._; } }));
Object.defineProperty(exports, "str", ({ enumerable: true, get: function () { return code_2.str; } }));
Object.defineProperty(exports, "strConcat", ({ enumerable: true, get: function () { return code_2.strConcat; } }));
Object.defineProperty(exports, "nil", ({ enumerable: true, get: function () { return code_2.nil; } }));
Object.defineProperty(exports, "getProperty", ({ enumerable: true, get: function () { return code_2.getProperty; } }));
Object.defineProperty(exports, "stringify", ({ enumerable: true, get: function () { return code_2.stringify; } }));
Object.defineProperty(exports, "regexpCode", ({ enumerable: true, get: function () { return code_2.regexpCode; } }));
Object.defineProperty(exports, "Name", ({ enumerable: true, get: function () { return code_2.Name; } }));
var scope_2 = __nccwpck_require__(2893);
Object.defineProperty(exports, "Scope", ({ enumerable: true, get: function () { return scope_2.Scope; } }));
Object.defineProperty(exports, "ValueScope", ({ enumerable: true, get: function () { return scope_2.ValueScope; } }));
Object.defineProperty(exports, "ValueScopeName", ({ enumerable: true, get: function () { return scope_2.ValueScopeName; } }));
Object.defineProperty(exports, "varKinds", ({ enumerable: true, get: function () { return scope_2.varKinds; } }));
exports.operators = {
    GT: new code_1._Code(">"),
    GTE: new code_1._Code(">="),
    LT: new code_1._Code("<"),
    LTE: new code_1._Code("<="),
    EQ: new code_1._Code("==="),
    NEQ: new code_1._Code("!=="),
    NOT: new code_1._Code("!"),
    OR: new code_1._Code("||"),
    AND: new code_1._Code("&&"),
    ADD: new code_1._Code("+"),
};
class Node {
    optimizeNodes() {
        return this;
    }
    optimizeNames(_names, _constants) {
        return this;
    }
}
class Def extends Node {
    constructor(varKind, name, rhs) {
        super();
        this.varKind = varKind;
        this.name = name;
        this.rhs = rhs;
    }
    render({ es5, _n }) {
        const varKind = es5 ? scope_1.varKinds.var : this.varKind;
        const rhs = this.rhs === undefined ? "" : ` = ${this.rhs}`;
        return `${varKind} ${this.name}${rhs};` + _n;
    }
    optimizeNames(names, constants) {
        if (!names[this.name.str])
            return;
        if (this.rhs)
            this.rhs = optimizeExpr(this.rhs, names, constants);
        return this;
    }
    get names() {
        return this.rhs instanceof code_1._CodeOrName ? this.rhs.names : {};
    }
}
class Assign extends Node {
    constructor(lhs, rhs, sideEffects) {
        super();
        this.lhs = lhs;
        this.rhs = rhs;
        this.sideEffects = sideEffects;
    }
    render({ _n }) {
        return `${this.lhs} = ${this.rhs};` + _n;
    }
    optimizeNames(names, constants) {
        if (this.lhs instanceof code_1.Name && !names[this.lhs.str] && !this.sideEffects)
            return;
        this.rhs = optimizeExpr(this.rhs, names, constants);
        return this;
    }
    get names() {
        const names = this.lhs instanceof code_1.Name ? {} : { ...this.lhs.names };
        return addExprNames(names, this.rhs);
    }
}
class AssignOp extends Assign {
    constructor(lhs, op, rhs, sideEffects) {
        super(lhs, rhs, sideEffects);
        this.op = op;
    }
    render({ _n }) {
        return `${this.lhs} ${this.op}= ${this.rhs};` + _n;
    }
}
class Label extends Node {
    constructor(label) {
        super();
        this.label = label;
        this.names = {};
    }
    render({ _n }) {
        return `${this.label}:` + _n;
    }
}
class Break extends Node {
    constructor(label) {
        super();
        this.label = label;
        this.names = {};
    }
    render({ _n }) {
        const label = this.label ? ` ${this.label}` : "";
        return `break${label};` + _n;
    }
}
class Throw extends Node {
    constructor(error) {
        super();
        this.error = error;
    }
    render({ _n }) {
        return `throw ${this.error};` + _n;
    }
    get names() {
        return this.error.names;
    }
}
class AnyCode extends Node {
    constructor(code) {
        super();
        this.code = code;
    }
    render({ _n }) {
        return `${this.code};` + _n;
    }
    optimizeNodes() {
        return `${this.code}` ? this : undefined;
    }
    optimizeNames(names, constants) {
        this.code = optimizeExpr(this.code, names, constants);
        return this;
    }
    get names() {
        return this.code instanceof code_1._CodeOrName ? this.code.names : {};
    }
}
class ParentNode extends Node {
    constructor(nodes = []) {
        super();
        this.nodes = nodes;
    }
    render(opts) {
        return this.nodes.reduce((code, n) => code + n.render(opts), "");
    }
    optimizeNodes() {
        const { nodes } = this;
        let i = nodes.length;
        while (i--) {
            const n = nodes[i].optimizeNodes();
            if (Array.isArray(n))
                nodes.splice(i, 1, ...n);
            else if (n)
                nodes[i] = n;
            else
                nodes.splice(i, 1);
        }
        return nodes.length > 0 ? this : undefined;
    }
    optimizeNames(names, constants) {
        const { nodes } = this;
        let i = nodes.length;
        while (i--) {
            // iterating backwards improves 1-pass optimization
            const n = nodes[i];
            if (n.optimizeNames(names, constants))
                continue;
            subtractNames(names, n.names);
            nodes.splice(i, 1);
        }
        return nodes.length > 0 ? this : undefined;
    }
    get names() {
        return this.nodes.reduce((names, n) => addNames(names, n.names), {});
    }
}
class BlockNode extends ParentNode {
    render(opts) {
        return "{" + opts._n + super.render(opts) + "}" + opts._n;
    }
}
class Root extends ParentNode {
}
class Else extends BlockNode {
}
Else.kind = "else";
class If extends BlockNode {
    constructor(condition, nodes) {
        super(nodes);
        this.condition = condition;
    }
    render(opts) {
        let code = `if(${this.condition})` + super.render(opts);
        if (this.else)
            code += "else " + this.else.render(opts);
        return code;
    }
    optimizeNodes() {
        super.optimizeNodes();
        const cond = this.condition;
        if (cond === true)
            return this.nodes; // else is ignored here
        let e = this.else;
        if (e) {
            const ns = e.optimizeNodes();
            e = this.else = Array.isArray(ns) ? new Else(ns) : ns;
        }
        if (e) {
            if (cond === false)
                return e instanceof If ? e : e.nodes;
            if (this.nodes.length)
                return this;
            return new If(not(cond), e instanceof If ? [e] : e.nodes);
        }
        if (cond === false || !this.nodes.length)
            return undefined;
        return this;
    }
    optimizeNames(names, constants) {
        var _a;
        this.else = (_a = this.else) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants);
        if (!(super.optimizeNames(names, constants) || this.else))
            return;
        this.condition = optimizeExpr(this.condition, names, constants);
        return this;
    }
    get names() {
        const names = super.names;
        addExprNames(names, this.condition);
        if (this.else)
            addNames(names, this.else.names);
        return names;
    }
}
If.kind = "if";
class For extends BlockNode {
}
For.kind = "for";
class ForLoop extends For {
    constructor(iteration) {
        super();
        this.iteration = iteration;
    }
    render(opts) {
        return `for(${this.iteration})` + super.render(opts);
    }
    optimizeNames(names, constants) {
        if (!super.optimizeNames(names, constants))
            return;
        this.iteration = optimizeExpr(this.iteration, names, constants);
        return this;
    }
    get names() {
        return addNames(super.names, this.iteration.names);
    }
}
class ForRange extends For {
    constructor(varKind, name, from, to) {
        super();
        this.varKind = varKind;
        this.name = name;
        this.from = from;
        this.to = to;
    }
    render(opts) {
        const varKind = opts.es5 ? scope_1.varKinds.var : this.varKind;
        const { name, from, to } = this;
        return `for(${varKind} ${name}=${from}; ${name}<${to}; ${name}++)` + super.render(opts);
    }
    get names() {
        const names = addExprNames(super.names, this.from);
        return addExprNames(names, this.to);
    }
}
class ForIter extends For {
    constructor(loop, varKind, name, iterable) {
        super();
        this.loop = loop;
        this.varKind = varKind;
        this.name = name;
        this.iterable = iterable;
    }
    render(opts) {
        return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(opts);
    }
    optimizeNames(names, constants) {
        if (!super.optimizeNames(names, constants))
            return;
        this.iterable = optimizeExpr(this.iterable, names, constants);
        return this;
    }
    get names() {
        return addNames(super.names, this.iterable.names);
    }
}
class Func extends BlockNode {
    constructor(name, args, async) {
        super();
        this.name = name;
        this.args = args;
        this.async = async;
    }
    render(opts) {
        const _async = this.async ? "async " : "";
        return `${_async}function ${this.name}(${this.args})` + super.render(opts);
    }
}
Func.kind = "func";
class Return extends ParentNode {
    render(opts) {
        return "return " + super.render(opts);
    }
}
Return.kind = "return";
class Try extends BlockNode {
    render(opts) {
        let code = "try" + super.render(opts);
        if (this.catch)
            code += this.catch.render(opts);
        if (this.finally)
            code += this.finally.render(opts);
        return code;
    }
    optimizeNodes() {
        var _a, _b;
        super.optimizeNodes();
        (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNodes();
        (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNodes();
        return this;
    }
    optimizeNames(names, constants) {
        var _a, _b;
        super.optimizeNames(names, constants);
        (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants);
        (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNames(names, constants);
        return this;
    }
    get names() {
        const names = super.names;
        if (this.catch)
            addNames(names, this.catch.names);
        if (this.finally)
            addNames(names, this.finally.names);
        return names;
    }
}
class Catch extends BlockNode {
    constructor(error) {
        super();
        this.error = error;
    }
    render(opts) {
        return `catch(${this.error})` + super.render(opts);
    }
}
Catch.kind = "catch";
class Finally extends BlockNode {
    render(opts) {
        return "finally" + super.render(opts);
    }
}
Finally.kind = "finally";
class CodeGen {
    constructor(extScope, opts = {}) {
        this._values = {};
        this._blockStarts = [];
        this._constants = {};
        this.opts = { ...opts, _n: opts.lines ? "\n" : "" };
        this._extScope = extScope;
        this._scope = new scope_1.Scope({ parent: extScope });
        this._nodes = [new Root()];
    }
    toString() {
        return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(prefix) {
        return this._scope.name(prefix);
    }
    // reserves unique name in the external scope
    scopeName(prefix) {
        return this._extScope.name(prefix);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(prefixOrName, value) {
        const name = this._extScope.value(prefixOrName, value);
        const vs = this._values[name.prefix] || (this._values[name.prefix] = new Set());
        vs.add(name);
        return name;
    }
    getScopeValue(prefix, keyOrRef) {
        return this._extScope.getValue(prefix, keyOrRef);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(scopeName) {
        return this._extScope.scopeRefs(scopeName, this._values);
    }
    scopeCode() {
        return this._extScope.scopeCode(this._values);
    }
    _def(varKind, nameOrPrefix, rhs, constant) {
        const name = this._scope.toName(nameOrPrefix);
        if (rhs !== undefined && constant)
            this._constants[name.str] = rhs;
        this._leafNode(new Def(varKind, name, rhs));
        return name;
    }
    // `const` declaration (`var` in es5 mode)
    const(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.const, nameOrPrefix, rhs, _constant);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.let, nameOrPrefix, rhs, _constant);
    }
    // `var` declaration with optional assignment
    var(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.var, nameOrPrefix, rhs, _constant);
    }
    // assignment code
    assign(lhs, rhs, sideEffects) {
        return this._leafNode(new Assign(lhs, rhs, sideEffects));
    }
    // `+=` code
    add(lhs, rhs) {
        return this._leafNode(new AssignOp(lhs, exports.operators.ADD, rhs));
    }
    // appends passed SafeExpr to code or executes Block
    code(c) {
        if (typeof c == "function")
            c();
        else if (c !== code_1.nil)
            this._leafNode(new AnyCode(c));
        return this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...keyValues) {
        const code = ["{"];
        for (const [key, value] of keyValues) {
            if (code.length > 1)
                code.push(",");
            code.push(key);
            if (key !== value || this.opts.es5) {
                code.push(":");
                code_1.addCodeArg(code, value);
            }
        }
        code.push("}");
        return new code_1._Code(code);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(condition, thenBody, elseBody) {
        this._blockNode(new If(condition));
        if (thenBody && elseBody) {
            this.code(thenBody).else().code(elseBody).endIf();
        }
        else if (thenBody) {
            this.code(thenBody).endIf();
        }
        else if (elseBody) {
            throw new Error('CodeGen: "else" body without "then" body');
        }
        return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(condition) {
        return this._elseNode(new If(condition));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
        return this._elseNode(new Else());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
        return this._endBlockNode(If, Else);
    }
    _for(node, forBody) {
        this._blockNode(node);
        if (forBody)
            this.code(forBody).endFor();
        return this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(iteration, forBody) {
        return this._for(new ForLoop(iteration), forBody);
    }
    // `for` statement for a range of values
    forRange(nameOrPrefix, from, to, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.let) {
        const name = this._scope.toName(nameOrPrefix);
        return this._for(new ForRange(varKind, name, from, to), () => forBody(name));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(nameOrPrefix, iterable, forBody, varKind = scope_1.varKinds.const) {
        const name = this._scope.toName(nameOrPrefix);
        if (this.opts.es5) {
            const arr = iterable instanceof code_1.Name ? iterable : this.var("_arr", iterable);
            return this.forRange("_i", 0, code_1._ `${arr}.length`, (i) => {
                this.var(name, code_1._ `${arr}[${i}]`);
                forBody(name);
            });
        }
        return this._for(new ForIter("of", varKind, name, iterable), () => forBody(name));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(nameOrPrefix, obj, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.const) {
        if (this.opts.ownProperties) {
            return this.forOf(nameOrPrefix, code_1._ `Object.keys(${obj})`, forBody);
        }
        const name = this._scope.toName(nameOrPrefix);
        return this._for(new ForIter("in", varKind, name, obj), () => forBody(name));
    }
    // end `for` loop
    endFor() {
        return this._endBlockNode(For);
    }
    // `label` statement
    label(label) {
        return this._leafNode(new Label(label));
    }
    // `break` statement
    break(label) {
        return this._leafNode(new Break(label));
    }
    // `return` statement
    return(value) {
        const node = new Return();
        this._blockNode(node);
        this.code(value);
        if (node.nodes.length !== 1)
            throw new Error('CodeGen: "return" should have one node');
        return this._endBlockNode(Return);
    }
    // `try` statement
    try(tryBody, catchCode, finallyCode) {
        if (!catchCode && !finallyCode)
            throw new Error('CodeGen: "try" without "catch" and "finally"');
        const node = new Try();
        this._blockNode(node);
        this.code(tryBody);
        if (catchCode) {
            const error = this.name("e");
            this._currNode = node.catch = new Catch(error);
            catchCode(error);
        }
        if (finallyCode) {
            this._currNode = node.finally = new Finally();
            this.code(finallyCode);
        }
        return this._endBlockNode(Catch, Finally);
    }
    // `throw` statement
    throw(error) {
        return this._leafNode(new Throw(error));
    }
    // start self-balancing block
    block(body, nodeCount) {
        this._blockStarts.push(this._nodes.length);
        if (body)
            this.code(body).endBlock(nodeCount);
        return this;
    }
    // end the current self-balancing block
    endBlock(nodeCount) {
        const len = this._blockStarts.pop();
        if (len === undefined)
            throw new Error("CodeGen: not in self-balancing block");
        const toClose = this._nodes.length - len;
        if (toClose < 0 || (nodeCount !== undefined && toClose !== nodeCount)) {
            throw new Error(`CodeGen: wrong number of nodes: ${toClose} vs ${nodeCount} expected`);
        }
        this._nodes.length = len;
        return this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(name, args = code_1.nil, async, funcBody) {
        this._blockNode(new Func(name, args, async));
        if (funcBody)
            this.code(funcBody).endFunc();
        return this;
    }
    // end function definition
    endFunc() {
        return this._endBlockNode(Func);
    }
    optimize(n = 1) {
        while (n-- > 0) {
            this._root.optimizeNodes();
            this._root.optimizeNames(this._root.names, this._constants);
        }
    }
    _leafNode(node) {
        this._currNode.nodes.push(node);
        return this;
    }
    _blockNode(node) {
        this._currNode.nodes.push(node);
        this._nodes.push(node);
    }
    _endBlockNode(N1, N2) {
        const n = this._currNode;
        if (n instanceof N1 || (N2 && n instanceof N2)) {
            this._nodes.pop();
            return this;
        }
        throw new Error(`CodeGen: not in block "${N2 ? `${N1.kind}/${N2.kind}` : N1.kind}"`);
    }
    _elseNode(node) {
        const n = this._currNode;
        if (!(n instanceof If)) {
            throw new Error('CodeGen: "else" without "if"');
        }
        this._currNode = n.else = node;
        return this;
    }
    get _root() {
        return this._nodes[0];
    }
    get _currNode() {
        const ns = this._nodes;
        return ns[ns.length - 1];
    }
    set _currNode(node) {
        const ns = this._nodes;
        ns[ns.length - 1] = node;
    }
}
exports.CodeGen = CodeGen;
function addNames(names, from) {
    for (const n in from)
        names[n] = (names[n] || 0) + (from[n] || 0);
    return names;
}
function addExprNames(names, from) {
    return from instanceof code_1._CodeOrName ? addNames(names, from.names) : names;
}
function optimizeExpr(expr, names, constants) {
    if (expr instanceof code_1.Name)
        return replaceName(expr);
    if (!canOptimize(expr))
        return expr;
    return new code_1._Code(expr._items.reduce((items, c) => {
        if (c instanceof code_1.Name)
            c = replaceName(c);
        if (c instanceof code_1._Code)
            items.push(...c._items);
        else
            items.push(c);
        return items;
    }, []));
    function replaceName(n) {
        const c = constants[n.str];
        if (c === undefined || names[n.str] !== 1)
            return n;
        delete names[n.str];
        return c;
    }
    function canOptimize(e) {
        return (e instanceof code_1._Code &&
            e._items.some((c) => c instanceof code_1.Name && names[c.str] === 1 && constants[c.str] !== undefined));
    }
}
function subtractNames(names, from) {
    for (const n in from)
        names[n] = (names[n] || 0) - (from[n] || 0);
}
function not(x) {
    return typeof x == "boolean" || typeof x == "number" || x === null ? !x : code_1._ `!${par(x)}`;
}
exports.not = not;
const andCode = mappend(exports.operators.AND);
// boolean AND (&&) expression with the passed arguments
function and(...args) {
    return args.reduce(andCode);
}
exports.and = and;
const orCode = mappend(exports.operators.OR);
// boolean OR (||) expression with the passed arguments
function or(...args) {
    return args.reduce(orCode);
}
exports.or = or;
function mappend(op) {
    return (x, y) => (x === code_1.nil ? y : y === code_1.nil ? x : code_1._ `${par(x)} ${op} ${par(y)}`);
}
function par(x) {
    return x instanceof code_1.Name ? x : code_1._ `(${x})`;
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 2893:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ValueScope = exports.ValueScopeName = exports.Scope = exports.varKinds = exports.UsedValueState = void 0;
const code_1 = __nccwpck_require__(8358);
class ValueError extends Error {
    constructor(name) {
        super(`CodeGen: "code" for ${name} not defined`);
        this.value = name.value;
    }
}
var UsedValueState;
(function (UsedValueState) {
    UsedValueState[UsedValueState["Started"] = 0] = "Started";
    UsedValueState[UsedValueState["Completed"] = 1] = "Completed";
})(UsedValueState = exports.UsedValueState || (exports.UsedValueState = {}));
exports.varKinds = {
    const: new code_1.Name("const"),
    let: new code_1.Name("let"),
    var: new code_1.Name("var"),
};
class Scope {
    constructor({ prefixes, parent } = {}) {
        this._names = {};
        this._prefixes = prefixes;
        this._parent = parent;
    }
    toName(nameOrPrefix) {
        return nameOrPrefix instanceof code_1.Name ? nameOrPrefix : this.name(nameOrPrefix);
    }
    name(prefix) {
        return new code_1.Name(this._newName(prefix));
    }
    _newName(prefix) {
        const ng = this._names[prefix] || this._nameGroup(prefix);
        return `${prefix}${ng.index++}`;
    }
    _nameGroup(prefix) {
        var _a, _b;
        if (((_b = (_a = this._parent) === null || _a === void 0 ? void 0 : _a._prefixes) === null || _b === void 0 ? void 0 : _b.has(prefix)) || (this._prefixes && !this._prefixes.has(prefix))) {
            throw new Error(`CodeGen: prefix "${prefix}" is not allowed in this scope`);
        }
        return (this._names[prefix] = { prefix, index: 0 });
    }
}
exports.Scope = Scope;
class ValueScopeName extends code_1.Name {
    constructor(prefix, nameStr) {
        super(nameStr);
        this.prefix = prefix;
    }
    setValue(value, { property, itemIndex }) {
        this.value = value;
        this.scopePath = code_1._ `.${new code_1.Name(property)}[${itemIndex}]`;
    }
}
exports.ValueScopeName = ValueScopeName;
const line = code_1._ `\n`;
class ValueScope extends Scope {
    constructor(opts) {
        super(opts);
        this._values = {};
        this._scope = opts.scope;
        this.opts = { ...opts, _n: opts.lines ? line : code_1.nil };
    }
    get() {
        return this._scope;
    }
    name(prefix) {
        return new ValueScopeName(prefix, this._newName(prefix));
    }
    value(nameOrPrefix, value) {
        var _a;
        if (value.ref === undefined)
            throw new Error("CodeGen: ref must be passed in value");
        const name = this.toName(nameOrPrefix);
        const { prefix } = name;
        const valueKey = (_a = value.key) !== null && _a !== void 0 ? _a : value.ref;
        let vs = this._values[prefix];
        if (vs) {
            const _name = vs.get(valueKey);
            if (_name)
                return _name;
        }
        else {
            vs = this._values[prefix] = new Map();
        }
        vs.set(valueKey, name);
        const s = this._scope[prefix] || (this._scope[prefix] = []);
        const itemIndex = s.length;
        s[itemIndex] = value.ref;
        name.setValue(value, { property: prefix, itemIndex });
        return name;
    }
    getValue(prefix, keyOrRef) {
        const vs = this._values[prefix];
        if (!vs)
            return;
        return vs.get(keyOrRef);
    }
    scopeRefs(scopeName, values = this._values) {
        return this._reduceValues(values, (name) => {
            if (name.scopePath === undefined)
                throw new Error(`CodeGen: name "${name}" has no value`);
            return code_1._ `${scopeName}${name.scopePath}`;
        });
    }
    scopeCode(values = this._values, usedValues, getCode) {
        return this._reduceValues(values, (name) => {
            if (name.value === undefined)
                throw new Error(`CodeGen: name "${name}" has no value`);
            return name.value.code;
        }, usedValues, getCode);
    }
    _reduceValues(values, valueCode, usedValues = {}, getCode) {
        let code = code_1.nil;
        for (const prefix in values) {
            const vs = values[prefix];
            if (!vs)
                continue;
            const nameSet = (usedValues[prefix] = usedValues[prefix] || new Map());
            vs.forEach((name) => {
                if (nameSet.has(name))
                    return;
                nameSet.set(name, UsedValueState.Started);
                let c = valueCode(name);
                if (c) {
                    const def = this.opts.es5 ? exports.varKinds.var : exports.varKinds.const;
                    code = code_1._ `${code}${def} ${name} = ${c};${this.opts._n}`;
                }
                else if ((c = getCode === null || getCode === void 0 ? void 0 : getCode(name))) {
                    code = code_1._ `${code}${c}${this.opts._n}`;
                }
                else {
                    throw new ValueError(name);
                }
                nameSet.set(name, UsedValueState.Completed);
            });
        }
        return code;
    }
}
exports.ValueScope = ValueScope;
//# sourceMappingURL=scope.js.map

/***/ }),

/***/ 6150:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.extendErrors = exports.resetErrorsCount = exports.reportExtraError = exports.reportError = exports.keyword$DataError = exports.keywordError = void 0;
const codegen_1 = __nccwpck_require__(9179);
const util_1 = __nccwpck_require__(3439);
const names_1 = __nccwpck_require__(50);
exports.keywordError = {
    message: ({ keyword }) => codegen_1.str `must pass "${keyword}" keyword validation`,
};
exports.keyword$DataError = {
    message: ({ keyword, schemaType }) => schemaType
        ? codegen_1.str `"${keyword}" keyword must be ${schemaType} ($data)`
        : codegen_1.str `"${keyword}" keyword is invalid ($data)`,
};
function reportError(cxt, error = exports.keywordError, errorPaths, overrideAllErrors) {
    const { it } = cxt;
    const { gen, compositeRule, allErrors } = it;
    const errObj = errorObjectCode(cxt, error, errorPaths);
    if (overrideAllErrors !== null && overrideAllErrors !== void 0 ? overrideAllErrors : (compositeRule || allErrors)) {
        addError(gen, errObj);
    }
    else {
        returnErrors(it, codegen_1._ `[${errObj}]`);
    }
}
exports.reportError = reportError;
function reportExtraError(cxt, error = exports.keywordError, errorPaths) {
    const { it } = cxt;
    const { gen, compositeRule, allErrors } = it;
    const errObj = errorObjectCode(cxt, error, errorPaths);
    addError(gen, errObj);
    if (!(compositeRule || allErrors)) {
        returnErrors(it, names_1.default.vErrors);
    }
}
exports.reportExtraError = reportExtraError;
function resetErrorsCount(gen, errsCount) {
    gen.assign(names_1.default.errors, errsCount);
    gen.if(codegen_1._ `${names_1.default.vErrors} !== null`, () => gen.if(errsCount, () => gen.assign(codegen_1._ `${names_1.default.vErrors}.length`, errsCount), () => gen.assign(names_1.default.vErrors, null)));
}
exports.resetErrorsCount = resetErrorsCount;
function extendErrors({ gen, keyword, schemaValue, data, errsCount, it, }) {
    /* istanbul ignore if */
    if (errsCount === undefined)
        throw new Error("ajv implementation error");
    const err = gen.name("err");
    gen.forRange("i", errsCount, names_1.default.errors, (i) => {
        gen.const(err, codegen_1._ `${names_1.default.vErrors}[${i}]`);
        gen.if(codegen_1._ `${err}.instancePath === undefined`, () => gen.assign(codegen_1._ `${err}.instancePath`, codegen_1.strConcat(names_1.default.instancePath, it.errorPath)));
        gen.assign(codegen_1._ `${err}.schemaPath`, codegen_1.str `${it.errSchemaPath}/${keyword}`);
        if (it.opts.verbose) {
            gen.assign(codegen_1._ `${err}.schema`, schemaValue);
            gen.assign(codegen_1._ `${err}.data`, data);
        }
    });
}
exports.extendErrors = extendErrors;
function addError(gen, errObj) {
    const err = gen.const("err", errObj);
    gen.if(codegen_1._ `${names_1.default.vErrors} === null`, () => gen.assign(names_1.default.vErrors, codegen_1._ `[${err}]`), codegen_1._ `${names_1.default.vErrors}.push(${err})`);
    gen.code(codegen_1._ `${names_1.default.errors}++`);
}
function returnErrors(it, errs) {
    const { gen, validateName, schemaEnv } = it;
    if (schemaEnv.$async) {
        gen.throw(codegen_1._ `new ${it.ValidationError}(${errs})`);
    }
    else {
        gen.assign(codegen_1._ `${validateName}.errors`, errs);
        gen.return(false);
    }
}
const E = {
    keyword: new codegen_1.Name("keyword"),
    schemaPath: new codegen_1.Name("schemaPath"),
    params: new codegen_1.Name("params"),
    propertyName: new codegen_1.Name("propertyName"),
    message: new codegen_1.Name("message"),
    schema: new codegen_1.Name("schema"),
    parentSchema: new codegen_1.Name("parentSchema"),
};
function errorObjectCode(cxt, error, errorPaths) {
    const { createErrors } = cxt.it;
    if (createErrors === false)
        return codegen_1._ `{}`;
    return errorObject(cxt, error, errorPaths);
}
function errorObject(cxt, error, errorPaths = {}) {
    const { gen, it } = cxt;
    const keyValues = [
        errorInstancePath(it, errorPaths),
        errorSchemaPath(cxt, errorPaths),
    ];
    extraErrorProps(cxt, error, keyValues);
    return gen.object(...keyValues);
}
function errorInstancePath({ errorPath }, { instancePath }) {
    const instPath = instancePath
        ? codegen_1.str `${errorPath}${util_1.getErrorPath(instancePath, util_1.Type.Str)}`
        : errorPath;
    return [names_1.default.instancePath, codegen_1.strConcat(names_1.default.instancePath, instPath)];
}
function errorSchemaPath({ keyword, it: { errSchemaPath } }, { schemaPath, parentSchema }) {
    let schPath = parentSchema ? errSchemaPath : codegen_1.str `${errSchemaPath}/${keyword}`;
    if (schemaPath) {
        schPath = codegen_1.str `${schPath}${util_1.getErrorPath(schemaPath, util_1.Type.Str)}`;
    }
    return [E.schemaPath, schPath];
}
function extraErrorProps(cxt, { params, message }, keyValues) {
    const { keyword, data, schemaValue, it } = cxt;
    const { opts, propertyName, topSchemaRef, schemaPath } = it;
    keyValues.push([E.keyword, keyword], [E.params, typeof params == "function" ? params(cxt) : params || codegen_1._ `{}`]);
    if (opts.messages) {
        keyValues.push([E.message, typeof message == "function" ? message(cxt) : message]);
    }
    if (opts.verbose) {
        keyValues.push([E.schema, schemaValue], [E.parentSchema, codegen_1._ `${topSchemaRef}${schemaPath}`], [names_1.default.data, data]);
    }
    if (propertyName)
        keyValues.push([E.propertyName, propertyName]);
}
//# sourceMappingURL=errors.js.map

/***/ }),

/***/ 813:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolveSchema = exports.getCompilingSchema = exports.resolveRef = exports.compileSchema = exports.SchemaEnv = void 0;
const codegen_1 = __nccwpck_require__(9179);
const validation_error_1 = __nccwpck_require__(7616);
const names_1 = __nccwpck_require__(50);
const resolve_1 = __nccwpck_require__(6646);
const util_1 = __nccwpck_require__(3439);
const validate_1 = __nccwpck_require__(8955);
const URI = __nccwpck_require__(20);
class SchemaEnv {
    constructor(env) {
        var _a;
        this.refs = {};
        this.dynamicAnchors = {};
        let schema;
        if (typeof env.schema == "object")
            schema = env.schema;
        this.schema = env.schema;
        this.schemaId = env.schemaId;
        this.root = env.root || this;
        this.baseId = (_a = env.baseId) !== null && _a !== void 0 ? _a : resolve_1.normalizeId(schema === null || schema === void 0 ? void 0 : schema[env.schemaId || "$id"]);
        this.schemaPath = env.schemaPath;
        this.localRefs = env.localRefs;
        this.meta = env.meta;
        this.$async = schema === null || schema === void 0 ? void 0 : schema.$async;
        this.refs = {};
    }
}
exports.SchemaEnv = SchemaEnv;
// let codeSize = 0
// let nodeCount = 0
// Compiles schema in SchemaEnv
function compileSchema(sch) {
    // TODO refactor - remove compilations
    const _sch = getCompilingSchema.call(this, sch);
    if (_sch)
        return _sch;
    const rootId = resolve_1.getFullPath(sch.root.baseId); // TODO if getFullPath removed 1 tests fails
    const { es5, lines } = this.opts.code;
    const { ownProperties } = this.opts;
    const gen = new codegen_1.CodeGen(this.scope, { es5, lines, ownProperties });
    let _ValidationError;
    if (sch.$async) {
        _ValidationError = gen.scopeValue("Error", {
            ref: validation_error_1.default,
            code: codegen_1._ `require("ajv/dist/runtime/validation_error").default`,
        });
    }
    const validateName = gen.scopeName("validate");
    sch.validateName = validateName;
    const schemaCxt = {
        gen,
        allErrors: this.opts.allErrors,
        data: names_1.default.data,
        parentData: names_1.default.parentData,
        parentDataProperty: names_1.default.parentDataProperty,
        dataNames: [names_1.default.data],
        dataPathArr: [codegen_1.nil],
        dataLevel: 0,
        dataTypes: [],
        definedProperties: new Set(),
        topSchemaRef: gen.scopeValue("schema", this.opts.code.source === true
            ? { ref: sch.schema, code: codegen_1.stringify(sch.schema) }
            : { ref: sch.schema }),
        validateName,
        ValidationError: _ValidationError,
        schema: sch.schema,
        schemaEnv: sch,
        rootId,
        baseId: sch.baseId || rootId,
        schemaPath: codegen_1.nil,
        errSchemaPath: sch.schemaPath || (this.opts.jtd ? "" : "#"),
        errorPath: codegen_1._ `""`,
        opts: this.opts,
        self: this,
    };
    let sourceCode;
    try {
        this._compilations.add(sch);
        validate_1.validateFunctionCode(schemaCxt);
        gen.optimize(this.opts.code.optimize);
        // gen.optimize(1)
        const validateCode = gen.toString();
        sourceCode = `${gen.scopeRefs(names_1.default.scope)}return ${validateCode}`;
        // console.log((codeSize += sourceCode.length), (nodeCount += gen.nodeCount))
        if (this.opts.code.process)
            sourceCode = this.opts.code.process(sourceCode, sch);
        // console.log("\n\n\n *** \n", sourceCode)
        const makeValidate = new Function(`${names_1.default.self}`, `${names_1.default.scope}`, sourceCode);
        const validate = makeValidate(this, this.scope.get());
        this.scope.value(validateName, { ref: validate });
        validate.errors = null;
        validate.schema = sch.schema;
        validate.schemaEnv = sch;
        if (sch.$async)
            validate.$async = true;
        if (this.opts.code.source === true) {
            validate.source = { validateName, validateCode, scopeValues: gen._values };
        }
        if (this.opts.unevaluated) {
            const { props, items } = schemaCxt;
            validate.evaluated = {
                props: props instanceof codegen_1.Name ? undefined : props,
                items: items instanceof codegen_1.Name ? undefined : items,
                dynamicProps: props instanceof codegen_1.Name,
                dynamicItems: items instanceof codegen_1.Name,
            };
            if (validate.source)
                validate.source.evaluated = codegen_1.stringify(validate.evaluated);
        }
        sch.validate = validate;
        return sch;
    }
    catch (e) {
        delete sch.validate;
        delete sch.validateName;
        if (sourceCode)
            this.logger.error("Error compiling schema, function code:", sourceCode);
        // console.log("\n\n\n *** \n", sourceCode, this.opts)
        throw e;
    }
    finally {
        this._compilations.delete(sch);
    }
}
exports.compileSchema = compileSchema;
function resolveRef(root, baseId, ref) {
    var _a;
    ref = resolve_1.resolveUrl(baseId, ref);
    const schOrFunc = root.refs[ref];
    if (schOrFunc)
        return schOrFunc;
    let _sch = resolve.call(this, root, ref);
    if (_sch === undefined) {
        const schema = (_a = root.localRefs) === null || _a === void 0 ? void 0 : _a[ref]; // TODO maybe localRefs should hold SchemaEnv
        const { schemaId } = this.opts;
        if (schema)
            _sch = new SchemaEnv({ schema, schemaId, root, baseId });
    }
    if (_sch === undefined)
        return;
    return (root.refs[ref] = inlineOrCompile.call(this, _sch));
}
exports.resolveRef = resolveRef;
function inlineOrCompile(sch) {
    if (resolve_1.inlineRef(sch.schema, this.opts.inlineRefs))
        return sch.schema;
    return sch.validate ? sch : compileSchema.call(this, sch);
}
// Index of schema compilation in the currently compiled list
function getCompilingSchema(schEnv) {
    for (const sch of this._compilations) {
        if (sameSchemaEnv(sch, schEnv))
            return sch;
    }
}
exports.getCompilingSchema = getCompilingSchema;
function sameSchemaEnv(s1, s2) {
    return s1.schema === s2.schema && s1.root === s2.root && s1.baseId === s2.baseId;
}
// resolve and compile the references ($ref)
// TODO returns AnySchemaObject (if the schema can be inlined) or validation function
function resolve(root, // information about the root schema for the current schema
ref // reference to resolve
) {
    let sch;
    while (typeof (sch = this.refs[ref]) == "string")
        ref = sch;
    return sch || this.schemas[ref] || resolveSchema.call(this, root, ref);
}
// Resolve schema, its root and baseId
function resolveSchema(root, // root object with properties schema, refs TODO below SchemaEnv is assigned to it
ref // reference to resolve
) {
    const p = URI.parse(ref);
    const refPath = resolve_1._getFullPath(p);
    let baseId = resolve_1.getFullPath(root.baseId);
    // TODO `Object.keys(root.schema).length > 0` should not be needed - but removing breaks 2 tests
    if (Object.keys(root.schema).length > 0 && refPath === baseId) {
        return getJsonPointer.call(this, p, root);
    }
    const id = resolve_1.normalizeId(refPath);
    const schOrRef = this.refs[id] || this.schemas[id];
    if (typeof schOrRef == "string") {
        const sch = resolveSchema.call(this, root, schOrRef);
        if (typeof (sch === null || sch === void 0 ? void 0 : sch.schema) !== "object")
            return;
        return getJsonPointer.call(this, p, sch);
    }
    if (typeof (schOrRef === null || schOrRef === void 0 ? void 0 : schOrRef.schema) !== "object")
        return;
    if (!schOrRef.validate)
        compileSchema.call(this, schOrRef);
    if (id === resolve_1.normalizeId(ref)) {
        const { schema } = schOrRef;
        const { schemaId } = this.opts;
        const schId = schema[schemaId];
        if (schId)
            baseId = resolve_1.resolveUrl(baseId, schId);
        return new SchemaEnv({ schema, schemaId, root, baseId });
    }
    return getJsonPointer.call(this, p, schOrRef);
}
exports.resolveSchema = resolveSchema;
const PREVENT_SCOPE_CHANGE = new Set([
    "properties",
    "patternProperties",
    "enum",
    "dependencies",
    "definitions",
]);
function getJsonPointer(parsedRef, { baseId, schema, root }) {
    var _a;
    if (((_a = parsedRef.fragment) === null || _a === void 0 ? void 0 : _a[0]) !== "/")
        return;
    for (const part of parsedRef.fragment.slice(1).split("/")) {
        if (typeof schema == "boolean")
            return;
        schema = schema[util_1.unescapeFragment(part)];
        if (schema === undefined)
            return;
        // TODO PREVENT_SCOPE_CHANGE could be defined in keyword def?
        const schId = typeof schema == "object" && schema[this.opts.schemaId];
        if (!PREVENT_SCOPE_CHANGE.has(part) && schId) {
            baseId = resolve_1.resolveUrl(baseId, schId);
        }
    }
    let env;
    if (typeof schema != "boolean" && schema.$ref && !util_1.schemaHasRulesButRef(schema, this.RULES)) {
        const $ref = resolve_1.resolveUrl(baseId, schema.$ref);
        env = resolveSchema.call(this, root, $ref);
    }
    // even though resolution failed we need to return SchemaEnv to throw exception
    // so that compileAsync loads missing schema.
    const { schemaId } = this.opts;
    env = env || new SchemaEnv({ schema, schemaId, root, baseId });
    if (env.schema !== env.root.schema)
        return env;
    return undefined;
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 50:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __nccwpck_require__(9179);
const names = {
    // validation function arguments
    data: new codegen_1.Name("data"),
    // args passed from referencing schema
    valCxt: new codegen_1.Name("valCxt"),
    instancePath: new codegen_1.Name("instancePath"),
    parentData: new codegen_1.Name("parentData"),
    parentDataProperty: new codegen_1.Name("parentDataProperty"),
    rootData: new codegen_1.Name("rootData"),
    dynamicAnchors: new codegen_1.Name("dynamicAnchors"),
    // function scoped variables
    vErrors: new codegen_1.Name("vErrors"),
    errors: new codegen_1.Name("errors"),
    this: new codegen_1.Name("this"),
    // "globals"
    self: new codegen_1.Name("self"),
    scope: new codegen_1.Name("scope"),
    // JTD serialize/parse name for JSON string and position
    json: new codegen_1.Name("json"),
    jsonPos: new codegen_1.Name("jsonPos"),
    jsonLen: new codegen_1.Name("jsonLen"),
    jsonPart: new codegen_1.Name("jsonPart"),
};
exports.default = names;
//# sourceMappingURL=names.js.map

/***/ }),

/***/ 8190:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const resolve_1 = __nccwpck_require__(6646);
class MissingRefError extends Error {
    constructor(baseId, ref, msg) {
        super(msg || `can't resolve reference ${ref} from id ${baseId}`);
        this.missingRef = resolve_1.resolveUrl(baseId, ref);
        this.missingSchema = resolve_1.normalizeId(resolve_1.getFullPath(this.missingRef));
    }
}
exports.default = MissingRefError;
//# sourceMappingURL=ref_error.js.map

/***/ }),

/***/ 6646:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSchemaRefs = exports.resolveUrl = exports.normalizeId = exports._getFullPath = exports.getFullPath = exports.inlineRef = void 0;
const util_1 = __nccwpck_require__(3439);
const equal = __nccwpck_require__(8206);
const traverse = __nccwpck_require__(2533);
const URI = __nccwpck_require__(20);
// TODO refactor to use keyword definitions
const SIMPLE_INLINED = new Set([
    "type",
    "format",
    "pattern",
    "maxLength",
    "minLength",
    "maxProperties",
    "minProperties",
    "maxItems",
    "minItems",
    "maximum",
    "minimum",
    "uniqueItems",
    "multipleOf",
    "required",
    "enum",
    "const",
]);
function inlineRef(schema, limit = true) {
    if (typeof schema == "boolean")
        return true;
    if (limit === true)
        return !hasRef(schema);
    if (!limit)
        return false;
    return countKeys(schema) <= limit;
}
exports.inlineRef = inlineRef;
const REF_KEYWORDS = new Set([
    "$ref",
    "$recursiveRef",
    "$recursiveAnchor",
    "$dynamicRef",
    "$dynamicAnchor",
]);
function hasRef(schema) {
    for (const key in schema) {
        if (REF_KEYWORDS.has(key))
            return true;
        const sch = schema[key];
        if (Array.isArray(sch) && sch.some(hasRef))
            return true;
        if (typeof sch == "object" && hasRef(sch))
            return true;
    }
    return false;
}
function countKeys(schema) {
    let count = 0;
    for (const key in schema) {
        if (key === "$ref")
            return Infinity;
        count++;
        if (SIMPLE_INLINED.has(key))
            continue;
        if (typeof schema[key] == "object") {
            util_1.eachItem(schema[key], (sch) => (count += countKeys(sch)));
        }
        if (count === Infinity)
            return Infinity;
    }
    return count;
}
function getFullPath(id = "", normalize) {
    if (normalize !== false)
        id = normalizeId(id);
    const p = URI.parse(id);
    return _getFullPath(p);
}
exports.getFullPath = getFullPath;
function _getFullPath(p) {
    return URI.serialize(p).split("#")[0] + "#";
}
exports._getFullPath = _getFullPath;
const TRAILING_SLASH_HASH = /#\/?$/;
function normalizeId(id) {
    return id ? id.replace(TRAILING_SLASH_HASH, "") : "";
}
exports.normalizeId = normalizeId;
function resolveUrl(baseId, id) {
    id = normalizeId(id);
    return URI.resolve(baseId, id);
}
exports.resolveUrl = resolveUrl;
const ANCHOR = /^[a-z_][-a-z0-9._]*$/i;
function getSchemaRefs(schema) {
    if (typeof schema == "boolean")
        return {};
    const { schemaId } = this.opts;
    const schId = normalizeId(schema[schemaId]);
    const baseIds = { "": schId };
    const pathPrefix = getFullPath(schId, false);
    const localRefs = {};
    const schemaRefs = new Set();
    traverse(schema, { allKeys: true }, (sch, jsonPtr, _, parentJsonPtr) => {
        if (parentJsonPtr === undefined)
            return;
        const fullPath = pathPrefix + jsonPtr;
        let baseId = baseIds[parentJsonPtr];
        if (typeof sch[schemaId] == "string")
            baseId = addRef.call(this, sch[schemaId]);
        addAnchor.call(this, sch.$anchor);
        addAnchor.call(this, sch.$dynamicAnchor);
        baseIds[jsonPtr] = baseId;
        function addRef(ref) {
            ref = normalizeId(baseId ? URI.resolve(baseId, ref) : ref);
            if (schemaRefs.has(ref))
                throw ambiguos(ref);
            schemaRefs.add(ref);
            let schOrRef = this.refs[ref];
            if (typeof schOrRef == "string")
                schOrRef = this.refs[schOrRef];
            if (typeof schOrRef == "object") {
                checkAmbiguosRef(sch, schOrRef.schema, ref);
            }
            else if (ref !== normalizeId(fullPath)) {
                if (ref[0] === "#") {
                    checkAmbiguosRef(sch, localRefs[ref], ref);
                    localRefs[ref] = sch;
                }
                else {
                    this.refs[ref] = fullPath;
                }
            }
            return ref;
        }
        function addAnchor(anchor) {
            if (typeof anchor == "string") {
                if (!ANCHOR.test(anchor))
                    throw new Error(`invalid anchor "${anchor}"`);
                addRef.call(this, `#${anchor}`);
            }
        }
    });
    return localRefs;
    function checkAmbiguosRef(sch1, sch2, ref) {
        if (sch2 !== undefined && !equal(sch1, sch2))
            throw ambiguos(ref);
    }
    function ambiguos(ref) {
        return new Error(`reference "${ref}" resolves to more than one schema`);
    }
}
exports.getSchemaRefs = getSchemaRefs;
//# sourceMappingURL=resolve.js.map

/***/ }),

/***/ 1785:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRules = exports.isJSONType = void 0;
const _jsonTypes = ["string", "number", "integer", "boolean", "null", "object", "array"];
const jsonTypes = new Set(_jsonTypes);
function isJSONType(x) {
    return typeof x == "string" && jsonTypes.has(x);
}
exports.isJSONType = isJSONType;
function getRules() {
    const groups = {
        number: { type: "number", rules: [] },
        string: { type: "string", rules: [] },
        array: { type: "array", rules: [] },
        object: { type: "object", rules: [] },
    };
    return {
        types: { ...groups, integer: true, boolean: true, null: true },
        rules: [{ rules: [] }, groups.number, groups.string, groups.array, groups.object],
        post: { rules: [] },
        all: {},
        keywords: {},
    };
}
exports.getRules = getRules;
//# sourceMappingURL=rules.js.map

/***/ }),

/***/ 3439:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkStrictMode = exports.getErrorPath = exports.Type = exports.useFunc = exports.setEvaluated = exports.evaluatedPropsToName = exports.mergeEvaluated = exports.eachItem = exports.unescapeJsonPointer = exports.escapeJsonPointer = exports.escapeFragment = exports.unescapeFragment = exports.schemaRefOrVal = exports.schemaHasRulesButRef = exports.schemaHasRules = exports.checkUnknownRules = exports.alwaysValidSchema = exports.toHash = void 0;
const codegen_1 = __nccwpck_require__(9179);
const code_1 = __nccwpck_require__(8358);
// TODO refactor to use Set
function toHash(arr) {
    const hash = {};
    for (const item of arr)
        hash[item] = true;
    return hash;
}
exports.toHash = toHash;
function alwaysValidSchema(it, schema) {
    if (typeof schema == "boolean")
        return schema;
    if (Object.keys(schema).length === 0)
        return true;
    checkUnknownRules(it, schema);
    return !schemaHasRules(schema, it.self.RULES.all);
}
exports.alwaysValidSchema = alwaysValidSchema;
function checkUnknownRules(it, schema = it.schema) {
    const { opts, self } = it;
    if (!opts.strictSchema)
        return;
    if (typeof schema === "boolean")
        return;
    const rules = self.RULES.keywords;
    for (const key in schema) {
        if (!rules[key])
            checkStrictMode(it, `unknown keyword: "${key}"`);
    }
}
exports.checkUnknownRules = checkUnknownRules;
function schemaHasRules(schema, rules) {
    if (typeof schema == "boolean")
        return !schema;
    for (const key in schema)
        if (rules[key])
            return true;
    return false;
}
exports.schemaHasRules = schemaHasRules;
function schemaHasRulesButRef(schema, RULES) {
    if (typeof schema == "boolean")
        return !schema;
    for (const key in schema)
        if (key !== "$ref" && RULES.all[key])
            return true;
    return false;
}
exports.schemaHasRulesButRef = schemaHasRulesButRef;
function schemaRefOrVal({ topSchemaRef, schemaPath }, schema, keyword, $data) {
    if (!$data) {
        if (typeof schema == "number" || typeof schema == "boolean")
            return schema;
        if (typeof schema == "string")
            return codegen_1._ `${schema}`;
    }
    return codegen_1._ `${topSchemaRef}${schemaPath}${codegen_1.getProperty(keyword)}`;
}
exports.schemaRefOrVal = schemaRefOrVal;
function unescapeFragment(str) {
    return unescapeJsonPointer(decodeURIComponent(str));
}
exports.unescapeFragment = unescapeFragment;
function escapeFragment(str) {
    return encodeURIComponent(escapeJsonPointer(str));
}
exports.escapeFragment = escapeFragment;
function escapeJsonPointer(str) {
    if (typeof str == "number")
        return `${str}`;
    return str.replace(/~/g, "~0").replace(/\//g, "~1");
}
exports.escapeJsonPointer = escapeJsonPointer;
function unescapeJsonPointer(str) {
    return str.replace(/~1/g, "/").replace(/~0/g, "~");
}
exports.unescapeJsonPointer = unescapeJsonPointer;
function eachItem(xs, f) {
    if (Array.isArray(xs)) {
        for (const x of xs)
            f(x);
    }
    else {
        f(xs);
    }
}
exports.eachItem = eachItem;
function makeMergeEvaluated({ mergeNames, mergeToName, mergeValues, resultToName, }) {
    return (gen, from, to, toName) => {
        const res = to === undefined
            ? from
            : to instanceof codegen_1.Name
                ? (from instanceof codegen_1.Name ? mergeNames(gen, from, to) : mergeToName(gen, from, to), to)
                : from instanceof codegen_1.Name
                    ? (mergeToName(gen, to, from), from)
                    : mergeValues(from, to);
        return toName === codegen_1.Name && !(res instanceof codegen_1.Name) ? resultToName(gen, res) : res;
    };
}
exports.mergeEvaluated = {
    props: makeMergeEvaluated({
        mergeNames: (gen, from, to) => gen.if(codegen_1._ `${to} !== true && ${from} !== undefined`, () => {
            gen.if(codegen_1._ `${from} === true`, () => gen.assign(to, true), () => gen.assign(to, codegen_1._ `${to} || {}`).code(codegen_1._ `Object.assign(${to}, ${from})`));
        }),
        mergeToName: (gen, from, to) => gen.if(codegen_1._ `${to} !== true`, () => {
            if (from === true) {
                gen.assign(to, true);
            }
            else {
                gen.assign(to, codegen_1._ `${to} || {}`);
                setEvaluated(gen, to, from);
            }
        }),
        mergeValues: (from, to) => (from === true ? true : { ...from, ...to }),
        resultToName: evaluatedPropsToName,
    }),
    items: makeMergeEvaluated({
        mergeNames: (gen, from, to) => gen.if(codegen_1._ `${to} !== true && ${from} !== undefined`, () => gen.assign(to, codegen_1._ `${from} === true ? true : ${to} > ${from} ? ${to} : ${from}`)),
        mergeToName: (gen, from, to) => gen.if(codegen_1._ `${to} !== true`, () => gen.assign(to, from === true ? true : codegen_1._ `${to} > ${from} ? ${to} : ${from}`)),
        mergeValues: (from, to) => (from === true ? true : Math.max(from, to)),
        resultToName: (gen, items) => gen.var("items", items),
    }),
};
function evaluatedPropsToName(gen, ps) {
    if (ps === true)
        return gen.var("props", true);
    const props = gen.var("props", codegen_1._ `{}`);
    if (ps !== undefined)
        setEvaluated(gen, props, ps);
    return props;
}
exports.evaluatedPropsToName = evaluatedPropsToName;
function setEvaluated(gen, props, ps) {
    Object.keys(ps).forEach((p) => gen.assign(codegen_1._ `${props}${codegen_1.getProperty(p)}`, true));
}
exports.setEvaluated = setEvaluated;
const snippets = {};
function useFunc(gen, f) {
    return gen.scopeValue("func", {
        ref: f,
        code: snippets[f.code] || (snippets[f.code] = new code_1._Code(f.code)),
    });
}
exports.useFunc = useFunc;
var Type;
(function (Type) {
    Type[Type["Num"] = 0] = "Num";
    Type[Type["Str"] = 1] = "Str";
})(Type = exports.Type || (exports.Type = {}));
function getErrorPath(dataProp, dataPropType, jsPropertySyntax) {
    // let path
    if (dataProp instanceof codegen_1.Name) {
        const isNumber = dataPropType === Type.Num;
        return jsPropertySyntax
            ? isNumber
                ? codegen_1._ `"[" + ${dataProp} + "]"`
                : codegen_1._ `"['" + ${dataProp} + "']"`
            : isNumber
                ? codegen_1._ `"/" + ${dataProp}`
                : codegen_1._ `"/" + ${dataProp}.replace(/~/g, "~0").replace(/\\//g, "~1")`; // TODO maybe use global escapePointer
    }
    return jsPropertySyntax ? codegen_1.getProperty(dataProp).toString() : "/" + escapeJsonPointer(dataProp);
}
exports.getErrorPath = getErrorPath;
function checkStrictMode(it, msg, mode = it.opts.strictSchema) {
    if (!mode)
        return;
    msg = `strict mode: ${msg}`;
    if (mode === true)
        throw new Error(msg);
    it.self.logger.warn(msg);
}
exports.checkStrictMode = checkStrictMode;
//# sourceMappingURL=util.js.map

/***/ }),

/***/ 3627:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.shouldUseRule = exports.shouldUseGroup = exports.schemaHasRulesForType = void 0;
function schemaHasRulesForType({ schema, self }, type) {
    const group = self.RULES.types[type];
    return group && group !== true && shouldUseGroup(schema, group);
}
exports.schemaHasRulesForType = schemaHasRulesForType;
function shouldUseGroup(schema, group) {
    return group.rules.some((rule) => shouldUseRule(schema, rule));
}
exports.shouldUseGroup = shouldUseGroup;
function shouldUseRule(schema, rule) {
    var _a;
    return (schema[rule.keyword] !== undefined ||
        ((_a = rule.definition.implements) === null || _a === void 0 ? void 0 : _a.some((kwd) => schema[kwd] !== undefined)));
}
exports.shouldUseRule = shouldUseRule;
//# sourceMappingURL=applicability.js.map

/***/ }),

/***/ 6214:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.boolOrEmptySchema = exports.topBoolOrEmptySchema = void 0;
const errors_1 = __nccwpck_require__(6150);
const codegen_1 = __nccwpck_require__(9179);
const names_1 = __nccwpck_require__(50);
const boolError = {
    message: "boolean schema is false",
};
function topBoolOrEmptySchema(it) {
    const { gen, schema, validateName } = it;
    if (schema === false) {
        falseSchemaError(it, false);
    }
    else if (typeof schema == "object" && schema.$async === true) {
        gen.return(names_1.default.data);
    }
    else {
        gen.assign(codegen_1._ `${validateName}.errors`, null);
        gen.return(true);
    }
}
exports.topBoolOrEmptySchema = topBoolOrEmptySchema;
function boolOrEmptySchema(it, valid) {
    const { gen, schema } = it;
    if (schema === false) {
        gen.var(valid, false); // TODO var
        falseSchemaError(it);
    }
    else {
        gen.var(valid, true); // TODO var
    }
}
exports.boolOrEmptySchema = boolOrEmptySchema;
function falseSchemaError(it, overrideAllErrors) {
    const { gen, data } = it;
    // TODO maybe some other interface should be used for non-keyword validation errors...
    const cxt = {
        gen,
        keyword: "false schema",
        data,
        schema: false,
        schemaCode: false,
        schemaValue: false,
        params: {},
        it,
    };
    errors_1.reportError(cxt, boolError, undefined, overrideAllErrors);
}
//# sourceMappingURL=boolSchema.js.map

/***/ }),

/***/ 7725:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.reportTypeError = exports.checkDataTypes = exports.checkDataType = exports.coerceAndCheckDataType = exports.getJSONTypes = exports.getSchemaTypes = exports.DataType = void 0;
const rules_1 = __nccwpck_require__(1785);
const applicability_1 = __nccwpck_require__(3627);
const errors_1 = __nccwpck_require__(6150);
const codegen_1 = __nccwpck_require__(9179);
const util_1 = __nccwpck_require__(3439);
var DataType;
(function (DataType) {
    DataType[DataType["Correct"] = 0] = "Correct";
    DataType[DataType["Wrong"] = 1] = "Wrong";
})(DataType = exports.DataType || (exports.DataType = {}));
function getSchemaTypes(schema) {
    const types = getJSONTypes(schema.type);
    const hasNull = types.includes("null");
    if (hasNull) {
        if (schema.nullable === false)
            throw new Error("type: null contradicts nullable: false");
    }
    else {
        if (!types.length && schema.nullable !== undefined) {
            throw new Error('"nullable" cannot be used without "type"');
        }
        if (schema.nullable === true)
            types.push("null");
    }
    return types;
}
exports.getSchemaTypes = getSchemaTypes;
function getJSONTypes(ts) {
    const types = Array.isArray(ts) ? ts : ts ? [ts] : [];
    if (types.every(rules_1.isJSONType))
        return types;
    throw new Error("type must be JSONType or JSONType[]: " + types.join(","));
}
exports.getJSONTypes = getJSONTypes;
function coerceAndCheckDataType(it, types) {
    const { gen, data, opts } = it;
    const coerceTo = coerceToTypes(types, opts.coerceTypes);
    const checkTypes = types.length > 0 &&
        !(coerceTo.length === 0 && types.length === 1 && applicability_1.schemaHasRulesForType(it, types[0]));
    if (checkTypes) {
        const wrongType = checkDataTypes(types, data, opts.strictNumbers, DataType.Wrong);
        gen.if(wrongType, () => {
            if (coerceTo.length)
                coerceData(it, types, coerceTo);
            else
                reportTypeError(it);
        });
    }
    return checkTypes;
}
exports.coerceAndCheckDataType = coerceAndCheckDataType;
const COERCIBLE = new Set(["string", "number", "integer", "boolean", "null"]);
function coerceToTypes(types, coerceTypes) {
    return coerceTypes
        ? types.filter((t) => COERCIBLE.has(t) || (coerceTypes === "array" && t === "array"))
        : [];
}
function coerceData(it, types, coerceTo) {
    const { gen, data, opts } = it;
    const dataType = gen.let("dataType", codegen_1._ `typeof ${data}`);
    const coerced = gen.let("coerced", codegen_1._ `undefined`);
    if (opts.coerceTypes === "array") {
        gen.if(codegen_1._ `${dataType} == 'object' && Array.isArray(${data}) && ${data}.length == 1`, () => gen
            .assign(data, codegen_1._ `${data}[0]`)
            .assign(dataType, codegen_1._ `typeof ${data}`)
            .if(checkDataTypes(types, data, opts.strictNumbers), () => gen.assign(coerced, data)));
    }
    gen.if(codegen_1._ `${coerced} !== undefined`);
    for (const t of coerceTo) {
        if (COERCIBLE.has(t) || (t === "array" && opts.coerceTypes === "array")) {
            coerceSpecificType(t);
        }
    }
    gen.else();
    reportTypeError(it);
    gen.endIf();
    gen.if(codegen_1._ `${coerced} !== undefined`, () => {
        gen.assign(data, coerced);
        assignParentData(it, coerced);
    });
    function coerceSpecificType(t) {
        switch (t) {
            case "string":
                gen
                    .elseIf(codegen_1._ `${dataType} == "number" || ${dataType} == "boolean"`)
                    .assign(coerced, codegen_1._ `"" + ${data}`)
                    .elseIf(codegen_1._ `${data} === null`)
                    .assign(coerced, codegen_1._ `""`);
                return;
            case "number":
                gen
                    .elseIf(codegen_1._ `${dataType} == "boolean" || ${data} === null
              || (${dataType} == "string" && ${data} && ${data} == +${data})`)
                    .assign(coerced, codegen_1._ `+${data}`);
                return;
            case "integer":
                gen
                    .elseIf(codegen_1._ `${dataType} === "boolean" || ${data} === null
              || (${dataType} === "string" && ${data} && ${data} == +${data} && !(${data} % 1))`)
                    .assign(coerced, codegen_1._ `+${data}`);
                return;
            case "boolean":
                gen
                    .elseIf(codegen_1._ `${data} === "false" || ${data} === 0 || ${data} === null`)
                    .assign(coerced, false)
                    .elseIf(codegen_1._ `${data} === "true" || ${data} === 1`)
                    .assign(coerced, true);
                return;
            case "null":
                gen.elseIf(codegen_1._ `${data} === "" || ${data} === 0 || ${data} === false`);
                gen.assign(coerced, null);
                return;
            case "array":
                gen
                    .elseIf(codegen_1._ `${dataType} === "string" || ${dataType} === "number"
              || ${dataType} === "boolean" || ${data} === null`)
                    .assign(coerced, codegen_1._ `[${data}]`);
        }
    }
}
function assignParentData({ gen, parentData, parentDataProperty }, expr) {
    // TODO use gen.property
    gen.if(codegen_1._ `${parentData} !== undefined`, () => gen.assign(codegen_1._ `${parentData}[${parentDataProperty}]`, expr));
}
function checkDataType(dataType, data, strictNums, correct = DataType.Correct) {
    const EQ = correct === DataType.Correct ? codegen_1.operators.EQ : codegen_1.operators.NEQ;
    let cond;
    switch (dataType) {
        case "null":
            return codegen_1._ `${data} ${EQ} null`;
        case "array":
            cond = codegen_1._ `Array.isArray(${data})`;
            break;
        case "object":
            cond = codegen_1._ `${data} && typeof ${data} == "object" && !Array.isArray(${data})`;
            break;
        case "integer":
            cond = numCond(codegen_1._ `!(${data} % 1) && !isNaN(${data})`);
            break;
        case "number":
            cond = numCond();
            break;
        default:
            return codegen_1._ `typeof ${data} ${EQ} ${dataType}`;
    }
    return correct === DataType.Correct ? cond : codegen_1.not(cond);
    function numCond(_cond = codegen_1.nil) {
        return codegen_1.and(codegen_1._ `typeof ${data} == "number"`, _cond, strictNums ? codegen_1._ `isFinite(${data})` : codegen_1.nil);
    }
}
exports.checkDataType = checkDataType;
function checkDataTypes(dataTypes, data, strictNums, correct) {
    if (dataTypes.length === 1) {
        return checkDataType(dataTypes[0], data, strictNums, correct);
    }
    let cond;
    const types = util_1.toHash(dataTypes);
    if (types.array && types.object) {
        const notObj = codegen_1._ `typeof ${data} != "object"`;
        cond = types.null ? notObj : codegen_1._ `!${data} || ${notObj}`;
        delete types.null;
        delete types.array;
        delete types.object;
    }
    else {
        cond = codegen_1.nil;
    }
    if (types.number)
        delete types.integer;
    for (const t in types)
        cond = codegen_1.and(cond, checkDataType(t, data, strictNums, correct));
    return cond;
}
exports.checkDataTypes = checkDataTypes;
const typeError = {
    message: ({ schema }) => `must be ${schema}`,
    params: ({ schema, schemaValue }) => typeof schema == "string" ? codegen_1._ `{type: ${schema}}` : codegen_1._ `{type: ${schemaValue}}`,
};
function reportTypeError(it) {
    const cxt = getTypeErrorContext(it);
    errors_1.reportError(cxt, typeError);
}
exports.reportTypeError = reportTypeError;
function getTypeErrorContext(it) {
    const { gen, data, schema } = it;
    const schemaCode = util_1.schemaRefOrVal(it, schema, "type");
    return {
        gen,
        keyword: "type",
        data,
        schema: schema.type,
        schemaCode,
        schemaValue: schemaCode,
        parentSchema: schema,
        params: {},
        it,
    };
}
//# sourceMappingURL=dataType.js.map

/***/ }),

/***/ 9593:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.assignDefaults = void 0;
const codegen_1 = __nccwpck_require__(9179);
const util_1 = __nccwpck_require__(3439);
function assignDefaults(it, ty) {
    const { properties, items } = it.schema;
    if (ty === "object" && properties) {
        for (const key in properties) {
            assignDefault(it, key, properties[key].default);
        }
    }
    else if (ty === "array" && Array.isArray(items)) {
        items.forEach((sch, i) => assignDefault(it, i, sch.default));
    }
}
exports.assignDefaults = assignDefaults;
function assignDefault(it, prop, defaultValue) {
    const { gen, compositeRule, data, opts } = it;
    if (defaultValue === undefined)
        return;
    const childData = codegen_1._ `${data}${codegen_1.getProperty(prop)}`;
    if (compositeRule) {
        util_1.checkStrictMode(it, `default is ignored for: ${childData}`);
        return;
    }
    let condition = codegen_1._ `${childData} === undefined`;
    if (opts.useDefaults === "empty") {
        condition = codegen_1._ `${condition} || ${childData} === null || ${childData} === ""`;
    }
    // `${childData} === undefined` +
    // (opts.useDefaults === "empty" ? ` || ${childData} === null || ${childData} === ""` : "")
    gen.if(condition, codegen_1._ `${childData} = ${codegen_1.stringify(defaultValue)}`);
}
//# sourceMappingURL=defaults.js.map

/***/ }),

/***/ 8955:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getData = exports.KeywordCxt = exports.validateFunctionCode = void 0;
const boolSchema_1 = __nccwpck_require__(6214);
const dataType_1 = __nccwpck_require__(7725);
const applicability_1 = __nccwpck_require__(3627);
const dataType_2 = __nccwpck_require__(7725);
const defaults_1 = __nccwpck_require__(9593);
const keyword_1 = __nccwpck_require__(8732);
const subschema_1 = __nccwpck_require__(3896);
const codegen_1 = __nccwpck_require__(9179);
const names_1 = __nccwpck_require__(50);
const resolve_1 = __nccwpck_require__(6646);
const util_1 = __nccwpck_require__(3439);
const errors_1 = __nccwpck_require__(6150);
// schema compilation - generates validation function, subschemaCode (below) is used for subschemas
function validateFunctionCode(it) {
    if (isSchemaObj(it)) {
        checkKeywords(it);
        if (schemaCxtHasRules(it)) {
            topSchemaObjCode(it);
            return;
        }
    }
    validateFunction(it, () => boolSchema_1.topBoolOrEmptySchema(it));
}
exports.validateFunctionCode = validateFunctionCode;
function validateFunction({ gen, validateName, schema, schemaEnv, opts }, body) {
    if (opts.code.es5) {
        gen.func(validateName, codegen_1._ `${names_1.default.data}, ${names_1.default.valCxt}`, schemaEnv.$async, () => {
            gen.code(codegen_1._ `"use strict"; ${funcSourceUrl(schema, opts)}`);
            destructureValCxtES5(gen, opts);
            gen.code(body);
        });
    }
    else {
        gen.func(validateName, codegen_1._ `${names_1.default.data}, ${destructureValCxt(opts)}`, schemaEnv.$async, () => gen.code(funcSourceUrl(schema, opts)).code(body));
    }
}
function destructureValCxt(opts) {
    return codegen_1._ `{${names_1.default.instancePath}="", ${names_1.default.parentData}, ${names_1.default.parentDataProperty}, ${names_1.default.rootData}=${names_1.default.data}${opts.dynamicRef ? codegen_1._ `, ${names_1.default.dynamicAnchors}={}` : codegen_1.nil}}={}`;
}
function destructureValCxtES5(gen, opts) {
    gen.if(names_1.default.valCxt, () => {
        gen.var(names_1.default.instancePath, codegen_1._ `${names_1.default.valCxt}.${names_1.default.instancePath}`);
        gen.var(names_1.default.parentData, codegen_1._ `${names_1.default.valCxt}.${names_1.default.parentData}`);
        gen.var(names_1.default.parentDataProperty, codegen_1._ `${names_1.default.valCxt}.${names_1.default.parentDataProperty}`);
        gen.var(names_1.default.rootData, codegen_1._ `${names_1.default.valCxt}.${names_1.default.rootData}`);
        if (opts.dynamicRef)
            gen.var(names_1.default.dynamicAnchors, codegen_1._ `${names_1.default.valCxt}.${names_1.default.dynamicAnchors}`);
    }, () => {
        gen.var(names_1.default.instancePath, codegen_1._ `""`);
        gen.var(names_1.default.parentData, codegen_1._ `undefined`);
        gen.var(names_1.default.parentDataProperty, codegen_1._ `undefined`);
        gen.var(names_1.default.rootData, names_1.default.data);
        if (opts.dynamicRef)
            gen.var(names_1.default.dynamicAnchors, codegen_1._ `{}`);
    });
}
function topSchemaObjCode(it) {
    const { schema, opts, gen } = it;
    validateFunction(it, () => {
        if (opts.$comment && schema.$comment)
            commentKeyword(it);
        checkNoDefault(it);
        gen.let(names_1.default.vErrors, null);
        gen.let(names_1.default.errors, 0);
        if (opts.unevaluated)
            resetEvaluated(it);
        typeAndKeywords(it);
        returnResults(it);
    });
    return;
}
function resetEvaluated(it) {
    // TODO maybe some hook to execute it in the end to check whether props/items are Name, as in assignEvaluated
    const { gen, validateName } = it;
    it.evaluated = gen.const("evaluated", codegen_1._ `${validateName}.evaluated`);
    gen.if(codegen_1._ `${it.evaluated}.dynamicProps`, () => gen.assign(codegen_1._ `${it.evaluated}.props`, codegen_1._ `undefined`));
    gen.if(codegen_1._ `${it.evaluated}.dynamicItems`, () => gen.assign(codegen_1._ `${it.evaluated}.items`, codegen_1._ `undefined`));
}
function funcSourceUrl(schema, opts) {
    const schId = typeof schema == "object" && schema[opts.schemaId];
    return schId && (opts.code.source || opts.code.process) ? codegen_1._ `/*# sourceURL=${schId} */` : codegen_1.nil;
}
// schema compilation - this function is used recursively to generate code for sub-schemas
function subschemaCode(it, valid) {
    if (isSchemaObj(it)) {
        checkKeywords(it);
        if (schemaCxtHasRules(it)) {
            subSchemaObjCode(it, valid);
            return;
        }
    }
    boolSchema_1.boolOrEmptySchema(it, valid);
}
function schemaCxtHasRules({ schema, self }) {
    if (typeof schema == "boolean")
        return !schema;
    for (const key in schema)
        if (self.RULES.all[key])
            return true;
    return false;
}
function isSchemaObj(it) {
    return typeof it.schema != "boolean";
}
function subSchemaObjCode(it, valid) {
    const { schema, gen, opts } = it;
    if (opts.$comment && schema.$comment)
        commentKeyword(it);
    updateContext(it);
    checkAsyncSchema(it);
    const errsCount = gen.const("_errs", names_1.default.errors);
    typeAndKeywords(it, errsCount);
    // TODO var
    gen.var(valid, codegen_1._ `${errsCount} === ${names_1.default.errors}`);
}
function checkKeywords(it) {
    util_1.checkUnknownRules(it);
    checkRefsAndKeywords(it);
}
function typeAndKeywords(it, errsCount) {
    if (it.opts.jtd)
        return schemaKeywords(it, [], false, errsCount);
    const types = dataType_1.getSchemaTypes(it.schema);
    const checkedTypes = dataType_1.coerceAndCheckDataType(it, types);
    schemaKeywords(it, types, !checkedTypes, errsCount);
}
function checkRefsAndKeywords(it) {
    const { schema, errSchemaPath, opts, self } = it;
    if (schema.$ref && opts.ignoreKeywordsWithRef && util_1.schemaHasRulesButRef(schema, self.RULES)) {
        self.logger.warn(`$ref: keywords ignored in schema at path "${errSchemaPath}"`);
    }
}
function checkNoDefault(it) {
    const { schema, opts } = it;
    if (schema.default !== undefined && opts.useDefaults && opts.strictSchema) {
        util_1.checkStrictMode(it, "default is ignored in the schema root");
    }
}
function updateContext(it) {
    const schId = it.schema[it.opts.schemaId];
    if (schId)
        it.baseId = resolve_1.resolveUrl(it.baseId, schId);
}
function checkAsyncSchema(it) {
    if (it.schema.$async && !it.schemaEnv.$async)
        throw new Error("async schema in sync schema");
}
function commentKeyword({ gen, schemaEnv, schema, errSchemaPath, opts }) {
    const msg = schema.$comment;
    if (opts.$comment === true) {
        gen.code(codegen_1._ `${names_1.default.self}.logger.log(${msg})`);
    }
    else if (typeof opts.$comment == "function") {
        const schemaPath = codegen_1.str `${errSchemaPath}/$comment`;
        const rootName = gen.scopeValue("root", { ref: schemaEnv.root });
        gen.code(codegen_1._ `${names_1.default.self}.opts.$comment(${msg}, ${schemaPath}, ${rootName}.schema)`);
    }
}
function returnResults(it) {
    const { gen, schemaEnv, validateName, ValidationError, opts } = it;
    if (schemaEnv.$async) {
        // TODO assign unevaluated
        gen.if(codegen_1._ `${names_1.default.errors} === 0`, () => gen.return(names_1.default.data), () => gen.throw(codegen_1._ `new ${ValidationError}(${names_1.default.vErrors})`));
    }
    else {
        gen.assign(codegen_1._ `${validateName}.errors`, names_1.default.vErrors);
        if (opts.unevaluated)
            assignEvaluated(it);
        gen.return(codegen_1._ `${names_1.default.errors} === 0`);
    }
}
function assignEvaluated({ gen, evaluated, props, items }) {
    if (props instanceof codegen_1.Name)
        gen.assign(codegen_1._ `${evaluated}.props`, props);
    if (items instanceof codegen_1.Name)
        gen.assign(codegen_1._ `${evaluated}.items`, items);
}
function schemaKeywords(it, types, typeErrors, errsCount) {
    const { gen, schema, data, allErrors, opts, self } = it;
    const { RULES } = self;
    if (schema.$ref && (opts.ignoreKeywordsWithRef || !util_1.schemaHasRulesButRef(schema, RULES))) {
        gen.block(() => keywordCode(it, "$ref", RULES.all.$ref.definition)); // TODO typecast
        return;
    }
    if (!opts.jtd)
        checkStrictTypes(it, types);
    gen.block(() => {
        for (const group of RULES.rules)
            groupKeywords(group);
        groupKeywords(RULES.post);
    });
    function groupKeywords(group) {
        if (!applicability_1.shouldUseGroup(schema, group))
            return;
        if (group.type) {
            gen.if(dataType_2.checkDataType(group.type, data, opts.strictNumbers));
            iterateKeywords(it, group);
            if (types.length === 1 && types[0] === group.type && typeErrors) {
                gen.else();
                dataType_2.reportTypeError(it);
            }
            gen.endIf();
        }
        else {
            iterateKeywords(it, group);
        }
        // TODO make it "ok" call?
        if (!allErrors)
            gen.if(codegen_1._ `${names_1.default.errors} === ${errsCount || 0}`);
    }
}
function iterateKeywords(it, group) {
    const { gen, schema, opts: { useDefaults }, } = it;
    if (useDefaults)
        defaults_1.assignDefaults(it, group.type);
    gen.block(() => {
        for (const rule of group.rules) {
            if (applicability_1.shouldUseRule(schema, rule)) {
                keywordCode(it, rule.keyword, rule.definition, group.type);
            }
        }
    });
}
function checkStrictTypes(it, types) {
    if (it.schemaEnv.meta || !it.opts.strictTypes)
        return;
    checkContextTypes(it, types);
    if (!it.opts.allowUnionTypes)
        checkMultipleTypes(it, types);
    checkKeywordTypes(it, it.dataTypes);
}
function checkContextTypes(it, types) {
    if (!types.length)
        return;
    if (!it.dataTypes.length) {
        it.dataTypes = types;
        return;
    }
    types.forEach((t) => {
        if (!includesType(it.dataTypes, t)) {
            strictTypesError(it, `type "${t}" not allowed by context "${it.dataTypes.join(",")}"`);
        }
    });
    it.dataTypes = it.dataTypes.filter((t) => includesType(types, t));
}
function checkMultipleTypes(it, ts) {
    if (ts.length > 1 && !(ts.length === 2 && ts.includes("null"))) {
        strictTypesError(it, "use allowUnionTypes to allow union type keyword");
    }
}
function checkKeywordTypes(it, ts) {
    const rules = it.self.RULES.all;
    for (const keyword in rules) {
        const rule = rules[keyword];
        if (typeof rule == "object" && applicability_1.shouldUseRule(it.schema, rule)) {
            const { type } = rule.definition;
            if (type.length && !type.some((t) => hasApplicableType(ts, t))) {
                strictTypesError(it, `missing type "${type.join(",")}" for keyword "${keyword}"`);
            }
        }
    }
}
function hasApplicableType(schTs, kwdT) {
    return schTs.includes(kwdT) || (kwdT === "number" && schTs.includes("integer"));
}
function includesType(ts, t) {
    return ts.includes(t) || (t === "integer" && ts.includes("number"));
}
function strictTypesError(it, msg) {
    const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
    msg += ` at "${schemaPath}" (strictTypes)`;
    util_1.checkStrictMode(it, msg, it.opts.strictTypes);
}
class KeywordCxt {
    constructor(it, def, keyword) {
        keyword_1.validateKeywordUsage(it, def, keyword);
        this.gen = it.gen;
        this.allErrors = it.allErrors;
        this.keyword = keyword;
        this.data = it.data;
        this.schema = it.schema[keyword];
        this.$data = def.$data && it.opts.$data && this.schema && this.schema.$data;
        this.schemaValue = util_1.schemaRefOrVal(it, this.schema, keyword, this.$data);
        this.schemaType = def.schemaType;
        this.parentSchema = it.schema;
        this.params = {};
        this.it = it;
        this.def = def;
        if (this.$data) {
            this.schemaCode = it.gen.const("vSchema", getData(this.$data, it));
        }
        else {
            this.schemaCode = this.schemaValue;
            if (!keyword_1.validSchemaType(this.schema, def.schemaType, def.allowUndefined)) {
                throw new Error(`${keyword} value must be ${JSON.stringify(def.schemaType)}`);
            }
        }
        if ("code" in def ? def.trackErrors : def.errors !== false) {
            this.errsCount = it.gen.const("_errs", names_1.default.errors);
        }
    }
    result(condition, successAction, failAction) {
        this.failResult(codegen_1.not(condition), successAction, failAction);
    }
    failResult(condition, successAction, failAction) {
        this.gen.if(condition);
        if (failAction)
            failAction();
        else
            this.error();
        if (successAction) {
            this.gen.else();
            successAction();
            if (this.allErrors)
                this.gen.endIf();
        }
        else {
            if (this.allErrors)
                this.gen.endIf();
            else
                this.gen.else();
        }
    }
    pass(condition, failAction) {
        this.failResult(codegen_1.not(condition), undefined, failAction);
    }
    fail(condition) {
        if (condition === undefined) {
            this.error();
            if (!this.allErrors)
                this.gen.if(false); // this branch will be removed by gen.optimize
            return;
        }
        this.gen.if(condition);
        this.error();
        if (this.allErrors)
            this.gen.endIf();
        else
            this.gen.else();
    }
    fail$data(condition) {
        if (!this.$data)
            return this.fail(condition);
        const { schemaCode } = this;
        this.fail(codegen_1._ `${schemaCode} !== undefined && (${codegen_1.or(this.invalid$data(), condition)})`);
    }
    error(append, errorParams, errorPaths) {
        if (errorParams) {
            this.setParams(errorParams);
            this._error(append, errorPaths);
            this.setParams({});
            return;
        }
        this._error(append, errorPaths);
    }
    _error(append, errorPaths) {
        ;
        (append ? errors_1.reportExtraError : errors_1.reportError)(this, this.def.error, errorPaths);
    }
    $dataError() {
        errors_1.reportError(this, this.def.$dataError || errors_1.keyword$DataError);
    }
    reset() {
        if (this.errsCount === undefined)
            throw new Error('add "trackErrors" to keyword definition');
        errors_1.resetErrorsCount(this.gen, this.errsCount);
    }
    ok(cond) {
        if (!this.allErrors)
            this.gen.if(cond);
    }
    setParams(obj, assign) {
        if (assign)
            Object.assign(this.params, obj);
        else
            this.params = obj;
    }
    block$data(valid, codeBlock, $dataValid = codegen_1.nil) {
        this.gen.block(() => {
            this.check$data(valid, $dataValid);
            codeBlock();
        });
    }
    check$data(valid = codegen_1.nil, $dataValid = codegen_1.nil) {
        if (!this.$data)
            return;
        const { gen, schemaCode, schemaType, def } = this;
        gen.if(codegen_1.or(codegen_1._ `${schemaCode} === undefined`, $dataValid));
        if (valid !== codegen_1.nil)
            gen.assign(valid, true);
        if (schemaType.length || def.validateSchema) {
            gen.elseIf(this.invalid$data());
            this.$dataError();
            if (valid !== codegen_1.nil)
                gen.assign(valid, false);
        }
        gen.else();
    }
    invalid$data() {
        const { gen, schemaCode, schemaType, def, it } = this;
        return codegen_1.or(wrong$DataType(), invalid$DataSchema());
        function wrong$DataType() {
            if (schemaType.length) {
                /* istanbul ignore if */
                if (!(schemaCode instanceof codegen_1.Name))
                    throw new Error("ajv implementation error");
                const st = Array.isArray(schemaType) ? schemaType : [schemaType];
                return codegen_1._ `${dataType_2.checkDataTypes(st, schemaCode, it.opts.strictNumbers, dataType_2.DataType.Wrong)}`;
            }
            return codegen_1.nil;
        }
        function invalid$DataSchema() {
            if (def.validateSchema) {
                const validateSchemaRef = gen.scopeValue("validate$data", { ref: def.validateSchema }); // TODO value.code for standalone
                return codegen_1._ `!${validateSchemaRef}(${schemaCode})`;
            }
            return codegen_1.nil;
        }
    }
    subschema(appl, valid) {
        const subschema = subschema_1.getSubschema(this.it, appl);
        subschema_1.extendSubschemaData(subschema, this.it, appl);
        subschema_1.extendSubschemaMode(subschema, appl);
        const nextContext = { ...this.it, ...subschema, items: undefined, props: undefined };
        subschemaCode(nextContext, valid);
        return nextContext;
    }
    mergeEvaluated(schemaCxt, toName) {
        const { it, gen } = this;
        if (!it.opts.unevaluated)
            return;
        if (it.props !== true && schemaCxt.props !== undefined) {
            it.props = util_1.mergeEvaluated.props(gen, schemaCxt.props, it.props, toName);
        }
        if (it.items !== true && schemaCxt.items !== undefined) {
            it.items = util_1.mergeEvaluated.items(gen, schemaCxt.items, it.items, toName);
        }
    }
    mergeValidEvaluated(schemaCxt, valid) {
        const { it, gen } = this;
        if (it.opts.unevaluated && (it.props !== true || it.items !== true)) {
            gen.if(valid, () => this.mergeEvaluated(schemaCxt, codegen_1.Name));
            return true;
        }
    }
}
exports.KeywordCxt = KeywordCxt;
function keywordCode(it, keyword, def, ruleType) {
    const cxt = new KeywordCxt(it, def, keyword);
    if ("code" in def) {
        def.code(cxt, ruleType);
    }
    else if (cxt.$data && def.validate) {
        keyword_1.funcKeywordCode(cxt, def);
    }
    else if ("macro" in def) {
        keyword_1.macroKeywordCode(cxt, def);
    }
    else if (def.compile || def.validate) {
        keyword_1.funcKeywordCode(cxt, def);
    }
}
const JSON_POINTER = /^\/(?:[^~]|~0|~1)*$/;
const RELATIVE_JSON_POINTER = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function getData($data, { dataLevel, dataNames, dataPathArr }) {
    let jsonPointer;
    let data;
    if ($data === "")
        return names_1.default.rootData;
    if ($data[0] === "/") {
        if (!JSON_POINTER.test($data))
            throw new Error(`Invalid JSON-pointer: ${$data}`);
        jsonPointer = $data;
        data = names_1.default.rootData;
    }
    else {
        const matches = RELATIVE_JSON_POINTER.exec($data);
        if (!matches)
            throw new Error(`Invalid JSON-pointer: ${$data}`);
        const up = +matches[1];
        jsonPointer = matches[2];
        if (jsonPointer === "#") {
            if (up >= dataLevel)
                throw new Error(errorMsg("property/index", up));
            return dataPathArr[dataLevel - up];
        }
        if (up > dataLevel)
            throw new Error(errorMsg("data", up));
        data = dataNames[dataLevel - up];
        if (!jsonPointer)
            return data;
    }
    let expr = data;
    const segments = jsonPointer.split("/");
    for (const segment of segments) {
        if (segment) {
            data = codegen_1._ `${data}${codegen_1.getProperty(util_1.unescapeJsonPointer(segment))}`;
            expr = codegen_1._ `${expr} && ${data}`;
        }
    }
    return expr;
    function errorMsg(pointerType, up) {
        return `Cannot access ${pointerType} ${up} levels up, current level is ${dataLevel}`;
    }
}
exports.getData = getData;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 8732:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateKeywordUsage = exports.validSchemaType = exports.funcKeywordCode = exports.macroKeywordCode = void 0;
const codegen_1 = __nccwpck_require__(9179);
const names_1 = __nccwpck_require__(50);
const code_1 = __nccwpck_require__(4205);
const errors_1 = __nccwpck_require__(6150);
function macroKeywordCode(cxt, def) {
    const { gen, keyword, schema, parentSchema, it } = cxt;
    const macroSchema = def.macro.call(it.self, schema, parentSchema, it);
    const schemaRef = useKeyword(gen, keyword, macroSchema);
    if (it.opts.validateSchema !== false)
        it.self.validateSchema(macroSchema, true);
    const valid = gen.name("valid");
    cxt.subschema({
        schema: macroSchema,
        schemaPath: codegen_1.nil,
        errSchemaPath: `${it.errSchemaPath}/${keyword}`,
        topSchemaRef: schemaRef,
        compositeRule: true,
    }, valid);
    cxt.pass(valid, () => cxt.error(true));
}
exports.macroKeywordCode = macroKeywordCode;
function funcKeywordCode(cxt, def) {
    var _a;
    const { gen, keyword, schema, parentSchema, $data, it } = cxt;
    checkAsyncKeyword(it, def);
    const validate = !$data && def.compile ? def.compile.call(it.self, schema, parentSchema, it) : def.validate;
    const validateRef = useKeyword(gen, keyword, validate);
    const valid = gen.let("valid");
    cxt.block$data(valid, validateKeyword);
    cxt.ok((_a = def.valid) !== null && _a !== void 0 ? _a : valid);
    function validateKeyword() {
        if (def.errors === false) {
            assignValid();
            if (def.modifying)
                modifyData(cxt);
            reportErrs(() => cxt.error());
        }
        else {
            const ruleErrs = def.async ? validateAsync() : validateSync();
            if (def.modifying)
                modifyData(cxt);
            reportErrs(() => addErrs(cxt, ruleErrs));
        }
    }
    function validateAsync() {
        const ruleErrs = gen.let("ruleErrs", null);
        gen.try(() => assignValid(codegen_1._ `await `), (e) => gen.assign(valid, false).if(codegen_1._ `${e} instanceof ${it.ValidationError}`, () => gen.assign(ruleErrs, codegen_1._ `${e}.errors`), () => gen.throw(e)));
        return ruleErrs;
    }
    function validateSync() {
        const validateErrs = codegen_1._ `${validateRef}.errors`;
        gen.assign(validateErrs, null);
        assignValid(codegen_1.nil);
        return validateErrs;
    }
    function assignValid(_await = def.async ? codegen_1._ `await ` : codegen_1.nil) {
        const passCxt = it.opts.passContext ? names_1.default.this : names_1.default.self;
        const passSchema = !(("compile" in def && !$data) || def.schema === false);
        gen.assign(valid, codegen_1._ `${_await}${code_1.callValidateCode(cxt, validateRef, passCxt, passSchema)}`, def.modifying);
    }
    function reportErrs(errors) {
        var _a;
        gen.if(codegen_1.not((_a = def.valid) !== null && _a !== void 0 ? _a : valid), errors);
    }
}
exports.funcKeywordCode = funcKeywordCode;
function modifyData(cxt) {
    const { gen, data, it } = cxt;
    gen.if(it.parentData, () => gen.assign(data, codegen_1._ `${it.parentData}[${it.parentDataProperty}]`));
}
function addErrs(cxt, errs) {
    const { gen } = cxt;
    gen.if(codegen_1._ `Array.isArray(${errs})`, () => {
        gen
            .assign(names_1.default.vErrors, codegen_1._ `${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`)
            .assign(names_1.default.errors, codegen_1._ `${names_1.default.vErrors}.length`);
        errors_1.extendErrors(cxt);
    }, () => cxt.error());
}
function checkAsyncKeyword({ schemaEnv }, def) {
    if (def.async && !schemaEnv.$async)
        throw new Error("async keyword in sync schema");
}
function useKeyword(gen, keyword, result) {
    if (result === undefined)
        throw new Error(`keyword "${keyword}" failed to compile`);
    return gen.scopeValue("keyword", typeof result == "function" ? { ref: result } : { ref: result, code: codegen_1.stringify(result) });
}
function validSchemaType(schema, schemaType, allowUndefined = false) {
    // TODO add tests
    return (!schemaType.length ||
        schemaType.some((st) => st === "array"
            ? Array.isArray(schema)
            : st === "object"
                ? schema && typeof schema == "object" && !Array.isArray(schema)
                : typeof schema == st || (allowUndefined && typeof schema == "undefined")));
}
exports.validSchemaType = validSchemaType;
function validateKeywordUsage({ schema, opts, self, errSchemaPath }, def, keyword) {
    /* istanbul ignore if */
    if (Array.isArray(def.keyword) ? !def.keyword.includes(keyword) : def.keyword !== keyword) {
        throw new Error("ajv implementation error");
    }
    const deps = def.dependencies;
    if (deps === null || deps === void 0 ? void 0 : deps.some((kwd) => !Object.prototype.hasOwnProperty.call(schema, kwd))) {
        throw new Error(`parent schema must have dependencies of ${keyword}: ${deps.join(",")}`);
    }
    if (def.validateSchema) {
        const valid = def.validateSchema(schema[keyword]);
        if (!valid) {
            const msg = `keyword "${keyword}" value is invalid at path "${errSchemaPath}": ` +
                self.errorsText(def.validateSchema.errors);
            if (opts.validateSchema === "log")
                self.logger.error(msg);
            else
                throw new Error(msg);
        }
    }
}
exports.validateKeywordUsage = validateKeywordUsage;
//# sourceMappingURL=keyword.js.map

/***/ }),

/***/ 3896:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.extendSubschemaMode = exports.extendSubschemaData = exports.getSubschema = void 0;
const codegen_1 = __nccwpck_require__(9179);
const util_1 = __nccwpck_require__(3439);
function getSubschema(it, { keyword, schemaProp, schema, schemaPath, errSchemaPath, topSchemaRef }) {
    if (keyword !== undefined && schema !== undefined) {
        throw new Error('both "keyword" and "schema" passed, only one allowed');
    }
    if (keyword !== undefined) {
        const sch = it.schema[keyword];
        return schemaProp === undefined
            ? {
                schema: sch,
                schemaPath: codegen_1._ `${it.schemaPath}${codegen_1.getProperty(keyword)}`,
                errSchemaPath: `${it.errSchemaPath}/${keyword}`,
            }
            : {
                schema: sch[schemaProp],
                schemaPath: codegen_1._ `${it.schemaPath}${codegen_1.getProperty(keyword)}${codegen_1.getProperty(schemaProp)}`,
                errSchemaPath: `${it.errSchemaPath}/${keyword}/${util_1.escapeFragment(schemaProp)}`,
            };
    }
    if (schema !== undefined) {
        if (schemaPath === undefined || errSchemaPath === undefined || topSchemaRef === undefined) {
            throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
        }
        return {
            schema,
            schemaPath,
            topSchemaRef,
            errSchemaPath,
        };
    }
    throw new Error('either "keyword" or "schema" must be passed');
}
exports.getSubschema = getSubschema;
function extendSubschemaData(subschema, it, { dataProp, dataPropType: dpType, data, dataTypes, propertyName }) {
    if (data !== undefined && dataProp !== undefined) {
        throw new Error('both "data" and "dataProp" passed, only one allowed');
    }
    const { gen } = it;
    if (dataProp !== undefined) {
        const { errorPath, dataPathArr, opts } = it;
        const nextData = gen.let("data", codegen_1._ `${it.data}${codegen_1.getProperty(dataProp)}`, true);
        dataContextProps(nextData);
        subschema.errorPath = codegen_1.str `${errorPath}${util_1.getErrorPath(dataProp, dpType, opts.jsPropertySyntax)}`;
        subschema.parentDataProperty = codegen_1._ `${dataProp}`;
        subschema.dataPathArr = [...dataPathArr, subschema.parentDataProperty];
    }
    if (data !== undefined) {
        const nextData = data instanceof codegen_1.Name ? data : gen.let("data", data, true); // replaceable if used once?
        dataContextProps(nextData);
        if (propertyName !== undefined)
            subschema.propertyName = propertyName;
        // TODO something is possibly wrong here with not changing parentDataProperty and not appending dataPathArr
    }
    if (dataTypes)
        subschema.dataTypes = dataTypes;
    function dataContextProps(_nextData) {
        subschema.data = _nextData;
        subschema.dataLevel = it.dataLevel + 1;
        subschema.dataTypes = [];
        it.definedProperties = new Set();
        subschema.parentData = it.data;
        subschema.dataNames = [...it.dataNames, _nextData];
    }
}
exports.extendSubschemaData = extendSubschemaData;
function extendSubschemaMode(subschema, { jtdDiscriminator, jtdMetadata, compositeRule, createErrors, allErrors }) {
    if (compositeRule !== undefined)
        subschema.compositeRule = compositeRule;
    if (createErrors !== undefined)
        subschema.createErrors = createErrors;
    if (allErrors !== undefined)
        subschema.allErrors = allErrors;
    subschema.jtdDiscriminator = jtdDiscriminator; // not inherited
    subschema.jtdMetadata = jtdMetadata; // not inherited
}
exports.extendSubschemaMode = extendSubschemaMode;
//# sourceMappingURL=subschema.js.map

/***/ }),

/***/ 2685:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = void 0;
var validate_1 = __nccwpck_require__(8955);
Object.defineProperty(exports, "KeywordCxt", ({ enumerable: true, get: function () { return validate_1.KeywordCxt; } }));
var codegen_1 = __nccwpck_require__(9179);
Object.defineProperty(exports, "_", ({ enumerable: true, get: function () { return codegen_1._; } }));
Object.defineProperty(exports, "str", ({ enumerable: true, get: function () { return codegen_1.str; } }));
Object.defineProperty(exports, "stringify", ({ enumerable: true, get: function () { return codegen_1.stringify; } }));
Object.defineProperty(exports, "nil", ({ enumerable: true, get: function () { return codegen_1.nil; } }));
Object.defineProperty(exports, "Name", ({ enumerable: true, get: function () { return codegen_1.Name; } }));
Object.defineProperty(exports, "CodeGen", ({ enumerable: true, get: function () { return codegen_1.CodeGen; } }));
const validation_error_1 = __nccwpck_require__(7616);
const ref_error_1 = __nccwpck_require__(8190);
const rules_1 = __nccwpck_require__(1785);
const compile_1 = __nccwpck_require__(813);
const codegen_2 = __nccwpck_require__(9179);
const resolve_1 = __nccwpck_require__(6646);
const dataType_1 = __nccwpck_require__(7725);
const util_1 = __nccwpck_require__(3439);
const $dataRefSchema = __nccwpck_require__(2228);
const META_IGNORE_OPTIONS = ["removeAdditional", "useDefaults", "coerceTypes"];
const EXT_SCOPE_NAMES = new Set([
    "validate",
    "serialize",
    "parse",
    "wrapper",
    "root",
    "schema",
    "keyword",
    "pattern",
    "formats",
    "validate$data",
    "func",
    "obj",
    "Error",
]);
const removedOptions = {
    errorDataPath: "",
    format: "`validateFormats: false` can be used instead.",
    nullable: '"nullable" keyword is supported by default.',
    jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
    extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
    missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
    processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
    sourceCode: "Use option `code: {source: true}`",
    strictDefaults: "It is default now, see option `strict`.",
    strictKeywords: "It is default now, see option `strict`.",
    uniqueItems: '"uniqueItems" keyword is always validated.',
    unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
    cache: "Map is used as cache, schema object as key.",
    serialize: "Map is used as cache, schema object as key.",
    ajvErrors: "It is default now.",
};
const deprecatedOptions = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.',
};
const MAX_EXPRESSION = 200;
// eslint-disable-next-line complexity
function requiredOptions(o) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
    const s = o.strict;
    const _optz = (_a = o.code) === null || _a === void 0 ? void 0 : _a.optimize;
    const optimize = _optz === true || _optz === undefined ? 1 : _optz || 0;
    return {
        strictSchema: (_c = (_b = o.strictSchema) !== null && _b !== void 0 ? _b : s) !== null && _c !== void 0 ? _c : true,
        strictNumbers: (_e = (_d = o.strictNumbers) !== null && _d !== void 0 ? _d : s) !== null && _e !== void 0 ? _e : true,
        strictTypes: (_g = (_f = o.strictTypes) !== null && _f !== void 0 ? _f : s) !== null && _g !== void 0 ? _g : "log",
        strictTuples: (_j = (_h = o.strictTuples) !== null && _h !== void 0 ? _h : s) !== null && _j !== void 0 ? _j : "log",
        strictRequired: (_l = (_k = o.strictRequired) !== null && _k !== void 0 ? _k : s) !== null && _l !== void 0 ? _l : false,
        code: o.code ? { ...o.code, optimize } : { optimize },
        loopRequired: (_m = o.loopRequired) !== null && _m !== void 0 ? _m : MAX_EXPRESSION,
        loopEnum: (_o = o.loopEnum) !== null && _o !== void 0 ? _o : MAX_EXPRESSION,
        meta: (_p = o.meta) !== null && _p !== void 0 ? _p : true,
        messages: (_q = o.messages) !== null && _q !== void 0 ? _q : true,
        inlineRefs: (_r = o.inlineRefs) !== null && _r !== void 0 ? _r : true,
        schemaId: (_s = o.schemaId) !== null && _s !== void 0 ? _s : "$id",
        addUsedSchema: (_t = o.addUsedSchema) !== null && _t !== void 0 ? _t : true,
        validateSchema: (_u = o.validateSchema) !== null && _u !== void 0 ? _u : true,
        validateFormats: (_v = o.validateFormats) !== null && _v !== void 0 ? _v : true,
        unicodeRegExp: (_w = o.unicodeRegExp) !== null && _w !== void 0 ? _w : true,
        int32range: (_x = o.int32range) !== null && _x !== void 0 ? _x : true,
    };
}
class Ajv {
    constructor(opts = {}) {
        this.schemas = {};
        this.refs = {};
        this.formats = {};
        this._compilations = new Set();
        this._loading = {};
        this._cache = new Map();
        opts = this.opts = { ...opts, ...requiredOptions(opts) };
        const { es5, lines } = this.opts.code;
        this.scope = new codegen_2.ValueScope({ scope: {}, prefixes: EXT_SCOPE_NAMES, es5, lines });
        this.logger = getLogger(opts.logger);
        const formatOpt = opts.validateFormats;
        opts.validateFormats = false;
        this.RULES = rules_1.getRules();
        checkOptions.call(this, removedOptions, opts, "NOT SUPPORTED");
        checkOptions.call(this, deprecatedOptions, opts, "DEPRECATED", "warn");
        this._metaOpts = getMetaSchemaOptions.call(this);
        if (opts.formats)
            addInitialFormats.call(this);
        this._addVocabularies();
        this._addDefaultMetaSchema();
        if (opts.keywords)
            addInitialKeywords.call(this, opts.keywords);
        if (typeof opts.meta == "object")
            this.addMetaSchema(opts.meta);
        addInitialSchemas.call(this);
        opts.validateFormats = formatOpt;
    }
    _addVocabularies() {
        this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
        const { $data, meta, schemaId } = this.opts;
        let _dataRefSchema = $dataRefSchema;
        if (schemaId === "id") {
            _dataRefSchema = { ...$dataRefSchema };
            _dataRefSchema.id = _dataRefSchema.$id;
            delete _dataRefSchema.$id;
        }
        if (meta && $data)
            this.addMetaSchema(_dataRefSchema, _dataRefSchema[schemaId], false);
    }
    defaultMeta() {
        const { meta, schemaId } = this.opts;
        return (this.opts.defaultMeta = typeof meta == "object" ? meta[schemaId] || meta : undefined);
    }
    validate(schemaKeyRef, // key, ref or schema object
    data // to be validated
    ) {
        let v;
        if (typeof schemaKeyRef == "string") {
            v = this.getSchema(schemaKeyRef);
            if (!v)
                throw new Error(`no schema with key or ref "${schemaKeyRef}"`);
        }
        else {
            v = this.compile(schemaKeyRef);
        }
        const valid = v(data);
        if (!("$async" in v))
            this.errors = v.errors;
        return valid;
    }
    compile(schema, _meta) {
        const sch = this._addSchema(schema, _meta);
        return (sch.validate || this._compileSchemaEnv(sch));
    }
    compileAsync(schema, meta) {
        if (typeof this.opts.loadSchema != "function") {
            throw new Error("options.loadSchema should be a function");
        }
        const { loadSchema } = this.opts;
        return runCompileAsync.call(this, schema, meta);
        async function runCompileAsync(_schema, _meta) {
            await loadMetaSchema.call(this, _schema.$schema);
            const sch = this._addSchema(_schema, _meta);
            return sch.validate || _compileAsync.call(this, sch);
        }
        async function loadMetaSchema($ref) {
            if ($ref && !this.getSchema($ref)) {
                await runCompileAsync.call(this, { $ref }, true);
            }
        }
        async function _compileAsync(sch) {
            try {
                return this._compileSchemaEnv(sch);
            }
            catch (e) {
                if (!(e instanceof ref_error_1.default))
                    throw e;
                checkLoaded.call(this, e);
                await loadMissingSchema.call(this, e.missingSchema);
                return _compileAsync.call(this, sch);
            }
        }
        function checkLoaded({ missingSchema: ref, missingRef }) {
            if (this.refs[ref]) {
                throw new Error(`AnySchema ${ref} is loaded but ${missingRef} cannot be resolved`);
            }
        }
        async function loadMissingSchema(ref) {
            const _schema = await _loadSchema.call(this, ref);
            if (!this.refs[ref])
                await loadMetaSchema.call(this, _schema.$schema);
            if (!this.refs[ref])
                this.addSchema(_schema, ref, meta);
        }
        async function _loadSchema(ref) {
            const p = this._loading[ref];
            if (p)
                return p;
            try {
                return await (this._loading[ref] = loadSchema(ref));
            }
            finally {
                delete this._loading[ref];
            }
        }
    }
    // Adds schema to the instance
    addSchema(schema, // If array is passed, `key` will be ignored
    key, // Optional schema key. Can be passed to `validate` method instead of schema object or id/ref. One schema per instance can have empty `id` and `key`.
    _meta, // true if schema is a meta-schema. Used internally, addMetaSchema should be used instead.
    _validateSchema = this.opts.validateSchema // false to skip schema validation. Used internally, option validateSchema should be used instead.
    ) {
        if (Array.isArray(schema)) {
            for (const sch of schema)
                this.addSchema(sch, undefined, _meta, _validateSchema);
            return this;
        }
        let id;
        if (typeof schema === "object") {
            const { schemaId } = this.opts;
            id = schema[schemaId];
            if (id !== undefined && typeof id != "string") {
                throw new Error(`schema ${schemaId} must be string`);
            }
        }
        key = resolve_1.normalizeId(key || id);
        this._checkUnique(key);
        this.schemas[key] = this._addSchema(schema, _meta, key, _validateSchema, true);
        return this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(schema, key, // schema key
    _validateSchema = this.opts.validateSchema // false to skip schema validation, can be used to override validateSchema option for meta-schema
    ) {
        this.addSchema(schema, key, true, _validateSchema);
        return this;
    }
    //  Validate schema against its meta-schema
    validateSchema(schema, throwOrLogError) {
        if (typeof schema == "boolean")
            return true;
        let $schema;
        $schema = schema.$schema;
        if ($schema !== undefined && typeof $schema != "string") {
            throw new Error("$schema must be a string");
        }
        $schema = $schema || this.opts.defaultMeta || this.defaultMeta();
        if (!$schema) {
            this.logger.warn("meta-schema not available");
            this.errors = null;
            return true;
        }
        const valid = this.validate($schema, schema);
        if (!valid && throwOrLogError) {
            const message = "schema is invalid: " + this.errorsText();
            if (this.opts.validateSchema === "log")
                this.logger.error(message);
            else
                throw new Error(message);
        }
        return valid;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(keyRef) {
        let sch;
        while (typeof (sch = getSchEnv.call(this, keyRef)) == "string")
            keyRef = sch;
        if (sch === undefined) {
            const { schemaId } = this.opts;
            const root = new compile_1.SchemaEnv({ schema: {}, schemaId });
            sch = compile_1.resolveSchema.call(this, root, keyRef);
            if (!sch)
                return;
            this.refs[keyRef] = sch;
        }
        return (sch.validate || this._compileSchemaEnv(sch));
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(schemaKeyRef) {
        if (schemaKeyRef instanceof RegExp) {
            this._removeAllSchemas(this.schemas, schemaKeyRef);
            this._removeAllSchemas(this.refs, schemaKeyRef);
            return this;
        }
        switch (typeof schemaKeyRef) {
            case "undefined":
                this._removeAllSchemas(this.schemas);
                this._removeAllSchemas(this.refs);
                this._cache.clear();
                return this;
            case "string": {
                const sch = getSchEnv.call(this, schemaKeyRef);
                if (typeof sch == "object")
                    this._cache.delete(sch.schema);
                delete this.schemas[schemaKeyRef];
                delete this.refs[schemaKeyRef];
                return this;
            }
            case "object": {
                const cacheKey = schemaKeyRef;
                this._cache.delete(cacheKey);
                let id = schemaKeyRef[this.opts.schemaId];
                if (id) {
                    id = resolve_1.normalizeId(id);
                    delete this.schemas[id];
                    delete this.refs[id];
                }
                return this;
            }
            default:
                throw new Error("ajv.removeSchema: invalid parameter");
        }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(definitions) {
        for (const def of definitions)
            this.addKeyword(def);
        return this;
    }
    addKeyword(kwdOrDef, def // deprecated
    ) {
        let keyword;
        if (typeof kwdOrDef == "string") {
            keyword = kwdOrDef;
            if (typeof def == "object") {
                this.logger.warn("these parameters are deprecated, see docs for addKeyword");
                def.keyword = keyword;
            }
        }
        else if (typeof kwdOrDef == "object" && def === undefined) {
            def = kwdOrDef;
            keyword = def.keyword;
            if (Array.isArray(keyword) && !keyword.length) {
                throw new Error("addKeywords: keyword must be string or non-empty array");
            }
        }
        else {
            throw new Error("invalid addKeywords parameters");
        }
        checkKeyword.call(this, keyword, def);
        if (!def) {
            util_1.eachItem(keyword, (kwd) => addRule.call(this, kwd));
            return this;
        }
        keywordMetaschema.call(this, def);
        const definition = {
            ...def,
            type: dataType_1.getJSONTypes(def.type),
            schemaType: dataType_1.getJSONTypes(def.schemaType),
        };
        util_1.eachItem(keyword, definition.type.length === 0
            ? (k) => addRule.call(this, k, definition)
            : (k) => definition.type.forEach((t) => addRule.call(this, k, definition, t)));
        return this;
    }
    getKeyword(keyword) {
        const rule = this.RULES.all[keyword];
        return typeof rule == "object" ? rule.definition : !!rule;
    }
    // Remove keyword
    removeKeyword(keyword) {
        // TODO return type should be Ajv
        const { RULES } = this;
        delete RULES.keywords[keyword];
        delete RULES.all[keyword];
        for (const group of RULES.rules) {
            const i = group.rules.findIndex((rule) => rule.keyword === keyword);
            if (i >= 0)
                group.rules.splice(i, 1);
        }
        return this;
    }
    // Add format
    addFormat(name, format) {
        if (typeof format == "string")
            format = new RegExp(format);
        this.formats[name] = format;
        return this;
    }
    errorsText(errors = this.errors, // optional array of validation errors
    { separator = ", ", dataVar = "data" } = {} // optional options with properties `separator` and `dataVar`
    ) {
        if (!errors || errors.length === 0)
            return "No errors";
        return errors
            .map((e) => `${dataVar}${e.instancePath} ${e.message}`)
            .reduce((text, msg) => text + separator + msg);
    }
    $dataMetaSchema(metaSchema, keywordsJsonPointers) {
        const rules = this.RULES.all;
        metaSchema = JSON.parse(JSON.stringify(metaSchema));
        for (const jsonPointer of keywordsJsonPointers) {
            const segments = jsonPointer.split("/").slice(1); // first segment is an empty string
            let keywords = metaSchema;
            for (const seg of segments)
                keywords = keywords[seg];
            for (const key in rules) {
                const rule = rules[key];
                if (typeof rule != "object")
                    continue;
                const { $data } = rule.definition;
                const schema = keywords[key];
                if ($data && schema)
                    keywords[key] = schemaOrData(schema);
            }
        }
        return metaSchema;
    }
    _removeAllSchemas(schemas, regex) {
        for (const keyRef in schemas) {
            const sch = schemas[keyRef];
            if (!regex || regex.test(keyRef)) {
                if (typeof sch == "string") {
                    delete schemas[keyRef];
                }
                else if (sch && !sch.meta) {
                    this._cache.delete(sch.schema);
                    delete schemas[keyRef];
                }
            }
        }
    }
    _addSchema(schema, meta, baseId, validateSchema = this.opts.validateSchema, addSchema = this.opts.addUsedSchema) {
        let id;
        const { schemaId } = this.opts;
        if (typeof schema == "object") {
            id = schema[schemaId];
        }
        else {
            if (this.opts.jtd)
                throw new Error("schema must be object");
            else if (typeof schema != "boolean")
                throw new Error("schema must be object or boolean");
        }
        let sch = this._cache.get(schema);
        if (sch !== undefined)
            return sch;
        const localRefs = resolve_1.getSchemaRefs.call(this, schema);
        baseId = resolve_1.normalizeId(id || baseId);
        sch = new compile_1.SchemaEnv({ schema, schemaId, meta, baseId, localRefs });
        this._cache.set(sch.schema, sch);
        if (addSchema && !baseId.startsWith("#")) {
            // TODO atm it is allowed to overwrite schemas without id (instead of not adding them)
            if (baseId)
                this._checkUnique(baseId);
            this.refs[baseId] = sch;
        }
        if (validateSchema)
            this.validateSchema(schema, true);
        return sch;
    }
    _checkUnique(id) {
        if (this.schemas[id] || this.refs[id]) {
            throw new Error(`schema with key or id "${id}" already exists`);
        }
    }
    _compileSchemaEnv(sch) {
        if (sch.meta)
            this._compileMetaSchema(sch);
        else
            compile_1.compileSchema.call(this, sch);
        /* istanbul ignore if */
        if (!sch.validate)
            throw new Error("ajv implementation error");
        return sch.validate;
    }
    _compileMetaSchema(sch) {
        const currentOpts = this.opts;
        this.opts = this._metaOpts;
        try {
            compile_1.compileSchema.call(this, sch);
        }
        finally {
            this.opts = currentOpts;
        }
    }
}
exports.default = Ajv;
Ajv.ValidationError = validation_error_1.default;
Ajv.MissingRefError = ref_error_1.default;
function checkOptions(checkOpts, options, msg, log = "error") {
    for (const key in checkOpts) {
        const opt = key;
        if (opt in options)
            this.logger[log](`${msg}: option ${key}. ${checkOpts[opt]}`);
    }
}
function getSchEnv(keyRef) {
    keyRef = resolve_1.normalizeId(keyRef); // TODO tests fail without this line
    return this.schemas[keyRef] || this.refs[keyRef];
}
function addInitialSchemas() {
    const optsSchemas = this.opts.schemas;
    if (!optsSchemas)
        return;
    if (Array.isArray(optsSchemas))
        this.addSchema(optsSchemas);
    else
        for (const key in optsSchemas)
            this.addSchema(optsSchemas[key], key);
}
function addInitialFormats() {
    for (const name in this.opts.formats) {
        const format = this.opts.formats[name];
        if (format)
            this.addFormat(name, format);
    }
}
function addInitialKeywords(defs) {
    if (Array.isArray(defs)) {
        this.addVocabulary(defs);
        return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const keyword in defs) {
        const def = defs[keyword];
        if (!def.keyword)
            def.keyword = keyword;
        this.addKeyword(def);
    }
}
function getMetaSchemaOptions() {
    const metaOpts = { ...this.opts };
    for (const opt of META_IGNORE_OPTIONS)
        delete metaOpts[opt];
    return metaOpts;
}
const noLogs = { log() { }, warn() { }, error() { } };
function getLogger(logger) {
    if (logger === false)
        return noLogs;
    if (logger === undefined)
        return console;
    if (logger.log && logger.warn && logger.error)
        return logger;
    throw new Error("logger must implement log, warn and error methods");
}
const KEYWORD_NAME = /^[a-z_$][a-z0-9_$:-]*$/i;
function checkKeyword(keyword, def) {
    const { RULES } = this;
    util_1.eachItem(keyword, (kwd) => {
        if (RULES.keywords[kwd])
            throw new Error(`Keyword ${kwd} is already defined`);
        if (!KEYWORD_NAME.test(kwd))
            throw new Error(`Keyword ${kwd} has invalid name`);
    });
    if (!def)
        return;
    if (def.$data && !("code" in def || "validate" in def)) {
        throw new Error('$data keyword must have "code" or "validate" function');
    }
}
function addRule(keyword, definition, dataType) {
    var _a;
    const post = definition === null || definition === void 0 ? void 0 : definition.post;
    if (dataType && post)
        throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES } = this;
    let ruleGroup = post ? RULES.post : RULES.rules.find(({ type: t }) => t === dataType);
    if (!ruleGroup) {
        ruleGroup = { type: dataType, rules: [] };
        RULES.rules.push(ruleGroup);
    }
    RULES.keywords[keyword] = true;
    if (!definition)
        return;
    const rule = {
        keyword,
        definition: {
            ...definition,
            type: dataType_1.getJSONTypes(definition.type),
            schemaType: dataType_1.getJSONTypes(definition.schemaType),
        },
    };
    if (definition.before)
        addBeforeRule.call(this, ruleGroup, rule, definition.before);
    else
        ruleGroup.rules.push(rule);
    RULES.all[keyword] = rule;
    (_a = definition.implements) === null || _a === void 0 ? void 0 : _a.forEach((kwd) => this.addKeyword(kwd));
}
function addBeforeRule(ruleGroup, rule, before) {
    const i = ruleGroup.rules.findIndex((_rule) => _rule.keyword === before);
    if (i >= 0) {
        ruleGroup.rules.splice(i, 0, rule);
    }
    else {
        ruleGroup.rules.push(rule);
        this.logger.warn(`rule ${before} is not defined`);
    }
}
function keywordMetaschema(def) {
    let { metaSchema } = def;
    if (metaSchema === undefined)
        return;
    if (def.$data && this.opts.$data)
        metaSchema = schemaOrData(metaSchema);
    def.validateSchema = this.compile(metaSchema, true);
}
const $dataRef = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#",
};
function schemaOrData(schema) {
    return { anyOf: [schema, $dataRef] };
}
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 3809:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
// https://github.com/ajv-validator/ajv/issues/889
const equal = __nccwpck_require__(8206);
equal.code = 'require("ajv/dist/runtime/equal").default';
exports.default = equal;
//# sourceMappingURL=equal.js.map

/***/ }),

/***/ 2470:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
// https://mathiasbynens.be/notes/javascript-encoding
// https://github.com/bestiejs/punycode.js - punycode.ucs2.decode
function ucs2length(str) {
    const len = str.length;
    let length = 0;
    let pos = 0;
    let value;
    while (pos < len) {
        length++;
        value = str.charCodeAt(pos++);
        if (value >= 0xd800 && value <= 0xdbff && pos < len) {
            // high surrogate, and there is a next character
            value = str.charCodeAt(pos);
            if ((value & 0xfc00) === 0xdc00)
                pos++; // low surrogate
        }
    }
    return length;
}
exports.default = ucs2length;
ucs2length.code = 'require("ajv/dist/runtime/ucs2length").default';
//# sourceMappingURL=ucs2length.js.map

/***/ }),

/***/ 7616:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class ValidationError extends Error {
    constructor(errors) {
        super("validation failed");
        this.errors = errors;
        this.ajv = this.validation = true;
    }
}
exports.default = ValidationError;
//# sourceMappingURL=validation_error.js.map

/***/ }),

/***/ 4720:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateAdditionalItems = void 0;
const codegen_1 = __nccwpck_require__(9179);
const util_1 = __nccwpck_require__(3439);
const error = {
    message: ({ params: { len } }) => codegen_1.str `must NOT have more than ${len} items`,
    params: ({ params: { len } }) => codegen_1._ `{limit: ${len}}`,
};
const def = {
    keyword: "additionalItems",
    type: "array",
    schemaType: ["boolean", "object"],
    before: "uniqueItems",
    error,
    code(cxt) {
        const { parentSchema, it } = cxt;
        const { items } = parentSchema;
        if (!Array.isArray(items)) {
            util_1.checkStrictMode(it, '"additionalItems" is ignored when "items" is not an array of schemas');
            return;
        }
        validateAdditionalItems(cxt, items);
    },
};
function validateAdditionalItems(cxt, items) {
    const { gen, schema, data, keyword, it } = cxt;
    it.items = true;
    const len = gen.const("len", codegen_1._ `${data}.length`);
    if (schema === false) {
        cxt.setParams({ len: items.length });
        cxt.pass(codegen_1._ `${len} <= ${items.length}`);
    }
    else if (typeof schema == "object" && !util_1.alwaysValidSchema(it, schema)) {
        const valid = gen.var("valid", codegen_1._ `${len} <= ${items.length}`); // TODO var
        gen.if(codegen_1.not(valid), () => validateItems(valid));
        cxt.ok(valid);
    }
    function validateItems(valid) {
        gen.forRange("i", items.length, len, (i) => {
            cxt.subschema({ keyword, dataProp: i, dataPropType: util_1.Type.Num }, valid);
            if (!it.allErrors)
                gen.if(codegen_1.not(valid), () => gen.break());
        });
    }
}
exports.validateAdditionalItems = validateAdditionalItems;
exports.default = def;
//# sourceMappingURL=additionalItems.js.map

/***/ }),

/***/ 3481:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const code_1 = __nccwpck_require__(4205);
const codegen_1 = __nccwpck_require__(9179);
const names_1 = __nccwpck_require__(50);
const util_1 = __nccwpck_require__(3439);
const error = {
    message: "must NOT have additional properties",
    params: ({ params }) => codegen_1._ `{additionalProperty: ${params.additionalProperty}}`,
};
const def = {
    keyword: "additionalProperties",
    type: ["object"],
    schemaType: ["boolean", "object"],
    allowUndefined: true,
    trackErrors: true,
    error,
    code(cxt) {
        const { gen, schema, parentSchema, data, errsCount, it } = cxt;
        /* istanbul ignore if */
        if (!errsCount)
            throw new Error("ajv implementation error");
        const { allErrors, opts } = it;
        it.props = true;
        if (opts.removeAdditional !== "all" && util_1.alwaysValidSchema(it, schema))
            return;
        const props = code_1.allSchemaProperties(parentSchema.properties);
        const patProps = code_1.allSchemaProperties(parentSchema.patternProperties);
        checkAdditionalProperties();
        cxt.ok(codegen_1._ `${errsCount} === ${names_1.default.errors}`);
        function checkAdditionalProperties() {
            gen.forIn("key", data, (key) => {
                if (!props.length && !patProps.length)
                    additionalPropertyCode(key);
                else
                    gen.if(isAdditional(key), () => additionalPropertyCode(key));
            });
        }
        function isAdditional(key) {
            let definedProp;
            if (props.length > 8) {
                // TODO maybe an option instead of hard-coded 8?
                const propsSchema = util_1.schemaRefOrVal(it, parentSchema.properties, "properties");
                definedProp = code_1.isOwnProperty(gen, propsSchema, key);
            }
            else if (props.length) {
                definedProp = codegen_1.or(...props.map((p) => codegen_1._ `${key} === ${p}`));
            }
            else {
                definedProp = codegen_1.nil;
            }
            if (patProps.length) {
                definedProp = codegen_1.or(definedProp, ...patProps.map((p) => codegen_1._ `${code_1.usePattern(cxt, p)}.test(${key})`));
            }
            return codegen_1.not(definedProp);
        }
        function deleteAdditional(key) {
            gen.code(codegen_1._ `delete ${data}[${key}]`);
        }
        function additionalPropertyCode(key) {
            if (opts.removeAdditional === "all" || (opts.removeAdditional && schema === false)) {
                deleteAdditional(key);
                return;
            }
            if (schema === false) {
                cxt.setParams({ additionalProperty: key });
                cxt.error();
                if (!allErrors)
                    gen.break();
                return;
            }
            if (typeof schema == "object" && !util_1.alwaysValidSchema(it, schema)) {
                const valid = gen.name("valid");
                if (opts.removeAdditional === "failing") {
                    applyAdditionalSchema(key, valid, false);
                    gen.if(codegen_1.not(valid), () => {
                        cxt.reset();
                        deleteAdditional(key);
                    });
                }
                else {
                    applyAdditionalSchema(key, valid);
                    if (!allErrors)
                        gen.if(codegen_1.not(valid), () => gen.break());
                }
            }
        }
        function applyAdditionalSchema(key, valid, errors) {
            const subschema = {
                keyword: "additionalProperties",
                dataProp: key,
                dataPropType: util_1.Type.Str,
            };
            if (errors === false) {
                Object.assign(subschema, {
                    compositeRule: true,
                    createErrors: false,
                    allErrors: false,
                });
            }
            cxt.subschema(subschema, valid);
        }
    },
};
exports.default = def;
//# sourceMappingURL=additionalProperties.js.map

/***/ }),

/***/ 8406:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const util_1 = __nccwpck_require__(3439);
const def = {
    keyword: "allOf",
    schemaType: "array",
    code(cxt) {
        const { gen, schema, it } = cxt;
        /* istanbul ignore if */
        if (!Array.isArray(schema))
            throw new Error("ajv implementation error");
        const valid = gen.name("valid");
        schema.forEach((sch, i) => {
            if (util_1.alwaysValidSchema(it, sch))
                return;
            const schCxt = cxt.subschema({ keyword: "allOf", schemaProp: i }, valid);
            cxt.ok(valid);
            cxt.mergeEvaluated(schCxt);
        });
    },
};
exports.default = def;
//# sourceMappingURL=allOf.js.map

/***/ }),

/***/ 8168:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const code_1 = __nccwpck_require__(4205);
const def = {
    keyword: "anyOf",
    schemaType: "array",
    trackErrors: true,
    code: code_1.validateUnion,
    error: { message: "must match a schema in anyOf" },
};
exports.default = def;
//# sourceMappingURL=anyOf.js.map

/***/ }),

/***/ 9535:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __nccwpck_require__(9179);
const util_1 = __nccwpck_require__(3439);
const error = {
    message: ({ params: { min, max } }) => max === undefined
        ? codegen_1.str `must contain at least ${min} valid item(s)`
        : codegen_1.str `must contain at least ${min} and no more than ${max} valid item(s)`,
    params: ({ params: { min, max } }) => max === undefined ? codegen_1._ `{minContains: ${min}}` : codegen_1._ `{minContains: ${min}, maxContains: ${max}}`,
};
const def = {
    keyword: "contains",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    trackErrors: true,
    error,
    code(cxt) {
        const { gen, schema, parentSchema, data, it } = cxt;
        let min;
        let max;
        const { minContains, maxContains } = parentSchema;
        if (it.opts.next) {
            min = minContains === undefined ? 1 : minContains;
            max = maxContains;
        }
        else {
            min = 1;
        }
        const len = gen.const("len", codegen_1._ `${data}.length`);
        cxt.setParams({ min, max });
        if (max === undefined && min === 0) {
            util_1.checkStrictMode(it, `"minContains" == 0 without "maxContains": "contains" keyword ignored`);
            return;
        }
        if (max !== undefined && min > max) {
            util_1.checkStrictMode(it, `"minContains" > "maxContains" is always invalid`);
            cxt.fail();
            return;
        }
        if (util_1.alwaysValidSchema(it, schema)) {
            let cond = codegen_1._ `${len} >= ${min}`;
            if (max !== undefined)
                cond = codegen_1._ `${cond} && ${len} <= ${max}`;
            cxt.pass(cond);
            return;
        }
        it.items = true;
        const valid = gen.name("valid");
        if (max === undefined && min === 1) {
            validateItems(valid, () => gen.if(valid, () => gen.break()));
        }
        else {
            gen.let(valid, false);
            const schValid = gen.name("_valid");
            const count = gen.let("count", 0);
            validateItems(schValid, () => gen.if(schValid, () => checkLimits(count)));
        }
        cxt.result(valid, () => cxt.reset());
        function validateItems(_valid, block) {
            gen.forRange("i", 0, len, (i) => {
                cxt.subschema({
                    keyword: "contains",
                    dataProp: i,
                    dataPropType: util_1.Type.Num,
                    compositeRule: true,
                }, _valid);
                block();
            });
        }
        function checkLimits(count) {
            gen.code(codegen_1._ `${count}++`);
            if (max === undefined) {
                gen.if(codegen_1._ `${count} >= ${min}`, () => gen.assign(valid, true).break());
            }
            else {
                gen.if(codegen_1._ `${count} > ${max}`, () => gen.assign(valid, false).break());
                if (min === 1)
                    gen.assign(valid, true);
                else
                    gen.if(codegen_1._ `${count} >= ${min}`, () => gen.assign(valid, true));
            }
        }
    },
};
exports.default = def;
//# sourceMappingURL=contains.js.map

/***/ }),

/***/ 4611:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateSchemaDeps = exports.validatePropertyDeps = exports.error = void 0;
const codegen_1 = __nccwpck_require__(9179);
const util_1 = __nccwpck_require__(3439);
const code_1 = __nccwpck_require__(4205);
exports.error = {
    message: ({ params: { property, depsCount, deps } }) => {
        const property_ies = depsCount === 1 ? "property" : "properties";
        return codegen_1.str `must have ${property_ies} ${deps} when property ${property} is present`;
    },
    params: ({ params: { property, depsCount, deps, missingProperty } }) => codegen_1._ `{property: ${property},
    missingProperty: ${missingProperty},
    depsCount: ${depsCount},
    deps: ${deps}}`, // TODO change to reference
};
const def = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: exports.error,
    code(cxt) {
        const [propDeps, schDeps] = splitDependencies(cxt);
        validatePropertyDeps(cxt, propDeps);
        validateSchemaDeps(cxt, schDeps);
    },
};
function splitDependencies({ schema }) {
    const propertyDeps = {};
    const schemaDeps = {};
    for (const key in schema) {
        if (key === "__proto__")
            continue;
        const deps = Array.isArray(schema[key]) ? propertyDeps : schemaDeps;
        deps[key] = schema[key];
    }
    return [propertyDeps, schemaDeps];
}
function validatePropertyDeps(cxt, propertyDeps = cxt.schema) {
    const { gen, data, it } = cxt;
    if (Object.keys(propertyDeps).length === 0)
        return;
    const missing = gen.let("missing");
    for (const prop in propertyDeps) {
        const deps = propertyDeps[prop];
        if (deps.length === 0)
            continue;
        const hasProperty = code_1.propertyInData(gen, data, prop, it.opts.ownProperties);
        cxt.setParams({
            property: prop,
            depsCount: deps.length,
            deps: deps.join(", "),
        });
        if (it.allErrors) {
            gen.if(hasProperty, () => {
                for (const depProp of deps) {
                    code_1.checkReportMissingProp(cxt, depProp);
                }
            });
        }
        else {
            gen.if(codegen_1._ `${hasProperty} && (${code_1.checkMissingProp(cxt, deps, missing)})`);
            code_1.reportMissingProp(cxt, missing);
            gen.else();
        }
    }
}
exports.validatePropertyDeps = validatePropertyDeps;
function validateSchemaDeps(cxt, schemaDeps = cxt.schema) {
    const { gen, data, keyword, it } = cxt;
    const valid = gen.name("valid");
    for (const prop in schemaDeps) {
        if (util_1.alwaysValidSchema(it, schemaDeps[prop]))
            continue;
        gen.if(code_1.propertyInData(gen, data, prop, it.opts.ownProperties), () => {
            const schCxt = cxt.subschema({ keyword, schemaProp: prop }, valid);
            cxt.mergeValidEvaluated(schCxt, valid);
        }, () => gen.var(valid, true) // TODO var
        );
        cxt.ok(valid);
    }
}
exports.validateSchemaDeps = validateSchemaDeps;
exports.default = def;
//# sourceMappingURL=dependencies.js.map

/***/ }),

/***/ 7701:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __nccwpck_require__(9179);
const util_1 = __nccwpck_require__(3439);
const error = {
    message: ({ params }) => codegen_1.str `must match "${params.ifClause}" schema`,
    params: ({ params }) => codegen_1._ `{failingKeyword: ${params.ifClause}}`,
};
const def = {
    keyword: "if",
    schemaType: ["object", "boolean"],
    trackErrors: true,
    error,
    code(cxt) {
        const { gen, parentSchema, it } = cxt;
        if (parentSchema.then === undefined && parentSchema.else === undefined) {
            util_1.checkStrictMode(it, '"if" without "then" and "else" is ignored');
        }
        const hasThen = hasSchema(it, "then");
        const hasElse = hasSchema(it, "else");
        if (!hasThen && !hasElse)
            return;
        const valid = gen.let("valid", true);
        const schValid = gen.name("_valid");
        validateIf();
        cxt.reset();
        if (hasThen && hasElse) {
            const ifClause = gen.let("ifClause");
            cxt.setParams({ ifClause });
            gen.if(schValid, validateClause("then", ifClause), validateClause("else", ifClause));
        }
        else if (hasThen) {
            gen.if(schValid, validateClause("then"));
        }
        else {
            gen.if(codegen_1.not(schValid), validateClause("else"));
        }
        cxt.pass(valid, () => cxt.error(true));
        function validateIf() {
            const schCxt = cxt.subschema({
                keyword: "if",
                compositeRule: true,
                createErrors: false,
                allErrors: false,
            }, schValid);
            cxt.mergeEvaluated(schCxt);
        }
        function validateClause(keyword, ifClause) {
            return () => {
                const schCxt = cxt.subschema({ keyword }, schValid);
                gen.assign(valid, schValid);
                cxt.mergeValidEvaluated(schCxt, valid);
                if (ifClause)
                    gen.assign(ifClause, codegen_1._ `${keyword}`);
                else
                    cxt.setParams({ ifClause: keyword });
            };
        }
    },
};
function hasSchema(it, keyword) {
    const schema = it.schema[keyword];
    return schema !== undefined && !util_1.alwaysValidSchema(it, schema);
}
exports.default = def;
//# sourceMappingURL=if.js.map

/***/ }),

/***/ 3048:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const additionalItems_1 = __nccwpck_require__(4720);
const prefixItems_1 = __nccwpck_require__(9498);
const items_1 = __nccwpck_require__(8008);
const items2020_1 = __nccwpck_require__(9084);
const contains_1 = __nccwpck_require__(9535);
const dependencies_1 = __nccwpck_require__(4611);
const propertyNames_1 = __nccwpck_require__(2554);
const additionalProperties_1 = __nccwpck_require__(3481);
const properties_1 = __nccwpck_require__(7666);
const patternProperties_1 = __nccwpck_require__(5157);
const not_1 = __nccwpck_require__(8720);
const anyOf_1 = __nccwpck_require__(8168);
const oneOf_1 = __nccwpck_require__(6434);
const allOf_1 = __nccwpck_require__(8406);
const if_1 = __nccwpck_require__(7701);
const thenElse_1 = __nccwpck_require__(7680);
function getApplicator(draft2020 = false) {
    const applicator = [
        // any
        not_1.default,
        anyOf_1.default,
        oneOf_1.default,
        allOf_1.default,
        if_1.default,
        thenElse_1.default,
        // object
        propertyNames_1.default,
        additionalProperties_1.default,
        dependencies_1.default,
        properties_1.default,
        patternProperties_1.default,
    ];
    // array
    if (draft2020)
        applicator.push(prefixItems_1.default, items2020_1.default);
    else
        applicator.push(additionalItems_1.default, items_1.default);
    applicator.push(contains_1.default);
    return applicator;
}
exports.default = getApplicator;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 8008:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateTuple = void 0;
const codegen_1 = __nccwpck_require__(9179);
const util_1 = __nccwpck_require__(3439);
const code_1 = __nccwpck_require__(4205);
const def = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "array", "boolean"],
    before: "uniqueItems",
    code(cxt) {
        const { schema, it } = cxt;
        if (Array.isArray(schema))
            return validateTuple(cxt, "additionalItems", schema);
        it.items = true;
        if (util_1.alwaysValidSchema(it, schema))
            return;
        cxt.ok(code_1.validateArray(cxt));
    },
};
function validateTuple(cxt, extraItems, schArr = cxt.schema) {
    const { gen, parentSchema, data, keyword, it } = cxt;
    checkStrictTuple(parentSchema);
    if (it.opts.unevaluated && schArr.length && it.items !== true) {
        it.items = util_1.mergeEvaluated.items(gen, schArr.length, it.items);
    }
    const valid = gen.name("valid");
    const len = gen.const("len", codegen_1._ `${data}.length`);
    schArr.forEach((sch, i) => {
        if (util_1.alwaysValidSchema(it, sch))
            return;
        gen.if(codegen_1._ `${len} > ${i}`, () => cxt.subschema({
            keyword,
            schemaProp: i,
            dataProp: i,
        }, valid));
        cxt.ok(valid);
    });
    function checkStrictTuple(sch) {
        const { opts, errSchemaPath } = it;
        const l = schArr.length;
        const fullTuple = l === sch.minItems && (l === sch.maxItems || sch[extraItems] === false);
        if (opts.strictTuples && !fullTuple) {
            const msg = `"${keyword}" is ${l}-tuple, but minItems or maxItems/${extraItems} are not specified or different at path "${errSchemaPath}"`;
            util_1.checkStrictMode(it, msg, opts.strictTuples);
        }
    }
}
exports.validateTuple = validateTuple;
exports.default = def;
//# sourceMappingURL=items.js.map

/***/ }),

/***/ 9084:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __nccwpck_require__(9179);
const util_1 = __nccwpck_require__(3439);
const code_1 = __nccwpck_require__(4205);
const additionalItems_1 = __nccwpck_require__(4720);
const error = {
    message: ({ params: { len } }) => codegen_1.str `must NOT have more than ${len} items`,
    params: ({ params: { len } }) => codegen_1._ `{limit: ${len}}`,
};
const def = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    error,
    code(cxt) {
        const { schema, parentSchema, it } = cxt;
        const { prefixItems } = parentSchema;
        it.items = true;
        if (util_1.alwaysValidSchema(it, schema))
            return;
        if (prefixItems)
            additionalItems_1.validateAdditionalItems(cxt, prefixItems);
        else
            cxt.ok(code_1.validateArray(cxt));
    },
};
exports.default = def;
//# sourceMappingURL=items2020.js.map

/***/ }),

/***/ 8720:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const util_1 = __nccwpck_require__(3439);
const def = {
    keyword: "not",
    schemaType: ["object", "boolean"],
    trackErrors: true,
    code(cxt) {
        const { gen, schema, it } = cxt;
        if (util_1.alwaysValidSchema(it, schema)) {
            cxt.fail();
            return;
        }
        const valid = gen.name("valid");
        cxt.subschema({
            keyword: "not",
            compositeRule: true,
            createErrors: false,
            allErrors: false,
        }, valid);
        cxt.failResult(valid, () => cxt.reset(), () => cxt.error());
    },
    error: { message: "must NOT be valid" },
};
exports.default = def;
//# sourceMappingURL=not.js.map

/***/ }),

/***/ 6434:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __nccwpck_require__(9179);
const util_1 = __nccwpck_require__(3439);
const error = {
    message: "must match exactly one schema in oneOf",
    params: ({ params }) => codegen_1._ `{passingSchemas: ${params.passing}}`,
};
const def = {
    keyword: "oneOf",
    schemaType: "array",
    trackErrors: true,
    error,
    code(cxt) {
        const { gen, schema, parentSchema, it } = cxt;
        /* istanbul ignore if */
        if (!Array.isArray(schema))
            throw new Error("ajv implementation error");
        if (it.opts.discriminator && parentSchema.discriminator)
            return;
        const schArr = schema;
        const valid = gen.let("valid", false);
        const passing = gen.let("passing", null);
        const schValid = gen.name("_valid");
        cxt.setParams({ passing });
        // TODO possibly fail straight away (with warning or exception) if there are two empty always valid schemas
        gen.block(validateOneOf);
        cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
        function validateOneOf() {
            schArr.forEach((sch, i) => {
                let schCxt;
                if (util_1.alwaysValidSchema(it, sch)) {
                    gen.var(schValid, true);
                }
                else {
                    schCxt = cxt.subschema({
                        keyword: "oneOf",
                        schemaProp: i,
                        compositeRule: true,
                    }, schValid);
                }
                if (i > 0) {
                    gen
                        .if(codegen_1._ `${schValid} && ${valid}`)
                        .assign(valid, false)
                        .assign(passing, codegen_1._ `[${passing}, ${i}]`)
                        .else();
                }
                gen.if(schValid, () => {
                    gen.assign(valid, true);
                    gen.assign(passing, i);
                    if (schCxt)
                        cxt.mergeEvaluated(schCxt, codegen_1.Name);
                });
            });
        }
    },
};
exports.default = def;
//# sourceMappingURL=oneOf.js.map

/***/ }),

/***/ 5157:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const code_1 = __nccwpck_require__(4205);
const codegen_1 = __nccwpck_require__(9179);
const util_1 = __nccwpck_require__(3439);
const util_2 = __nccwpck_require__(3439);
const def = {
    keyword: "patternProperties",
    type: "object",
    schemaType: "object",
    code(cxt) {
        const { gen, schema, data, parentSchema, it } = cxt;
        const { opts } = it;
        const patterns = code_1.allSchemaProperties(schema);
        const alwaysValidPatterns = patterns.filter((p) => util_1.alwaysValidSchema(it, schema[p]));
        if (patterns.length === 0 ||
            (alwaysValidPatterns.length === patterns.length &&
                (!it.opts.unevaluated || it.props === true))) {
            return;
        }
        const checkProperties = opts.strictSchema && !opts.allowMatchingProperties && parentSchema.properties;
        const valid = gen.name("valid");
        if (it.props !== true && !(it.props instanceof codegen_1.Name)) {
            it.props = util_2.evaluatedPropsToName(gen, it.props);
        }
        const { props } = it;
        validatePatternProperties();
        function validatePatternProperties() {
            for (const pat of patterns) {
                if (checkProperties)
                    checkMatchingProperties(pat);
                if (it.allErrors) {
                    validateProperties(pat);
                }
                else {
                    gen.var(valid, true); // TODO var
                    validateProperties(pat);
                    gen.if(valid);
                }
            }
        }
        function checkMatchingProperties(pat) {
            for (const prop in checkProperties) {
                if (new RegExp(pat).test(prop)) {
                    util_1.checkStrictMode(it, `property ${prop} matches pattern ${pat} (use allowMatchingProperties)`);
                }
            }
        }
        function validateProperties(pat) {
            gen.forIn("key", data, (key) => {
                gen.if(codegen_1._ `${code_1.usePattern(cxt, pat)}.test(${key})`, () => {
                    const alwaysValid = alwaysValidPatterns.includes(pat);
                    if (!alwaysValid) {
                        cxt.subschema({
                            keyword: "patternProperties",
                            schemaProp: pat,
                            dataProp: key,
                            dataPropType: util_2.Type.Str,
                        }, valid);
                    }
                    if (it.opts.unevaluated && props !== true) {
                        gen.assign(codegen_1._ `${props}[${key}]`, true);
                    }
                    else if (!alwaysValid && !it.allErrors) {
                        // can short-circuit if `unevaluatedProperties` is not supported (opts.next === false)
                        // or if all properties were evaluated (props === true)
                        gen.if(codegen_1.not(valid), () => gen.break());
                    }
                });
            });
        }
    },
};
exports.default = def;
//# sourceMappingURL=patternProperties.js.map

/***/ }),

/***/ 9498:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const items_1 = __nccwpck_require__(8008);
const def = {
    keyword: "prefixItems",
    type: "array",
    schemaType: ["array"],
    before: "uniqueItems",
    code: (cxt) => items_1.validateTuple(cxt, "items"),
};
exports.default = def;
//# sourceMappingURL=prefixItems.js.map

/***/ }),

/***/ 7666:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const validate_1 = __nccwpck_require__(8955);
const code_1 = __nccwpck_require__(4205);
const util_1 = __nccwpck_require__(3439);
const additionalProperties_1 = __nccwpck_require__(3481);
const def = {
    keyword: "properties",
    type: "object",
    schemaType: "object",
    code(cxt) {
        const { gen, schema, parentSchema, data, it } = cxt;
        if (it.opts.removeAdditional === "all" && parentSchema.additionalProperties === undefined) {
            additionalProperties_1.default.code(new validate_1.KeywordCxt(it, additionalProperties_1.default, "additionalProperties"));
        }
        const allProps = code_1.allSchemaProperties(schema);
        for (const prop of allProps) {
            it.definedProperties.add(prop);
        }
        if (it.opts.unevaluated && allProps.length && it.props !== true) {
            it.props = util_1.mergeEvaluated.props(gen, util_1.toHash(allProps), it.props);
        }
        const properties = allProps.filter((p) => !util_1.alwaysValidSchema(it, schema[p]));
        if (properties.length === 0)
            return;
        const valid = gen.name("valid");
        for (const prop of properties) {
            if (hasDefault(prop)) {
                applyPropertySchema(prop);
            }
            else {
                gen.if(code_1.propertyInData(gen, data, prop, it.opts.ownProperties));
                applyPropertySchema(prop);
                if (!it.allErrors)
                    gen.else().var(valid, true);
                gen.endIf();
            }
            cxt.it.definedProperties.add(prop);
            cxt.ok(valid);
        }
        function hasDefault(prop) {
            return it.opts.useDefaults && !it.compositeRule && schema[prop].default !== undefined;
        }
        function applyPropertySchema(prop) {
            cxt.subschema({
                keyword: "properties",
                schemaProp: prop,
                dataProp: prop,
            }, valid);
        }
    },
};
exports.default = def;
//# sourceMappingURL=properties.js.map

/***/ }),

/***/ 2554:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __nccwpck_require__(9179);
const util_1 = __nccwpck_require__(3439);
const error = {
    message: "property name must be valid",
    params: ({ params }) => codegen_1._ `{propertyName: ${params.propertyName}}`,
};
const def = {
    keyword: "propertyNames",
    type: "object",
    schemaType: ["object", "boolean"],
    error,
    code(cxt) {
        const { gen, schema, data, it } = cxt;
        if (util_1.alwaysValidSchema(it, schema))
            return;
        const valid = gen.name("valid");
        gen.forIn("key", data, (key) => {
            cxt.setParams({ propertyName: key });
            cxt.subschema({
                keyword: "propertyNames",
                data: key,
                dataTypes: ["string"],
                propertyName: key,
                compositeRule: true,
            }, valid);
            gen.if(codegen_1.not(valid), () => {
                cxt.error(true);
                if (!it.allErrors)
                    gen.break();
            });
        });
        cxt.ok(valid);
    },
};
exports.default = def;
//# sourceMappingURL=propertyNames.js.map

/***/ }),

/***/ 7680:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const util_1 = __nccwpck_require__(3439);
const def = {
    keyword: ["then", "else"],
    schemaType: ["object", "boolean"],
    code({ keyword, parentSchema, it }) {
        if (parentSchema.if === undefined)
            util_1.checkStrictMode(it, `"${keyword}" without "if" is ignored`);
    },
};
exports.default = def;
//# sourceMappingURL=thenElse.js.map

/***/ }),

/***/ 4205:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateUnion = exports.validateArray = exports.usePattern = exports.callValidateCode = exports.schemaProperties = exports.allSchemaProperties = exports.noPropertyInData = exports.propertyInData = exports.isOwnProperty = exports.hasPropFunc = exports.reportMissingProp = exports.checkMissingProp = exports.checkReportMissingProp = void 0;
const codegen_1 = __nccwpck_require__(9179);
const util_1 = __nccwpck_require__(3439);
const names_1 = __nccwpck_require__(50);
function checkReportMissingProp(cxt, prop) {
    const { gen, data, it } = cxt;
    gen.if(noPropertyInData(gen, data, prop, it.opts.ownProperties), () => {
        cxt.setParams({ missingProperty: codegen_1._ `${prop}` }, true);
        cxt.error();
    });
}
exports.checkReportMissingProp = checkReportMissingProp;
function checkMissingProp({ gen, data, it: { opts } }, properties, missing) {
    return codegen_1.or(...properties.map((prop) => codegen_1.and(noPropertyInData(gen, data, prop, opts.ownProperties), codegen_1._ `${missing} = ${prop}`)));
}
exports.checkMissingProp = checkMissingProp;
function reportMissingProp(cxt, missing) {
    cxt.setParams({ missingProperty: missing }, true);
    cxt.error();
}
exports.reportMissingProp = reportMissingProp;
function hasPropFunc(gen) {
    return gen.scopeValue("func", {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        ref: Object.prototype.hasOwnProperty,
        code: codegen_1._ `Object.prototype.hasOwnProperty`,
    });
}
exports.hasPropFunc = hasPropFunc;
function isOwnProperty(gen, data, property) {
    return codegen_1._ `${hasPropFunc(gen)}.call(${data}, ${property})`;
}
exports.isOwnProperty = isOwnProperty;
function propertyInData(gen, data, property, ownProperties) {
    const cond = codegen_1._ `${data}${codegen_1.getProperty(property)} !== undefined`;
    return ownProperties ? codegen_1._ `${cond} && ${isOwnProperty(gen, data, property)}` : cond;
}
exports.propertyInData = propertyInData;
function noPropertyInData(gen, data, property, ownProperties) {
    const cond = codegen_1._ `${data}${codegen_1.getProperty(property)} === undefined`;
    return ownProperties ? codegen_1.or(cond, codegen_1.not(isOwnProperty(gen, data, property))) : cond;
}
exports.noPropertyInData = noPropertyInData;
function allSchemaProperties(schemaMap) {
    return schemaMap ? Object.keys(schemaMap).filter((p) => p !== "__proto__") : [];
}
exports.allSchemaProperties = allSchemaProperties;
function schemaProperties(it, schemaMap) {
    return allSchemaProperties(schemaMap).filter((p) => !util_1.alwaysValidSchema(it, schemaMap[p]));
}
exports.schemaProperties = schemaProperties;
function callValidateCode({ schemaCode, data, it: { gen, topSchemaRef, schemaPath, errorPath }, it }, func, context, passSchema) {
    const dataAndSchema = passSchema ? codegen_1._ `${schemaCode}, ${data}, ${topSchemaRef}${schemaPath}` : data;
    const valCxt = [
        [names_1.default.instancePath, codegen_1.strConcat(names_1.default.instancePath, errorPath)],
        [names_1.default.parentData, it.parentData],
        [names_1.default.parentDataProperty, it.parentDataProperty],
        [names_1.default.rootData, names_1.default.rootData],
    ];
    if (it.opts.dynamicRef)
        valCxt.push([names_1.default.dynamicAnchors, names_1.default.dynamicAnchors]);
    const args = codegen_1._ `${dataAndSchema}, ${gen.object(...valCxt)}`;
    return context !== codegen_1.nil ? codegen_1._ `${func}.call(${context}, ${args})` : codegen_1._ `${func}(${args})`;
}
exports.callValidateCode = callValidateCode;
function usePattern({ gen, it: { opts } }, pattern) {
    const u = opts.unicodeRegExp ? "u" : "";
    return gen.scopeValue("pattern", {
        key: pattern,
        ref: new RegExp(pattern, u),
        code: codegen_1._ `new RegExp(${pattern}, ${u})`,
    });
}
exports.usePattern = usePattern;
function validateArray(cxt) {
    const { gen, data, keyword, it } = cxt;
    const valid = gen.name("valid");
    if (it.allErrors) {
        const validArr = gen.let("valid", true);
        validateItems(() => gen.assign(validArr, false));
        return validArr;
    }
    gen.var(valid, true);
    validateItems(() => gen.break());
    return valid;
    function validateItems(notValid) {
        const len = gen.const("len", codegen_1._ `${data}.length`);
        gen.forRange("i", 0, len, (i) => {
            cxt.subschema({
                keyword,
                dataProp: i,
                dataPropType: util_1.Type.Num,
            }, valid);
            gen.if(codegen_1.not(valid), notValid);
        });
    }
}
exports.validateArray = validateArray;
function validateUnion(cxt) {
    const { gen, schema, keyword, it } = cxt;
    /* istanbul ignore if */
    if (!Array.isArray(schema))
        throw new Error("ajv implementation error");
    const alwaysValid = schema.some((sch) => util_1.alwaysValidSchema(it, sch));
    if (alwaysValid && !it.opts.unevaluated)
        return;
    const valid = gen.let("valid", false);
    const schValid = gen.name("_valid");
    gen.block(() => schema.forEach((_sch, i) => {
        const schCxt = cxt.subschema({
            keyword,
            schemaProp: i,
            compositeRule: true,
        }, schValid);
        gen.assign(valid, codegen_1._ `${valid} || ${schValid}`);
        const merged = cxt.mergeValidEvaluated(schCxt, schValid);
        // can short-circuit if `unevaluatedProperties/Items` not supported (opts.unevaluated !== true)
        // or if all properties and items were evaluated (it.props === true && it.items === true)
        if (!merged)
            gen.if(codegen_1.not(valid));
    }));
    cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
}
exports.validateUnion = validateUnion;
//# sourceMappingURL=code.js.map

/***/ }),

/***/ 1674:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const def = {
    keyword: "id",
    code() {
        throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
    },
};
exports.default = def;
//# sourceMappingURL=id.js.map

/***/ }),

/***/ 3707:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const id_1 = __nccwpck_require__(1674);
const ref_1 = __nccwpck_require__(6532);
const core = [
    "$schema",
    "$id",
    "$defs",
    "$vocabulary",
    { keyword: "$comment" },
    "definitions",
    id_1.default,
    ref_1.default,
];
exports.default = core;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 6532:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.callRef = exports.getValidate = void 0;
const ref_error_1 = __nccwpck_require__(8190);
const code_1 = __nccwpck_require__(4205);
const codegen_1 = __nccwpck_require__(9179);
const names_1 = __nccwpck_require__(50);
const compile_1 = __nccwpck_require__(813);
const util_1 = __nccwpck_require__(3439);
const def = {
    keyword: "$ref",
    schemaType: "string",
    code(cxt) {
        const { gen, schema: $ref, it } = cxt;
        const { baseId, schemaEnv: env, validateName, opts, self } = it;
        const { root } = env;
        if (($ref === "#" || $ref === "#/") && baseId === root.baseId)
            return callRootRef();
        const schOrEnv = compile_1.resolveRef.call(self, root, baseId, $ref);
        if (schOrEnv === undefined)
            throw new ref_error_1.default(baseId, $ref);
        if (schOrEnv instanceof compile_1.SchemaEnv)
            return callValidate(schOrEnv);
        return inlineRefSchema(schOrEnv);
        function callRootRef() {
            if (env === root)
                return callRef(cxt, validateName, env, env.$async);
            const rootName = gen.scopeValue("root", { ref: root });
            return callRef(cxt, codegen_1._ `${rootName}.validate`, root, root.$async);
        }
        function callValidate(sch) {
            const v = getValidate(cxt, sch);
            callRef(cxt, v, sch, sch.$async);
        }
        function inlineRefSchema(sch) {
            const schName = gen.scopeValue("schema", opts.code.source === true ? { ref: sch, code: codegen_1.stringify(sch) } : { ref: sch });
            const valid = gen.name("valid");
            const schCxt = cxt.subschema({
                schema: sch,
                dataTypes: [],
                schemaPath: codegen_1.nil,
                topSchemaRef: schName,
                errSchemaPath: $ref,
            }, valid);
            cxt.mergeEvaluated(schCxt);
            cxt.ok(valid);
        }
    },
};
function getValidate(cxt, sch) {
    const { gen } = cxt;
    return sch.validate
        ? gen.scopeValue("validate", { ref: sch.validate })
        : codegen_1._ `${gen.scopeValue("wrapper", { ref: sch })}.validate`;
}
exports.getValidate = getValidate;
function callRef(cxt, v, sch, $async) {
    const { gen, it } = cxt;
    const { allErrors, schemaEnv: env, opts } = it;
    const passCxt = opts.passContext ? names_1.default.this : codegen_1.nil;
    if ($async)
        callAsyncRef();
    else
        callSyncRef();
    function callAsyncRef() {
        if (!env.$async)
            throw new Error("async schema referenced by sync schema");
        const valid = gen.let("valid");
        gen.try(() => {
            gen.code(codegen_1._ `await ${code_1.callValidateCode(cxt, v, passCxt)}`);
            addEvaluatedFrom(v); // TODO will not work with async, it has to be returned with the result
            if (!allErrors)
                gen.assign(valid, true);
        }, (e) => {
            gen.if(codegen_1._ `!(${e} instanceof ${it.ValidationError})`, () => gen.throw(e));
            addErrorsFrom(e);
            if (!allErrors)
                gen.assign(valid, false);
        });
        cxt.ok(valid);
    }
    function callSyncRef() {
        cxt.result(code_1.callValidateCode(cxt, v, passCxt), () => addEvaluatedFrom(v), () => addErrorsFrom(v));
    }
    function addErrorsFrom(source) {
        const errs = codegen_1._ `${source}.errors`;
        gen.assign(names_1.default.vErrors, codegen_1._ `${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`); // TODO tagged
        gen.assign(names_1.default.errors, codegen_1._ `${names_1.default.vErrors}.length`);
    }
    function addEvaluatedFrom(source) {
        var _a;
        if (!it.opts.unevaluated)
            return;
        const schEvaluated = (_a = sch === null || sch === void 0 ? void 0 : sch.validate) === null || _a === void 0 ? void 0 : _a.evaluated;
        // TODO refactor
        if (it.props !== true) {
            if (schEvaluated && !schEvaluated.dynamicProps) {
                if (schEvaluated.props !== undefined) {
                    it.props = util_1.mergeEvaluated.props(gen, schEvaluated.props, it.props);
                }
            }
            else {
                const props = gen.var("props", codegen_1._ `${source}.evaluated.props`);
                it.props = util_1.mergeEvaluated.props(gen, props, it.props, codegen_1.Name);
            }
        }
        if (it.items !== true) {
            if (schEvaluated && !schEvaluated.dynamicItems) {
                if (schEvaluated.items !== undefined) {
                    it.items = util_1.mergeEvaluated.items(gen, schEvaluated.items, it.items);
                }
            }
            else {
                const items = gen.var("items", codegen_1._ `${source}.evaluated.items`);
                it.items = util_1.mergeEvaluated.items(gen, items, it.items, codegen_1.Name);
            }
        }
    }
}
exports.callRef = callRef;
exports.default = def;
//# sourceMappingURL=ref.js.map

/***/ }),

/***/ 4025:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __nccwpck_require__(9179);
const types_1 = __nccwpck_require__(8374);
const error = {
    message: ({ params: { discrError, tagName } }) => discrError === types_1.DiscrError.Tag
        ? `tag "${tagName}" must be string`
        : `value of tag "${tagName}" must be in oneOf`,
    params: ({ params: { discrError, tag, tagName } }) => codegen_1._ `{error: ${discrError}, tag: ${tagName}, tagValue: ${tag}}`,
};
const def = {
    keyword: "discriminator",
    type: "object",
    schemaType: "object",
    error,
    code(cxt) {
        const { gen, data, schema, parentSchema, it } = cxt;
        const { oneOf } = parentSchema;
        if (!it.opts.discriminator) {
            throw new Error("discriminator: requires discriminator option");
        }
        const tagName = schema.propertyName;
        if (typeof tagName != "string")
            throw new Error("discriminator: requires propertyName");
        if (schema.mapping)
            throw new Error("discriminator: mapping is not supported");
        if (!oneOf)
            throw new Error("discriminator: requires oneOf keyword");
        const valid = gen.let("valid", false);
        const tag = gen.const("tag", codegen_1._ `${data}${codegen_1.getProperty(tagName)}`);
        gen.if(codegen_1._ `typeof ${tag} == "string"`, () => validateMapping(), () => cxt.error(false, { discrError: types_1.DiscrError.Tag, tag, tagName }));
        cxt.ok(valid);
        function validateMapping() {
            const mapping = getMapping();
            gen.if(false);
            for (const tagValue in mapping) {
                gen.elseIf(codegen_1._ `${tag} === ${tagValue}`);
                gen.assign(valid, applyTagSchema(mapping[tagValue]));
            }
            gen.else();
            cxt.error(false, { discrError: types_1.DiscrError.Mapping, tag, tagName });
            gen.endIf();
        }
        function applyTagSchema(schemaProp) {
            const _valid = gen.name("valid");
            const schCxt = cxt.subschema({ keyword: "oneOf", schemaProp }, _valid);
            cxt.mergeEvaluated(schCxt, codegen_1.Name);
            return _valid;
        }
        function getMapping() {
            var _a;
            const oneOfMapping = {};
            const topRequired = hasRequired(parentSchema);
            let tagRequired = true;
            for (let i = 0; i < oneOf.length; i++) {
                const sch = oneOf[i];
                const propSch = (_a = sch.properties) === null || _a === void 0 ? void 0 : _a[tagName];
                if (typeof propSch != "object") {
                    throw new Error(`discriminator: oneOf schemas must have "properties/${tagName}"`);
                }
                tagRequired = tagRequired && (topRequired || hasRequired(sch));
                addMappings(propSch, i);
            }
            if (!tagRequired)
                throw new Error(`discriminator: "${tagName}" must be required`);
            return oneOfMapping;
            function hasRequired({ required }) {
                return Array.isArray(required) && required.includes(tagName);
            }
            function addMappings(sch, i) {
                if (sch.const) {
                    addMapping(sch.const, i);
                }
                else if (sch.enum) {
                    for (const tagValue of sch.enum) {
                        addMapping(tagValue, i);
                    }
                }
                else {
                    throw new Error(`discriminator: "properties/${tagName}" must have "const" or "enum"`);
                }
            }
            function addMapping(tagValue, i) {
                if (typeof tagValue != "string" || tagValue in oneOfMapping) {
                    throw new Error(`discriminator: "${tagName}" values must be unique strings`);
                }
                oneOfMapping[tagValue] = i;
            }
        }
    },
};
exports.default = def;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 8374:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DiscrError = void 0;
var DiscrError;
(function (DiscrError) {
    DiscrError["Tag"] = "tag";
    DiscrError["Mapping"] = "mapping";
})(DiscrError = exports.DiscrError || (exports.DiscrError = {}));
//# sourceMappingURL=types.js.map

/***/ }),

/***/ 691:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __nccwpck_require__(3707);
const validation_1 = __nccwpck_require__(9805);
const applicator_1 = __nccwpck_require__(3048);
const format_1 = __nccwpck_require__(9841);
const metadata_1 = __nccwpck_require__(5799);
const draft7Vocabularies = [
    core_1.default,
    validation_1.default,
    applicator_1.default(),
    format_1.default,
    metadata_1.metadataVocabulary,
    metadata_1.contentVocabulary,
];
exports.default = draft7Vocabularies;
//# sourceMappingURL=draft7.js.map

/***/ }),

/***/ 3691:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __nccwpck_require__(9179);
const error = {
    message: ({ schemaCode }) => codegen_1.str `must match format "${schemaCode}"`,
    params: ({ schemaCode }) => codegen_1._ `{format: ${schemaCode}}`,
};
const def = {
    keyword: "format",
    type: ["number", "string"],
    schemaType: "string",
    $data: true,
    error,
    code(cxt, ruleType) {
        const { gen, data, $data, schema, schemaCode, it } = cxt;
        const { opts, errSchemaPath, schemaEnv, self } = it;
        if (!opts.validateFormats)
            return;
        if ($data)
            validate$DataFormat();
        else
            validateFormat();
        function validate$DataFormat() {
            const fmts = gen.scopeValue("formats", {
                ref: self.formats,
                code: opts.code.formats,
            });
            const fDef = gen.const("fDef", codegen_1._ `${fmts}[${schemaCode}]`);
            const fType = gen.let("fType");
            const format = gen.let("format");
            // TODO simplify
            gen.if(codegen_1._ `typeof ${fDef} == "object" && !(${fDef} instanceof RegExp)`, () => gen.assign(fType, codegen_1._ `${fDef}.type || "string"`).assign(format, codegen_1._ `${fDef}.validate`), () => gen.assign(fType, codegen_1._ `"string"`).assign(format, fDef));
            cxt.fail$data(codegen_1.or(unknownFmt(), invalidFmt()));
            function unknownFmt() {
                if (opts.strictSchema === false)
                    return codegen_1.nil;
                return codegen_1._ `${schemaCode} && !${format}`;
            }
            function invalidFmt() {
                const callFormat = schemaEnv.$async
                    ? codegen_1._ `(${fDef}.async ? await ${format}(${data}) : ${format}(${data}))`
                    : codegen_1._ `${format}(${data})`;
                const validData = codegen_1._ `(typeof ${format} == "function" ? ${callFormat} : ${format}.test(${data}))`;
                return codegen_1._ `${format} && ${format} !== true && ${fType} === ${ruleType} && !${validData}`;
            }
        }
        function validateFormat() {
            const formatDef = self.formats[schema];
            if (!formatDef) {
                unknownFormat();
                return;
            }
            if (formatDef === true)
                return;
            const [fmtType, format, fmtRef] = getFormat(formatDef);
            if (fmtType === ruleType)
                cxt.pass(validCondition());
            function unknownFormat() {
                if (opts.strictSchema === false) {
                    self.logger.warn(unknownMsg());
                    return;
                }
                throw new Error(unknownMsg());
                function unknownMsg() {
                    return `unknown format "${schema}" ignored in schema at path "${errSchemaPath}"`;
                }
            }
            function getFormat(fmtDef) {
                const code = fmtDef instanceof RegExp
                    ? codegen_1.regexpCode(fmtDef)
                    : opts.code.formats
                        ? codegen_1._ `${opts.code.formats}${codegen_1.getProperty(schema)}`
                        : undefined;
                const fmt = gen.scopeValue("formats", { key: schema, ref: fmtDef, code });
                if (typeof fmtDef == "object" && !(fmtDef instanceof RegExp)) {
                    return [fmtDef.type || "string", fmtDef.validate, codegen_1._ `${fmt}.validate`];
                }
                return ["string", fmtDef, fmt];
            }
            function validCondition() {
                if (typeof formatDef == "object" && !(formatDef instanceof RegExp) && formatDef.async) {
                    if (!schemaEnv.$async)
                        throw new Error("async format in sync schema");
                    return codegen_1._ `await ${fmtRef}(${data})`;
                }
                return typeof format == "function" ? codegen_1._ `${fmtRef}(${data})` : codegen_1._ `${fmtRef}.test(${data})`;
            }
        }
    },
};
exports.default = def;
//# sourceMappingURL=format.js.map

/***/ }),

/***/ 9841:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const format_1 = __nccwpck_require__(3691);
const format = [format_1.default];
exports.default = format;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 5799:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.contentVocabulary = exports.metadataVocabulary = void 0;
exports.metadataVocabulary = [
    "title",
    "description",
    "default",
    "deprecated",
    "readOnly",
    "writeOnly",
    "examples",
];
exports.contentVocabulary = [
    "contentMediaType",
    "contentEncoding",
    "contentSchema",
];
//# sourceMappingURL=metadata.js.map

/***/ }),

/***/ 3694:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __nccwpck_require__(9179);
const util_1 = __nccwpck_require__(3439);
const equal_1 = __nccwpck_require__(3809);
const error = {
    message: "must be equal to constant",
    params: ({ schemaCode }) => codegen_1._ `{allowedValue: ${schemaCode}}`,
};
const def = {
    keyword: "const",
    $data: true,
    error,
    code(cxt) {
        const { gen, data, $data, schemaCode, schema } = cxt;
        if ($data || (schema && typeof schema == "object")) {
            cxt.fail$data(codegen_1._ `!${util_1.useFunc(gen, equal_1.default)}(${data}, ${schemaCode})`);
        }
        else {
            cxt.fail(codegen_1._ `${schema} !== ${data}`);
        }
    },
};
exports.default = def;
//# sourceMappingURL=const.js.map

/***/ }),

/***/ 5529:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __nccwpck_require__(9179);
const util_1 = __nccwpck_require__(3439);
const equal_1 = __nccwpck_require__(3809);
const error = {
    message: "must be equal to one of the allowed values",
    params: ({ schemaCode }) => codegen_1._ `{allowedValues: ${schemaCode}}`,
};
const def = {
    keyword: "enum",
    schemaType: "array",
    $data: true,
    error,
    code(cxt) {
        const { gen, data, $data, schema, schemaCode, it } = cxt;
        if (!$data && schema.length === 0)
            throw new Error("enum must have non-empty array");
        const useLoop = schema.length >= it.opts.loopEnum;
        const eql = util_1.useFunc(gen, equal_1.default);
        let valid;
        if (useLoop || $data) {
            valid = gen.let("valid");
            cxt.block$data(valid, loopEnum);
        }
        else {
            /* istanbul ignore if */
            if (!Array.isArray(schema))
                throw new Error("ajv implementation error");
            const vSchema = gen.const("vSchema", schemaCode);
            valid = codegen_1.or(...schema.map((_x, i) => equalCode(vSchema, i)));
        }
        cxt.pass(valid);
        function loopEnum() {
            gen.assign(valid, false);
            gen.forOf("v", schemaCode, (v) => gen.if(codegen_1._ `${eql}(${data}, ${v})`, () => gen.assign(valid, true).break()));
        }
        function equalCode(vSchema, i) {
            const sch = schema[i];
            return typeof sch === "object" && sch !== null
                ? codegen_1._ `${eql}(${data}, ${vSchema}[${i}])`
                : codegen_1._ `${data} === ${sch}`;
        }
    },
};
exports.default = def;
//# sourceMappingURL=enum.js.map

/***/ }),

/***/ 9805:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const limitNumber_1 = __nccwpck_require__(345);
const multipleOf_1 = __nccwpck_require__(3201);
const limitLength_1 = __nccwpck_require__(7598);
const pattern_1 = __nccwpck_require__(4960);
const limitProperties_1 = __nccwpck_require__(3470);
const required_1 = __nccwpck_require__(3602);
const limitItems_1 = __nccwpck_require__(3924);
const uniqueItems_1 = __nccwpck_require__(9351);
const const_1 = __nccwpck_require__(3694);
const enum_1 = __nccwpck_require__(5529);
const validation = [
    // number
    limitNumber_1.default,
    multipleOf_1.default,
    // string
    limitLength_1.default,
    pattern_1.default,
    // object
    limitProperties_1.default,
    required_1.default,
    // array
    limitItems_1.default,
    uniqueItems_1.default,
    // any
    { keyword: "type", schemaType: ["string", "array"] },
    { keyword: "nullable", schemaType: "boolean" },
    const_1.default,
    enum_1.default,
];
exports.default = validation;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 3924:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __nccwpck_require__(9179);
const error = {
    message({ keyword, schemaCode }) {
        const comp = keyword === "maxItems" ? "more" : "fewer";
        return codegen_1.str `must NOT have ${comp} than ${schemaCode} items`;
    },
    params: ({ schemaCode }) => codegen_1._ `{limit: ${schemaCode}}`,
};
const def = {
    keyword: ["maxItems", "minItems"],
    type: "array",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        const op = keyword === "maxItems" ? codegen_1.operators.GT : codegen_1.operators.LT;
        cxt.fail$data(codegen_1._ `${data}.length ${op} ${schemaCode}`);
    },
};
exports.default = def;
//# sourceMappingURL=limitItems.js.map

/***/ }),

/***/ 7598:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __nccwpck_require__(9179);
const util_1 = __nccwpck_require__(3439);
const ucs2length_1 = __nccwpck_require__(2470);
const error = {
    message({ keyword, schemaCode }) {
        const comp = keyword === "maxLength" ? "more" : "fewer";
        return codegen_1.str `must NOT have ${comp} than ${schemaCode} characters`;
    },
    params: ({ schemaCode }) => codegen_1._ `{limit: ${schemaCode}}`,
};
const def = {
    keyword: ["maxLength", "minLength"],
    type: "string",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
        const { keyword, data, schemaCode, it } = cxt;
        const op = keyword === "maxLength" ? codegen_1.operators.GT : codegen_1.operators.LT;
        const len = it.opts.unicode === false ? codegen_1._ `${data}.length` : codegen_1._ `${util_1.useFunc(cxt.gen, ucs2length_1.default)}(${data})`;
        cxt.fail$data(codegen_1._ `${len} ${op} ${schemaCode}`);
    },
};
exports.default = def;
//# sourceMappingURL=limitLength.js.map

/***/ }),

/***/ 345:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __nccwpck_require__(9179);
const ops = codegen_1.operators;
const KWDs = {
    maximum: { okStr: "<=", ok: ops.LTE, fail: ops.GT },
    minimum: { okStr: ">=", ok: ops.GTE, fail: ops.LT },
    exclusiveMaximum: { okStr: "<", ok: ops.LT, fail: ops.GTE },
    exclusiveMinimum: { okStr: ">", ok: ops.GT, fail: ops.LTE },
};
const error = {
    message: ({ keyword, schemaCode }) => codegen_1.str `must be ${KWDs[keyword].okStr} ${schemaCode}`,
    params: ({ keyword, schemaCode }) => codegen_1._ `{comparison: ${KWDs[keyword].okStr}, limit: ${schemaCode}}`,
};
const def = {
    keyword: Object.keys(KWDs),
    type: "number",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        cxt.fail$data(codegen_1._ `${data} ${KWDs[keyword].fail} ${schemaCode} || isNaN(${data})`);
    },
};
exports.default = def;
//# sourceMappingURL=limitNumber.js.map

/***/ }),

/***/ 3470:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __nccwpck_require__(9179);
const error = {
    message({ keyword, schemaCode }) {
        const comp = keyword === "maxProperties" ? "more" : "fewer";
        return codegen_1.str `must NOT have ${comp} than ${schemaCode} items`;
    },
    params: ({ schemaCode }) => codegen_1._ `{limit: ${schemaCode}}`,
};
const def = {
    keyword: ["maxProperties", "minProperties"],
    type: "object",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        const op = keyword === "maxProperties" ? codegen_1.operators.GT : codegen_1.operators.LT;
        cxt.fail$data(codegen_1._ `Object.keys(${data}).length ${op} ${schemaCode}`);
    },
};
exports.default = def;
//# sourceMappingURL=limitProperties.js.map

/***/ }),

/***/ 3201:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __nccwpck_require__(9179);
const error = {
    message: ({ schemaCode }) => codegen_1.str `must be multiple of ${schemaCode}`,
    params: ({ schemaCode }) => codegen_1._ `{multipleOf: ${schemaCode}}`,
};
const def = {
    keyword: "multipleOf",
    type: "number",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
        const { gen, data, schemaCode, it } = cxt;
        // const bdt = bad$DataType(schemaCode, <string>def.schemaType, $data)
        const prec = it.opts.multipleOfPrecision;
        const res = gen.let("res");
        const invalid = prec
            ? codegen_1._ `Math.abs(Math.round(${res}) - ${res}) > 1e-${prec}`
            : codegen_1._ `${res} !== parseInt(${res})`;
        cxt.fail$data(codegen_1._ `(${schemaCode} === 0 || (${res} = ${data}/${schemaCode}, ${invalid}))`);
    },
};
exports.default = def;
//# sourceMappingURL=multipleOf.js.map

/***/ }),

/***/ 4960:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const code_1 = __nccwpck_require__(4205);
const codegen_1 = __nccwpck_require__(9179);
const error = {
    message: ({ schemaCode }) => codegen_1.str `must match pattern "${schemaCode}"`,
    params: ({ schemaCode }) => codegen_1._ `{pattern: ${schemaCode}}`,
};
const def = {
    keyword: "pattern",
    type: "string",
    schemaType: "string",
    $data: true,
    error,
    code(cxt) {
        const { data, $data, schema, schemaCode, it } = cxt;
        // TODO regexp should be wrapped in try/catchs
        const u = it.opts.unicodeRegExp ? "u" : "";
        const regExp = $data ? codegen_1._ `(new RegExp(${schemaCode}, ${u}))` : code_1.usePattern(cxt, schema);
        cxt.fail$data(codegen_1._ `!${regExp}.test(${data})`);
    },
};
exports.default = def;
//# sourceMappingURL=pattern.js.map

/***/ }),

/***/ 3602:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const code_1 = __nccwpck_require__(4205);
const codegen_1 = __nccwpck_require__(9179);
const util_1 = __nccwpck_require__(3439);
const error = {
    message: ({ params: { missingProperty } }) => codegen_1.str `must have required property '${missingProperty}'`,
    params: ({ params: { missingProperty } }) => codegen_1._ `{missingProperty: ${missingProperty}}`,
};
const def = {
    keyword: "required",
    type: "object",
    schemaType: "array",
    $data: true,
    error,
    code(cxt) {
        const { gen, schema, schemaCode, data, $data, it } = cxt;
        const { opts } = it;
        if (!$data && schema.length === 0)
            return;
        const useLoop = schema.length >= opts.loopRequired;
        if (it.allErrors)
            allErrorsMode();
        else
            exitOnErrorMode();
        if (opts.strictRequired) {
            const props = cxt.parentSchema.properties;
            const { definedProperties } = cxt.it;
            for (const requiredKey of schema) {
                if ((props === null || props === void 0 ? void 0 : props[requiredKey]) === undefined && !definedProperties.has(requiredKey)) {
                    const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
                    const msg = `required property "${requiredKey}" is not defined at "${schemaPath}" (strictRequired)`;
                    util_1.checkStrictMode(it, msg, it.opts.strictRequired);
                }
            }
        }
        function allErrorsMode() {
            if (useLoop || $data) {
                cxt.block$data(codegen_1.nil, loopAllRequired);
            }
            else {
                for (const prop of schema) {
                    code_1.checkReportMissingProp(cxt, prop);
                }
            }
        }
        function exitOnErrorMode() {
            const missing = gen.let("missing");
            if (useLoop || $data) {
                const valid = gen.let("valid", true);
                cxt.block$data(valid, () => loopUntilMissing(missing, valid));
                cxt.ok(valid);
            }
            else {
                gen.if(code_1.checkMissingProp(cxt, schema, missing));
                code_1.reportMissingProp(cxt, missing);
                gen.else();
            }
        }
        function loopAllRequired() {
            gen.forOf("prop", schemaCode, (prop) => {
                cxt.setParams({ missingProperty: prop });
                gen.if(code_1.noPropertyInData(gen, data, prop, opts.ownProperties), () => cxt.error());
            });
        }
        function loopUntilMissing(missing, valid) {
            cxt.setParams({ missingProperty: missing });
            gen.forOf(missing, schemaCode, () => {
                gen.assign(valid, code_1.propertyInData(gen, data, missing, opts.ownProperties));
                gen.if(codegen_1.not(valid), () => {
                    cxt.error();
                    gen.break();
                });
            }, codegen_1.nil);
        }
    },
};
exports.default = def;
//# sourceMappingURL=required.js.map

/***/ }),

/***/ 9351:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const dataType_1 = __nccwpck_require__(7725);
const codegen_1 = __nccwpck_require__(9179);
const util_1 = __nccwpck_require__(3439);
const equal_1 = __nccwpck_require__(3809);
const error = {
    message: ({ params: { i, j } }) => codegen_1.str `must NOT have duplicate items (items ## ${j} and ${i} are identical)`,
    params: ({ params: { i, j } }) => codegen_1._ `{i: ${i}, j: ${j}}`,
};
const def = {
    keyword: "uniqueItems",
    type: "array",
    schemaType: "boolean",
    $data: true,
    error,
    code(cxt) {
        const { gen, data, $data, schema, parentSchema, schemaCode, it } = cxt;
        if (!$data && !schema)
            return;
        const valid = gen.let("valid");
        const itemTypes = parentSchema.items ? dataType_1.getSchemaTypes(parentSchema.items) : [];
        cxt.block$data(valid, validateUniqueItems, codegen_1._ `${schemaCode} === false`);
        cxt.ok(valid);
        function validateUniqueItems() {
            const i = gen.let("i", codegen_1._ `${data}.length`);
            const j = gen.let("j");
            cxt.setParams({ i, j });
            gen.assign(valid, true);
            gen.if(codegen_1._ `${i} > 1`, () => (canOptimize() ? loopN : loopN2)(i, j));
        }
        function canOptimize() {
            return itemTypes.length > 0 && !itemTypes.some((t) => t === "object" || t === "array");
        }
        function loopN(i, j) {
            const item = gen.name("item");
            const wrongType = dataType_1.checkDataTypes(itemTypes, item, it.opts.strictNumbers, dataType_1.DataType.Wrong);
            const indices = gen.const("indices", codegen_1._ `{}`);
            gen.for(codegen_1._ `;${i}--;`, () => {
                gen.let(item, codegen_1._ `${data}[${i}]`);
                gen.if(wrongType, codegen_1._ `continue`);
                if (itemTypes.length > 1)
                    gen.if(codegen_1._ `typeof ${item} == "string"`, codegen_1._ `${item} += "_"`);
                gen
                    .if(codegen_1._ `typeof ${indices}[${item}] == "number"`, () => {
                    gen.assign(j, codegen_1._ `${indices}[${item}]`);
                    cxt.error();
                    gen.assign(valid, false).break();
                })
                    .code(codegen_1._ `${indices}[${item}] = ${i}`);
            });
        }
        function loopN2(i, j) {
            const eql = util_1.useFunc(gen, equal_1.default);
            const outer = gen.name("outer");
            gen.label(outer).for(codegen_1._ `;${i}--;`, () => gen.for(codegen_1._ `${j} = ${i}; ${j}--;`, () => gen.if(codegen_1._ `${eql}(${data}[${i}], ${data}[${j}])`, () => {
                cxt.error();
                gen.assign(valid, false).break(outer);
            })));
        }
    },
};
exports.default = def;
//# sourceMappingURL=uniqueItems.js.map

/***/ }),

/***/ 2371:
/***/ ((module) => {

"use strict";

/**
 * Returns a `Buffer` instance from the given data URI `uri`.
 *
 * @param {String} uri Data URI to turn into a Buffer instance
 * @return {Buffer} Buffer instance from Data URI
 * @api public
 */
function dataUriToBuffer(uri) {
    if (!/^data:/i.test(uri)) {
        throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
    }
    // strip newlines
    uri = uri.replace(/\r?\n/g, '');
    // split the URI up into the "metadata" and the "data" portions
    const firstComma = uri.indexOf(',');
    if (firstComma === -1 || firstComma <= 4) {
        throw new TypeError('malformed data: URI');
    }
    // remove the "data:" scheme and parse the metadata
    const meta = uri.substring(5, firstComma).split(';');
    let charset = '';
    let base64 = false;
    const type = meta[0] || 'text/plain';
    let typeFull = type;
    for (let i = 1; i < meta.length; i++) {
        if (meta[i] === 'base64') {
            base64 = true;
        }
        else {
            typeFull += `;${meta[i]}`;
            if (meta[i].indexOf('charset=') === 0) {
                charset = meta[i].substring(8);
            }
        }
    }
    // defaults to US-ASCII only if type is not provided
    if (!meta[0] && !charset.length) {
        typeFull += ';charset=US-ASCII';
        charset = 'US-ASCII';
    }
    // get the encoded data portion and decode URI-encoded chars
    const encoding = base64 ? 'base64' : 'ascii';
    const data = unescape(uri.substring(firstComma + 1));
    const buffer = Buffer.from(data, encoding);
    // set `.type` and `.typeFull` properties to MIME type
    buffer.type = type;
    buffer.typeFull = typeFull;
    // set the `.charset` property
    buffer.charset = charset;
    return buffer;
}
module.exports = dataUriToBuffer;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 8206:
/***/ ((module) => {

"use strict";


// do not edit .js files directly - edit src/index.jst



module.exports = function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }



    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      var key = keys[i];

      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  // true if both NaN, false otherwise
  return a!==a && b!==b;
};


/***/ }),

/***/ 2533:
/***/ ((module) => {

"use strict";


var traverse = module.exports = function (schema, opts, cb) {
  // Legacy support for v0.3.1 and earlier.
  if (typeof opts == 'function') {
    cb = opts;
    opts = {};
  }

  cb = opts.cb || cb;
  var pre = (typeof cb == 'function') ? cb : cb.pre || function() {};
  var post = cb.post || function() {};

  _traverse(opts, pre, post, schema, '', schema);
};


traverse.keywords = {
  additionalItems: true,
  items: true,
  contains: true,
  additionalProperties: true,
  propertyNames: true,
  not: true,
  if: true,
  then: true,
  else: true
};

traverse.arrayKeywords = {
  items: true,
  allOf: true,
  anyOf: true,
  oneOf: true
};

traverse.propsKeywords = {
  $defs: true,
  definitions: true,
  properties: true,
  patternProperties: true,
  dependencies: true
};

traverse.skipKeywords = {
  default: true,
  enum: true,
  const: true,
  required: true,
  maximum: true,
  minimum: true,
  exclusiveMaximum: true,
  exclusiveMinimum: true,
  multipleOf: true,
  maxLength: true,
  minLength: true,
  pattern: true,
  format: true,
  maxItems: true,
  minItems: true,
  uniqueItems: true,
  maxProperties: true,
  minProperties: true
};


function _traverse(opts, pre, post, schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
  if (schema && typeof schema == 'object' && !Array.isArray(schema)) {
    pre(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
    for (var key in schema) {
      var sch = schema[key];
      if (Array.isArray(sch)) {
        if (key in traverse.arrayKeywords) {
          for (var i=0; i<sch.length; i++)
            _traverse(opts, pre, post, sch[i], jsonPtr + '/' + key + '/' + i, rootSchema, jsonPtr, key, schema, i);
        }
      } else if (key in traverse.propsKeywords) {
        if (sch && typeof sch == 'object') {
          for (var prop in sch)
            _traverse(opts, pre, post, sch[prop], jsonPtr + '/' + key + '/' + escapeJsonPtr(prop), rootSchema, jsonPtr, key, schema, prop);
        }
      } else if (key in traverse.keywords || (opts.allKeys && !(key in traverse.skipKeywords))) {
        _traverse(opts, pre, post, sch, jsonPtr + '/' + key, rootSchema, jsonPtr, key, schema);
      }
    }
    post(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
  }
}


function escapeJsonPtr(str) {
  return str.replace(/~/g, '~0').replace(/\//g, '~1');
}


/***/ }),

/***/ 5595:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OperatorSubscriber = void 0;
const rxjs_1 = __nccwpck_require__(1752);
const defaultComplete = rxjs_1.Subscriber.prototype._complete;
const defaultError = rxjs_1.Subscriber.prototype._error;
const defaultNext = rxjs_1.Subscriber.prototype._next;
class OperatorSubscriber extends rxjs_1.Subscriber {
    constructor(destination, handlers) {
        super(destination);
        const { complete, error, next } = handlers;
        this._complete = complete
            ? () => {
                try {
                    complete();
                }
                catch (caught) {
                    destination.error(caught);
                }
                this.unsubscribe();
            }
            : defaultComplete;
        this._error = error
            ? (received) => {
                try {
                    error(received);
                }
                catch (caught) {
                    destination.error(caught);
                }
                this.unsubscribe();
            }
            : defaultError;
        this._next = next
            ? (value) => {
                try {
                    next(value);
                }
                catch (caught) {
                    destination.error(caught);
                }
            }
            : defaultNext;
    }
}
exports.OperatorSubscriber = OperatorSubscriber;
//# sourceMappingURL=OperatorSubscriber.js.map

/***/ }),

/***/ 5480:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.auditMap = void 0;
const rxjs_1 = __nccwpck_require__(1752);
const operators_1 = __nccwpck_require__(749);
function auditMap(project) {
    return (source) => {
        let pending = false;
        let queued = undefined;
        return source.pipe(operators_1.mergeMap((value, index) => {
            if (pending) {
                queued = [value, index];
                return rxjs_1.EMPTY;
            }
            pending = true;
            return rxjs_1.from(project(value, index)).pipe(operators_1.concat(rxjs_1.defer(() => {
                if (!queued) {
                    return rxjs_1.EMPTY;
                }
                const projected = project(...queued);
                queued = undefined;
                return rxjs_1.from(projected);
            })), operators_1.last(), operators_1.tap({
                complete: () => (pending = false),
            }));
        }));
    };
}
exports.auditMap = auditMap;
//# sourceMappingURL=auditMap.js.map

/***/ }),

/***/ 7406:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.bucketBy = void 0;
const rxjs_1 = __nccwpck_require__(1752);
function bucketBy(count, hashSelector, subjectSelector = () => new rxjs_1.Subject()) {
    return (source) => source.lift(new BucketByOperator(count, hashSelector, subjectSelector));
}
exports.bucketBy = bucketBy;
class BucketByOperator {
    constructor(count, hashSelector, subjectSelector) {
        this.count = count;
        this.hashSelector = hashSelector;
        this.subjectSelector = subjectSelector;
    }
    call(subscriber, source) {
        return source.subscribe(new BucketBySubscriber(subscriber, this.count, this.hashSelector, this.subjectSelector));
    }
}
class BucketBySubscriber extends rxjs_1.Subscriber {
    constructor(destination, count, hashSelector, subjectSelector) {
        super(destination);
        this.count = count;
        this.hashSelector = hashSelector;
        this.subjectSelector = subjectSelector;
        this.index = 0;
        const buckets = (this.buckets = new Array(count));
        for (let i = 0; i < count; ++i) {
            buckets[i] = subjectSelector();
        }
        destination.next(buckets.map((subject) => subject.asObservable()));
    }
    _next(value) {
        const { buckets, closed, count, hashSelector } = this;
        if (closed) {
            return;
        }
        let index;
        try {
            const hash = hashSelector(value, this.index++);
            index = Math.abs(Math.floor(hash)) % count;
        }
        catch (error) {
            this.error(error);
            return;
        }
        buckets[index].next(value);
    }
    _error(error) {
        const { buckets, closed, destination } = this;
        if (closed) {
            return;
        }
        buckets.forEach((bucket) => bucket.error(error));
        destination.error(error);
    }
    _complete() {
        const { buckets, closed, destination } = this;
        if (closed) {
            return;
        }
        buckets.forEach((bucket) => bucket.complete());
        destination.complete();
    }
}
//# sourceMappingURL=bucketBy.js.map

/***/ }),

/***/ 9067:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.bufferRecent = void 0;
const operators_1 = __nccwpck_require__(749);
function bufferRecent(count) {
    if (count < 1) {
        return (source) => source.pipe(operators_1.mapTo([]));
    }
    if (count === 1) {
        return (source) => source.pipe(operators_1.map((value) => [value]));
    }
    return (source) => source.pipe(operators_1.scan((acc, value) => [...acc.slice(1 - count), value], []));
}
exports.bufferRecent = bufferRecent;
//# sourceMappingURL=bufferRecent.js.map

/***/ }),

/***/ 8767:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.concatIfEmpty = void 0;
const rxjs_1 = __nccwpck_require__(1752);
const operators_1 = __nccwpck_require__(749);
function concatIfEmpty(observable) {
    return (source) => source.pipe(operators_1.publish((sharedSource) => rxjs_1.merge(sharedSource, sharedSource.pipe(operators_1.isEmpty(), operators_1.mergeMap((empty) => (empty ? observable : rxjs_1.EMPTY))))));
}
exports.concatIfEmpty = concatIfEmpty;
//# sourceMappingURL=concatIfEmpty.js.map

/***/ }),

/***/ 3490:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.concatMapEager = void 0;
const rxjs_1 = __nccwpck_require__(1752);
const operators_1 = __nccwpck_require__(749);
function concatMapEager(project, concurrency) {
    return (source) => rxjs_1.defer(() => {
        let activeIndex = 0;
        const innersByIndex = new Map();
        function flush() {
            const values = [];
            let activeInner = innersByIndex.get(activeIndex);
            while (activeInner) {
                values.push(...activeInner.values);
                activeInner.values.length = 0;
                if (activeInner.complete) {
                    innersByIndex.delete(activeIndex);
                    activeInner = innersByIndex.get(++activeIndex);
                }
                else {
                    break;
                }
            }
            return values;
        }
        return source.pipe(operators_1.mergeMap((value, index) => rxjs_1.from(project(value, index)).pipe(operators_1.materialize(), operators_1.map((notification) => ({
            index,
            notification,
        }))), concurrency), operators_1.mergeMap(({ index, notification }) => {
            let inner = innersByIndex.get(index);
            if (!inner) {
                inner = { complete: false, index, values: [] };
                innersByIndex.set(index, inner);
            }
            switch (notification.kind) {
                case "N":
                    inner.values.push(notification.value);
                    break;
                case "C":
                    inner.complete = true;
                    break;
                case "E":
                    return notification.toObservable();
                default:
                    break;
            }
            if (inner.index !== activeIndex) {
                return rxjs_1.EMPTY;
            }
            return flush();
        }));
    });
}
exports.concatMapEager = concatMapEager;
//# sourceMappingURL=concatMapEager.js.map

/***/ }),

/***/ 4560:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.concatTap = void 0;
const rxjs_1 = __nccwpck_require__(1752);
const operators_1 = __nccwpck_require__(749);
const endWith_1 = __nccwpck_require__(5237);
function concatTap(next) {
    return (source) => source.pipe(operators_1.concatMap((value) => rxjs_1.from(next(value)).pipe(operators_1.ignoreElements(), endWith_1.endWith(value))));
}
exports.concatTap = concatTap;
//# sourceMappingURL=concatTap.js.map

/***/ }),

/***/ 2222:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.debounceAfter = void 0;
const rxjs_1 = __nccwpck_require__(1752);
const operators_1 = __nccwpck_require__(749);
function debounceAfter(notifier, duration, scheduler) {
    return (source) => source.pipe(operators_1.publish((sharedSource) => notifier.pipe(operators_1.switchMap(() => rxjs_1.concat(rxjs_1.of(true), rxjs_1.of(false).pipe(operators_1.delay(duration, scheduler)))), operators_1.startWith(false), operators_1.distinctUntilChanged(), operators_1.publish((sharedSignal) => sharedSignal.pipe(operators_1.concatMap((signalled) => signalled
        ? sharedSource.pipe(operators_1.takeUntil(sharedSignal.pipe(operators_1.filter((signalled) => !signalled))), operators_1.takeLast(1))
        : sharedSource.pipe(operators_1.takeUntil(sharedSignal.pipe(operators_1.filter((signalled) => signalled))))))))));
}
exports.debounceAfter = debounceAfter;
//# sourceMappingURL=debounceAfter.js.map

/***/ }),

/***/ 8540:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.debounceSync = void 0;
const rxjs_1 = __nccwpck_require__(1752);
const OperatorSubscriber_1 = __nccwpck_require__(5595);
function debounceSync() {
    return (source) => new rxjs_1.Observable((subscriber) => {
        let actionSubscription;
        let actionValue;
        source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, {
            complete: () => {
                if (actionSubscription) {
                    subscriber.next(actionValue);
                }
                subscriber.complete();
            },
            error: (error) => subscriber.error(error),
            next: (value) => {
                actionValue = value;
                if (!actionSubscription) {
                    actionSubscription = rxjs_1.asapScheduler.schedule(() => {
                        subscriber.next(actionValue);
                        actionSubscription = undefined;
                    });
                    subscriber.add(actionSubscription);
                }
            },
        }));
    });
}
exports.debounceSync = debounceSync;
//# sourceMappingURL=debounceSync.js.map

/***/ }),

/***/ 7087:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.debounceTimeSubsequent = void 0;
const operators_1 = __nccwpck_require__(749);
const subsequent_1 = __nccwpck_require__(1910);
function debounceTimeSubsequent(duration, countOrScheduler, scheduler) {
    let count;
    if (typeof countOrScheduler === "number") {
        count = countOrScheduler;
    }
    else {
        count = 1;
        scheduler = countOrScheduler;
    }
    return subsequent_1.subsequent(count, operators_1.debounceTime(duration, scheduler));
}
exports.debounceTimeSubsequent = debounceTimeSubsequent;
//# sourceMappingURL=debounceTimeSubsequent.js.map

/***/ }),

/***/ 8326:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.switchIfEmpty = exports.defaultObservableIfEmpty = void 0;
const concatIfEmpty_1 = __nccwpck_require__(8767);
exports.defaultObservableIfEmpty = concatIfEmpty_1.concatIfEmpty;
exports.switchIfEmpty = concatIfEmpty_1.concatIfEmpty;
//# sourceMappingURL=defaultObservableIfEmpty.js.map

/***/ }),

/***/ 1366:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deferFinalize = void 0;
const rxjs_1 = __nccwpck_require__(1752);
const operators_1 = __nccwpck_require__(749);
function deferFinalize(callback) {
    return (source) => source.lift(new DeferFinalizeOperator(callback));
}
exports.deferFinalize = deferFinalize;
class DeferFinalizeOperator {
    constructor(callback) {
        this.callback = callback;
    }
    call(subscriber, source) {
        return source.subscribe(new DeferFinalizeSubscriber(subscriber, this.callback));
    }
}
class DeferFinalizeSubscriber extends rxjs_1.Subscriber {
    constructor(destination, callback) {
        super(destination);
        this.callback = callback;
        this.kind = "U";
        this.subscription = undefined;
    }
    complete() {
        this.kind = "C";
        this.defer(() => super.complete());
    }
    error(error) {
        this.kind = "E";
        this.defer(() => super.error(error));
    }
    unsubscribe() {
        this.defer(() => super.unsubscribe());
    }
    defer(func) {
        if (this.subscription) {
            this.subscription.add(func);
            return;
        }
        const subscription = new rxjs_1.Subscription();
        this.subscription = subscription;
        subscription.add(func);
        const result = this.callback(this.kind);
        rxjs_1.from(result)
            .pipe(operators_1.finalize(() => subscription.unsubscribe()))
            .subscribe();
    }
}
//# sourceMappingURL=deferFinalize.js.map

/***/ }),

/***/ 214:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.delayUntil = void 0;
const rxjs_1 = __nccwpck_require__(1752);
const operators_1 = __nccwpck_require__(749);
function delayUntil(notifier) {
    return (source) => source.pipe(operators_1.publish((published) => {
        const delayed = new rxjs_1.Observable((subscriber) => {
            let buffering = true;
            const buffer = [];
            const subscription = new rxjs_1.Subscription();
            subscription.add(notifier.subscribe(() => {
                buffer.forEach((value) => subscriber.next(value));
                subscriber.complete();
            }, (error) => subscriber.error(error), () => {
                buffering = false;
                buffer.length = 0;
            }));
            subscription.add(() => {
                buffer.length = 0;
            });
            subscription.add(published.subscribe((value) => buffering && buffer.push(value), (error) => subscriber.error(error)));
            return subscription;
        });
        return rxjs_1.concat(delayed, published);
    }));
}
exports.delayUntil = delayUntil;
//# sourceMappingURL=delayUntil.js.map

/***/ }),

/***/ 5500:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.dispose = void 0;
function dispose(callback) {
    return (source) => source.lift(new DisposeOperator(callback));
}
exports.dispose = dispose;
class DisposeOperator {
    constructor(callback) {
        this.callback = callback;
    }
    call(subscriber, source) {
        const subscription = source.subscribe(subscriber);
        subscription.add(this.callback);
        return subscription;
    }
}
//# sourceMappingURL=dispose.js.map

/***/ }),

/***/ 5237:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.endWith = void 0;
const rxjs_1 = __nccwpck_require__(1752);
const util_1 = __nccwpck_require__(3568);
function endWith(...args) {
    let scheduler = args[args.length - 1];
    if (util_1.isScheduler(scheduler)) {
        args.pop();
    }
    else {
        scheduler = null;
    }
    return (source) => rxjs_1.concat(source, rxjs_1.from(args, scheduler));
}
exports.endWith = endWith;
//# sourceMappingURL=endWith.js.map

/***/ }),

/***/ 2053:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.equals = void 0;
const operators_1 = __nccwpck_require__(749);
function equals(predicate) {
    return (source) => source.pipe(operators_1.filter((value) => predicate === value));
}
exports.equals = equals;
//# sourceMappingURL=equals.js.map

/***/ }),

/***/ 2523:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exhaustTap = void 0;
const rxjs_1 = __nccwpck_require__(1752);
const operators_1 = __nccwpck_require__(749);
const endWith_1 = __nccwpck_require__(5237);
function exhaustTap(next) {
    return (source) => source.pipe(operators_1.publishReplay(1, undefined, (published) => published.pipe(operators_1.exhaustMap((value) => rxjs_1.concat(published, rxjs_1.NEVER).pipe(operators_1.takeUntil(rxjs_1.from(next(value)).pipe(operators_1.ignoreElements(), endWith_1.endWith(null))), operators_1.toArray(), operators_1.mergeAll())))));
}
exports.exhaustTap = exhaustTap;
//# sourceMappingURL=exhaustTap.js.map

/***/ }),

/***/ 7798:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.finalizeWithKind = void 0;
const rxjs_1 = __nccwpck_require__(1752);
const operators_1 = __nccwpck_require__(749);
function finalizeWithKind(callback) {
    return (source) => rxjs_1.defer(() => {
        let kind = "U";
        return source.pipe(operators_1.tap({
            complete: () => (kind = "C"),
            error: () => (kind = "E"),
        }), operators_1.finalize(() => callback(kind)));
    });
}
exports.finalizeWithKind = finalizeWithKind;
//# sourceMappingURL=finalizeWithKind.js.map

/***/ }),

/***/ 7814:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.guard = void 0;
const operators_1 = __nccwpck_require__(749);
function guard(guard, message) {
    return (source) => source.pipe(operators_1.map((value) => {
        if (guard(value)) {
            return value;
        }
        const error = new Error(message || "Guard rejection.");
        error["value"] = value;
        throw error;
    }));
}
exports.guard = guard;
//# sourceMappingURL=guard.js.map

/***/ }),

/***/ 6967:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.hold = void 0;
const operators_1 = __nccwpck_require__(749);
function hold(releaseNotifier) {
    return (source) => source.pipe(operators_1.buffer(releaseNotifier), operators_1.concatAll());
}
exports.hold = hold;
//# sourceMappingURL=hold.js.map

/***/ }),

/***/ 7975:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.holdToggle = void 0;
const operators_1 = __nccwpck_require__(749);
function holdToggle(captures, releaseSelector) {
    return (source) => source.pipe(operators_1.bufferToggle(captures, releaseSelector), operators_1.concatAll());
}
exports.holdToggle = holdToggle;
//# sourceMappingURL=holdToggle.js.map

/***/ }),

/***/ 9470:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.holdWhen = void 0;
const operators_1 = __nccwpck_require__(749);
function holdWhen(releaseSelector) {
    return (source) => source.pipe(operators_1.bufferWhen(releaseSelector), operators_1.concatAll());
}
exports.holdWhen = holdWhen;
//# sourceMappingURL=holdWhen.js.map

/***/ }),

/***/ 6286:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__nccwpck_require__(5480), exports);
__exportStar(__nccwpck_require__(7406), exports);
__exportStar(__nccwpck_require__(9067), exports);
__exportStar(__nccwpck_require__(8767), exports);
__exportStar(__nccwpck_require__(4560), exports);
__exportStar(__nccwpck_require__(3490), exports);
__exportStar(__nccwpck_require__(2222), exports);
__exportStar(__nccwpck_require__(8540), exports);
__exportStar(__nccwpck_require__(7087), exports);
__exportStar(__nccwpck_require__(8326), exports);
__exportStar(__nccwpck_require__(1366), exports);
__exportStar(__nccwpck_require__(214), exports);
__exportStar(__nccwpck_require__(5500), exports);
__exportStar(__nccwpck_require__(5237), exports);
__exportStar(__nccwpck_require__(2053), exports);
__exportStar(__nccwpck_require__(2523), exports);
__exportStar(__nccwpck_require__(7798), exports);
__exportStar(__nccwpck_require__(7814), exports);
__exportStar(__nccwpck_require__(6967), exports);
__exportStar(__nccwpck_require__(7975), exports);
__exportStar(__nccwpck_require__(9470), exports);
__exportStar(__nccwpck_require__(7708), exports);
__exportStar(__nccwpck_require__(9260), exports);
__exportStar(__nccwpck_require__(4545), exports);
__exportStar(__nccwpck_require__(971), exports);
__exportStar(__nccwpck_require__(4821), exports);
__exportStar(__nccwpck_require__(9618), exports);
__exportStar(__nccwpck_require__(5582), exports);
__exportStar(__nccwpck_require__(2055), exports);
__exportStar(__nccwpck_require__(6414), exports);
__exportStar(__nccwpck_require__(6957), exports);
__exportStar(__nccwpck_require__(6607), exports);
__exportStar(__nccwpck_require__(9773), exports);
__exportStar(__nccwpck_require__(7275), exports);
__exportStar(__nccwpck_require__(8185), exports);
__exportStar(__nccwpck_require__(376), exports);
__exportStar(__nccwpck_require__(9892), exports);
__exportStar(__nccwpck_require__(2175), exports);
__exportStar(__nccwpck_require__(2410), exports);
__exportStar(__nccwpck_require__(286), exports);
__exportStar(__nccwpck_require__(5248), exports);
__exportStar(__nccwpck_require__(532), exports);
__exportStar(__nccwpck_require__(9965), exports);
__exportStar(__nccwpck_require__(727), exports);
__exportStar(__nccwpck_require__(1910), exports);
__exportStar(__nccwpck_require__(8370), exports);
__exportStar(__nccwpck_require__(4363), exports);
__exportStar(__nccwpck_require__(3080), exports);
__exportStar(__nccwpck_require__(12), exports);
__exportStar(__nccwpck_require__(2566), exports);
__exportStar(__nccwpck_require__(7070), exports);
__exportStar(__nccwpck_require__(1394), exports);
__exportStar(__nccwpck_require__(4516), exports);
__exportStar(__nccwpck_require__(9407), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 7708:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.indexElements = void 0;
const operators_1 = __nccwpck_require__(749);
function indexElements(project = (value, index) => index) {
    return operators_1.map(project);
}
exports.indexElements = indexElements;
//# sourceMappingURL=indexElements.js.map

/***/ }),

/***/ 9260:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.finalize = exports.inexorably = void 0;
const rxjs_1 = __nccwpck_require__(1752);
function inexorably(callback) {
    return (source) => source.lift(new InexorablyOperator(callback));
}
exports.inexorably = inexorably;
exports.finalize = inexorably;
class InexorablyOperator {
    constructor(callback) {
        this.callback = callback;
    }
    call(subscriber, source) {
        return source.subscribe(new InexorablySubscriber(subscriber, this.callback));
    }
}
class InexorablySubscriber extends rxjs_1.Subscriber {
    constructor(destination, callback) {
        super(destination);
        this.add(new rxjs_1.Subscription(() => callback(this.notification)));
    }
    complete() {
        this.notification = new rxjs_1.Notification("C");
        super.complete();
    }
    error(error) {
        this.notification = new rxjs_1.Notification("E", undefined, error);
        super.error(error);
    }
}
//# sourceMappingURL=inexorably.js.map

/***/ }),

/***/ 4545:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initial = void 0;
const rxjs_1 = __nccwpck_require__(1752);
const operators_1 = __nccwpck_require__(749);
function initial(countOrOperator, operator) {
    let count;
    if (typeof countOrOperator === "number") {
        count = countOrOperator;
    }
    else {
        count = 1;
        operator = countOrOperator;
    }
    return (source) => source.pipe(operators_1.publish((published) => rxjs_1.merge(published.pipe(operators_1.take(count), operator), published.pipe(operators_1.skip(count)))));
}
exports.initial = initial;
//# sourceMappingURL=initial.js.map

/***/ }),

/***/ 971:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.instanceOf = void 0;
const operators_1 = __nccwpck_require__(749);
function instanceOf(arg) {
    return typeof arg === "function"
        ? operators_1.filter((value) => value instanceof arg)
        : operators_1.filter((value) => Object.keys(arg).some((key) => value instanceof arg[key]));
}
exports.instanceOf = instanceOf;
//# sourceMappingURL=instanceOf.js.map

/***/ }),

/***/ 4821:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.materializeTap = void 0;
const rxjs_1 = __nccwpck_require__(1752);
const operators_1 = __nccwpck_require__(749);
function materializeTap(next) {
    return (source) => source.pipe(operators_1.tap({
        complete: () => next(new rxjs_1.Notification("C")),
        error: (error) => next(new rxjs_1.Notification("E", undefined, error)),
        next: (value) => next(new rxjs_1.Notification("N", value)),
    }));
}
exports.materializeTap = materializeTap;
//# sourceMappingURL=materializeTap.js.map

/***/ }),

/***/ 9618:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.materializeTo = void 0;
const rxjs_1 = __nccwpck_require__(1752);
const operators_1 = __nccwpck_require__(749);
function materializeTo(innerObservable) {
    return (source) => source.pipe(operators_1.mergeMapTo(rxjs_1.from(innerObservable).pipe(operators_1.materialize())), operators_1.dematerialize());
}
exports.materializeTo = materializeTo;
//# sourceMappingURL=materializeTo.js.map

/***/ }),

/***/ 5582:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mergeTap = void 0;
const rxjs_1 = __nccwpck_require__(1752);
const operators_1 = __nccwpck_require__(749);
const endWith_1 = __nccwpck_require__(5237);
function mergeTap(next) {
    return (source) => source.pipe(operators_1.mergeMap((value) => rxjs_1.from(next(value)).pipe(operators_1.ignoreElements(), endWith_1.endWith(value))));
}
exports.mergeTap = mergeTap;
//# sourceMappingURL=mergeTap.js.map

/***/ }),

/***/ 2055:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.multicastWithKind = void 0;
const operators_1 = __nccwpck_require__(749);
const finalizeWithKind_1 = __nccwpck_require__(7798);
function multicastWithKind(factory, selector) {
    return (source) => {
        let kind = undefined;
        let subject = undefined;
        return source.pipe(finalizeWithKind_1.finalizeWithKind((k) => (kind = k)), operators_1.multicast(() => {
            subject = factory(kind, subject);
            kind = undefined;
            return subject;
        }, selector));
    };
}
exports.multicastWithKind = multicastWithKind;
//# sourceMappingURL=multicastWithKind.js.map

/***/ }),

/***/ 6414:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.pairwiseStartWith = void 0;
const operators_1 = __nccwpck_require__(749);
function pairwiseStartWith(value) {
    return (source) => source.pipe(operators_1.startWith(value), operators_1.pairwise());
}
exports.pairwiseStartWith = pairwiseStartWith;
//# sourceMappingURL=pairwiseStartWith.js.map

/***/ }),

/***/ 6957:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.pause = void 0;
const operators_1 = __nccwpck_require__(749);
function pause(notifier, initialState = "resumed") {
    return (source) => notifier.pipe(operators_1.startWith(initialState), operators_1.publishReplay(1, undefined, (published) => source.pipe(operators_1.mergeMap((value) => published.pipe(operators_1.filter((state) => state === "resumed"), operators_1.first(), operators_1.map(() => value))))));
}
exports.pause = pause;
//# sourceMappingURL=pause.js.map

/***/ }),

/***/ 6607:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.percolate = void 0;
const rxjs_1 = __nccwpck_require__(1752);
function percolate(...sources) {
    const [first, ...remainder] = sources;
    if (sources.length === 1 && Array.isArray(first)) {
        return percolate(...first);
    }
    return new rxjs_1.Observable((subscriber) => {
        const subNext = (err) => {
            if (remainder.length === 0) {
                subscriber.error(err);
            }
            else {
                subscriber.add(percolate(...remainder).subscribe(subscriber));
            }
        };
        return rxjs_1.from(first).subscribe({
            complete: () => {
                subscriber.complete();
            },
            next(value) {
                subscriber.next(value);
            },
            error: subNext,
        });
    });
}
exports.percolate = percolate;
//# sourceMappingURL=percolate.js.map

/***/ }),

/***/ 9773:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.pluck = void 0;
const operators_1 = __nccwpck_require__(749);
function pluck(...keys) {
    return (source) => operators_1.pluck(...keys)(source);
}
exports.pluck = pluck;
//# sourceMappingURL=pluck.js.map

/***/ }),

/***/ 7275:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.prioritize = void 0;
const rxjs_1 = __nccwpck_require__(1752);
const operators_1 = __nccwpck_require__(749);
function prioritize(selector) {
    return (source) => new rxjs_1.Observable((observer) => {
        const published = operators_1.publish()(source);
        const subjects = [];
        const subscription = new rxjs_1.Subscription();
        const length = Math.max(selector.length, 2);
        for (let i = 0; i < length; ++i) {
            const subject = new rxjs_1.Subject();
            subjects.push(subject);
            subscription.add(published.subscribe(subject));
        }
        const [first, second, ...rest] = subjects;
        subscription.add(selector(first, second, ...rest).subscribe(observer));
        subscription.add(published.connect());
        return subscription;
    });
}
exports.prioritize = prioritize;
//# sourceMappingURL=prioritize.js.map

/***/ }),

/***/ 8185:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.rateLimit = void 0;
const rxjs_1 = __nccwpck_require__(1752);
const operators_1 = __nccwpck_require__(749);
function rateLimit(period, ...args) {
    let count = 1;
    let scheduler = rxjs_1.asapScheduler;
    if (args.length === 1) {
        if (typeof args[0] === "number") {
            count = args[0];
        }
        else {
            scheduler = args[0];
        }
    }
    else if (args.length === 2) {
        count = args[0];
        scheduler = args[1];
    }
    const definedCount = count || 1;
    return (source) => source.pipe(operators_1.scan((emissions, value) => {
        const now = scheduler.now();
        const since = now - period;
        emissions = emissions.filter((emission) => emission.until > since);
        if (emissions.length >= definedCount) {
            const leastRecentEmission = emissions[0];
            const mostRecentEmission = emissions[emissions.length - 1];
            const until = leastRecentEmission.until +
                period * Math.floor(emissions.length / definedCount);
            emissions.push({
                delay: mostRecentEmission.until < now
                    ? until - now
                    : until - mostRecentEmission.until,
                until,
                value,
            });
        }
        else {
            emissions.push({
                delay: 0,
                until: now,
                value,
            });
        }
        return emissions;
    }, []), operators_1.map((emissions) => emissions[emissions.length - 1]), operators_1.concatMap((emission) => {
        const observable = rxjs_1.of(emission.value);
        return emission.delay
            ? observable.pipe(operators_1.delay(emission.delay, scheduler))
            : observable;
    }));
}
exports.rateLimit = rateLimit;
//# sourceMappingURL=rateLimit.js.map

/***/ }),

/***/ 376:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.refCountAuditTime = exports.refCountDelay = void 0;
const rxjs_1 = __nccwpck_require__(1752);
const operators_1 = __nccwpck_require__(749);
function refCountDelay(duration, scheduler = rxjs_1.asapScheduler) {
    return (source) => {
        const connectable = source;
        let connectableSubscription = null;
        let connectorSubscription = null;
        const notifier = new rxjs_1.Subject();
        const connector = notifier.pipe(operators_1.scan((count, step) => count + step, 0), operators_1.switchMap((count) => {
            if (count === 0) {
                return rxjs_1.timer(duration, scheduler).pipe(operators_1.tap(() => {
                    if (connectableSubscription) {
                        connectableSubscription.unsubscribe();
                        connectableSubscription = null;
                    }
                    if (connectorSubscription) {
                        connectorSubscription.unsubscribe();
                        connectorSubscription = null;
                    }
                }));
            }
            if (!connectableSubscription && count > 0) {
                return rxjs_1.timer(0, scheduler).pipe(operators_1.tap(() => {
                    if (!connectableSubscription) {
                        connectableSubscription = connectable.connect();
                    }
                }));
            }
            return rxjs_1.NEVER;
        }));
        return rxjs_1.using(() => {
            if (!connectorSubscription) {
                connectorSubscription = connector.subscribe();
            }
            notifier.next(1);
            return { unsubscribe: () => notifier.next(-1) };
        }, () => source);
    };
}
exports.refCountDelay = refCountDelay;
exports.refCountAuditTime = refCountDelay;
//# sourceMappingURL=refCountDelay.js.map

/***/ }),

/***/ 9892:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.refCountForever = void 0;
const rxjs_1 = __nccwpck_require__(1752);
function refCountForever() {
    return (source) => {
        const connectable = source;
        let subscription = null;
        return rxjs_1.using(() => {
            if (!subscription) {
                subscription = connectable.connect();
            }
            return {
                unsubscribe: () => { },
            };
        }, () => source);
    };
}
exports.refCountForever = refCountForever;
//# sourceMappingURL=refCountForever.js.map

/***/ }),

/***/ 2175:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.refCountOn = void 0;
const rxjs_1 = __nccwpck_require__(1752);
function refCountOn(scheduler) {
    return (source) => {
        const connectable = source;
        let count = 0;
        let subscription = null;
        return rxjs_1.using(() => {
            ++count;
            scheduler.schedule(() => {
                if (!subscription && count > 0) {
                    subscription = connectable.connect();
                }
            });
            return {
                unsubscribe: () => {
                    --count;
                    scheduler.schedule(() => {
                        if (subscription && count === 0) {
                            subscription.unsubscribe();
                            subscription = null;
                        }
                    });
                },
            };
        }, () => source);
    };
}
exports.refCountOn = refCountOn;
//# sourceMappingURL=refCountOn.js.map

/***/ }),

/***/ 2410:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.reschedule = void 0;
const rxjs_1 = __nccwpck_require__(1752);
const operators_1 = __nccwpck_require__(749);
function reschedule(scheduler = rxjs_1.asapScheduler) {
    return operators_1.concatMap((value) => rxjs_1.of(value, scheduler));
}
exports.reschedule = reschedule;
//# sourceMappingURL=reschedule.js.map

/***/ }),

/***/ 286:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.skipSync = void 0;
const rxjs_1 = __nccwpck_require__(1752);
function skipSync() {
    return (source) => new rxjs_1.Observable((subscriber) => {
        let subscribed = false;
        const subscription = source.subscribe((value) => subscribed && subscriber.next(value), subscriber.error.bind(subscriber), subscriber.complete.bind(subscriber));
        subscribed = true;
        return subscription;
    });
}
exports.skipSync = skipSync;
//# sourceMappingURL=skipSync.js.map

/***/ }),

/***/ 5248:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.splitBy = void 0;
const rxjs_1 = __nccwpck_require__(1752);
const bucketBy_1 = __nccwpck_require__(7406);
function splitBy(predicate, subjectSelector = () => new rxjs_1.Subject()) {
    return bucketBy_1.bucketBy(2, (value, index) => (predicate(value, index) ? 0 : 1), subjectSelector);
}
exports.splitBy = splitBy;
//# sourceMappingURL=splitBy.js.map

/***/ }),

/***/ 532:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.spread = void 0;
function spread(...operations) {
    return (source) => operations.reduce((acc, operator) => acc.pipe(operator), source);
}
exports.spread = spread;
//# sourceMappingURL=spread.js.map

/***/ }),

/***/ 9965:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.startWithDeferred = void 0;
const rxjs_1 = __nccwpck_require__(1752);
function startWithDeferred(factory, scheduler) {
    return (source) => rxjs_1.concat(rxjs_1.defer(() => {
        const value = factory();
        return scheduler ? rxjs_1.of(value, scheduler) : rxjs_1.of(value);
    }), source);
}
exports.startWithDeferred = startWithDeferred;
//# sourceMappingURL=startWithDeferred.js.map

/***/ }),

/***/ 727:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.startWithTimeout = void 0;
const rxjs_1 = __nccwpck_require__(1752);
const operators_1 = __nccwpck_require__(749);
function startWithTimeout(value, duration, scheduler) {
    if (duration === 0 && !scheduler) {
        return (source) => new rxjs_1.Observable((subscriber) => {
            let nexted = false;
            const subscription = source.subscribe((value) => {
                nexted = true;
                subscriber.next(value);
            }, subscriber.error.bind(subscriber), subscriber.complete.bind(subscriber));
            if (!nexted) {
                subscriber.next(value);
            }
            return subscription;
        });
    }
    return (source) => source.pipe(operators_1.publish((published) => rxjs_1.race(published, rxjs_1.concat(rxjs_1.timer(duration, scheduler).pipe(operators_1.mapTo(value)), published))));
}
exports.startWithTimeout = startWithTimeout;
//# sourceMappingURL=startWithTimeout.js.map

/***/ }),

/***/ 1910:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.subsequent = void 0;
const rxjs_1 = __nccwpck_require__(1752);
const operators_1 = __nccwpck_require__(749);
function subsequent(countOrOperator, operator) {
    let count;
    if (typeof countOrOperator === "number") {
        count = countOrOperator;
    }
    else {
        count = 1;
        operator = countOrOperator;
    }
    return (source) => source.pipe(operators_1.publish((published) => rxjs_1.concat(published.pipe(operators_1.take(count)), published.pipe(operator))));
}
exports.subsequent = subsequent;
//# sourceMappingURL=subsequent.js.map

/***/ }),

/***/ 8370:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.switchMapUntil = void 0;
const operators_1 = __nccwpck_require__(749);
function switchMapUntil(prelude, project) {
    return (source) => source.pipe(operators_1.publish((shared) => shared.pipe(prelude, operators_1.switchMap((value, index) => project(value, index).pipe(operators_1.takeUntil(shared))))));
}
exports.switchMapUntil = switchMapUntil;
//# sourceMappingURL=switchMapUntil.js.map

/***/ }),

/***/ 4363:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.switchTap = void 0;
const rxjs_1 = __nccwpck_require__(1752);
const operators_1 = __nccwpck_require__(749);
function switchTap(next) {
    return (source) => source.pipe(operators_1.publish((published) => published.pipe(operators_1.concatMap((value) => rxjs_1.concat(rxjs_1.from(next(value)).pipe(operators_1.ignoreElements(), operators_1.takeUntil(published)), rxjs_1.of(value))))));
}
exports.switchTap = switchTap;
//# sourceMappingURL=switchTap.js.map

/***/ }),

/***/ 3080:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.takeSync = void 0;
const rxjs_1 = __nccwpck_require__(1752);
function takeSync() {
    return (source) => new rxjs_1.Observable((subscriber) => {
        const subscription = source.subscribe(subscriber);
        subscriber.complete();
        return subscription;
    });
}
exports.takeSync = takeSync;
//# sourceMappingURL=takeSync.js.map

/***/ }),

/***/ 12:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.takeWhileInclusive = void 0;
const rxjs_1 = __nccwpck_require__(1752);
const operators_1 = __nccwpck_require__(749);
function takeWhileInclusive(predicate) {
    return (source) => source.pipe(operators_1.multicast(() => new rxjs_1.ReplaySubject(1), (sharedSource) => rxjs_1.concat(sharedSource.pipe(operators_1.takeWhile(predicate)), sharedSource.pipe(operators_1.take(1), operators_1.filter((value) => !predicate(value))))));
}
exports.takeWhileInclusive = takeWhileInclusive;
//# sourceMappingURL=takeWhileInclusive.js.map

/***/ }),

/***/ 2566:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.tapSubscribe = void 0;
const rxjs_1 = __nccwpck_require__(1752);
const operators_1 = __nccwpck_require__(749);
function tapSubscribe(configOrSubscribe) {
    const { ignore = {}, subscribe = rxjs_1.noop, unsubscribe = rxjs_1.noop } = typeof configOrSubscribe === "function"
        ? { subscribe: configOrSubscribe }
        : configOrSubscribe;
    return (source) => rxjs_1.defer(() => {
        let completed = false;
        let errored = false;
        subscribe();
        return source.pipe(operators_1.tap({
            complete: () => (completed = true),
            error: () => (errored = true),
        }), operators_1.finalize(() => {
            if (completed && ignore.complete) {
                return;
            }
            if (errored && ignore.error) {
                return;
            }
            unsubscribe();
        }));
    });
}
exports.tapSubscribe = tapSubscribe;
//# sourceMappingURL=tapSubscribe.js.map

/***/ }),

/***/ 7070:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.tapWithIndex = void 0;
const rxjs_1 = __nccwpck_require__(1752);
const operators_1 = __nccwpck_require__(749);
function tapWithIndex(nextOrObserver, error, complete) {
    return (source) => rxjs_1.defer(() => {
        let index = -1;
        let context;
        let handleNext;
        let handleError;
        let handleComplete;
        if (nextOrObserver && typeof nextOrObserver !== "function") {
            context = nextOrObserver;
            handleNext = nextOrObserver.next || rxjs_1.noop;
            handleError = nextOrObserver.error || rxjs_1.noop;
            handleComplete = nextOrObserver.complete || rxjs_1.noop;
        }
        else {
            context = undefined;
            handleNext = nextOrObserver || rxjs_1.noop;
            handleError = error || rxjs_1.noop;
            handleComplete = complete || rxjs_1.noop;
        }
        return source.pipe(operators_1.tap((value) => handleNext.call(context, [value, ++index]), (error) => handleError.call(context, error), () => handleComplete.call(context)));
    });
}
exports.tapWithIndex = tapWithIndex;
//# sourceMappingURL=tapWithIndex.js.map

/***/ }),

/***/ 1394:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.throttleAfter = void 0;
const rxjs_1 = __nccwpck_require__(1752);
const operators_1 = __nccwpck_require__(749);
function throttleAfter(notifier, duration, scheduler) {
    return (source) => source.pipe(operators_1.publish((sharedSource) => notifier.pipe(operators_1.switchMap(() => rxjs_1.concat(rxjs_1.of(true), operators_1.delay(duration, scheduler)(rxjs_1.of(false)))), operators_1.startWith(false), operators_1.distinctUntilChanged(), operators_1.publish((sharedSignal) => sharedSignal.pipe(operators_1.concatMap((signalled) => signalled
        ? sharedSource.pipe(operators_1.take(1), operators_1.takeUntil(sharedSignal.pipe(operators_1.filter((signalled) => !signalled))))
        : sharedSource.pipe(operators_1.takeUntil(sharedSignal.pipe(operators_1.filter((signalled) => signalled))))))))));
}
exports.throttleAfter = throttleAfter;
//# sourceMappingURL=throttleAfter.js.map

/***/ }),

/***/ 9407:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.unsubscribeOn = void 0;
const rxjs_1 = __nccwpck_require__(1752);
function unsubscribeOn(scheduler, delay = 0) {
    return (source) => source.lift(new UnsubscribeOnOperator(scheduler, delay));
}
exports.unsubscribeOn = unsubscribeOn;
class UnsubscribeOnOperator {
    constructor(scheduler, delay) {
        this.scheduler = scheduler;
        this.delay = delay;
    }
    call(subscriber, source) {
        return source.subscribe(new UnsubscribeOnSubscriber(subscriber, this.scheduler, this.delay));
    }
}
class UnsubscribeOnSubscriber extends rxjs_1.Subscriber {
    constructor(destination, scheduler, delay) {
        super(destination);
        this.scheduler = scheduler;
        this.delay = delay;
    }
    unsubscribe() {
        const { delay, scheduler } = this;
        scheduler.schedule(() => super.unsubscribe(), delay);
    }
}
//# sourceMappingURL=unsubscribeOn.js.map

/***/ }),

/***/ 4516:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.withLatestFromWhen = void 0;
const rxjs_1 = __nccwpck_require__(1752);
const operators_1 = __nccwpck_require__(749);
function withLatestFromWhen(...args) {
    const flushSelector = args.pop();
    const observables = args;
    return (source) => new rxjs_1.Observable((subscriber) => {
        const publishedSource = operators_1.publish()(source);
        const publishedObservables = observables.map((o) => rxjs_1.from(o).pipe(operators_1.publish()));
        const subscription = new rxjs_1.Subscription();
        subscription.add(flushSelector()
            .pipe(operators_1.startWith(undefined), operators_1.switchMap(() => publishedSource.pipe(operators_1.withLatestFrom(...publishedObservables))))
            .subscribe(subscriber));
        publishedObservables.forEach((p) => subscription.add(p.connect()));
        subscription.add(publishedSource.connect());
        return subscription;
    });
}
exports.withLatestFromWhen = withLatestFromWhen;
//# sourceMappingURL=withLatestFromWhen.js.map

/***/ }),

/***/ 3568:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isScheduler = exports.isObservable = exports.isNullish = exports.isNulled = exports.isNotNullish = exports.isNonNulled = void 0;
function isNonNulled(value) {
    return value != null;
}
exports.isNonNulled = isNonNulled;
exports.isNotNullish = isNonNulled;
function isNulled(value) {
    return value == null;
}
exports.isNulled = isNulled;
exports.isNullish = isNulled;
function isObservable(value) {
    return Boolean(value &&
        typeof value === "object" &&
        typeof value["subscribe"] === "function");
}
exports.isObservable = isObservable;
function isScheduler(value) {
    return Boolean(value && typeof value["schedule"] === "function");
}
exports.isScheduler = isScheduler;
//# sourceMappingURL=util.js.map

/***/ }),

/***/ 1752:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.interval = exports.iif = exports.generate = exports.fromEventPattern = exports.fromEvent = exports.from = exports.forkJoin = exports.empty = exports.defer = exports.connectable = exports.concat = exports.combineLatest = exports.bindNodeCallback = exports.bindCallback = exports.UnsubscriptionError = exports.TimeoutError = exports.SequenceError = exports.ObjectUnsubscribedError = exports.NotFoundError = exports.EmptyError = exports.ArgumentOutOfRangeError = exports.firstValueFrom = exports.lastValueFrom = exports.isObservable = exports.identity = exports.noop = exports.pipe = exports.NotificationKind = exports.Notification = exports.Subscriber = exports.Subscription = exports.Scheduler = exports.VirtualAction = exports.VirtualTimeScheduler = exports.animationFrameScheduler = exports.animationFrame = exports.queueScheduler = exports.queue = exports.asyncScheduler = exports.async = exports.asapScheduler = exports.asap = exports.AsyncSubject = exports.ReplaySubject = exports.BehaviorSubject = exports.Subject = exports.animationFrames = exports.observable = exports.ConnectableObservable = exports.Observable = void 0;
exports.filter = exports.expand = exports.exhaustMap = exports.exhaustAll = exports.exhaust = exports.every = exports.endWith = exports.elementAt = exports.distinctUntilKeyChanged = exports.distinctUntilChanged = exports.distinct = exports.dematerialize = exports.delayWhen = exports.delay = exports.defaultIfEmpty = exports.debounceTime = exports.debounce = exports.count = exports.connect = exports.concatWith = exports.concatMapTo = exports.concatMap = exports.concatAll = exports.combineLatestWith = exports.combineLatestAll = exports.combineAll = exports.catchError = exports.bufferWhen = exports.bufferToggle = exports.bufferTime = exports.bufferCount = exports.buffer = exports.auditTime = exports.audit = exports.config = exports.NEVER = exports.EMPTY = exports.scheduled = exports.zip = exports.using = exports.timer = exports.throwError = exports.range = exports.race = exports.partition = exports.pairs = exports.onErrorResumeNext = exports.of = exports.never = exports.merge = void 0;
exports.switchMapTo = exports.switchMap = exports.switchAll = exports.subscribeOn = exports.startWith = exports.skipWhile = exports.skipUntil = exports.skipLast = exports.skip = exports.single = exports.shareReplay = exports.share = exports.sequenceEqual = exports.scan = exports.sampleTime = exports.sample = exports.refCount = exports.retryWhen = exports.retry = exports.repeatWhen = exports.repeat = exports.reduce = exports.raceWith = exports.publishReplay = exports.publishLast = exports.publishBehavior = exports.publish = exports.pluck = exports.pairwise = exports.observeOn = exports.multicast = exports.min = exports.mergeWith = exports.mergeScan = exports.mergeMapTo = exports.mergeMap = exports.flatMap = exports.mergeAll = exports.max = exports.materialize = exports.mapTo = exports.map = exports.last = exports.isEmpty = exports.ignoreElements = exports.groupBy = exports.first = exports.findIndex = exports.find = exports.finalize = void 0;
exports.zipWith = exports.zipAll = exports.withLatestFrom = exports.windowWhen = exports.windowToggle = exports.windowTime = exports.windowCount = exports.window = exports.toArray = exports.timestamp = exports.timeoutWith = exports.timeout = exports.timeInterval = exports.throwIfEmpty = exports.throttleTime = exports.throttle = exports.tap = exports.takeWhile = exports.takeUntil = exports.takeLast = exports.take = exports.switchScan = void 0;
var Observable_1 = __nccwpck_require__(3014);
Object.defineProperty(exports, "Observable", ({ enumerable: true, get: function () { return Observable_1.Observable; } }));
var ConnectableObservable_1 = __nccwpck_require__(420);
Object.defineProperty(exports, "ConnectableObservable", ({ enumerable: true, get: function () { return ConnectableObservable_1.ConnectableObservable; } }));
var observable_1 = __nccwpck_require__(7186);
Object.defineProperty(exports, "observable", ({ enumerable: true, get: function () { return observable_1.observable; } }));
var animationFrames_1 = __nccwpck_require__(8197);
Object.defineProperty(exports, "animationFrames", ({ enumerable: true, get: function () { return animationFrames_1.animationFrames; } }));
var Subject_1 = __nccwpck_require__(9944);
Object.defineProperty(exports, "Subject", ({ enumerable: true, get: function () { return Subject_1.Subject; } }));
var BehaviorSubject_1 = __nccwpck_require__(3473);
Object.defineProperty(exports, "BehaviorSubject", ({ enumerable: true, get: function () { return BehaviorSubject_1.BehaviorSubject; } }));
var ReplaySubject_1 = __nccwpck_require__(2351);
Object.defineProperty(exports, "ReplaySubject", ({ enumerable: true, get: function () { return ReplaySubject_1.ReplaySubject; } }));
var AsyncSubject_1 = __nccwpck_require__(9747);
Object.defineProperty(exports, "AsyncSubject", ({ enumerable: true, get: function () { return AsyncSubject_1.AsyncSubject; } }));
var asap_1 = __nccwpck_require__(3905);
Object.defineProperty(exports, "asap", ({ enumerable: true, get: function () { return asap_1.asap; } }));
Object.defineProperty(exports, "asapScheduler", ({ enumerable: true, get: function () { return asap_1.asapScheduler; } }));
var async_1 = __nccwpck_require__(6072);
Object.defineProperty(exports, "async", ({ enumerable: true, get: function () { return async_1.async; } }));
Object.defineProperty(exports, "asyncScheduler", ({ enumerable: true, get: function () { return async_1.asyncScheduler; } }));
var queue_1 = __nccwpck_require__(2059);
Object.defineProperty(exports, "queue", ({ enumerable: true, get: function () { return queue_1.queue; } }));
Object.defineProperty(exports, "queueScheduler", ({ enumerable: true, get: function () { return queue_1.queueScheduler; } }));
var animationFrame_1 = __nccwpck_require__(1359);
Object.defineProperty(exports, "animationFrame", ({ enumerable: true, get: function () { return animationFrame_1.animationFrame; } }));
Object.defineProperty(exports, "animationFrameScheduler", ({ enumerable: true, get: function () { return animationFrame_1.animationFrameScheduler; } }));
var VirtualTimeScheduler_1 = __nccwpck_require__(5348);
Object.defineProperty(exports, "VirtualTimeScheduler", ({ enumerable: true, get: function () { return VirtualTimeScheduler_1.VirtualTimeScheduler; } }));
Object.defineProperty(exports, "VirtualAction", ({ enumerable: true, get: function () { return VirtualTimeScheduler_1.VirtualAction; } }));
var Scheduler_1 = __nccwpck_require__(6243);
Object.defineProperty(exports, "Scheduler", ({ enumerable: true, get: function () { return Scheduler_1.Scheduler; } }));
var Subscription_1 = __nccwpck_require__(9548);
Object.defineProperty(exports, "Subscription", ({ enumerable: true, get: function () { return Subscription_1.Subscription; } }));
var Subscriber_1 = __nccwpck_require__(7121);
Object.defineProperty(exports, "Subscriber", ({ enumerable: true, get: function () { return Subscriber_1.Subscriber; } }));
var Notification_1 = __nccwpck_require__(2241);
Object.defineProperty(exports, "Notification", ({ enumerable: true, get: function () { return Notification_1.Notification; } }));
Object.defineProperty(exports, "NotificationKind", ({ enumerable: true, get: function () { return Notification_1.NotificationKind; } }));
var pipe_1 = __nccwpck_require__(9587);
Object.defineProperty(exports, "pipe", ({ enumerable: true, get: function () { return pipe_1.pipe; } }));
var noop_1 = __nccwpck_require__(1642);
Object.defineProperty(exports, "noop", ({ enumerable: true, get: function () { return noop_1.noop; } }));
var identity_1 = __nccwpck_require__(283);
Object.defineProperty(exports, "identity", ({ enumerable: true, get: function () { return identity_1.identity; } }));
var isObservable_1 = __nccwpck_require__(2259);
Object.defineProperty(exports, "isObservable", ({ enumerable: true, get: function () { return isObservable_1.isObservable; } }));
var lastValueFrom_1 = __nccwpck_require__(9713);
Object.defineProperty(exports, "lastValueFrom", ({ enumerable: true, get: function () { return lastValueFrom_1.lastValueFrom; } }));
var firstValueFrom_1 = __nccwpck_require__(9369);
Object.defineProperty(exports, "firstValueFrom", ({ enumerable: true, get: function () { return firstValueFrom_1.firstValueFrom; } }));
var ArgumentOutOfRangeError_1 = __nccwpck_require__(9796);
Object.defineProperty(exports, "ArgumentOutOfRangeError", ({ enumerable: true, get: function () { return ArgumentOutOfRangeError_1.ArgumentOutOfRangeError; } }));
var EmptyError_1 = __nccwpck_require__(9391);
Object.defineProperty(exports, "EmptyError", ({ enumerable: true, get: function () { return EmptyError_1.EmptyError; } }));
var NotFoundError_1 = __nccwpck_require__(4431);
Object.defineProperty(exports, "NotFoundError", ({ enumerable: true, get: function () { return NotFoundError_1.NotFoundError; } }));
var ObjectUnsubscribedError_1 = __nccwpck_require__(5266);
Object.defineProperty(exports, "ObjectUnsubscribedError", ({ enumerable: true, get: function () { return ObjectUnsubscribedError_1.ObjectUnsubscribedError; } }));
var SequenceError_1 = __nccwpck_require__(9048);
Object.defineProperty(exports, "SequenceError", ({ enumerable: true, get: function () { return SequenceError_1.SequenceError; } }));
var timeout_1 = __nccwpck_require__(2051);
Object.defineProperty(exports, "TimeoutError", ({ enumerable: true, get: function () { return timeout_1.TimeoutError; } }));
var UnsubscriptionError_1 = __nccwpck_require__(6776);
Object.defineProperty(exports, "UnsubscriptionError", ({ enumerable: true, get: function () { return UnsubscriptionError_1.UnsubscriptionError; } }));
var bindCallback_1 = __nccwpck_require__(6949);
Object.defineProperty(exports, "bindCallback", ({ enumerable: true, get: function () { return bindCallback_1.bindCallback; } }));
var bindNodeCallback_1 = __nccwpck_require__(1150);
Object.defineProperty(exports, "bindNodeCallback", ({ enumerable: true, get: function () { return bindNodeCallback_1.bindNodeCallback; } }));
var combineLatest_1 = __nccwpck_require__(6843);
Object.defineProperty(exports, "combineLatest", ({ enumerable: true, get: function () { return combineLatest_1.combineLatest; } }));
var concat_1 = __nccwpck_require__(4675);
Object.defineProperty(exports, "concat", ({ enumerable: true, get: function () { return concat_1.concat; } }));
var connectable_1 = __nccwpck_require__(3152);
Object.defineProperty(exports, "connectable", ({ enumerable: true, get: function () { return connectable_1.connectable; } }));
var defer_1 = __nccwpck_require__(7672);
Object.defineProperty(exports, "defer", ({ enumerable: true, get: function () { return defer_1.defer; } }));
var empty_1 = __nccwpck_require__(437);
Object.defineProperty(exports, "empty", ({ enumerable: true, get: function () { return empty_1.empty; } }));
var forkJoin_1 = __nccwpck_require__(7358);
Object.defineProperty(exports, "forkJoin", ({ enumerable: true, get: function () { return forkJoin_1.forkJoin; } }));
var from_1 = __nccwpck_require__(8309);
Object.defineProperty(exports, "from", ({ enumerable: true, get: function () { return from_1.from; } }));
var fromEvent_1 = __nccwpck_require__(3238);
Object.defineProperty(exports, "fromEvent", ({ enumerable: true, get: function () { return fromEvent_1.fromEvent; } }));
var fromEventPattern_1 = __nccwpck_require__(5680);
Object.defineProperty(exports, "fromEventPattern", ({ enumerable: true, get: function () { return fromEventPattern_1.fromEventPattern; } }));
var generate_1 = __nccwpck_require__(2668);
Object.defineProperty(exports, "generate", ({ enumerable: true, get: function () { return generate_1.generate; } }));
var iif_1 = __nccwpck_require__(6514);
Object.defineProperty(exports, "iif", ({ enumerable: true, get: function () { return iif_1.iif; } }));
var interval_1 = __nccwpck_require__(29);
Object.defineProperty(exports, "interval", ({ enumerable: true, get: function () { return interval_1.interval; } }));
var merge_1 = __nccwpck_require__(5122);
Object.defineProperty(exports, "merge", ({ enumerable: true, get: function () { return merge_1.merge; } }));
var never_1 = __nccwpck_require__(6228);
Object.defineProperty(exports, "never", ({ enumerable: true, get: function () { return never_1.never; } }));
var of_1 = __nccwpck_require__(2163);
Object.defineProperty(exports, "of", ({ enumerable: true, get: function () { return of_1.of; } }));
var onErrorResumeNext_1 = __nccwpck_require__(6089);
Object.defineProperty(exports, "onErrorResumeNext", ({ enumerable: true, get: function () { return onErrorResumeNext_1.onErrorResumeNext; } }));
var pairs_1 = __nccwpck_require__(505);
Object.defineProperty(exports, "pairs", ({ enumerable: true, get: function () { return pairs_1.pairs; } }));
var partition_1 = __nccwpck_require__(5506);
Object.defineProperty(exports, "partition", ({ enumerable: true, get: function () { return partition_1.partition; } }));
var race_1 = __nccwpck_require__(6940);
Object.defineProperty(exports, "race", ({ enumerable: true, get: function () { return race_1.race; } }));
var range_1 = __nccwpck_require__(8538);
Object.defineProperty(exports, "range", ({ enumerable: true, get: function () { return range_1.range; } }));
var throwError_1 = __nccwpck_require__(6381);
Object.defineProperty(exports, "throwError", ({ enumerable: true, get: function () { return throwError_1.throwError; } }));
var timer_1 = __nccwpck_require__(9757);
Object.defineProperty(exports, "timer", ({ enumerable: true, get: function () { return timer_1.timer; } }));
var using_1 = __nccwpck_require__(8445);
Object.defineProperty(exports, "using", ({ enumerable: true, get: function () { return using_1.using; } }));
var zip_1 = __nccwpck_require__(2504);
Object.defineProperty(exports, "zip", ({ enumerable: true, get: function () { return zip_1.zip; } }));
var scheduled_1 = __nccwpck_require__(6151);
Object.defineProperty(exports, "scheduled", ({ enumerable: true, get: function () { return scheduled_1.scheduled; } }));
var empty_2 = __nccwpck_require__(437);
Object.defineProperty(exports, "EMPTY", ({ enumerable: true, get: function () { return empty_2.EMPTY; } }));
var never_2 = __nccwpck_require__(6228);
Object.defineProperty(exports, "NEVER", ({ enumerable: true, get: function () { return never_2.NEVER; } }));
__exportStar(__nccwpck_require__(6639), exports);
var config_1 = __nccwpck_require__(2233);
Object.defineProperty(exports, "config", ({ enumerable: true, get: function () { return config_1.config; } }));
var audit_1 = __nccwpck_require__(2704);
Object.defineProperty(exports, "audit", ({ enumerable: true, get: function () { return audit_1.audit; } }));
var auditTime_1 = __nccwpck_require__(8780);
Object.defineProperty(exports, "auditTime", ({ enumerable: true, get: function () { return auditTime_1.auditTime; } }));
var buffer_1 = __nccwpck_require__(4253);
Object.defineProperty(exports, "buffer", ({ enumerable: true, get: function () { return buffer_1.buffer; } }));
var bufferCount_1 = __nccwpck_require__(7253);
Object.defineProperty(exports, "bufferCount", ({ enumerable: true, get: function () { return bufferCount_1.bufferCount; } }));
var bufferTime_1 = __nccwpck_require__(3102);
Object.defineProperty(exports, "bufferTime", ({ enumerable: true, get: function () { return bufferTime_1.bufferTime; } }));
var bufferToggle_1 = __nccwpck_require__(3781);
Object.defineProperty(exports, "bufferToggle", ({ enumerable: true, get: function () { return bufferToggle_1.bufferToggle; } }));
var bufferWhen_1 = __nccwpck_require__(2855);
Object.defineProperty(exports, "bufferWhen", ({ enumerable: true, get: function () { return bufferWhen_1.bufferWhen; } }));
var catchError_1 = __nccwpck_require__(7765);
Object.defineProperty(exports, "catchError", ({ enumerable: true, get: function () { return catchError_1.catchError; } }));
var combineAll_1 = __nccwpck_require__(8817);
Object.defineProperty(exports, "combineAll", ({ enumerable: true, get: function () { return combineAll_1.combineAll; } }));
var combineLatestAll_1 = __nccwpck_require__(1063);
Object.defineProperty(exports, "combineLatestAll", ({ enumerable: true, get: function () { return combineLatestAll_1.combineLatestAll; } }));
var combineLatestWith_1 = __nccwpck_require__(9044);
Object.defineProperty(exports, "combineLatestWith", ({ enumerable: true, get: function () { return combineLatestWith_1.combineLatestWith; } }));
var concatAll_1 = __nccwpck_require__(8049);
Object.defineProperty(exports, "concatAll", ({ enumerable: true, get: function () { return concatAll_1.concatAll; } }));
var concatMap_1 = __nccwpck_require__(9130);
Object.defineProperty(exports, "concatMap", ({ enumerable: true, get: function () { return concatMap_1.concatMap; } }));
var concatMapTo_1 = __nccwpck_require__(1596);
Object.defineProperty(exports, "concatMapTo", ({ enumerable: true, get: function () { return concatMapTo_1.concatMapTo; } }));
var concatWith_1 = __nccwpck_require__(7998);
Object.defineProperty(exports, "concatWith", ({ enumerable: true, get: function () { return concatWith_1.concatWith; } }));
var connect_1 = __nccwpck_require__(1101);
Object.defineProperty(exports, "connect", ({ enumerable: true, get: function () { return connect_1.connect; } }));
var count_1 = __nccwpck_require__(6571);
Object.defineProperty(exports, "count", ({ enumerable: true, get: function () { return count_1.count; } }));
var debounce_1 = __nccwpck_require__(9348);
Object.defineProperty(exports, "debounce", ({ enumerable: true, get: function () { return debounce_1.debounce; } }));
var debounceTime_1 = __nccwpck_require__(2379);
Object.defineProperty(exports, "debounceTime", ({ enumerable: true, get: function () { return debounceTime_1.debounceTime; } }));
var defaultIfEmpty_1 = __nccwpck_require__(621);
Object.defineProperty(exports, "defaultIfEmpty", ({ enumerable: true, get: function () { return defaultIfEmpty_1.defaultIfEmpty; } }));
var delay_1 = __nccwpck_require__(9818);
Object.defineProperty(exports, "delay", ({ enumerable: true, get: function () { return delay_1.delay; } }));
var delayWhen_1 = __nccwpck_require__(6994);
Object.defineProperty(exports, "delayWhen", ({ enumerable: true, get: function () { return delayWhen_1.delayWhen; } }));
var dematerialize_1 = __nccwpck_require__(5338);
Object.defineProperty(exports, "dematerialize", ({ enumerable: true, get: function () { return dematerialize_1.dematerialize; } }));
var distinct_1 = __nccwpck_require__(2594);
Object.defineProperty(exports, "distinct", ({ enumerable: true, get: function () { return distinct_1.distinct; } }));
var distinctUntilChanged_1 = __nccwpck_require__(632);
Object.defineProperty(exports, "distinctUntilChanged", ({ enumerable: true, get: function () { return distinctUntilChanged_1.distinctUntilChanged; } }));
var distinctUntilKeyChanged_1 = __nccwpck_require__(8935);
Object.defineProperty(exports, "distinctUntilKeyChanged", ({ enumerable: true, get: function () { return distinctUntilKeyChanged_1.distinctUntilKeyChanged; } }));
var elementAt_1 = __nccwpck_require__(3381);
Object.defineProperty(exports, "elementAt", ({ enumerable: true, get: function () { return elementAt_1.elementAt; } }));
var endWith_1 = __nccwpck_require__(2961);
Object.defineProperty(exports, "endWith", ({ enumerable: true, get: function () { return endWith_1.endWith; } }));
var every_1 = __nccwpck_require__(9559);
Object.defineProperty(exports, "every", ({ enumerable: true, get: function () { return every_1.every; } }));
var exhaust_1 = __nccwpck_require__(5686);
Object.defineProperty(exports, "exhaust", ({ enumerable: true, get: function () { return exhaust_1.exhaust; } }));
var exhaustAll_1 = __nccwpck_require__(9777);
Object.defineProperty(exports, "exhaustAll", ({ enumerable: true, get: function () { return exhaustAll_1.exhaustAll; } }));
var exhaustMap_1 = __nccwpck_require__(1527);
Object.defineProperty(exports, "exhaustMap", ({ enumerable: true, get: function () { return exhaustMap_1.exhaustMap; } }));
var expand_1 = __nccwpck_require__(1585);
Object.defineProperty(exports, "expand", ({ enumerable: true, get: function () { return expand_1.expand; } }));
var filter_1 = __nccwpck_require__(6894);
Object.defineProperty(exports, "filter", ({ enumerable: true, get: function () { return filter_1.filter; } }));
var finalize_1 = __nccwpck_require__(4013);
Object.defineProperty(exports, "finalize", ({ enumerable: true, get: function () { return finalize_1.finalize; } }));
var find_1 = __nccwpck_require__(8981);
Object.defineProperty(exports, "find", ({ enumerable: true, get: function () { return find_1.find; } }));
var findIndex_1 = __nccwpck_require__(2602);
Object.defineProperty(exports, "findIndex", ({ enumerable: true, get: function () { return findIndex_1.findIndex; } }));
var first_1 = __nccwpck_require__(3345);
Object.defineProperty(exports, "first", ({ enumerable: true, get: function () { return first_1.first; } }));
var groupBy_1 = __nccwpck_require__(1650);
Object.defineProperty(exports, "groupBy", ({ enumerable: true, get: function () { return groupBy_1.groupBy; } }));
var ignoreElements_1 = __nccwpck_require__(1062);
Object.defineProperty(exports, "ignoreElements", ({ enumerable: true, get: function () { return ignoreElements_1.ignoreElements; } }));
var isEmpty_1 = __nccwpck_require__(7722);
Object.defineProperty(exports, "isEmpty", ({ enumerable: true, get: function () { return isEmpty_1.isEmpty; } }));
var last_1 = __nccwpck_require__(6831);
Object.defineProperty(exports, "last", ({ enumerable: true, get: function () { return last_1.last; } }));
var map_1 = __nccwpck_require__(5987);
Object.defineProperty(exports, "map", ({ enumerable: true, get: function () { return map_1.map; } }));
var mapTo_1 = __nccwpck_require__(2300);
Object.defineProperty(exports, "mapTo", ({ enumerable: true, get: function () { return mapTo_1.mapTo; } }));
var materialize_1 = __nccwpck_require__(7108);
Object.defineProperty(exports, "materialize", ({ enumerable: true, get: function () { return materialize_1.materialize; } }));
var max_1 = __nccwpck_require__(7314);
Object.defineProperty(exports, "max", ({ enumerable: true, get: function () { return max_1.max; } }));
var mergeAll_1 = __nccwpck_require__(2057);
Object.defineProperty(exports, "mergeAll", ({ enumerable: true, get: function () { return mergeAll_1.mergeAll; } }));
var flatMap_1 = __nccwpck_require__(186);
Object.defineProperty(exports, "flatMap", ({ enumerable: true, get: function () { return flatMap_1.flatMap; } }));
var mergeMap_1 = __nccwpck_require__(9914);
Object.defineProperty(exports, "mergeMap", ({ enumerable: true, get: function () { return mergeMap_1.mergeMap; } }));
var mergeMapTo_1 = __nccwpck_require__(9151);
Object.defineProperty(exports, "mergeMapTo", ({ enumerable: true, get: function () { return mergeMapTo_1.mergeMapTo; } }));
var mergeScan_1 = __nccwpck_require__(1519);
Object.defineProperty(exports, "mergeScan", ({ enumerable: true, get: function () { return mergeScan_1.mergeScan; } }));
var mergeWith_1 = __nccwpck_require__(1564);
Object.defineProperty(exports, "mergeWith", ({ enumerable: true, get: function () { return mergeWith_1.mergeWith; } }));
var min_1 = __nccwpck_require__(7641);
Object.defineProperty(exports, "min", ({ enumerable: true, get: function () { return min_1.min; } }));
var multicast_1 = __nccwpck_require__(5457);
Object.defineProperty(exports, "multicast", ({ enumerable: true, get: function () { return multicast_1.multicast; } }));
var observeOn_1 = __nccwpck_require__(2451);
Object.defineProperty(exports, "observeOn", ({ enumerable: true, get: function () { return observeOn_1.observeOn; } }));
var pairwise_1 = __nccwpck_require__(2206);
Object.defineProperty(exports, "pairwise", ({ enumerable: true, get: function () { return pairwise_1.pairwise; } }));
var pluck_1 = __nccwpck_require__(6073);
Object.defineProperty(exports, "pluck", ({ enumerable: true, get: function () { return pluck_1.pluck; } }));
var publish_1 = __nccwpck_require__(4084);
Object.defineProperty(exports, "publish", ({ enumerable: true, get: function () { return publish_1.publish; } }));
var publishBehavior_1 = __nccwpck_require__(45);
Object.defineProperty(exports, "publishBehavior", ({ enumerable: true, get: function () { return publishBehavior_1.publishBehavior; } }));
var publishLast_1 = __nccwpck_require__(4149);
Object.defineProperty(exports, "publishLast", ({ enumerable: true, get: function () { return publishLast_1.publishLast; } }));
var publishReplay_1 = __nccwpck_require__(7656);
Object.defineProperty(exports, "publishReplay", ({ enumerable: true, get: function () { return publishReplay_1.publishReplay; } }));
var raceWith_1 = __nccwpck_require__(39);
Object.defineProperty(exports, "raceWith", ({ enumerable: true, get: function () { return raceWith_1.raceWith; } }));
var reduce_1 = __nccwpck_require__(2627);
Object.defineProperty(exports, "reduce", ({ enumerable: true, get: function () { return reduce_1.reduce; } }));
var repeat_1 = __nccwpck_require__(2418);
Object.defineProperty(exports, "repeat", ({ enumerable: true, get: function () { return repeat_1.repeat; } }));
var repeatWhen_1 = __nccwpck_require__(754);
Object.defineProperty(exports, "repeatWhen", ({ enumerable: true, get: function () { return repeatWhen_1.repeatWhen; } }));
var retry_1 = __nccwpck_require__(6251);
Object.defineProperty(exports, "retry", ({ enumerable: true, get: function () { return retry_1.retry; } }));
var retryWhen_1 = __nccwpck_require__(9018);
Object.defineProperty(exports, "retryWhen", ({ enumerable: true, get: function () { return retryWhen_1.retryWhen; } }));
var refCount_1 = __nccwpck_require__(2331);
Object.defineProperty(exports, "refCount", ({ enumerable: true, get: function () { return refCount_1.refCount; } }));
var sample_1 = __nccwpck_require__(3774);
Object.defineProperty(exports, "sample", ({ enumerable: true, get: function () { return sample_1.sample; } }));
var sampleTime_1 = __nccwpck_require__(9807);
Object.defineProperty(exports, "sampleTime", ({ enumerable: true, get: function () { return sampleTime_1.sampleTime; } }));
var scan_1 = __nccwpck_require__(5578);
Object.defineProperty(exports, "scan", ({ enumerable: true, get: function () { return scan_1.scan; } }));
var sequenceEqual_1 = __nccwpck_require__(6126);
Object.defineProperty(exports, "sequenceEqual", ({ enumerable: true, get: function () { return sequenceEqual_1.sequenceEqual; } }));
var share_1 = __nccwpck_require__(484);
Object.defineProperty(exports, "share", ({ enumerable: true, get: function () { return share_1.share; } }));
var shareReplay_1 = __nccwpck_require__(2118);
Object.defineProperty(exports, "shareReplay", ({ enumerable: true, get: function () { return shareReplay_1.shareReplay; } }));
var single_1 = __nccwpck_require__(8441);
Object.defineProperty(exports, "single", ({ enumerable: true, get: function () { return single_1.single; } }));
var skip_1 = __nccwpck_require__(947);
Object.defineProperty(exports, "skip", ({ enumerable: true, get: function () { return skip_1.skip; } }));
var skipLast_1 = __nccwpck_require__(5865);
Object.defineProperty(exports, "skipLast", ({ enumerable: true, get: function () { return skipLast_1.skipLast; } }));
var skipUntil_1 = __nccwpck_require__(1110);
Object.defineProperty(exports, "skipUntil", ({ enumerable: true, get: function () { return skipUntil_1.skipUntil; } }));
var skipWhile_1 = __nccwpck_require__(2550);
Object.defineProperty(exports, "skipWhile", ({ enumerable: true, get: function () { return skipWhile_1.skipWhile; } }));
var startWith_1 = __nccwpck_require__(5471);
Object.defineProperty(exports, "startWith", ({ enumerable: true, get: function () { return startWith_1.startWith; } }));
var subscribeOn_1 = __nccwpck_require__(7224);
Object.defineProperty(exports, "subscribeOn", ({ enumerable: true, get: function () { return subscribeOn_1.subscribeOn; } }));
var switchAll_1 = __nccwpck_require__(327);
Object.defineProperty(exports, "switchAll", ({ enumerable: true, get: function () { return switchAll_1.switchAll; } }));
var switchMap_1 = __nccwpck_require__(6704);
Object.defineProperty(exports, "switchMap", ({ enumerable: true, get: function () { return switchMap_1.switchMap; } }));
var switchMapTo_1 = __nccwpck_require__(1713);
Object.defineProperty(exports, "switchMapTo", ({ enumerable: true, get: function () { return switchMapTo_1.switchMapTo; } }));
var switchScan_1 = __nccwpck_require__(3355);
Object.defineProperty(exports, "switchScan", ({ enumerable: true, get: function () { return switchScan_1.switchScan; } }));
var take_1 = __nccwpck_require__(3698);
Object.defineProperty(exports, "take", ({ enumerable: true, get: function () { return take_1.take; } }));
var takeLast_1 = __nccwpck_require__(5041);
Object.defineProperty(exports, "takeLast", ({ enumerable: true, get: function () { return takeLast_1.takeLast; } }));
var takeUntil_1 = __nccwpck_require__(5150);
Object.defineProperty(exports, "takeUntil", ({ enumerable: true, get: function () { return takeUntil_1.takeUntil; } }));
var takeWhile_1 = __nccwpck_require__(6700);
Object.defineProperty(exports, "takeWhile", ({ enumerable: true, get: function () { return takeWhile_1.takeWhile; } }));
var tap_1 = __nccwpck_require__(8845);
Object.defineProperty(exports, "tap", ({ enumerable: true, get: function () { return tap_1.tap; } }));
var throttle_1 = __nccwpck_require__(6713);
Object.defineProperty(exports, "throttle", ({ enumerable: true, get: function () { return throttle_1.throttle; } }));
var throttleTime_1 = __nccwpck_require__(3435);
Object.defineProperty(exports, "throttleTime", ({ enumerable: true, get: function () { return throttleTime_1.throttleTime; } }));
var throwIfEmpty_1 = __nccwpck_require__(1566);
Object.defineProperty(exports, "throwIfEmpty", ({ enumerable: true, get: function () { return throwIfEmpty_1.throwIfEmpty; } }));
var timeInterval_1 = __nccwpck_require__(4643);
Object.defineProperty(exports, "timeInterval", ({ enumerable: true, get: function () { return timeInterval_1.timeInterval; } }));
var timeout_2 = __nccwpck_require__(2051);
Object.defineProperty(exports, "timeout", ({ enumerable: true, get: function () { return timeout_2.timeout; } }));
var timeoutWith_1 = __nccwpck_require__(3540);
Object.defineProperty(exports, "timeoutWith", ({ enumerable: true, get: function () { return timeoutWith_1.timeoutWith; } }));
var timestamp_1 = __nccwpck_require__(5518);
Object.defineProperty(exports, "timestamp", ({ enumerable: true, get: function () { return timestamp_1.timestamp; } }));
var toArray_1 = __nccwpck_require__(5114);
Object.defineProperty(exports, "toArray", ({ enumerable: true, get: function () { return toArray_1.toArray; } }));
var window_1 = __nccwpck_require__(8255);
Object.defineProperty(exports, "window", ({ enumerable: true, get: function () { return window_1.window; } }));
var windowCount_1 = __nccwpck_require__(3144);
Object.defineProperty(exports, "windowCount", ({ enumerable: true, get: function () { return windowCount_1.windowCount; } }));
var windowTime_1 = __nccwpck_require__(2212);
Object.defineProperty(exports, "windowTime", ({ enumerable: true, get: function () { return windowTime_1.windowTime; } }));
var windowToggle_1 = __nccwpck_require__(2741);
Object.defineProperty(exports, "windowToggle", ({ enumerable: true, get: function () { return windowToggle_1.windowToggle; } }));
var windowWhen_1 = __nccwpck_require__(2645);
Object.defineProperty(exports, "windowWhen", ({ enumerable: true, get: function () { return windowWhen_1.windowWhen; } }));
var withLatestFrom_1 = __nccwpck_require__(501);
Object.defineProperty(exports, "withLatestFrom", ({ enumerable: true, get: function () { return withLatestFrom_1.withLatestFrom; } }));
var zipAll_1 = __nccwpck_require__(2335);
Object.defineProperty(exports, "zipAll", ({ enumerable: true, get: function () { return zipAll_1.zipAll; } }));
var zipWith_1 = __nccwpck_require__(5520);
Object.defineProperty(exports, "zipWith", ({ enumerable: true, get: function () { return zipWith_1.zipWith; } }));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 9747:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AsyncSubject = void 0;
var Subject_1 = __nccwpck_require__(9944);
var AsyncSubject = (function (_super) {
    __extends(AsyncSubject, _super);
    function AsyncSubject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._value = null;
        _this._hasValue = false;
        _this._isComplete = false;
        return _this;
    }
    AsyncSubject.prototype._checkFinalizedStatuses = function (subscriber) {
        var _a = this, hasError = _a.hasError, _hasValue = _a._hasValue, _value = _a._value, thrownError = _a.thrownError, isStopped = _a.isStopped, _isComplete = _a._isComplete;
        if (hasError) {
            subscriber.error(thrownError);
        }
        else if (isStopped || _isComplete) {
            _hasValue && subscriber.next(_value);
            subscriber.complete();
        }
    };
    AsyncSubject.prototype.next = function (value) {
        if (!this.isStopped) {
            this._value = value;
            this._hasValue = true;
        }
    };
    AsyncSubject.prototype.complete = function () {
        var _a = this, _hasValue = _a._hasValue, _value = _a._value, _isComplete = _a._isComplete;
        if (!_isComplete) {
            this._isComplete = true;
            _hasValue && _super.prototype.next.call(this, _value);
            _super.prototype.complete.call(this);
        }
    };
    return AsyncSubject;
}(Subject_1.Subject));
exports.AsyncSubject = AsyncSubject;
//# sourceMappingURL=AsyncSubject.js.map

/***/ }),

/***/ 3473:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BehaviorSubject = void 0;
var Subject_1 = __nccwpck_require__(9944);
var BehaviorSubject = (function (_super) {
    __extends(BehaviorSubject, _super);
    function BehaviorSubject(_value) {
        var _this = _super.call(this) || this;
        _this._value = _value;
        return _this;
    }
    Object.defineProperty(BehaviorSubject.prototype, "value", {
        get: function () {
            return this.getValue();
        },
        enumerable: false,
        configurable: true
    });
    BehaviorSubject.prototype._subscribe = function (subscriber) {
        var subscription = _super.prototype._subscribe.call(this, subscriber);
        !subscription.closed && subscriber.next(this._value);
        return subscription;
    };
    BehaviorSubject.prototype.getValue = function () {
        var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, _value = _a._value;
        if (hasError) {
            throw thrownError;
        }
        this._throwIfClosed();
        return _value;
    };
    BehaviorSubject.prototype.next = function (value) {
        _super.prototype.next.call(this, (this._value = value));
    };
    return BehaviorSubject;
}(Subject_1.Subject));
exports.BehaviorSubject = BehaviorSubject;
//# sourceMappingURL=BehaviorSubject.js.map

/***/ }),

/***/ 2241:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.observeNotification = exports.Notification = exports.NotificationKind = void 0;
var empty_1 = __nccwpck_require__(437);
var of_1 = __nccwpck_require__(2163);
var throwError_1 = __nccwpck_require__(6381);
var isFunction_1 = __nccwpck_require__(7206);
var NotificationKind;
(function (NotificationKind) {
    NotificationKind["NEXT"] = "N";
    NotificationKind["ERROR"] = "E";
    NotificationKind["COMPLETE"] = "C";
})(NotificationKind = exports.NotificationKind || (exports.NotificationKind = {}));
var Notification = (function () {
    function Notification(kind, value, error) {
        this.kind = kind;
        this.value = value;
        this.error = error;
        this.hasValue = kind === 'N';
    }
    Notification.prototype.observe = function (observer) {
        return observeNotification(this, observer);
    };
    Notification.prototype.do = function (nextHandler, errorHandler, completeHandler) {
        var _a = this, kind = _a.kind, value = _a.value, error = _a.error;
        return kind === 'N' ? nextHandler === null || nextHandler === void 0 ? void 0 : nextHandler(value) : kind === 'E' ? errorHandler === null || errorHandler === void 0 ? void 0 : errorHandler(error) : completeHandler === null || completeHandler === void 0 ? void 0 : completeHandler();
    };
    Notification.prototype.accept = function (nextOrObserver, error, complete) {
        var _a;
        return isFunction_1.isFunction((_a = nextOrObserver) === null || _a === void 0 ? void 0 : _a.next)
            ? this.observe(nextOrObserver)
            : this.do(nextOrObserver, error, complete);
    };
    Notification.prototype.toObservable = function () {
        var _a = this, kind = _a.kind, value = _a.value, error = _a.error;
        var result = kind === 'N'
            ?
                of_1.of(value)
            :
                kind === 'E'
                    ?
                        throwError_1.throwError(function () { return error; })
                    :
                        kind === 'C'
                            ?
                                empty_1.EMPTY
                            :
                                0;
        if (!result) {
            throw new TypeError("Unexpected notification kind " + kind);
        }
        return result;
    };
    Notification.createNext = function (value) {
        return new Notification('N', value);
    };
    Notification.createError = function (err) {
        return new Notification('E', undefined, err);
    };
    Notification.createComplete = function () {
        return Notification.completeNotification;
    };
    Notification.completeNotification = new Notification('C');
    return Notification;
}());
exports.Notification = Notification;
function observeNotification(notification, observer) {
    var _a, _b, _c;
    var _d = notification, kind = _d.kind, value = _d.value, error = _d.error;
    if (typeof kind !== 'string') {
        throw new TypeError('Invalid notification, missing "kind"');
    }
    kind === 'N' ? (_a = observer.next) === null || _a === void 0 ? void 0 : _a.call(observer, value) : kind === 'E' ? (_b = observer.error) === null || _b === void 0 ? void 0 : _b.call(observer, error) : (_c = observer.complete) === null || _c === void 0 ? void 0 : _c.call(observer);
}
exports.observeNotification = observeNotification;
//# sourceMappingURL=Notification.js.map

/***/ }),

/***/ 2500:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createNotification = exports.nextNotification = exports.errorNotification = exports.COMPLETE_NOTIFICATION = void 0;
exports.COMPLETE_NOTIFICATION = (function () { return createNotification('C', undefined, undefined); })();
function errorNotification(error) {
    return createNotification('E', undefined, error);
}
exports.errorNotification = errorNotification;
function nextNotification(value) {
    return createNotification('N', value, undefined);
}
exports.nextNotification = nextNotification;
function createNotification(kind, value, error) {
    return {
        kind: kind,
        value: value,
        error: error,
    };
}
exports.createNotification = createNotification;
//# sourceMappingURL=NotificationFactories.js.map

/***/ }),

/***/ 3014:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Observable = void 0;
var Subscriber_1 = __nccwpck_require__(7121);
var Subscription_1 = __nccwpck_require__(9548);
var observable_1 = __nccwpck_require__(7186);
var pipe_1 = __nccwpck_require__(9587);
var config_1 = __nccwpck_require__(2233);
var isFunction_1 = __nccwpck_require__(7206);
var errorContext_1 = __nccwpck_require__(1199);
var Observable = (function () {
    function Observable(subscribe) {
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var _this = this;
        var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new Subscriber_1.SafeSubscriber(observerOrNext, error, complete);
        errorContext_1.errorContext(function () {
            var _a = _this, operator = _a.operator, source = _a.source;
            subscriber.add(operator
                ?
                    operator.call(subscriber, source)
                : source
                    ?
                        _this._subscribe(subscriber)
                    :
                        _this._trySubscribe(subscriber));
        });
        return subscriber;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.error(err);
        }
    };
    Observable.prototype.forEach = function (next, promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var subscription;
            subscription = _this.subscribe(function (value) {
                try {
                    next(value);
                }
                catch (err) {
                    reject(err);
                    subscription === null || subscription === void 0 ? void 0 : subscription.unsubscribe();
                }
            }, reject, resolve);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        var _a;
        return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
    };
    Observable.prototype[observable_1.observable] = function () {
        return this;
    };
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i] = arguments[_i];
        }
        return pipe_1.pipeFromArray(operations)(this);
    };
    Observable.prototype.toPromise = function (promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) { return (value = x); }, function (err) { return reject(err); }, function () { return resolve(value); });
        });
    };
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
exports.Observable = Observable;
function getPromiseCtor(promiseCtor) {
    var _a;
    return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config_1.config.Promise) !== null && _a !== void 0 ? _a : Promise;
}
function isObserver(value) {
    return value && isFunction_1.isFunction(value.next) && isFunction_1.isFunction(value.error) && isFunction_1.isFunction(value.complete);
}
function isSubscriber(value) {
    return (value && value instanceof Subscriber_1.Subscriber) || (isObserver(value) && Subscription_1.isSubscription(value));
}
//# sourceMappingURL=Observable.js.map

/***/ }),

/***/ 2351:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReplaySubject = void 0;
var Subject_1 = __nccwpck_require__(9944);
var dateTimestampProvider_1 = __nccwpck_require__(1395);
var ReplaySubject = (function (_super) {
    __extends(ReplaySubject, _super);
    function ReplaySubject(_bufferSize, _windowTime, _timestampProvider) {
        if (_bufferSize === void 0) { _bufferSize = Infinity; }
        if (_windowTime === void 0) { _windowTime = Infinity; }
        if (_timestampProvider === void 0) { _timestampProvider = dateTimestampProvider_1.dateTimestampProvider; }
        var _this = _super.call(this) || this;
        _this._bufferSize = _bufferSize;
        _this._windowTime = _windowTime;
        _this._timestampProvider = _timestampProvider;
        _this._buffer = [];
        _this._infiniteTimeWindow = true;
        _this._infiniteTimeWindow = _windowTime === Infinity;
        _this._bufferSize = Math.max(1, _bufferSize);
        _this._windowTime = Math.max(1, _windowTime);
        return _this;
    }
    ReplaySubject.prototype.next = function (value) {
        var _a = this, isStopped = _a.isStopped, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow, _timestampProvider = _a._timestampProvider, _windowTime = _a._windowTime;
        if (!isStopped) {
            _buffer.push(value);
            !_infiniteTimeWindow && _buffer.push(_timestampProvider.now() + _windowTime);
        }
        this._trimBuffer();
        _super.prototype.next.call(this, value);
    };
    ReplaySubject.prototype._subscribe = function (subscriber) {
        this._throwIfClosed();
        this._trimBuffer();
        var subscription = this._innerSubscribe(subscriber);
        var _a = this, _infiniteTimeWindow = _a._infiniteTimeWindow, _buffer = _a._buffer;
        var copy = _buffer.slice();
        for (var i = 0; i < copy.length && !subscriber.closed; i += _infiniteTimeWindow ? 1 : 2) {
            subscriber.next(copy[i]);
        }
        this._checkFinalizedStatuses(subscriber);
        return subscription;
    };
    ReplaySubject.prototype._trimBuffer = function () {
        var _a = this, _bufferSize = _a._bufferSize, _timestampProvider = _a._timestampProvider, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow;
        var adjustedBufferSize = (_infiniteTimeWindow ? 1 : 2) * _bufferSize;
        _bufferSize < Infinity && adjustedBufferSize < _buffer.length && _buffer.splice(0, _buffer.length - adjustedBufferSize);
        if (!_infiniteTimeWindow) {
            var now = _timestampProvider.now();
            var last = 0;
            for (var i = 1; i < _buffer.length && _buffer[i] <= now; i += 2) {
                last = i;
            }
            last && _buffer.splice(0, last + 1);
        }
    };
    return ReplaySubject;
}(Subject_1.Subject));
exports.ReplaySubject = ReplaySubject;
//# sourceMappingURL=ReplaySubject.js.map

/***/ }),

/***/ 6243:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Scheduler = void 0;
var dateTimestampProvider_1 = __nccwpck_require__(1395);
var Scheduler = (function () {
    function Scheduler(schedulerActionCtor, now) {
        if (now === void 0) { now = Scheduler.now; }
        this.schedulerActionCtor = schedulerActionCtor;
        this.now = now;
    }
    Scheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) { delay = 0; }
        return new this.schedulerActionCtor(this, work).schedule(state, delay);
    };
    Scheduler.now = dateTimestampProvider_1.dateTimestampProvider.now;
    return Scheduler;
}());
exports.Scheduler = Scheduler;
//# sourceMappingURL=Scheduler.js.map

/***/ }),

/***/ 9944:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnonymousSubject = exports.Subject = void 0;
var Observable_1 = __nccwpck_require__(3014);
var Subscription_1 = __nccwpck_require__(9548);
var ObjectUnsubscribedError_1 = __nccwpck_require__(5266);
var arrRemove_1 = __nccwpck_require__(8499);
var errorContext_1 = __nccwpck_require__(1199);
var Subject = (function (_super) {
    __extends(Subject, _super);
    function Subject() {
        var _this = _super.call(this) || this;
        _this.closed = false;
        _this.observers = [];
        _this.isStopped = false;
        _this.hasError = false;
        _this.thrownError = null;
        return _this;
    }
    Subject.prototype.lift = function (operator) {
        var subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    };
    Subject.prototype._throwIfClosed = function () {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
    };
    Subject.prototype.next = function (value) {
        var _this = this;
        errorContext_1.errorContext(function () {
            var e_1, _a;
            _this._throwIfClosed();
            if (!_this.isStopped) {
                var copy = _this.observers.slice();
                try {
                    for (var copy_1 = __values(copy), copy_1_1 = copy_1.next(); !copy_1_1.done; copy_1_1 = copy_1.next()) {
                        var observer = copy_1_1.value;
                        observer.next(value);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (copy_1_1 && !copy_1_1.done && (_a = copy_1.return)) _a.call(copy_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        });
    };
    Subject.prototype.error = function (err) {
        var _this = this;
        errorContext_1.errorContext(function () {
            _this._throwIfClosed();
            if (!_this.isStopped) {
                _this.hasError = _this.isStopped = true;
                _this.thrownError = err;
                var observers = _this.observers;
                while (observers.length) {
                    observers.shift().error(err);
                }
            }
        });
    };
    Subject.prototype.complete = function () {
        var _this = this;
        errorContext_1.errorContext(function () {
            _this._throwIfClosed();
            if (!_this.isStopped) {
                _this.isStopped = true;
                var observers = _this.observers;
                while (observers.length) {
                    observers.shift().complete();
                }
            }
        });
    };
    Subject.prototype.unsubscribe = function () {
        this.isStopped = this.closed = true;
        this.observers = null;
    };
    Object.defineProperty(Subject.prototype, "observed", {
        get: function () {
            var _a;
            return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
        },
        enumerable: false,
        configurable: true
    });
    Subject.prototype._trySubscribe = function (subscriber) {
        this._throwIfClosed();
        return _super.prototype._trySubscribe.call(this, subscriber);
    };
    Subject.prototype._subscribe = function (subscriber) {
        this._throwIfClosed();
        this._checkFinalizedStatuses(subscriber);
        return this._innerSubscribe(subscriber);
    };
    Subject.prototype._innerSubscribe = function (subscriber) {
        var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
        return hasError || isStopped
            ? Subscription_1.EMPTY_SUBSCRIPTION
            : (observers.push(subscriber), new Subscription_1.Subscription(function () { return arrRemove_1.arrRemove(observers, subscriber); }));
    };
    Subject.prototype._checkFinalizedStatuses = function (subscriber) {
        var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
        if (hasError) {
            subscriber.error(thrownError);
        }
        else if (isStopped) {
            subscriber.complete();
        }
    };
    Subject.prototype.asObservable = function () {
        var observable = new Observable_1.Observable();
        observable.source = this;
        return observable;
    };
    Subject.create = function (destination, source) {
        return new AnonymousSubject(destination, source);
    };
    return Subject;
}(Observable_1.Observable));
exports.Subject = Subject;
var AnonymousSubject = (function (_super) {
    __extends(AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
        var _this = _super.call(this) || this;
        _this.destination = destination;
        _this.source = source;
        return _this;
    }
    AnonymousSubject.prototype.next = function (value) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    };
    AnonymousSubject.prototype.error = function (err) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
    };
    AnonymousSubject.prototype.complete = function () {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    AnonymousSubject.prototype._subscribe = function (subscriber) {
        var _a, _b;
        return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : Subscription_1.EMPTY_SUBSCRIPTION;
    };
    return AnonymousSubject;
}(Subject));
exports.AnonymousSubject = AnonymousSubject;
//# sourceMappingURL=Subject.js.map

/***/ }),

/***/ 7121:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EMPTY_OBSERVER = exports.SafeSubscriber = exports.Subscriber = void 0;
var isFunction_1 = __nccwpck_require__(7206);
var Subscription_1 = __nccwpck_require__(9548);
var config_1 = __nccwpck_require__(2233);
var reportUnhandledError_1 = __nccwpck_require__(2445);
var noop_1 = __nccwpck_require__(1642);
var NotificationFactories_1 = __nccwpck_require__(2500);
var timeoutProvider_1 = __nccwpck_require__(1613);
var errorContext_1 = __nccwpck_require__(1199);
var Subscriber = (function (_super) {
    __extends(Subscriber, _super);
    function Subscriber(destination) {
        var _this = _super.call(this) || this;
        _this.isStopped = false;
        if (destination) {
            _this.destination = destination;
            if (Subscription_1.isSubscription(destination)) {
                destination.add(_this);
            }
        }
        else {
            _this.destination = exports.EMPTY_OBSERVER;
        }
        return _this;
    }
    Subscriber.create = function (next, error, complete) {
        return new SafeSubscriber(next, error, complete);
    };
    Subscriber.prototype.next = function (value) {
        if (this.isStopped) {
            handleStoppedNotification(NotificationFactories_1.nextNotification(value), this);
        }
        else {
            this._next(value);
        }
    };
    Subscriber.prototype.error = function (err) {
        if (this.isStopped) {
            handleStoppedNotification(NotificationFactories_1.errorNotification(err), this);
        }
        else {
            this.isStopped = true;
            this._error(err);
        }
    };
    Subscriber.prototype.complete = function () {
        if (this.isStopped) {
            handleStoppedNotification(NotificationFactories_1.COMPLETE_NOTIFICATION, this);
        }
        else {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (!this.closed) {
            this.isStopped = true;
            _super.prototype.unsubscribe.call(this);
            this.destination = null;
        }
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        try {
            this.destination.error(err);
        }
        finally {
            this.unsubscribe();
        }
    };
    Subscriber.prototype._complete = function () {
        try {
            this.destination.complete();
        }
        finally {
            this.unsubscribe();
        }
    };
    return Subscriber;
}(Subscription_1.Subscription));
exports.Subscriber = Subscriber;
var SafeSubscriber = (function (_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(observerOrNext, error, complete) {
        var _this = _super.call(this) || this;
        var next;
        if (isFunction_1.isFunction(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            (next = observerOrNext.next, error = observerOrNext.error, complete = observerOrNext.complete);
            var context_1;
            if (_this && config_1.config.useDeprecatedNextContext) {
                context_1 = Object.create(observerOrNext);
                context_1.unsubscribe = function () { return _this.unsubscribe(); };
            }
            else {
                context_1 = observerOrNext;
            }
            next = next === null || next === void 0 ? void 0 : next.bind(context_1);
            error = error === null || error === void 0 ? void 0 : error.bind(context_1);
            complete = complete === null || complete === void 0 ? void 0 : complete.bind(context_1);
        }
        _this.destination = {
            next: next ? wrapForErrorHandling(next, _this) : noop_1.noop,
            error: wrapForErrorHandling(error !== null && error !== void 0 ? error : defaultErrorHandler, _this),
            complete: complete ? wrapForErrorHandling(complete, _this) : noop_1.noop,
        };
        return _this;
    }
    return SafeSubscriber;
}(Subscriber));
exports.SafeSubscriber = SafeSubscriber;
function wrapForErrorHandling(handler, instance) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        try {
            handler.apply(void 0, __spreadArray([], __read(args)));
        }
        catch (err) {
            if (config_1.config.useDeprecatedSynchronousErrorHandling) {
                errorContext_1.captureError(err);
            }
            else {
                reportUnhandledError_1.reportUnhandledError(err);
            }
        }
    };
}
function defaultErrorHandler(err) {
    throw err;
}
function handleStoppedNotification(notification, subscriber) {
    var onStoppedNotification = config_1.config.onStoppedNotification;
    onStoppedNotification && timeoutProvider_1.timeoutProvider.setTimeout(function () { return onStoppedNotification(notification, subscriber); });
}
exports.EMPTY_OBSERVER = {
    closed: true,
    next: noop_1.noop,
    error: defaultErrorHandler,
    complete: noop_1.noop,
};
//# sourceMappingURL=Subscriber.js.map

/***/ }),

/***/ 9548:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isSubscription = exports.EMPTY_SUBSCRIPTION = exports.Subscription = void 0;
var isFunction_1 = __nccwpck_require__(7206);
var UnsubscriptionError_1 = __nccwpck_require__(6776);
var arrRemove_1 = __nccwpck_require__(8499);
var Subscription = (function () {
    function Subscription(initialTeardown) {
        this.initialTeardown = initialTeardown;
        this.closed = false;
        this._parentage = null;
        this._teardowns = null;
    }
    Subscription.prototype.unsubscribe = function () {
        var e_1, _a, e_2, _b;
        var errors;
        if (!this.closed) {
            this.closed = true;
            var _parentage = this._parentage;
            if (_parentage) {
                this._parentage = null;
                if (Array.isArray(_parentage)) {
                    try {
                        for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                            var parent_1 = _parentage_1_1.value;
                            parent_1.remove(this);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                else {
                    _parentage.remove(this);
                }
            }
            var initialTeardown = this.initialTeardown;
            if (isFunction_1.isFunction(initialTeardown)) {
                try {
                    initialTeardown();
                }
                catch (e) {
                    errors = e instanceof UnsubscriptionError_1.UnsubscriptionError ? e.errors : [e];
                }
            }
            var _teardowns = this._teardowns;
            if (_teardowns) {
                this._teardowns = null;
                try {
                    for (var _teardowns_1 = __values(_teardowns), _teardowns_1_1 = _teardowns_1.next(); !_teardowns_1_1.done; _teardowns_1_1 = _teardowns_1.next()) {
                        var teardown_1 = _teardowns_1_1.value;
                        try {
                            execTeardown(teardown_1);
                        }
                        catch (err) {
                            errors = errors !== null && errors !== void 0 ? errors : [];
                            if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                                errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
                            }
                            else {
                                errors.push(err);
                            }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_teardowns_1_1 && !_teardowns_1_1.done && (_b = _teardowns_1.return)) _b.call(_teardowns_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            if (errors) {
                throw new UnsubscriptionError_1.UnsubscriptionError(errors);
            }
        }
    };
    Subscription.prototype.add = function (teardown) {
        var _a;
        if (teardown && teardown !== this) {
            if (this.closed) {
                execTeardown(teardown);
            }
            else {
                if (teardown instanceof Subscription) {
                    if (teardown.closed || teardown._hasParent(this)) {
                        return;
                    }
                    teardown._addParent(this);
                }
                (this._teardowns = (_a = this._teardowns) !== null && _a !== void 0 ? _a : []).push(teardown);
            }
        }
    };
    Subscription.prototype._hasParent = function (parent) {
        var _parentage = this._parentage;
        return _parentage === parent || (Array.isArray(_parentage) && _parentage.includes(parent));
    };
    Subscription.prototype._addParent = function (parent) {
        var _parentage = this._parentage;
        this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
    };
    Subscription.prototype._removeParent = function (parent) {
        var _parentage = this._parentage;
        if (_parentage === parent) {
            this._parentage = null;
        }
        else if (Array.isArray(_parentage)) {
            arrRemove_1.arrRemove(_parentage, parent);
        }
    };
    Subscription.prototype.remove = function (teardown) {
        var _teardowns = this._teardowns;
        _teardowns && arrRemove_1.arrRemove(_teardowns, teardown);
        if (teardown instanceof Subscription) {
            teardown._removeParent(this);
        }
    };
    Subscription.EMPTY = (function () {
        var empty = new Subscription();
        empty.closed = true;
        return empty;
    })();
    return Subscription;
}());
exports.Subscription = Subscription;
exports.EMPTY_SUBSCRIPTION = Subscription.EMPTY;
function isSubscription(value) {
    return (value instanceof Subscription ||
        (value && 'closed' in value && isFunction_1.isFunction(value.remove) && isFunction_1.isFunction(value.add) && isFunction_1.isFunction(value.unsubscribe)));
}
exports.isSubscription = isSubscription;
function execTeardown(teardown) {
    if (isFunction_1.isFunction(teardown)) {
        teardown();
    }
    else {
        teardown.unsubscribe();
    }
}
//# sourceMappingURL=Subscription.js.map

/***/ }),

/***/ 2233:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.config = void 0;
exports.config = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: undefined,
    useDeprecatedSynchronousErrorHandling: false,
    useDeprecatedNextContext: false,
};
//# sourceMappingURL=config.js.map

/***/ }),

/***/ 9369:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.firstValueFrom = void 0;
var EmptyError_1 = __nccwpck_require__(9391);
var Subscriber_1 = __nccwpck_require__(7121);
function firstValueFrom(source, config) {
    var hasConfig = typeof config === 'object';
    return new Promise(function (resolve, reject) {
        var subscriber = new Subscriber_1.SafeSubscriber({
            next: function (value) {
                resolve(value);
                subscriber.unsubscribe();
            },
            error: reject,
            complete: function () {
                if (hasConfig) {
                    resolve(config.defaultValue);
                }
                else {
                    reject(new EmptyError_1.EmptyError());
                }
            },
        });
        source.subscribe(subscriber);
    });
}
exports.firstValueFrom = firstValueFrom;
//# sourceMappingURL=firstValueFrom.js.map

/***/ }),

/***/ 9713:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.lastValueFrom = void 0;
var EmptyError_1 = __nccwpck_require__(9391);
function lastValueFrom(source, config) {
    var hasConfig = typeof config === 'object';
    return new Promise(function (resolve, reject) {
        var _hasValue = false;
        var _value;
        source.subscribe({
            next: function (value) {
                _value = value;
                _hasValue = true;
            },
            error: reject,
            complete: function () {
                if (_hasValue) {
                    resolve(_value);
                }
                else if (hasConfig) {
                    resolve(config.defaultValue);
                }
                else {
                    reject(new EmptyError_1.EmptyError());
                }
            },
        });
    });
}
exports.lastValueFrom = lastValueFrom;
//# sourceMappingURL=lastValueFrom.js.map

/***/ }),

/***/ 420:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConnectableObservable = void 0;
var Observable_1 = __nccwpck_require__(3014);
var Subscription_1 = __nccwpck_require__(9548);
var refCount_1 = __nccwpck_require__(2331);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
var lift_1 = __nccwpck_require__(8669);
var ConnectableObservable = (function (_super) {
    __extends(ConnectableObservable, _super);
    function ConnectableObservable(source, subjectFactory) {
        var _this = _super.call(this) || this;
        _this.source = source;
        _this.subjectFactory = subjectFactory;
        _this._subject = null;
        _this._refCount = 0;
        _this._connection = null;
        if (lift_1.hasLift(source)) {
            _this.lift = source.lift;
        }
        return _this;
    }
    ConnectableObservable.prototype._subscribe = function (subscriber) {
        return this.getSubject().subscribe(subscriber);
    };
    ConnectableObservable.prototype.getSubject = function () {
        var subject = this._subject;
        if (!subject || subject.isStopped) {
            this._subject = this.subjectFactory();
        }
        return this._subject;
    };
    ConnectableObservable.prototype._teardown = function () {
        this._refCount = 0;
        var _connection = this._connection;
        this._subject = this._connection = null;
        _connection === null || _connection === void 0 ? void 0 : _connection.unsubscribe();
    };
    ConnectableObservable.prototype.connect = function () {
        var _this = this;
        var connection = this._connection;
        if (!connection) {
            connection = this._connection = new Subscription_1.Subscription();
            var subject_1 = this.getSubject();
            connection.add(this.source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subject_1, undefined, function () {
                _this._teardown();
                subject_1.complete();
            }, function (err) {
                _this._teardown();
                subject_1.error(err);
            }, function () { return _this._teardown(); })));
            if (connection.closed) {
                this._connection = null;
                connection = Subscription_1.Subscription.EMPTY;
            }
        }
        return connection;
    };
    ConnectableObservable.prototype.refCount = function () {
        return refCount_1.refCount()(this);
    };
    return ConnectableObservable;
}(Observable_1.Observable));
exports.ConnectableObservable = ConnectableObservable;
//# sourceMappingURL=ConnectableObservable.js.map

/***/ }),

/***/ 6949:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.bindCallback = void 0;
var bindCallbackInternals_1 = __nccwpck_require__(585);
function bindCallback(callbackFunc, resultSelector, scheduler) {
    return bindCallbackInternals_1.bindCallbackInternals(false, callbackFunc, resultSelector, scheduler);
}
exports.bindCallback = bindCallback;
//# sourceMappingURL=bindCallback.js.map

/***/ }),

/***/ 585:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.bindCallbackInternals = void 0;
var isScheduler_1 = __nccwpck_require__(4078);
var Observable_1 = __nccwpck_require__(3014);
var subscribeOn_1 = __nccwpck_require__(7224);
var mapOneOrManyArgs_1 = __nccwpck_require__(8934);
var observeOn_1 = __nccwpck_require__(2451);
var AsyncSubject_1 = __nccwpck_require__(9747);
function bindCallbackInternals(isNodeStyle, callbackFunc, resultSelector, scheduler) {
    if (resultSelector) {
        if (isScheduler_1.isScheduler(resultSelector)) {
            scheduler = resultSelector;
        }
        else {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return bindCallbackInternals(isNodeStyle, callbackFunc, scheduler)
                    .apply(this, args)
                    .pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector));
            };
        }
    }
    if (scheduler) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return bindCallbackInternals(isNodeStyle, callbackFunc)
                .apply(this, args)
                .pipe(subscribeOn_1.subscribeOn(scheduler), observeOn_1.observeOn(scheduler));
        };
    }
    return function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var subject = new AsyncSubject_1.AsyncSubject();
        var uninitialized = true;
        return new Observable_1.Observable(function (subscriber) {
            var subs = subject.subscribe(subscriber);
            if (uninitialized) {
                uninitialized = false;
                var isAsync_1 = false;
                var isComplete_1 = false;
                callbackFunc.apply(_this, __spreadArray(__spreadArray([], __read(args)), [
                    function () {
                        var results = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            results[_i] = arguments[_i];
                        }
                        if (isNodeStyle) {
                            var err = results.shift();
                            if (err != null) {
                                subject.error(err);
                                return;
                            }
                        }
                        subject.next(1 < results.length ? results : results[0]);
                        isComplete_1 = true;
                        if (isAsync_1) {
                            subject.complete();
                        }
                    },
                ]));
                if (isComplete_1) {
                    subject.complete();
                }
                isAsync_1 = true;
            }
            return subs;
        });
    };
}
exports.bindCallbackInternals = bindCallbackInternals;
//# sourceMappingURL=bindCallbackInternals.js.map

/***/ }),

/***/ 1150:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.bindNodeCallback = void 0;
var bindCallbackInternals_1 = __nccwpck_require__(585);
function bindNodeCallback(callbackFunc, resultSelector, scheduler) {
    return bindCallbackInternals_1.bindCallbackInternals(true, callbackFunc, resultSelector, scheduler);
}
exports.bindNodeCallback = bindNodeCallback;
//# sourceMappingURL=bindNodeCallback.js.map

/***/ }),

/***/ 6843:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.combineLatestInit = exports.combineLatest = void 0;
var Observable_1 = __nccwpck_require__(3014);
var argsArgArrayOrObject_1 = __nccwpck_require__(2920);
var from_1 = __nccwpck_require__(8309);
var identity_1 = __nccwpck_require__(283);
var mapOneOrManyArgs_1 = __nccwpck_require__(8934);
var args_1 = __nccwpck_require__(4890);
var createObject_1 = __nccwpck_require__(7834);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
function combineLatest() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = args_1.popScheduler(args);
    var resultSelector = args_1.popResultSelector(args);
    var _a = argsArgArrayOrObject_1.argsArgArrayOrObject(args), observables = _a.args, keys = _a.keys;
    if (observables.length === 0) {
        return from_1.from([], scheduler);
    }
    var result = new Observable_1.Observable(combineLatestInit(observables, scheduler, keys
        ?
            function (values) { return createObject_1.createObject(keys, values); }
        :
            identity_1.identity));
    return resultSelector ? result.pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector)) : result;
}
exports.combineLatest = combineLatest;
function combineLatestInit(observables, scheduler, valueTransform) {
    if (valueTransform === void 0) { valueTransform = identity_1.identity; }
    return function (subscriber) {
        maybeSchedule(scheduler, function () {
            var length = observables.length;
            var values = new Array(length);
            var active = length;
            var remainingFirstValues = length;
            var _loop_1 = function (i) {
                maybeSchedule(scheduler, function () {
                    var source = from_1.from(observables[i], scheduler);
                    var hasFirstValue = false;
                    source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
                        values[i] = value;
                        if (!hasFirstValue) {
                            hasFirstValue = true;
                            remainingFirstValues--;
                        }
                        if (!remainingFirstValues) {
                            subscriber.next(valueTransform(values.slice()));
                        }
                    }, function () {
                        if (!--active) {
                            subscriber.complete();
                        }
                    }));
                }, subscriber);
            };
            for (var i = 0; i < length; i++) {
                _loop_1(i);
            }
        }, subscriber);
    };
}
exports.combineLatestInit = combineLatestInit;
function maybeSchedule(scheduler, execute, subscription) {
    if (scheduler) {
        subscription.add(scheduler.schedule(execute));
    }
    else {
        execute();
    }
}
//# sourceMappingURL=combineLatest.js.map

/***/ }),

/***/ 4675:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.concat = void 0;
var concatAll_1 = __nccwpck_require__(8049);
var fromArray_1 = __nccwpck_require__(8960);
var args_1 = __nccwpck_require__(4890);
function concat() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return concatAll_1.concatAll()(fromArray_1.internalFromArray(args, args_1.popScheduler(args)));
}
exports.concat = concat;
//# sourceMappingURL=concat.js.map

/***/ }),

/***/ 3152:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.connectable = void 0;
var Subject_1 = __nccwpck_require__(9944);
var Observable_1 = __nccwpck_require__(3014);
var defer_1 = __nccwpck_require__(7672);
var DEFAULT_CONFIG = {
    connector: function () { return new Subject_1.Subject(); },
    resetOnDisconnect: true,
};
function connectable(source, config) {
    if (config === void 0) { config = DEFAULT_CONFIG; }
    var connection = null;
    var connector = config.connector, _a = config.resetOnDisconnect, resetOnDisconnect = _a === void 0 ? true : _a;
    var subject = connector();
    var result = new Observable_1.Observable(function (subscriber) {
        return subject.subscribe(subscriber);
    });
    result.connect = function () {
        if (!connection || connection.closed) {
            connection = defer_1.defer(function () { return source; }).subscribe(subject);
            if (resetOnDisconnect) {
                connection.add(function () { return (subject = connector()); });
            }
        }
        return connection;
    };
    return result;
}
exports.connectable = connectable;
//# sourceMappingURL=connectable.js.map

/***/ }),

/***/ 7672:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defer = void 0;
var Observable_1 = __nccwpck_require__(3014);
var from_1 = __nccwpck_require__(8309);
function defer(observableFactory) {
    return new Observable_1.Observable(function (subscriber) {
        from_1.innerFrom(observableFactory()).subscribe(subscriber);
    });
}
exports.defer = defer;
//# sourceMappingURL=defer.js.map

/***/ }),

/***/ 8197:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.animationFrames = void 0;
var Observable_1 = __nccwpck_require__(3014);
var Subscription_1 = __nccwpck_require__(9548);
var performanceTimestampProvider_1 = __nccwpck_require__(143);
var animationFrameProvider_1 = __nccwpck_require__(2738);
function animationFrames(timestampProvider) {
    return timestampProvider ? animationFramesFactory(timestampProvider) : DEFAULT_ANIMATION_FRAMES;
}
exports.animationFrames = animationFrames;
function animationFramesFactory(timestampProvider) {
    var schedule = animationFrameProvider_1.animationFrameProvider.schedule;
    return new Observable_1.Observable(function (subscriber) {
        var subscription = new Subscription_1.Subscription();
        var provider = timestampProvider || performanceTimestampProvider_1.performanceTimestampProvider;
        var start = provider.now();
        var run = function (timestamp) {
            var now = provider.now();
            subscriber.next({
                timestamp: timestampProvider ? now : timestamp,
                elapsed: now - start
            });
            if (!subscriber.closed) {
                subscription.add(schedule(run));
            }
        };
        subscription.add(schedule(run));
        return subscription;
    });
}
var DEFAULT_ANIMATION_FRAMES = animationFramesFactory();
//# sourceMappingURL=animationFrames.js.map

/***/ }),

/***/ 437:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.empty = exports.EMPTY = void 0;
var Observable_1 = __nccwpck_require__(3014);
exports.EMPTY = new Observable_1.Observable(function (subscriber) { return subscriber.complete(); });
function empty(scheduler) {
    return scheduler ? emptyScheduled(scheduler) : exports.EMPTY;
}
exports.empty = empty;
function emptyScheduled(scheduler) {
    return new Observable_1.Observable(function (subscriber) { return scheduler.schedule(function () { return subscriber.complete(); }); });
}
//# sourceMappingURL=empty.js.map

/***/ }),

/***/ 7358:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.forkJoin = void 0;
var Observable_1 = __nccwpck_require__(3014);
var argsArgArrayOrObject_1 = __nccwpck_require__(2920);
var from_1 = __nccwpck_require__(8309);
var args_1 = __nccwpck_require__(4890);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
var mapOneOrManyArgs_1 = __nccwpck_require__(8934);
var createObject_1 = __nccwpck_require__(7834);
function forkJoin() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var resultSelector = args_1.popResultSelector(args);
    var _a = argsArgArrayOrObject_1.argsArgArrayOrObject(args), sources = _a.args, keys = _a.keys;
    var result = new Observable_1.Observable(function (subscriber) {
        var length = sources.length;
        if (!length) {
            subscriber.complete();
            return;
        }
        var values = new Array(length);
        var remainingCompletions = length;
        var remainingEmissions = length;
        var _loop_1 = function (sourceIndex) {
            var hasValue = false;
            from_1.innerFrom(sources[sourceIndex]).subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
                if (!hasValue) {
                    hasValue = true;
                    remainingEmissions--;
                }
                values[sourceIndex] = value;
            }, function () {
                if (!--remainingCompletions || !hasValue) {
                    if (!remainingEmissions) {
                        subscriber.next(keys ? createObject_1.createObject(keys, values) : values);
                    }
                    subscriber.complete();
                }
            }));
        };
        for (var sourceIndex = 0; sourceIndex < length; sourceIndex++) {
            _loop_1(sourceIndex);
        }
    });
    return resultSelector ? result.pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector)) : result;
}
exports.forkJoin = forkJoin;
//# sourceMappingURL=forkJoin.js.map

/***/ }),

/***/ 8309:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fromArrayLike = exports.innerFrom = exports.from = void 0;
var isArrayLike_1 = __nccwpck_require__(4461);
var isPromise_1 = __nccwpck_require__(5585);
var observable_1 = __nccwpck_require__(7186);
var Observable_1 = __nccwpck_require__(3014);
var scheduled_1 = __nccwpck_require__(6151);
var isFunction_1 = __nccwpck_require__(7206);
var reportUnhandledError_1 = __nccwpck_require__(2445);
var isInteropObservable_1 = __nccwpck_require__(7984);
var isAsyncIterable_1 = __nccwpck_require__(4408);
var throwUnobservableError_1 = __nccwpck_require__(7364);
var isIterable_1 = __nccwpck_require__(4292);
var isReadableStreamLike_1 = __nccwpck_require__(9621);
function from(input, scheduler) {
    return scheduler ? scheduled_1.scheduled(input, scheduler) : innerFrom(input);
}
exports.from = from;
function innerFrom(input) {
    if (input instanceof Observable_1.Observable) {
        return input;
    }
    if (input != null) {
        if (isInteropObservable_1.isInteropObservable(input)) {
            return fromInteropObservable(input);
        }
        if (isArrayLike_1.isArrayLike(input)) {
            return fromArrayLike(input);
        }
        if (isPromise_1.isPromise(input)) {
            return fromPromise(input);
        }
        if (isAsyncIterable_1.isAsyncIterable(input)) {
            return fromAsyncIterable(input);
        }
        if (isIterable_1.isIterable(input)) {
            return fromIterable(input);
        }
        if (isReadableStreamLike_1.isReadableStreamLike(input)) {
            return fromReadableStreamLike(input);
        }
    }
    throw throwUnobservableError_1.createInvalidObservableTypeError(input);
}
exports.innerFrom = innerFrom;
function fromInteropObservable(obj) {
    return new Observable_1.Observable(function (subscriber) {
        var obs = obj[observable_1.observable]();
        if (isFunction_1.isFunction(obs.subscribe)) {
            return obs.subscribe(subscriber);
        }
        throw new TypeError('Provided object does not correctly implement Symbol.observable');
    });
}
function fromArrayLike(array) {
    return new Observable_1.Observable(function (subscriber) {
        for (var i = 0; i < array.length && !subscriber.closed; i++) {
            subscriber.next(array[i]);
        }
        subscriber.complete();
    });
}
exports.fromArrayLike = fromArrayLike;
function fromPromise(promise) {
    return new Observable_1.Observable(function (subscriber) {
        promise
            .then(function (value) {
            if (!subscriber.closed) {
                subscriber.next(value);
                subscriber.complete();
            }
        }, function (err) { return subscriber.error(err); })
            .then(null, reportUnhandledError_1.reportUnhandledError);
    });
}
function fromIterable(iterable) {
    return new Observable_1.Observable(function (subscriber) {
        var e_1, _a;
        try {
            for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
                var value = iterable_1_1.value;
                subscriber.next(value);
                if (subscriber.closed) {
                    return;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        subscriber.complete();
    });
}
function fromAsyncIterable(asyncIterable) {
    return new Observable_1.Observable(function (subscriber) {
        process(asyncIterable, subscriber).catch(function (err) { return subscriber.error(err); });
    });
}
function fromReadableStreamLike(readableStream) {
    return fromAsyncIterable(isReadableStreamLike_1.readableStreamLikeToAsyncGenerator(readableStream));
}
function process(asyncIterable, subscriber) {
    var asyncIterable_1, asyncIterable_1_1;
    var e_2, _a;
    return __awaiter(this, void 0, void 0, function () {
        var value, e_2_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, 6, 11]);
                    asyncIterable_1 = __asyncValues(asyncIterable);
                    _b.label = 1;
                case 1: return [4, asyncIterable_1.next()];
                case 2:
                    if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [3, 4];
                    value = asyncIterable_1_1.value;
                    subscriber.next(value);
                    if (subscriber.closed) {
                        return [2];
                    }
                    _b.label = 3;
                case 3: return [3, 1];
                case 4: return [3, 11];
                case 5:
                    e_2_1 = _b.sent();
                    e_2 = { error: e_2_1 };
                    return [3, 11];
                case 6:
                    _b.trys.push([6, , 9, 10]);
                    if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [3, 8];
                    return [4, _a.call(asyncIterable_1)];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8: return [3, 10];
                case 9:
                    if (e_2) throw e_2.error;
                    return [7];
                case 10: return [7];
                case 11:
                    subscriber.complete();
                    return [2];
            }
        });
    });
}
//# sourceMappingURL=from.js.map

/***/ }),

/***/ 8960:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.internalFromArray = void 0;
var scheduleArray_1 = __nccwpck_require__(1348);
var from_1 = __nccwpck_require__(8309);
function internalFromArray(input, scheduler) {
    return scheduler ? scheduleArray_1.scheduleArray(input, scheduler) : from_1.fromArrayLike(input);
}
exports.internalFromArray = internalFromArray;
//# sourceMappingURL=fromArray.js.map

/***/ }),

/***/ 3238:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fromEvent = void 0;
var Observable_1 = __nccwpck_require__(3014);
var mergeMap_1 = __nccwpck_require__(9914);
var isArrayLike_1 = __nccwpck_require__(4461);
var isFunction_1 = __nccwpck_require__(7206);
var mapOneOrManyArgs_1 = __nccwpck_require__(8934);
var fromArray_1 = __nccwpck_require__(8960);
var nodeEventEmitterMethods = ['addListener', 'removeListener'];
var eventTargetMethods = ['addEventListener', 'removeEventListener'];
var jqueryMethods = ['on', 'off'];
function fromEvent(target, eventName, options, resultSelector) {
    if (isFunction_1.isFunction(options)) {
        resultSelector = options;
        options = undefined;
    }
    if (resultSelector) {
        return fromEvent(target, eventName, options).pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector));
    }
    var _a = __read(isEventTarget(target)
        ? eventTargetMethods.map(function (methodName) { return function (handler) { return target[methodName](eventName, handler, options); }; })
        :
            isNodeStyleEventEmitter(target)
                ? nodeEventEmitterMethods.map(toCommonHandlerRegistry(target, eventName))
                : isJQueryStyleEventEmitter(target)
                    ? jqueryMethods.map(toCommonHandlerRegistry(target, eventName))
                    : [], 2), add = _a[0], remove = _a[1];
    if (!add) {
        if (isArrayLike_1.isArrayLike(target)) {
            return mergeMap_1.mergeMap(function (subTarget) { return fromEvent(subTarget, eventName, options); })(fromArray_1.internalFromArray(target));
        }
    }
    if (!add) {
        throw new TypeError('Invalid event target');
    }
    return new Observable_1.Observable(function (subscriber) {
        var handler = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return subscriber.next(1 < args.length ? args : args[0]);
        };
        add(handler);
        return function () { return remove(handler); };
    });
}
exports.fromEvent = fromEvent;
function toCommonHandlerRegistry(target, eventName) {
    return function (methodName) { return function (handler) { return target[methodName](eventName, handler); }; };
}
function isNodeStyleEventEmitter(target) {
    return isFunction_1.isFunction(target.addListener) && isFunction_1.isFunction(target.removeListener);
}
function isJQueryStyleEventEmitter(target) {
    return isFunction_1.isFunction(target.on) && isFunction_1.isFunction(target.off);
}
function isEventTarget(target) {
    return isFunction_1.isFunction(target.addEventListener) && isFunction_1.isFunction(target.removeEventListener);
}
//# sourceMappingURL=fromEvent.js.map

/***/ }),

/***/ 5680:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fromEventPattern = void 0;
var Observable_1 = __nccwpck_require__(3014);
var isFunction_1 = __nccwpck_require__(7206);
var mapOneOrManyArgs_1 = __nccwpck_require__(8934);
function fromEventPattern(addHandler, removeHandler, resultSelector) {
    if (resultSelector) {
        return fromEventPattern(addHandler, removeHandler).pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector));
    }
    return new Observable_1.Observable(function (subscriber) {
        var handler = function () {
            var e = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                e[_i] = arguments[_i];
            }
            return subscriber.next(e.length === 1 ? e[0] : e);
        };
        var retValue = addHandler(handler);
        return isFunction_1.isFunction(removeHandler) ? function () { return removeHandler(handler, retValue); } : undefined;
    });
}
exports.fromEventPattern = fromEventPattern;
//# sourceMappingURL=fromEventPattern.js.map

/***/ }),

/***/ 6513:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fromSubscribable = void 0;
var Observable_1 = __nccwpck_require__(3014);
function fromSubscribable(subscribable) {
    return new Observable_1.Observable(function (subscriber) { return subscribable.subscribe(subscriber); });
}
exports.fromSubscribable = fromSubscribable;
//# sourceMappingURL=fromSubscribable.js.map

/***/ }),

/***/ 2668:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generate = void 0;
var identity_1 = __nccwpck_require__(283);
var isScheduler_1 = __nccwpck_require__(4078);
var defer_1 = __nccwpck_require__(7672);
var scheduleIterable_1 = __nccwpck_require__(9461);
function generate(initialStateOrOptions, condition, iterate, resultSelectorOrScheduler, scheduler) {
    var _a, _b;
    var resultSelector;
    var initialState;
    if (arguments.length === 1) {
        (_a = initialStateOrOptions, initialState = _a.initialState, condition = _a.condition, iterate = _a.iterate, _b = _a.resultSelector, resultSelector = _b === void 0 ? identity_1.identity : _b, scheduler = _a.scheduler);
    }
    else {
        initialState = initialStateOrOptions;
        if (!resultSelectorOrScheduler || isScheduler_1.isScheduler(resultSelectorOrScheduler)) {
            resultSelector = identity_1.identity;
            scheduler = resultSelectorOrScheduler;
        }
        else {
            resultSelector = resultSelectorOrScheduler;
        }
    }
    function gen() {
        var state;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    state = initialState;
                    _a.label = 1;
                case 1:
                    if (!(!condition || condition(state))) return [3, 4];
                    return [4, resultSelector(state)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    state = iterate(state);
                    return [3, 1];
                case 4: return [2];
            }
        });
    }
    return defer_1.defer((scheduler
        ?
            function () { return scheduleIterable_1.scheduleIterable(gen(), scheduler); }
        :
            gen));
}
exports.generate = generate;
//# sourceMappingURL=generate.js.map

/***/ }),

/***/ 6514:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.iif = void 0;
var defer_1 = __nccwpck_require__(7672);
function iif(condition, trueResult, falseResult) {
    return defer_1.defer(function () { return (condition() ? trueResult : falseResult); });
}
exports.iif = iif;
//# sourceMappingURL=iif.js.map

/***/ }),

/***/ 29:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.interval = void 0;
var async_1 = __nccwpck_require__(6072);
var timer_1 = __nccwpck_require__(9757);
function interval(period, scheduler) {
    if (period === void 0) { period = 0; }
    if (scheduler === void 0) { scheduler = async_1.asyncScheduler; }
    if (period < 0) {
        period = 0;
    }
    return timer_1.timer(period, period, scheduler);
}
exports.interval = interval;
//# sourceMappingURL=interval.js.map

/***/ }),

/***/ 5122:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.merge = void 0;
var mergeAll_1 = __nccwpck_require__(2057);
var fromArray_1 = __nccwpck_require__(8960);
var from_1 = __nccwpck_require__(8309);
var empty_1 = __nccwpck_require__(437);
var args_1 = __nccwpck_require__(4890);
function merge() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = args_1.popScheduler(args);
    var concurrent = args_1.popNumber(args, Infinity);
    var sources = args;
    return !sources.length
        ?
            empty_1.EMPTY
        : sources.length === 1
            ?
                from_1.innerFrom(sources[0])
            :
                mergeAll_1.mergeAll(concurrent)(fromArray_1.internalFromArray(sources, scheduler));
}
exports.merge = merge;
//# sourceMappingURL=merge.js.map

/***/ }),

/***/ 6228:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.never = exports.NEVER = void 0;
var Observable_1 = __nccwpck_require__(3014);
var noop_1 = __nccwpck_require__(1642);
exports.NEVER = new Observable_1.Observable(noop_1.noop);
function never() {
    return exports.NEVER;
}
exports.never = never;
//# sourceMappingURL=never.js.map

/***/ }),

/***/ 2163:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.of = void 0;
var fromArray_1 = __nccwpck_require__(8960);
var scheduleArray_1 = __nccwpck_require__(1348);
var args_1 = __nccwpck_require__(4890);
function of() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = args_1.popScheduler(args);
    return scheduler ? scheduleArray_1.scheduleArray(args, scheduler) : fromArray_1.internalFromArray(args);
}
exports.of = of;
//# sourceMappingURL=of.js.map

/***/ }),

/***/ 6089:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.onErrorResumeNext = void 0;
var empty_1 = __nccwpck_require__(437);
var onErrorResumeNext_1 = __nccwpck_require__(8991);
var argsOrArgArray_1 = __nccwpck_require__(8824);
function onErrorResumeNext() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    return onErrorResumeNext_1.onErrorResumeNext(argsOrArgArray_1.argsOrArgArray(sources))(empty_1.EMPTY);
}
exports.onErrorResumeNext = onErrorResumeNext;
//# sourceMappingURL=onErrorResumeNext.js.map

/***/ }),

/***/ 505:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.pairs = void 0;
var from_1 = __nccwpck_require__(8309);
function pairs(obj, scheduler) {
    return from_1.from(Object.entries(obj), scheduler);
}
exports.pairs = pairs;
//# sourceMappingURL=pairs.js.map

/***/ }),

/***/ 5506:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.partition = void 0;
var not_1 = __nccwpck_require__(4338);
var filter_1 = __nccwpck_require__(6894);
var from_1 = __nccwpck_require__(8309);
function partition(source, predicate, thisArg) {
    return [filter_1.filter(predicate, thisArg)(from_1.innerFrom(source)), filter_1.filter(not_1.not(predicate, thisArg))(from_1.innerFrom(source))];
}
exports.partition = partition;
//# sourceMappingURL=partition.js.map

/***/ }),

/***/ 6940:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.raceInit = exports.race = void 0;
var Observable_1 = __nccwpck_require__(3014);
var from_1 = __nccwpck_require__(8309);
var argsOrArgArray_1 = __nccwpck_require__(8824);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
function race() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    sources = argsOrArgArray_1.argsOrArgArray(sources);
    return sources.length === 1 ? from_1.innerFrom(sources[0]) : new Observable_1.Observable(raceInit(sources));
}
exports.race = race;
function raceInit(sources) {
    return function (subscriber) {
        var subscriptions = [];
        var _loop_1 = function (i) {
            subscriptions.push(from_1.innerFrom(sources[i]).subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
                if (subscriptions) {
                    for (var s = 0; s < subscriptions.length; s++) {
                        s !== i && subscriptions[s].unsubscribe();
                    }
                    subscriptions = null;
                }
                subscriber.next(value);
            })));
        };
        for (var i = 0; subscriptions && !subscriber.closed && i < sources.length; i++) {
            _loop_1(i);
        }
    };
}
exports.raceInit = raceInit;
//# sourceMappingURL=race.js.map

/***/ }),

/***/ 8538:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.range = void 0;
var Observable_1 = __nccwpck_require__(3014);
var empty_1 = __nccwpck_require__(437);
function range(start, count, scheduler) {
    if (count == null) {
        count = start;
        start = 0;
    }
    if (count <= 0) {
        return empty_1.EMPTY;
    }
    var end = count + start;
    return new Observable_1.Observable(scheduler
        ?
            function (subscriber) {
                var n = start;
                return scheduler.schedule(function () {
                    if (n < end) {
                        subscriber.next(n++);
                        this.schedule();
                    }
                    else {
                        subscriber.complete();
                    }
                });
            }
        :
            function (subscriber) {
                var n = start;
                while (n < end && !subscriber.closed) {
                    subscriber.next(n++);
                }
                subscriber.complete();
            });
}
exports.range = range;
//# sourceMappingURL=range.js.map

/***/ }),

/***/ 6381:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.throwError = void 0;
var Observable_1 = __nccwpck_require__(3014);
var isFunction_1 = __nccwpck_require__(7206);
function throwError(errorOrErrorFactory, scheduler) {
    var errorFactory = isFunction_1.isFunction(errorOrErrorFactory) ? errorOrErrorFactory : function () { return errorOrErrorFactory; };
    var init = function (subscriber) { return subscriber.error(errorFactory()); };
    return new Observable_1.Observable(scheduler ? function (subscriber) { return scheduler.schedule(init, 0, subscriber); } : init);
}
exports.throwError = throwError;
//# sourceMappingURL=throwError.js.map

/***/ }),

/***/ 9757:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.timer = void 0;
var Observable_1 = __nccwpck_require__(3014);
var async_1 = __nccwpck_require__(6072);
var isScheduler_1 = __nccwpck_require__(4078);
var isDate_1 = __nccwpck_require__(935);
function timer(dueTime, intervalOrScheduler, scheduler) {
    if (dueTime === void 0) { dueTime = 0; }
    if (scheduler === void 0) { scheduler = async_1.async; }
    var intervalDuration = -1;
    if (intervalOrScheduler != null) {
        if (isScheduler_1.isScheduler(intervalOrScheduler)) {
            scheduler = intervalOrScheduler;
        }
        else {
            intervalDuration = intervalOrScheduler;
        }
    }
    return new Observable_1.Observable(function (subscriber) {
        var due = isDate_1.isValidDate(dueTime) ? +dueTime - scheduler.now() : dueTime;
        if (due < 0) {
            due = 0;
        }
        var n = 0;
        return scheduler.schedule(function () {
            if (!subscriber.closed) {
                subscriber.next(n++);
                if (0 <= intervalDuration) {
                    this.schedule(undefined, intervalDuration);
                }
                else {
                    subscriber.complete();
                }
            }
        }, due);
    });
}
exports.timer = timer;
//# sourceMappingURL=timer.js.map

/***/ }),

/***/ 8445:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.using = void 0;
var Observable_1 = __nccwpck_require__(3014);
var from_1 = __nccwpck_require__(8309);
var empty_1 = __nccwpck_require__(437);
function using(resourceFactory, observableFactory) {
    return new Observable_1.Observable(function (subscriber) {
        var resource = resourceFactory();
        var result = observableFactory(resource);
        var source = result ? from_1.innerFrom(result) : empty_1.EMPTY;
        source.subscribe(subscriber);
        return function () {
            if (resource) {
                resource.unsubscribe();
            }
        };
    });
}
exports.using = using;
//# sourceMappingURL=using.js.map

/***/ }),

/***/ 2504:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.zip = void 0;
var Observable_1 = __nccwpck_require__(3014);
var from_1 = __nccwpck_require__(8309);
var argsOrArgArray_1 = __nccwpck_require__(8824);
var empty_1 = __nccwpck_require__(437);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
var args_1 = __nccwpck_require__(4890);
function zip() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var resultSelector = args_1.popResultSelector(args);
    var sources = argsOrArgArray_1.argsOrArgArray(args);
    return sources.length
        ? new Observable_1.Observable(function (subscriber) {
            var buffers = sources.map(function () { return []; });
            var completed = sources.map(function () { return false; });
            subscriber.add(function () {
                buffers = completed = null;
            });
            var _loop_1 = function (sourceIndex) {
                from_1.innerFrom(sources[sourceIndex]).subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
                    buffers[sourceIndex].push(value);
                    if (buffers.every(function (buffer) { return buffer.length; })) {
                        var result = buffers.map(function (buffer) { return buffer.shift(); });
                        subscriber.next(resultSelector ? resultSelector.apply(void 0, __spreadArray([], __read(result))) : result);
                        if (buffers.some(function (buffer, i) { return !buffer.length && completed[i]; })) {
                            subscriber.complete();
                        }
                    }
                }, function () {
                    completed[sourceIndex] = true;
                    !buffers[sourceIndex].length && subscriber.complete();
                }));
            };
            for (var sourceIndex = 0; !subscriber.closed && sourceIndex < sources.length; sourceIndex++) {
                _loop_1(sourceIndex);
            }
            return function () {
                buffers = completed = null;
            };
        })
        : empty_1.EMPTY;
}
exports.zip = zip;
//# sourceMappingURL=zip.js.map

/***/ }),

/***/ 9549:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OperatorSubscriber = void 0;
var Subscriber_1 = __nccwpck_require__(7121);
var OperatorSubscriber = (function (_super) {
    __extends(OperatorSubscriber, _super);
    function OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
        var _this = _super.call(this, destination) || this;
        _this.onFinalize = onFinalize;
        _this._next = onNext
            ? function (value) {
                try {
                    onNext(value);
                }
                catch (err) {
                    destination.error(err);
                }
            }
            : _super.prototype._next;
        _this._error = onError
            ? function (err) {
                try {
                    onError(err);
                }
                catch (err) {
                    destination.error(err);
                }
                finally {
                    this.unsubscribe();
                }
            }
            : _super.prototype._error;
        _this._complete = onComplete
            ? function () {
                try {
                    onComplete();
                }
                catch (err) {
                    destination.error(err);
                }
                finally {
                    this.unsubscribe();
                }
            }
            : _super.prototype._complete;
        return _this;
    }
    OperatorSubscriber.prototype.unsubscribe = function () {
        var _a;
        var closed = this.closed;
        _super.prototype.unsubscribe.call(this);
        !closed && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
    };
    return OperatorSubscriber;
}(Subscriber_1.Subscriber));
exports.OperatorSubscriber = OperatorSubscriber;
//# sourceMappingURL=OperatorSubscriber.js.map

/***/ }),

/***/ 2704:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.audit = void 0;
var lift_1 = __nccwpck_require__(8669);
var from_1 = __nccwpck_require__(8309);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
function audit(durationSelector) {
    return lift_1.operate(function (source, subscriber) {
        var hasValue = false;
        var lastValue = null;
        var durationSubscriber = null;
        var isComplete = false;
        var endDuration = function () {
            durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
            durationSubscriber = null;
            if (hasValue) {
                hasValue = false;
                var value = lastValue;
                lastValue = null;
                subscriber.next(value);
            }
            isComplete && subscriber.complete();
        };
        var cleanupDuration = function () {
            durationSubscriber = null;
            isComplete && subscriber.complete();
        };
        source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
            hasValue = true;
            lastValue = value;
            if (!durationSubscriber) {
                from_1.innerFrom(durationSelector(value)).subscribe((durationSubscriber = new OperatorSubscriber_1.OperatorSubscriber(subscriber, endDuration, cleanupDuration)));
            }
        }, function () {
            isComplete = true;
            (!hasValue || !durationSubscriber || durationSubscriber.closed) && subscriber.complete();
        }));
    });
}
exports.audit = audit;
//# sourceMappingURL=audit.js.map

/***/ }),

/***/ 8780:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.auditTime = void 0;
var async_1 = __nccwpck_require__(6072);
var audit_1 = __nccwpck_require__(2704);
var timer_1 = __nccwpck_require__(9757);
function auditTime(duration, scheduler) {
    if (scheduler === void 0) { scheduler = async_1.async; }
    return audit_1.audit(function () { return timer_1.timer(duration, scheduler); });
}
exports.auditTime = auditTime;
//# sourceMappingURL=auditTime.js.map

/***/ }),

/***/ 4253:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.buffer = void 0;
var lift_1 = __nccwpck_require__(8669);
var noop_1 = __nccwpck_require__(1642);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
function buffer(closingNotifier) {
    return lift_1.operate(function (source, subscriber) {
        var currentBuffer = [];
        source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) { return currentBuffer.push(value); }, function () {
            subscriber.next(currentBuffer);
            subscriber.complete();
        }));
        closingNotifier.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function () {
            var b = currentBuffer;
            currentBuffer = [];
            subscriber.next(b);
        }, noop_1.noop));
        return function () {
            currentBuffer = null;
        };
    });
}
exports.buffer = buffer;
//# sourceMappingURL=buffer.js.map

/***/ }),

/***/ 7253:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.bufferCount = void 0;
var lift_1 = __nccwpck_require__(8669);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
var arrRemove_1 = __nccwpck_require__(8499);
function bufferCount(bufferSize, startBufferEvery) {
    if (startBufferEvery === void 0) { startBufferEvery = null; }
    startBufferEvery = startBufferEvery !== null && startBufferEvery !== void 0 ? startBufferEvery : bufferSize;
    return lift_1.operate(function (source, subscriber) {
        var buffers = [];
        var count = 0;
        source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
            var e_1, _a, e_2, _b;
            var toEmit = null;
            if (count++ % startBufferEvery === 0) {
                buffers.push([]);
            }
            try {
                for (var buffers_1 = __values(buffers), buffers_1_1 = buffers_1.next(); !buffers_1_1.done; buffers_1_1 = buffers_1.next()) {
                    var buffer = buffers_1_1.value;
                    buffer.push(value);
                    if (bufferSize <= buffer.length) {
                        toEmit = toEmit !== null && toEmit !== void 0 ? toEmit : [];
                        toEmit.push(buffer);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (buffers_1_1 && !buffers_1_1.done && (_a = buffers_1.return)) _a.call(buffers_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (toEmit) {
                try {
                    for (var toEmit_1 = __values(toEmit), toEmit_1_1 = toEmit_1.next(); !toEmit_1_1.done; toEmit_1_1 = toEmit_1.next()) {
                        var buffer = toEmit_1_1.value;
                        arrRemove_1.arrRemove(buffers, buffer);
                        subscriber.next(buffer);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (toEmit_1_1 && !toEmit_1_1.done && (_b = toEmit_1.return)) _b.call(toEmit_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }, function () {
            var e_3, _a;
            try {
                for (var buffers_2 = __values(buffers), buffers_2_1 = buffers_2.next(); !buffers_2_1.done; buffers_2_1 = buffers_2.next()) {
                    var buffer = buffers_2_1.value;
                    subscriber.next(buffer);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (buffers_2_1 && !buffers_2_1.done && (_a = buffers_2.return)) _a.call(buffers_2);
                }
                finally { if (e_3) throw e_3.error; }
            }
            subscriber.complete();
        }, undefined, function () {
            buffers = null;
        }));
    });
}
exports.bufferCount = bufferCount;
//# sourceMappingURL=bufferCount.js.map

/***/ }),

/***/ 3102:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.bufferTime = void 0;
var Subscription_1 = __nccwpck_require__(9548);
var lift_1 = __nccwpck_require__(8669);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
var arrRemove_1 = __nccwpck_require__(8499);
var async_1 = __nccwpck_require__(6072);
var args_1 = __nccwpck_require__(4890);
function bufferTime(bufferTimeSpan) {
    var _a, _b;
    var otherArgs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        otherArgs[_i - 1] = arguments[_i];
    }
    var scheduler = (_a = args_1.popScheduler(otherArgs)) !== null && _a !== void 0 ? _a : async_1.asyncScheduler;
    var bufferCreationInterval = (_b = otherArgs[0]) !== null && _b !== void 0 ? _b : null;
    var maxBufferSize = otherArgs[1] || Infinity;
    return lift_1.operate(function (source, subscriber) {
        var bufferRecords = [];
        var restartOnEmit = false;
        var emit = function (record) {
            var buffer = record.buffer, subs = record.subs;
            subs.unsubscribe();
            arrRemove_1.arrRemove(bufferRecords, record);
            subscriber.next(buffer);
            restartOnEmit && startBuffer();
        };
        var startBuffer = function () {
            if (bufferRecords) {
                var subs = new Subscription_1.Subscription();
                subscriber.add(subs);
                var buffer = [];
                var record_1 = {
                    buffer: buffer,
                    subs: subs,
                };
                bufferRecords.push(record_1);
                subs.add(scheduler.schedule(function () { return emit(record_1); }, bufferTimeSpan));
            }
        };
        bufferCreationInterval !== null && bufferCreationInterval >= 0
            ?
                subscriber.add(scheduler.schedule(function () {
                    startBuffer();
                    !this.closed && subscriber.add(this.schedule(null, bufferCreationInterval));
                }, bufferCreationInterval))
            : (restartOnEmit = true);
        startBuffer();
        var bufferTimeSubscriber = new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
            var e_1, _a;
            var recordsCopy = bufferRecords.slice();
            try {
                for (var recordsCopy_1 = __values(recordsCopy), recordsCopy_1_1 = recordsCopy_1.next(); !recordsCopy_1_1.done; recordsCopy_1_1 = recordsCopy_1.next()) {
                    var record = recordsCopy_1_1.value;
                    var buffer = record.buffer;
                    buffer.push(value);
                    maxBufferSize <= buffer.length && emit(record);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (recordsCopy_1_1 && !recordsCopy_1_1.done && (_a = recordsCopy_1.return)) _a.call(recordsCopy_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }, function () {
            while (bufferRecords === null || bufferRecords === void 0 ? void 0 : bufferRecords.length) {
                subscriber.next(bufferRecords.shift().buffer);
            }
            bufferTimeSubscriber === null || bufferTimeSubscriber === void 0 ? void 0 : bufferTimeSubscriber.unsubscribe();
            subscriber.complete();
            subscriber.unsubscribe();
        }, undefined, function () { return (bufferRecords = null); });
        source.subscribe(bufferTimeSubscriber);
    });
}
exports.bufferTime = bufferTime;
//# sourceMappingURL=bufferTime.js.map

/***/ }),

/***/ 3781:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.bufferToggle = void 0;
var Subscription_1 = __nccwpck_require__(9548);
var lift_1 = __nccwpck_require__(8669);
var from_1 = __nccwpck_require__(8309);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
var noop_1 = __nccwpck_require__(1642);
var arrRemove_1 = __nccwpck_require__(8499);
function bufferToggle(openings, closingSelector) {
    return lift_1.operate(function (source, subscriber) {
        var buffers = [];
        from_1.innerFrom(openings).subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (openValue) {
            var buffer = [];
            buffers.push(buffer);
            var closingSubscription = new Subscription_1.Subscription();
            var emitBuffer = function () {
                arrRemove_1.arrRemove(buffers, buffer);
                subscriber.next(buffer);
                closingSubscription.unsubscribe();
            };
            closingSubscription.add(from_1.innerFrom(closingSelector(openValue)).subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, emitBuffer, noop_1.noop)));
        }, noop_1.noop));
        source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
            var e_1, _a;
            try {
                for (var buffers_1 = __values(buffers), buffers_1_1 = buffers_1.next(); !buffers_1_1.done; buffers_1_1 = buffers_1.next()) {
                    var buffer = buffers_1_1.value;
                    buffer.push(value);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (buffers_1_1 && !buffers_1_1.done && (_a = buffers_1.return)) _a.call(buffers_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }, function () {
            while (buffers.length > 0) {
                subscriber.next(buffers.shift());
            }
            subscriber.complete();
        }));
    });
}
exports.bufferToggle = bufferToggle;
//# sourceMappingURL=bufferToggle.js.map

/***/ }),

/***/ 2855:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.bufferWhen = void 0;
var lift_1 = __nccwpck_require__(8669);
var noop_1 = __nccwpck_require__(1642);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
var from_1 = __nccwpck_require__(8309);
function bufferWhen(closingSelector) {
    return lift_1.operate(function (source, subscriber) {
        var buffer = null;
        var closingSubscriber = null;
        var openBuffer = function () {
            closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
            var b = buffer;
            buffer = [];
            b && subscriber.next(b);
            from_1.innerFrom(closingSelector()).subscribe((closingSubscriber = new OperatorSubscriber_1.OperatorSubscriber(subscriber, openBuffer, noop_1.noop)));
        };
        openBuffer();
        source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) { return buffer === null || buffer === void 0 ? void 0 : buffer.push(value); }, function () {
            buffer && subscriber.next(buffer);
            subscriber.complete();
        }, undefined, function () { return (buffer = closingSubscriber = null); }));
    });
}
exports.bufferWhen = bufferWhen;
//# sourceMappingURL=bufferWhen.js.map

/***/ }),

/***/ 7765:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.catchError = void 0;
var from_1 = __nccwpck_require__(8309);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
var lift_1 = __nccwpck_require__(8669);
function catchError(selector) {
    return lift_1.operate(function (source, subscriber) {
        var innerSub = null;
        var syncUnsub = false;
        var handledResult;
        innerSub = source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, undefined, undefined, function (err) {
            handledResult = from_1.innerFrom(selector(err, catchError(selector)(source)));
            if (innerSub) {
                innerSub.unsubscribe();
                innerSub = null;
                handledResult.subscribe(subscriber);
            }
            else {
                syncUnsub = true;
            }
        }));
        if (syncUnsub) {
            innerSub.unsubscribe();
            innerSub = null;
            handledResult.subscribe(subscriber);
        }
    });
}
exports.catchError = catchError;
//# sourceMappingURL=catchError.js.map

/***/ }),

/***/ 8817:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.combineAll = void 0;
var combineLatestAll_1 = __nccwpck_require__(1063);
exports.combineAll = combineLatestAll_1.combineLatestAll;
//# sourceMappingURL=combineAll.js.map

/***/ }),

/***/ 6008:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.combineLatest = void 0;
var combineLatest_1 = __nccwpck_require__(6843);
var lift_1 = __nccwpck_require__(8669);
var argsOrArgArray_1 = __nccwpck_require__(8824);
var mapOneOrManyArgs_1 = __nccwpck_require__(8934);
var pipe_1 = __nccwpck_require__(9587);
var args_1 = __nccwpck_require__(4890);
function combineLatest() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var resultSelector = args_1.popResultSelector(args);
    return resultSelector
        ? pipe_1.pipe(combineLatest.apply(void 0, __spreadArray([], __read(args))), mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector))
        : lift_1.operate(function (source, subscriber) {
            combineLatest_1.combineLatestInit(__spreadArray([source], __read(argsOrArgArray_1.argsOrArgArray(args))))(subscriber);
        });
}
exports.combineLatest = combineLatest;
//# sourceMappingURL=combineLatest.js.map

/***/ }),

/***/ 1063:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.combineLatestAll = void 0;
var combineLatest_1 = __nccwpck_require__(6843);
var joinAllInternals_1 = __nccwpck_require__(9341);
function combineLatestAll(project) {
    return joinAllInternals_1.joinAllInternals(combineLatest_1.combineLatest, project);
}
exports.combineLatestAll = combineLatestAll;
//# sourceMappingURL=combineLatestAll.js.map

/***/ }),

/***/ 9044:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.combineLatestWith = void 0;
var combineLatest_1 = __nccwpck_require__(6008);
function combineLatestWith() {
    var otherSources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        otherSources[_i] = arguments[_i];
    }
    return combineLatest_1.combineLatest.apply(void 0, __spreadArray([], __read(otherSources)));
}
exports.combineLatestWith = combineLatestWith;
//# sourceMappingURL=combineLatestWith.js.map

/***/ }),

/***/ 8500:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.concat = void 0;
var lift_1 = __nccwpck_require__(8669);
var concatAll_1 = __nccwpck_require__(8049);
var fromArray_1 = __nccwpck_require__(8960);
var args_1 = __nccwpck_require__(4890);
function concat() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = args_1.popScheduler(args);
    return lift_1.operate(function (source, subscriber) {
        concatAll_1.concatAll()(fromArray_1.internalFromArray(__spreadArray([source], __read(args)), scheduler)).subscribe(subscriber);
    });
}
exports.concat = concat;
//# sourceMappingURL=concat.js.map

/***/ }),

/***/ 8049:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.concatAll = void 0;
var mergeAll_1 = __nccwpck_require__(2057);
function concatAll() {
    return mergeAll_1.mergeAll(1);
}
exports.concatAll = concatAll;
//# sourceMappingURL=concatAll.js.map

/***/ }),

/***/ 9130:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.concatMap = void 0;
var mergeMap_1 = __nccwpck_require__(9914);
var isFunction_1 = __nccwpck_require__(7206);
function concatMap(project, resultSelector) {
    return isFunction_1.isFunction(resultSelector) ? mergeMap_1.mergeMap(project, resultSelector, 1) : mergeMap_1.mergeMap(project, 1);
}
exports.concatMap = concatMap;
//# sourceMappingURL=concatMap.js.map

/***/ }),

/***/ 1596:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.concatMapTo = void 0;
var concatMap_1 = __nccwpck_require__(9130);
var isFunction_1 = __nccwpck_require__(7206);
function concatMapTo(innerObservable, resultSelector) {
    return isFunction_1.isFunction(resultSelector) ? concatMap_1.concatMap(function () { return innerObservable; }, resultSelector) : concatMap_1.concatMap(function () { return innerObservable; });
}
exports.concatMapTo = concatMapTo;
//# sourceMappingURL=concatMapTo.js.map

/***/ }),

/***/ 7998:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.concatWith = void 0;
var concat_1 = __nccwpck_require__(8500);
function concatWith() {
    var otherSources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        otherSources[_i] = arguments[_i];
    }
    return concat_1.concat.apply(void 0, __spreadArray([], __read(otherSources)));
}
exports.concatWith = concatWith;
//# sourceMappingURL=concatWith.js.map

/***/ }),

/***/ 1101:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.connect = void 0;
var Subject_1 = __nccwpck_require__(9944);
var from_1 = __nccwpck_require__(8309);
var lift_1 = __nccwpck_require__(8669);
var fromSubscribable_1 = __nccwpck_require__(6513);
var DEFAULT_CONFIG = {
    connector: function () { return new Subject_1.Subject(); },
};
function connect(selector, config) {
    if (config === void 0) { config = DEFAULT_CONFIG; }
    var connector = config.connector;
    return lift_1.operate(function (source, subscriber) {
        var subject = connector();
        from_1.from(selector(fromSubscribable_1.fromSubscribable(subject))).subscribe(subscriber);
        subscriber.add(source.subscribe(subject));
    });
}
exports.connect = connect;
//# sourceMappingURL=connect.js.map

/***/ }),

/***/ 6571:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.count = void 0;
var reduce_1 = __nccwpck_require__(2627);
function count(predicate) {
    return reduce_1.reduce(function (total, value, i) { return (!predicate || predicate(value, i) ? total + 1 : total); }, 0);
}
exports.count = count;
//# sourceMappingURL=count.js.map

/***/ }),

/***/ 9348:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.debounce = void 0;
var lift_1 = __nccwpck_require__(8669);
var noop_1 = __nccwpck_require__(1642);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
var from_1 = __nccwpck_require__(8309);
function debounce(durationSelector) {
    return lift_1.operate(function (source, subscriber) {
        var hasValue = false;
        var lastValue = null;
        var durationSubscriber = null;
        var emit = function () {
            durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
            durationSubscriber = null;
            if (hasValue) {
                hasValue = false;
                var value = lastValue;
                lastValue = null;
                subscriber.next(value);
            }
        };
        source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
            durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
            hasValue = true;
            lastValue = value;
            durationSubscriber = new OperatorSubscriber_1.OperatorSubscriber(subscriber, emit, noop_1.noop);
            from_1.innerFrom(durationSelector(value)).subscribe(durationSubscriber);
        }, function () {
            emit();
            subscriber.complete();
        }, undefined, function () {
            lastValue = durationSubscriber = null;
        }));
    });
}
exports.debounce = debounce;
//# sourceMappingURL=debounce.js.map

/***/ }),

/***/ 2379:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.debounceTime = void 0;
var async_1 = __nccwpck_require__(6072);
var lift_1 = __nccwpck_require__(8669);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
function debounceTime(dueTime, scheduler) {
    if (scheduler === void 0) { scheduler = async_1.asyncScheduler; }
    return lift_1.operate(function (source, subscriber) {
        var activeTask = null;
        var lastValue = null;
        var lastTime = null;
        var emit = function () {
            if (activeTask) {
                activeTask.unsubscribe();
                activeTask = null;
                var value = lastValue;
                lastValue = null;
                subscriber.next(value);
            }
        };
        function emitWhenIdle() {
            var targetTime = lastTime + dueTime;
            var now = scheduler.now();
            if (now < targetTime) {
                activeTask = this.schedule(undefined, targetTime - now);
                subscriber.add(activeTask);
                return;
            }
            emit();
        }
        source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
            lastValue = value;
            lastTime = scheduler.now();
            if (!activeTask) {
                activeTask = scheduler.schedule(emitWhenIdle, dueTime);
                subscriber.add(activeTask);
            }
        }, function () {
            emit();
            subscriber.complete();
        }, undefined, function () {
            lastValue = activeTask = null;
        }));
    });
}
exports.debounceTime = debounceTime;
//# sourceMappingURL=debounceTime.js.map

/***/ }),

/***/ 621:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultIfEmpty = void 0;
var lift_1 = __nccwpck_require__(8669);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
function defaultIfEmpty(defaultValue) {
    return lift_1.operate(function (source, subscriber) {
        var hasValue = false;
        source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
            hasValue = true;
            subscriber.next(value);
        }, function () {
            if (!hasValue) {
                subscriber.next(defaultValue);
            }
            subscriber.complete();
        }));
    });
}
exports.defaultIfEmpty = defaultIfEmpty;
//# sourceMappingURL=defaultIfEmpty.js.map

/***/ }),

/***/ 9818:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.delay = void 0;
var async_1 = __nccwpck_require__(6072);
var delayWhen_1 = __nccwpck_require__(6994);
var timer_1 = __nccwpck_require__(9757);
function delay(due, scheduler) {
    if (scheduler === void 0) { scheduler = async_1.asyncScheduler; }
    var duration = timer_1.timer(due, scheduler);
    return delayWhen_1.delayWhen(function () { return duration; });
}
exports.delay = delay;
//# sourceMappingURL=delay.js.map

/***/ }),

/***/ 6994:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.delayWhen = void 0;
var concat_1 = __nccwpck_require__(4675);
var take_1 = __nccwpck_require__(3698);
var ignoreElements_1 = __nccwpck_require__(1062);
var mapTo_1 = __nccwpck_require__(2300);
var mergeMap_1 = __nccwpck_require__(9914);
function delayWhen(delayDurationSelector, subscriptionDelay) {
    if (subscriptionDelay) {
        return function (source) {
            return concat_1.concat(subscriptionDelay.pipe(take_1.take(1), ignoreElements_1.ignoreElements()), source.pipe(delayWhen(delayDurationSelector)));
        };
    }
    return mergeMap_1.mergeMap(function (value, index) { return delayDurationSelector(value, index).pipe(take_1.take(1), mapTo_1.mapTo(value)); });
}
exports.delayWhen = delayWhen;
//# sourceMappingURL=delayWhen.js.map

/***/ }),

/***/ 5338:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.dematerialize = void 0;
var Notification_1 = __nccwpck_require__(2241);
var lift_1 = __nccwpck_require__(8669);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
function dematerialize() {
    return lift_1.operate(function (source, subscriber) {
        source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (notification) { return Notification_1.observeNotification(notification, subscriber); }));
    });
}
exports.dematerialize = dematerialize;
//# sourceMappingURL=dematerialize.js.map

/***/ }),

/***/ 2594:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.distinct = void 0;
var lift_1 = __nccwpck_require__(8669);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
var noop_1 = __nccwpck_require__(1642);
function distinct(keySelector, flushes) {
    return lift_1.operate(function (source, subscriber) {
        var distinctKeys = new Set();
        source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
            var key = keySelector ? keySelector(value) : value;
            if (!distinctKeys.has(key)) {
                distinctKeys.add(key);
                subscriber.next(value);
            }
        }));
        flushes === null || flushes === void 0 ? void 0 : flushes.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function () { return distinctKeys.clear(); }, noop_1.noop));
    });
}
exports.distinct = distinct;
//# sourceMappingURL=distinct.js.map

/***/ }),

/***/ 632:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.distinctUntilChanged = void 0;
var identity_1 = __nccwpck_require__(283);
var lift_1 = __nccwpck_require__(8669);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
function distinctUntilChanged(comparator, keySelector) {
    if (keySelector === void 0) { keySelector = identity_1.identity; }
    comparator = comparator !== null && comparator !== void 0 ? comparator : defaultCompare;
    return lift_1.operate(function (source, subscriber) {
        var previousKey;
        var first = true;
        source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
            var currentKey = keySelector(value);
            if (first || !comparator(previousKey, currentKey)) {
                first = false;
                previousKey = currentKey;
                subscriber.next(value);
            }
        }));
    });
}
exports.distinctUntilChanged = distinctUntilChanged;
function defaultCompare(a, b) {
    return a === b;
}
//# sourceMappingURL=distinctUntilChanged.js.map

/***/ }),

/***/ 8935:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.distinctUntilKeyChanged = void 0;
var distinctUntilChanged_1 = __nccwpck_require__(632);
function distinctUntilKeyChanged(key, compare) {
    return distinctUntilChanged_1.distinctUntilChanged(function (x, y) { return compare ? compare(x[key], y[key]) : x[key] === y[key]; });
}
exports.distinctUntilKeyChanged = distinctUntilKeyChanged;
//# sourceMappingURL=distinctUntilKeyChanged.js.map

/***/ }),

/***/ 3381:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.elementAt = void 0;
var ArgumentOutOfRangeError_1 = __nccwpck_require__(9796);
var filter_1 = __nccwpck_require__(6894);
var throwIfEmpty_1 = __nccwpck_require__(1566);
var defaultIfEmpty_1 = __nccwpck_require__(621);
var take_1 = __nccwpck_require__(3698);
function elementAt(index, defaultValue) {
    if (index < 0) {
        throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError();
    }
    var hasDefaultValue = arguments.length >= 2;
    return function (source) {
        return source.pipe(filter_1.filter(function (v, i) { return i === index; }), take_1.take(1), hasDefaultValue ? defaultIfEmpty_1.defaultIfEmpty(defaultValue) : throwIfEmpty_1.throwIfEmpty(function () { return new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError(); }));
    };
}
exports.elementAt = elementAt;
//# sourceMappingURL=elementAt.js.map

/***/ }),

/***/ 2961:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.endWith = void 0;
var concat_1 = __nccwpck_require__(4675);
var of_1 = __nccwpck_require__(2163);
function endWith() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return function (source) { return concat_1.concat(source, of_1.of.apply(void 0, __spreadArray([], __read(values)))); };
}
exports.endWith = endWith;
//# sourceMappingURL=endWith.js.map

/***/ }),

/***/ 9559:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.every = void 0;
var lift_1 = __nccwpck_require__(8669);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
function every(predicate, thisArg) {
    return lift_1.operate(function (source, subscriber) {
        var index = 0;
        source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
            if (!predicate.call(thisArg, value, index++, source)) {
                subscriber.next(false);
                subscriber.complete();
            }
        }, function () {
            subscriber.next(true);
            subscriber.complete();
        }));
    });
}
exports.every = every;
//# sourceMappingURL=every.js.map

/***/ }),

/***/ 5686:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exhaust = void 0;
var exhaustAll_1 = __nccwpck_require__(9777);
exports.exhaust = exhaustAll_1.exhaustAll;
//# sourceMappingURL=exhaust.js.map

/***/ }),

/***/ 9777:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exhaustAll = void 0;
var lift_1 = __nccwpck_require__(8669);
var from_1 = __nccwpck_require__(8309);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
function exhaustAll() {
    return lift_1.operate(function (source, subscriber) {
        var isComplete = false;
        var innerSub = null;
        source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (inner) {
            if (!innerSub) {
                innerSub = from_1.innerFrom(inner).subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, undefined, function () {
                    innerSub = null;
                    isComplete && subscriber.complete();
                }));
            }
        }, function () {
            isComplete = true;
            !innerSub && subscriber.complete();
        }));
    });
}
exports.exhaustAll = exhaustAll;
//# sourceMappingURL=exhaustAll.js.map

/***/ }),

/***/ 1527:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exhaustMap = void 0;
var map_1 = __nccwpck_require__(5987);
var from_1 = __nccwpck_require__(8309);
var lift_1 = __nccwpck_require__(8669);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
function exhaustMap(project, resultSelector) {
    if (resultSelector) {
        return function (source) {
            return source.pipe(exhaustMap(function (a, i) { return from_1.innerFrom(project(a, i)).pipe(map_1.map(function (b, ii) { return resultSelector(a, b, i, ii); })); }));
        };
    }
    return lift_1.operate(function (source, subscriber) {
        var index = 0;
        var innerSub = null;
        var isComplete = false;
        source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (outerValue) {
            if (!innerSub) {
                innerSub = new OperatorSubscriber_1.OperatorSubscriber(subscriber, undefined, function () {
                    innerSub = null;
                    isComplete && subscriber.complete();
                });
                from_1.innerFrom(project(outerValue, index++)).subscribe(innerSub);
            }
        }, function () {
            isComplete = true;
            !innerSub && subscriber.complete();
        }));
    });
}
exports.exhaustMap = exhaustMap;
//# sourceMappingURL=exhaustMap.js.map

/***/ }),

/***/ 1585:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.expand = void 0;
var lift_1 = __nccwpck_require__(8669);
var mergeInternals_1 = __nccwpck_require__(8246);
function expand(project, concurrent, scheduler) {
    if (concurrent === void 0) { concurrent = Infinity; }
    concurrent = (concurrent || 0) < 1 ? Infinity : concurrent;
    return lift_1.operate(function (source, subscriber) {
        return mergeInternals_1.mergeInternals(source, subscriber, project, concurrent, undefined, true, scheduler);
    });
}
exports.expand = expand;
//# sourceMappingURL=expand.js.map

/***/ }),

/***/ 6894:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.filter = void 0;
var lift_1 = __nccwpck_require__(8669);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
function filter(predicate, thisArg) {
    return lift_1.operate(function (source, subscriber) {
        var index = 0;
        source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) { return predicate.call(thisArg, value, index++) && subscriber.next(value); }));
    });
}
exports.filter = filter;
//# sourceMappingURL=filter.js.map

/***/ }),

/***/ 4013:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.finalize = void 0;
var lift_1 = __nccwpck_require__(8669);
function finalize(callback) {
    return lift_1.operate(function (source, subscriber) {
        try {
            source.subscribe(subscriber);
        }
        finally {
            subscriber.add(callback);
        }
    });
}
exports.finalize = finalize;
//# sourceMappingURL=finalize.js.map

/***/ }),

/***/ 8981:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createFind = exports.find = void 0;
var lift_1 = __nccwpck_require__(8669);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
function find(predicate, thisArg) {
    return lift_1.operate(createFind(predicate, thisArg, 'value'));
}
exports.find = find;
function createFind(predicate, thisArg, emit) {
    var findIndex = emit === 'index';
    return function (source, subscriber) {
        var index = 0;
        source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
            var i = index++;
            if (predicate.call(thisArg, value, i, source)) {
                subscriber.next(findIndex ? i : value);
                subscriber.complete();
            }
        }, function () {
            subscriber.next(findIndex ? -1 : undefined);
            subscriber.complete();
        }));
    };
}
exports.createFind = createFind;
//# sourceMappingURL=find.js.map

/***/ }),

/***/ 2602:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.findIndex = void 0;
var lift_1 = __nccwpck_require__(8669);
var find_1 = __nccwpck_require__(8981);
function findIndex(predicate, thisArg) {
    return lift_1.operate(find_1.createFind(predicate, thisArg, 'index'));
}
exports.findIndex = findIndex;
//# sourceMappingURL=findIndex.js.map

/***/ }),

/***/ 3345:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.first = void 0;
var EmptyError_1 = __nccwpck_require__(9391);
var filter_1 = __nccwpck_require__(6894);
var take_1 = __nccwpck_require__(3698);
var defaultIfEmpty_1 = __nccwpck_require__(621);
var throwIfEmpty_1 = __nccwpck_require__(1566);
var identity_1 = __nccwpck_require__(283);
function first(predicate, defaultValue) {
    var hasDefaultValue = arguments.length >= 2;
    return function (source) {
        return source.pipe(predicate ? filter_1.filter(function (v, i) { return predicate(v, i, source); }) : identity_1.identity, take_1.take(1), hasDefaultValue ? defaultIfEmpty_1.defaultIfEmpty(defaultValue) : throwIfEmpty_1.throwIfEmpty(function () { return new EmptyError_1.EmptyError(); }));
    };
}
exports.first = first;
//# sourceMappingURL=first.js.map

/***/ }),

/***/ 186:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.flatMap = void 0;
var mergeMap_1 = __nccwpck_require__(9914);
exports.flatMap = mergeMap_1.mergeMap;
//# sourceMappingURL=flatMap.js.map

/***/ }),

/***/ 1650:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.groupBy = void 0;
var Observable_1 = __nccwpck_require__(3014);
var from_1 = __nccwpck_require__(8309);
var Subject_1 = __nccwpck_require__(9944);
var lift_1 = __nccwpck_require__(8669);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
function groupBy(keySelector, elementOrOptions, duration, connector) {
    return lift_1.operate(function (source, subscriber) {
        var element;
        if (!elementOrOptions || typeof elementOrOptions === 'function') {
            element = elementOrOptions;
        }
        else {
            (duration = elementOrOptions.duration, element = elementOrOptions.element, connector = elementOrOptions.connector);
        }
        var groups = new Map();
        var notify = function (cb) {
            groups.forEach(cb);
            cb(subscriber);
        };
        var handleError = function (err) { return notify(function (consumer) { return consumer.error(err); }); };
        var groupBySourceSubscriber = new GroupBySubscriber(subscriber, function (value) {
            try {
                var key_1 = keySelector(value);
                var group_1 = groups.get(key_1);
                if (!group_1) {
                    groups.set(key_1, (group_1 = connector ? connector() : new Subject_1.Subject()));
                    var grouped = createGroupedObservable(key_1, group_1);
                    subscriber.next(grouped);
                    if (duration) {
                        var durationSubscriber_1 = new OperatorSubscriber_1.OperatorSubscriber(group_1, function () {
                            group_1.complete();
                            durationSubscriber_1 === null || durationSubscriber_1 === void 0 ? void 0 : durationSubscriber_1.unsubscribe();
                        }, undefined, undefined, function () { return groups.delete(key_1); });
                        groupBySourceSubscriber.add(from_1.innerFrom(duration(grouped)).subscribe(durationSubscriber_1));
                    }
                }
                group_1.next(element ? element(value) : value);
            }
            catch (err) {
                handleError(err);
            }
        }, function () { return notify(function (consumer) { return consumer.complete(); }); }, handleError, function () { return groups.clear(); });
        source.subscribe(groupBySourceSubscriber);
        function createGroupedObservable(key, groupSubject) {
            var result = new Observable_1.Observable(function (groupSubscriber) {
                groupBySourceSubscriber.activeGroups++;
                var innerSub = groupSubject.subscribe(groupSubscriber);
                return function () {
                    innerSub.unsubscribe();
                    --groupBySourceSubscriber.activeGroups === 0 &&
                        groupBySourceSubscriber.teardownAttempted &&
                        groupBySourceSubscriber.unsubscribe();
                };
            });
            result.key = key;
            return result;
        }
    });
}
exports.groupBy = groupBy;
var GroupBySubscriber = (function (_super) {
    __extends(GroupBySubscriber, _super);
    function GroupBySubscriber() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.activeGroups = 0;
        _this.teardownAttempted = false;
        return _this;
    }
    GroupBySubscriber.prototype.unsubscribe = function () {
        this.teardownAttempted = true;
        this.activeGroups === 0 && _super.prototype.unsubscribe.call(this);
    };
    return GroupBySubscriber;
}(OperatorSubscriber_1.OperatorSubscriber));
//# sourceMappingURL=groupBy.js.map

/***/ }),

/***/ 1062:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ignoreElements = void 0;
var lift_1 = __nccwpck_require__(8669);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
var noop_1 = __nccwpck_require__(1642);
function ignoreElements() {
    return lift_1.operate(function (source, subscriber) {
        source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, noop_1.noop));
    });
}
exports.ignoreElements = ignoreElements;
//# sourceMappingURL=ignoreElements.js.map

/***/ }),

/***/ 7722:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isEmpty = void 0;
var lift_1 = __nccwpck_require__(8669);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
function isEmpty() {
    return lift_1.operate(function (source, subscriber) {
        source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function () {
            subscriber.next(false);
            subscriber.complete();
        }, function () {
            subscriber.next(true);
            subscriber.complete();
        }));
    });
}
exports.isEmpty = isEmpty;
//# sourceMappingURL=isEmpty.js.map

/***/ }),

/***/ 9341:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.joinAllInternals = void 0;
var identity_1 = __nccwpck_require__(283);
var mapOneOrManyArgs_1 = __nccwpck_require__(8934);
var pipe_1 = __nccwpck_require__(9587);
var mergeMap_1 = __nccwpck_require__(9914);
var toArray_1 = __nccwpck_require__(5114);
function joinAllInternals(joinFn, project) {
    return pipe_1.pipe(toArray_1.toArray(), mergeMap_1.mergeMap(function (sources) { return joinFn(sources); }), project ? mapOneOrManyArgs_1.mapOneOrManyArgs(project) : identity_1.identity);
}
exports.joinAllInternals = joinAllInternals;
//# sourceMappingURL=joinAllInternals.js.map

/***/ }),

/***/ 6831:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.last = void 0;
var EmptyError_1 = __nccwpck_require__(9391);
var filter_1 = __nccwpck_require__(6894);
var takeLast_1 = __nccwpck_require__(5041);
var throwIfEmpty_1 = __nccwpck_require__(1566);
var defaultIfEmpty_1 = __nccwpck_require__(621);
var identity_1 = __nccwpck_require__(283);
function last(predicate, defaultValue) {
    var hasDefaultValue = arguments.length >= 2;
    return function (source) {
        return source.pipe(predicate ? filter_1.filter(function (v, i) { return predicate(v, i, source); }) : identity_1.identity, takeLast_1.takeLast(1), hasDefaultValue ? defaultIfEmpty_1.defaultIfEmpty(defaultValue) : throwIfEmpty_1.throwIfEmpty(function () { return new EmptyError_1.EmptyError(); }));
    };
}
exports.last = last;
//# sourceMappingURL=last.js.map

/***/ }),

/***/ 5987:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.map = void 0;
var lift_1 = __nccwpck_require__(8669);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
function map(project, thisArg) {
    return lift_1.operate(function (source, subscriber) {
        var index = 0;
        source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
            subscriber.next(project.call(thisArg, value, index++));
        }));
    });
}
exports.map = map;
//# sourceMappingURL=map.js.map

/***/ }),

/***/ 2300:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mapTo = void 0;
var map_1 = __nccwpck_require__(5987);
function mapTo(value) {
    return map_1.map(function () { return value; });
}
exports.mapTo = mapTo;
//# sourceMappingURL=mapTo.js.map

/***/ }),

/***/ 7108:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.materialize = void 0;
var Notification_1 = __nccwpck_require__(2241);
var lift_1 = __nccwpck_require__(8669);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
function materialize() {
    return lift_1.operate(function (source, subscriber) {
        source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
            subscriber.next(Notification_1.Notification.createNext(value));
        }, function () {
            subscriber.next(Notification_1.Notification.createComplete());
            subscriber.complete();
        }, function (err) {
            subscriber.next(Notification_1.Notification.createError(err));
            subscriber.complete();
        }));
    });
}
exports.materialize = materialize;
//# sourceMappingURL=materialize.js.map

/***/ }),

/***/ 7314:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.max = void 0;
var reduce_1 = __nccwpck_require__(2627);
var isFunction_1 = __nccwpck_require__(7206);
function max(comparer) {
    return reduce_1.reduce(isFunction_1.isFunction(comparer) ? function (x, y) { return (comparer(x, y) > 0 ? x : y); } : function (x, y) { return (x > y ? x : y); });
}
exports.max = max;
//# sourceMappingURL=max.js.map

/***/ }),

/***/ 9510:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.merge = void 0;
var lift_1 = __nccwpck_require__(8669);
var argsOrArgArray_1 = __nccwpck_require__(8824);
var fromArray_1 = __nccwpck_require__(8960);
var mergeAll_1 = __nccwpck_require__(2057);
var args_1 = __nccwpck_require__(4890);
function merge() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = args_1.popScheduler(args);
    var concurrent = args_1.popNumber(args, Infinity);
    args = argsOrArgArray_1.argsOrArgArray(args);
    return lift_1.operate(function (source, subscriber) {
        mergeAll_1.mergeAll(concurrent)(fromArray_1.internalFromArray(__spreadArray([source], __read(args)), scheduler)).subscribe(subscriber);
    });
}
exports.merge = merge;
//# sourceMappingURL=merge.js.map

/***/ }),

/***/ 2057:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mergeAll = void 0;
var mergeMap_1 = __nccwpck_require__(9914);
var identity_1 = __nccwpck_require__(283);
function mergeAll(concurrent) {
    if (concurrent === void 0) { concurrent = Infinity; }
    return mergeMap_1.mergeMap(identity_1.identity, concurrent);
}
exports.mergeAll = mergeAll;
//# sourceMappingURL=mergeAll.js.map

/***/ }),

/***/ 8246:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mergeInternals = void 0;
var from_1 = __nccwpck_require__(8309);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
function mergeInternals(source, subscriber, project, concurrent, onBeforeNext, expand, innerSubScheduler, additionalTeardown) {
    var buffer = [];
    var active = 0;
    var index = 0;
    var isComplete = false;
    var checkComplete = function () {
        if (isComplete && !buffer.length && !active) {
            subscriber.complete();
        }
    };
    var outerNext = function (value) { return (active < concurrent ? doInnerSub(value) : buffer.push(value)); };
    var doInnerSub = function (value) {
        expand && subscriber.next(value);
        active++;
        var innerComplete = false;
        from_1.innerFrom(project(value, index++)).subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (innerValue) {
            onBeforeNext === null || onBeforeNext === void 0 ? void 0 : onBeforeNext(innerValue);
            if (expand) {
                outerNext(innerValue);
            }
            else {
                subscriber.next(innerValue);
            }
        }, function () {
            innerComplete = true;
        }, undefined, function () {
            if (innerComplete) {
                try {
                    active--;
                    var _loop_1 = function () {
                        var bufferedValue = buffer.shift();
                        innerSubScheduler ? subscriber.add(innerSubScheduler.schedule(function () { return doInnerSub(bufferedValue); })) : doInnerSub(bufferedValue);
                    };
                    while (buffer.length && active < concurrent) {
                        _loop_1();
                    }
                    checkComplete();
                }
                catch (err) {
                    subscriber.error(err);
                }
            }
        }));
    };
    source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, outerNext, function () {
        isComplete = true;
        checkComplete();
    }));
    return function () {
        additionalTeardown === null || additionalTeardown === void 0 ? void 0 : additionalTeardown();
    };
}
exports.mergeInternals = mergeInternals;
//# sourceMappingURL=mergeInternals.js.map

/***/ }),

/***/ 9914:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mergeMap = void 0;
var map_1 = __nccwpck_require__(5987);
var from_1 = __nccwpck_require__(8309);
var lift_1 = __nccwpck_require__(8669);
var mergeInternals_1 = __nccwpck_require__(8246);
var isFunction_1 = __nccwpck_require__(7206);
function mergeMap(project, resultSelector, concurrent) {
    if (concurrent === void 0) { concurrent = Infinity; }
    if (isFunction_1.isFunction(resultSelector)) {
        return mergeMap(function (a, i) { return map_1.map(function (b, ii) { return resultSelector(a, b, i, ii); })(from_1.innerFrom(project(a, i))); }, concurrent);
    }
    else if (typeof resultSelector === 'number') {
        concurrent = resultSelector;
    }
    return lift_1.operate(function (source, subscriber) { return mergeInternals_1.mergeInternals(source, subscriber, project, concurrent); });
}
exports.mergeMap = mergeMap;
//# sourceMappingURL=mergeMap.js.map

/***/ }),

/***/ 9151:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mergeMapTo = void 0;
var mergeMap_1 = __nccwpck_require__(9914);
var isFunction_1 = __nccwpck_require__(7206);
function mergeMapTo(innerObservable, resultSelector, concurrent) {
    if (concurrent === void 0) { concurrent = Infinity; }
    if (isFunction_1.isFunction(resultSelector)) {
        return mergeMap_1.mergeMap(function () { return innerObservable; }, resultSelector, concurrent);
    }
    if (typeof resultSelector === 'number') {
        concurrent = resultSelector;
    }
    return mergeMap_1.mergeMap(function () { return innerObservable; }, concurrent);
}
exports.mergeMapTo = mergeMapTo;
//# sourceMappingURL=mergeMapTo.js.map

/***/ }),

/***/ 1519:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mergeScan = void 0;
var lift_1 = __nccwpck_require__(8669);
var mergeInternals_1 = __nccwpck_require__(8246);
function mergeScan(accumulator, seed, concurrent) {
    if (concurrent === void 0) { concurrent = Infinity; }
    return lift_1.operate(function (source, subscriber) {
        var state = seed;
        return mergeInternals_1.mergeInternals(source, subscriber, function (value, index) { return accumulator(state, value, index); }, concurrent, function (value) {
            state = value;
        }, false, undefined, function () { return (state = null); });
    });
}
exports.mergeScan = mergeScan;
//# sourceMappingURL=mergeScan.js.map

/***/ }),

/***/ 1564:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mergeWith = void 0;
var merge_1 = __nccwpck_require__(9510);
function mergeWith() {
    var otherSources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        otherSources[_i] = arguments[_i];
    }
    return merge_1.merge.apply(void 0, __spreadArray([], __read(otherSources)));
}
exports.mergeWith = mergeWith;
//# sourceMappingURL=mergeWith.js.map

/***/ }),

/***/ 7641:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.min = void 0;
var reduce_1 = __nccwpck_require__(2627);
var isFunction_1 = __nccwpck_require__(7206);
function min(comparer) {
    return reduce_1.reduce(isFunction_1.isFunction(comparer) ? function (x, y) { return (comparer(x, y) < 0 ? x : y); } : function (x, y) { return (x < y ? x : y); });
}
exports.min = min;
//# sourceMappingURL=min.js.map

/***/ }),

/***/ 5457:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.multicast = void 0;
var ConnectableObservable_1 = __nccwpck_require__(420);
var isFunction_1 = __nccwpck_require__(7206);
var connect_1 = __nccwpck_require__(1101);
function multicast(subjectOrSubjectFactory, selector) {
    var subjectFactory = isFunction_1.isFunction(subjectOrSubjectFactory) ? subjectOrSubjectFactory : function () { return subjectOrSubjectFactory; };
    if (isFunction_1.isFunction(selector)) {
        return connect_1.connect(selector, {
            connector: subjectFactory,
        });
    }
    return function (source) { return new ConnectableObservable_1.ConnectableObservable(source, subjectFactory); };
}
exports.multicast = multicast;
//# sourceMappingURL=multicast.js.map

/***/ }),

/***/ 2451:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.observeOn = void 0;
var lift_1 = __nccwpck_require__(8669);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
function observeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return lift_1.operate(function (source, subscriber) {
        source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) { return subscriber.add(scheduler.schedule(function () { return subscriber.next(value); }, delay)); }, function () { return subscriber.add(scheduler.schedule(function () { return subscriber.complete(); }, delay)); }, function (err) { return subscriber.add(scheduler.schedule(function () { return subscriber.error(err); }, delay)); }));
    });
}
exports.observeOn = observeOn;
//# sourceMappingURL=observeOn.js.map

/***/ }),

/***/ 8991:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.onErrorResumeNext = void 0;
var lift_1 = __nccwpck_require__(8669);
var from_1 = __nccwpck_require__(8309);
var argsOrArgArray_1 = __nccwpck_require__(8824);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
var noop_1 = __nccwpck_require__(1642);
function onErrorResumeNext() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    var nextSources = argsOrArgArray_1.argsOrArgArray(sources);
    return lift_1.operate(function (source, subscriber) {
        var remaining = __spreadArray([source], __read(nextSources));
        var subscribeNext = function () {
            if (!subscriber.closed) {
                if (remaining.length > 0) {
                    var nextSource = void 0;
                    try {
                        nextSource = from_1.innerFrom(remaining.shift());
                    }
                    catch (err) {
                        subscribeNext();
                        return;
                    }
                    var innerSub = new OperatorSubscriber_1.OperatorSubscriber(subscriber, undefined, noop_1.noop, noop_1.noop);
                    subscriber.add(nextSource.subscribe(innerSub));
                    innerSub.add(subscribeNext);
                }
                else {
                    subscriber.complete();
                }
            }
        };
        subscribeNext();
    });
}
exports.onErrorResumeNext = onErrorResumeNext;
//# sourceMappingURL=onErrorResumeNext.js.map

/***/ }),

/***/ 2206:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.pairwise = void 0;
var lift_1 = __nccwpck_require__(8669);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
function pairwise() {
    return lift_1.operate(function (source, subscriber) {
        var prev;
        var hasPrev = false;
        source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
            var p = prev;
            prev = value;
            hasPrev && subscriber.next([p, value]);
            hasPrev = true;
        }));
    });
}
exports.pairwise = pairwise;
//# sourceMappingURL=pairwise.js.map

/***/ }),

/***/ 5949:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.partition = void 0;
var not_1 = __nccwpck_require__(4338);
var filter_1 = __nccwpck_require__(6894);
function partition(predicate, thisArg) {
    return function (source) {
        return [filter_1.filter(predicate, thisArg)(source), filter_1.filter(not_1.not(predicate, thisArg))(source)];
    };
}
exports.partition = partition;
//# sourceMappingURL=partition.js.map

/***/ }),

/***/ 6073:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.pluck = void 0;
var map_1 = __nccwpck_require__(5987);
function pluck() {
    var properties = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        properties[_i] = arguments[_i];
    }
    var length = properties.length;
    if (length === 0) {
        throw new Error('list of properties cannot be empty.');
    }
    return map_1.map(function (x) {
        var currentProp = x;
        for (var i = 0; i < length; i++) {
            var p = currentProp === null || currentProp === void 0 ? void 0 : currentProp[properties[i]];
            if (typeof p !== 'undefined') {
                currentProp = p;
            }
            else {
                return undefined;
            }
        }
        return currentProp;
    });
}
exports.pluck = pluck;
//# sourceMappingURL=pluck.js.map

/***/ }),

/***/ 4084:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.publish = void 0;
var Subject_1 = __nccwpck_require__(9944);
var multicast_1 = __nccwpck_require__(5457);
var connect_1 = __nccwpck_require__(1101);
function publish(selector) {
    return selector ? function (source) { return connect_1.connect(selector)(source); } : function (source) { return multicast_1.multicast(new Subject_1.Subject())(source); };
}
exports.publish = publish;
//# sourceMappingURL=publish.js.map

/***/ }),

/***/ 45:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.publishBehavior = void 0;
var BehaviorSubject_1 = __nccwpck_require__(3473);
var ConnectableObservable_1 = __nccwpck_require__(420);
function publishBehavior(initialValue) {
    return function (source) {
        var subject = new BehaviorSubject_1.BehaviorSubject(initialValue);
        return new ConnectableObservable_1.ConnectableObservable(source, function () { return subject; });
    };
}
exports.publishBehavior = publishBehavior;
//# sourceMappingURL=publishBehavior.js.map

/***/ }),

/***/ 4149:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.publishLast = void 0;
var AsyncSubject_1 = __nccwpck_require__(9747);
var ConnectableObservable_1 = __nccwpck_require__(420);
function publishLast() {
    return function (source) {
        var subject = new AsyncSubject_1.AsyncSubject();
        return new ConnectableObservable_1.ConnectableObservable(source, function () { return subject; });
    };
}
exports.publishLast = publishLast;
//# sourceMappingURL=publishLast.js.map

/***/ }),

/***/ 7656:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.publishReplay = void 0;
var ReplaySubject_1 = __nccwpck_require__(2351);
var multicast_1 = __nccwpck_require__(5457);
var isFunction_1 = __nccwpck_require__(7206);
function publishReplay(bufferSize, windowTime, selectorOrScheduler, timestampProvider) {
    if (selectorOrScheduler && !isFunction_1.isFunction(selectorOrScheduler)) {
        timestampProvider = selectorOrScheduler;
    }
    var selector = isFunction_1.isFunction(selectorOrScheduler) ? selectorOrScheduler : undefined;
    return function (source) { return multicast_1.multicast(new ReplaySubject_1.ReplaySubject(bufferSize, windowTime, timestampProvider), selector)(source); };
}
exports.publishReplay = publishReplay;
//# sourceMappingURL=publishReplay.js.map

/***/ }),

/***/ 5846:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.race = void 0;
var argsOrArgArray_1 = __nccwpck_require__(8824);
var raceWith_1 = __nccwpck_require__(39);
function race() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return raceWith_1.raceWith.apply(void 0, __spreadArray([], __read(argsOrArgArray_1.argsOrArgArray(args))));
}
exports.race = race;
//# sourceMappingURL=race.js.map

/***/ }),

/***/ 39:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.raceWith = void 0;
var race_1 = __nccwpck_require__(6940);
var lift_1 = __nccwpck_require__(8669);
var identity_1 = __nccwpck_require__(283);
function raceWith() {
    var otherSources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        otherSources[_i] = arguments[_i];
    }
    return !otherSources.length
        ? identity_1.identity
        : lift_1.operate(function (source, subscriber) {
            race_1.raceInit(__spreadArray([source], __read(otherSources)))(subscriber);
        });
}
exports.raceWith = raceWith;
//# sourceMappingURL=raceWith.js.map

/***/ }),

/***/ 2627:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.reduce = void 0;
var scanInternals_1 = __nccwpck_require__(998);
var lift_1 = __nccwpck_require__(8669);
function reduce(accumulator, seed) {
    return lift_1.operate(scanInternals_1.scanInternals(accumulator, seed, arguments.length >= 2, false, true));
}
exports.reduce = reduce;
//# sourceMappingURL=reduce.js.map

/***/ }),

/***/ 2331:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.refCount = void 0;
var lift_1 = __nccwpck_require__(8669);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
function refCount() {
    return lift_1.operate(function (source, subscriber) {
        var connection = null;
        source._refCount++;
        var refCounter = new OperatorSubscriber_1.OperatorSubscriber(subscriber, undefined, undefined, undefined, function () {
            if (!source || source._refCount <= 0 || 0 < --source._refCount) {
                connection = null;
                return;
            }
            var sharedConnection = source._connection;
            var conn = connection;
            connection = null;
            if (sharedConnection && (!conn || sharedConnection === conn)) {
                sharedConnection.unsubscribe();
            }
            subscriber.unsubscribe();
        });
        source.subscribe(refCounter);
        if (!refCounter.closed) {
            connection = source.connect();
        }
    });
}
exports.refCount = refCount;
//# sourceMappingURL=refCount.js.map

/***/ }),

/***/ 2418:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.repeat = void 0;
var empty_1 = __nccwpck_require__(437);
var lift_1 = __nccwpck_require__(8669);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
function repeat(count) {
    if (count === void 0) { count = Infinity; }
    return count <= 0
        ? function () { return empty_1.EMPTY; }
        : lift_1.operate(function (source, subscriber) {
            var soFar = 0;
            var innerSub;
            var subscribeForRepeat = function () {
                var syncUnsub = false;
                innerSub = source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, undefined, function () {
                    if (++soFar < count) {
                        if (innerSub) {
                            innerSub.unsubscribe();
                            innerSub = null;
                            subscribeForRepeat();
                        }
                        else {
                            syncUnsub = true;
                        }
                    }
                    else {
                        subscriber.complete();
                    }
                }));
                if (syncUnsub) {
                    innerSub.unsubscribe();
                    innerSub = null;
                    subscribeForRepeat();
                }
            };
            subscribeForRepeat();
        });
}
exports.repeat = repeat;
//# sourceMappingURL=repeat.js.map

/***/ }),

/***/ 754:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.repeatWhen = void 0;
var Subject_1 = __nccwpck_require__(9944);
var lift_1 = __nccwpck_require__(8669);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
function repeatWhen(notifier) {
    return lift_1.operate(function (source, subscriber) {
        var innerSub;
        var syncResub = false;
        var completions$;
        var isNotifierComplete = false;
        var isMainComplete = false;
        var checkComplete = function () { return isMainComplete && isNotifierComplete && (subscriber.complete(), true); };
        var getCompletionSubject = function () {
            if (!completions$) {
                completions$ = new Subject_1.Subject();
                notifier(completions$).subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function () {
                    if (innerSub) {
                        subscribeForRepeatWhen();
                    }
                    else {
                        syncResub = true;
                    }
                }, function () {
                    isNotifierComplete = true;
                    checkComplete();
                }));
            }
            return completions$;
        };
        var subscribeForRepeatWhen = function () {
            isMainComplete = false;
            innerSub = source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, undefined, function () {
                isMainComplete = true;
                !checkComplete() && getCompletionSubject().next();
            }));
            if (syncResub) {
                innerSub.unsubscribe();
                innerSub = null;
                syncResub = false;
                subscribeForRepeatWhen();
            }
        };
        subscribeForRepeatWhen();
    });
}
exports.repeatWhen = repeatWhen;
//# sourceMappingURL=repeatWhen.js.map

/***/ }),

/***/ 6251:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.retry = void 0;
var lift_1 = __nccwpck_require__(8669);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
var identity_1 = __nccwpck_require__(283);
var timer_1 = __nccwpck_require__(9757);
var from_1 = __nccwpck_require__(8309);
function retry(configOrCount) {
    if (configOrCount === void 0) { configOrCount = Infinity; }
    var config;
    if (configOrCount && typeof configOrCount === 'object') {
        config = configOrCount;
    }
    else {
        config = {
            count: configOrCount,
        };
    }
    var _a = config.count, count = _a === void 0 ? Infinity : _a, delay = config.delay, _b = config.resetOnSuccess, resetOnSuccess = _b === void 0 ? false : _b;
    return count <= 0
        ? identity_1.identity
        : lift_1.operate(function (source, subscriber) {
            var soFar = 0;
            var innerSub;
            var subscribeForRetry = function () {
                var syncUnsub = false;
                innerSub = source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
                    if (resetOnSuccess) {
                        soFar = 0;
                    }
                    subscriber.next(value);
                }, undefined, function (err) {
                    if (soFar++ < count) {
                        var resub_1 = function () {
                            if (innerSub) {
                                innerSub.unsubscribe();
                                innerSub = null;
                                subscribeForRetry();
                            }
                            else {
                                syncUnsub = true;
                            }
                        };
                        if (delay != null) {
                            var notifier = typeof delay === 'number' ? timer_1.timer(delay) : from_1.innerFrom(delay(err, soFar));
                            var notifierSubscriber_1 = new OperatorSubscriber_1.OperatorSubscriber(subscriber, function () {
                                notifierSubscriber_1.unsubscribe();
                                resub_1();
                            }, function () {
                                subscriber.complete();
                            });
                            notifier.subscribe(notifierSubscriber_1);
                        }
                        else {
                            resub_1();
                        }
                    }
                    else {
                        subscriber.error(err);
                    }
                }));
                if (syncUnsub) {
                    innerSub.unsubscribe();
                    innerSub = null;
                    subscribeForRetry();
                }
            };
            subscribeForRetry();
        });
}
exports.retry = retry;
//# sourceMappingURL=retry.js.map

/***/ }),

/***/ 9018:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.retryWhen = void 0;
var Subject_1 = __nccwpck_require__(9944);
var lift_1 = __nccwpck_require__(8669);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
function retryWhen(notifier) {
    return lift_1.operate(function (source, subscriber) {
        var innerSub;
        var syncResub = false;
        var errors$;
        var subscribeForRetryWhen = function () {
            innerSub = source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, undefined, undefined, function (err) {
                if (!errors$) {
                    errors$ = new Subject_1.Subject();
                    notifier(errors$).subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function () {
                        return innerSub ? subscribeForRetryWhen() : (syncResub = true);
                    }));
                }
                if (errors$) {
                    errors$.next(err);
                }
            }));
            if (syncResub) {
                innerSub.unsubscribe();
                innerSub = null;
                syncResub = false;
                subscribeForRetryWhen();
            }
        };
        subscribeForRetryWhen();
    });
}
exports.retryWhen = retryWhen;
//# sourceMappingURL=retryWhen.js.map

/***/ }),

/***/ 3774:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sample = void 0;
var lift_1 = __nccwpck_require__(8669);
var noop_1 = __nccwpck_require__(1642);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
function sample(notifier) {
    return lift_1.operate(function (source, subscriber) {
        var hasValue = false;
        var lastValue = null;
        source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
            hasValue = true;
            lastValue = value;
        }));
        var emit = function () {
            if (hasValue) {
                hasValue = false;
                var value = lastValue;
                lastValue = null;
                subscriber.next(value);
            }
        };
        notifier.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, emit, noop_1.noop));
    });
}
exports.sample = sample;
//# sourceMappingURL=sample.js.map

/***/ }),

/***/ 9807:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sampleTime = void 0;
var async_1 = __nccwpck_require__(6072);
var sample_1 = __nccwpck_require__(3774);
var interval_1 = __nccwpck_require__(29);
function sampleTime(period, scheduler) {
    if (scheduler === void 0) { scheduler = async_1.asyncScheduler; }
    return sample_1.sample(interval_1.interval(period, scheduler));
}
exports.sampleTime = sampleTime;
//# sourceMappingURL=sampleTime.js.map

/***/ }),

/***/ 5578:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.scan = void 0;
var lift_1 = __nccwpck_require__(8669);
var scanInternals_1 = __nccwpck_require__(998);
function scan(accumulator, seed) {
    return lift_1.operate(scanInternals_1.scanInternals(accumulator, seed, arguments.length >= 2, true));
}
exports.scan = scan;
//# sourceMappingURL=scan.js.map

/***/ }),

/***/ 998:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.scanInternals = void 0;
var OperatorSubscriber_1 = __nccwpck_require__(9549);
function scanInternals(accumulator, seed, hasSeed, emitOnNext, emitBeforeComplete) {
    return function (source, subscriber) {
        var hasState = hasSeed;
        var state = seed;
        var index = 0;
        source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
            var i = index++;
            state = hasState
                ?
                    accumulator(state, value, i)
                :
                    ((hasState = true), value);
            emitOnNext && subscriber.next(state);
        }, emitBeforeComplete &&
            (function () {
                hasState && subscriber.next(state);
                subscriber.complete();
            })));
    };
}
exports.scanInternals = scanInternals;
//# sourceMappingURL=scanInternals.js.map

/***/ }),

/***/ 6126:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sequenceEqual = void 0;
var lift_1 = __nccwpck_require__(8669);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
function sequenceEqual(compareTo, comparator) {
    if (comparator === void 0) { comparator = function (a, b) { return a === b; }; }
    return lift_1.operate(function (source, subscriber) {
        var aState = createState();
        var bState = createState();
        var emit = function (isEqual) {
            subscriber.next(isEqual);
            subscriber.complete();
        };
        var createSubscriber = function (selfState, otherState) {
            var sequenceEqualSubscriber = new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (a) {
                var buffer = otherState.buffer, complete = otherState.complete;
                if (buffer.length === 0) {
                    complete ? emit(false) : selfState.buffer.push(a);
                }
                else {
                    !comparator(a, buffer.shift()) && emit(false);
                }
            }, function () {
                selfState.complete = true;
                var complete = otherState.complete, buffer = otherState.buffer;
                complete && emit(buffer.length === 0);
                sequenceEqualSubscriber === null || sequenceEqualSubscriber === void 0 ? void 0 : sequenceEqualSubscriber.unsubscribe();
            });
            return sequenceEqualSubscriber;
        };
        source.subscribe(createSubscriber(aState, bState));
        compareTo.subscribe(createSubscriber(bState, aState));
    });
}
exports.sequenceEqual = sequenceEqual;
function createState() {
    return {
        buffer: [],
        complete: false,
    };
}
//# sourceMappingURL=sequenceEqual.js.map

/***/ }),

/***/ 484:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.share = void 0;
var from_1 = __nccwpck_require__(8309);
var take_1 = __nccwpck_require__(3698);
var Subject_1 = __nccwpck_require__(9944);
var Subscriber_1 = __nccwpck_require__(7121);
var lift_1 = __nccwpck_require__(8669);
function share(options) {
    if (options === void 0) { options = {}; }
    var _a = options.connector, connector = _a === void 0 ? function () { return new Subject_1.Subject(); } : _a, _b = options.resetOnError, resetOnError = _b === void 0 ? true : _b, _c = options.resetOnComplete, resetOnComplete = _c === void 0 ? true : _c, _d = options.resetOnRefCountZero, resetOnRefCountZero = _d === void 0 ? true : _d;
    return function (wrapperSource) {
        var connection = null;
        var resetConnection = null;
        var subject = null;
        var refCount = 0;
        var hasCompleted = false;
        var hasErrored = false;
        var cancelReset = function () {
            resetConnection === null || resetConnection === void 0 ? void 0 : resetConnection.unsubscribe();
            resetConnection = null;
        };
        var reset = function () {
            cancelReset();
            connection = subject = null;
            hasCompleted = hasErrored = false;
        };
        var resetAndUnsubscribe = function () {
            var conn = connection;
            reset();
            conn === null || conn === void 0 ? void 0 : conn.unsubscribe();
        };
        return lift_1.operate(function (source, subscriber) {
            refCount++;
            if (!hasErrored && !hasCompleted) {
                cancelReset();
            }
            var dest = (subject = subject !== null && subject !== void 0 ? subject : connector());
            subscriber.add(function () {
                refCount--;
                if (refCount === 0 && !hasErrored && !hasCompleted) {
                    resetConnection = handleReset(resetAndUnsubscribe, resetOnRefCountZero);
                }
            });
            dest.subscribe(subscriber);
            if (!connection) {
                connection = new Subscriber_1.SafeSubscriber({
                    next: function (value) { return dest.next(value); },
                    error: function (err) {
                        hasErrored = true;
                        cancelReset();
                        resetConnection = handleReset(reset, resetOnError, err);
                        dest.error(err);
                    },
                    complete: function () {
                        hasCompleted = true;
                        cancelReset();
                        resetConnection = handleReset(reset, resetOnComplete);
                        dest.complete();
                    },
                });
                from_1.from(source).subscribe(connection);
            }
        })(wrapperSource);
    };
}
exports.share = share;
function handleReset(reset, on) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    if (on === true) {
        reset();
        return null;
    }
    if (on === false) {
        return null;
    }
    return on.apply(void 0, __spreadArray([], __read(args))).pipe(take_1.take(1))
        .subscribe(function () { return reset(); });
}
//# sourceMappingURL=share.js.map

/***/ }),

/***/ 2118:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.shareReplay = void 0;
var ReplaySubject_1 = __nccwpck_require__(2351);
var share_1 = __nccwpck_require__(484);
function shareReplay(configOrBufferSize, windowTime, scheduler) {
    var _a, _b;
    var bufferSize;
    var refCount = false;
    if (configOrBufferSize && typeof configOrBufferSize === 'object') {
        bufferSize = (_a = configOrBufferSize.bufferSize) !== null && _a !== void 0 ? _a : Infinity;
        windowTime = (_b = configOrBufferSize.windowTime) !== null && _b !== void 0 ? _b : Infinity;
        refCount = !!configOrBufferSize.refCount;
        scheduler = configOrBufferSize.scheduler;
    }
    else {
        bufferSize = configOrBufferSize !== null && configOrBufferSize !== void 0 ? configOrBufferSize : Infinity;
    }
    return share_1.share({
        connector: function () { return new ReplaySubject_1.ReplaySubject(bufferSize, windowTime, scheduler); },
        resetOnError: true,
        resetOnComplete: false,
        resetOnRefCountZero: refCount
    });
}
exports.shareReplay = shareReplay;
//# sourceMappingURL=shareReplay.js.map

/***/ }),

/***/ 8441:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.single = void 0;
var EmptyError_1 = __nccwpck_require__(9391);
var SequenceError_1 = __nccwpck_require__(9048);
var NotFoundError_1 = __nccwpck_require__(4431);
var lift_1 = __nccwpck_require__(8669);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
function single(predicate) {
    return lift_1.operate(function (source, subscriber) {
        var hasValue = false;
        var singleValue;
        var seenValue = false;
        var index = 0;
        source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
            seenValue = true;
            if (!predicate || predicate(value, index++, source)) {
                hasValue && subscriber.error(new SequenceError_1.SequenceError('Too many matching values'));
                hasValue = true;
                singleValue = value;
            }
        }, function () {
            if (hasValue) {
                subscriber.next(singleValue);
                subscriber.complete();
            }
            else {
                subscriber.error(seenValue ? new NotFoundError_1.NotFoundError('No matching values') : new EmptyError_1.EmptyError());
            }
        }));
    });
}
exports.single = single;
//# sourceMappingURL=single.js.map

/***/ }),

/***/ 947:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.skip = void 0;
var filter_1 = __nccwpck_require__(6894);
function skip(count) {
    return filter_1.filter(function (_, index) { return count <= index; });
}
exports.skip = skip;
//# sourceMappingURL=skip.js.map

/***/ }),

/***/ 5865:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.skipLast = void 0;
var identity_1 = __nccwpck_require__(283);
var lift_1 = __nccwpck_require__(8669);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
function skipLast(skipCount) {
    return skipCount <= 0
        ?
            identity_1.identity
        : lift_1.operate(function (source, subscriber) {
            var ring = new Array(skipCount);
            var seen = 0;
            source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
                var valueIndex = seen++;
                if (valueIndex < skipCount) {
                    ring[valueIndex] = value;
                }
                else {
                    var index = valueIndex % skipCount;
                    var oldValue = ring[index];
                    ring[index] = value;
                    subscriber.next(oldValue);
                }
            }));
            return function () {
                ring = null;
            };
        });
}
exports.skipLast = skipLast;
//# sourceMappingURL=skipLast.js.map

/***/ }),

/***/ 1110:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.skipUntil = void 0;
var lift_1 = __nccwpck_require__(8669);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
var from_1 = __nccwpck_require__(8309);
var noop_1 = __nccwpck_require__(1642);
function skipUntil(notifier) {
    return lift_1.operate(function (source, subscriber) {
        var taking = false;
        var skipSubscriber = new OperatorSubscriber_1.OperatorSubscriber(subscriber, function () {
            skipSubscriber === null || skipSubscriber === void 0 ? void 0 : skipSubscriber.unsubscribe();
            taking = true;
        }, noop_1.noop);
        from_1.innerFrom(notifier).subscribe(skipSubscriber);
        source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) { return taking && subscriber.next(value); }));
    });
}
exports.skipUntil = skipUntil;
//# sourceMappingURL=skipUntil.js.map

/***/ }),

/***/ 2550:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.skipWhile = void 0;
var lift_1 = __nccwpck_require__(8669);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
function skipWhile(predicate) {
    return lift_1.operate(function (source, subscriber) {
        var taking = false;
        var index = 0;
        source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) { return (taking || (taking = !predicate(value, index++))) && subscriber.next(value); }));
    });
}
exports.skipWhile = skipWhile;
//# sourceMappingURL=skipWhile.js.map

/***/ }),

/***/ 5471:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.startWith = void 0;
var concat_1 = __nccwpck_require__(4675);
var args_1 = __nccwpck_require__(4890);
var lift_1 = __nccwpck_require__(8669);
function startWith() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    var scheduler = args_1.popScheduler(values);
    return lift_1.operate(function (source, subscriber) {
        (scheduler ? concat_1.concat(values, source, scheduler) : concat_1.concat(values, source)).subscribe(subscriber);
    });
}
exports.startWith = startWith;
//# sourceMappingURL=startWith.js.map

/***/ }),

/***/ 7224:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.subscribeOn = void 0;
var lift_1 = __nccwpck_require__(8669);
function subscribeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return lift_1.operate(function (source, subscriber) {
        subscriber.add(scheduler.schedule(function () { return source.subscribe(subscriber); }, delay));
    });
}
exports.subscribeOn = subscribeOn;
//# sourceMappingURL=subscribeOn.js.map

/***/ }),

/***/ 327:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.switchAll = void 0;
var switchMap_1 = __nccwpck_require__(6704);
var identity_1 = __nccwpck_require__(283);
function switchAll() {
    return switchMap_1.switchMap(identity_1.identity);
}
exports.switchAll = switchAll;
//# sourceMappingURL=switchAll.js.map

/***/ }),

/***/ 6704:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.switchMap = void 0;
var from_1 = __nccwpck_require__(8309);
var lift_1 = __nccwpck_require__(8669);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
function switchMap(project, resultSelector) {
    return lift_1.operate(function (source, subscriber) {
        var innerSubscriber = null;
        var index = 0;
        var isComplete = false;
        var checkComplete = function () { return isComplete && !innerSubscriber && subscriber.complete(); };
        source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
            innerSubscriber === null || innerSubscriber === void 0 ? void 0 : innerSubscriber.unsubscribe();
            var innerIndex = 0;
            var outerIndex = index++;
            from_1.innerFrom(project(value, outerIndex)).subscribe((innerSubscriber = new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (innerValue) { return subscriber.next(resultSelector ? resultSelector(value, innerValue, outerIndex, innerIndex++) : innerValue); }, function () {
                innerSubscriber = null;
                checkComplete();
            })));
        }, function () {
            isComplete = true;
            checkComplete();
        }));
    });
}
exports.switchMap = switchMap;
//# sourceMappingURL=switchMap.js.map

/***/ }),

/***/ 1713:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.switchMapTo = void 0;
var switchMap_1 = __nccwpck_require__(6704);
var isFunction_1 = __nccwpck_require__(7206);
function switchMapTo(innerObservable, resultSelector) {
    return isFunction_1.isFunction(resultSelector) ? switchMap_1.switchMap(function () { return innerObservable; }, resultSelector) : switchMap_1.switchMap(function () { return innerObservable; });
}
exports.switchMapTo = switchMapTo;
//# sourceMappingURL=switchMapTo.js.map

/***/ }),

/***/ 3355:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.switchScan = void 0;
var switchMap_1 = __nccwpck_require__(6704);
var lift_1 = __nccwpck_require__(8669);
function switchScan(accumulator, seed) {
    return lift_1.operate(function (source, subscriber) {
        var state = seed;
        switchMap_1.switchMap(function (value, index) { return accumulator(state, value, index); }, function (_, innerValue) { return ((state = innerValue), innerValue); })(source).subscribe(subscriber);
        return function () {
            state = null;
        };
    });
}
exports.switchScan = switchScan;
//# sourceMappingURL=switchScan.js.map

/***/ }),

/***/ 3698:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.take = void 0;
var empty_1 = __nccwpck_require__(437);
var lift_1 = __nccwpck_require__(8669);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
function take(count) {
    return count <= 0
        ?
            function () { return empty_1.EMPTY; }
        : lift_1.operate(function (source, subscriber) {
            var seen = 0;
            source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
                if (++seen <= count) {
                    subscriber.next(value);
                    if (count <= seen) {
                        subscriber.complete();
                    }
                }
            }));
        });
}
exports.take = take;
//# sourceMappingURL=take.js.map

/***/ }),

/***/ 5041:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.takeLast = void 0;
var empty_1 = __nccwpck_require__(437);
var lift_1 = __nccwpck_require__(8669);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
function takeLast(count) {
    return count <= 0
        ? function () { return empty_1.EMPTY; }
        : lift_1.operate(function (source, subscriber) {
            var buffer = [];
            source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
                buffer.push(value);
                count < buffer.length && buffer.shift();
            }, function () {
                var e_1, _a;
                try {
                    for (var buffer_1 = __values(buffer), buffer_1_1 = buffer_1.next(); !buffer_1_1.done; buffer_1_1 = buffer_1.next()) {
                        var value = buffer_1_1.value;
                        subscriber.next(value);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (buffer_1_1 && !buffer_1_1.done && (_a = buffer_1.return)) _a.call(buffer_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                subscriber.complete();
            }, undefined, function () {
                buffer = null;
            }));
        });
}
exports.takeLast = takeLast;
//# sourceMappingURL=takeLast.js.map

/***/ }),

/***/ 5150:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.takeUntil = void 0;
var lift_1 = __nccwpck_require__(8669);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
var from_1 = __nccwpck_require__(8309);
var noop_1 = __nccwpck_require__(1642);
function takeUntil(notifier) {
    return lift_1.operate(function (source, subscriber) {
        from_1.innerFrom(notifier).subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function () { return subscriber.complete(); }, noop_1.noop));
        !subscriber.closed && source.subscribe(subscriber);
    });
}
exports.takeUntil = takeUntil;
//# sourceMappingURL=takeUntil.js.map

/***/ }),

/***/ 6700:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.takeWhile = void 0;
var lift_1 = __nccwpck_require__(8669);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
function takeWhile(predicate, inclusive) {
    if (inclusive === void 0) { inclusive = false; }
    return lift_1.operate(function (source, subscriber) {
        var index = 0;
        source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
            var result = predicate(value, index++);
            (result || inclusive) && subscriber.next(value);
            !result && subscriber.complete();
        }));
    });
}
exports.takeWhile = takeWhile;
//# sourceMappingURL=takeWhile.js.map

/***/ }),

/***/ 8845:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.tap = void 0;
var isFunction_1 = __nccwpck_require__(7206);
var lift_1 = __nccwpck_require__(8669);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
var identity_1 = __nccwpck_require__(283);
function tap(observerOrNext, error, complete) {
    var tapObserver = isFunction_1.isFunction(observerOrNext) || error || complete
        ?
            { next: observerOrNext, error: error, complete: complete }
        : observerOrNext;
    return tapObserver
        ? lift_1.operate(function (source, subscriber) {
            var _a;
            (_a = tapObserver.subscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
            var isUnsub = true;
            source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
                var _a;
                (_a = tapObserver.next) === null || _a === void 0 ? void 0 : _a.call(tapObserver, value);
                subscriber.next(value);
            }, function () {
                var _a;
                isUnsub = false;
                (_a = tapObserver.complete) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
                subscriber.complete();
            }, function (err) {
                var _a;
                isUnsub = false;
                (_a = tapObserver.error) === null || _a === void 0 ? void 0 : _a.call(tapObserver, err);
                subscriber.error(err);
            }, function () {
                var _a, _b;
                if (isUnsub) {
                    (_a = tapObserver.unsubscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
                }
                (_b = tapObserver.finalize) === null || _b === void 0 ? void 0 : _b.call(tapObserver);
            }));
        })
        :
            identity_1.identity;
}
exports.tap = tap;
//# sourceMappingURL=tap.js.map

/***/ }),

/***/ 6713:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.throttle = exports.defaultThrottleConfig = void 0;
var lift_1 = __nccwpck_require__(8669);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
var from_1 = __nccwpck_require__(8309);
exports.defaultThrottleConfig = {
    leading: true,
    trailing: false,
};
function throttle(durationSelector, _a) {
    var _b = _a === void 0 ? exports.defaultThrottleConfig : _a, leading = _b.leading, trailing = _b.trailing;
    return lift_1.operate(function (source, subscriber) {
        var hasValue = false;
        var sendValue = null;
        var throttled = null;
        var isComplete = false;
        var endThrottling = function () {
            throttled === null || throttled === void 0 ? void 0 : throttled.unsubscribe();
            throttled = null;
            if (trailing) {
                send();
                isComplete && subscriber.complete();
            }
        };
        var cleanupThrottling = function () {
            throttled = null;
            isComplete && subscriber.complete();
        };
        var startThrottle = function (value) {
            return (throttled = from_1.innerFrom(durationSelector(value)).subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, endThrottling, cleanupThrottling)));
        };
        var send = function () {
            if (hasValue) {
                hasValue = false;
                var value = sendValue;
                sendValue = null;
                subscriber.next(value);
                !isComplete && startThrottle(value);
            }
        };
        source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
            hasValue = true;
            sendValue = value;
            !(throttled && !throttled.closed) && (leading ? send() : startThrottle(value));
        }, function () {
            isComplete = true;
            !(trailing && hasValue && throttled && !throttled.closed) && subscriber.complete();
        }));
    });
}
exports.throttle = throttle;
//# sourceMappingURL=throttle.js.map

/***/ }),

/***/ 3435:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.throttleTime = void 0;
var async_1 = __nccwpck_require__(6072);
var throttle_1 = __nccwpck_require__(6713);
var timer_1 = __nccwpck_require__(9757);
function throttleTime(duration, scheduler, config) {
    if (scheduler === void 0) { scheduler = async_1.asyncScheduler; }
    if (config === void 0) { config = throttle_1.defaultThrottleConfig; }
    var duration$ = timer_1.timer(duration, scheduler);
    return throttle_1.throttle(function () { return duration$; }, config);
}
exports.throttleTime = throttleTime;
//# sourceMappingURL=throttleTime.js.map

/***/ }),

/***/ 1566:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.throwIfEmpty = void 0;
var EmptyError_1 = __nccwpck_require__(9391);
var lift_1 = __nccwpck_require__(8669);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
function throwIfEmpty(errorFactory) {
    if (errorFactory === void 0) { errorFactory = defaultErrorFactory; }
    return lift_1.operate(function (source, subscriber) {
        var hasValue = false;
        source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
            hasValue = true;
            subscriber.next(value);
        }, function () { return (hasValue ? subscriber.complete() : subscriber.error(errorFactory())); }));
    });
}
exports.throwIfEmpty = throwIfEmpty;
function defaultErrorFactory() {
    return new EmptyError_1.EmptyError();
}
//# sourceMappingURL=throwIfEmpty.js.map

/***/ }),

/***/ 4643:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TimeInterval = exports.timeInterval = void 0;
var async_1 = __nccwpck_require__(6072);
var scan_1 = __nccwpck_require__(5578);
var defer_1 = __nccwpck_require__(7672);
var map_1 = __nccwpck_require__(5987);
function timeInterval(scheduler) {
    if (scheduler === void 0) { scheduler = async_1.async; }
    return function (source) {
        return defer_1.defer(function () {
            return source.pipe(scan_1.scan(function (_a, value) {
                var current = _a.current;
                return ({ value: value, current: scheduler.now(), last: current });
            }, {
                current: scheduler.now(),
                value: undefined,
                last: undefined,
            }), map_1.map(function (_a) {
                var current = _a.current, last = _a.last, value = _a.value;
                return new TimeInterval(value, current - last);
            }));
        });
    };
}
exports.timeInterval = timeInterval;
var TimeInterval = (function () {
    function TimeInterval(value, interval) {
        this.value = value;
        this.interval = interval;
    }
    return TimeInterval;
}());
exports.TimeInterval = TimeInterval;
//# sourceMappingURL=timeInterval.js.map

/***/ }),

/***/ 2051:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.timeout = exports.TimeoutError = void 0;
var async_1 = __nccwpck_require__(6072);
var isDate_1 = __nccwpck_require__(935);
var lift_1 = __nccwpck_require__(8669);
var from_1 = __nccwpck_require__(8309);
var createErrorClass_1 = __nccwpck_require__(8858);
var caughtSchedule_1 = __nccwpck_require__(3376);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
exports.TimeoutError = createErrorClass_1.createErrorClass(function (_super) {
    return function TimeoutErrorImpl(info) {
        if (info === void 0) { info = null; }
        _super(this);
        this.message = 'Timeout has occurred';
        this.name = 'TimeoutError';
        this.info = info;
    };
});
function timeout(config, schedulerArg) {
    var _a = (isDate_1.isValidDate(config)
        ? { first: config }
        : typeof config === 'number'
            ? { each: config }
            : config), first = _a.first, each = _a.each, _b = _a.with, _with = _b === void 0 ? timeoutErrorFactory : _b, _c = _a.scheduler, scheduler = _c === void 0 ? schedulerArg !== null && schedulerArg !== void 0 ? schedulerArg : async_1.asyncScheduler : _c, _d = _a.meta, meta = _d === void 0 ? null : _d;
    if (first == null && each == null) {
        throw new TypeError('No timeout provided.');
    }
    return lift_1.operate(function (source, subscriber) {
        var originalSourceSubscription;
        var timerSubscription;
        var lastValue = null;
        var seen = 0;
        var startTimer = function (delay) {
            timerSubscription = caughtSchedule_1.caughtSchedule(subscriber, scheduler, function () {
                originalSourceSubscription.unsubscribe();
                from_1.innerFrom(_with({
                    meta: meta,
                    lastValue: lastValue,
                    seen: seen,
                })).subscribe(subscriber);
            }, delay);
        };
        originalSourceSubscription = source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
            timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.unsubscribe();
            seen++;
            subscriber.next((lastValue = value));
            each > 0 && startTimer(each);
        }, undefined, undefined, function () {
            if (!(timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.closed)) {
                timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.unsubscribe();
            }
            lastValue = null;
        }));
        startTimer(first != null ? (typeof first === 'number' ? first : +first - scheduler.now()) : each);
    });
}
exports.timeout = timeout;
function timeoutErrorFactory(info) {
    throw new exports.TimeoutError(info);
}
//# sourceMappingURL=timeout.js.map

/***/ }),

/***/ 3540:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.timeoutWith = void 0;
var async_1 = __nccwpck_require__(6072);
var isDate_1 = __nccwpck_require__(935);
var timeout_1 = __nccwpck_require__(2051);
function timeoutWith(due, withObservable, scheduler) {
    var first;
    var each;
    var _with;
    scheduler = scheduler !== null && scheduler !== void 0 ? scheduler : async_1.async;
    if (isDate_1.isValidDate(due)) {
        first = due;
    }
    else if (typeof due === 'number') {
        each = due;
    }
    if (withObservable) {
        _with = function () { return withObservable; };
    }
    else {
        throw new TypeError('No observable provided to switch to');
    }
    if (first == null && each == null) {
        throw new TypeError('No timeout provided.');
    }
    return timeout_1.timeout({
        first: first,
        each: each,
        scheduler: scheduler,
        with: _with,
    });
}
exports.timeoutWith = timeoutWith;
//# sourceMappingURL=timeoutWith.js.map

/***/ }),

/***/ 5518:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.timestamp = void 0;
var dateTimestampProvider_1 = __nccwpck_require__(1395);
var map_1 = __nccwpck_require__(5987);
function timestamp(timestampProvider) {
    if (timestampProvider === void 0) { timestampProvider = dateTimestampProvider_1.dateTimestampProvider; }
    return map_1.map(function (value) { return ({ value: value, timestamp: timestampProvider.now() }); });
}
exports.timestamp = timestamp;
//# sourceMappingURL=timestamp.js.map

/***/ }),

/***/ 5114:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toArray = void 0;
var reduce_1 = __nccwpck_require__(2627);
var lift_1 = __nccwpck_require__(8669);
var arrReducer = function (arr, value) { return (arr.push(value), arr); };
function toArray() {
    return lift_1.operate(function (source, subscriber) {
        reduce_1.reduce(arrReducer, [])(source).subscribe(subscriber);
    });
}
exports.toArray = toArray;
//# sourceMappingURL=toArray.js.map

/***/ }),

/***/ 8255:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.window = void 0;
var Subject_1 = __nccwpck_require__(9944);
var lift_1 = __nccwpck_require__(8669);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
var noop_1 = __nccwpck_require__(1642);
function window(windowBoundaries) {
    return lift_1.operate(function (source, subscriber) {
        var windowSubject = new Subject_1.Subject();
        subscriber.next(windowSubject.asObservable());
        var errorHandler = function (err) {
            windowSubject.error(err);
            subscriber.error(err);
        };
        source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) { return windowSubject === null || windowSubject === void 0 ? void 0 : windowSubject.next(value); }, function () {
            windowSubject.complete();
            subscriber.complete();
        }, errorHandler));
        windowBoundaries.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function () {
            windowSubject.complete();
            subscriber.next((windowSubject = new Subject_1.Subject()));
        }, noop_1.noop, errorHandler));
        return function () {
            windowSubject === null || windowSubject === void 0 ? void 0 : windowSubject.unsubscribe();
            windowSubject = null;
        };
    });
}
exports.window = window;
//# sourceMappingURL=window.js.map

/***/ }),

/***/ 3144:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.windowCount = void 0;
var Subject_1 = __nccwpck_require__(9944);
var lift_1 = __nccwpck_require__(8669);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
function windowCount(windowSize, startWindowEvery) {
    if (startWindowEvery === void 0) { startWindowEvery = 0; }
    var startEvery = startWindowEvery > 0 ? startWindowEvery : windowSize;
    return lift_1.operate(function (source, subscriber) {
        var windows = [new Subject_1.Subject()];
        var starts = [];
        var count = 0;
        subscriber.next(windows[0].asObservable());
        source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
            var e_1, _a;
            try {
                for (var windows_1 = __values(windows), windows_1_1 = windows_1.next(); !windows_1_1.done; windows_1_1 = windows_1.next()) {
                    var window_1 = windows_1_1.value;
                    window_1.next(value);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (windows_1_1 && !windows_1_1.done && (_a = windows_1.return)) _a.call(windows_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            var c = count - windowSize + 1;
            if (c >= 0 && c % startEvery === 0) {
                windows.shift().complete();
            }
            if (++count % startEvery === 0) {
                var window_2 = new Subject_1.Subject();
                windows.push(window_2);
                subscriber.next(window_2.asObservable());
            }
        }, function () {
            while (windows.length > 0) {
                windows.shift().complete();
            }
            subscriber.complete();
        }, function (err) {
            while (windows.length > 0) {
                windows.shift().error(err);
            }
            subscriber.error(err);
        }, function () {
            starts = null;
            windows = null;
        }));
    });
}
exports.windowCount = windowCount;
//# sourceMappingURL=windowCount.js.map

/***/ }),

/***/ 2212:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.windowTime = void 0;
var Subject_1 = __nccwpck_require__(9944);
var async_1 = __nccwpck_require__(6072);
var Subscription_1 = __nccwpck_require__(9548);
var lift_1 = __nccwpck_require__(8669);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
var arrRemove_1 = __nccwpck_require__(8499);
var args_1 = __nccwpck_require__(4890);
function windowTime(windowTimeSpan) {
    var _a, _b;
    var otherArgs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        otherArgs[_i - 1] = arguments[_i];
    }
    var scheduler = (_a = args_1.popScheduler(otherArgs)) !== null && _a !== void 0 ? _a : async_1.asyncScheduler;
    var windowCreationInterval = (_b = otherArgs[0]) !== null && _b !== void 0 ? _b : null;
    var maxWindowSize = otherArgs[1] || Infinity;
    return lift_1.operate(function (source, subscriber) {
        var windowRecords = [];
        var restartOnClose = false;
        var closeWindow = function (record) {
            var window = record.window, subs = record.subs;
            window.complete();
            subs.unsubscribe();
            arrRemove_1.arrRemove(windowRecords, record);
            restartOnClose && startWindow();
        };
        var startWindow = function () {
            if (windowRecords) {
                var subs = new Subscription_1.Subscription();
                subscriber.add(subs);
                var window_1 = new Subject_1.Subject();
                var record_1 = {
                    window: window_1,
                    subs: subs,
                    seen: 0,
                };
                windowRecords.push(record_1);
                subscriber.next(window_1.asObservable());
                subs.add(scheduler.schedule(function () { return closeWindow(record_1); }, windowTimeSpan));
            }
        };
        windowCreationInterval !== null && windowCreationInterval >= 0
            ?
                subscriber.add(scheduler.schedule(function () {
                    startWindow();
                    !this.closed && subscriber.add(this.schedule(null, windowCreationInterval));
                }, windowCreationInterval))
            : (restartOnClose = true);
        startWindow();
        var loop = function (cb) { return windowRecords.slice().forEach(cb); };
        var terminate = function (cb) {
            loop(function (_a) {
                var window = _a.window;
                return cb(window);
            });
            cb(subscriber);
            subscriber.unsubscribe();
        };
        source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
            loop(function (record) {
                record.window.next(value);
                maxWindowSize <= ++record.seen && closeWindow(record);
            });
        }, function () { return terminate(function (consumer) { return consumer.complete(); }); }, function (err) { return terminate(function (consumer) { return consumer.error(err); }); }));
        return function () {
            windowRecords = null;
        };
    });
}
exports.windowTime = windowTime;
//# sourceMappingURL=windowTime.js.map

/***/ }),

/***/ 2741:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.windowToggle = void 0;
var Subject_1 = __nccwpck_require__(9944);
var Subscription_1 = __nccwpck_require__(9548);
var lift_1 = __nccwpck_require__(8669);
var from_1 = __nccwpck_require__(8309);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
var noop_1 = __nccwpck_require__(1642);
var arrRemove_1 = __nccwpck_require__(8499);
function windowToggle(openings, closingSelector) {
    return lift_1.operate(function (source, subscriber) {
        var windows = [];
        var handleError = function (err) {
            while (0 < windows.length) {
                windows.shift().error(err);
            }
            subscriber.error(err);
        };
        from_1.innerFrom(openings).subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (openValue) {
            var window = new Subject_1.Subject();
            windows.push(window);
            var closingSubscription = new Subscription_1.Subscription();
            var closeWindow = function () {
                arrRemove_1.arrRemove(windows, window);
                window.complete();
                closingSubscription.unsubscribe();
            };
            var closingNotifier;
            try {
                closingNotifier = from_1.innerFrom(closingSelector(openValue));
            }
            catch (err) {
                handleError(err);
                return;
            }
            subscriber.next(window.asObservable());
            closingSubscription.add(closingNotifier.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, closeWindow, noop_1.noop, handleError)));
        }, noop_1.noop));
        source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
            var e_1, _a;
            var windowsCopy = windows.slice();
            try {
                for (var windowsCopy_1 = __values(windowsCopy), windowsCopy_1_1 = windowsCopy_1.next(); !windowsCopy_1_1.done; windowsCopy_1_1 = windowsCopy_1.next()) {
                    var window_1 = windowsCopy_1_1.value;
                    window_1.next(value);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (windowsCopy_1_1 && !windowsCopy_1_1.done && (_a = windowsCopy_1.return)) _a.call(windowsCopy_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }, function () {
            while (0 < windows.length) {
                windows.shift().complete();
            }
            subscriber.complete();
        }, handleError, function () {
            while (0 < windows.length) {
                windows.shift().unsubscribe();
            }
        }));
    });
}
exports.windowToggle = windowToggle;
//# sourceMappingURL=windowToggle.js.map

/***/ }),

/***/ 2645:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.windowWhen = void 0;
var Subject_1 = __nccwpck_require__(9944);
var lift_1 = __nccwpck_require__(8669);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
var from_1 = __nccwpck_require__(8309);
function windowWhen(closingSelector) {
    return lift_1.operate(function (source, subscriber) {
        var window;
        var closingSubscriber;
        var handleError = function (err) {
            window.error(err);
            subscriber.error(err);
        };
        var openWindow = function () {
            closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
            window === null || window === void 0 ? void 0 : window.complete();
            window = new Subject_1.Subject();
            subscriber.next(window.asObservable());
            var closingNotifier;
            try {
                closingNotifier = from_1.innerFrom(closingSelector());
            }
            catch (err) {
                handleError(err);
                return;
            }
            closingNotifier.subscribe((closingSubscriber = new OperatorSubscriber_1.OperatorSubscriber(subscriber, openWindow, openWindow, handleError)));
        };
        openWindow();
        source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) { return window.next(value); }, function () {
            window.complete();
            subscriber.complete();
        }, handleError, function () {
            closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
            window = null;
        }));
    });
}
exports.windowWhen = windowWhen;
//# sourceMappingURL=windowWhen.js.map

/***/ }),

/***/ 501:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.withLatestFrom = void 0;
var lift_1 = __nccwpck_require__(8669);
var OperatorSubscriber_1 = __nccwpck_require__(9549);
var from_1 = __nccwpck_require__(8309);
var identity_1 = __nccwpck_require__(283);
var noop_1 = __nccwpck_require__(1642);
var args_1 = __nccwpck_require__(4890);
function withLatestFrom() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    var project = args_1.popResultSelector(inputs);
    return lift_1.operate(function (source, subscriber) {
        var len = inputs.length;
        var otherValues = new Array(len);
        var hasValue = inputs.map(function () { return false; });
        var ready = false;
        var _loop_1 = function (i) {
            from_1.innerFrom(inputs[i]).subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
                otherValues[i] = value;
                if (!ready && !hasValue[i]) {
                    hasValue[i] = true;
                    (ready = hasValue.every(identity_1.identity)) && (hasValue = null);
                }
            }, noop_1.noop));
        };
        for (var i = 0; i < len; i++) {
            _loop_1(i);
        }
        source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
            if (ready) {
                var values = __spreadArray([value], __read(otherValues));
                subscriber.next(project ? project.apply(void 0, __spreadArray([], __read(values))) : values);
            }
        }));
    });
}
exports.withLatestFrom = withLatestFrom;
//# sourceMappingURL=withLatestFrom.js.map

/***/ }),

/***/ 7600:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.zip = void 0;
var zip_1 = __nccwpck_require__(2504);
var lift_1 = __nccwpck_require__(8669);
function zip() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    return lift_1.operate(function (source, subscriber) {
        zip_1.zip.apply(void 0, __spreadArray([source], __read(sources))).subscribe(subscriber);
    });
}
exports.zip = zip;
//# sourceMappingURL=zip.js.map

/***/ }),

/***/ 2335:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.zipAll = void 0;
var zip_1 = __nccwpck_require__(2504);
var joinAllInternals_1 = __nccwpck_require__(9341);
function zipAll(project) {
    return joinAllInternals_1.joinAllInternals(zip_1.zip, project);
}
exports.zipAll = zipAll;
//# sourceMappingURL=zipAll.js.map

/***/ }),

/***/ 5520:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.zipWith = void 0;
var zip_1 = __nccwpck_require__(7600);
function zipWith() {
    var otherInputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        otherInputs[_i] = arguments[_i];
    }
    return zip_1.zip.apply(void 0, __spreadArray([], __read(otherInputs)));
}
exports.zipWith = zipWith;
//# sourceMappingURL=zipWith.js.map

/***/ }),

/***/ 1348:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.scheduleArray = void 0;
var Observable_1 = __nccwpck_require__(3014);
function scheduleArray(input, scheduler) {
    return new Observable_1.Observable(function (subscriber) {
        var i = 0;
        return scheduler.schedule(function () {
            if (i === input.length) {
                subscriber.complete();
            }
            else {
                subscriber.next(input[i++]);
                if (!subscriber.closed) {
                    this.schedule();
                }
            }
        });
    });
}
exports.scheduleArray = scheduleArray;
//# sourceMappingURL=scheduleArray.js.map

/***/ }),

/***/ 5347:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.scheduleAsyncIterable = void 0;
var Observable_1 = __nccwpck_require__(3014);
var Subscription_1 = __nccwpck_require__(9548);
function scheduleAsyncIterable(input, scheduler) {
    if (!input) {
        throw new Error('Iterable cannot be null');
    }
    return new Observable_1.Observable(function (subscriber) {
        var sub = new Subscription_1.Subscription();
        sub.add(scheduler.schedule(function () {
            var iterator = input[Symbol.asyncIterator]();
            sub.add(scheduler.schedule(function () {
                var _this = this;
                iterator.next().then(function (result) {
                    if (result.done) {
                        subscriber.complete();
                    }
                    else {
                        subscriber.next(result.value);
                        _this.schedule();
                    }
                });
            }));
        }));
        return sub;
    });
}
exports.scheduleAsyncIterable = scheduleAsyncIterable;
//# sourceMappingURL=scheduleAsyncIterable.js.map

/***/ }),

/***/ 9461:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.scheduleIterable = void 0;
var Observable_1 = __nccwpck_require__(3014);
var iterator_1 = __nccwpck_require__(5517);
var isFunction_1 = __nccwpck_require__(7206);
var caughtSchedule_1 = __nccwpck_require__(3376);
function scheduleIterable(input, scheduler) {
    return new Observable_1.Observable(function (subscriber) {
        var iterator;
        subscriber.add(scheduler.schedule(function () {
            iterator = input[iterator_1.iterator]();
            caughtSchedule_1.caughtSchedule(subscriber, scheduler, function () {
                var _a = iterator.next(), value = _a.value, done = _a.done;
                if (done) {
                    subscriber.complete();
                }
                else {
                    subscriber.next(value);
                    this.schedule();
                }
            });
        }));
        return function () { return isFunction_1.isFunction(iterator === null || iterator === void 0 ? void 0 : iterator.return) && iterator.return(); };
    });
}
exports.scheduleIterable = scheduleIterable;
//# sourceMappingURL=scheduleIterable.js.map

/***/ }),

/***/ 7096:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.scheduleObservable = void 0;
var Observable_1 = __nccwpck_require__(3014);
var Subscription_1 = __nccwpck_require__(9548);
var observable_1 = __nccwpck_require__(7186);
function scheduleObservable(input, scheduler) {
    return new Observable_1.Observable(function (subscriber) {
        var sub = new Subscription_1.Subscription();
        sub.add(scheduler.schedule(function () {
            var observable = input[observable_1.observable]();
            sub.add(observable.subscribe({
                next: function (value) { sub.add(scheduler.schedule(function () { return subscriber.next(value); })); },
                error: function (err) { sub.add(scheduler.schedule(function () { return subscriber.error(err); })); },
                complete: function () { sub.add(scheduler.schedule(function () { return subscriber.complete(); })); },
            }));
        }));
        return sub;
    });
}
exports.scheduleObservable = scheduleObservable;
//# sourceMappingURL=scheduleObservable.js.map

/***/ }),

/***/ 4087:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.schedulePromise = void 0;
var Observable_1 = __nccwpck_require__(3014);
function schedulePromise(input, scheduler) {
    return new Observable_1.Observable(function (subscriber) {
        return scheduler.schedule(function () {
            return input.then(function (value) {
                subscriber.add(scheduler.schedule(function () {
                    subscriber.next(value);
                    subscriber.add(scheduler.schedule(function () { return subscriber.complete(); }));
                }));
            }, function (err) {
                subscriber.add(scheduler.schedule(function () { return subscriber.error(err); }));
            });
        });
    });
}
exports.schedulePromise = schedulePromise;
//# sourceMappingURL=schedulePromise.js.map

/***/ }),

/***/ 5967:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.scheduleReadableStreamLike = void 0;
var scheduleAsyncIterable_1 = __nccwpck_require__(5347);
var isReadableStreamLike_1 = __nccwpck_require__(9621);
function scheduleReadableStreamLike(input, scheduler) {
    return scheduleAsyncIterable_1.scheduleAsyncIterable(isReadableStreamLike_1.readableStreamLikeToAsyncGenerator(input), scheduler);
}
exports.scheduleReadableStreamLike = scheduleReadableStreamLike;
//# sourceMappingURL=scheduleReadableStreamLike.js.map

/***/ }),

/***/ 6151:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.scheduled = void 0;
var scheduleObservable_1 = __nccwpck_require__(7096);
var schedulePromise_1 = __nccwpck_require__(4087);
var scheduleArray_1 = __nccwpck_require__(1348);
var scheduleIterable_1 = __nccwpck_require__(9461);
var scheduleAsyncIterable_1 = __nccwpck_require__(5347);
var isInteropObservable_1 = __nccwpck_require__(7984);
var isPromise_1 = __nccwpck_require__(5585);
var isArrayLike_1 = __nccwpck_require__(4461);
var isIterable_1 = __nccwpck_require__(4292);
var isAsyncIterable_1 = __nccwpck_require__(4408);
var throwUnobservableError_1 = __nccwpck_require__(7364);
var isReadableStreamLike_1 = __nccwpck_require__(9621);
var scheduleReadableStreamLike_1 = __nccwpck_require__(5967);
function scheduled(input, scheduler) {
    if (input != null) {
        if (isInteropObservable_1.isInteropObservable(input)) {
            return scheduleObservable_1.scheduleObservable(input, scheduler);
        }
        if (isArrayLike_1.isArrayLike(input)) {
            return scheduleArray_1.scheduleArray(input, scheduler);
        }
        if (isPromise_1.isPromise(input)) {
            return schedulePromise_1.schedulePromise(input, scheduler);
        }
        if (isAsyncIterable_1.isAsyncIterable(input)) {
            return scheduleAsyncIterable_1.scheduleAsyncIterable(input, scheduler);
        }
        if (isIterable_1.isIterable(input)) {
            return scheduleIterable_1.scheduleIterable(input, scheduler);
        }
        if (isReadableStreamLike_1.isReadableStreamLike(input)) {
            return scheduleReadableStreamLike_1.scheduleReadableStreamLike(input, scheduler);
        }
    }
    throw throwUnobservableError_1.createInvalidObservableTypeError(input);
}
exports.scheduled = scheduled;
//# sourceMappingURL=scheduled.js.map

/***/ }),

/***/ 3848:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Action = void 0;
var Subscription_1 = __nccwpck_require__(9548);
var Action = (function (_super) {
    __extends(Action, _super);
    function Action(scheduler, work) {
        return _super.call(this) || this;
    }
    Action.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        return this;
    };
    return Action;
}(Subscription_1.Subscription));
exports.Action = Action;
//# sourceMappingURL=Action.js.map

/***/ }),

/***/ 5991:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnimationFrameAction = void 0;
var AsyncAction_1 = __nccwpck_require__(3280);
var animationFrameProvider_1 = __nccwpck_require__(2738);
var AnimationFrameAction = (function (_super) {
    __extends(AnimationFrameAction, _super);
    function AnimationFrameAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
    }
    AnimationFrameAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        if (delay !== null && delay > 0) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        scheduler.actions.push(this);
        return scheduler._scheduled || (scheduler._scheduled = animationFrameProvider_1.animationFrameProvider.requestAnimationFrame(function () { return scheduler.flush(undefined); }));
    };
    AnimationFrameAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        if ((delay != null && delay > 0) || (delay == null && this.delay > 0)) {
            return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
        }
        if (scheduler.actions.length === 0) {
            animationFrameProvider_1.animationFrameProvider.cancelAnimationFrame(id);
            scheduler._scheduled = undefined;
        }
        return undefined;
    };
    return AnimationFrameAction;
}(AsyncAction_1.AsyncAction));
exports.AnimationFrameAction = AnimationFrameAction;
//# sourceMappingURL=AnimationFrameAction.js.map

/***/ }),

/***/ 8768:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnimationFrameScheduler = void 0;
var AsyncScheduler_1 = __nccwpck_require__(1673);
var AnimationFrameScheduler = (function (_super) {
    __extends(AnimationFrameScheduler, _super);
    function AnimationFrameScheduler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnimationFrameScheduler.prototype.flush = function (action) {
        this._active = true;
        this._scheduled = undefined;
        var actions = this.actions;
        var error;
        var index = -1;
        action = action || actions.shift();
        var count = actions.length;
        do {
            if ((error = action.execute(action.state, action.delay))) {
                break;
            }
        } while (++index < count && (action = actions.shift()));
        this._active = false;
        if (error) {
            while (++index < count && (action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AnimationFrameScheduler;
}(AsyncScheduler_1.AsyncScheduler));
exports.AnimationFrameScheduler = AnimationFrameScheduler;
//# sourceMappingURL=AnimationFrameScheduler.js.map

/***/ }),

/***/ 2424:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AsapAction = void 0;
var AsyncAction_1 = __nccwpck_require__(3280);
var immediateProvider_1 = __nccwpck_require__(3475);
var AsapAction = (function (_super) {
    __extends(AsapAction, _super);
    function AsapAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
    }
    AsapAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        if (delay !== null && delay > 0) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        scheduler.actions.push(this);
        return scheduler._scheduled || (scheduler._scheduled = immediateProvider_1.immediateProvider.setImmediate(scheduler.flush.bind(scheduler, undefined)));
    };
    AsapAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        if ((delay != null && delay > 0) || (delay == null && this.delay > 0)) {
            return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
        }
        if (scheduler.actions.length === 0) {
            immediateProvider_1.immediateProvider.clearImmediate(id);
            scheduler._scheduled = undefined;
        }
        return undefined;
    };
    return AsapAction;
}(AsyncAction_1.AsyncAction));
exports.AsapAction = AsapAction;
//# sourceMappingURL=AsapAction.js.map

/***/ }),

/***/ 6641:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AsapScheduler = void 0;
var AsyncScheduler_1 = __nccwpck_require__(1673);
var AsapScheduler = (function (_super) {
    __extends(AsapScheduler, _super);
    function AsapScheduler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AsapScheduler.prototype.flush = function (action) {
        this._active = true;
        this._scheduled = undefined;
        var actions = this.actions;
        var error;
        var index = -1;
        action = action || actions.shift();
        var count = actions.length;
        do {
            if ((error = action.execute(action.state, action.delay))) {
                break;
            }
        } while (++index < count && (action = actions.shift()));
        this._active = false;
        if (error) {
            while (++index < count && (action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsapScheduler;
}(AsyncScheduler_1.AsyncScheduler));
exports.AsapScheduler = AsapScheduler;
//# sourceMappingURL=AsapScheduler.js.map

/***/ }),

/***/ 3280:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AsyncAction = void 0;
var Action_1 = __nccwpck_require__(3848);
var intervalProvider_1 = __nccwpck_require__(5341);
var arrRemove_1 = __nccwpck_require__(8499);
var AsyncAction = (function (_super) {
    __extends(AsyncAction, _super);
    function AsyncAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        _this.pending = false;
        return _this;
    }
    AsyncAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (this.closed) {
            return this;
        }
        this.state = state;
        var id = this.id;
        var scheduler = this.scheduler;
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, delay);
        }
        this.pending = true;
        this.delay = delay;
        this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
        return this;
    };
    AsyncAction.prototype.requestAsyncId = function (scheduler, _id, delay) {
        if (delay === void 0) { delay = 0; }
        return intervalProvider_1.intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay);
    };
    AsyncAction.prototype.recycleAsyncId = function (_scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        if (delay != null && this.delay === delay && this.pending === false) {
            return id;
        }
        intervalProvider_1.intervalProvider.clearInterval(id);
        return undefined;
    };
    AsyncAction.prototype.execute = function (state, delay) {
        if (this.closed) {
            return new Error('executing a cancelled action');
        }
        this.pending = false;
        var error = this._execute(state, delay);
        if (error) {
            return error;
        }
        else if (this.pending === false && this.id != null) {
            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
        }
    };
    AsyncAction.prototype._execute = function (state, _delay) {
        var errored = false;
        var errorValue;
        try {
            this.work(state);
        }
        catch (e) {
            errored = true;
            errorValue = (!!e && e) || new Error(e);
        }
        if (errored) {
            this.unsubscribe();
            return errorValue;
        }
    };
    AsyncAction.prototype.unsubscribe = function () {
        if (!this.closed) {
            var _a = this, id = _a.id, scheduler = _a.scheduler;
            var actions = scheduler.actions;
            this.work = this.state = this.scheduler = null;
            this.pending = false;
            arrRemove_1.arrRemove(actions, this);
            if (id != null) {
                this.id = this.recycleAsyncId(scheduler, id, null);
            }
            this.delay = null;
            _super.prototype.unsubscribe.call(this);
        }
    };
    return AsyncAction;
}(Action_1.Action));
exports.AsyncAction = AsyncAction;
//# sourceMappingURL=AsyncAction.js.map

/***/ }),

/***/ 1673:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AsyncScheduler = void 0;
var Scheduler_1 = __nccwpck_require__(6243);
var AsyncScheduler = (function (_super) {
    __extends(AsyncScheduler, _super);
    function AsyncScheduler(SchedulerAction, now) {
        if (now === void 0) { now = Scheduler_1.Scheduler.now; }
        var _this = _super.call(this, SchedulerAction, now) || this;
        _this.actions = [];
        _this._active = false;
        _this._scheduled = undefined;
        return _this;
    }
    AsyncScheduler.prototype.flush = function (action) {
        var actions = this.actions;
        if (this._active) {
            actions.push(action);
            return;
        }
        var error;
        this._active = true;
        do {
            if ((error = action.execute(action.state, action.delay))) {
                break;
            }
        } while ((action = actions.shift()));
        this._active = false;
        if (error) {
            while ((action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsyncScheduler;
}(Scheduler_1.Scheduler));
exports.AsyncScheduler = AsyncScheduler;
//# sourceMappingURL=AsyncScheduler.js.map

/***/ }),

/***/ 2161:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QueueAction = void 0;
var AsyncAction_1 = __nccwpck_require__(3280);
var QueueAction = (function (_super) {
    __extends(QueueAction, _super);
    function QueueAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
    }
    QueueAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (delay > 0) {
            return _super.prototype.schedule.call(this, state, delay);
        }
        this.delay = delay;
        this.state = state;
        this.scheduler.flush(this);
        return this;
    };
    QueueAction.prototype.execute = function (state, delay) {
        return (delay > 0 || this.closed) ?
            _super.prototype.execute.call(this, state, delay) :
            this._execute(state, delay);
    };
    QueueAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        if ((delay != null && delay > 0) || (delay == null && this.delay > 0)) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        return scheduler.flush(this);
    };
    return QueueAction;
}(AsyncAction_1.AsyncAction));
exports.QueueAction = QueueAction;
//# sourceMappingURL=QueueAction.js.map

/***/ }),

/***/ 8527:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QueueScheduler = void 0;
var AsyncScheduler_1 = __nccwpck_require__(1673);
var QueueScheduler = (function (_super) {
    __extends(QueueScheduler, _super);
    function QueueScheduler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return QueueScheduler;
}(AsyncScheduler_1.AsyncScheduler));
exports.QueueScheduler = QueueScheduler;
//# sourceMappingURL=QueueScheduler.js.map

/***/ }),

/***/ 5348:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VirtualAction = exports.VirtualTimeScheduler = void 0;
var AsyncAction_1 = __nccwpck_require__(3280);
var Subscription_1 = __nccwpck_require__(9548);
var AsyncScheduler_1 = __nccwpck_require__(1673);
var VirtualTimeScheduler = (function (_super) {
    __extends(VirtualTimeScheduler, _super);
    function VirtualTimeScheduler(schedulerActionCtor, maxFrames) {
        if (schedulerActionCtor === void 0) { schedulerActionCtor = VirtualAction; }
        if (maxFrames === void 0) { maxFrames = Infinity; }
        var _this = _super.call(this, schedulerActionCtor, function () { return _this.frame; }) || this;
        _this.maxFrames = maxFrames;
        _this.frame = 0;
        _this.index = -1;
        return _this;
    }
    VirtualTimeScheduler.prototype.flush = function () {
        var _a = this, actions = _a.actions, maxFrames = _a.maxFrames;
        var error;
        var action;
        while ((action = actions[0]) && action.delay <= maxFrames) {
            actions.shift();
            this.frame = action.delay;
            if ((error = action.execute(action.state, action.delay))) {
                break;
            }
        }
        if (error) {
            while ((action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    VirtualTimeScheduler.frameTimeFactor = 10;
    return VirtualTimeScheduler;
}(AsyncScheduler_1.AsyncScheduler));
exports.VirtualTimeScheduler = VirtualTimeScheduler;
var VirtualAction = (function (_super) {
    __extends(VirtualAction, _super);
    function VirtualAction(scheduler, work, index) {
        if (index === void 0) { index = (scheduler.index += 1); }
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        _this.index = index;
        _this.active = true;
        _this.index = scheduler.index = index;
        return _this;
    }
    VirtualAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (Number.isFinite(delay)) {
            if (!this.id) {
                return _super.prototype.schedule.call(this, state, delay);
            }
            this.active = false;
            var action = new VirtualAction(this.scheduler, this.work);
            this.add(action);
            return action.schedule(state, delay);
        }
        else {
            return Subscription_1.Subscription.EMPTY;
        }
    };
    VirtualAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        this.delay = scheduler.frame + delay;
        var actions = scheduler.actions;
        actions.push(this);
        actions.sort(VirtualAction.sortActions);
        return true;
    };
    VirtualAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        return undefined;
    };
    VirtualAction.prototype._execute = function (state, delay) {
        if (this.active === true) {
            return _super.prototype._execute.call(this, state, delay);
        }
    };
    VirtualAction.sortActions = function (a, b) {
        if (a.delay === b.delay) {
            if (a.index === b.index) {
                return 0;
            }
            else if (a.index > b.index) {
                return 1;
            }
            else {
                return -1;
            }
        }
        else if (a.delay > b.delay) {
            return 1;
        }
        else {
            return -1;
        }
    };
    return VirtualAction;
}(AsyncAction_1.AsyncAction));
exports.VirtualAction = VirtualAction;
//# sourceMappingURL=VirtualTimeScheduler.js.map

/***/ }),

/***/ 1359:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.animationFrame = exports.animationFrameScheduler = void 0;
var AnimationFrameAction_1 = __nccwpck_require__(5991);
var AnimationFrameScheduler_1 = __nccwpck_require__(8768);
exports.animationFrameScheduler = new AnimationFrameScheduler_1.AnimationFrameScheduler(AnimationFrameAction_1.AnimationFrameAction);
exports.animationFrame = exports.animationFrameScheduler;
//# sourceMappingURL=animationFrame.js.map

/***/ }),

/***/ 2738:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.animationFrameProvider = void 0;
var Subscription_1 = __nccwpck_require__(9548);
exports.animationFrameProvider = {
    schedule: function (callback) {
        var request = requestAnimationFrame;
        var cancel = cancelAnimationFrame;
        var delegate = exports.animationFrameProvider.delegate;
        if (delegate) {
            request = delegate.requestAnimationFrame;
            cancel = delegate.cancelAnimationFrame;
        }
        var handle = request(function (timestamp) {
            cancel = undefined;
            callback(timestamp);
        });
        return new Subscription_1.Subscription(function () { return cancel === null || cancel === void 0 ? void 0 : cancel(handle); });
    },
    requestAnimationFrame: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var delegate = exports.animationFrameProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.requestAnimationFrame) || requestAnimationFrame).apply(void 0, __spreadArray([], __read(args)));
    },
    cancelAnimationFrame: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var delegate = exports.animationFrameProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.cancelAnimationFrame) || cancelAnimationFrame).apply(void 0, __spreadArray([], __read(args)));
    },
    delegate: undefined,
};
//# sourceMappingURL=animationFrameProvider.js.map

/***/ }),

/***/ 3905:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.asap = exports.asapScheduler = void 0;
var AsapAction_1 = __nccwpck_require__(2424);
var AsapScheduler_1 = __nccwpck_require__(6641);
exports.asapScheduler = new AsapScheduler_1.AsapScheduler(AsapAction_1.AsapAction);
exports.asap = exports.asapScheduler;
//# sourceMappingURL=asap.js.map

/***/ }),

/***/ 6072:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.async = exports.asyncScheduler = void 0;
var AsyncAction_1 = __nccwpck_require__(3280);
var AsyncScheduler_1 = __nccwpck_require__(1673);
exports.asyncScheduler = new AsyncScheduler_1.AsyncScheduler(AsyncAction_1.AsyncAction);
exports.async = exports.asyncScheduler;
//# sourceMappingURL=async.js.map

/***/ }),

/***/ 1395:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.dateTimestampProvider = void 0;
exports.dateTimestampProvider = {
    now: function () {
        return (exports.dateTimestampProvider.delegate || Date).now();
    },
    delegate: undefined,
};
//# sourceMappingURL=dateTimestampProvider.js.map

/***/ }),

/***/ 3475:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.immediateProvider = void 0;
var Immediate_1 = __nccwpck_require__(3555);
var setImmediate = Immediate_1.Immediate.setImmediate, clearImmediate = Immediate_1.Immediate.clearImmediate;
exports.immediateProvider = {
    setImmediate: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var delegate = exports.immediateProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.setImmediate) || setImmediate).apply(void 0, __spreadArray([], __read(args)));
    },
    clearImmediate: function (handle) {
        var delegate = exports.immediateProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearImmediate) || clearImmediate)(handle);
    },
    delegate: undefined,
};
//# sourceMappingURL=immediateProvider.js.map

/***/ }),

/***/ 5341:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.intervalProvider = void 0;
exports.intervalProvider = {
    setInterval: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var delegate = exports.intervalProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.setInterval) || setInterval).apply(void 0, __spreadArray([], __read(args)));
    },
    clearInterval: function (handle) {
        var delegate = exports.intervalProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearInterval) || clearInterval)(handle);
    },
    delegate: undefined,
};
//# sourceMappingURL=intervalProvider.js.map

/***/ }),

/***/ 143:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.performanceTimestampProvider = void 0;
exports.performanceTimestampProvider = {
    now: function () {
        return (exports.performanceTimestampProvider.delegate || performance).now();
    },
    delegate: undefined,
};
//# sourceMappingURL=performanceTimestampProvider.js.map

/***/ }),

/***/ 2059:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.queue = exports.queueScheduler = void 0;
var QueueAction_1 = __nccwpck_require__(2161);
var QueueScheduler_1 = __nccwpck_require__(8527);
exports.queueScheduler = new QueueScheduler_1.QueueScheduler(QueueAction_1.QueueAction);
exports.queue = exports.queueScheduler;
//# sourceMappingURL=queue.js.map

/***/ }),

/***/ 1613:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.timeoutProvider = void 0;
exports.timeoutProvider = {
    setTimeout: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var delegate = exports.timeoutProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) || setTimeout).apply(void 0, __spreadArray([], __read(args)));
    },
    clearTimeout: function (handle) {
        var delegate = exports.timeoutProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
    },
    delegate: undefined,
};
//# sourceMappingURL=timeoutProvider.js.map

/***/ }),

/***/ 5517:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.iterator = exports.getSymbolIterator = void 0;
function getSymbolIterator() {
    if (typeof Symbol !== 'function' || !Symbol.iterator) {
        return '@@iterator';
    }
    return Symbol.iterator;
}
exports.getSymbolIterator = getSymbolIterator;
exports.iterator = getSymbolIterator();
//# sourceMappingURL=iterator.js.map

/***/ }),

/***/ 7186:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.observable = void 0;
exports.observable = (function () { return (typeof Symbol === 'function' && Symbol.observable) || '@@observable'; })();
//# sourceMappingURL=observable.js.map

/***/ }),

/***/ 6639:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=types.js.map

/***/ }),

/***/ 9796:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ArgumentOutOfRangeError = void 0;
var createErrorClass_1 = __nccwpck_require__(8858);
exports.ArgumentOutOfRangeError = createErrorClass_1.createErrorClass(function (_super) {
    return function ArgumentOutOfRangeErrorImpl() {
        _super(this);
        this.name = 'ArgumentOutOfRangeError';
        this.message = 'argument out of range';
    };
});
//# sourceMappingURL=ArgumentOutOfRangeError.js.map

/***/ }),

/***/ 9391:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmptyError = void 0;
var createErrorClass_1 = __nccwpck_require__(8858);
exports.EmptyError = createErrorClass_1.createErrorClass(function (_super) { return function EmptyErrorImpl() {
    _super(this);
    this.name = 'EmptyError';
    this.message = 'no elements in sequence';
}; });
//# sourceMappingURL=EmptyError.js.map

/***/ }),

/***/ 3555:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TestTools = exports.Immediate = void 0;
var nextHandle = 1;
var resolved;
var activeHandles = {};
function findAndClearHandle(handle) {
    if (handle in activeHandles) {
        delete activeHandles[handle];
        return true;
    }
    return false;
}
exports.Immediate = {
    setImmediate: function (cb) {
        var handle = nextHandle++;
        activeHandles[handle] = true;
        if (!resolved) {
            resolved = Promise.resolve();
        }
        resolved.then(function () { return findAndClearHandle(handle) && cb(); });
        return handle;
    },
    clearImmediate: function (handle) {
        findAndClearHandle(handle);
    },
};
exports.TestTools = {
    pending: function () {
        return Object.keys(activeHandles).length;
    }
};
//# sourceMappingURL=Immediate.js.map

/***/ }),

/***/ 4431:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotFoundError = void 0;
var createErrorClass_1 = __nccwpck_require__(8858);
exports.NotFoundError = createErrorClass_1.createErrorClass(function (_super) {
    return function NotFoundErrorImpl(message) {
        _super(this);
        this.name = 'NotFoundError';
        this.message = message;
    };
});
//# sourceMappingURL=NotFoundError.js.map

/***/ }),

/***/ 5266:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ObjectUnsubscribedError = void 0;
var createErrorClass_1 = __nccwpck_require__(8858);
exports.ObjectUnsubscribedError = createErrorClass_1.createErrorClass(function (_super) {
    return function ObjectUnsubscribedErrorImpl() {
        _super(this);
        this.name = 'ObjectUnsubscribedError';
        this.message = 'object unsubscribed';
    };
});
//# sourceMappingURL=ObjectUnsubscribedError.js.map

/***/ }),

/***/ 9048:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SequenceError = void 0;
var createErrorClass_1 = __nccwpck_require__(8858);
exports.SequenceError = createErrorClass_1.createErrorClass(function (_super) {
    return function SequenceErrorImpl(message) {
        _super(this);
        this.name = 'SequenceError';
        this.message = message;
    };
});
//# sourceMappingURL=SequenceError.js.map

/***/ }),

/***/ 6776:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UnsubscriptionError = void 0;
var createErrorClass_1 = __nccwpck_require__(8858);
exports.UnsubscriptionError = createErrorClass_1.createErrorClass(function (_super) {
    return function UnsubscriptionErrorImpl(errors) {
        _super(this);
        this.message = errors
            ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ')
            : '';
        this.name = 'UnsubscriptionError';
        this.errors = errors;
    };
});
//# sourceMappingURL=UnsubscriptionError.js.map

/***/ }),

/***/ 4890:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.popNumber = exports.popScheduler = exports.popResultSelector = void 0;
var isFunction_1 = __nccwpck_require__(7206);
var isScheduler_1 = __nccwpck_require__(4078);
function last(arr) {
    return arr[arr.length - 1];
}
function popResultSelector(args) {
    return isFunction_1.isFunction(last(args)) ? args.pop() : undefined;
}
exports.popResultSelector = popResultSelector;
function popScheduler(args) {
    return isScheduler_1.isScheduler(last(args)) ? args.pop() : undefined;
}
exports.popScheduler = popScheduler;
function popNumber(args, defaultValue) {
    return typeof last(args) === 'number' ? args.pop() : defaultValue;
}
exports.popNumber = popNumber;
//# sourceMappingURL=args.js.map

/***/ }),

/***/ 2920:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.argsArgArrayOrObject = void 0;
var isArray = Array.isArray;
var getPrototypeOf = Object.getPrototypeOf, objectProto = Object.prototype, getKeys = Object.keys;
function argsArgArrayOrObject(args) {
    if (args.length === 1) {
        var first_1 = args[0];
        if (isArray(first_1)) {
            return { args: first_1, keys: null };
        }
        if (isPOJO(first_1)) {
            var keys = getKeys(first_1);
            return {
                args: keys.map(function (key) { return first_1[key]; }),
                keys: keys,
            };
        }
    }
    return { args: args, keys: null };
}
exports.argsArgArrayOrObject = argsArgArrayOrObject;
function isPOJO(obj) {
    return obj && typeof obj === 'object' && getPrototypeOf(obj) === objectProto;
}
//# sourceMappingURL=argsArgArrayOrObject.js.map

/***/ }),

/***/ 8824:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.argsOrArgArray = void 0;
var isArray = Array.isArray;
function argsOrArgArray(args) {
    return args.length === 1 && isArray(args[0]) ? args[0] : args;
}
exports.argsOrArgArray = argsOrArgArray;
//# sourceMappingURL=argsOrArgArray.js.map

/***/ }),

/***/ 8499:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.arrRemove = void 0;
function arrRemove(arr, item) {
    if (arr) {
        var index = arr.indexOf(item);
        0 <= index && arr.splice(index, 1);
    }
}
exports.arrRemove = arrRemove;
//# sourceMappingURL=arrRemove.js.map

/***/ }),

/***/ 3376:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.caughtSchedule = void 0;
function caughtSchedule(subscriber, scheduler, execute, delay) {
    if (delay === void 0) { delay = 0; }
    var subscription = scheduler.schedule(function () {
        try {
            execute.call(this);
        }
        catch (err) {
            subscriber.error(err);
        }
    }, delay);
    subscriber.add(subscription);
    return subscription;
}
exports.caughtSchedule = caughtSchedule;
//# sourceMappingURL=caughtSchedule.js.map

/***/ }),

/***/ 8858:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createErrorClass = void 0;
function createErrorClass(createImpl) {
    var _super = function (instance) {
        Error.call(instance);
        instance.stack = new Error().stack;
    };
    var ctorFunc = createImpl(_super);
    ctorFunc.prototype = Object.create(Error.prototype);
    ctorFunc.prototype.constructor = ctorFunc;
    return ctorFunc;
}
exports.createErrorClass = createErrorClass;
//# sourceMappingURL=createErrorClass.js.map

/***/ }),

/***/ 7834:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createObject = void 0;
function createObject(keys, values) {
    return keys.reduce(function (result, key, i) { return ((result[key] = values[i]), result); }, {});
}
exports.createObject = createObject;
//# sourceMappingURL=createObject.js.map

/***/ }),

/***/ 1199:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.captureError = exports.errorContext = void 0;
var config_1 = __nccwpck_require__(2233);
var context = null;
function errorContext(cb) {
    if (config_1.config.useDeprecatedSynchronousErrorHandling) {
        var isRoot = !context;
        if (isRoot) {
            context = { errorThrown: false, error: null };
        }
        cb();
        if (isRoot) {
            var _a = context, errorThrown = _a.errorThrown, error = _a.error;
            context = null;
            if (errorThrown) {
                throw error;
            }
        }
    }
    else {
        cb();
    }
}
exports.errorContext = errorContext;
function captureError(err) {
    if (config_1.config.useDeprecatedSynchronousErrorHandling && context) {
        context.errorThrown = true;
        context.error = err;
    }
}
exports.captureError = captureError;
//# sourceMappingURL=errorContext.js.map

/***/ }),

/***/ 283:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.identity = void 0;
function identity(x) {
    return x;
}
exports.identity = identity;
//# sourceMappingURL=identity.js.map

/***/ }),

/***/ 4461:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isArrayLike = void 0;
exports.isArrayLike = (function (x) { return x && typeof x.length === 'number' && typeof x !== 'function'; });
//# sourceMappingURL=isArrayLike.js.map

/***/ }),

/***/ 4408:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isAsyncIterable = void 0;
var isFunction_1 = __nccwpck_require__(7206);
function isAsyncIterable(obj) {
    return Symbol.asyncIterator && isFunction_1.isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
}
exports.isAsyncIterable = isAsyncIterable;
//# sourceMappingURL=isAsyncIterable.js.map

/***/ }),

/***/ 935:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isValidDate = void 0;
function isValidDate(value) {
    return value instanceof Date && !isNaN(value);
}
exports.isValidDate = isValidDate;
//# sourceMappingURL=isDate.js.map

/***/ }),

/***/ 7206:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isFunction = void 0;
function isFunction(value) {
    return typeof value === 'function';
}
exports.isFunction = isFunction;
//# sourceMappingURL=isFunction.js.map

/***/ }),

/***/ 7984:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isInteropObservable = void 0;
var observable_1 = __nccwpck_require__(7186);
var isFunction_1 = __nccwpck_require__(7206);
function isInteropObservable(input) {
    return isFunction_1.isFunction(input[observable_1.observable]);
}
exports.isInteropObservable = isInteropObservable;
//# sourceMappingURL=isInteropObservable.js.map

/***/ }),

/***/ 4292:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isIterable = void 0;
var iterator_1 = __nccwpck_require__(5517);
var isFunction_1 = __nccwpck_require__(7206);
function isIterable(input) {
    return isFunction_1.isFunction(input === null || input === void 0 ? void 0 : input[iterator_1.iterator]);
}
exports.isIterable = isIterable;
//# sourceMappingURL=isIterable.js.map

/***/ }),

/***/ 2259:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isObservable = void 0;
var Observable_1 = __nccwpck_require__(3014);
var isFunction_1 = __nccwpck_require__(7206);
function isObservable(obj) {
    return !!obj && (obj instanceof Observable_1.Observable || (isFunction_1.isFunction(obj.lift) && isFunction_1.isFunction(obj.subscribe)));
}
exports.isObservable = isObservable;
//# sourceMappingURL=isObservable.js.map

/***/ }),

/***/ 5585:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isPromise = void 0;
var isFunction_1 = __nccwpck_require__(7206);
function isPromise(value) {
    return isFunction_1.isFunction(value === null || value === void 0 ? void 0 : value.then);
}
exports.isPromise = isPromise;
//# sourceMappingURL=isPromise.js.map

/***/ }),

/***/ 9621:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isReadableStreamLike = exports.readableStreamLikeToAsyncGenerator = void 0;
var isFunction_1 = __nccwpck_require__(7206);
function readableStreamLikeToAsyncGenerator(readableStream) {
    return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
        var reader, _a, value, done;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    reader = readableStream.getReader();
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, , 9, 10]);
                    _b.label = 2;
                case 2:
                    if (false) {}
                    return [4, __await(reader.read())];
                case 3:
                    _a = _b.sent(), value = _a.value, done = _a.done;
                    if (!done) return [3, 5];
                    return [4, __await(void 0)];
                case 4: return [2, _b.sent()];
                case 5: return [4, __await(value)];
                case 6: return [4, _b.sent()];
                case 7:
                    _b.sent();
                    return [3, 2];
                case 8: return [3, 10];
                case 9:
                    reader.releaseLock();
                    return [7];
                case 10: return [2];
            }
        });
    });
}
exports.readableStreamLikeToAsyncGenerator = readableStreamLikeToAsyncGenerator;
function isReadableStreamLike(obj) {
    return isFunction_1.isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
}
exports.isReadableStreamLike = isReadableStreamLike;
//# sourceMappingURL=isReadableStreamLike.js.map

/***/ }),

/***/ 4078:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isScheduler = void 0;
var isFunction_1 = __nccwpck_require__(7206);
function isScheduler(value) {
    return value && isFunction_1.isFunction(value.schedule);
}
exports.isScheduler = isScheduler;
//# sourceMappingURL=isScheduler.js.map

/***/ }),

/***/ 8669:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.operate = exports.hasLift = void 0;
var isFunction_1 = __nccwpck_require__(7206);
function hasLift(source) {
    return isFunction_1.isFunction(source === null || source === void 0 ? void 0 : source.lift);
}
exports.hasLift = hasLift;
function operate(init) {
    return function (source) {
        if (hasLift(source)) {
            return source.lift(function (liftedSource) {
                try {
                    return init(liftedSource, this);
                }
                catch (err) {
                    this.error(err);
                }
            });
        }
        throw new TypeError('Unable to lift unknown Observable type');
    };
}
exports.operate = operate;
//# sourceMappingURL=lift.js.map

/***/ }),

/***/ 8934:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mapOneOrManyArgs = void 0;
var map_1 = __nccwpck_require__(5987);
var isArray = Array.isArray;
function callOrApply(fn, args) {
    return isArray(args) ? fn.apply(void 0, __spreadArray([], __read(args))) : fn(args);
}
function mapOneOrManyArgs(fn) {
    return map_1.map(function (args) { return callOrApply(fn, args); });
}
exports.mapOneOrManyArgs = mapOneOrManyArgs;
//# sourceMappingURL=mapOneOrManyArgs.js.map

/***/ }),

/***/ 1642:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.noop = void 0;
function noop() { }
exports.noop = noop;
//# sourceMappingURL=noop.js.map

/***/ }),

/***/ 4338:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.not = void 0;
function not(pred, thisArg) {
    return function (value, index) { return !pred.call(thisArg, value, index); };
}
exports.not = not;
//# sourceMappingURL=not.js.map

/***/ }),

/***/ 9587:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.pipeFromArray = exports.pipe = void 0;
var identity_1 = __nccwpck_require__(283);
function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return pipeFromArray(fns);
}
exports.pipe = pipe;
function pipeFromArray(fns) {
    if (fns.length === 0) {
        return identity_1.identity;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}
exports.pipeFromArray = pipeFromArray;
//# sourceMappingURL=pipe.js.map

/***/ }),

/***/ 2445:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.reportUnhandledError = void 0;
var config_1 = __nccwpck_require__(2233);
var timeoutProvider_1 = __nccwpck_require__(1613);
function reportUnhandledError(err) {
    timeoutProvider_1.timeoutProvider.setTimeout(function () {
        var onUnhandledError = config_1.config.onUnhandledError;
        if (onUnhandledError) {
            onUnhandledError(err);
        }
        else {
            throw err;
        }
    });
}
exports.reportUnhandledError = reportUnhandledError;
//# sourceMappingURL=reportUnhandledError.js.map

/***/ }),

/***/ 7364:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createInvalidObservableTypeError = void 0;
function createInvalidObservableTypeError(input) {
    return new TypeError("You provided " + (input !== null && typeof input === 'object' ? 'an invalid object' : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
exports.createInvalidObservableTypeError = createInvalidObservableTypeError;
//# sourceMappingURL=throwUnobservableError.js.map

/***/ }),

/***/ 749:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mergeAll = exports.merge = exports.max = exports.materialize = exports.mapTo = exports.map = exports.last = exports.isEmpty = exports.ignoreElements = exports.groupBy = exports.first = exports.findIndex = exports.find = exports.finalize = exports.filter = exports.expand = exports.exhaustMap = exports.exhaustAll = exports.exhaust = exports.every = exports.endWith = exports.elementAt = exports.distinctUntilKeyChanged = exports.distinctUntilChanged = exports.distinct = exports.dematerialize = exports.delayWhen = exports.delay = exports.defaultIfEmpty = exports.debounceTime = exports.debounce = exports.count = exports.connect = exports.concatWith = exports.concatMapTo = exports.concatMap = exports.concatAll = exports.concat = exports.combineLatestWith = exports.combineLatest = exports.combineLatestAll = exports.combineAll = exports.catchError = exports.bufferWhen = exports.bufferToggle = exports.bufferTime = exports.bufferCount = exports.buffer = exports.auditTime = exports.audit = void 0;
exports.timeInterval = exports.throwIfEmpty = exports.throttleTime = exports.throttle = exports.tap = exports.takeWhile = exports.takeUntil = exports.takeLast = exports.take = exports.switchScan = exports.switchMapTo = exports.switchMap = exports.switchAll = exports.subscribeOn = exports.startWith = exports.skipWhile = exports.skipUntil = exports.skipLast = exports.skip = exports.single = exports.shareReplay = exports.share = exports.sequenceEqual = exports.scan = exports.sampleTime = exports.sample = exports.refCount = exports.retryWhen = exports.retry = exports.repeatWhen = exports.repeat = exports.reduce = exports.raceWith = exports.race = exports.publishReplay = exports.publishLast = exports.publishBehavior = exports.publish = exports.pluck = exports.partition = exports.pairwise = exports.onErrorResumeNext = exports.observeOn = exports.multicast = exports.min = exports.mergeWith = exports.mergeScan = exports.mergeMapTo = exports.mergeMap = exports.flatMap = void 0;
exports.zipWith = exports.zipAll = exports.zip = exports.withLatestFrom = exports.windowWhen = exports.windowToggle = exports.windowTime = exports.windowCount = exports.window = exports.toArray = exports.timestamp = exports.timeoutWith = exports.timeout = void 0;
var audit_1 = __nccwpck_require__(2704);
Object.defineProperty(exports, "audit", ({ enumerable: true, get: function () { return audit_1.audit; } }));
var auditTime_1 = __nccwpck_require__(8780);
Object.defineProperty(exports, "auditTime", ({ enumerable: true, get: function () { return auditTime_1.auditTime; } }));
var buffer_1 = __nccwpck_require__(4253);
Object.defineProperty(exports, "buffer", ({ enumerable: true, get: function () { return buffer_1.buffer; } }));
var bufferCount_1 = __nccwpck_require__(7253);
Object.defineProperty(exports, "bufferCount", ({ enumerable: true, get: function () { return bufferCount_1.bufferCount; } }));
var bufferTime_1 = __nccwpck_require__(3102);
Object.defineProperty(exports, "bufferTime", ({ enumerable: true, get: function () { return bufferTime_1.bufferTime; } }));
var bufferToggle_1 = __nccwpck_require__(3781);
Object.defineProperty(exports, "bufferToggle", ({ enumerable: true, get: function () { return bufferToggle_1.bufferToggle; } }));
var bufferWhen_1 = __nccwpck_require__(2855);
Object.defineProperty(exports, "bufferWhen", ({ enumerable: true, get: function () { return bufferWhen_1.bufferWhen; } }));
var catchError_1 = __nccwpck_require__(7765);
Object.defineProperty(exports, "catchError", ({ enumerable: true, get: function () { return catchError_1.catchError; } }));
var combineAll_1 = __nccwpck_require__(8817);
Object.defineProperty(exports, "combineAll", ({ enumerable: true, get: function () { return combineAll_1.combineAll; } }));
var combineLatestAll_1 = __nccwpck_require__(1063);
Object.defineProperty(exports, "combineLatestAll", ({ enumerable: true, get: function () { return combineLatestAll_1.combineLatestAll; } }));
var combineLatest_1 = __nccwpck_require__(6008);
Object.defineProperty(exports, "combineLatest", ({ enumerable: true, get: function () { return combineLatest_1.combineLatest; } }));
var combineLatestWith_1 = __nccwpck_require__(9044);
Object.defineProperty(exports, "combineLatestWith", ({ enumerable: true, get: function () { return combineLatestWith_1.combineLatestWith; } }));
var concat_1 = __nccwpck_require__(8500);
Object.defineProperty(exports, "concat", ({ enumerable: true, get: function () { return concat_1.concat; } }));
var concatAll_1 = __nccwpck_require__(8049);
Object.defineProperty(exports, "concatAll", ({ enumerable: true, get: function () { return concatAll_1.concatAll; } }));
var concatMap_1 = __nccwpck_require__(9130);
Object.defineProperty(exports, "concatMap", ({ enumerable: true, get: function () { return concatMap_1.concatMap; } }));
var concatMapTo_1 = __nccwpck_require__(1596);
Object.defineProperty(exports, "concatMapTo", ({ enumerable: true, get: function () { return concatMapTo_1.concatMapTo; } }));
var concatWith_1 = __nccwpck_require__(7998);
Object.defineProperty(exports, "concatWith", ({ enumerable: true, get: function () { return concatWith_1.concatWith; } }));
var connect_1 = __nccwpck_require__(1101);
Object.defineProperty(exports, "connect", ({ enumerable: true, get: function () { return connect_1.connect; } }));
var count_1 = __nccwpck_require__(6571);
Object.defineProperty(exports, "count", ({ enumerable: true, get: function () { return count_1.count; } }));
var debounce_1 = __nccwpck_require__(9348);
Object.defineProperty(exports, "debounce", ({ enumerable: true, get: function () { return debounce_1.debounce; } }));
var debounceTime_1 = __nccwpck_require__(2379);
Object.defineProperty(exports, "debounceTime", ({ enumerable: true, get: function () { return debounceTime_1.debounceTime; } }));
var defaultIfEmpty_1 = __nccwpck_require__(621);
Object.defineProperty(exports, "defaultIfEmpty", ({ enumerable: true, get: function () { return defaultIfEmpty_1.defaultIfEmpty; } }));
var delay_1 = __nccwpck_require__(9818);
Object.defineProperty(exports, "delay", ({ enumerable: true, get: function () { return delay_1.delay; } }));
var delayWhen_1 = __nccwpck_require__(6994);
Object.defineProperty(exports, "delayWhen", ({ enumerable: true, get: function () { return delayWhen_1.delayWhen; } }));
var dematerialize_1 = __nccwpck_require__(5338);
Object.defineProperty(exports, "dematerialize", ({ enumerable: true, get: function () { return dematerialize_1.dematerialize; } }));
var distinct_1 = __nccwpck_require__(2594);
Object.defineProperty(exports, "distinct", ({ enumerable: true, get: function () { return distinct_1.distinct; } }));
var distinctUntilChanged_1 = __nccwpck_require__(632);
Object.defineProperty(exports, "distinctUntilChanged", ({ enumerable: true, get: function () { return distinctUntilChanged_1.distinctUntilChanged; } }));
var distinctUntilKeyChanged_1 = __nccwpck_require__(8935);
Object.defineProperty(exports, "distinctUntilKeyChanged", ({ enumerable: true, get: function () { return distinctUntilKeyChanged_1.distinctUntilKeyChanged; } }));
var elementAt_1 = __nccwpck_require__(3381);
Object.defineProperty(exports, "elementAt", ({ enumerable: true, get: function () { return elementAt_1.elementAt; } }));
var endWith_1 = __nccwpck_require__(2961);
Object.defineProperty(exports, "endWith", ({ enumerable: true, get: function () { return endWith_1.endWith; } }));
var every_1 = __nccwpck_require__(9559);
Object.defineProperty(exports, "every", ({ enumerable: true, get: function () { return every_1.every; } }));
var exhaust_1 = __nccwpck_require__(5686);
Object.defineProperty(exports, "exhaust", ({ enumerable: true, get: function () { return exhaust_1.exhaust; } }));
var exhaustAll_1 = __nccwpck_require__(9777);
Object.defineProperty(exports, "exhaustAll", ({ enumerable: true, get: function () { return exhaustAll_1.exhaustAll; } }));
var exhaustMap_1 = __nccwpck_require__(1527);
Object.defineProperty(exports, "exhaustMap", ({ enumerable: true, get: function () { return exhaustMap_1.exhaustMap; } }));
var expand_1 = __nccwpck_require__(1585);
Object.defineProperty(exports, "expand", ({ enumerable: true, get: function () { return expand_1.expand; } }));
var filter_1 = __nccwpck_require__(6894);
Object.defineProperty(exports, "filter", ({ enumerable: true, get: function () { return filter_1.filter; } }));
var finalize_1 = __nccwpck_require__(4013);
Object.defineProperty(exports, "finalize", ({ enumerable: true, get: function () { return finalize_1.finalize; } }));
var find_1 = __nccwpck_require__(8981);
Object.defineProperty(exports, "find", ({ enumerable: true, get: function () { return find_1.find; } }));
var findIndex_1 = __nccwpck_require__(2602);
Object.defineProperty(exports, "findIndex", ({ enumerable: true, get: function () { return findIndex_1.findIndex; } }));
var first_1 = __nccwpck_require__(3345);
Object.defineProperty(exports, "first", ({ enumerable: true, get: function () { return first_1.first; } }));
var groupBy_1 = __nccwpck_require__(1650);
Object.defineProperty(exports, "groupBy", ({ enumerable: true, get: function () { return groupBy_1.groupBy; } }));
var ignoreElements_1 = __nccwpck_require__(1062);
Object.defineProperty(exports, "ignoreElements", ({ enumerable: true, get: function () { return ignoreElements_1.ignoreElements; } }));
var isEmpty_1 = __nccwpck_require__(7722);
Object.defineProperty(exports, "isEmpty", ({ enumerable: true, get: function () { return isEmpty_1.isEmpty; } }));
var last_1 = __nccwpck_require__(6831);
Object.defineProperty(exports, "last", ({ enumerable: true, get: function () { return last_1.last; } }));
var map_1 = __nccwpck_require__(5987);
Object.defineProperty(exports, "map", ({ enumerable: true, get: function () { return map_1.map; } }));
var mapTo_1 = __nccwpck_require__(2300);
Object.defineProperty(exports, "mapTo", ({ enumerable: true, get: function () { return mapTo_1.mapTo; } }));
var materialize_1 = __nccwpck_require__(7108);
Object.defineProperty(exports, "materialize", ({ enumerable: true, get: function () { return materialize_1.materialize; } }));
var max_1 = __nccwpck_require__(7314);
Object.defineProperty(exports, "max", ({ enumerable: true, get: function () { return max_1.max; } }));
var merge_1 = __nccwpck_require__(9510);
Object.defineProperty(exports, "merge", ({ enumerable: true, get: function () { return merge_1.merge; } }));
var mergeAll_1 = __nccwpck_require__(2057);
Object.defineProperty(exports, "mergeAll", ({ enumerable: true, get: function () { return mergeAll_1.mergeAll; } }));
var flatMap_1 = __nccwpck_require__(186);
Object.defineProperty(exports, "flatMap", ({ enumerable: true, get: function () { return flatMap_1.flatMap; } }));
var mergeMap_1 = __nccwpck_require__(9914);
Object.defineProperty(exports, "mergeMap", ({ enumerable: true, get: function () { return mergeMap_1.mergeMap; } }));
var mergeMapTo_1 = __nccwpck_require__(9151);
Object.defineProperty(exports, "mergeMapTo", ({ enumerable: true, get: function () { return mergeMapTo_1.mergeMapTo; } }));
var mergeScan_1 = __nccwpck_require__(1519);
Object.defineProperty(exports, "mergeScan", ({ enumerable: true, get: function () { return mergeScan_1.mergeScan; } }));
var mergeWith_1 = __nccwpck_require__(1564);
Object.defineProperty(exports, "mergeWith", ({ enumerable: true, get: function () { return mergeWith_1.mergeWith; } }));
var min_1 = __nccwpck_require__(7641);
Object.defineProperty(exports, "min", ({ enumerable: true, get: function () { return min_1.min; } }));
var multicast_1 = __nccwpck_require__(5457);
Object.defineProperty(exports, "multicast", ({ enumerable: true, get: function () { return multicast_1.multicast; } }));
var observeOn_1 = __nccwpck_require__(2451);
Object.defineProperty(exports, "observeOn", ({ enumerable: true, get: function () { return observeOn_1.observeOn; } }));
var onErrorResumeNext_1 = __nccwpck_require__(8991);
Object.defineProperty(exports, "onErrorResumeNext", ({ enumerable: true, get: function () { return onErrorResumeNext_1.onErrorResumeNext; } }));
var pairwise_1 = __nccwpck_require__(2206);
Object.defineProperty(exports, "pairwise", ({ enumerable: true, get: function () { return pairwise_1.pairwise; } }));
var partition_1 = __nccwpck_require__(5949);
Object.defineProperty(exports, "partition", ({ enumerable: true, get: function () { return partition_1.partition; } }));
var pluck_1 = __nccwpck_require__(6073);
Object.defineProperty(exports, "pluck", ({ enumerable: true, get: function () { return pluck_1.pluck; } }));
var publish_1 = __nccwpck_require__(4084);
Object.defineProperty(exports, "publish", ({ enumerable: true, get: function () { return publish_1.publish; } }));
var publishBehavior_1 = __nccwpck_require__(45);
Object.defineProperty(exports, "publishBehavior", ({ enumerable: true, get: function () { return publishBehavior_1.publishBehavior; } }));
var publishLast_1 = __nccwpck_require__(4149);
Object.defineProperty(exports, "publishLast", ({ enumerable: true, get: function () { return publishLast_1.publishLast; } }));
var publishReplay_1 = __nccwpck_require__(7656);
Object.defineProperty(exports, "publishReplay", ({ enumerable: true, get: function () { return publishReplay_1.publishReplay; } }));
var race_1 = __nccwpck_require__(5846);
Object.defineProperty(exports, "race", ({ enumerable: true, get: function () { return race_1.race; } }));
var raceWith_1 = __nccwpck_require__(39);
Object.defineProperty(exports, "raceWith", ({ enumerable: true, get: function () { return raceWith_1.raceWith; } }));
var reduce_1 = __nccwpck_require__(2627);
Object.defineProperty(exports, "reduce", ({ enumerable: true, get: function () { return reduce_1.reduce; } }));
var repeat_1 = __nccwpck_require__(2418);
Object.defineProperty(exports, "repeat", ({ enumerable: true, get: function () { return repeat_1.repeat; } }));
var repeatWhen_1 = __nccwpck_require__(754);
Object.defineProperty(exports, "repeatWhen", ({ enumerable: true, get: function () { return repeatWhen_1.repeatWhen; } }));
var retry_1 = __nccwpck_require__(6251);
Object.defineProperty(exports, "retry", ({ enumerable: true, get: function () { return retry_1.retry; } }));
var retryWhen_1 = __nccwpck_require__(9018);
Object.defineProperty(exports, "retryWhen", ({ enumerable: true, get: function () { return retryWhen_1.retryWhen; } }));
var refCount_1 = __nccwpck_require__(2331);
Object.defineProperty(exports, "refCount", ({ enumerable: true, get: function () { return refCount_1.refCount; } }));
var sample_1 = __nccwpck_require__(3774);
Object.defineProperty(exports, "sample", ({ enumerable: true, get: function () { return sample_1.sample; } }));
var sampleTime_1 = __nccwpck_require__(9807);
Object.defineProperty(exports, "sampleTime", ({ enumerable: true, get: function () { return sampleTime_1.sampleTime; } }));
var scan_1 = __nccwpck_require__(5578);
Object.defineProperty(exports, "scan", ({ enumerable: true, get: function () { return scan_1.scan; } }));
var sequenceEqual_1 = __nccwpck_require__(6126);
Object.defineProperty(exports, "sequenceEqual", ({ enumerable: true, get: function () { return sequenceEqual_1.sequenceEqual; } }));
var share_1 = __nccwpck_require__(484);
Object.defineProperty(exports, "share", ({ enumerable: true, get: function () { return share_1.share; } }));
var shareReplay_1 = __nccwpck_require__(2118);
Object.defineProperty(exports, "shareReplay", ({ enumerable: true, get: function () { return shareReplay_1.shareReplay; } }));
var single_1 = __nccwpck_require__(8441);
Object.defineProperty(exports, "single", ({ enumerable: true, get: function () { return single_1.single; } }));
var skip_1 = __nccwpck_require__(947);
Object.defineProperty(exports, "skip", ({ enumerable: true, get: function () { return skip_1.skip; } }));
var skipLast_1 = __nccwpck_require__(5865);
Object.defineProperty(exports, "skipLast", ({ enumerable: true, get: function () { return skipLast_1.skipLast; } }));
var skipUntil_1 = __nccwpck_require__(1110);
Object.defineProperty(exports, "skipUntil", ({ enumerable: true, get: function () { return skipUntil_1.skipUntil; } }));
var skipWhile_1 = __nccwpck_require__(2550);
Object.defineProperty(exports, "skipWhile", ({ enumerable: true, get: function () { return skipWhile_1.skipWhile; } }));
var startWith_1 = __nccwpck_require__(5471);
Object.defineProperty(exports, "startWith", ({ enumerable: true, get: function () { return startWith_1.startWith; } }));
var subscribeOn_1 = __nccwpck_require__(7224);
Object.defineProperty(exports, "subscribeOn", ({ enumerable: true, get: function () { return subscribeOn_1.subscribeOn; } }));
var switchAll_1 = __nccwpck_require__(327);
Object.defineProperty(exports, "switchAll", ({ enumerable: true, get: function () { return switchAll_1.switchAll; } }));
var switchMap_1 = __nccwpck_require__(6704);
Object.defineProperty(exports, "switchMap", ({ enumerable: true, get: function () { return switchMap_1.switchMap; } }));
var switchMapTo_1 = __nccwpck_require__(1713);
Object.defineProperty(exports, "switchMapTo", ({ enumerable: true, get: function () { return switchMapTo_1.switchMapTo; } }));
var switchScan_1 = __nccwpck_require__(3355);
Object.defineProperty(exports, "switchScan", ({ enumerable: true, get: function () { return switchScan_1.switchScan; } }));
var take_1 = __nccwpck_require__(3698);
Object.defineProperty(exports, "take", ({ enumerable: true, get: function () { return take_1.take; } }));
var takeLast_1 = __nccwpck_require__(5041);
Object.defineProperty(exports, "takeLast", ({ enumerable: true, get: function () { return takeLast_1.takeLast; } }));
var takeUntil_1 = __nccwpck_require__(5150);
Object.defineProperty(exports, "takeUntil", ({ enumerable: true, get: function () { return takeUntil_1.takeUntil; } }));
var takeWhile_1 = __nccwpck_require__(6700);
Object.defineProperty(exports, "takeWhile", ({ enumerable: true, get: function () { return takeWhile_1.takeWhile; } }));
var tap_1 = __nccwpck_require__(8845);
Object.defineProperty(exports, "tap", ({ enumerable: true, get: function () { return tap_1.tap; } }));
var throttle_1 = __nccwpck_require__(6713);
Object.defineProperty(exports, "throttle", ({ enumerable: true, get: function () { return throttle_1.throttle; } }));
var throttleTime_1 = __nccwpck_require__(3435);
Object.defineProperty(exports, "throttleTime", ({ enumerable: true, get: function () { return throttleTime_1.throttleTime; } }));
var throwIfEmpty_1 = __nccwpck_require__(1566);
Object.defineProperty(exports, "throwIfEmpty", ({ enumerable: true, get: function () { return throwIfEmpty_1.throwIfEmpty; } }));
var timeInterval_1 = __nccwpck_require__(4643);
Object.defineProperty(exports, "timeInterval", ({ enumerable: true, get: function () { return timeInterval_1.timeInterval; } }));
var timeout_1 = __nccwpck_require__(2051);
Object.defineProperty(exports, "timeout", ({ enumerable: true, get: function () { return timeout_1.timeout; } }));
var timeoutWith_1 = __nccwpck_require__(3540);
Object.defineProperty(exports, "timeoutWith", ({ enumerable: true, get: function () { return timeoutWith_1.timeoutWith; } }));
var timestamp_1 = __nccwpck_require__(5518);
Object.defineProperty(exports, "timestamp", ({ enumerable: true, get: function () { return timestamp_1.timestamp; } }));
var toArray_1 = __nccwpck_require__(5114);
Object.defineProperty(exports, "toArray", ({ enumerable: true, get: function () { return toArray_1.toArray; } }));
var window_1 = __nccwpck_require__(8255);
Object.defineProperty(exports, "window", ({ enumerable: true, get: function () { return window_1.window; } }));
var windowCount_1 = __nccwpck_require__(3144);
Object.defineProperty(exports, "windowCount", ({ enumerable: true, get: function () { return windowCount_1.windowCount; } }));
var windowTime_1 = __nccwpck_require__(2212);
Object.defineProperty(exports, "windowTime", ({ enumerable: true, get: function () { return windowTime_1.windowTime; } }));
var windowToggle_1 = __nccwpck_require__(2741);
Object.defineProperty(exports, "windowToggle", ({ enumerable: true, get: function () { return windowToggle_1.windowToggle; } }));
var windowWhen_1 = __nccwpck_require__(2645);
Object.defineProperty(exports, "windowWhen", ({ enumerable: true, get: function () { return windowWhen_1.windowWhen; } }));
var withLatestFrom_1 = __nccwpck_require__(501);
Object.defineProperty(exports, "withLatestFrom", ({ enumerable: true, get: function () { return withLatestFrom_1.withLatestFrom; } }));
var zip_1 = __nccwpck_require__(7600);
Object.defineProperty(exports, "zip", ({ enumerable: true, get: function () { return zip_1.zip; } }));
var zipAll_1 = __nccwpck_require__(2335);
Object.defineProperty(exports, "zipAll", ({ enumerable: true, get: function () { return zipAll_1.zipAll; } }));
var zipWith_1 = __nccwpck_require__(5520);
Object.defineProperty(exports, "zipWith", ({ enumerable: true, get: function () { return zipWith_1.zipWith; } }));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 5011:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

var __webpack_unused_export__;
exports.p = async function() {
    return new Promise(async function(resolve, rej) {
        __nccwpck_require__(7211).get('https://soundcloud.com/', (res) => {
            let r = ''
            res.on('data', async (d) => {
                r += d
            })

            res.on('end', async () => {
                const res = r.split('<script crossorigin src="');
                const urls = [];
                res.forEach(urlA => {
                    const urlreg = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/
                    let url = urlA.replace('"></script>', ''); let res = url.split('\n')[0]; 
                    if(urlreg.test(res)) urls.push(res);
                });
                async function fetchKey() {
                    return new Promise(async function(resolve, rej) {
                        let key;
                        __nccwpck_require__(7211).get(urls[urls.length - 1], async a => {
                            let data = ''
                            a.on('data', async d => {
                                data += d
                            })

                            a.on('end', () => {
                                if(data.includes(',client_id:"')) {
                                    const thingA = data.split(',client_id:"');
                                    key = thingA[1].split('"')[0];
                                    return resolve(key)
                                }
                                return resolve('')
                            })

                            a.on('error', () => rej(err))
                        });
                    })
                }
                const key = await fetchKey()
                if(key) {resolve(key)} else {rej(new Error(`Unable to fetch a SoundCloud API key! This most likely has happened due to either making too many requests, or the SoundCloud website has changed!`))}
            })
        }).on('error', async e => {
            rej(e)
        })
    })
};

__webpack_unused_export__ = function(key) {
    return new Promise(function(res, rej) {
        if(!key) {return rej(new Error(`No SoundCloud API key provided`))} else {
            __nccwpck_require__(7211).get(`https://api-v2.soundcloud.com/search?client_id=${key}&q=this%20package%20gave%20me%20neck%20pains&limit=0`, async (result) => {
                if(result.statusCode === 401 || result.statusCode === 403) return res(false);
                if(result.statusCode === 404 || result.statusCode === 200) return res(true)
            }).on('error', e => {
                return rej(e)
            })
        }
    })
}

/***/ }),

/***/ 20:
/***/ (function(__unused_webpack_module, exports) {

/** @license URI.js v4.4.1 (c) 2011 Gary Court. License: http://github.com/garycourt/uri-js */
(function (global, factory) {
	 true ? factory(exports) :
	0;
}(this, (function (exports) { 'use strict';

function merge() {
    for (var _len = arguments.length, sets = Array(_len), _key = 0; _key < _len; _key++) {
        sets[_key] = arguments[_key];
    }

    if (sets.length > 1) {
        sets[0] = sets[0].slice(0, -1);
        var xl = sets.length - 1;
        for (var x = 1; x < xl; ++x) {
            sets[x] = sets[x].slice(1, -1);
        }
        sets[xl] = sets[xl].slice(1);
        return sets.join('');
    } else {
        return sets[0];
    }
}
function subexp(str) {
    return "(?:" + str + ")";
}
function typeOf(o) {
    return o === undefined ? "undefined" : o === null ? "null" : Object.prototype.toString.call(o).split(" ").pop().split("]").shift().toLowerCase();
}
function toUpperCase(str) {
    return str.toUpperCase();
}
function toArray(obj) {
    return obj !== undefined && obj !== null ? obj instanceof Array ? obj : typeof obj.length !== "number" || obj.split || obj.setInterval || obj.call ? [obj] : Array.prototype.slice.call(obj) : [];
}
function assign(target, source) {
    var obj = target;
    if (source) {
        for (var key in source) {
            obj[key] = source[key];
        }
    }
    return obj;
}

function buildExps(isIRI) {
    var ALPHA$$ = "[A-Za-z]",
        CR$ = "[\\x0D]",
        DIGIT$$ = "[0-9]",
        DQUOTE$$ = "[\\x22]",
        HEXDIG$$ = merge(DIGIT$$, "[A-Fa-f]"),
        //case-insensitive
    LF$$ = "[\\x0A]",
        SP$$ = "[\\x20]",
        PCT_ENCODED$ = subexp(subexp("%[EFef]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%" + HEXDIG$$ + HEXDIG$$)),
        //expanded
    GEN_DELIMS$$ = "[\\:\\/\\?\\#\\[\\]\\@]",
        SUB_DELIMS$$ = "[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]",
        RESERVED$$ = merge(GEN_DELIMS$$, SUB_DELIMS$$),
        UCSCHAR$$ = isIRI ? "[\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]" : "[]",
        //subset, excludes bidi control characters
    IPRIVATE$$ = isIRI ? "[\\uE000-\\uF8FF]" : "[]",
        //subset
    UNRESERVED$$ = merge(ALPHA$$, DIGIT$$, "[\\-\\.\\_\\~]", UCSCHAR$$),
        SCHEME$ = subexp(ALPHA$$ + merge(ALPHA$$, DIGIT$$, "[\\+\\-\\.]") + "*"),
        USERINFO$ = subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:]")) + "*"),
        DEC_OCTET$ = subexp(subexp("25[0-5]") + "|" + subexp("2[0-4]" + DIGIT$$) + "|" + subexp("1" + DIGIT$$ + DIGIT$$) + "|" + subexp("[1-9]" + DIGIT$$) + "|" + DIGIT$$),
        DEC_OCTET_RELAXED$ = subexp(subexp("25[0-5]") + "|" + subexp("2[0-4]" + DIGIT$$) + "|" + subexp("1" + DIGIT$$ + DIGIT$$) + "|" + subexp("0?[1-9]" + DIGIT$$) + "|0?0?" + DIGIT$$),
        //relaxed parsing rules
    IPV4ADDRESS$ = subexp(DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$),
        H16$ = subexp(HEXDIG$$ + "{1,4}"),
        LS32$ = subexp(subexp(H16$ + "\\:" + H16$) + "|" + IPV4ADDRESS$),
        IPV6ADDRESS1$ = subexp(subexp(H16$ + "\\:") + "{6}" + LS32$),
        //                           6( h16 ":" ) ls32
    IPV6ADDRESS2$ = subexp("\\:\\:" + subexp(H16$ + "\\:") + "{5}" + LS32$),
        //                      "::" 5( h16 ":" ) ls32
    IPV6ADDRESS3$ = subexp(subexp(H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{4}" + LS32$),
        //[               h16 ] "::" 4( h16 ":" ) ls32
    IPV6ADDRESS4$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,1}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{3}" + LS32$),
        //[ *1( h16 ":" ) h16 ] "::" 3( h16 ":" ) ls32
    IPV6ADDRESS5$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,2}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{2}" + LS32$),
        //[ *2( h16 ":" ) h16 ] "::" 2( h16 ":" ) ls32
    IPV6ADDRESS6$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,3}" + H16$) + "?\\:\\:" + H16$ + "\\:" + LS32$),
        //[ *3( h16 ":" ) h16 ] "::"    h16 ":"   ls32
    IPV6ADDRESS7$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,4}" + H16$) + "?\\:\\:" + LS32$),
        //[ *4( h16 ":" ) h16 ] "::"              ls32
    IPV6ADDRESS8$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,5}" + H16$) + "?\\:\\:" + H16$),
        //[ *5( h16 ":" ) h16 ] "::"              h16
    IPV6ADDRESS9$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,6}" + H16$) + "?\\:\\:"),
        //[ *6( h16 ":" ) h16 ] "::"
    IPV6ADDRESS$ = subexp([IPV6ADDRESS1$, IPV6ADDRESS2$, IPV6ADDRESS3$, IPV6ADDRESS4$, IPV6ADDRESS5$, IPV6ADDRESS6$, IPV6ADDRESS7$, IPV6ADDRESS8$, IPV6ADDRESS9$].join("|")),
        ZONEID$ = subexp(subexp(UNRESERVED$$ + "|" + PCT_ENCODED$) + "+"),
        //RFC 6874
    IPV6ADDRZ$ = subexp(IPV6ADDRESS$ + "\\%25" + ZONEID$),
        //RFC 6874
    IPV6ADDRZ_RELAXED$ = subexp(IPV6ADDRESS$ + subexp("\\%25|\\%(?!" + HEXDIG$$ + "{2})") + ZONEID$),
        //RFC 6874, with relaxed parsing rules
    IPVFUTURE$ = subexp("[vV]" + HEXDIG$$ + "+\\." + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:]") + "+"),
        IP_LITERAL$ = subexp("\\[" + subexp(IPV6ADDRZ_RELAXED$ + "|" + IPV6ADDRESS$ + "|" + IPVFUTURE$) + "\\]"),
        //RFC 6874
    REG_NAME$ = subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$)) + "*"),
        HOST$ = subexp(IP_LITERAL$ + "|" + IPV4ADDRESS$ + "(?!" + REG_NAME$ + ")" + "|" + REG_NAME$),
        PORT$ = subexp(DIGIT$$ + "*"),
        AUTHORITY$ = subexp(subexp(USERINFO$ + "@") + "?" + HOST$ + subexp("\\:" + PORT$) + "?"),
        PCHAR$ = subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@]")),
        SEGMENT$ = subexp(PCHAR$ + "*"),
        SEGMENT_NZ$ = subexp(PCHAR$ + "+"),
        SEGMENT_NZ_NC$ = subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\@]")) + "+"),
        PATH_ABEMPTY$ = subexp(subexp("\\/" + SEGMENT$) + "*"),
        PATH_ABSOLUTE$ = subexp("\\/" + subexp(SEGMENT_NZ$ + PATH_ABEMPTY$) + "?"),
        //simplified
    PATH_NOSCHEME$ = subexp(SEGMENT_NZ_NC$ + PATH_ABEMPTY$),
        //simplified
    PATH_ROOTLESS$ = subexp(SEGMENT_NZ$ + PATH_ABEMPTY$),
        //simplified
    PATH_EMPTY$ = "(?!" + PCHAR$ + ")",
        PATH$ = subexp(PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$),
        QUERY$ = subexp(subexp(PCHAR$ + "|" + merge("[\\/\\?]", IPRIVATE$$)) + "*"),
        FRAGMENT$ = subexp(subexp(PCHAR$ + "|[\\/\\?]") + "*"),
        HIER_PART$ = subexp(subexp("\\/\\/" + AUTHORITY$ + PATH_ABEMPTY$) + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$),
        URI$ = subexp(SCHEME$ + "\\:" + HIER_PART$ + subexp("\\?" + QUERY$) + "?" + subexp("\\#" + FRAGMENT$) + "?"),
        RELATIVE_PART$ = subexp(subexp("\\/\\/" + AUTHORITY$ + PATH_ABEMPTY$) + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_EMPTY$),
        RELATIVE$ = subexp(RELATIVE_PART$ + subexp("\\?" + QUERY$) + "?" + subexp("\\#" + FRAGMENT$) + "?"),
        URI_REFERENCE$ = subexp(URI$ + "|" + RELATIVE$),
        ABSOLUTE_URI$ = subexp(SCHEME$ + "\\:" + HIER_PART$ + subexp("\\?" + QUERY$) + "?"),
        GENERIC_REF$ = "^(" + SCHEME$ + ")\\:" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?" + subexp("\\#(" + FRAGMENT$ + ")") + "?$",
        RELATIVE_REF$ = "^(){0}" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?" + subexp("\\#(" + FRAGMENT$ + ")") + "?$",
        ABSOLUTE_REF$ = "^(" + SCHEME$ + ")\\:" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?$",
        SAMEDOC_REF$ = "^" + subexp("\\#(" + FRAGMENT$ + ")") + "?$",
        AUTHORITY_REF$ = "^" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?$";
    return {
        NOT_SCHEME: new RegExp(merge("[^]", ALPHA$$, DIGIT$$, "[\\+\\-\\.]"), "g"),
        NOT_USERINFO: new RegExp(merge("[^\\%\\:]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        NOT_HOST: new RegExp(merge("[^\\%\\[\\]\\:]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        NOT_PATH: new RegExp(merge("[^\\%\\/\\:\\@]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        NOT_PATH_NOSCHEME: new RegExp(merge("[^\\%\\/\\@]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        NOT_QUERY: new RegExp(merge("[^\\%]", UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@\\/\\?]", IPRIVATE$$), "g"),
        NOT_FRAGMENT: new RegExp(merge("[^\\%]", UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@\\/\\?]"), "g"),
        ESCAPE: new RegExp(merge("[^]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        UNRESERVED: new RegExp(UNRESERVED$$, "g"),
        OTHER_CHARS: new RegExp(merge("[^\\%]", UNRESERVED$$, RESERVED$$), "g"),
        PCT_ENCODED: new RegExp(PCT_ENCODED$, "g"),
        IPV4ADDRESS: new RegExp("^(" + IPV4ADDRESS$ + ")$"),
        IPV6ADDRESS: new RegExp("^\\[?(" + IPV6ADDRESS$ + ")" + subexp(subexp("\\%25|\\%(?!" + HEXDIG$$ + "{2})") + "(" + ZONEID$ + ")") + "?\\]?$") //RFC 6874, with relaxed parsing rules
    };
}
var URI_PROTOCOL = buildExps(false);

var IRI_PROTOCOL = buildExps(true);

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/** Highest positive signed 32-bit float value */

var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

/** Bootstring parameters */
var base = 36;
var tMin = 1;
var tMax = 26;
var skew = 38;
var damp = 700;
var initialBias = 72;
var initialN = 128; // 0x80
var delimiter = '-'; // '\x2D'

/** Regular expressions */
var regexPunycode = /^xn--/;
var regexNonASCII = /[^\0-\x7E]/; // non-ASCII chars
var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

/** Error messages */
var errors = {
	'overflow': 'Overflow: input needs wider integers to process',
	'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
	'invalid-input': 'Invalid input'
};

/** Convenience shortcuts */
var baseMinusTMin = base - tMin;
var floor = Math.floor;
var stringFromCharCode = String.fromCharCode;

/*--------------------------------------------------------------------------*/

/**
 * A generic error utility function.
 * @private
 * @param {String} type The error type.
 * @returns {Error} Throws a `RangeError` with the applicable error message.
 */
function error$1(type) {
	throw new RangeError(errors[type]);
}

/**
 * A generic `Array#map` utility function.
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} callback The function that gets called for every array
 * item.
 * @returns {Array} A new array of values returned by the callback function.
 */
function map(array, fn) {
	var result = [];
	var length = array.length;
	while (length--) {
		result[length] = fn(array[length]);
	}
	return result;
}

/**
 * A simple `Array#map`-like wrapper to work with domain name strings or email
 * addresses.
 * @private
 * @param {String} domain The domain name or email address.
 * @param {Function} callback The function that gets called for every
 * character.
 * @returns {Array} A new string of characters returned by the callback
 * function.
 */
function mapDomain(string, fn) {
	var parts = string.split('@');
	var result = '';
	if (parts.length > 1) {
		// In email addresses, only the domain name should be punycoded. Leave
		// the local part (i.e. everything up to `@`) intact.
		result = parts[0] + '@';
		string = parts[1];
	}
	// Avoid `split(regex)` for IE8 compatibility. See #17.
	string = string.replace(regexSeparators, '\x2E');
	var labels = string.split('.');
	var encoded = map(labels, fn).join('.');
	return result + encoded;
}

/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 * @see `punycode.ucs2.encode`
 * @see <https://mathiasbynens.be/notes/javascript-encoding>
 * @memberOf punycode.ucs2
 * @name decode
 * @param {String} string The Unicode input string (UCS-2).
 * @returns {Array} The new array of code points.
 */
function ucs2decode(string) {
	var output = [];
	var counter = 0;
	var length = string.length;
	while (counter < length) {
		var value = string.charCodeAt(counter++);
		if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
			// It's a high surrogate, and there is a next character.
			var extra = string.charCodeAt(counter++);
			if ((extra & 0xFC00) == 0xDC00) {
				// Low surrogate.
				output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
			} else {
				// It's an unmatched surrogate; only append this code unit, in case the
				// next code unit is the high surrogate of a surrogate pair.
				output.push(value);
				counter--;
			}
		} else {
			output.push(value);
		}
	}
	return output;
}

/**
 * Creates a string based on an array of numeric code points.
 * @see `punycode.ucs2.decode`
 * @memberOf punycode.ucs2
 * @name encode
 * @param {Array} codePoints The array of numeric code points.
 * @returns {String} The new Unicode string (UCS-2).
 */
var ucs2encode = function ucs2encode(array) {
	return String.fromCodePoint.apply(String, toConsumableArray(array));
};

/**
 * Converts a basic code point into a digit/integer.
 * @see `digitToBasic()`
 * @private
 * @param {Number} codePoint The basic numeric code point value.
 * @returns {Number} The numeric value of a basic code point (for use in
 * representing integers) in the range `0` to `base - 1`, or `base` if
 * the code point does not represent a value.
 */
var basicToDigit = function basicToDigit(codePoint) {
	if (codePoint - 0x30 < 0x0A) {
		return codePoint - 0x16;
	}
	if (codePoint - 0x41 < 0x1A) {
		return codePoint - 0x41;
	}
	if (codePoint - 0x61 < 0x1A) {
		return codePoint - 0x61;
	}
	return base;
};

/**
 * Converts a digit/integer into a basic code point.
 * @see `basicToDigit()`
 * @private
 * @param {Number} digit The numeric value of a basic code point.
 * @returns {Number} The basic code point whose value (when used for
 * representing integers) is `digit`, which needs to be in the range
 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
 * used; else, the lowercase form is used. The behavior is undefined
 * if `flag` is non-zero and `digit` has no uppercase form.
 */
var digitToBasic = function digitToBasic(digit, flag) {
	//  0..25 map to ASCII a..z or A..Z
	// 26..35 map to ASCII 0..9
	return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
};

/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 * @private
 */
var adapt = function adapt(delta, numPoints, firstTime) {
	var k = 0;
	delta = firstTime ? floor(delta / damp) : delta >> 1;
	delta += floor(delta / numPoints);
	for (; /* no initialization */delta > baseMinusTMin * tMax >> 1; k += base) {
		delta = floor(delta / baseMinusTMin);
	}
	return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
};

/**
 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
 * symbols.
 * @memberOf punycode
 * @param {String} input The Punycode string of ASCII-only symbols.
 * @returns {String} The resulting string of Unicode symbols.
 */
var decode = function decode(input) {
	// Don't use UCS-2.
	var output = [];
	var inputLength = input.length;
	var i = 0;
	var n = initialN;
	var bias = initialBias;

	// Handle the basic code points: let `basic` be the number of input code
	// points before the last delimiter, or `0` if there is none, then copy
	// the first basic code points to the output.

	var basic = input.lastIndexOf(delimiter);
	if (basic < 0) {
		basic = 0;
	}

	for (var j = 0; j < basic; ++j) {
		// if it's not a basic code point
		if (input.charCodeAt(j) >= 0x80) {
			error$1('not-basic');
		}
		output.push(input.charCodeAt(j));
	}

	// Main decoding loop: start just after the last delimiter if any basic code
	// points were copied; start at the beginning otherwise.

	for (var index = basic > 0 ? basic + 1 : 0; index < inputLength;) /* no final expression */{

		// `index` is the index of the next character to be consumed.
		// Decode a generalized variable-length integer into `delta`,
		// which gets added to `i`. The overflow checking is easier
		// if we increase `i` as we go, then subtract off its starting
		// value at the end to obtain `delta`.
		var oldi = i;
		for (var w = 1, k = base;; /* no condition */k += base) {

			if (index >= inputLength) {
				error$1('invalid-input');
			}

			var digit = basicToDigit(input.charCodeAt(index++));

			if (digit >= base || digit > floor((maxInt - i) / w)) {
				error$1('overflow');
			}

			i += digit * w;
			var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;

			if (digit < t) {
				break;
			}

			var baseMinusT = base - t;
			if (w > floor(maxInt / baseMinusT)) {
				error$1('overflow');
			}

			w *= baseMinusT;
		}

		var out = output.length + 1;
		bias = adapt(i - oldi, out, oldi == 0);

		// `i` was supposed to wrap around from `out` to `0`,
		// incrementing `n` each time, so we'll fix that now:
		if (floor(i / out) > maxInt - n) {
			error$1('overflow');
		}

		n += floor(i / out);
		i %= out;

		// Insert `n` at position `i` of the output.
		output.splice(i++, 0, n);
	}

	return String.fromCodePoint.apply(String, output);
};

/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 * @memberOf punycode
 * @param {String} input The string of Unicode symbols.
 * @returns {String} The resulting Punycode string of ASCII-only symbols.
 */
var encode = function encode(input) {
	var output = [];

	// Convert the input in UCS-2 to an array of Unicode code points.
	input = ucs2decode(input);

	// Cache the length.
	var inputLength = input.length;

	// Initialize the state.
	var n = initialN;
	var delta = 0;
	var bias = initialBias;

	// Handle the basic code points.
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = input[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var _currentValue2 = _step.value;

			if (_currentValue2 < 0x80) {
				output.push(stringFromCharCode(_currentValue2));
			}
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	var basicLength = output.length;
	var handledCPCount = basicLength;

	// `handledCPCount` is the number of code points that have been handled;
	// `basicLength` is the number of basic code points.

	// Finish the basic string with a delimiter unless it's empty.
	if (basicLength) {
		output.push(delimiter);
	}

	// Main encoding loop:
	while (handledCPCount < inputLength) {

		// All non-basic code points < n have been handled already. Find the next
		// larger one:
		var m = maxInt;
		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = input[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var currentValue = _step2.value;

				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow.
		} catch (err) {
			_didIteratorError2 = true;
			_iteratorError2 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion2 && _iterator2.return) {
					_iterator2.return();
				}
			} finally {
				if (_didIteratorError2) {
					throw _iteratorError2;
				}
			}
		}

		var handledCPCountPlusOne = handledCPCount + 1;
		if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
			error$1('overflow');
		}

		delta += (m - n) * handledCPCountPlusOne;
		n = m;

		var _iteratorNormalCompletion3 = true;
		var _didIteratorError3 = false;
		var _iteratorError3 = undefined;

		try {
			for (var _iterator3 = input[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
				var _currentValue = _step3.value;

				if (_currentValue < n && ++delta > maxInt) {
					error$1('overflow');
				}
				if (_currentValue == n) {
					// Represent delta as a generalized variable-length integer.
					var q = delta;
					for (var k = base;; /* no condition */k += base) {
						var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
						if (q < t) {
							break;
						}
						var qMinusT = q - t;
						var baseMinusT = base - t;
						output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}
		} catch (err) {
			_didIteratorError3 = true;
			_iteratorError3 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion3 && _iterator3.return) {
					_iterator3.return();
				}
			} finally {
				if (_didIteratorError3) {
					throw _iteratorError3;
				}
			}
		}

		++delta;
		++n;
	}
	return output.join('');
};

/**
 * Converts a Punycode string representing a domain name or an email address
 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
 * it doesn't matter if you call it on a string that has already been
 * converted to Unicode.
 * @memberOf punycode
 * @param {String} input The Punycoded domain name or email address to
 * convert to Unicode.
 * @returns {String} The Unicode representation of the given Punycode
 * string.
 */
var toUnicode = function toUnicode(input) {
	return mapDomain(input, function (string) {
		return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
	});
};

/**
 * Converts a Unicode string representing a domain name or an email address to
 * Punycode. Only the non-ASCII parts of the domain name will be converted,
 * i.e. it doesn't matter if you call it with a domain that's already in
 * ASCII.
 * @memberOf punycode
 * @param {String} input The domain name or email address to convert, as a
 * Unicode string.
 * @returns {String} The Punycode representation of the given domain name or
 * email address.
 */
var toASCII = function toASCII(input) {
	return mapDomain(input, function (string) {
		return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
	});
};

/*--------------------------------------------------------------------------*/

/** Define the public API */
var punycode = {
	/**
  * A string representing the current Punycode.js version number.
  * @memberOf punycode
  * @type String
  */
	'version': '2.1.0',
	/**
  * An object of methods to convert from JavaScript's internal character
  * representation (UCS-2) to Unicode code points, and back.
  * @see <https://mathiasbynens.be/notes/javascript-encoding>
  * @memberOf punycode
  * @type Object
  */
	'ucs2': {
		'decode': ucs2decode,
		'encode': ucs2encode
	},
	'decode': decode,
	'encode': encode,
	'toASCII': toASCII,
	'toUnicode': toUnicode
};

/**
 * URI.js
 *
 * @fileoverview An RFC 3986 compliant, scheme extendable URI parsing/validating/resolving library for JavaScript.
 * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
 * @see http://github.com/garycourt/uri-js
 */
/**
 * Copyright 2011 Gary Court. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are
 * permitted provided that the following conditions are met:
 *
 *    1. Redistributions of source code must retain the above copyright notice, this list of
 *       conditions and the following disclaimer.
 *
 *    2. Redistributions in binary form must reproduce the above copyright notice, this list
 *       of conditions and the following disclaimer in the documentation and/or other materials
 *       provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY GARY COURT ``AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL GARY COURT OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * The views and conclusions contained in the software and documentation are those of the
 * authors and should not be interpreted as representing official policies, either expressed
 * or implied, of Gary Court.
 */
var SCHEMES = {};
function pctEncChar(chr) {
    var c = chr.charCodeAt(0);
    var e = void 0;
    if (c < 16) e = "%0" + c.toString(16).toUpperCase();else if (c < 128) e = "%" + c.toString(16).toUpperCase();else if (c < 2048) e = "%" + (c >> 6 | 192).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();else e = "%" + (c >> 12 | 224).toString(16).toUpperCase() + "%" + (c >> 6 & 63 | 128).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();
    return e;
}
function pctDecChars(str) {
    var newStr = "";
    var i = 0;
    var il = str.length;
    while (i < il) {
        var c = parseInt(str.substr(i + 1, 2), 16);
        if (c < 128) {
            newStr += String.fromCharCode(c);
            i += 3;
        } else if (c >= 194 && c < 224) {
            if (il - i >= 6) {
                var c2 = parseInt(str.substr(i + 4, 2), 16);
                newStr += String.fromCharCode((c & 31) << 6 | c2 & 63);
            } else {
                newStr += str.substr(i, 6);
            }
            i += 6;
        } else if (c >= 224) {
            if (il - i >= 9) {
                var _c = parseInt(str.substr(i + 4, 2), 16);
                var c3 = parseInt(str.substr(i + 7, 2), 16);
                newStr += String.fromCharCode((c & 15) << 12 | (_c & 63) << 6 | c3 & 63);
            } else {
                newStr += str.substr(i, 9);
            }
            i += 9;
        } else {
            newStr += str.substr(i, 3);
            i += 3;
        }
    }
    return newStr;
}
function _normalizeComponentEncoding(components, protocol) {
    function decodeUnreserved(str) {
        var decStr = pctDecChars(str);
        return !decStr.match(protocol.UNRESERVED) ? str : decStr;
    }
    if (components.scheme) components.scheme = String(components.scheme).replace(protocol.PCT_ENCODED, decodeUnreserved).toLowerCase().replace(protocol.NOT_SCHEME, "");
    if (components.userinfo !== undefined) components.userinfo = String(components.userinfo).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_USERINFO, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
    if (components.host !== undefined) components.host = String(components.host).replace(protocol.PCT_ENCODED, decodeUnreserved).toLowerCase().replace(protocol.NOT_HOST, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
    if (components.path !== undefined) components.path = String(components.path).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(components.scheme ? protocol.NOT_PATH : protocol.NOT_PATH_NOSCHEME, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
    if (components.query !== undefined) components.query = String(components.query).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_QUERY, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
    if (components.fragment !== undefined) components.fragment = String(components.fragment).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_FRAGMENT, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
    return components;
}

function _stripLeadingZeros(str) {
    return str.replace(/^0*(.*)/, "$1") || "0";
}
function _normalizeIPv4(host, protocol) {
    var matches = host.match(protocol.IPV4ADDRESS) || [];

    var _matches = slicedToArray(matches, 2),
        address = _matches[1];

    if (address) {
        return address.split(".").map(_stripLeadingZeros).join(".");
    } else {
        return host;
    }
}
function _normalizeIPv6(host, protocol) {
    var matches = host.match(protocol.IPV6ADDRESS) || [];

    var _matches2 = slicedToArray(matches, 3),
        address = _matches2[1],
        zone = _matches2[2];

    if (address) {
        var _address$toLowerCase$ = address.toLowerCase().split('::').reverse(),
            _address$toLowerCase$2 = slicedToArray(_address$toLowerCase$, 2),
            last = _address$toLowerCase$2[0],
            first = _address$toLowerCase$2[1];

        var firstFields = first ? first.split(":").map(_stripLeadingZeros) : [];
        var lastFields = last.split(":").map(_stripLeadingZeros);
        var isLastFieldIPv4Address = protocol.IPV4ADDRESS.test(lastFields[lastFields.length - 1]);
        var fieldCount = isLastFieldIPv4Address ? 7 : 8;
        var lastFieldsStart = lastFields.length - fieldCount;
        var fields = Array(fieldCount);
        for (var x = 0; x < fieldCount; ++x) {
            fields[x] = firstFields[x] || lastFields[lastFieldsStart + x] || '';
        }
        if (isLastFieldIPv4Address) {
            fields[fieldCount - 1] = _normalizeIPv4(fields[fieldCount - 1], protocol);
        }
        var allZeroFields = fields.reduce(function (acc, field, index) {
            if (!field || field === "0") {
                var lastLongest = acc[acc.length - 1];
                if (lastLongest && lastLongest.index + lastLongest.length === index) {
                    lastLongest.length++;
                } else {
                    acc.push({ index: index, length: 1 });
                }
            }
            return acc;
        }, []);
        var longestZeroFields = allZeroFields.sort(function (a, b) {
            return b.length - a.length;
        })[0];
        var newHost = void 0;
        if (longestZeroFields && longestZeroFields.length > 1) {
            var newFirst = fields.slice(0, longestZeroFields.index);
            var newLast = fields.slice(longestZeroFields.index + longestZeroFields.length);
            newHost = newFirst.join(":") + "::" + newLast.join(":");
        } else {
            newHost = fields.join(":");
        }
        if (zone) {
            newHost += "%" + zone;
        }
        return newHost;
    } else {
        return host;
    }
}
var URI_PARSE = /^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?(\[[^\/?#\]]+\]|[^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n|\r)*))?/i;
var NO_MATCH_IS_UNDEFINED = "".match(/(){0}/)[1] === undefined;
function parse(uriString) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var components = {};
    var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
    if (options.reference === "suffix") uriString = (options.scheme ? options.scheme + ":" : "") + "//" + uriString;
    var matches = uriString.match(URI_PARSE);
    if (matches) {
        if (NO_MATCH_IS_UNDEFINED) {
            //store each component
            components.scheme = matches[1];
            components.userinfo = matches[3];
            components.host = matches[4];
            components.port = parseInt(matches[5], 10);
            components.path = matches[6] || "";
            components.query = matches[7];
            components.fragment = matches[8];
            //fix port number
            if (isNaN(components.port)) {
                components.port = matches[5];
            }
        } else {
            //IE FIX for improper RegExp matching
            //store each component
            components.scheme = matches[1] || undefined;
            components.userinfo = uriString.indexOf("@") !== -1 ? matches[3] : undefined;
            components.host = uriString.indexOf("//") !== -1 ? matches[4] : undefined;
            components.port = parseInt(matches[5], 10);
            components.path = matches[6] || "";
            components.query = uriString.indexOf("?") !== -1 ? matches[7] : undefined;
            components.fragment = uriString.indexOf("#") !== -1 ? matches[8] : undefined;
            //fix port number
            if (isNaN(components.port)) {
                components.port = uriString.match(/\/\/(?:.|\n)*\:(?:\/|\?|\#|$)/) ? matches[4] : undefined;
            }
        }
        if (components.host) {
            //normalize IP hosts
            components.host = _normalizeIPv6(_normalizeIPv4(components.host, protocol), protocol);
        }
        //determine reference type
        if (components.scheme === undefined && components.userinfo === undefined && components.host === undefined && components.port === undefined && !components.path && components.query === undefined) {
            components.reference = "same-document";
        } else if (components.scheme === undefined) {
            components.reference = "relative";
        } else if (components.fragment === undefined) {
            components.reference = "absolute";
        } else {
            components.reference = "uri";
        }
        //check for reference errors
        if (options.reference && options.reference !== "suffix" && options.reference !== components.reference) {
            components.error = components.error || "URI is not a " + options.reference + " reference.";
        }
        //find scheme handler
        var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
        //check if scheme can't handle IRIs
        if (!options.unicodeSupport && (!schemeHandler || !schemeHandler.unicodeSupport)) {
            //if host component is a domain name
            if (components.host && (options.domainHost || schemeHandler && schemeHandler.domainHost)) {
                //convert Unicode IDN -> ASCII IDN
                try {
                    components.host = punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase());
                } catch (e) {
                    components.error = components.error || "Host's domain name can not be converted to ASCII via punycode: " + e;
                }
            }
            //convert IRI -> URI
            _normalizeComponentEncoding(components, URI_PROTOCOL);
        } else {
            //normalize encodings
            _normalizeComponentEncoding(components, protocol);
        }
        //perform scheme specific parsing
        if (schemeHandler && schemeHandler.parse) {
            schemeHandler.parse(components, options);
        }
    } else {
        components.error = components.error || "URI can not be parsed.";
    }
    return components;
}

function _recomposeAuthority(components, options) {
    var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
    var uriTokens = [];
    if (components.userinfo !== undefined) {
        uriTokens.push(components.userinfo);
        uriTokens.push("@");
    }
    if (components.host !== undefined) {
        //normalize IP hosts, add brackets and escape zone separator for IPv6
        uriTokens.push(_normalizeIPv6(_normalizeIPv4(String(components.host), protocol), protocol).replace(protocol.IPV6ADDRESS, function (_, $1, $2) {
            return "[" + $1 + ($2 ? "%25" + $2 : "") + "]";
        }));
    }
    if (typeof components.port === "number" || typeof components.port === "string") {
        uriTokens.push(":");
        uriTokens.push(String(components.port));
    }
    return uriTokens.length ? uriTokens.join("") : undefined;
}

var RDS1 = /^\.\.?\//;
var RDS2 = /^\/\.(\/|$)/;
var RDS3 = /^\/\.\.(\/|$)/;
var RDS5 = /^\/?(?:.|\n)*?(?=\/|$)/;
function removeDotSegments(input) {
    var output = [];
    while (input.length) {
        if (input.match(RDS1)) {
            input = input.replace(RDS1, "");
        } else if (input.match(RDS2)) {
            input = input.replace(RDS2, "/");
        } else if (input.match(RDS3)) {
            input = input.replace(RDS3, "/");
            output.pop();
        } else if (input === "." || input === "..") {
            input = "";
        } else {
            var im = input.match(RDS5);
            if (im) {
                var s = im[0];
                input = input.slice(s.length);
                output.push(s);
            } else {
                throw new Error("Unexpected dot segment condition");
            }
        }
    }
    return output.join("");
}

function serialize(components) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var protocol = options.iri ? IRI_PROTOCOL : URI_PROTOCOL;
    var uriTokens = [];
    //find scheme handler
    var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
    //perform scheme specific serialization
    if (schemeHandler && schemeHandler.serialize) schemeHandler.serialize(components, options);
    if (components.host) {
        //if host component is an IPv6 address
        if (protocol.IPV6ADDRESS.test(components.host)) {}
        //TODO: normalize IPv6 address as per RFC 5952

        //if host component is a domain name
        else if (options.domainHost || schemeHandler && schemeHandler.domainHost) {
                //convert IDN via punycode
                try {
                    components.host = !options.iri ? punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase()) : punycode.toUnicode(components.host);
                } catch (e) {
                    components.error = components.error || "Host's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
                }
            }
    }
    //normalize encoding
    _normalizeComponentEncoding(components, protocol);
    if (options.reference !== "suffix" && components.scheme) {
        uriTokens.push(components.scheme);
        uriTokens.push(":");
    }
    var authority = _recomposeAuthority(components, options);
    if (authority !== undefined) {
        if (options.reference !== "suffix") {
            uriTokens.push("//");
        }
        uriTokens.push(authority);
        if (components.path && components.path.charAt(0) !== "/") {
            uriTokens.push("/");
        }
    }
    if (components.path !== undefined) {
        var s = components.path;
        if (!options.absolutePath && (!schemeHandler || !schemeHandler.absolutePath)) {
            s = removeDotSegments(s);
        }
        if (authority === undefined) {
            s = s.replace(/^\/\//, "/%2F"); //don't allow the path to start with "//"
        }
        uriTokens.push(s);
    }
    if (components.query !== undefined) {
        uriTokens.push("?");
        uriTokens.push(components.query);
    }
    if (components.fragment !== undefined) {
        uriTokens.push("#");
        uriTokens.push(components.fragment);
    }
    return uriTokens.join(""); //merge tokens into a string
}

function resolveComponents(base, relative) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var skipNormalization = arguments[3];

    var target = {};
    if (!skipNormalization) {
        base = parse(serialize(base, options), options); //normalize base components
        relative = parse(serialize(relative, options), options); //normalize relative components
    }
    options = options || {};
    if (!options.tolerant && relative.scheme) {
        target.scheme = relative.scheme;
        //target.authority = relative.authority;
        target.userinfo = relative.userinfo;
        target.host = relative.host;
        target.port = relative.port;
        target.path = removeDotSegments(relative.path || "");
        target.query = relative.query;
    } else {
        if (relative.userinfo !== undefined || relative.host !== undefined || relative.port !== undefined) {
            //target.authority = relative.authority;
            target.userinfo = relative.userinfo;
            target.host = relative.host;
            target.port = relative.port;
            target.path = removeDotSegments(relative.path || "");
            target.query = relative.query;
        } else {
            if (!relative.path) {
                target.path = base.path;
                if (relative.query !== undefined) {
                    target.query = relative.query;
                } else {
                    target.query = base.query;
                }
            } else {
                if (relative.path.charAt(0) === "/") {
                    target.path = removeDotSegments(relative.path);
                } else {
                    if ((base.userinfo !== undefined || base.host !== undefined || base.port !== undefined) && !base.path) {
                        target.path = "/" + relative.path;
                    } else if (!base.path) {
                        target.path = relative.path;
                    } else {
                        target.path = base.path.slice(0, base.path.lastIndexOf("/") + 1) + relative.path;
                    }
                    target.path = removeDotSegments(target.path);
                }
                target.query = relative.query;
            }
            //target.authority = base.authority;
            target.userinfo = base.userinfo;
            target.host = base.host;
            target.port = base.port;
        }
        target.scheme = base.scheme;
    }
    target.fragment = relative.fragment;
    return target;
}

function resolve(baseURI, relativeURI, options) {
    var schemelessOptions = assign({ scheme: 'null' }, options);
    return serialize(resolveComponents(parse(baseURI, schemelessOptions), parse(relativeURI, schemelessOptions), schemelessOptions, true), schemelessOptions);
}

function normalize(uri, options) {
    if (typeof uri === "string") {
        uri = serialize(parse(uri, options), options);
    } else if (typeOf(uri) === "object") {
        uri = parse(serialize(uri, options), options);
    }
    return uri;
}

function equal(uriA, uriB, options) {
    if (typeof uriA === "string") {
        uriA = serialize(parse(uriA, options), options);
    } else if (typeOf(uriA) === "object") {
        uriA = serialize(uriA, options);
    }
    if (typeof uriB === "string") {
        uriB = serialize(parse(uriB, options), options);
    } else if (typeOf(uriB) === "object") {
        uriB = serialize(uriB, options);
    }
    return uriA === uriB;
}

function escapeComponent(str, options) {
    return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.ESCAPE : IRI_PROTOCOL.ESCAPE, pctEncChar);
}

function unescapeComponent(str, options) {
    return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.PCT_ENCODED : IRI_PROTOCOL.PCT_ENCODED, pctDecChars);
}

var handler = {
    scheme: "http",
    domainHost: true,
    parse: function parse(components, options) {
        //report missing host
        if (!components.host) {
            components.error = components.error || "HTTP URIs must have a host.";
        }
        return components;
    },
    serialize: function serialize(components, options) {
        var secure = String(components.scheme).toLowerCase() === "https";
        //normalize the default port
        if (components.port === (secure ? 443 : 80) || components.port === "") {
            components.port = undefined;
        }
        //normalize the empty path
        if (!components.path) {
            components.path = "/";
        }
        //NOTE: We do not parse query strings for HTTP URIs
        //as WWW Form Url Encoded query strings are part of the HTML4+ spec,
        //and not the HTTP spec.
        return components;
    }
};

var handler$1 = {
    scheme: "https",
    domainHost: handler.domainHost,
    parse: handler.parse,
    serialize: handler.serialize
};

function isSecure(wsComponents) {
    return typeof wsComponents.secure === 'boolean' ? wsComponents.secure : String(wsComponents.scheme).toLowerCase() === "wss";
}
//RFC 6455
var handler$2 = {
    scheme: "ws",
    domainHost: true,
    parse: function parse(components, options) {
        var wsComponents = components;
        //indicate if the secure flag is set
        wsComponents.secure = isSecure(wsComponents);
        //construct resouce name
        wsComponents.resourceName = (wsComponents.path || '/') + (wsComponents.query ? '?' + wsComponents.query : '');
        wsComponents.path = undefined;
        wsComponents.query = undefined;
        return wsComponents;
    },
    serialize: function serialize(wsComponents, options) {
        //normalize the default port
        if (wsComponents.port === (isSecure(wsComponents) ? 443 : 80) || wsComponents.port === "") {
            wsComponents.port = undefined;
        }
        //ensure scheme matches secure flag
        if (typeof wsComponents.secure === 'boolean') {
            wsComponents.scheme = wsComponents.secure ? 'wss' : 'ws';
            wsComponents.secure = undefined;
        }
        //reconstruct path from resource name
        if (wsComponents.resourceName) {
            var _wsComponents$resourc = wsComponents.resourceName.split('?'),
                _wsComponents$resourc2 = slicedToArray(_wsComponents$resourc, 2),
                path = _wsComponents$resourc2[0],
                query = _wsComponents$resourc2[1];

            wsComponents.path = path && path !== '/' ? path : undefined;
            wsComponents.query = query;
            wsComponents.resourceName = undefined;
        }
        //forbid fragment component
        wsComponents.fragment = undefined;
        return wsComponents;
    }
};

var handler$3 = {
    scheme: "wss",
    domainHost: handler$2.domainHost,
    parse: handler$2.parse,
    serialize: handler$2.serialize
};

var O = {};
var isIRI = true;
//RFC 3986
var UNRESERVED$$ = "[A-Za-z0-9\\-\\.\\_\\~" + (isIRI ? "\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF" : "") + "]";
var HEXDIG$$ = "[0-9A-Fa-f]"; //case-insensitive
var PCT_ENCODED$ = subexp(subexp("%[EFef]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%" + HEXDIG$$ + HEXDIG$$)); //expanded
//RFC 5322, except these symbols as per RFC 6068: @ : / ? # [ ] & ; =
//const ATEXT$$ = "[A-Za-z0-9\\!\\#\\$\\%\\&\\'\\*\\+\\-\\/\\=\\?\\^\\_\\`\\{\\|\\}\\~]";
//const WSP$$ = "[\\x20\\x09]";
//const OBS_QTEXT$$ = "[\\x01-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F]";  //(%d1-8 / %d11-12 / %d14-31 / %d127)
//const QTEXT$$ = merge("[\\x21\\x23-\\x5B\\x5D-\\x7E]", OBS_QTEXT$$);  //%d33 / %d35-91 / %d93-126 / obs-qtext
//const VCHAR$$ = "[\\x21-\\x7E]";
//const WSP$$ = "[\\x20\\x09]";
//const OBS_QP$ = subexp("\\\\" + merge("[\\x00\\x0D\\x0A]", OBS_QTEXT$$));  //%d0 / CR / LF / obs-qtext
//const FWS$ = subexp(subexp(WSP$$ + "*" + "\\x0D\\x0A") + "?" + WSP$$ + "+");
//const QUOTED_PAIR$ = subexp(subexp("\\\\" + subexp(VCHAR$$ + "|" + WSP$$)) + "|" + OBS_QP$);
//const QUOTED_STRING$ = subexp('\\"' + subexp(FWS$ + "?" + QCONTENT$) + "*" + FWS$ + "?" + '\\"');
var ATEXT$$ = "[A-Za-z0-9\\!\\$\\%\\'\\*\\+\\-\\^\\_\\`\\{\\|\\}\\~]";
var QTEXT$$ = "[\\!\\$\\%\\'\\(\\)\\*\\+\\,\\-\\.0-9\\<\\>A-Z\\x5E-\\x7E]";
var VCHAR$$ = merge(QTEXT$$, "[\\\"\\\\]");
var SOME_DELIMS$$ = "[\\!\\$\\'\\(\\)\\*\\+\\,\\;\\:\\@]";
var UNRESERVED = new RegExp(UNRESERVED$$, "g");
var PCT_ENCODED = new RegExp(PCT_ENCODED$, "g");
var NOT_LOCAL_PART = new RegExp(merge("[^]", ATEXT$$, "[\\.]", '[\\"]', VCHAR$$), "g");
var NOT_HFNAME = new RegExp(merge("[^]", UNRESERVED$$, SOME_DELIMS$$), "g");
var NOT_HFVALUE = NOT_HFNAME;
function decodeUnreserved(str) {
    var decStr = pctDecChars(str);
    return !decStr.match(UNRESERVED) ? str : decStr;
}
var handler$4 = {
    scheme: "mailto",
    parse: function parse$$1(components, options) {
        var mailtoComponents = components;
        var to = mailtoComponents.to = mailtoComponents.path ? mailtoComponents.path.split(",") : [];
        mailtoComponents.path = undefined;
        if (mailtoComponents.query) {
            var unknownHeaders = false;
            var headers = {};
            var hfields = mailtoComponents.query.split("&");
            for (var x = 0, xl = hfields.length; x < xl; ++x) {
                var hfield = hfields[x].split("=");
                switch (hfield[0]) {
                    case "to":
                        var toAddrs = hfield[1].split(",");
                        for (var _x = 0, _xl = toAddrs.length; _x < _xl; ++_x) {
                            to.push(toAddrs[_x]);
                        }
                        break;
                    case "subject":
                        mailtoComponents.subject = unescapeComponent(hfield[1], options);
                        break;
                    case "body":
                        mailtoComponents.body = unescapeComponent(hfield[1], options);
                        break;
                    default:
                        unknownHeaders = true;
                        headers[unescapeComponent(hfield[0], options)] = unescapeComponent(hfield[1], options);
                        break;
                }
            }
            if (unknownHeaders) mailtoComponents.headers = headers;
        }
        mailtoComponents.query = undefined;
        for (var _x2 = 0, _xl2 = to.length; _x2 < _xl2; ++_x2) {
            var addr = to[_x2].split("@");
            addr[0] = unescapeComponent(addr[0]);
            if (!options.unicodeSupport) {
                //convert Unicode IDN -> ASCII IDN
                try {
                    addr[1] = punycode.toASCII(unescapeComponent(addr[1], options).toLowerCase());
                } catch (e) {
                    mailtoComponents.error = mailtoComponents.error || "Email address's domain name can not be converted to ASCII via punycode: " + e;
                }
            } else {
                addr[1] = unescapeComponent(addr[1], options).toLowerCase();
            }
            to[_x2] = addr.join("@");
        }
        return mailtoComponents;
    },
    serialize: function serialize$$1(mailtoComponents, options) {
        var components = mailtoComponents;
        var to = toArray(mailtoComponents.to);
        if (to) {
            for (var x = 0, xl = to.length; x < xl; ++x) {
                var toAddr = String(to[x]);
                var atIdx = toAddr.lastIndexOf("@");
                var localPart = toAddr.slice(0, atIdx).replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_LOCAL_PART, pctEncChar);
                var domain = toAddr.slice(atIdx + 1);
                //convert IDN via punycode
                try {
                    domain = !options.iri ? punycode.toASCII(unescapeComponent(domain, options).toLowerCase()) : punycode.toUnicode(domain);
                } catch (e) {
                    components.error = components.error || "Email address's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
                }
                to[x] = localPart + "@" + domain;
            }
            components.path = to.join(",");
        }
        var headers = mailtoComponents.headers = mailtoComponents.headers || {};
        if (mailtoComponents.subject) headers["subject"] = mailtoComponents.subject;
        if (mailtoComponents.body) headers["body"] = mailtoComponents.body;
        var fields = [];
        for (var name in headers) {
            if (headers[name] !== O[name]) {
                fields.push(name.replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFNAME, pctEncChar) + "=" + headers[name].replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFVALUE, pctEncChar));
            }
        }
        if (fields.length) {
            components.query = fields.join("&");
        }
        return components;
    }
};

var URN_PARSE = /^([^\:]+)\:(.*)/;
//RFC 2141
var handler$5 = {
    scheme: "urn",
    parse: function parse$$1(components, options) {
        var matches = components.path && components.path.match(URN_PARSE);
        var urnComponents = components;
        if (matches) {
            var scheme = options.scheme || urnComponents.scheme || "urn";
            var nid = matches[1].toLowerCase();
            var nss = matches[2];
            var urnScheme = scheme + ":" + (options.nid || nid);
            var schemeHandler = SCHEMES[urnScheme];
            urnComponents.nid = nid;
            urnComponents.nss = nss;
            urnComponents.path = undefined;
            if (schemeHandler) {
                urnComponents = schemeHandler.parse(urnComponents, options);
            }
        } else {
            urnComponents.error = urnComponents.error || "URN can not be parsed.";
        }
        return urnComponents;
    },
    serialize: function serialize$$1(urnComponents, options) {
        var scheme = options.scheme || urnComponents.scheme || "urn";
        var nid = urnComponents.nid;
        var urnScheme = scheme + ":" + (options.nid || nid);
        var schemeHandler = SCHEMES[urnScheme];
        if (schemeHandler) {
            urnComponents = schemeHandler.serialize(urnComponents, options);
        }
        var uriComponents = urnComponents;
        var nss = urnComponents.nss;
        uriComponents.path = (nid || options.nid) + ":" + nss;
        return uriComponents;
    }
};

var UUID = /^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/;
//RFC 4122
var handler$6 = {
    scheme: "urn:uuid",
    parse: function parse(urnComponents, options) {
        var uuidComponents = urnComponents;
        uuidComponents.uuid = uuidComponents.nss;
        uuidComponents.nss = undefined;
        if (!options.tolerant && (!uuidComponents.uuid || !uuidComponents.uuid.match(UUID))) {
            uuidComponents.error = uuidComponents.error || "UUID is not valid.";
        }
        return uuidComponents;
    },
    serialize: function serialize(uuidComponents, options) {
        var urnComponents = uuidComponents;
        //normalize UUID
        urnComponents.nss = (uuidComponents.uuid || "").toLowerCase();
        return urnComponents;
    }
};

SCHEMES[handler.scheme] = handler;
SCHEMES[handler$1.scheme] = handler$1;
SCHEMES[handler$2.scheme] = handler$2;
SCHEMES[handler$3.scheme] = handler$3;
SCHEMES[handler$4.scheme] = handler$4;
SCHEMES[handler$5.scheme] = handler$5;
SCHEMES[handler$6.scheme] = handler$6;

exports.SCHEMES = SCHEMES;
exports.pctEncChar = pctEncChar;
exports.pctDecChars = pctDecChars;
exports.parse = parse;
exports.removeDotSegments = removeDotSegments;
exports.serialize = serialize;
exports.resolveComponents = resolveComponents;
exports.resolve = resolve;
exports.normalize = normalize;
exports.equal = equal;
exports.escapeComponent = escapeComponent;
exports.unescapeComponent = unescapeComponent;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=uri.all.js.map


/***/ }),

/***/ 1452:
/***/ (function(__unused_webpack_module, exports) {

/**
 * web-streams-polyfill v3.1.0
 */
(function (global, factory) {
     true ? factory(exports) :
    0;
}(this, (function (exports) { 'use strict';

    /// <reference lib="es2015.symbol" />
    const SymbolPolyfill = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ?
        Symbol :
        description => `Symbol(${description})`;

    /// <reference lib="dom" />
    function noop() {
        return undefined;
    }
    function getGlobals() {
        if (typeof self !== 'undefined') {
            return self;
        }
        else if (typeof window !== 'undefined') {
            return window;
        }
        else if (typeof global !== 'undefined') {
            return global;
        }
        return undefined;
    }
    const globals = getGlobals();

    function typeIsObject(x) {
        return (typeof x === 'object' && x !== null) || typeof x === 'function';
    }
    const rethrowAssertionErrorRejection = noop;

    const originalPromise = Promise;
    const originalPromiseThen = Promise.prototype.then;
    const originalPromiseResolve = Promise.resolve.bind(originalPromise);
    const originalPromiseReject = Promise.reject.bind(originalPromise);
    function newPromise(executor) {
        return new originalPromise(executor);
    }
    function promiseResolvedWith(value) {
        return originalPromiseResolve(value);
    }
    function promiseRejectedWith(reason) {
        return originalPromiseReject(reason);
    }
    function PerformPromiseThen(promise, onFulfilled, onRejected) {
        // There doesn't appear to be any way to correctly emulate the behaviour from JavaScript, so this is just an
        // approximation.
        return originalPromiseThen.call(promise, onFulfilled, onRejected);
    }
    function uponPromise(promise, onFulfilled, onRejected) {
        PerformPromiseThen(PerformPromiseThen(promise, onFulfilled, onRejected), undefined, rethrowAssertionErrorRejection);
    }
    function uponFulfillment(promise, onFulfilled) {
        uponPromise(promise, onFulfilled);
    }
    function uponRejection(promise, onRejected) {
        uponPromise(promise, undefined, onRejected);
    }
    function transformPromiseWith(promise, fulfillmentHandler, rejectionHandler) {
        return PerformPromiseThen(promise, fulfillmentHandler, rejectionHandler);
    }
    function setPromiseIsHandledToTrue(promise) {
        PerformPromiseThen(promise, undefined, rethrowAssertionErrorRejection);
    }
    const queueMicrotask = (() => {
        const globalQueueMicrotask = globals && globals.queueMicrotask;
        if (typeof globalQueueMicrotask === 'function') {
            return globalQueueMicrotask;
        }
        const resolvedPromise = promiseResolvedWith(undefined);
        return (fn) => PerformPromiseThen(resolvedPromise, fn);
    })();
    function reflectCall(F, V, args) {
        if (typeof F !== 'function') {
            throw new TypeError('Argument is not a function');
        }
        return Function.prototype.apply.call(F, V, args);
    }
    function promiseCall(F, V, args) {
        try {
            return promiseResolvedWith(reflectCall(F, V, args));
        }
        catch (value) {
            return promiseRejectedWith(value);
        }
    }

    // Original from Chromium
    // https://chromium.googlesource.com/chromium/src/+/0aee4434a4dba42a42abaea9bfbc0cd196a63bc1/third_party/blink/renderer/core/streams/SimpleQueue.js
    const QUEUE_MAX_ARRAY_SIZE = 16384;
    /**
     * Simple queue structure.
     *
     * Avoids scalability issues with using a packed array directly by using
     * multiple arrays in a linked list and keeping the array size bounded.
     */
    class SimpleQueue {
        constructor() {
            this._cursor = 0;
            this._size = 0;
            // _front and _back are always defined.
            this._front = {
                _elements: [],
                _next: undefined
            };
            this._back = this._front;
            // The cursor is used to avoid calling Array.shift().
            // It contains the index of the front element of the array inside the
            // front-most node. It is always in the range [0, QUEUE_MAX_ARRAY_SIZE).
            this._cursor = 0;
            // When there is only one node, size === elements.length - cursor.
            this._size = 0;
        }
        get length() {
            return this._size;
        }
        // For exception safety, this method is structured in order:
        // 1. Read state
        // 2. Calculate required state mutations
        // 3. Perform state mutations
        push(element) {
            const oldBack = this._back;
            let newBack = oldBack;
            if (oldBack._elements.length === QUEUE_MAX_ARRAY_SIZE - 1) {
                newBack = {
                    _elements: [],
                    _next: undefined
                };
            }
            // push() is the mutation most likely to throw an exception, so it
            // goes first.
            oldBack._elements.push(element);
            if (newBack !== oldBack) {
                this._back = newBack;
                oldBack._next = newBack;
            }
            ++this._size;
        }
        // Like push(), shift() follows the read -> calculate -> mutate pattern for
        // exception safety.
        shift() { // must not be called on an empty queue
            const oldFront = this._front;
            let newFront = oldFront;
            const oldCursor = this._cursor;
            let newCursor = oldCursor + 1;
            const elements = oldFront._elements;
            const element = elements[oldCursor];
            if (newCursor === QUEUE_MAX_ARRAY_SIZE) {
                newFront = oldFront._next;
                newCursor = 0;
            }
            // No mutations before this point.
            --this._size;
            this._cursor = newCursor;
            if (oldFront !== newFront) {
                this._front = newFront;
            }
            // Permit shifted element to be garbage collected.
            elements[oldCursor] = undefined;
            return element;
        }
        // The tricky thing about forEach() is that it can be called
        // re-entrantly. The queue may be mutated inside the callback. It is easy to
        // see that push() within the callback has no negative effects since the end
        // of the queue is checked for on every iteration. If shift() is called
        // repeatedly within the callback then the next iteration may return an
        // element that has been removed. In this case the callback will be called
        // with undefined values until we either "catch up" with elements that still
        // exist or reach the back of the queue.
        forEach(callback) {
            let i = this._cursor;
            let node = this._front;
            let elements = node._elements;
            while (i !== elements.length || node._next !== undefined) {
                if (i === elements.length) {
                    node = node._next;
                    elements = node._elements;
                    i = 0;
                    if (elements.length === 0) {
                        break;
                    }
                }
                callback(elements[i]);
                ++i;
            }
        }
        // Return the element that would be returned if shift() was called now,
        // without modifying the queue.
        peek() { // must not be called on an empty queue
            const front = this._front;
            const cursor = this._cursor;
            return front._elements[cursor];
        }
    }

    function ReadableStreamReaderGenericInitialize(reader, stream) {
        reader._ownerReadableStream = stream;
        stream._reader = reader;
        if (stream._state === 'readable') {
            defaultReaderClosedPromiseInitialize(reader);
        }
        else if (stream._state === 'closed') {
            defaultReaderClosedPromiseInitializeAsResolved(reader);
        }
        else {
            defaultReaderClosedPromiseInitializeAsRejected(reader, stream._storedError);
        }
    }
    // A client of ReadableStreamDefaultReader and ReadableStreamBYOBReader may use these functions directly to bypass state
    // check.
    function ReadableStreamReaderGenericCancel(reader, reason) {
        const stream = reader._ownerReadableStream;
        return ReadableStreamCancel(stream, reason);
    }
    function ReadableStreamReaderGenericRelease(reader) {
        if (reader._ownerReadableStream._state === 'readable') {
            defaultReaderClosedPromiseReject(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
        }
        else {
            defaultReaderClosedPromiseResetToRejected(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
        }
        reader._ownerReadableStream._reader = undefined;
        reader._ownerReadableStream = undefined;
    }
    // Helper functions for the readers.
    function readerLockException(name) {
        return new TypeError('Cannot ' + name + ' a stream using a released reader');
    }
    // Helper functions for the ReadableStreamDefaultReader.
    function defaultReaderClosedPromiseInitialize(reader) {
        reader._closedPromise = newPromise((resolve, reject) => {
            reader._closedPromise_resolve = resolve;
            reader._closedPromise_reject = reject;
        });
    }
    function defaultReaderClosedPromiseInitializeAsRejected(reader, reason) {
        defaultReaderClosedPromiseInitialize(reader);
        defaultReaderClosedPromiseReject(reader, reason);
    }
    function defaultReaderClosedPromiseInitializeAsResolved(reader) {
        defaultReaderClosedPromiseInitialize(reader);
        defaultReaderClosedPromiseResolve(reader);
    }
    function defaultReaderClosedPromiseReject(reader, reason) {
        if (reader._closedPromise_reject === undefined) {
            return;
        }
        setPromiseIsHandledToTrue(reader._closedPromise);
        reader._closedPromise_reject(reason);
        reader._closedPromise_resolve = undefined;
        reader._closedPromise_reject = undefined;
    }
    function defaultReaderClosedPromiseResetToRejected(reader, reason) {
        defaultReaderClosedPromiseInitializeAsRejected(reader, reason);
    }
    function defaultReaderClosedPromiseResolve(reader) {
        if (reader._closedPromise_resolve === undefined) {
            return;
        }
        reader._closedPromise_resolve(undefined);
        reader._closedPromise_resolve = undefined;
        reader._closedPromise_reject = undefined;
    }

    const AbortSteps = SymbolPolyfill('[[AbortSteps]]');
    const ErrorSteps = SymbolPolyfill('[[ErrorSteps]]');
    const CancelSteps = SymbolPolyfill('[[CancelSteps]]');
    const PullSteps = SymbolPolyfill('[[PullSteps]]');

    /// <reference lib="es2015.core" />
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite#Polyfill
    const NumberIsFinite = Number.isFinite || function (x) {
        return typeof x === 'number' && isFinite(x);
    };

    /// <reference lib="es2015.core" />
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc#Polyfill
    const MathTrunc = Math.trunc || function (v) {
        return v < 0 ? Math.ceil(v) : Math.floor(v);
    };

    // https://heycam.github.io/webidl/#idl-dictionaries
    function isDictionary(x) {
        return typeof x === 'object' || typeof x === 'function';
    }
    function assertDictionary(obj, context) {
        if (obj !== undefined && !isDictionary(obj)) {
            throw new TypeError(`${context} is not an object.`);
        }
    }
    // https://heycam.github.io/webidl/#idl-callback-functions
    function assertFunction(x, context) {
        if (typeof x !== 'function') {
            throw new TypeError(`${context} is not a function.`);
        }
    }
    // https://heycam.github.io/webidl/#idl-object
    function isObject(x) {
        return (typeof x === 'object' && x !== null) || typeof x === 'function';
    }
    function assertObject(x, context) {
        if (!isObject(x)) {
            throw new TypeError(`${context} is not an object.`);
        }
    }
    function assertRequiredArgument(x, position, context) {
        if (x === undefined) {
            throw new TypeError(`Parameter ${position} is required in '${context}'.`);
        }
    }
    function assertRequiredField(x, field, context) {
        if (x === undefined) {
            throw new TypeError(`${field} is required in '${context}'.`);
        }
    }
    // https://heycam.github.io/webidl/#idl-unrestricted-double
    function convertUnrestrictedDouble(value) {
        return Number(value);
    }
    function censorNegativeZero(x) {
        return x === 0 ? 0 : x;
    }
    function integerPart(x) {
        return censorNegativeZero(MathTrunc(x));
    }
    // https://heycam.github.io/webidl/#idl-unsigned-long-long
    function convertUnsignedLongLongWithEnforceRange(value, context) {
        const lowerBound = 0;
        const upperBound = Number.MAX_SAFE_INTEGER;
        let x = Number(value);
        x = censorNegativeZero(x);
        if (!NumberIsFinite(x)) {
            throw new TypeError(`${context} is not a finite number`);
        }
        x = integerPart(x);
        if (x < lowerBound || x > upperBound) {
            throw new TypeError(`${context} is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`);
        }
        if (!NumberIsFinite(x) || x === 0) {
            return 0;
        }
        // TODO Use BigInt if supported?
        // let xBigInt = BigInt(integerPart(x));
        // xBigInt = BigInt.asUintN(64, xBigInt);
        // return Number(xBigInt);
        return x;
    }

    function assertReadableStream(x, context) {
        if (!IsReadableStream(x)) {
            throw new TypeError(`${context} is not a ReadableStream.`);
        }
    }

    // Abstract operations for the ReadableStream.
    function AcquireReadableStreamDefaultReader(stream) {
        return new ReadableStreamDefaultReader(stream);
    }
    // ReadableStream API exposed for controllers.
    function ReadableStreamAddReadRequest(stream, readRequest) {
        stream._reader._readRequests.push(readRequest);
    }
    function ReadableStreamFulfillReadRequest(stream, chunk, done) {
        const reader = stream._reader;
        const readRequest = reader._readRequests.shift();
        if (done) {
            readRequest._closeSteps();
        }
        else {
            readRequest._chunkSteps(chunk);
        }
    }
    function ReadableStreamGetNumReadRequests(stream) {
        return stream._reader._readRequests.length;
    }
    function ReadableStreamHasDefaultReader(stream) {
        const reader = stream._reader;
        if (reader === undefined) {
            return false;
        }
        if (!IsReadableStreamDefaultReader(reader)) {
            return false;
        }
        return true;
    }
    /**
     * A default reader vended by a {@link ReadableStream}.
     *
     * @public
     */
    class ReadableStreamDefaultReader {
        constructor(stream) {
            assertRequiredArgument(stream, 1, 'ReadableStreamDefaultReader');
            assertReadableStream(stream, 'First parameter');
            if (IsReadableStreamLocked(stream)) {
                throw new TypeError('This stream has already been locked for exclusive reading by another reader');
            }
            ReadableStreamReaderGenericInitialize(this, stream);
            this._readRequests = new SimpleQueue();
        }
        /**
         * Returns a promise that will be fulfilled when the stream becomes closed,
         * or rejected if the stream ever errors or the reader's lock is released before the stream finishes closing.
         */
        get closed() {
            if (!IsReadableStreamDefaultReader(this)) {
                return promiseRejectedWith(defaultReaderBrandCheckException('closed'));
            }
            return this._closedPromise;
        }
        /**
         * If the reader is active, behaves the same as {@link ReadableStream.cancel | stream.cancel(reason)}.
         */
        cancel(reason = undefined) {
            if (!IsReadableStreamDefaultReader(this)) {
                return promiseRejectedWith(defaultReaderBrandCheckException('cancel'));
            }
            if (this._ownerReadableStream === undefined) {
                return promiseRejectedWith(readerLockException('cancel'));
            }
            return ReadableStreamReaderGenericCancel(this, reason);
        }
        /**
         * Returns a promise that allows access to the next chunk from the stream's internal queue, if available.
         *
         * If reading a chunk causes the queue to become empty, more data will be pulled from the underlying source.
         */
        read() {
            if (!IsReadableStreamDefaultReader(this)) {
                return promiseRejectedWith(defaultReaderBrandCheckException('read'));
            }
            if (this._ownerReadableStream === undefined) {
                return promiseRejectedWith(readerLockException('read from'));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve, reject) => {
                resolvePromise = resolve;
                rejectPromise = reject;
            });
            const readRequest = {
                _chunkSteps: chunk => resolvePromise({ value: chunk, done: false }),
                _closeSteps: () => resolvePromise({ value: undefined, done: true }),
                _errorSteps: e => rejectPromise(e)
            };
            ReadableStreamDefaultReaderRead(this, readRequest);
            return promise;
        }
        /**
         * Releases the reader's lock on the corresponding stream. After the lock is released, the reader is no longer active.
         * If the associated stream is errored when the lock is released, the reader will appear errored in the same way
         * from now on; otherwise, the reader will appear closed.
         *
         * A reader's lock cannot be released while it still has a pending read request, i.e., if a promise returned by
         * the reader's {@link ReadableStreamDefaultReader.read | read()} method has not yet been settled. Attempting to
         * do so will throw a `TypeError` and leave the reader locked to the stream.
         */
        releaseLock() {
            if (!IsReadableStreamDefaultReader(this)) {
                throw defaultReaderBrandCheckException('releaseLock');
            }
            if (this._ownerReadableStream === undefined) {
                return;
            }
            if (this._readRequests.length > 0) {
                throw new TypeError('Tried to release a reader lock when that reader has pending read() calls un-settled');
            }
            ReadableStreamReaderGenericRelease(this);
        }
    }
    Object.defineProperties(ReadableStreamDefaultReader.prototype, {
        cancel: { enumerable: true },
        read: { enumerable: true },
        releaseLock: { enumerable: true },
        closed: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
        Object.defineProperty(ReadableStreamDefaultReader.prototype, SymbolPolyfill.toStringTag, {
            value: 'ReadableStreamDefaultReader',
            configurable: true
        });
    }
    // Abstract operations for the readers.
    function IsReadableStreamDefaultReader(x) {
        if (!typeIsObject(x)) {
            return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x, '_readRequests')) {
            return false;
        }
        return x instanceof ReadableStreamDefaultReader;
    }
    function ReadableStreamDefaultReaderRead(reader, readRequest) {
        const stream = reader._ownerReadableStream;
        stream._disturbed = true;
        if (stream._state === 'closed') {
            readRequest._closeSteps();
        }
        else if (stream._state === 'errored') {
            readRequest._errorSteps(stream._storedError);
        }
        else {
            stream._readableStreamController[PullSteps](readRequest);
        }
    }
    // Helper functions for the ReadableStreamDefaultReader.
    function defaultReaderBrandCheckException(name) {
        return new TypeError(`ReadableStreamDefaultReader.prototype.${name} can only be used on a ReadableStreamDefaultReader`);
    }

    /// <reference lib="es2018.asynciterable" />
    /* eslint-disable @typescript-eslint/no-empty-function */
    const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () { }).prototype);

    /// <reference lib="es2018.asynciterable" />
    class ReadableStreamAsyncIteratorImpl {
        constructor(reader, preventCancel) {
            this._ongoingPromise = undefined;
            this._isFinished = false;
            this._reader = reader;
            this._preventCancel = preventCancel;
        }
        next() {
            const nextSteps = () => this._nextSteps();
            this._ongoingPromise = this._ongoingPromise ?
                transformPromiseWith(this._ongoingPromise, nextSteps, nextSteps) :
                nextSteps();
            return this._ongoingPromise;
        }
        return(value) {
            const returnSteps = () => this._returnSteps(value);
            return this._ongoingPromise ?
                transformPromiseWith(this._ongoingPromise, returnSteps, returnSteps) :
                returnSteps();
        }
        _nextSteps() {
            if (this._isFinished) {
                return Promise.resolve({ value: undefined, done: true });
            }
            const reader = this._reader;
            if (reader._ownerReadableStream === undefined) {
                return promiseRejectedWith(readerLockException('iterate'));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve, reject) => {
                resolvePromise = resolve;
                rejectPromise = reject;
            });
            const readRequest = {
                _chunkSteps: chunk => {
                    this._ongoingPromise = undefined;
                    // This needs to be delayed by one microtask, otherwise we stop pulling too early which breaks a test.
                    // FIXME Is this a bug in the specification, or in the test?
                    queueMicrotask(() => resolvePromise({ value: chunk, done: false }));
                },
                _closeSteps: () => {
                    this._ongoingPromise = undefined;
                    this._isFinished = true;
                    ReadableStreamReaderGenericRelease(reader);
                    resolvePromise({ value: undefined, done: true });
                },
                _errorSteps: reason => {
                    this._ongoingPromise = undefined;
                    this._isFinished = true;
                    ReadableStreamReaderGenericRelease(reader);
                    rejectPromise(reason);
                }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
            return promise;
        }
        _returnSteps(value) {
            if (this._isFinished) {
                return Promise.resolve({ value, done: true });
            }
            this._isFinished = true;
            const reader = this._reader;
            if (reader._ownerReadableStream === undefined) {
                return promiseRejectedWith(readerLockException('finish iterating'));
            }
            if (!this._preventCancel) {
                const result = ReadableStreamReaderGenericCancel(reader, value);
                ReadableStreamReaderGenericRelease(reader);
                return transformPromiseWith(result, () => ({ value, done: true }));
            }
            ReadableStreamReaderGenericRelease(reader);
            return promiseResolvedWith({ value, done: true });
        }
    }
    const ReadableStreamAsyncIteratorPrototype = {
        next() {
            if (!IsReadableStreamAsyncIterator(this)) {
                return promiseRejectedWith(streamAsyncIteratorBrandCheckException('next'));
            }
            return this._asyncIteratorImpl.next();
        },
        return(value) {
            if (!IsReadableStreamAsyncIterator(this)) {
                return promiseRejectedWith(streamAsyncIteratorBrandCheckException('return'));
            }
            return this._asyncIteratorImpl.return(value);
        }
    };
    if (AsyncIteratorPrototype !== undefined) {
        Object.setPrototypeOf(ReadableStreamAsyncIteratorPrototype, AsyncIteratorPrototype);
    }
    // Abstract operations for the ReadableStream.
    function AcquireReadableStreamAsyncIterator(stream, preventCancel) {
        const reader = AcquireReadableStreamDefaultReader(stream);
        const impl = new ReadableStreamAsyncIteratorImpl(reader, preventCancel);
        const iterator = Object.create(ReadableStreamAsyncIteratorPrototype);
        iterator._asyncIteratorImpl = impl;
        return iterator;
    }
    function IsReadableStreamAsyncIterator(x) {
        if (!typeIsObject(x)) {
            return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x, '_asyncIteratorImpl')) {
            return false;
        }
        try {
            // noinspection SuspiciousTypeOfGuard
            return x._asyncIteratorImpl instanceof
                ReadableStreamAsyncIteratorImpl;
        }
        catch (_a) {
            return false;
        }
    }
    // Helper functions for the ReadableStream.
    function streamAsyncIteratorBrandCheckException(name) {
        return new TypeError(`ReadableStreamAsyncIterator.${name} can only be used on a ReadableSteamAsyncIterator`);
    }

    /// <reference lib="es2015.core" />
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN#Polyfill
    const NumberIsNaN = Number.isNaN || function (x) {
        // eslint-disable-next-line no-self-compare
        return x !== x;
    };

    function CreateArrayFromList(elements) {
        // We use arrays to represent lists, so this is basically a no-op.
        // Do a slice though just in case we happen to depend on the unique-ness.
        return elements.slice();
    }
    function CopyDataBlockBytes(dest, destOffset, src, srcOffset, n) {
        new Uint8Array(dest).set(new Uint8Array(src, srcOffset, n), destOffset);
    }
    // Not implemented correctly
    function TransferArrayBuffer(O) {
        return O;
    }
    // Not implemented correctly
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function IsDetachedBuffer(O) {
        return false;
    }
    function ArrayBufferSlice(buffer, begin, end) {
        // ArrayBuffer.prototype.slice is not available on IE10
        // https://www.caniuse.com/mdn-javascript_builtins_arraybuffer_slice
        if (buffer.slice) {
            return buffer.slice(begin, end);
        }
        const length = end - begin;
        const slice = new ArrayBuffer(length);
        CopyDataBlockBytes(slice, 0, buffer, begin, length);
        return slice;
    }

    function IsNonNegativeNumber(v) {
        if (typeof v !== 'number') {
            return false;
        }
        if (NumberIsNaN(v)) {
            return false;
        }
        if (v < 0) {
            return false;
        }
        return true;
    }
    function CloneAsUint8Array(O) {
        const buffer = ArrayBufferSlice(O.buffer, O.byteOffset, O.byteOffset + O.byteLength);
        return new Uint8Array(buffer);
    }

    function DequeueValue(container) {
        const pair = container._queue.shift();
        container._queueTotalSize -= pair.size;
        if (container._queueTotalSize < 0) {
            container._queueTotalSize = 0;
        }
        return pair.value;
    }
    function EnqueueValueWithSize(container, value, size) {
        if (!IsNonNegativeNumber(size) || size === Infinity) {
            throw new RangeError('Size must be a finite, non-NaN, non-negative number.');
        }
        container._queue.push({ value, size });
        container._queueTotalSize += size;
    }
    function PeekQueueValue(container) {
        const pair = container._queue.peek();
        return pair.value;
    }
    function ResetQueue(container) {
        container._queue = new SimpleQueue();
        container._queueTotalSize = 0;
    }

    /**
     * A pull-into request in a {@link ReadableByteStreamController}.
     *
     * @public
     */
    class ReadableStreamBYOBRequest {
        constructor() {
            throw new TypeError('Illegal constructor');
        }
        /**
         * Returns the view for writing in to, or `null` if the BYOB request has already been responded to.
         */
        get view() {
            if (!IsReadableStreamBYOBRequest(this)) {
                throw byobRequestBrandCheckException('view');
            }
            return this._view;
        }
        respond(bytesWritten) {
            if (!IsReadableStreamBYOBRequest(this)) {
                throw byobRequestBrandCheckException('respond');
            }
            assertRequiredArgument(bytesWritten, 1, 'respond');
            bytesWritten = convertUnsignedLongLongWithEnforceRange(bytesWritten, 'First parameter');
            if (this._associatedReadableByteStreamController === undefined) {
                throw new TypeError('This BYOB request has been invalidated');
            }
            if (IsDetachedBuffer(this._view.buffer)) ;
            ReadableByteStreamControllerRespond(this._associatedReadableByteStreamController, bytesWritten);
        }
        respondWithNewView(view) {
            if (!IsReadableStreamBYOBRequest(this)) {
                throw byobRequestBrandCheckException('respondWithNewView');
            }
            assertRequiredArgument(view, 1, 'respondWithNewView');
            if (!ArrayBuffer.isView(view)) {
                throw new TypeError('You can only respond with array buffer views');
            }
            if (this._associatedReadableByteStreamController === undefined) {
                throw new TypeError('This BYOB request has been invalidated');
            }
            if (IsDetachedBuffer(view.buffer)) ;
            ReadableByteStreamControllerRespondWithNewView(this._associatedReadableByteStreamController, view);
        }
    }
    Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
        respond: { enumerable: true },
        respondWithNewView: { enumerable: true },
        view: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
        Object.defineProperty(ReadableStreamBYOBRequest.prototype, SymbolPolyfill.toStringTag, {
            value: 'ReadableStreamBYOBRequest',
            configurable: true
        });
    }
    /**
     * Allows control of a {@link ReadableStream | readable byte stream}'s state and internal queue.
     *
     * @public
     */
    class ReadableByteStreamController {
        constructor() {
            throw new TypeError('Illegal constructor');
        }
        /**
         * Returns the current BYOB pull request, or `null` if there isn't one.
         */
        get byobRequest() {
            if (!IsReadableByteStreamController(this)) {
                throw byteStreamControllerBrandCheckException('byobRequest');
            }
            return ReadableByteStreamControllerGetBYOBRequest(this);
        }
        /**
         * Returns the desired size to fill the controlled stream's internal queue. It can be negative, if the queue is
         * over-full. An underlying byte source ought to use this information to determine when and how to apply backpressure.
         */
        get desiredSize() {
            if (!IsReadableByteStreamController(this)) {
                throw byteStreamControllerBrandCheckException('desiredSize');
            }
            return ReadableByteStreamControllerGetDesiredSize(this);
        }
        /**
         * Closes the controlled readable stream. Consumers will still be able to read any previously-enqueued chunks from
         * the stream, but once those are read, the stream will become closed.
         */
        close() {
            if (!IsReadableByteStreamController(this)) {
                throw byteStreamControllerBrandCheckException('close');
            }
            if (this._closeRequested) {
                throw new TypeError('The stream has already been closed; do not close it again!');
            }
            const state = this._controlledReadableByteStream._state;
            if (state !== 'readable') {
                throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be closed`);
            }
            ReadableByteStreamControllerClose(this);
        }
        enqueue(chunk) {
            if (!IsReadableByteStreamController(this)) {
                throw byteStreamControllerBrandCheckException('enqueue');
            }
            assertRequiredArgument(chunk, 1, 'enqueue');
            if (!ArrayBuffer.isView(chunk)) {
                throw new TypeError('chunk must be an array buffer view');
            }
            if (chunk.byteLength === 0) {
                throw new TypeError('chunk must have non-zero byteLength');
            }
            if (chunk.buffer.byteLength === 0) {
                throw new TypeError(`chunk's buffer must have non-zero byteLength`);
            }
            if (this._closeRequested) {
                throw new TypeError('stream is closed or draining');
            }
            const state = this._controlledReadableByteStream._state;
            if (state !== 'readable') {
                throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be enqueued to`);
            }
            ReadableByteStreamControllerEnqueue(this, chunk);
        }
        /**
         * Errors the controlled readable stream, making all future interactions with it fail with the given error `e`.
         */
        error(e = undefined) {
            if (!IsReadableByteStreamController(this)) {
                throw byteStreamControllerBrandCheckException('error');
            }
            ReadableByteStreamControllerError(this, e);
        }
        /** @internal */
        [CancelSteps](reason) {
            ReadableByteStreamControllerClearPendingPullIntos(this);
            ResetQueue(this);
            const result = this._cancelAlgorithm(reason);
            ReadableByteStreamControllerClearAlgorithms(this);
            return result;
        }
        /** @internal */
        [PullSteps](readRequest) {
            const stream = this._controlledReadableByteStream;
            if (this._queueTotalSize > 0) {
                const entry = this._queue.shift();
                this._queueTotalSize -= entry.byteLength;
                ReadableByteStreamControllerHandleQueueDrain(this);
                const view = new Uint8Array(entry.buffer, entry.byteOffset, entry.byteLength);
                readRequest._chunkSteps(view);
                return;
            }
            const autoAllocateChunkSize = this._autoAllocateChunkSize;
            if (autoAllocateChunkSize !== undefined) {
                let buffer;
                try {
                    buffer = new ArrayBuffer(autoAllocateChunkSize);
                }
                catch (bufferE) {
                    readRequest._errorSteps(bufferE);
                    return;
                }
                const pullIntoDescriptor = {
                    buffer,
                    bufferByteLength: autoAllocateChunkSize,
                    byteOffset: 0,
                    byteLength: autoAllocateChunkSize,
                    bytesFilled: 0,
                    elementSize: 1,
                    viewConstructor: Uint8Array,
                    readerType: 'default'
                };
                this._pendingPullIntos.push(pullIntoDescriptor);
            }
            ReadableStreamAddReadRequest(stream, readRequest);
            ReadableByteStreamControllerCallPullIfNeeded(this);
        }
    }
    Object.defineProperties(ReadableByteStreamController.prototype, {
        close: { enumerable: true },
        enqueue: { enumerable: true },
        error: { enumerable: true },
        byobRequest: { enumerable: true },
        desiredSize: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
        Object.defineProperty(ReadableByteStreamController.prototype, SymbolPolyfill.toStringTag, {
            value: 'ReadableByteStreamController',
            configurable: true
        });
    }
    // Abstract operations for the ReadableByteStreamController.
    function IsReadableByteStreamController(x) {
        if (!typeIsObject(x)) {
            return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x, '_controlledReadableByteStream')) {
            return false;
        }
        return x instanceof ReadableByteStreamController;
    }
    function IsReadableStreamBYOBRequest(x) {
        if (!typeIsObject(x)) {
            return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x, '_associatedReadableByteStreamController')) {
            return false;
        }
        return x instanceof ReadableStreamBYOBRequest;
    }
    function ReadableByteStreamControllerCallPullIfNeeded(controller) {
        const shouldPull = ReadableByteStreamControllerShouldCallPull(controller);
        if (!shouldPull) {
            return;
        }
        if (controller._pulling) {
            controller._pullAgain = true;
            return;
        }
        controller._pulling = true;
        // TODO: Test controller argument
        const pullPromise = controller._pullAlgorithm();
        uponPromise(pullPromise, () => {
            controller._pulling = false;
            if (controller._pullAgain) {
                controller._pullAgain = false;
                ReadableByteStreamControllerCallPullIfNeeded(controller);
            }
        }, e => {
            ReadableByteStreamControllerError(controller, e);
        });
    }
    function ReadableByteStreamControllerClearPendingPullIntos(controller) {
        ReadableByteStreamControllerInvalidateBYOBRequest(controller);
        controller._pendingPullIntos = new SimpleQueue();
    }
    function ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor) {
        let done = false;
        if (stream._state === 'closed') {
            done = true;
        }
        const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
        if (pullIntoDescriptor.readerType === 'default') {
            ReadableStreamFulfillReadRequest(stream, filledView, done);
        }
        else {
            ReadableStreamFulfillReadIntoRequest(stream, filledView, done);
        }
    }
    function ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor) {
        const bytesFilled = pullIntoDescriptor.bytesFilled;
        const elementSize = pullIntoDescriptor.elementSize;
        return new pullIntoDescriptor.viewConstructor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
    }
    function ReadableByteStreamControllerEnqueueChunkToQueue(controller, buffer, byteOffset, byteLength) {
        controller._queue.push({ buffer, byteOffset, byteLength });
        controller._queueTotalSize += byteLength;
    }
    function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) {
        const elementSize = pullIntoDescriptor.elementSize;
        const currentAlignedBytes = pullIntoDescriptor.bytesFilled - pullIntoDescriptor.bytesFilled % elementSize;
        const maxBytesToCopy = Math.min(controller._queueTotalSize, pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled);
        const maxBytesFilled = pullIntoDescriptor.bytesFilled + maxBytesToCopy;
        const maxAlignedBytes = maxBytesFilled - maxBytesFilled % elementSize;
        let totalBytesToCopyRemaining = maxBytesToCopy;
        let ready = false;
        if (maxAlignedBytes > currentAlignedBytes) {
            totalBytesToCopyRemaining = maxAlignedBytes - pullIntoDescriptor.bytesFilled;
            ready = true;
        }
        const queue = controller._queue;
        while (totalBytesToCopyRemaining > 0) {
            const headOfQueue = queue.peek();
            const bytesToCopy = Math.min(totalBytesToCopyRemaining, headOfQueue.byteLength);
            const destStart = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
            CopyDataBlockBytes(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);
            if (headOfQueue.byteLength === bytesToCopy) {
                queue.shift();
            }
            else {
                headOfQueue.byteOffset += bytesToCopy;
                headOfQueue.byteLength -= bytesToCopy;
            }
            controller._queueTotalSize -= bytesToCopy;
            ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesToCopy, pullIntoDescriptor);
            totalBytesToCopyRemaining -= bytesToCopy;
        }
        return ready;
    }
    function ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, size, pullIntoDescriptor) {
        pullIntoDescriptor.bytesFilled += size;
    }
    function ReadableByteStreamControllerHandleQueueDrain(controller) {
        if (controller._queueTotalSize === 0 && controller._closeRequested) {
            ReadableByteStreamControllerClearAlgorithms(controller);
            ReadableStreamClose(controller._controlledReadableByteStream);
        }
        else {
            ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
    }
    function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
        if (controller._byobRequest === null) {
            return;
        }
        controller._byobRequest._associatedReadableByteStreamController = undefined;
        controller._byobRequest._view = null;
        controller._byobRequest = null;
    }
    function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller) {
        while (controller._pendingPullIntos.length > 0) {
            if (controller._queueTotalSize === 0) {
                return;
            }
            const pullIntoDescriptor = controller._pendingPullIntos.peek();
            if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
                ReadableByteStreamControllerShiftPendingPullInto(controller);
                ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
            }
        }
    }
    function ReadableByteStreamControllerPullInto(controller, view, readIntoRequest) {
        const stream = controller._controlledReadableByteStream;
        let elementSize = 1;
        if (view.constructor !== DataView) {
            elementSize = view.constructor.BYTES_PER_ELEMENT;
        }
        const ctor = view.constructor;
        // try {
        const buffer = TransferArrayBuffer(view.buffer);
        // } catch (e) {
        //   readIntoRequest._errorSteps(e);
        //   return;
        // }
        const pullIntoDescriptor = {
            buffer,
            bufferByteLength: buffer.byteLength,
            byteOffset: view.byteOffset,
            byteLength: view.byteLength,
            bytesFilled: 0,
            elementSize,
            viewConstructor: ctor,
            readerType: 'byob'
        };
        if (controller._pendingPullIntos.length > 0) {
            controller._pendingPullIntos.push(pullIntoDescriptor);
            // No ReadableByteStreamControllerCallPullIfNeeded() call since:
            // - No change happens on desiredSize
            // - The source has already been notified of that there's at least 1 pending read(view)
            ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
            return;
        }
        if (stream._state === 'closed') {
            const emptyView = new ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);
            readIntoRequest._closeSteps(emptyView);
            return;
        }
        if (controller._queueTotalSize > 0) {
            if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
                const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
                ReadableByteStreamControllerHandleQueueDrain(controller);
                readIntoRequest._chunkSteps(filledView);
                return;
            }
            if (controller._closeRequested) {
                const e = new TypeError('Insufficient bytes to fill elements in the given buffer');
                ReadableByteStreamControllerError(controller, e);
                readIntoRequest._errorSteps(e);
                return;
            }
        }
        controller._pendingPullIntos.push(pullIntoDescriptor);
        ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
        ReadableByteStreamControllerCallPullIfNeeded(controller);
    }
    function ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor) {
        const stream = controller._controlledReadableByteStream;
        if (ReadableStreamHasBYOBReader(stream)) {
            while (ReadableStreamGetNumReadIntoRequests(stream) > 0) {
                const pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto(controller);
                ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor);
            }
        }
    }
    function ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, pullIntoDescriptor) {
        ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesWritten, pullIntoDescriptor);
        if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.elementSize) {
            return;
        }
        ReadableByteStreamControllerShiftPendingPullInto(controller);
        const remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
        if (remainderSize > 0) {
            const end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
            const remainder = ArrayBufferSlice(pullIntoDescriptor.buffer, end - remainderSize, end);
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, remainder, 0, remainder.byteLength);
        }
        pullIntoDescriptor.bytesFilled -= remainderSize;
        ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
        ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
    }
    function ReadableByteStreamControllerRespondInternal(controller, bytesWritten) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        ReadableByteStreamControllerInvalidateBYOBRequest(controller);
        const state = controller._controlledReadableByteStream._state;
        if (state === 'closed') {
            ReadableByteStreamControllerRespondInClosedState(controller);
        }
        else {
            ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, firstDescriptor);
        }
        ReadableByteStreamControllerCallPullIfNeeded(controller);
    }
    function ReadableByteStreamControllerShiftPendingPullInto(controller) {
        const descriptor = controller._pendingPullIntos.shift();
        return descriptor;
    }
    function ReadableByteStreamControllerShouldCallPull(controller) {
        const stream = controller._controlledReadableByteStream;
        if (stream._state !== 'readable') {
            return false;
        }
        if (controller._closeRequested) {
            return false;
        }
        if (!controller._started) {
            return false;
        }
        if (ReadableStreamHasDefaultReader(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            return true;
        }
        if (ReadableStreamHasBYOBReader(stream) && ReadableStreamGetNumReadIntoRequests(stream) > 0) {
            return true;
        }
        const desiredSize = ReadableByteStreamControllerGetDesiredSize(controller);
        if (desiredSize > 0) {
            return true;
        }
        return false;
    }
    function ReadableByteStreamControllerClearAlgorithms(controller) {
        controller._pullAlgorithm = undefined;
        controller._cancelAlgorithm = undefined;
    }
    // A client of ReadableByteStreamController may use these functions directly to bypass state check.
    function ReadableByteStreamControllerClose(controller) {
        const stream = controller._controlledReadableByteStream;
        if (controller._closeRequested || stream._state !== 'readable') {
            return;
        }
        if (controller._queueTotalSize > 0) {
            controller._closeRequested = true;
            return;
        }
        if (controller._pendingPullIntos.length > 0) {
            const firstPendingPullInto = controller._pendingPullIntos.peek();
            if (firstPendingPullInto.bytesFilled > 0) {
                const e = new TypeError('Insufficient bytes to fill elements in the given buffer');
                ReadableByteStreamControllerError(controller, e);
                throw e;
            }
        }
        ReadableByteStreamControllerClearAlgorithms(controller);
        ReadableStreamClose(stream);
    }
    function ReadableByteStreamControllerEnqueue(controller, chunk) {
        const stream = controller._controlledReadableByteStream;
        if (controller._closeRequested || stream._state !== 'readable') {
            return;
        }
        const buffer = chunk.buffer;
        const byteOffset = chunk.byteOffset;
        const byteLength = chunk.byteLength;
        const transferredBuffer = TransferArrayBuffer(buffer);
        if (controller._pendingPullIntos.length > 0) {
            const firstPendingPullInto = controller._pendingPullIntos.peek();
            if (IsDetachedBuffer(firstPendingPullInto.buffer)) ;
            firstPendingPullInto.buffer = TransferArrayBuffer(firstPendingPullInto.buffer);
        }
        ReadableByteStreamControllerInvalidateBYOBRequest(controller);
        if (ReadableStreamHasDefaultReader(stream)) {
            if (ReadableStreamGetNumReadRequests(stream) === 0) {
                ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
            }
            else {
                const transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
                ReadableStreamFulfillReadRequest(stream, transferredView, false);
            }
        }
        else if (ReadableStreamHasBYOBReader(stream)) {
            // TODO: Ideally in this branch detaching should happen only if the buffer is not consumed fully.
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
            ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
        }
        else {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
        }
        ReadableByteStreamControllerCallPullIfNeeded(controller);
    }
    function ReadableByteStreamControllerError(controller, e) {
        const stream = controller._controlledReadableByteStream;
        if (stream._state !== 'readable') {
            return;
        }
        ReadableByteStreamControllerClearPendingPullIntos(controller);
        ResetQueue(controller);
        ReadableByteStreamControllerClearAlgorithms(controller);
        ReadableStreamError(stream, e);
    }
    function ReadableByteStreamControllerGetBYOBRequest(controller) {
        if (controller._byobRequest === null && controller._pendingPullIntos.length > 0) {
            const firstDescriptor = controller._pendingPullIntos.peek();
            const view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
            const byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
            SetUpReadableStreamBYOBRequest(byobRequest, controller, view);
            controller._byobRequest = byobRequest;
        }
        return controller._byobRequest;
    }
    function ReadableByteStreamControllerGetDesiredSize(controller) {
        const state = controller._controlledReadableByteStream._state;
        if (state === 'errored') {
            return null;
        }
        if (state === 'closed') {
            return 0;
        }
        return controller._strategyHWM - controller._queueTotalSize;
    }
    function ReadableByteStreamControllerRespond(controller, bytesWritten) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        const state = controller._controlledReadableByteStream._state;
        if (state === 'closed') {
            if (bytesWritten !== 0) {
                throw new TypeError('bytesWritten must be 0 when calling respond() on a closed stream');
            }
        }
        else {
            if (bytesWritten === 0) {
                throw new TypeError('bytesWritten must be greater than 0 when calling respond() on a readable stream');
            }
            if (firstDescriptor.bytesFilled + bytesWritten > firstDescriptor.byteLength) {
                throw new RangeError('bytesWritten out of range');
            }
        }
        firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
        ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
    }
    function ReadableByteStreamControllerRespondWithNewView(controller, view) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        const state = controller._controlledReadableByteStream._state;
        if (state === 'closed') {
            if (view.byteLength !== 0) {
                throw new TypeError('The view\'s length must be 0 when calling respondWithNewView() on a closed stream');
            }
        }
        else {
            if (view.byteLength === 0) {
                throw new TypeError('The view\'s length must be greater than 0 when calling respondWithNewView() on a readable stream');
            }
        }
        if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
            throw new RangeError('The region specified by view does not match byobRequest');
        }
        if (firstDescriptor.bufferByteLength !== view.buffer.byteLength) {
            throw new RangeError('The buffer of view has different capacity than byobRequest');
        }
        if (firstDescriptor.bytesFilled + view.byteLength > firstDescriptor.byteLength) {
            throw new RangeError('The region specified by view is larger than byobRequest');
        }
        firstDescriptor.buffer = TransferArrayBuffer(view.buffer);
        ReadableByteStreamControllerRespondInternal(controller, view.byteLength);
    }
    function SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize) {
        controller._controlledReadableByteStream = stream;
        controller._pullAgain = false;
        controller._pulling = false;
        controller._byobRequest = null;
        // Need to set the slots so that the assert doesn't fire. In the spec the slots already exist implicitly.
        controller._queue = controller._queueTotalSize = undefined;
        ResetQueue(controller);
        controller._closeRequested = false;
        controller._started = false;
        controller._strategyHWM = highWaterMark;
        controller._pullAlgorithm = pullAlgorithm;
        controller._cancelAlgorithm = cancelAlgorithm;
        controller._autoAllocateChunkSize = autoAllocateChunkSize;
        controller._pendingPullIntos = new SimpleQueue();
        stream._readableStreamController = controller;
        const startResult = startAlgorithm();
        uponPromise(promiseResolvedWith(startResult), () => {
            controller._started = true;
            ReadableByteStreamControllerCallPullIfNeeded(controller);
        }, r => {
            ReadableByteStreamControllerError(controller, r);
        });
    }
    function SetUpReadableByteStreamControllerFromUnderlyingSource(stream, underlyingByteSource, highWaterMark) {
        const controller = Object.create(ReadableByteStreamController.prototype);
        let startAlgorithm = () => undefined;
        let pullAlgorithm = () => promiseResolvedWith(undefined);
        let cancelAlgorithm = () => promiseResolvedWith(undefined);
        if (underlyingByteSource.start !== undefined) {
            startAlgorithm = () => underlyingByteSource.start(controller);
        }
        if (underlyingByteSource.pull !== undefined) {
            pullAlgorithm = () => underlyingByteSource.pull(controller);
        }
        if (underlyingByteSource.cancel !== undefined) {
            cancelAlgorithm = reason => underlyingByteSource.cancel(reason);
        }
        const autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
        if (autoAllocateChunkSize === 0) {
            throw new TypeError('autoAllocateChunkSize must be greater than 0');
        }
        SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);
    }
    function SetUpReadableStreamBYOBRequest(request, controller, view) {
        request._associatedReadableByteStreamController = controller;
        request._view = view;
    }
    // Helper functions for the ReadableStreamBYOBRequest.
    function byobRequestBrandCheckException(name) {
        return new TypeError(`ReadableStreamBYOBRequest.prototype.${name} can only be used on a ReadableStreamBYOBRequest`);
    }
    // Helper functions for the ReadableByteStreamController.
    function byteStreamControllerBrandCheckException(name) {
        return new TypeError(`ReadableByteStreamController.prototype.${name} can only be used on a ReadableByteStreamController`);
    }

    // Abstract operations for the ReadableStream.
    function AcquireReadableStreamBYOBReader(stream) {
        return new ReadableStreamBYOBReader(stream);
    }
    // ReadableStream API exposed for controllers.
    function ReadableStreamAddReadIntoRequest(stream, readIntoRequest) {
        stream._reader._readIntoRequests.push(readIntoRequest);
    }
    function ReadableStreamFulfillReadIntoRequest(stream, chunk, done) {
        const reader = stream._reader;
        const readIntoRequest = reader._readIntoRequests.shift();
        if (done) {
            readIntoRequest._closeSteps(chunk);
        }
        else {
            readIntoRequest._chunkSteps(chunk);
        }
    }
    function ReadableStreamGetNumReadIntoRequests(stream) {
        return stream._reader._readIntoRequests.length;
    }
    function ReadableStreamHasBYOBReader(stream) {
        const reader = stream._reader;
        if (reader === undefined) {
            return false;
        }
        if (!IsReadableStreamBYOBReader(reader)) {
            return false;
        }
        return true;
    }
    /**
     * A BYOB reader vended by a {@link ReadableStream}.
     *
     * @public
     */
    class ReadableStreamBYOBReader {
        constructor(stream) {
            assertRequiredArgument(stream, 1, 'ReadableStreamBYOBReader');
            assertReadableStream(stream, 'First parameter');
            if (IsReadableStreamLocked(stream)) {
                throw new TypeError('This stream has already been locked for exclusive reading by another reader');
            }
            if (!IsReadableByteStreamController(stream._readableStreamController)) {
                throw new TypeError('Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte ' +
                    'source');
            }
            ReadableStreamReaderGenericInitialize(this, stream);
            this._readIntoRequests = new SimpleQueue();
        }
        /**
         * Returns a promise that will be fulfilled when the stream becomes closed, or rejected if the stream ever errors or
         * the reader's lock is released before the stream finishes closing.
         */
        get closed() {
            if (!IsReadableStreamBYOBReader(this)) {
                return promiseRejectedWith(byobReaderBrandCheckException('closed'));
            }
            return this._closedPromise;
        }
        /**
         * If the reader is active, behaves the same as {@link ReadableStream.cancel | stream.cancel(reason)}.
         */
        cancel(reason = undefined) {
            if (!IsReadableStreamBYOBReader(this)) {
                return promiseRejectedWith(byobReaderBrandCheckException('cancel'));
            }
            if (this._ownerReadableStream === undefined) {
                return promiseRejectedWith(readerLockException('cancel'));
            }
            return ReadableStreamReaderGenericCancel(this, reason);
        }
        /**
         * Attempts to reads bytes into view, and returns a promise resolved with the result.
         *
         * If reading a chunk causes the queue to become empty, more data will be pulled from the underlying source.
         */
        read(view) {
            if (!IsReadableStreamBYOBReader(this)) {
                return promiseRejectedWith(byobReaderBrandCheckException('read'));
            }
            if (!ArrayBuffer.isView(view)) {
                return promiseRejectedWith(new TypeError('view must be an array buffer view'));
            }
            if (view.byteLength === 0) {
                return promiseRejectedWith(new TypeError('view must have non-zero byteLength'));
            }
            if (view.buffer.byteLength === 0) {
                return promiseRejectedWith(new TypeError(`view's buffer must have non-zero byteLength`));
            }
            if (IsDetachedBuffer(view.buffer)) ;
            if (this._ownerReadableStream === undefined) {
                return promiseRejectedWith(readerLockException('read from'));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve, reject) => {
                resolvePromise = resolve;
                rejectPromise = reject;
            });
            const readIntoRequest = {
                _chunkSteps: chunk => resolvePromise({ value: chunk, done: false }),
                _closeSteps: chunk => resolvePromise({ value: chunk, done: true }),
                _errorSteps: e => rejectPromise(e)
            };
            ReadableStreamBYOBReaderRead(this, view, readIntoRequest);
            return promise;
        }
        /**
         * Releases the reader's lock on the corresponding stream. After the lock is released, the reader is no longer active.
         * If the associated stream is errored when the lock is released, the reader will appear errored in the same way
         * from now on; otherwise, the reader will appear closed.
         *
         * A reader's lock cannot be released while it still has a pending read request, i.e., if a promise returned by
         * the reader's {@link ReadableStreamBYOBReader.read | read()} method has not yet been settled. Attempting to
         * do so will throw a `TypeError` and leave the reader locked to the stream.
         */
        releaseLock() {
            if (!IsReadableStreamBYOBReader(this)) {
                throw byobReaderBrandCheckException('releaseLock');
            }
            if (this._ownerReadableStream === undefined) {
                return;
            }
            if (this._readIntoRequests.length > 0) {
                throw new TypeError('Tried to release a reader lock when that reader has pending read() calls un-settled');
            }
            ReadableStreamReaderGenericRelease(this);
        }
    }
    Object.defineProperties(ReadableStreamBYOBReader.prototype, {
        cancel: { enumerable: true },
        read: { enumerable: true },
        releaseLock: { enumerable: true },
        closed: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
        Object.defineProperty(ReadableStreamBYOBReader.prototype, SymbolPolyfill.toStringTag, {
            value: 'ReadableStreamBYOBReader',
            configurable: true
        });
    }
    // Abstract operations for the readers.
    function IsReadableStreamBYOBReader(x) {
        if (!typeIsObject(x)) {
            return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x, '_readIntoRequests')) {
            return false;
        }
        return x instanceof ReadableStreamBYOBReader;
    }
    function ReadableStreamBYOBReaderRead(reader, view, readIntoRequest) {
        const stream = reader._ownerReadableStream;
        stream._disturbed = true;
        if (stream._state === 'errored') {
            readIntoRequest._errorSteps(stream._storedError);
        }
        else {
            ReadableByteStreamControllerPullInto(stream._readableStreamController, view, readIntoRequest);
        }
    }
    // Helper functions for the ReadableStreamBYOBReader.
    function byobReaderBrandCheckException(name) {
        return new TypeError(`ReadableStreamBYOBReader.prototype.${name} can only be used on a ReadableStreamBYOBReader`);
    }

    function ExtractHighWaterMark(strategy, defaultHWM) {
        const { highWaterMark } = strategy;
        if (highWaterMark === undefined) {
            return defaultHWM;
        }
        if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
            throw new RangeError('Invalid highWaterMark');
        }
        return highWaterMark;
    }
    function ExtractSizeAlgorithm(strategy) {
        const { size } = strategy;
        if (!size) {
            return () => 1;
        }
        return size;
    }

    function convertQueuingStrategy(init, context) {
        assertDictionary(init, context);
        const highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
        const size = init === null || init === void 0 ? void 0 : init.size;
        return {
            highWaterMark: highWaterMark === undefined ? undefined : convertUnrestrictedDouble(highWaterMark),
            size: size === undefined ? undefined : convertQueuingStrategySize(size, `${context} has member 'size' that`)
        };
    }
    function convertQueuingStrategySize(fn, context) {
        assertFunction(fn, context);
        return chunk => convertUnrestrictedDouble(fn(chunk));
    }

    function convertUnderlyingSink(original, context) {
        assertDictionary(original, context);
        const abort = original === null || original === void 0 ? void 0 : original.abort;
        const close = original === null || original === void 0 ? void 0 : original.close;
        const start = original === null || original === void 0 ? void 0 : original.start;
        const type = original === null || original === void 0 ? void 0 : original.type;
        const write = original === null || original === void 0 ? void 0 : original.write;
        return {
            abort: abort === undefined ?
                undefined :
                convertUnderlyingSinkAbortCallback(abort, original, `${context} has member 'abort' that`),
            close: close === undefined ?
                undefined :
                convertUnderlyingSinkCloseCallback(close, original, `${context} has member 'close' that`),
            start: start === undefined ?
                undefined :
                convertUnderlyingSinkStartCallback(start, original, `${context} has member 'start' that`),
            write: write === undefined ?
                undefined :
                convertUnderlyingSinkWriteCallback(write, original, `${context} has member 'write' that`),
            type
        };
    }
    function convertUnderlyingSinkAbortCallback(fn, original, context) {
        assertFunction(fn, context);
        return (reason) => promiseCall(fn, original, [reason]);
    }
    function convertUnderlyingSinkCloseCallback(fn, original, context) {
        assertFunction(fn, context);
        return () => promiseCall(fn, original, []);
    }
    function convertUnderlyingSinkStartCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => reflectCall(fn, original, [controller]);
    }
    function convertUnderlyingSinkWriteCallback(fn, original, context) {
        assertFunction(fn, context);
        return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
    }

    function assertWritableStream(x, context) {
        if (!IsWritableStream(x)) {
            throw new TypeError(`${context} is not a WritableStream.`);
        }
    }

    function isAbortSignal(value) {
        if (typeof value !== 'object' || value === null) {
            return false;
        }
        try {
            return typeof value.aborted === 'boolean';
        }
        catch (_a) {
            // AbortSignal.prototype.aborted throws if its brand check fails
            return false;
        }
    }
    const supportsAbortController = typeof AbortController === 'function';
    /**
     * Construct a new AbortController, if supported by the platform.
     *
     * @internal
     */
    function createAbortController() {
        if (supportsAbortController) {
            return new AbortController();
        }
        return undefined;
    }

    /**
     * A writable stream represents a destination for data, into which you can write.
     *
     * @public
     */
    class WritableStream {
        constructor(rawUnderlyingSink = {}, rawStrategy = {}) {
            if (rawUnderlyingSink === undefined) {
                rawUnderlyingSink = null;
            }
            else {
                assertObject(rawUnderlyingSink, 'First parameter');
            }
            const strategy = convertQueuingStrategy(rawStrategy, 'Second parameter');
            const underlyingSink = convertUnderlyingSink(rawUnderlyingSink, 'First parameter');
            InitializeWritableStream(this);
            const type = underlyingSink.type;
            if (type !== undefined) {
                throw new RangeError('Invalid type is specified');
            }
            const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
            const highWaterMark = ExtractHighWaterMark(strategy, 1);
            SetUpWritableStreamDefaultControllerFromUnderlyingSink(this, underlyingSink, highWaterMark, sizeAlgorithm);
        }
        /**
         * Returns whether or not the writable stream is locked to a writer.
         */
        get locked() {
            if (!IsWritableStream(this)) {
                throw streamBrandCheckException$2('locked');
            }
            return IsWritableStreamLocked(this);
        }
        /**
         * Aborts the stream, signaling that the producer can no longer successfully write to the stream and it is to be
         * immediately moved to an errored state, with any queued-up writes discarded. This will also execute any abort
         * mechanism of the underlying sink.
         *
         * The returned promise will fulfill if the stream shuts down successfully, or reject if the underlying sink signaled
         * that there was an error doing so. Additionally, it will reject with a `TypeError` (without attempting to cancel
         * the stream) if the stream is currently locked.
         */
        abort(reason = undefined) {
            if (!IsWritableStream(this)) {
                return promiseRejectedWith(streamBrandCheckException$2('abort'));
            }
            if (IsWritableStreamLocked(this)) {
                return promiseRejectedWith(new TypeError('Cannot abort a stream that already has a writer'));
            }
            return WritableStreamAbort(this, reason);
        }
        /**
         * Closes the stream. The underlying sink will finish processing any previously-written chunks, before invoking its
         * close behavior. During this time any further attempts to write will fail (without erroring the stream).
         *
         * The method returns a promise that will fulfill if all remaining chunks are successfully written and the stream
         * successfully closes, or rejects if an error is encountered during this process. Additionally, it will reject with
         * a `TypeError` (without attempting to cancel the stream) if the stream is currently locked.
         */
        close() {
            if (!IsWritableStream(this)) {
                return promiseRejectedWith(streamBrandCheckException$2('close'));
            }
            if (IsWritableStreamLocked(this)) {
                return promiseRejectedWith(new TypeError('Cannot close a stream that already has a writer'));
            }
            if (WritableStreamCloseQueuedOrInFlight(this)) {
                return promiseRejectedWith(new TypeError('Cannot close an already-closing stream'));
            }
            return WritableStreamClose(this);
        }
        /**
         * Creates a {@link WritableStreamDefaultWriter | writer} and locks the stream to the new writer. While the stream
         * is locked, no other writer can be acquired until this one is released.
         *
         * This functionality is especially useful for creating abstractions that desire the ability to write to a stream
         * without interruption or interleaving. By getting a writer for the stream, you can ensure nobody else can write at
         * the same time, which would cause the resulting written data to be unpredictable and probably useless.
         */
        getWriter() {
            if (!IsWritableStream(this)) {
                throw streamBrandCheckException$2('getWriter');
            }
            return AcquireWritableStreamDefaultWriter(this);
        }
    }
    Object.defineProperties(WritableStream.prototype, {
        abort: { enumerable: true },
        close: { enumerable: true },
        getWriter: { enumerable: true },
        locked: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
        Object.defineProperty(WritableStream.prototype, SymbolPolyfill.toStringTag, {
            value: 'WritableStream',
            configurable: true
        });
    }
    // Abstract operations for the WritableStream.
    function AcquireWritableStreamDefaultWriter(stream) {
        return new WritableStreamDefaultWriter(stream);
    }
    // Throws if and only if startAlgorithm throws.
    function CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
        const stream = Object.create(WritableStream.prototype);
        InitializeWritableStream(stream);
        const controller = Object.create(WritableStreamDefaultController.prototype);
        SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
        return stream;
    }
    function InitializeWritableStream(stream) {
        stream._state = 'writable';
        // The error that will be reported by new method calls once the state becomes errored. Only set when [[state]] is
        // 'erroring' or 'errored'. May be set to an undefined value.
        stream._storedError = undefined;
        stream._writer = undefined;
        // Initialize to undefined first because the constructor of the controller checks this
        // variable to validate the caller.
        stream._writableStreamController = undefined;
        // This queue is placed here instead of the writer class in order to allow for passing a writer to the next data
        // producer without waiting for the queued writes to finish.
        stream._writeRequests = new SimpleQueue();
        // Write requests are removed from _writeRequests when write() is called on the underlying sink. This prevents
        // them from being erroneously rejected on error. If a write() call is in-flight, the request is stored here.
        stream._inFlightWriteRequest = undefined;
        // The promise that was returned from writer.close(). Stored here because it may be fulfilled after the writer
        // has been detached.
        stream._closeRequest = undefined;
        // Close request is removed from _closeRequest when close() is called on the underlying sink. This prevents it
        // from being erroneously rejected on error. If a close() call is in-flight, the request is stored here.
        stream._inFlightCloseRequest = undefined;
        // The promise that was returned from writer.abort(). This may also be fulfilled after the writer has detached.
        stream._pendingAbortRequest = undefined;
        // The backpressure signal set by the controller.
        stream._backpressure = false;
    }
    function IsWritableStream(x) {
        if (!typeIsObject(x)) {
            return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x, '_writableStreamController')) {
            return false;
        }
        return x instanceof WritableStream;
    }
    function IsWritableStreamLocked(stream) {
        if (stream._writer === undefined) {
            return false;
        }
        return true;
    }
    function WritableStreamAbort(stream, reason) {
        var _a;
        if (stream._state === 'closed' || stream._state === 'errored') {
            return promiseResolvedWith(undefined);
        }
        stream._writableStreamController._abortReason = reason;
        (_a = stream._writableStreamController._abortController) === null || _a === void 0 ? void 0 : _a.abort();
        // TypeScript narrows the type of `stream._state` down to 'writable' | 'erroring',
        // but it doesn't know that signaling abort runs author code that might have changed the state.
        // Widen the type again by casting to WritableStreamState.
        const state = stream._state;
        if (state === 'closed' || state === 'errored') {
            return promiseResolvedWith(undefined);
        }
        if (stream._pendingAbortRequest !== undefined) {
            return stream._pendingAbortRequest._promise;
        }
        let wasAlreadyErroring = false;
        if (state === 'erroring') {
            wasAlreadyErroring = true;
            // reason will not be used, so don't keep a reference to it.
            reason = undefined;
        }
        const promise = newPromise((resolve, reject) => {
            stream._pendingAbortRequest = {
                _promise: undefined,
                _resolve: resolve,
                _reject: reject,
                _reason: reason,
                _wasAlreadyErroring: wasAlreadyErroring
            };
        });
        stream._pendingAbortRequest._promise = promise;
        if (!wasAlreadyErroring) {
            WritableStreamStartErroring(stream, reason);
        }
        return promise;
    }
    function WritableStreamClose(stream) {
        const state = stream._state;
        if (state === 'closed' || state === 'errored') {
            return promiseRejectedWith(new TypeError(`The stream (in ${state} state) is not in the writable state and cannot be closed`));
        }
        const promise = newPromise((resolve, reject) => {
            const closeRequest = {
                _resolve: resolve,
                _reject: reject
            };
            stream._closeRequest = closeRequest;
        });
        const writer = stream._writer;
        if (writer !== undefined && stream._backpressure && state === 'writable') {
            defaultWriterReadyPromiseResolve(writer);
        }
        WritableStreamDefaultControllerClose(stream._writableStreamController);
        return promise;
    }
    // WritableStream API exposed for controllers.
    function WritableStreamAddWriteRequest(stream) {
        const promise = newPromise((resolve, reject) => {
            const writeRequest = {
                _resolve: resolve,
                _reject: reject
            };
            stream._writeRequests.push(writeRequest);
        });
        return promise;
    }
    function WritableStreamDealWithRejection(stream, error) {
        const state = stream._state;
        if (state === 'writable') {
            WritableStreamStartErroring(stream, error);
            return;
        }
        WritableStreamFinishErroring(stream);
    }
    function WritableStreamStartErroring(stream, reason) {
        const controller = stream._writableStreamController;
        stream._state = 'erroring';
        stream._storedError = reason;
        const writer = stream._writer;
        if (writer !== undefined) {
            WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, reason);
        }
        if (!WritableStreamHasOperationMarkedInFlight(stream) && controller._started) {
            WritableStreamFinishErroring(stream);
        }
    }
    function WritableStreamFinishErroring(stream) {
        stream._state = 'errored';
        stream._writableStreamController[ErrorSteps]();
        const storedError = stream._storedError;
        stream._writeRequests.forEach(writeRequest => {
            writeRequest._reject(storedError);
        });
        stream._writeRequests = new SimpleQueue();
        if (stream._pendingAbortRequest === undefined) {
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
            return;
        }
        const abortRequest = stream._pendingAbortRequest;
        stream._pendingAbortRequest = undefined;
        if (abortRequest._wasAlreadyErroring) {
            abortRequest._reject(storedError);
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
            return;
        }
        const promise = stream._writableStreamController[AbortSteps](abortRequest._reason);
        uponPromise(promise, () => {
            abortRequest._resolve();
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
        }, (reason) => {
            abortRequest._reject(reason);
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
        });
    }
    function WritableStreamFinishInFlightWrite(stream) {
        stream._inFlightWriteRequest._resolve(undefined);
        stream._inFlightWriteRequest = undefined;
    }
    function WritableStreamFinishInFlightWriteWithError(stream, error) {
        stream._inFlightWriteRequest._reject(error);
        stream._inFlightWriteRequest = undefined;
        WritableStreamDealWithRejection(stream, error);
    }
    function WritableStreamFinishInFlightClose(stream) {
        stream._inFlightCloseRequest._resolve(undefined);
        stream._inFlightCloseRequest = undefined;
        const state = stream._state;
        if (state === 'erroring') {
            // The error was too late to do anything, so it is ignored.
            stream._storedError = undefined;
            if (stream._pendingAbortRequest !== undefined) {
                stream._pendingAbortRequest._resolve();
                stream._pendingAbortRequest = undefined;
            }
        }
        stream._state = 'closed';
        const writer = stream._writer;
        if (writer !== undefined) {
            defaultWriterClosedPromiseResolve(writer);
        }
    }
    function WritableStreamFinishInFlightCloseWithError(stream, error) {
        stream._inFlightCloseRequest._reject(error);
        stream._inFlightCloseRequest = undefined;
        // Never execute sink abort() after sink close().
        if (stream._pendingAbortRequest !== undefined) {
            stream._pendingAbortRequest._reject(error);
            stream._pendingAbortRequest = undefined;
        }
        WritableStreamDealWithRejection(stream, error);
    }
    // TODO(ricea): Fix alphabetical order.
    function WritableStreamCloseQueuedOrInFlight(stream) {
        if (stream._closeRequest === undefined && stream._inFlightCloseRequest === undefined) {
            return false;
        }
        return true;
    }
    function WritableStreamHasOperationMarkedInFlight(stream) {
        if (stream._inFlightWriteRequest === undefined && stream._inFlightCloseRequest === undefined) {
            return false;
        }
        return true;
    }
    function WritableStreamMarkCloseRequestInFlight(stream) {
        stream._inFlightCloseRequest = stream._closeRequest;
        stream._closeRequest = undefined;
    }
    function WritableStreamMarkFirstWriteRequestInFlight(stream) {
        stream._inFlightWriteRequest = stream._writeRequests.shift();
    }
    function WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream) {
        if (stream._closeRequest !== undefined) {
            stream._closeRequest._reject(stream._storedError);
            stream._closeRequest = undefined;
        }
        const writer = stream._writer;
        if (writer !== undefined) {
            defaultWriterClosedPromiseReject(writer, stream._storedError);
        }
    }
    function WritableStreamUpdateBackpressure(stream, backpressure) {
        const writer = stream._writer;
        if (writer !== undefined && backpressure !== stream._backpressure) {
            if (backpressure) {
                defaultWriterReadyPromiseReset(writer);
            }
            else {
                defaultWriterReadyPromiseResolve(writer);
            }
        }
        stream._backpressure = backpressure;
    }
    /**
     * A default writer vended by a {@link WritableStream}.
     *
     * @public
     */
    class WritableStreamDefaultWriter {
        constructor(stream) {
            assertRequiredArgument(stream, 1, 'WritableStreamDefaultWriter');
            assertWritableStream(stream, 'First parameter');
            if (IsWritableStreamLocked(stream)) {
                throw new TypeError('This stream has already been locked for exclusive writing by another writer');
            }
            this._ownerWritableStream = stream;
            stream._writer = this;
            const state = stream._state;
            if (state === 'writable') {
                if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._backpressure) {
                    defaultWriterReadyPromiseInitialize(this);
                }
                else {
                    defaultWriterReadyPromiseInitializeAsResolved(this);
                }
                defaultWriterClosedPromiseInitialize(this);
            }
            else if (state === 'erroring') {
                defaultWriterReadyPromiseInitializeAsRejected(this, stream._storedError);
                defaultWriterClosedPromiseInitialize(this);
            }
            else if (state === 'closed') {
                defaultWriterReadyPromiseInitializeAsResolved(this);
                defaultWriterClosedPromiseInitializeAsResolved(this);
            }
            else {
                const storedError = stream._storedError;
                defaultWriterReadyPromiseInitializeAsRejected(this, storedError);
                defaultWriterClosedPromiseInitializeAsRejected(this, storedError);
            }
        }
        /**
         * Returns a promise that will be fulfilled when the stream becomes closed, or rejected if the stream ever errors or
         * the writer’s lock is released before the stream finishes closing.
         */
        get closed() {
            if (!IsWritableStreamDefaultWriter(this)) {
                return promiseRejectedWith(defaultWriterBrandCheckException('closed'));
            }
            return this._closedPromise;
        }
        /**
         * Returns the desired size to fill the stream’s internal queue. It can be negative, if the queue is over-full.
         * A producer can use this information to determine the right amount of data to write.
         *
         * It will be `null` if the stream cannot be successfully written to (due to either being errored, or having an abort
         * queued up). It will return zero if the stream is closed. And the getter will throw an exception if invoked when
         * the writer’s lock is released.
         */
        get desiredSize() {
            if (!IsWritableStreamDefaultWriter(this)) {
                throw defaultWriterBrandCheckException('desiredSize');
            }
            if (this._ownerWritableStream === undefined) {
                throw defaultWriterLockException('desiredSize');
            }
            return WritableStreamDefaultWriterGetDesiredSize(this);
        }
        /**
         * Returns a promise that will be fulfilled when the desired size to fill the stream’s internal queue transitions
         * from non-positive to positive, signaling that it is no longer applying backpressure. Once the desired size dips
         * back to zero or below, the getter will return a new promise that stays pending until the next transition.
         *
         * If the stream becomes errored or aborted, or the writer’s lock is released, the returned promise will become
         * rejected.
         */
        get ready() {
            if (!IsWritableStreamDefaultWriter(this)) {
                return promiseRejectedWith(defaultWriterBrandCheckException('ready'));
            }
            return this._readyPromise;
        }
        /**
         * If the reader is active, behaves the same as {@link WritableStream.abort | stream.abort(reason)}.
         */
        abort(reason = undefined) {
            if (!IsWritableStreamDefaultWriter(this)) {
                return promiseRejectedWith(defaultWriterBrandCheckException('abort'));
            }
            if (this._ownerWritableStream === undefined) {
                return promiseRejectedWith(defaultWriterLockException('abort'));
            }
            return WritableStreamDefaultWriterAbort(this, reason);
        }
        /**
         * If the reader is active, behaves the same as {@link WritableStream.close | stream.close()}.
         */
        close() {
            if (!IsWritableStreamDefaultWriter(this)) {
                return promiseRejectedWith(defaultWriterBrandCheckException('close'));
            }
            const stream = this._ownerWritableStream;
            if (stream === undefined) {
                return promiseRejectedWith(defaultWriterLockException('close'));
            }
            if (WritableStreamCloseQueuedOrInFlight(stream)) {
                return promiseRejectedWith(new TypeError('Cannot close an already-closing stream'));
            }
            return WritableStreamDefaultWriterClose(this);
        }
        /**
         * Releases the writer’s lock on the corresponding stream. After the lock is released, the writer is no longer active.
         * If the associated stream is errored when the lock is released, the writer will appear errored in the same way from
         * now on; otherwise, the writer will appear closed.
         *
         * Note that the lock can still be released even if some ongoing writes have not yet finished (i.e. even if the
         * promises returned from previous calls to {@link WritableStreamDefaultWriter.write | write()} have not yet settled).
         * It’s not necessary to hold the lock on the writer for the duration of the write; the lock instead simply prevents
         * other producers from writing in an interleaved manner.
         */
        releaseLock() {
            if (!IsWritableStreamDefaultWriter(this)) {
                throw defaultWriterBrandCheckException('releaseLock');
            }
            const stream = this._ownerWritableStream;
            if (stream === undefined) {
                return;
            }
            WritableStreamDefaultWriterRelease(this);
        }
        write(chunk = undefined) {
            if (!IsWritableStreamDefaultWriter(this)) {
                return promiseRejectedWith(defaultWriterBrandCheckException('write'));
            }
            if (this._ownerWritableStream === undefined) {
                return promiseRejectedWith(defaultWriterLockException('write to'));
            }
            return WritableStreamDefaultWriterWrite(this, chunk);
        }
    }
    Object.defineProperties(WritableStreamDefaultWriter.prototype, {
        abort: { enumerable: true },
        close: { enumerable: true },
        releaseLock: { enumerable: true },
        write: { enumerable: true },
        closed: { enumerable: true },
        desiredSize: { enumerable: true },
        ready: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
        Object.defineProperty(WritableStreamDefaultWriter.prototype, SymbolPolyfill.toStringTag, {
            value: 'WritableStreamDefaultWriter',
            configurable: true
        });
    }
    // Abstract operations for the WritableStreamDefaultWriter.
    function IsWritableStreamDefaultWriter(x) {
        if (!typeIsObject(x)) {
            return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x, '_ownerWritableStream')) {
            return false;
        }
        return x instanceof WritableStreamDefaultWriter;
    }
    // A client of WritableStreamDefaultWriter may use these functions directly to bypass state check.
    function WritableStreamDefaultWriterAbort(writer, reason) {
        const stream = writer._ownerWritableStream;
        return WritableStreamAbort(stream, reason);
    }
    function WritableStreamDefaultWriterClose(writer) {
        const stream = writer._ownerWritableStream;
        return WritableStreamClose(stream);
    }
    function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
        const stream = writer._ownerWritableStream;
        const state = stream._state;
        if (WritableStreamCloseQueuedOrInFlight(stream) || state === 'closed') {
            return promiseResolvedWith(undefined);
        }
        if (state === 'errored') {
            return promiseRejectedWith(stream._storedError);
        }
        return WritableStreamDefaultWriterClose(writer);
    }
    function WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, error) {
        if (writer._closedPromiseState === 'pending') {
            defaultWriterClosedPromiseReject(writer, error);
        }
        else {
            defaultWriterClosedPromiseResetToRejected(writer, error);
        }
    }
    function WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, error) {
        if (writer._readyPromiseState === 'pending') {
            defaultWriterReadyPromiseReject(writer, error);
        }
        else {
            defaultWriterReadyPromiseResetToRejected(writer, error);
        }
    }
    function WritableStreamDefaultWriterGetDesiredSize(writer) {
        const stream = writer._ownerWritableStream;
        const state = stream._state;
        if (state === 'errored' || state === 'erroring') {
            return null;
        }
        if (state === 'closed') {
            return 0;
        }
        return WritableStreamDefaultControllerGetDesiredSize(stream._writableStreamController);
    }
    function WritableStreamDefaultWriterRelease(writer) {
        const stream = writer._ownerWritableStream;
        const releasedError = new TypeError(`Writer was released and can no longer be used to monitor the stream's closedness`);
        WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, releasedError);
        // The state transitions to "errored" before the sink abort() method runs, but the writer.closed promise is not
        // rejected until afterwards. This means that simply testing state will not work.
        WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, releasedError);
        stream._writer = undefined;
        writer._ownerWritableStream = undefined;
    }
    function WritableStreamDefaultWriterWrite(writer, chunk) {
        const stream = writer._ownerWritableStream;
        const controller = stream._writableStreamController;
        const chunkSize = WritableStreamDefaultControllerGetChunkSize(controller, chunk);
        if (stream !== writer._ownerWritableStream) {
            return promiseRejectedWith(defaultWriterLockException('write to'));
        }
        const state = stream._state;
        if (state === 'errored') {
            return promiseRejectedWith(stream._storedError);
        }
        if (WritableStreamCloseQueuedOrInFlight(stream) || state === 'closed') {
            return promiseRejectedWith(new TypeError('The stream is closing or closed and cannot be written to'));
        }
        if (state === 'erroring') {
            return promiseRejectedWith(stream._storedError);
        }
        const promise = WritableStreamAddWriteRequest(stream);
        WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);
        return promise;
    }
    const closeSentinel = {};
    /**
     * Allows control of a {@link WritableStream | writable stream}'s state and internal queue.
     *
     * @public
     */
    class WritableStreamDefaultController {
        constructor() {
            throw new TypeError('Illegal constructor');
        }
        /**
         * The reason which was passed to `WritableStream.abort(reason)` when the stream was aborted.
         */
        get abortReason() {
            if (!IsWritableStreamDefaultController(this)) {
                throw defaultControllerBrandCheckException$2('abortReason');
            }
            return this._abortReason;
        }
        /**
         * An `AbortSignal` that can be used to abort the pending write or close operation when the stream is aborted.
         */
        get signal() {
            if (!IsWritableStreamDefaultController(this)) {
                throw defaultControllerBrandCheckException$2('signal');
            }
            if (this._abortController === undefined) {
                // Older browsers or older Node versions may not support `AbortController` or `AbortSignal`.
                // We don't want to bundle and ship an `AbortController` polyfill together with our polyfill,
                // so instead we only implement support for `signal` if we find a global `AbortController` constructor.
                throw new TypeError('WritableStreamDefaultController.prototype.signal is not supported');
            }
            return this._abortController.signal;
        }
        /**
         * Closes the controlled writable stream, making all future interactions with it fail with the given error `e`.
         *
         * This method is rarely used, since usually it suffices to return a rejected promise from one of the underlying
         * sink's methods. However, it can be useful for suddenly shutting down a stream in response to an event outside the
         * normal lifecycle of interactions with the underlying sink.
         */
        error(e = undefined) {
            if (!IsWritableStreamDefaultController(this)) {
                throw defaultControllerBrandCheckException$2('error');
            }
            const state = this._controlledWritableStream._state;
            if (state !== 'writable') {
                // The stream is closed, errored or will be soon. The sink can't do anything useful if it gets an error here, so
                // just treat it as a no-op.
                return;
            }
            WritableStreamDefaultControllerError(this, e);
        }
        /** @internal */
        [AbortSteps](reason) {
            const result = this._abortAlgorithm(reason);
            WritableStreamDefaultControllerClearAlgorithms(this);
            return result;
        }
        /** @internal */
        [ErrorSteps]() {
            ResetQueue(this);
        }
    }
    Object.defineProperties(WritableStreamDefaultController.prototype, {
        error: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
        Object.defineProperty(WritableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: 'WritableStreamDefaultController',
            configurable: true
        });
    }
    // Abstract operations implementing interface required by the WritableStream.
    function IsWritableStreamDefaultController(x) {
        if (!typeIsObject(x)) {
            return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x, '_controlledWritableStream')) {
            return false;
        }
        return x instanceof WritableStreamDefaultController;
    }
    function SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
        controller._controlledWritableStream = stream;
        stream._writableStreamController = controller;
        // Need to set the slots so that the assert doesn't fire. In the spec the slots already exist implicitly.
        controller._queue = undefined;
        controller._queueTotalSize = undefined;
        ResetQueue(controller);
        controller._abortReason = undefined;
        controller._abortController = createAbortController();
        controller._started = false;
        controller._strategySizeAlgorithm = sizeAlgorithm;
        controller._strategyHWM = highWaterMark;
        controller._writeAlgorithm = writeAlgorithm;
        controller._closeAlgorithm = closeAlgorithm;
        controller._abortAlgorithm = abortAlgorithm;
        const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
        WritableStreamUpdateBackpressure(stream, backpressure);
        const startResult = startAlgorithm();
        const startPromise = promiseResolvedWith(startResult);
        uponPromise(startPromise, () => {
            controller._started = true;
            WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }, r => {
            controller._started = true;
            WritableStreamDealWithRejection(stream, r);
        });
    }
    function SetUpWritableStreamDefaultControllerFromUnderlyingSink(stream, underlyingSink, highWaterMark, sizeAlgorithm) {
        const controller = Object.create(WritableStreamDefaultController.prototype);
        let startAlgorithm = () => undefined;
        let writeAlgorithm = () => promiseResolvedWith(undefined);
        let closeAlgorithm = () => promiseResolvedWith(undefined);
        let abortAlgorithm = () => promiseResolvedWith(undefined);
        if (underlyingSink.start !== undefined) {
            startAlgorithm = () => underlyingSink.start(controller);
        }
        if (underlyingSink.write !== undefined) {
            writeAlgorithm = chunk => underlyingSink.write(chunk, controller);
        }
        if (underlyingSink.close !== undefined) {
            closeAlgorithm = () => underlyingSink.close();
        }
        if (underlyingSink.abort !== undefined) {
            abortAlgorithm = reason => underlyingSink.abort(reason);
        }
        SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
    }
    // ClearAlgorithms may be called twice. Erroring the same stream in multiple ways will often result in redundant calls.
    function WritableStreamDefaultControllerClearAlgorithms(controller) {
        controller._writeAlgorithm = undefined;
        controller._closeAlgorithm = undefined;
        controller._abortAlgorithm = undefined;
        controller._strategySizeAlgorithm = undefined;
    }
    function WritableStreamDefaultControllerClose(controller) {
        EnqueueValueWithSize(controller, closeSentinel, 0);
        WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
    }
    function WritableStreamDefaultControllerGetChunkSize(controller, chunk) {
        try {
            return controller._strategySizeAlgorithm(chunk);
        }
        catch (chunkSizeE) {
            WritableStreamDefaultControllerErrorIfNeeded(controller, chunkSizeE);
            return 1;
        }
    }
    function WritableStreamDefaultControllerGetDesiredSize(controller) {
        return controller._strategyHWM - controller._queueTotalSize;
    }
    function WritableStreamDefaultControllerWrite(controller, chunk, chunkSize) {
        try {
            EnqueueValueWithSize(controller, chunk, chunkSize);
        }
        catch (enqueueE) {
            WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
            return;
        }
        const stream = controller._controlledWritableStream;
        if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._state === 'writable') {
            const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
            WritableStreamUpdateBackpressure(stream, backpressure);
        }
        WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
    }
    // Abstract operations for the WritableStreamDefaultController.
    function WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller) {
        const stream = controller._controlledWritableStream;
        if (!controller._started) {
            return;
        }
        if (stream._inFlightWriteRequest !== undefined) {
            return;
        }
        const state = stream._state;
        if (state === 'erroring') {
            WritableStreamFinishErroring(stream);
            return;
        }
        if (controller._queue.length === 0) {
            return;
        }
        const value = PeekQueueValue(controller);
        if (value === closeSentinel) {
            WritableStreamDefaultControllerProcessClose(controller);
        }
        else {
            WritableStreamDefaultControllerProcessWrite(controller, value);
        }
    }
    function WritableStreamDefaultControllerErrorIfNeeded(controller, error) {
        if (controller._controlledWritableStream._state === 'writable') {
            WritableStreamDefaultControllerError(controller, error);
        }
    }
    function WritableStreamDefaultControllerProcessClose(controller) {
        const stream = controller._controlledWritableStream;
        WritableStreamMarkCloseRequestInFlight(stream);
        DequeueValue(controller);
        const sinkClosePromise = controller._closeAlgorithm();
        WritableStreamDefaultControllerClearAlgorithms(controller);
        uponPromise(sinkClosePromise, () => {
            WritableStreamFinishInFlightClose(stream);
        }, reason => {
            WritableStreamFinishInFlightCloseWithError(stream, reason);
        });
    }
    function WritableStreamDefaultControllerProcessWrite(controller, chunk) {
        const stream = controller._controlledWritableStream;
        WritableStreamMarkFirstWriteRequestInFlight(stream);
        const sinkWritePromise = controller._writeAlgorithm(chunk);
        uponPromise(sinkWritePromise, () => {
            WritableStreamFinishInFlightWrite(stream);
            const state = stream._state;
            DequeueValue(controller);
            if (!WritableStreamCloseQueuedOrInFlight(stream) && state === 'writable') {
                const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
                WritableStreamUpdateBackpressure(stream, backpressure);
            }
            WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }, reason => {
            if (stream._state === 'writable') {
                WritableStreamDefaultControllerClearAlgorithms(controller);
            }
            WritableStreamFinishInFlightWriteWithError(stream, reason);
        });
    }
    function WritableStreamDefaultControllerGetBackpressure(controller) {
        const desiredSize = WritableStreamDefaultControllerGetDesiredSize(controller);
        return desiredSize <= 0;
    }
    // A client of WritableStreamDefaultController may use these functions directly to bypass state check.
    function WritableStreamDefaultControllerError(controller, error) {
        const stream = controller._controlledWritableStream;
        WritableStreamDefaultControllerClearAlgorithms(controller);
        WritableStreamStartErroring(stream, error);
    }
    // Helper functions for the WritableStream.
    function streamBrandCheckException$2(name) {
        return new TypeError(`WritableStream.prototype.${name} can only be used on a WritableStream`);
    }
    // Helper functions for the WritableStreamDefaultController.
    function defaultControllerBrandCheckException$2(name) {
        return new TypeError(`WritableStreamDefaultController.prototype.${name} can only be used on a WritableStreamDefaultController`);
    }
    // Helper functions for the WritableStreamDefaultWriter.
    function defaultWriterBrandCheckException(name) {
        return new TypeError(`WritableStreamDefaultWriter.prototype.${name} can only be used on a WritableStreamDefaultWriter`);
    }
    function defaultWriterLockException(name) {
        return new TypeError('Cannot ' + name + ' a stream using a released writer');
    }
    function defaultWriterClosedPromiseInitialize(writer) {
        writer._closedPromise = newPromise((resolve, reject) => {
            writer._closedPromise_resolve = resolve;
            writer._closedPromise_reject = reject;
            writer._closedPromiseState = 'pending';
        });
    }
    function defaultWriterClosedPromiseInitializeAsRejected(writer, reason) {
        defaultWriterClosedPromiseInitialize(writer);
        defaultWriterClosedPromiseReject(writer, reason);
    }
    function defaultWriterClosedPromiseInitializeAsResolved(writer) {
        defaultWriterClosedPromiseInitialize(writer);
        defaultWriterClosedPromiseResolve(writer);
    }
    function defaultWriterClosedPromiseReject(writer, reason) {
        if (writer._closedPromise_reject === undefined) {
            return;
        }
        setPromiseIsHandledToTrue(writer._closedPromise);
        writer._closedPromise_reject(reason);
        writer._closedPromise_resolve = undefined;
        writer._closedPromise_reject = undefined;
        writer._closedPromiseState = 'rejected';
    }
    function defaultWriterClosedPromiseResetToRejected(writer, reason) {
        defaultWriterClosedPromiseInitializeAsRejected(writer, reason);
    }
    function defaultWriterClosedPromiseResolve(writer) {
        if (writer._closedPromise_resolve === undefined) {
            return;
        }
        writer._closedPromise_resolve(undefined);
        writer._closedPromise_resolve = undefined;
        writer._closedPromise_reject = undefined;
        writer._closedPromiseState = 'resolved';
    }
    function defaultWriterReadyPromiseInitialize(writer) {
        writer._readyPromise = newPromise((resolve, reject) => {
            writer._readyPromise_resolve = resolve;
            writer._readyPromise_reject = reject;
        });
        writer._readyPromiseState = 'pending';
    }
    function defaultWriterReadyPromiseInitializeAsRejected(writer, reason) {
        defaultWriterReadyPromiseInitialize(writer);
        defaultWriterReadyPromiseReject(writer, reason);
    }
    function defaultWriterReadyPromiseInitializeAsResolved(writer) {
        defaultWriterReadyPromiseInitialize(writer);
        defaultWriterReadyPromiseResolve(writer);
    }
    function defaultWriterReadyPromiseReject(writer, reason) {
        if (writer._readyPromise_reject === undefined) {
            return;
        }
        setPromiseIsHandledToTrue(writer._readyPromise);
        writer._readyPromise_reject(reason);
        writer._readyPromise_resolve = undefined;
        writer._readyPromise_reject = undefined;
        writer._readyPromiseState = 'rejected';
    }
    function defaultWriterReadyPromiseReset(writer) {
        defaultWriterReadyPromiseInitialize(writer);
    }
    function defaultWriterReadyPromiseResetToRejected(writer, reason) {
        defaultWriterReadyPromiseInitializeAsRejected(writer, reason);
    }
    function defaultWriterReadyPromiseResolve(writer) {
        if (writer._readyPromise_resolve === undefined) {
            return;
        }
        writer._readyPromise_resolve(undefined);
        writer._readyPromise_resolve = undefined;
        writer._readyPromise_reject = undefined;
        writer._readyPromiseState = 'fulfilled';
    }

    /// <reference lib="dom" />
    const NativeDOMException = typeof DOMException !== 'undefined' ? DOMException : undefined;

    /// <reference types="node" />
    function isDOMExceptionConstructor(ctor) {
        if (!(typeof ctor === 'function' || typeof ctor === 'object')) {
            return false;
        }
        try {
            new ctor();
            return true;
        }
        catch (_a) {
            return false;
        }
    }
    function createDOMExceptionPolyfill() {
        // eslint-disable-next-line no-shadow
        const ctor = function DOMException(message, name) {
            this.message = message || '';
            this.name = name || 'Error';
            if (Error.captureStackTrace) {
                Error.captureStackTrace(this, this.constructor);
            }
        };
        ctor.prototype = Object.create(Error.prototype);
        Object.defineProperty(ctor.prototype, 'constructor', { value: ctor, writable: true, configurable: true });
        return ctor;
    }
    // eslint-disable-next-line no-redeclare
    const DOMException$1 = isDOMExceptionConstructor(NativeDOMException) ? NativeDOMException : createDOMExceptionPolyfill();

    function ReadableStreamPipeTo(source, dest, preventClose, preventAbort, preventCancel, signal) {
        const reader = AcquireReadableStreamDefaultReader(source);
        const writer = AcquireWritableStreamDefaultWriter(dest);
        source._disturbed = true;
        let shuttingDown = false;
        // This is used to keep track of the spec's requirement that we wait for ongoing writes during shutdown.
        let currentWrite = promiseResolvedWith(undefined);
        return newPromise((resolve, reject) => {
            let abortAlgorithm;
            if (signal !== undefined) {
                abortAlgorithm = () => {
                    const error = new DOMException$1('Aborted', 'AbortError');
                    const actions = [];
                    if (!preventAbort) {
                        actions.push(() => {
                            if (dest._state === 'writable') {
                                return WritableStreamAbort(dest, error);
                            }
                            return promiseResolvedWith(undefined);
                        });
                    }
                    if (!preventCancel) {
                        actions.push(() => {
                            if (source._state === 'readable') {
                                return ReadableStreamCancel(source, error);
                            }
                            return promiseResolvedWith(undefined);
                        });
                    }
                    shutdownWithAction(() => Promise.all(actions.map(action => action())), true, error);
                };
                if (signal.aborted) {
                    abortAlgorithm();
                    return;
                }
                signal.addEventListener('abort', abortAlgorithm);
            }
            // Using reader and writer, read all chunks from this and write them to dest
            // - Backpressure must be enforced
            // - Shutdown must stop all activity
            function pipeLoop() {
                return newPromise((resolveLoop, rejectLoop) => {
                    function next(done) {
                        if (done) {
                            resolveLoop();
                        }
                        else {
                            // Use `PerformPromiseThen` instead of `uponPromise` to avoid
                            // adding unnecessary `.catch(rethrowAssertionErrorRejection)` handlers
                            PerformPromiseThen(pipeStep(), next, rejectLoop);
                        }
                    }
                    next(false);
                });
            }
            function pipeStep() {
                if (shuttingDown) {
                    return promiseResolvedWith(true);
                }
                return PerformPromiseThen(writer._readyPromise, () => {
                    return newPromise((resolveRead, rejectRead) => {
                        ReadableStreamDefaultReaderRead(reader, {
                            _chunkSteps: chunk => {
                                currentWrite = PerformPromiseThen(WritableStreamDefaultWriterWrite(writer, chunk), undefined, noop);
                                resolveRead(false);
                            },
                            _closeSteps: () => resolveRead(true),
                            _errorSteps: rejectRead
                        });
                    });
                });
            }
            // Errors must be propagated forward
            isOrBecomesErrored(source, reader._closedPromise, storedError => {
                if (!preventAbort) {
                    shutdownWithAction(() => WritableStreamAbort(dest, storedError), true, storedError);
                }
                else {
                    shutdown(true, storedError);
                }
            });
            // Errors must be propagated backward
            isOrBecomesErrored(dest, writer._closedPromise, storedError => {
                if (!preventCancel) {
                    shutdownWithAction(() => ReadableStreamCancel(source, storedError), true, storedError);
                }
                else {
                    shutdown(true, storedError);
                }
            });
            // Closing must be propagated forward
            isOrBecomesClosed(source, reader._closedPromise, () => {
                if (!preventClose) {
                    shutdownWithAction(() => WritableStreamDefaultWriterCloseWithErrorPropagation(writer));
                }
                else {
                    shutdown();
                }
            });
            // Closing must be propagated backward
            if (WritableStreamCloseQueuedOrInFlight(dest) || dest._state === 'closed') {
                const destClosed = new TypeError('the destination writable stream closed before all data could be piped to it');
                if (!preventCancel) {
                    shutdownWithAction(() => ReadableStreamCancel(source, destClosed), true, destClosed);
                }
                else {
                    shutdown(true, destClosed);
                }
            }
            setPromiseIsHandledToTrue(pipeLoop());
            function waitForWritesToFinish() {
                // Another write may have started while we were waiting on this currentWrite, so we have to be sure to wait
                // for that too.
                const oldCurrentWrite = currentWrite;
                return PerformPromiseThen(currentWrite, () => oldCurrentWrite !== currentWrite ? waitForWritesToFinish() : undefined);
            }
            function isOrBecomesErrored(stream, promise, action) {
                if (stream._state === 'errored') {
                    action(stream._storedError);
                }
                else {
                    uponRejection(promise, action);
                }
            }
            function isOrBecomesClosed(stream, promise, action) {
                if (stream._state === 'closed') {
                    action();
                }
                else {
                    uponFulfillment(promise, action);
                }
            }
            function shutdownWithAction(action, originalIsError, originalError) {
                if (shuttingDown) {
                    return;
                }
                shuttingDown = true;
                if (dest._state === 'writable' && !WritableStreamCloseQueuedOrInFlight(dest)) {
                    uponFulfillment(waitForWritesToFinish(), doTheRest);
                }
                else {
                    doTheRest();
                }
                function doTheRest() {
                    uponPromise(action(), () => finalize(originalIsError, originalError), newError => finalize(true, newError));
                }
            }
            function shutdown(isError, error) {
                if (shuttingDown) {
                    return;
                }
                shuttingDown = true;
                if (dest._state === 'writable' && !WritableStreamCloseQueuedOrInFlight(dest)) {
                    uponFulfillment(waitForWritesToFinish(), () => finalize(isError, error));
                }
                else {
                    finalize(isError, error);
                }
            }
            function finalize(isError, error) {
                WritableStreamDefaultWriterRelease(writer);
                ReadableStreamReaderGenericRelease(reader);
                if (signal !== undefined) {
                    signal.removeEventListener('abort', abortAlgorithm);
                }
                if (isError) {
                    reject(error);
                }
                else {
                    resolve(undefined);
                }
            }
        });
    }

    /**
     * Allows control of a {@link ReadableStream | readable stream}'s state and internal queue.
     *
     * @public
     */
    class ReadableStreamDefaultController {
        constructor() {
            throw new TypeError('Illegal constructor');
        }
        /**
         * Returns the desired size to fill the controlled stream's internal queue. It can be negative, if the queue is
         * over-full. An underlying source ought to use this information to determine when and how to apply backpressure.
         */
        get desiredSize() {
            if (!IsReadableStreamDefaultController(this)) {
                throw defaultControllerBrandCheckException$1('desiredSize');
            }
            return ReadableStreamDefaultControllerGetDesiredSize(this);
        }
        /**
         * Closes the controlled readable stream. Consumers will still be able to read any previously-enqueued chunks from
         * the stream, but once those are read, the stream will become closed.
         */
        close() {
            if (!IsReadableStreamDefaultController(this)) {
                throw defaultControllerBrandCheckException$1('close');
            }
            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
                throw new TypeError('The stream is not in a state that permits close');
            }
            ReadableStreamDefaultControllerClose(this);
        }
        enqueue(chunk = undefined) {
            if (!IsReadableStreamDefaultController(this)) {
                throw defaultControllerBrandCheckException$1('enqueue');
            }
            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
                throw new TypeError('The stream is not in a state that permits enqueue');
            }
            return ReadableStreamDefaultControllerEnqueue(this, chunk);
        }
        /**
         * Errors the controlled readable stream, making all future interactions with it fail with the given error `e`.
         */
        error(e = undefined) {
            if (!IsReadableStreamDefaultController(this)) {
                throw defaultControllerBrandCheckException$1('error');
            }
            ReadableStreamDefaultControllerError(this, e);
        }
        /** @internal */
        [CancelSteps](reason) {
            ResetQueue(this);
            const result = this._cancelAlgorithm(reason);
            ReadableStreamDefaultControllerClearAlgorithms(this);
            return result;
        }
        /** @internal */
        [PullSteps](readRequest) {
            const stream = this._controlledReadableStream;
            if (this._queue.length > 0) {
                const chunk = DequeueValue(this);
                if (this._closeRequested && this._queue.length === 0) {
                    ReadableStreamDefaultControllerClearAlgorithms(this);
                    ReadableStreamClose(stream);
                }
                else {
                    ReadableStreamDefaultControllerCallPullIfNeeded(this);
                }
                readRequest._chunkSteps(chunk);
            }
            else {
                ReadableStreamAddReadRequest(stream, readRequest);
                ReadableStreamDefaultControllerCallPullIfNeeded(this);
            }
        }
    }
    Object.defineProperties(ReadableStreamDefaultController.prototype, {
        close: { enumerable: true },
        enqueue: { enumerable: true },
        error: { enumerable: true },
        desiredSize: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
        Object.defineProperty(ReadableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: 'ReadableStreamDefaultController',
            configurable: true
        });
    }
    // Abstract operations for the ReadableStreamDefaultController.
    function IsReadableStreamDefaultController(x) {
        if (!typeIsObject(x)) {
            return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x, '_controlledReadableStream')) {
            return false;
        }
        return x instanceof ReadableStreamDefaultController;
    }
    function ReadableStreamDefaultControllerCallPullIfNeeded(controller) {
        const shouldPull = ReadableStreamDefaultControllerShouldCallPull(controller);
        if (!shouldPull) {
            return;
        }
        if (controller._pulling) {
            controller._pullAgain = true;
            return;
        }
        controller._pulling = true;
        const pullPromise = controller._pullAlgorithm();
        uponPromise(pullPromise, () => {
            controller._pulling = false;
            if (controller._pullAgain) {
                controller._pullAgain = false;
                ReadableStreamDefaultControllerCallPullIfNeeded(controller);
            }
        }, e => {
            ReadableStreamDefaultControllerError(controller, e);
        });
    }
    function ReadableStreamDefaultControllerShouldCallPull(controller) {
        const stream = controller._controlledReadableStream;
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return false;
        }
        if (!controller._started) {
            return false;
        }
        if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            return true;
        }
        const desiredSize = ReadableStreamDefaultControllerGetDesiredSize(controller);
        if (desiredSize > 0) {
            return true;
        }
        return false;
    }
    function ReadableStreamDefaultControllerClearAlgorithms(controller) {
        controller._pullAlgorithm = undefined;
        controller._cancelAlgorithm = undefined;
        controller._strategySizeAlgorithm = undefined;
    }
    // A client of ReadableStreamDefaultController may use these functions directly to bypass state check.
    function ReadableStreamDefaultControllerClose(controller) {
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return;
        }
        const stream = controller._controlledReadableStream;
        controller._closeRequested = true;
        if (controller._queue.length === 0) {
            ReadableStreamDefaultControllerClearAlgorithms(controller);
            ReadableStreamClose(stream);
        }
    }
    function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return;
        }
        const stream = controller._controlledReadableStream;
        if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            ReadableStreamFulfillReadRequest(stream, chunk, false);
        }
        else {
            let chunkSize;
            try {
                chunkSize = controller._strategySizeAlgorithm(chunk);
            }
            catch (chunkSizeE) {
                ReadableStreamDefaultControllerError(controller, chunkSizeE);
                throw chunkSizeE;
            }
            try {
                EnqueueValueWithSize(controller, chunk, chunkSize);
            }
            catch (enqueueE) {
                ReadableStreamDefaultControllerError(controller, enqueueE);
                throw enqueueE;
            }
        }
        ReadableStreamDefaultControllerCallPullIfNeeded(controller);
    }
    function ReadableStreamDefaultControllerError(controller, e) {
        const stream = controller._controlledReadableStream;
        if (stream._state !== 'readable') {
            return;
        }
        ResetQueue(controller);
        ReadableStreamDefaultControllerClearAlgorithms(controller);
        ReadableStreamError(stream, e);
    }
    function ReadableStreamDefaultControllerGetDesiredSize(controller) {
        const state = controller._controlledReadableStream._state;
        if (state === 'errored') {
            return null;
        }
        if (state === 'closed') {
            return 0;
        }
        return controller._strategyHWM - controller._queueTotalSize;
    }
    // This is used in the implementation of TransformStream.
    function ReadableStreamDefaultControllerHasBackpressure(controller) {
        if (ReadableStreamDefaultControllerShouldCallPull(controller)) {
            return false;
        }
        return true;
    }
    function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
        const state = controller._controlledReadableStream._state;
        if (!controller._closeRequested && state === 'readable') {
            return true;
        }
        return false;
    }
    function SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
        controller._controlledReadableStream = stream;
        controller._queue = undefined;
        controller._queueTotalSize = undefined;
        ResetQueue(controller);
        controller._started = false;
        controller._closeRequested = false;
        controller._pullAgain = false;
        controller._pulling = false;
        controller._strategySizeAlgorithm = sizeAlgorithm;
        controller._strategyHWM = highWaterMark;
        controller._pullAlgorithm = pullAlgorithm;
        controller._cancelAlgorithm = cancelAlgorithm;
        stream._readableStreamController = controller;
        const startResult = startAlgorithm();
        uponPromise(promiseResolvedWith(startResult), () => {
            controller._started = true;
            ReadableStreamDefaultControllerCallPullIfNeeded(controller);
        }, r => {
            ReadableStreamDefaultControllerError(controller, r);
        });
    }
    function SetUpReadableStreamDefaultControllerFromUnderlyingSource(stream, underlyingSource, highWaterMark, sizeAlgorithm) {
        const controller = Object.create(ReadableStreamDefaultController.prototype);
        let startAlgorithm = () => undefined;
        let pullAlgorithm = () => promiseResolvedWith(undefined);
        let cancelAlgorithm = () => promiseResolvedWith(undefined);
        if (underlyingSource.start !== undefined) {
            startAlgorithm = () => underlyingSource.start(controller);
        }
        if (underlyingSource.pull !== undefined) {
            pullAlgorithm = () => underlyingSource.pull(controller);
        }
        if (underlyingSource.cancel !== undefined) {
            cancelAlgorithm = reason => underlyingSource.cancel(reason);
        }
        SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
    }
    // Helper functions for the ReadableStreamDefaultController.
    function defaultControllerBrandCheckException$1(name) {
        return new TypeError(`ReadableStreamDefaultController.prototype.${name} can only be used on a ReadableStreamDefaultController`);
    }

    function ReadableStreamTee(stream, cloneForBranch2) {
        if (IsReadableByteStreamController(stream._readableStreamController)) {
            return ReadableByteStreamTee(stream);
        }
        return ReadableStreamDefaultTee(stream);
    }
    function ReadableStreamDefaultTee(stream, cloneForBranch2) {
        const reader = AcquireReadableStreamDefaultReader(stream);
        let reading = false;
        let canceled1 = false;
        let canceled2 = false;
        let reason1;
        let reason2;
        let branch1;
        let branch2;
        let resolveCancelPromise;
        const cancelPromise = newPromise(resolve => {
            resolveCancelPromise = resolve;
        });
        function pullAlgorithm() {
            if (reading) {
                return promiseResolvedWith(undefined);
            }
            reading = true;
            const readRequest = {
                _chunkSteps: chunk => {
                    // This needs to be delayed a microtask because it takes at least a microtask to detect errors (using
                    // reader._closedPromise below), and we want errors in stream to error both branches immediately. We cannot let
                    // successful synchronously-available reads get ahead of asynchronously-available errors.
                    queueMicrotask(() => {
                        reading = false;
                        const chunk1 = chunk;
                        const chunk2 = chunk;
                        // There is no way to access the cloning code right now in the reference implementation.
                        // If we add one then we'll need an implementation for serializable objects.
                        // if (!canceled2 && cloneForBranch2) {
                        //   chunk2 = StructuredDeserialize(StructuredSerialize(chunk2));
                        // }
                        if (!canceled1) {
                            ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, chunk1);
                        }
                        if (!canceled2) {
                            ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, chunk2);
                        }
                    });
                },
                _closeSteps: () => {
                    reading = false;
                    if (!canceled1) {
                        ReadableStreamDefaultControllerClose(branch1._readableStreamController);
                    }
                    if (!canceled2) {
                        ReadableStreamDefaultControllerClose(branch2._readableStreamController);
                    }
                    if (!canceled1 || !canceled2) {
                        resolveCancelPromise(undefined);
                    }
                },
                _errorSteps: () => {
                    reading = false;
                }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
            return promiseResolvedWith(undefined);
        }
        function cancel1Algorithm(reason) {
            canceled1 = true;
            reason1 = reason;
            if (canceled2) {
                const compositeReason = CreateArrayFromList([reason1, reason2]);
                const cancelResult = ReadableStreamCancel(stream, compositeReason);
                resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
        }
        function cancel2Algorithm(reason) {
            canceled2 = true;
            reason2 = reason;
            if (canceled1) {
                const compositeReason = CreateArrayFromList([reason1, reason2]);
                const cancelResult = ReadableStreamCancel(stream, compositeReason);
                resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
        }
        function startAlgorithm() {
            // do nothing
        }
        branch1 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel1Algorithm);
        branch2 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel2Algorithm);
        uponRejection(reader._closedPromise, (r) => {
            ReadableStreamDefaultControllerError(branch1._readableStreamController, r);
            ReadableStreamDefaultControllerError(branch2._readableStreamController, r);
            if (!canceled1 || !canceled2) {
                resolveCancelPromise(undefined);
            }
        });
        return [branch1, branch2];
    }
    function ReadableByteStreamTee(stream) {
        let reader = AcquireReadableStreamDefaultReader(stream);
        let reading = false;
        let canceled1 = false;
        let canceled2 = false;
        let reason1;
        let reason2;
        let branch1;
        let branch2;
        let resolveCancelPromise;
        const cancelPromise = newPromise(resolve => {
            resolveCancelPromise = resolve;
        });
        function forwardReaderError(thisReader) {
            uponRejection(thisReader._closedPromise, r => {
                if (thisReader !== reader) {
                    return;
                }
                ReadableByteStreamControllerError(branch1._readableStreamController, r);
                ReadableByteStreamControllerError(branch2._readableStreamController, r);
                if (!canceled1 || !canceled2) {
                    resolveCancelPromise(undefined);
                }
            });
        }
        function pullWithDefaultReader() {
            if (IsReadableStreamBYOBReader(reader)) {
                ReadableStreamReaderGenericRelease(reader);
                reader = AcquireReadableStreamDefaultReader(stream);
                forwardReaderError(reader);
            }
            const readRequest = {
                _chunkSteps: chunk => {
                    // This needs to be delayed a microtask because it takes at least a microtask to detect errors (using
                    // reader._closedPromise below), and we want errors in stream to error both branches immediately. We cannot let
                    // successful synchronously-available reads get ahead of asynchronously-available errors.
                    queueMicrotask(() => {
                        reading = false;
                        const chunk1 = chunk;
                        let chunk2 = chunk;
                        if (!canceled1 && !canceled2) {
                            try {
                                chunk2 = CloneAsUint8Array(chunk);
                            }
                            catch (cloneE) {
                                ReadableByteStreamControllerError(branch1._readableStreamController, cloneE);
                                ReadableByteStreamControllerError(branch2._readableStreamController, cloneE);
                                resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                                return;
                            }
                        }
                        if (!canceled1) {
                            ReadableByteStreamControllerEnqueue(branch1._readableStreamController, chunk1);
                        }
                        if (!canceled2) {
                            ReadableByteStreamControllerEnqueue(branch2._readableStreamController, chunk2);
                        }
                    });
                },
                _closeSteps: () => {
                    reading = false;
                    if (!canceled1) {
                        ReadableByteStreamControllerClose(branch1._readableStreamController);
                    }
                    if (!canceled2) {
                        ReadableByteStreamControllerClose(branch2._readableStreamController);
                    }
                    if (branch1._readableStreamController._pendingPullIntos.length > 0) {
                        ReadableByteStreamControllerRespond(branch1._readableStreamController, 0);
                    }
                    if (branch2._readableStreamController._pendingPullIntos.length > 0) {
                        ReadableByteStreamControllerRespond(branch2._readableStreamController, 0);
                    }
                    if (!canceled1 || !canceled2) {
                        resolveCancelPromise(undefined);
                    }
                },
                _errorSteps: () => {
                    reading = false;
                }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
        }
        function pullWithBYOBReader(view, forBranch2) {
            if (IsReadableStreamDefaultReader(reader)) {
                ReadableStreamReaderGenericRelease(reader);
                reader = AcquireReadableStreamBYOBReader(stream);
                forwardReaderError(reader);
            }
            const byobBranch = forBranch2 ? branch2 : branch1;
            const otherBranch = forBranch2 ? branch1 : branch2;
            const readIntoRequest = {
                _chunkSteps: chunk => {
                    // This needs to be delayed a microtask because it takes at least a microtask to detect errors (using
                    // reader._closedPromise below), and we want errors in stream to error both branches immediately. We cannot let
                    // successful synchronously-available reads get ahead of asynchronously-available errors.
                    queueMicrotask(() => {
                        reading = false;
                        const byobCanceled = forBranch2 ? canceled2 : canceled1;
                        const otherCanceled = forBranch2 ? canceled1 : canceled2;
                        if (!otherCanceled) {
                            let clonedChunk;
                            try {
                                clonedChunk = CloneAsUint8Array(chunk);
                            }
                            catch (cloneE) {
                                ReadableByteStreamControllerError(byobBranch._readableStreamController, cloneE);
                                ReadableByteStreamControllerError(otherBranch._readableStreamController, cloneE);
                                resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                                return;
                            }
                            if (!byobCanceled) {
                                ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                            }
                            ReadableByteStreamControllerEnqueue(otherBranch._readableStreamController, clonedChunk);
                        }
                        else if (!byobCanceled) {
                            ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                        }
                    });
                },
                _closeSteps: chunk => {
                    reading = false;
                    const byobCanceled = forBranch2 ? canceled2 : canceled1;
                    const otherCanceled = forBranch2 ? canceled1 : canceled2;
                    if (!byobCanceled) {
                        ReadableByteStreamControllerClose(byobBranch._readableStreamController);
                    }
                    if (!otherCanceled) {
                        ReadableByteStreamControllerClose(otherBranch._readableStreamController);
                    }
                    if (chunk !== undefined) {
                        if (!byobCanceled) {
                            ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                        }
                        if (!otherCanceled && otherBranch._readableStreamController._pendingPullIntos.length > 0) {
                            ReadableByteStreamControllerRespond(otherBranch._readableStreamController, 0);
                        }
                    }
                    if (!byobCanceled || !otherCanceled) {
                        resolveCancelPromise(undefined);
                    }
                },
                _errorSteps: () => {
                    reading = false;
                }
            };
            ReadableStreamBYOBReaderRead(reader, view, readIntoRequest);
        }
        function pull1Algorithm() {
            if (reading) {
                return promiseResolvedWith(undefined);
            }
            reading = true;
            const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch1._readableStreamController);
            if (byobRequest === null) {
                pullWithDefaultReader();
            }
            else {
                pullWithBYOBReader(byobRequest._view, false);
            }
            return promiseResolvedWith(undefined);
        }
        function pull2Algorithm() {
            if (reading) {
                return promiseResolvedWith(undefined);
            }
            reading = true;
            const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch2._readableStreamController);
            if (byobRequest === null) {
                pullWithDefaultReader();
            }
            else {
                pullWithBYOBReader(byobRequest._view, true);
            }
            return promiseResolvedWith(undefined);
        }
        function cancel1Algorithm(reason) {
            canceled1 = true;
            reason1 = reason;
            if (canceled2) {
                const compositeReason = CreateArrayFromList([reason1, reason2]);
                const cancelResult = ReadableStreamCancel(stream, compositeReason);
                resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
        }
        function cancel2Algorithm(reason) {
            canceled2 = true;
            reason2 = reason;
            if (canceled1) {
                const compositeReason = CreateArrayFromList([reason1, reason2]);
                const cancelResult = ReadableStreamCancel(stream, compositeReason);
                resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
        }
        function startAlgorithm() {
            return;
        }
        branch1 = CreateReadableByteStream(startAlgorithm, pull1Algorithm, cancel1Algorithm);
        branch2 = CreateReadableByteStream(startAlgorithm, pull2Algorithm, cancel2Algorithm);
        forwardReaderError(reader);
        return [branch1, branch2];
    }

    function convertUnderlyingDefaultOrByteSource(source, context) {
        assertDictionary(source, context);
        const original = source;
        const autoAllocateChunkSize = original === null || original === void 0 ? void 0 : original.autoAllocateChunkSize;
        const cancel = original === null || original === void 0 ? void 0 : original.cancel;
        const pull = original === null || original === void 0 ? void 0 : original.pull;
        const start = original === null || original === void 0 ? void 0 : original.start;
        const type = original === null || original === void 0 ? void 0 : original.type;
        return {
            autoAllocateChunkSize: autoAllocateChunkSize === undefined ?
                undefined :
                convertUnsignedLongLongWithEnforceRange(autoAllocateChunkSize, `${context} has member 'autoAllocateChunkSize' that`),
            cancel: cancel === undefined ?
                undefined :
                convertUnderlyingSourceCancelCallback(cancel, original, `${context} has member 'cancel' that`),
            pull: pull === undefined ?
                undefined :
                convertUnderlyingSourcePullCallback(pull, original, `${context} has member 'pull' that`),
            start: start === undefined ?
                undefined :
                convertUnderlyingSourceStartCallback(start, original, `${context} has member 'start' that`),
            type: type === undefined ? undefined : convertReadableStreamType(type, `${context} has member 'type' that`)
        };
    }
    function convertUnderlyingSourceCancelCallback(fn, original, context) {
        assertFunction(fn, context);
        return (reason) => promiseCall(fn, original, [reason]);
    }
    function convertUnderlyingSourcePullCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => promiseCall(fn, original, [controller]);
    }
    function convertUnderlyingSourceStartCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => reflectCall(fn, original, [controller]);
    }
    function convertReadableStreamType(type, context) {
        type = `${type}`;
        if (type !== 'bytes') {
            throw new TypeError(`${context} '${type}' is not a valid enumeration value for ReadableStreamType`);
        }
        return type;
    }

    function convertReaderOptions(options, context) {
        assertDictionary(options, context);
        const mode = options === null || options === void 0 ? void 0 : options.mode;
        return {
            mode: mode === undefined ? undefined : convertReadableStreamReaderMode(mode, `${context} has member 'mode' that`)
        };
    }
    function convertReadableStreamReaderMode(mode, context) {
        mode = `${mode}`;
        if (mode !== 'byob') {
            throw new TypeError(`${context} '${mode}' is not a valid enumeration value for ReadableStreamReaderMode`);
        }
        return mode;
    }

    function convertIteratorOptions(options, context) {
        assertDictionary(options, context);
        const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
        return { preventCancel: Boolean(preventCancel) };
    }

    function convertPipeOptions(options, context) {
        assertDictionary(options, context);
        const preventAbort = options === null || options === void 0 ? void 0 : options.preventAbort;
        const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
        const preventClose = options === null || options === void 0 ? void 0 : options.preventClose;
        const signal = options === null || options === void 0 ? void 0 : options.signal;
        if (signal !== undefined) {
            assertAbortSignal(signal, `${context} has member 'signal' that`);
        }
        return {
            preventAbort: Boolean(preventAbort),
            preventCancel: Boolean(preventCancel),
            preventClose: Boolean(preventClose),
            signal
        };
    }
    function assertAbortSignal(signal, context) {
        if (!isAbortSignal(signal)) {
            throw new TypeError(`${context} is not an AbortSignal.`);
        }
    }

    function convertReadableWritablePair(pair, context) {
        assertDictionary(pair, context);
        const readable = pair === null || pair === void 0 ? void 0 : pair.readable;
        assertRequiredField(readable, 'readable', 'ReadableWritablePair');
        assertReadableStream(readable, `${context} has member 'readable' that`);
        const writable = pair === null || pair === void 0 ? void 0 : pair.writable;
        assertRequiredField(writable, 'writable', 'ReadableWritablePair');
        assertWritableStream(writable, `${context} has member 'writable' that`);
        return { readable, writable };
    }

    /**
     * A readable stream represents a source of data, from which you can read.
     *
     * @public
     */
    class ReadableStream {
        constructor(rawUnderlyingSource = {}, rawStrategy = {}) {
            if (rawUnderlyingSource === undefined) {
                rawUnderlyingSource = null;
            }
            else {
                assertObject(rawUnderlyingSource, 'First parameter');
            }
            const strategy = convertQueuingStrategy(rawStrategy, 'Second parameter');
            const underlyingSource = convertUnderlyingDefaultOrByteSource(rawUnderlyingSource, 'First parameter');
            InitializeReadableStream(this);
            if (underlyingSource.type === 'bytes') {
                if (strategy.size !== undefined) {
                    throw new RangeError('The strategy for a byte stream cannot have a size function');
                }
                const highWaterMark = ExtractHighWaterMark(strategy, 0);
                SetUpReadableByteStreamControllerFromUnderlyingSource(this, underlyingSource, highWaterMark);
            }
            else {
                const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
                const highWaterMark = ExtractHighWaterMark(strategy, 1);
                SetUpReadableStreamDefaultControllerFromUnderlyingSource(this, underlyingSource, highWaterMark, sizeAlgorithm);
            }
        }
        /**
         * Whether or not the readable stream is locked to a {@link ReadableStreamDefaultReader | reader}.
         */
        get locked() {
            if (!IsReadableStream(this)) {
                throw streamBrandCheckException$1('locked');
            }
            return IsReadableStreamLocked(this);
        }
        /**
         * Cancels the stream, signaling a loss of interest in the stream by a consumer.
         *
         * The supplied `reason` argument will be given to the underlying source's {@link UnderlyingSource.cancel | cancel()}
         * method, which might or might not use it.
         */
        cancel(reason = undefined) {
            if (!IsReadableStream(this)) {
                return promiseRejectedWith(streamBrandCheckException$1('cancel'));
            }
            if (IsReadableStreamLocked(this)) {
                return promiseRejectedWith(new TypeError('Cannot cancel a stream that already has a reader'));
            }
            return ReadableStreamCancel(this, reason);
        }
        getReader(rawOptions = undefined) {
            if (!IsReadableStream(this)) {
                throw streamBrandCheckException$1('getReader');
            }
            const options = convertReaderOptions(rawOptions, 'First parameter');
            if (options.mode === undefined) {
                return AcquireReadableStreamDefaultReader(this);
            }
            return AcquireReadableStreamBYOBReader(this);
        }
        pipeThrough(rawTransform, rawOptions = {}) {
            if (!IsReadableStream(this)) {
                throw streamBrandCheckException$1('pipeThrough');
            }
            assertRequiredArgument(rawTransform, 1, 'pipeThrough');
            const transform = convertReadableWritablePair(rawTransform, 'First parameter');
            const options = convertPipeOptions(rawOptions, 'Second parameter');
            if (IsReadableStreamLocked(this)) {
                throw new TypeError('ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream');
            }
            if (IsWritableStreamLocked(transform.writable)) {
                throw new TypeError('ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream');
            }
            const promise = ReadableStreamPipeTo(this, transform.writable, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
            setPromiseIsHandledToTrue(promise);
            return transform.readable;
        }
        pipeTo(destination, rawOptions = {}) {
            if (!IsReadableStream(this)) {
                return promiseRejectedWith(streamBrandCheckException$1('pipeTo'));
            }
            if (destination === undefined) {
                return promiseRejectedWith(`Parameter 1 is required in 'pipeTo'.`);
            }
            if (!IsWritableStream(destination)) {
                return promiseRejectedWith(new TypeError(`ReadableStream.prototype.pipeTo's first argument must be a WritableStream`));
            }
            let options;
            try {
                options = convertPipeOptions(rawOptions, 'Second parameter');
            }
            catch (e) {
                return promiseRejectedWith(e);
            }
            if (IsReadableStreamLocked(this)) {
                return promiseRejectedWith(new TypeError('ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream'));
            }
            if (IsWritableStreamLocked(destination)) {
                return promiseRejectedWith(new TypeError('ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream'));
            }
            return ReadableStreamPipeTo(this, destination, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
        }
        /**
         * Tees this readable stream, returning a two-element array containing the two resulting branches as
         * new {@link ReadableStream} instances.
         *
         * Teeing a stream will lock it, preventing any other consumer from acquiring a reader.
         * To cancel the stream, cancel both of the resulting branches; a composite cancellation reason will then be
         * propagated to the stream's underlying source.
         *
         * Note that the chunks seen in each branch will be the same object. If the chunks are not immutable,
         * this could allow interference between the two branches.
         */
        tee() {
            if (!IsReadableStream(this)) {
                throw streamBrandCheckException$1('tee');
            }
            const branches = ReadableStreamTee(this);
            return CreateArrayFromList(branches);
        }
        values(rawOptions = undefined) {
            if (!IsReadableStream(this)) {
                throw streamBrandCheckException$1('values');
            }
            const options = convertIteratorOptions(rawOptions, 'First parameter');
            return AcquireReadableStreamAsyncIterator(this, options.preventCancel);
        }
    }
    Object.defineProperties(ReadableStream.prototype, {
        cancel: { enumerable: true },
        getReader: { enumerable: true },
        pipeThrough: { enumerable: true },
        pipeTo: { enumerable: true },
        tee: { enumerable: true },
        values: { enumerable: true },
        locked: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
        Object.defineProperty(ReadableStream.prototype, SymbolPolyfill.toStringTag, {
            value: 'ReadableStream',
            configurable: true
        });
    }
    if (typeof SymbolPolyfill.asyncIterator === 'symbol') {
        Object.defineProperty(ReadableStream.prototype, SymbolPolyfill.asyncIterator, {
            value: ReadableStream.prototype.values,
            writable: true,
            configurable: true
        });
    }
    // Abstract operations for the ReadableStream.
    // Throws if and only if startAlgorithm throws.
    function CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
        const stream = Object.create(ReadableStream.prototype);
        InitializeReadableStream(stream);
        const controller = Object.create(ReadableStreamDefaultController.prototype);
        SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
        return stream;
    }
    // Throws if and only if startAlgorithm throws.
    function CreateReadableByteStream(startAlgorithm, pullAlgorithm, cancelAlgorithm) {
        const stream = Object.create(ReadableStream.prototype);
        InitializeReadableStream(stream);
        const controller = Object.create(ReadableByteStreamController.prototype);
        SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, 0, undefined);
        return stream;
    }
    function InitializeReadableStream(stream) {
        stream._state = 'readable';
        stream._reader = undefined;
        stream._storedError = undefined;
        stream._disturbed = false;
    }
    function IsReadableStream(x) {
        if (!typeIsObject(x)) {
            return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x, '_readableStreamController')) {
            return false;
        }
        return x instanceof ReadableStream;
    }
    function IsReadableStreamLocked(stream) {
        if (stream._reader === undefined) {
            return false;
        }
        return true;
    }
    // ReadableStream API exposed for controllers.
    function ReadableStreamCancel(stream, reason) {
        stream._disturbed = true;
        if (stream._state === 'closed') {
            return promiseResolvedWith(undefined);
        }
        if (stream._state === 'errored') {
            return promiseRejectedWith(stream._storedError);
        }
        ReadableStreamClose(stream);
        const reader = stream._reader;
        if (reader !== undefined && IsReadableStreamBYOBReader(reader)) {
            reader._readIntoRequests.forEach(readIntoRequest => {
                readIntoRequest._closeSteps(undefined);
            });
            reader._readIntoRequests = new SimpleQueue();
        }
        const sourceCancelPromise = stream._readableStreamController[CancelSteps](reason);
        return transformPromiseWith(sourceCancelPromise, noop);
    }
    function ReadableStreamClose(stream) {
        stream._state = 'closed';
        const reader = stream._reader;
        if (reader === undefined) {
            return;
        }
        defaultReaderClosedPromiseResolve(reader);
        if (IsReadableStreamDefaultReader(reader)) {
            reader._readRequests.forEach(readRequest => {
                readRequest._closeSteps();
            });
            reader._readRequests = new SimpleQueue();
        }
    }
    function ReadableStreamError(stream, e) {
        stream._state = 'errored';
        stream._storedError = e;
        const reader = stream._reader;
        if (reader === undefined) {
            return;
        }
        defaultReaderClosedPromiseReject(reader, e);
        if (IsReadableStreamDefaultReader(reader)) {
            reader._readRequests.forEach(readRequest => {
                readRequest._errorSteps(e);
            });
            reader._readRequests = new SimpleQueue();
        }
        else {
            reader._readIntoRequests.forEach(readIntoRequest => {
                readIntoRequest._errorSteps(e);
            });
            reader._readIntoRequests = new SimpleQueue();
        }
    }
    // Helper functions for the ReadableStream.
    function streamBrandCheckException$1(name) {
        return new TypeError(`ReadableStream.prototype.${name} can only be used on a ReadableStream`);
    }

    function convertQueuingStrategyInit(init, context) {
        assertDictionary(init, context);
        const highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
        assertRequiredField(highWaterMark, 'highWaterMark', 'QueuingStrategyInit');
        return {
            highWaterMark: convertUnrestrictedDouble(highWaterMark)
        };
    }

    // The size function must not have a prototype property nor be a constructor
    const byteLengthSizeFunction = (chunk) => {
        return chunk.byteLength;
    };
    Object.defineProperty(byteLengthSizeFunction, 'name', {
        value: 'size',
        configurable: true
    });
    /**
     * A queuing strategy that counts the number of bytes in each chunk.
     *
     * @public
     */
    class ByteLengthQueuingStrategy {
        constructor(options) {
            assertRequiredArgument(options, 1, 'ByteLengthQueuingStrategy');
            options = convertQueuingStrategyInit(options, 'First parameter');
            this._byteLengthQueuingStrategyHighWaterMark = options.highWaterMark;
        }
        /**
         * Returns the high water mark provided to the constructor.
         */
        get highWaterMark() {
            if (!IsByteLengthQueuingStrategy(this)) {
                throw byteLengthBrandCheckException('highWaterMark');
            }
            return this._byteLengthQueuingStrategyHighWaterMark;
        }
        /**
         * Measures the size of `chunk` by returning the value of its `byteLength` property.
         */
        get size() {
            if (!IsByteLengthQueuingStrategy(this)) {
                throw byteLengthBrandCheckException('size');
            }
            return byteLengthSizeFunction;
        }
    }
    Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
        highWaterMark: { enumerable: true },
        size: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
        Object.defineProperty(ByteLengthQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
            value: 'ByteLengthQueuingStrategy',
            configurable: true
        });
    }
    // Helper functions for the ByteLengthQueuingStrategy.
    function byteLengthBrandCheckException(name) {
        return new TypeError(`ByteLengthQueuingStrategy.prototype.${name} can only be used on a ByteLengthQueuingStrategy`);
    }
    function IsByteLengthQueuingStrategy(x) {
        if (!typeIsObject(x)) {
            return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x, '_byteLengthQueuingStrategyHighWaterMark')) {
            return false;
        }
        return x instanceof ByteLengthQueuingStrategy;
    }

    // The size function must not have a prototype property nor be a constructor
    const countSizeFunction = () => {
        return 1;
    };
    Object.defineProperty(countSizeFunction, 'name', {
        value: 'size',
        configurable: true
    });
    /**
     * A queuing strategy that counts the number of chunks.
     *
     * @public
     */
    class CountQueuingStrategy {
        constructor(options) {
            assertRequiredArgument(options, 1, 'CountQueuingStrategy');
            options = convertQueuingStrategyInit(options, 'First parameter');
            this._countQueuingStrategyHighWaterMark = options.highWaterMark;
        }
        /**
         * Returns the high water mark provided to the constructor.
         */
        get highWaterMark() {
            if (!IsCountQueuingStrategy(this)) {
                throw countBrandCheckException('highWaterMark');
            }
            return this._countQueuingStrategyHighWaterMark;
        }
        /**
         * Measures the size of `chunk` by always returning 1.
         * This ensures that the total queue size is a count of the number of chunks in the queue.
         */
        get size() {
            if (!IsCountQueuingStrategy(this)) {
                throw countBrandCheckException('size');
            }
            return countSizeFunction;
        }
    }
    Object.defineProperties(CountQueuingStrategy.prototype, {
        highWaterMark: { enumerable: true },
        size: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
        Object.defineProperty(CountQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
            value: 'CountQueuingStrategy',
            configurable: true
        });
    }
    // Helper functions for the CountQueuingStrategy.
    function countBrandCheckException(name) {
        return new TypeError(`CountQueuingStrategy.prototype.${name} can only be used on a CountQueuingStrategy`);
    }
    function IsCountQueuingStrategy(x) {
        if (!typeIsObject(x)) {
            return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x, '_countQueuingStrategyHighWaterMark')) {
            return false;
        }
        return x instanceof CountQueuingStrategy;
    }

    function convertTransformer(original, context) {
        assertDictionary(original, context);
        const flush = original === null || original === void 0 ? void 0 : original.flush;
        const readableType = original === null || original === void 0 ? void 0 : original.readableType;
        const start = original === null || original === void 0 ? void 0 : original.start;
        const transform = original === null || original === void 0 ? void 0 : original.transform;
        const writableType = original === null || original === void 0 ? void 0 : original.writableType;
        return {
            flush: flush === undefined ?
                undefined :
                convertTransformerFlushCallback(flush, original, `${context} has member 'flush' that`),
            readableType,
            start: start === undefined ?
                undefined :
                convertTransformerStartCallback(start, original, `${context} has member 'start' that`),
            transform: transform === undefined ?
                undefined :
                convertTransformerTransformCallback(transform, original, `${context} has member 'transform' that`),
            writableType
        };
    }
    function convertTransformerFlushCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => promiseCall(fn, original, [controller]);
    }
    function convertTransformerStartCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => reflectCall(fn, original, [controller]);
    }
    function convertTransformerTransformCallback(fn, original, context) {
        assertFunction(fn, context);
        return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
    }

    // Class TransformStream
    /**
     * A transform stream consists of a pair of streams: a {@link WritableStream | writable stream},
     * known as its writable side, and a {@link ReadableStream | readable stream}, known as its readable side.
     * In a manner specific to the transform stream in question, writes to the writable side result in new data being
     * made available for reading from the readable side.
     *
     * @public
     */
    class TransformStream {
        constructor(rawTransformer = {}, rawWritableStrategy = {}, rawReadableStrategy = {}) {
            if (rawTransformer === undefined) {
                rawTransformer = null;
            }
            const writableStrategy = convertQueuingStrategy(rawWritableStrategy, 'Second parameter');
            const readableStrategy = convertQueuingStrategy(rawReadableStrategy, 'Third parameter');
            const transformer = convertTransformer(rawTransformer, 'First parameter');
            if (transformer.readableType !== undefined) {
                throw new RangeError('Invalid readableType specified');
            }
            if (transformer.writableType !== undefined) {
                throw new RangeError('Invalid writableType specified');
            }
            const readableHighWaterMark = ExtractHighWaterMark(readableStrategy, 0);
            const readableSizeAlgorithm = ExtractSizeAlgorithm(readableStrategy);
            const writableHighWaterMark = ExtractHighWaterMark(writableStrategy, 1);
            const writableSizeAlgorithm = ExtractSizeAlgorithm(writableStrategy);
            let startPromise_resolve;
            const startPromise = newPromise(resolve => {
                startPromise_resolve = resolve;
            });
            InitializeTransformStream(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
            SetUpTransformStreamDefaultControllerFromTransformer(this, transformer);
            if (transformer.start !== undefined) {
                startPromise_resolve(transformer.start(this._transformStreamController));
            }
            else {
                startPromise_resolve(undefined);
            }
        }
        /**
         * The readable side of the transform stream.
         */
        get readable() {
            if (!IsTransformStream(this)) {
                throw streamBrandCheckException('readable');
            }
            return this._readable;
        }
        /**
         * The writable side of the transform stream.
         */
        get writable() {
            if (!IsTransformStream(this)) {
                throw streamBrandCheckException('writable');
            }
            return this._writable;
        }
    }
    Object.defineProperties(TransformStream.prototype, {
        readable: { enumerable: true },
        writable: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
        Object.defineProperty(TransformStream.prototype, SymbolPolyfill.toStringTag, {
            value: 'TransformStream',
            configurable: true
        });
    }
    function InitializeTransformStream(stream, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm) {
        function startAlgorithm() {
            return startPromise;
        }
        function writeAlgorithm(chunk) {
            return TransformStreamDefaultSinkWriteAlgorithm(stream, chunk);
        }
        function abortAlgorithm(reason) {
            return TransformStreamDefaultSinkAbortAlgorithm(stream, reason);
        }
        function closeAlgorithm() {
            return TransformStreamDefaultSinkCloseAlgorithm(stream);
        }
        stream._writable = CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, writableHighWaterMark, writableSizeAlgorithm);
        function pullAlgorithm() {
            return TransformStreamDefaultSourcePullAlgorithm(stream);
        }
        function cancelAlgorithm(reason) {
            TransformStreamErrorWritableAndUnblockWrite(stream, reason);
            return promiseResolvedWith(undefined);
        }
        stream._readable = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
        // The [[backpressure]] slot is set to undefined so that it can be initialised by TransformStreamSetBackpressure.
        stream._backpressure = undefined;
        stream._backpressureChangePromise = undefined;
        stream._backpressureChangePromise_resolve = undefined;
        TransformStreamSetBackpressure(stream, true);
        stream._transformStreamController = undefined;
    }
    function IsTransformStream(x) {
        if (!typeIsObject(x)) {
            return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x, '_transformStreamController')) {
            return false;
        }
        return x instanceof TransformStream;
    }
    // This is a no-op if both sides are already errored.
    function TransformStreamError(stream, e) {
        ReadableStreamDefaultControllerError(stream._readable._readableStreamController, e);
        TransformStreamErrorWritableAndUnblockWrite(stream, e);
    }
    function TransformStreamErrorWritableAndUnblockWrite(stream, e) {
        TransformStreamDefaultControllerClearAlgorithms(stream._transformStreamController);
        WritableStreamDefaultControllerErrorIfNeeded(stream._writable._writableStreamController, e);
        if (stream._backpressure) {
            // Pretend that pull() was called to permit any pending write() calls to complete. TransformStreamSetBackpressure()
            // cannot be called from enqueue() or pull() once the ReadableStream is errored, so this will will be the final time
            // _backpressure is set.
            TransformStreamSetBackpressure(stream, false);
        }
    }
    function TransformStreamSetBackpressure(stream, backpressure) {
        // Passes also when called during construction.
        if (stream._backpressureChangePromise !== undefined) {
            stream._backpressureChangePromise_resolve();
        }
        stream._backpressureChangePromise = newPromise(resolve => {
            stream._backpressureChangePromise_resolve = resolve;
        });
        stream._backpressure = backpressure;
    }
    // Class TransformStreamDefaultController
    /**
     * Allows control of the {@link ReadableStream} and {@link WritableStream} of the associated {@link TransformStream}.
     *
     * @public
     */
    class TransformStreamDefaultController {
        constructor() {
            throw new TypeError('Illegal constructor');
        }
        /**
         * Returns the desired size to fill the readable side’s internal queue. It can be negative, if the queue is over-full.
         */
        get desiredSize() {
            if (!IsTransformStreamDefaultController(this)) {
                throw defaultControllerBrandCheckException('desiredSize');
            }
            const readableController = this._controlledTransformStream._readable._readableStreamController;
            return ReadableStreamDefaultControllerGetDesiredSize(readableController);
        }
        enqueue(chunk = undefined) {
            if (!IsTransformStreamDefaultController(this)) {
                throw defaultControllerBrandCheckException('enqueue');
            }
            TransformStreamDefaultControllerEnqueue(this, chunk);
        }
        /**
         * Errors both the readable side and the writable side of the controlled transform stream, making all future
         * interactions with it fail with the given error `e`. Any chunks queued for transformation will be discarded.
         */
        error(reason = undefined) {
            if (!IsTransformStreamDefaultController(this)) {
                throw defaultControllerBrandCheckException('error');
            }
            TransformStreamDefaultControllerError(this, reason);
        }
        /**
         * Closes the readable side and errors the writable side of the controlled transform stream. This is useful when the
         * transformer only needs to consume a portion of the chunks written to the writable side.
         */
        terminate() {
            if (!IsTransformStreamDefaultController(this)) {
                throw defaultControllerBrandCheckException('terminate');
            }
            TransformStreamDefaultControllerTerminate(this);
        }
    }
    Object.defineProperties(TransformStreamDefaultController.prototype, {
        enqueue: { enumerable: true },
        error: { enumerable: true },
        terminate: { enumerable: true },
        desiredSize: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === 'symbol') {
        Object.defineProperty(TransformStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: 'TransformStreamDefaultController',
            configurable: true
        });
    }
    // Transform Stream Default Controller Abstract Operations
    function IsTransformStreamDefaultController(x) {
        if (!typeIsObject(x)) {
            return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x, '_controlledTransformStream')) {
            return false;
        }
        return x instanceof TransformStreamDefaultController;
    }
    function SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm) {
        controller._controlledTransformStream = stream;
        stream._transformStreamController = controller;
        controller._transformAlgorithm = transformAlgorithm;
        controller._flushAlgorithm = flushAlgorithm;
    }
    function SetUpTransformStreamDefaultControllerFromTransformer(stream, transformer) {
        const controller = Object.create(TransformStreamDefaultController.prototype);
        let transformAlgorithm = (chunk) => {
            try {
                TransformStreamDefaultControllerEnqueue(controller, chunk);
                return promiseResolvedWith(undefined);
            }
            catch (transformResultE) {
                return promiseRejectedWith(transformResultE);
            }
        };
        let flushAlgorithm = () => promiseResolvedWith(undefined);
        if (transformer.transform !== undefined) {
            transformAlgorithm = chunk => transformer.transform(chunk, controller);
        }
        if (transformer.flush !== undefined) {
            flushAlgorithm = () => transformer.flush(controller);
        }
        SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm);
    }
    function TransformStreamDefaultControllerClearAlgorithms(controller) {
        controller._transformAlgorithm = undefined;
        controller._flushAlgorithm = undefined;
    }
    function TransformStreamDefaultControllerEnqueue(controller, chunk) {
        const stream = controller._controlledTransformStream;
        const readableController = stream._readable._readableStreamController;
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController)) {
            throw new TypeError('Readable side is not in a state that permits enqueue');
        }
        // We throttle transform invocations based on the backpressure of the ReadableStream, but we still
        // accept TransformStreamDefaultControllerEnqueue() calls.
        try {
            ReadableStreamDefaultControllerEnqueue(readableController, chunk);
        }
        catch (e) {
            // This happens when readableStrategy.size() throws.
            TransformStreamErrorWritableAndUnblockWrite(stream, e);
            throw stream._readable._storedError;
        }
        const backpressure = ReadableStreamDefaultControllerHasBackpressure(readableController);
        if (backpressure !== stream._backpressure) {
            TransformStreamSetBackpressure(stream, true);
        }
    }
    function TransformStreamDefaultControllerError(controller, e) {
        TransformStreamError(controller._controlledTransformStream, e);
    }
    function TransformStreamDefaultControllerPerformTransform(controller, chunk) {
        const transformPromise = controller._transformAlgorithm(chunk);
        return transformPromiseWith(transformPromise, undefined, r => {
            TransformStreamError(controller._controlledTransformStream, r);
            throw r;
        });
    }
    function TransformStreamDefaultControllerTerminate(controller) {
        const stream = controller._controlledTransformStream;
        const readableController = stream._readable._readableStreamController;
        ReadableStreamDefaultControllerClose(readableController);
        const error = new TypeError('TransformStream terminated');
        TransformStreamErrorWritableAndUnblockWrite(stream, error);
    }
    // TransformStreamDefaultSink Algorithms
    function TransformStreamDefaultSinkWriteAlgorithm(stream, chunk) {
        const controller = stream._transformStreamController;
        if (stream._backpressure) {
            const backpressureChangePromise = stream._backpressureChangePromise;
            return transformPromiseWith(backpressureChangePromise, () => {
                const writable = stream._writable;
                const state = writable._state;
                if (state === 'erroring') {
                    throw writable._storedError;
                }
                return TransformStreamDefaultControllerPerformTransform(controller, chunk);
            });
        }
        return TransformStreamDefaultControllerPerformTransform(controller, chunk);
    }
    function TransformStreamDefaultSinkAbortAlgorithm(stream, reason) {
        // abort() is not called synchronously, so it is possible for abort() to be called when the stream is already
        // errored.
        TransformStreamError(stream, reason);
        return promiseResolvedWith(undefined);
    }
    function TransformStreamDefaultSinkCloseAlgorithm(stream) {
        // stream._readable cannot change after construction, so caching it across a call to user code is safe.
        const readable = stream._readable;
        const controller = stream._transformStreamController;
        const flushPromise = controller._flushAlgorithm();
        TransformStreamDefaultControllerClearAlgorithms(controller);
        // Return a promise that is fulfilled with undefined on success.
        return transformPromiseWith(flushPromise, () => {
            if (readable._state === 'errored') {
                throw readable._storedError;
            }
            ReadableStreamDefaultControllerClose(readable._readableStreamController);
        }, r => {
            TransformStreamError(stream, r);
            throw readable._storedError;
        });
    }
    // TransformStreamDefaultSource Algorithms
    function TransformStreamDefaultSourcePullAlgorithm(stream) {
        // Invariant. Enforced by the promises returned by start() and pull().
        TransformStreamSetBackpressure(stream, false);
        // Prevent the next pull() call until there is backpressure.
        return stream._backpressureChangePromise;
    }
    // Helper functions for the TransformStreamDefaultController.
    function defaultControllerBrandCheckException(name) {
        return new TypeError(`TransformStreamDefaultController.prototype.${name} can only be used on a TransformStreamDefaultController`);
    }
    // Helper functions for the TransformStream.
    function streamBrandCheckException(name) {
        return new TypeError(`TransformStream.prototype.${name} can only be used on a TransformStream`);
    }

    exports.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy;
    exports.CountQueuingStrategy = CountQueuingStrategy;
    exports.ReadableByteStreamController = ReadableByteStreamController;
    exports.ReadableStream = ReadableStream;
    exports.ReadableStreamBYOBReader = ReadableStreamBYOBReader;
    exports.ReadableStreamBYOBRequest = ReadableStreamBYOBRequest;
    exports.ReadableStreamDefaultController = ReadableStreamDefaultController;
    exports.ReadableStreamDefaultReader = ReadableStreamDefaultReader;
    exports.TransformStream = TransformStream;
    exports.TransformStreamDefaultController = TransformStreamDefaultController;
    exports.WritableStream = WritableStream;
    exports.WritableStreamDefaultController = WritableStreamDefaultController;
    exports.WritableStreamDefaultWriter = WritableStreamDefaultWriter;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ponyfill.es2018.js.map


/***/ }),

/***/ 5448:
/***/ ((__unused_webpack_module, __webpack_exports__, __nccwpck_require__) => {

"use strict";
// ESM COMPAT FLAG
__nccwpck_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@actions/core/lib/core.js
var core = __nccwpck_require__(2186);
// EXTERNAL MODULE: ./node_modules/rxjs/dist/cjs/index.js
var cjs = __nccwpck_require__(1752);
// EXTERNAL MODULE: ./node_modules/rxjs/dist/cjs/operators/index.js
var operators = __nccwpck_require__(749);
;// CONCATENATED MODULE: external "http"
const external_http_namespaceObject = require("http");
// EXTERNAL MODULE: external "https"
var external_https_ = __nccwpck_require__(7211);
;// CONCATENATED MODULE: external "zlib"
const external_zlib_namespaceObject = require("zlib");
;// CONCATENATED MODULE: external "stream"
const external_stream_namespaceObject = require("stream");
// EXTERNAL MODULE: ./node_modules/data-uri-to-buffer/dist/src/index.js
var src = __nccwpck_require__(2371);
;// CONCATENATED MODULE: external "util"
const external_util_namespaceObject = require("util");
// EXTERNAL MODULE: ./node_modules/fetch-blob/streams.cjs
var streams = __nccwpck_require__(8010);
;// CONCATENATED MODULE: ./node_modules/fetch-blob/index.js

// TODO (jimmywarting): in the feature use conditional loading with top level await (requires 14.x)
// Node has recently added whatwg stream into core



/** @typedef {import('buffer').Blob} NodeBlob} */

// 64 KiB (same size chrome slice theirs blob into Uint8array's)
const POOL_SIZE = 65536;

/** @param {(Blob | NodeBlob | Uint8Array)[]} parts */
async function * toIterator (parts, clone = true) {
	for (let part of parts) {
		if ('stream' in part) {
			yield * part.stream();
		} else if (ArrayBuffer.isView(part)) {
			if (clone) {
				let position = part.byteOffset;
				let end = part.byteOffset + part.byteLength;
				while (position !== end) {
					const size = Math.min(end - position, POOL_SIZE);
					const chunk = part.buffer.slice(position, position + size);
					position += chunk.byteLength;
					yield new Uint8Array(chunk);
				}
			} else {
				yield part;
			}
		} else {
			/* c8 ignore start */
			// For blobs that have arrayBuffer but no stream method (nodes buffer.Blob)
			let position = 0;
			while (position !== part.size) {
				const chunk = part.slice(position, Math.min(part.size, position + POOL_SIZE));
				const buffer = await chunk.arrayBuffer();
				position += buffer.byteLength;
				yield new Uint8Array(buffer);
			}
			/* c8 ignore end */
		}
	}
}

const _Blob = class Blob {

	/** @type {Array.<(Blob|Uint8Array)>} */
	#parts = [];
	#type = '';
	#size = 0;

	/**
	 * The Blob() constructor returns a new Blob object. The content
	 * of the blob consists of the concatenation of the values given
	 * in the parameter array.
	 *
	 * @param {*} blobParts
	 * @param {{ type?: string }} [options]
	 */
	constructor(blobParts = [], options = {}) {
		let size = 0;

		const parts = blobParts.map(element => {
			let part;
			if (ArrayBuffer.isView(element)) {
				part = new Uint8Array(element.buffer.slice(element.byteOffset, element.byteOffset + element.byteLength));
			} else if (element instanceof ArrayBuffer) {
				part = new Uint8Array(element.slice(0));
			} else if (element instanceof Blob) {
				part = element;
			} else {
				part = new TextEncoder().encode(element);
			}

			size += ArrayBuffer.isView(part) ? part.byteLength : part.size;
			return part;
		});

		const type = options.type === undefined ? '' : String(options.type);

		this.#type = /[^\u0020-\u007E]/.test(type) ? '' : type;
		this.#size = size;
		this.#parts = parts;
	}

	/**
	 * The Blob interface's size property returns the
	 * size of the Blob in bytes.
	 */
	get size() {
		return this.#size;
	}

	/**
	 * The type property of a Blob object returns the MIME type of the file.
	 */
	get type() {
		return this.#type;
	}

	/**
	 * The text() method in the Blob interface returns a Promise
	 * that resolves with a string containing the contents of
	 * the blob, interpreted as UTF-8.
	 *
	 * @return {Promise<string>}
	 */
	async text() {
		// More optimized than using this.arrayBuffer()
		// that requires twice as much ram
		const decoder = new TextDecoder();
		let str = '';
		for await (let part of toIterator(this.#parts, false)) {
			str += decoder.decode(part, { stream: true });
		}
		// Remaining
		str += decoder.decode();
		return str;
	}

	/**
	 * The arrayBuffer() method in the Blob interface returns a
	 * Promise that resolves with the contents of the blob as
	 * binary data contained in an ArrayBuffer.
	 *
	 * @return {Promise<ArrayBuffer>}
	 */
	async arrayBuffer() {
		// Easier way... Just a unnecessary overhead
		// const view = new Uint8Array(this.size);
		// await this.stream().getReader({mode: 'byob'}).read(view);
		// return view.buffer;

		const data = new Uint8Array(this.size);
		let offset = 0;
		for await (const chunk of toIterator(this.#parts, false)) {
			data.set(chunk, offset);
			offset += chunk.length;
		}

		return data.buffer;
	}

	stream() {
		const it = toIterator(this.#parts, true);

		return new ReadableStream({
			type: 'bytes',
			async pull(ctrl) {
				const chunk = await it.next();
				chunk.done ? ctrl.close() : ctrl.enqueue(chunk.value);
			}
		})
	}

	/**
	 * The Blob interface's slice() method creates and returns a
	 * new Blob object which contains data from a subset of the
	 * blob on which it's called.
	 *
	 * @param {number} [start]
	 * @param {number} [end]
	 * @param {string} [type]
	 */
	slice(start = 0, end = this.size, type = '') {
		const {size} = this;

		let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
		let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);

		const span = Math.max(relativeEnd - relativeStart, 0);
		const parts = this.#parts;
		const blobParts = [];
		let added = 0;

		for (const part of parts) {
			// don't add the overflow to new blobParts
			if (added >= span) {
				break;
			}

			const size = ArrayBuffer.isView(part) ? part.byteLength : part.size;
			if (relativeStart && size <= relativeStart) {
				// Skip the beginning and change the relative
				// start & end position as we skip the unwanted parts
				relativeStart -= size;
				relativeEnd -= size;
			} else {
				let chunk
				if (ArrayBuffer.isView(part)) {
					chunk = part.subarray(relativeStart, Math.min(size, relativeEnd));
					added += chunk.byteLength
				} else {
					chunk = part.slice(relativeStart, Math.min(size, relativeEnd));
					added += chunk.size
				}
				blobParts.push(chunk);
				relativeStart = 0; // All next sequential parts should start at 0
			}
		}

		const blob = new Blob([], {type: String(type).toLowerCase()});
		blob.#size = span;
		blob.#parts = blobParts;

		return blob;
	}

	get [Symbol.toStringTag]() {
		return 'Blob';
	}

	static [Symbol.hasInstance](object) {
		return (
			object &&
			typeof object === 'object' &&
			typeof object.constructor === 'function' &&
			(
				typeof object.stream === 'function' ||
				typeof object.arrayBuffer === 'function'
			) &&
			/^(Blob|File)$/.test(object[Symbol.toStringTag])
		);
	}
}

Object.defineProperties(_Blob.prototype, {
	size: {enumerable: true},
	type: {enumerable: true},
	slice: {enumerable: true}
});

/** @type {typeof globalThis.Blob} */
const Blob = _Blob;
/* harmony default export */ const fetch_blob = (Blob);

;// CONCATENATED MODULE: ./node_modules/node-fetch/src/errors/base.js
class FetchBaseError extends Error {
	constructor(message, type) {
		super(message);
		// Hide custom error implementation details from end-users
		Error.captureStackTrace(this, this.constructor);

		this.type = type;
	}

	get name() {
		return this.constructor.name;
	}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}
}

;// CONCATENATED MODULE: ./node_modules/node-fetch/src/errors/fetch-error.js



/**
 * @typedef {{ address?: string, code: string, dest?: string, errno: number, info?: object, message: string, path?: string, port?: number, syscall: string}} SystemError
*/

/**
 * FetchError interface for operational errors
 */
class FetchError extends FetchBaseError {
	/**
	 * @param  {string} message -      Error message for human
	 * @param  {string} [type] -        Error type for machine
	 * @param  {SystemError} [systemError] - For Node.js system error
	 */
	constructor(message, type, systemError) {
		super(message, type);
		// When err.type is `system`, err.erroredSysCall contains system error and err.code contains system error code
		if (systemError) {
			// eslint-disable-next-line no-multi-assign
			this.code = this.errno = systemError.code;
			this.erroredSysCall = systemError.syscall;
		}
	}
}

;// CONCATENATED MODULE: external "crypto"
const external_crypto_namespaceObject = require("crypto");
;// CONCATENATED MODULE: ./node_modules/node-fetch/src/utils/is.js
/**
 * Is.js
 *
 * Object type checks.
 */

const NAME = Symbol.toStringTag;

/**
 * Check if `obj` is a URLSearchParams object
 * ref: https://github.com/node-fetch/node-fetch/issues/296#issuecomment-307598143
 *
 * @param  {*} obj
 * @return {boolean}
 */
const isURLSearchParameters = object => {
	return (
		typeof object === 'object' &&
		typeof object.append === 'function' &&
		typeof object.delete === 'function' &&
		typeof object.get === 'function' &&
		typeof object.getAll === 'function' &&
		typeof object.has === 'function' &&
		typeof object.set === 'function' &&
		typeof object.sort === 'function' &&
		object[NAME] === 'URLSearchParams'
	);
};

/**
 * Check if `object` is a W3C `Blob` object (which `File` inherits from)
 *
 * @param  {*} obj
 * @return {boolean}
 */
const isBlob = object => {
	return (
		typeof object === 'object' &&
		typeof object.arrayBuffer === 'function' &&
		typeof object.type === 'string' &&
		typeof object.stream === 'function' &&
		typeof object.constructor === 'function' &&
		/^(Blob|File)$/.test(object[NAME])
	);
};

/**
 * Check if `obj` is a spec-compliant `FormData` object
 *
 * @param {*} object
 * @return {boolean}
 */
function isFormData(object) {
	return (
		typeof object === 'object' &&
		typeof object.append === 'function' &&
		typeof object.set === 'function' &&
		typeof object.get === 'function' &&
		typeof object.getAll === 'function' &&
		typeof object.delete === 'function' &&
		typeof object.keys === 'function' &&
		typeof object.values === 'function' &&
		typeof object.entries === 'function' &&
		typeof object.constructor === 'function' &&
		object[NAME] === 'FormData'
	);
}

/**
 * Check if `obj` is an instance of AbortSignal.
 *
 * @param  {*} obj
 * @return {boolean}
 */
const isAbortSignal = object => {
	return (
		typeof object === 'object' && (
			object[NAME] === 'AbortSignal' ||
			object[NAME] === 'EventTarget'
		)
	);
};


;// CONCATENATED MODULE: ./node_modules/node-fetch/src/utils/form-data.js




const carriage = '\r\n';
const dashes = '-'.repeat(2);
const carriageLength = Buffer.byteLength(carriage);

/**
 * @param {string} boundary
 */
const getFooter = boundary => `${dashes}${boundary}${dashes}${carriage.repeat(2)}`;

/**
 * @param {string} boundary
 * @param {string} name
 * @param {*} field
 *
 * @return {string}
 */
function getHeader(boundary, name, field) {
	let header = '';

	header += `${dashes}${boundary}${carriage}`;
	header += `Content-Disposition: form-data; name="${name}"`;

	if (isBlob(field)) {
		header += `; filename="${field.name}"${carriage}`;
		header += `Content-Type: ${field.type || 'application/octet-stream'}`;
	}

	return `${header}${carriage.repeat(2)}`;
}

/**
 * @return {string}
 */
const getBoundary = () => (0,external_crypto_namespaceObject.randomBytes)(8).toString('hex');

/**
 * @param {FormData} form
 * @param {string} boundary
 */
async function * formDataIterator(form, boundary) {
	for (const [name, value] of form) {
		yield getHeader(boundary, name, value);

		if (isBlob(value)) {
			yield * value.stream();
		} else {
			yield value;
		}

		yield carriage;
	}

	yield getFooter(boundary);
}

/**
 * @param {FormData} form
 * @param {string} boundary
 */
function getFormDataLength(form, boundary) {
	let length = 0;

	for (const [name, value] of form) {
		length += Buffer.byteLength(getHeader(boundary, name, value));

		length += isBlob(value) ? value.size : Buffer.byteLength(String(value));

		length += carriageLength;
	}

	length += Buffer.byteLength(getFooter(boundary));

	return length;
}

;// CONCATENATED MODULE: ./node_modules/node-fetch/src/body.js

/**
 * Body.js
 *
 * Body interface provides common methods for Request and Response
 */











const INTERNALS = Symbol('Body internals');

/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Body {
	constructor(body, {
		size = 0
	} = {}) {
		let boundary = null;

		if (body === null) {
			// Body is undefined or null
			body = null;
		} else if (isURLSearchParameters(body)) {
		// Body is a URLSearchParams
			body = Buffer.from(body.toString());
		} else if (isBlob(body)) {
			// Body is blob
		} else if (Buffer.isBuffer(body)) {
			// Body is Buffer
		} else if (external_util_namespaceObject.types.isAnyArrayBuffer(body)) {
			// Body is ArrayBuffer
			body = Buffer.from(body);
		} else if (ArrayBuffer.isView(body)) {
			// Body is ArrayBufferView
			body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
		} else if (body instanceof external_stream_namespaceObject) {
			// Body is stream
		} else if (isFormData(body)) {
			// Body is an instance of formdata-node
			boundary = `NodeFetchFormDataBoundary${getBoundary()}`;
			body = external_stream_namespaceObject.Readable.from(formDataIterator(body, boundary));
		} else {
			// None of the above
			// coerce to string then buffer
			body = Buffer.from(String(body));
		}

		this[INTERNALS] = {
			body,
			boundary,
			disturbed: false,
			error: null
		};
		this.size = size;

		if (body instanceof external_stream_namespaceObject) {
			body.on('error', error_ => {
				const error = error_ instanceof FetchBaseError ?
					error_ :
					new FetchError(`Invalid response body while trying to fetch ${this.url}: ${error_.message}`, 'system', error_);
				this[INTERNALS].error = error;
			});
		}
	}

	get body() {
		return this[INTERNALS].body;
	}

	get bodyUsed() {
		return this[INTERNALS].disturbed;
	}

	/**
	 * Decode response as ArrayBuffer
	 *
	 * @return  Promise
	 */
	async arrayBuffer() {
		const {buffer, byteOffset, byteLength} = await consumeBody(this);
		return buffer.slice(byteOffset, byteOffset + byteLength);
	}

	/**
	 * Return raw response as Blob
	 *
	 * @return Promise
	 */
	async blob() {
		const ct = (this.headers && this.headers.get('content-type')) || (this[INTERNALS].body && this[INTERNALS].body.type) || '';
		const buf = await this.buffer();

		return new fetch_blob([buf], {
			type: ct
		});
	}

	/**
	 * Decode response as json
	 *
	 * @return  Promise
	 */
	async json() {
		const buffer = await consumeBody(this);
		return JSON.parse(buffer.toString());
	}

	/**
	 * Decode response as text
	 *
	 * @return  Promise
	 */
	async text() {
		const buffer = await consumeBody(this);
		return buffer.toString();
	}

	/**
	 * Decode response as buffer (non-spec api)
	 *
	 * @return  Promise
	 */
	buffer() {
		return consumeBody(this);
	}
}

// In browsers, all properties are enumerable.
Object.defineProperties(Body.prototype, {
	body: {enumerable: true},
	bodyUsed: {enumerable: true},
	arrayBuffer: {enumerable: true},
	blob: {enumerable: true},
	json: {enumerable: true},
	text: {enumerable: true}
});

/**
 * Consume and convert an entire Body to a Buffer.
 *
 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
 *
 * @return Promise
 */
async function consumeBody(data) {
	if (data[INTERNALS].disturbed) {
		throw new TypeError(`body used already for: ${data.url}`);
	}

	data[INTERNALS].disturbed = true;

	if (data[INTERNALS].error) {
		throw data[INTERNALS].error;
	}

	let {body} = data;

	// Body is null
	if (body === null) {
		return Buffer.alloc(0);
	}

	// Body is blob
	if (isBlob(body)) {
		body = external_stream_namespaceObject.Readable.from(body.stream());
	}

	// Body is buffer
	if (Buffer.isBuffer(body)) {
		return body;
	}

	/* c8 ignore next 3 */
	if (!(body instanceof external_stream_namespaceObject)) {
		return Buffer.alloc(0);
	}

	// Body is stream
	// get ready to actually consume the body
	const accum = [];
	let accumBytes = 0;

	try {
		for await (const chunk of body) {
			if (data.size > 0 && accumBytes + chunk.length > data.size) {
				const error = new FetchError(`content size at ${data.url} over limit: ${data.size}`, 'max-size');
				body.destroy(error);
				throw error;
			}

			accumBytes += chunk.length;
			accum.push(chunk);
		}
	} catch (error) {
		const error_ = error instanceof FetchBaseError ? error : new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error.message}`, 'system', error);
		throw error_;
	}

	if (body.readableEnded === true || body._readableState.ended === true) {
		try {
			if (accum.every(c => typeof c === 'string')) {
				return Buffer.from(accum.join(''));
			}

			return Buffer.concat(accum, accumBytes);
		} catch (error) {
			throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error.message}`, 'system', error);
		}
	} else {
		throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
	}
}

/**
 * Clone body given Res/Req instance
 *
 * @param   Mixed   instance       Response or Request instance
 * @param   String  highWaterMark  highWaterMark for both PassThrough body streams
 * @return  Mixed
 */
const clone = (instance, highWaterMark) => {
	let p1;
	let p2;
	let {body} = instance;

	// Don't allow cloning a used body
	if (instance.bodyUsed) {
		throw new Error('cannot clone body after it is used');
	}

	// Check that body is a stream and not form-data object
	// note: we can't clone the form-data object without having it as a dependency
	if ((body instanceof external_stream_namespaceObject) && (typeof body.getBoundary !== 'function')) {
		// Tee instance body
		p1 = new external_stream_namespaceObject.PassThrough({highWaterMark});
		p2 = new external_stream_namespaceObject.PassThrough({highWaterMark});
		body.pipe(p1);
		body.pipe(p2);
		// Set instance body to teed body and return the other teed body
		instance[INTERNALS].body = p1;
		body = p2;
	}

	return body;
};

/**
 * Performs the operation "extract a `Content-Type` value from |object|" as
 * specified in the specification:
 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
 *
 * This function assumes that instance.body is present.
 *
 * @param {any} body Any options.body input
 * @returns {string | null}
 */
const extractContentType = (body, request) => {
	// Body is null or undefined
	if (body === null) {
		return null;
	}

	// Body is string
	if (typeof body === 'string') {
		return 'text/plain;charset=UTF-8';
	}

	// Body is a URLSearchParams
	if (isURLSearchParameters(body)) {
		return 'application/x-www-form-urlencoded;charset=UTF-8';
	}

	// Body is blob
	if (isBlob(body)) {
		return body.type || null;
	}

	// Body is a Buffer (Buffer, ArrayBuffer or ArrayBufferView)
	if (Buffer.isBuffer(body) || external_util_namespaceObject.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
		return null;
	}

	// Detect form data input from form-data module
	if (body && typeof body.getBoundary === 'function') {
		return `multipart/form-data;boundary=${body.getBoundary()}`;
	}

	if (isFormData(body)) {
		return `multipart/form-data; boundary=${request[INTERNALS].boundary}`;
	}

	// Body is stream - can't really do much about this
	if (body instanceof external_stream_namespaceObject) {
		return null;
	}

	// Body constructor defaults other things to string
	return 'text/plain;charset=UTF-8';
};

/**
 * The Fetch Standard treats this as if "total bytes" is a property on the body.
 * For us, we have to explicitly get it with a function.
 *
 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
 *
 * @param {any} obj.body Body object from the Body instance.
 * @returns {number | null}
 */
const getTotalBytes = request => {
	const {body} = request;

	// Body is null or undefined
	if (body === null) {
		return 0;
	}

	// Body is Blob
	if (isBlob(body)) {
		return body.size;
	}

	// Body is Buffer
	if (Buffer.isBuffer(body)) {
		return body.length;
	}

	// Detect form data input from form-data module
	if (body && typeof body.getLengthSync === 'function') {
		return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
	}

	// Body is a spec-compliant form-data
	if (isFormData(body)) {
		return getFormDataLength(request[INTERNALS].boundary);
	}

	// Body is stream
	return null;
};

/**
 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
 *
 * @param {Stream.Writable} dest The stream to write to.
 * @param obj.body Body object from the Body instance.
 * @returns {void}
 */
const writeToStream = (dest, {body}) => {
	if (body === null) {
		// Body is null
		dest.end();
	} else if (isBlob(body)) {
		// Body is Blob
		external_stream_namespaceObject.Readable.from(body.stream()).pipe(dest);
	} else if (Buffer.isBuffer(body)) {
		// Body is buffer
		dest.write(body);
		dest.end();
	} else {
		// Body is stream
		body.pipe(dest);
	}
};

;// CONCATENATED MODULE: ./node_modules/node-fetch/src/headers.js
/**
 * Headers.js
 *
 * Headers class offers convenient helpers
 */




const validateHeaderName = typeof external_http_namespaceObject.validateHeaderName === 'function' ?
	external_http_namespaceObject.validateHeaderName :
	name => {
		if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
			const error = new TypeError(`Header name must be a valid HTTP token [${name}]`);
			Object.defineProperty(error, 'code', {value: 'ERR_INVALID_HTTP_TOKEN'});
			throw error;
		}
	};

const validateHeaderValue = typeof external_http_namespaceObject.validateHeaderValue === 'function' ?
	external_http_namespaceObject.validateHeaderValue :
	(name, value) => {
		if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
			const error = new TypeError(`Invalid character in header content ["${name}"]`);
			Object.defineProperty(error, 'code', {value: 'ERR_INVALID_CHAR'});
			throw error;
		}
	};

/**
 * @typedef {Headers | Record<string, string> | Iterable<readonly [string, string]> | Iterable<Iterable<string>>} HeadersInit
 */

/**
 * This Fetch API interface allows you to perform various actions on HTTP request and response headers.
 * These actions include retrieving, setting, adding to, and removing.
 * A Headers object has an associated header list, which is initially empty and consists of zero or more name and value pairs.
 * You can add to this using methods like append() (see Examples.)
 * In all methods of this interface, header names are matched by case-insensitive byte sequence.
 *
 */
class Headers extends URLSearchParams {
	/**
	 * Headers class
	 *
	 * @constructor
	 * @param {HeadersInit} [init] - Response headers
	 */
	constructor(init) {
		// Validate and normalize init object in [name, value(s)][]
		/** @type {string[][]} */
		let result = [];
		if (init instanceof Headers) {
			const raw = init.raw();
			for (const [name, values] of Object.entries(raw)) {
				result.push(...values.map(value => [name, value]));
			}
		} else if (init == null) { // eslint-disable-line no-eq-null, eqeqeq
			// No op
		} else if (typeof init === 'object' && !external_util_namespaceObject.types.isBoxedPrimitive(init)) {
			const method = init[Symbol.iterator];
			// eslint-disable-next-line no-eq-null, eqeqeq
			if (method == null) {
				// Record<ByteString, ByteString>
				result.push(...Object.entries(init));
			} else {
				if (typeof method !== 'function') {
					throw new TypeError('Header pairs must be iterable');
				}

				// Sequence<sequence<ByteString>>
				// Note: per spec we have to first exhaust the lists then process them
				result = [...init]
					.map(pair => {
						if (
							typeof pair !== 'object' || external_util_namespaceObject.types.isBoxedPrimitive(pair)
						) {
							throw new TypeError('Each header pair must be an iterable object');
						}

						return [...pair];
					}).map(pair => {
						if (pair.length !== 2) {
							throw new TypeError('Each header pair must be a name/value tuple');
						}

						return [...pair];
					});
			}
		} else {
			throw new TypeError('Failed to construct \'Headers\': The provided value is not of type \'(sequence<sequence<ByteString>> or record<ByteString, ByteString>)');
		}

		// Validate and lowercase
		result =
			result.length > 0 ?
				result.map(([name, value]) => {
					validateHeaderName(name);
					validateHeaderValue(name, String(value));
					return [String(name).toLowerCase(), String(value)];
				}) :
				undefined;

		super(result);

		// Returning a Proxy that will lowercase key names, validate parameters and sort keys
		// eslint-disable-next-line no-constructor-return
		return new Proxy(this, {
			get(target, p, receiver) {
				switch (p) {
					case 'append':
					case 'set':
						return (name, value) => {
							validateHeaderName(name);
							validateHeaderValue(name, String(value));
							return URLSearchParams.prototype[p].call(
								target,
								String(name).toLowerCase(),
								String(value)
							);
						};

					case 'delete':
					case 'has':
					case 'getAll':
						return name => {
							validateHeaderName(name);
							return URLSearchParams.prototype[p].call(
								target,
								String(name).toLowerCase()
							);
						};

					case 'keys':
						return () => {
							target.sort();
							return new Set(URLSearchParams.prototype.keys.call(target)).keys();
						};

					default:
						return Reflect.get(target, p, receiver);
				}
			}
			/* c8 ignore next */
		});
	}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	toString() {
		return Object.prototype.toString.call(this);
	}

	get(name) {
		const values = this.getAll(name);
		if (values.length === 0) {
			return null;
		}

		let value = values.join(', ');
		if (/^content-encoding$/i.test(name)) {
			value = value.toLowerCase();
		}

		return value;
	}

	forEach(callback, thisArg = undefined) {
		for (const name of this.keys()) {
			Reflect.apply(callback, thisArg, [this.get(name), name, this]);
		}
	}

	* values() {
		for (const name of this.keys()) {
			yield this.get(name);
		}
	}

	/**
	 * @type {() => IterableIterator<[string, string]>}
	 */
	* entries() {
		for (const name of this.keys()) {
			yield [name, this.get(name)];
		}
	}

	[Symbol.iterator]() {
		return this.entries();
	}

	/**
	 * Node-fetch non-spec method
	 * returning all headers and their values as array
	 * @returns {Record<string, string[]>}
	 */
	raw() {
		return [...this.keys()].reduce((result, key) => {
			result[key] = this.getAll(key);
			return result;
		}, {});
	}

	/**
	 * For better console.log(headers) and also to convert Headers into Node.js Request compatible format
	 */
	[Symbol.for('nodejs.util.inspect.custom')]() {
		return [...this.keys()].reduce((result, key) => {
			const values = this.getAll(key);
			// Http.request() only supports string as Host header.
			// This hack makes specifying custom Host header possible.
			if (key === 'host') {
				result[key] = values[0];
			} else {
				result[key] = values.length > 1 ? values : values[0];
			}

			return result;
		}, {});
	}
}

/**
 * Re-shaping object for Web IDL tests
 * Only need to do it for overridden methods
 */
Object.defineProperties(
	Headers.prototype,
	['get', 'entries', 'forEach', 'values'].reduce((result, property) => {
		result[property] = {enumerable: true};
		return result;
	}, {})
);

/**
 * Create a Headers object from an http.IncomingMessage.rawHeaders, ignoring those that do
 * not conform to HTTP grammar productions.
 * @param {import('http').IncomingMessage['rawHeaders']} headers
 */
function fromRawHeaders(headers = []) {
	return new Headers(
		headers
			// Split into pairs
			.reduce((result, value, index, array) => {
				if (index % 2 === 0) {
					result.push(array.slice(index, index + 2));
				}

				return result;
			}, [])
			.filter(([name, value]) => {
				try {
					validateHeaderName(name);
					validateHeaderValue(name, String(value));
					return true;
				} catch {
					return false;
				}
			})

	);
}

;// CONCATENATED MODULE: ./node_modules/node-fetch/src/utils/is-redirect.js
const redirectStatus = new Set([301, 302, 303, 307, 308]);

/**
 * Redirect code matching
 *
 * @param {number} code - Status code
 * @return {boolean}
 */
const isRedirect = code => {
	return redirectStatus.has(code);
};

;// CONCATENATED MODULE: ./node_modules/node-fetch/src/response.js
/**
 * Response.js
 *
 * Response class provides content decoding
 */





const response_INTERNALS = Symbol('Response internals');

/**
 * Response class
 *
 * Ref: https://fetch.spec.whatwg.org/#response-class
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Response extends Body {
	constructor(body = null, options = {}) {
		super(body, options);

		// eslint-disable-next-line no-eq-null, eqeqeq, no-negated-condition
		const status = options.status != null ? options.status : 200;

		const headers = new Headers(options.headers);

		if (body !== null && !headers.has('Content-Type')) {
			const contentType = extractContentType(body);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		this[response_INTERNALS] = {
			type: 'default',
			url: options.url,
			status,
			statusText: options.statusText || '',
			headers,
			counter: options.counter,
			highWaterMark: options.highWaterMark
		};
	}

	get type() {
		return this[response_INTERNALS].type;
	}

	get url() {
		return this[response_INTERNALS].url || '';
	}

	get status() {
		return this[response_INTERNALS].status;
	}

	/**
	 * Convenience property representing if the request ended normally
	 */
	get ok() {
		return this[response_INTERNALS].status >= 200 && this[response_INTERNALS].status < 300;
	}

	get redirected() {
		return this[response_INTERNALS].counter > 0;
	}

	get statusText() {
		return this[response_INTERNALS].statusText;
	}

	get headers() {
		return this[response_INTERNALS].headers;
	}

	get highWaterMark() {
		return this[response_INTERNALS].highWaterMark;
	}

	/**
	 * Clone this response
	 *
	 * @return  Response
	 */
	clone() {
		return new Response(clone(this, this.highWaterMark), {
			type: this.type,
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			ok: this.ok,
			redirected: this.redirected,
			size: this.size
		});
	}

	/**
	 * @param {string} url    The URL that the new response is to originate from.
	 * @param {number} status An optional status code for the response (e.g., 302.)
	 * @returns {Response}    A Response object.
	 */
	static redirect(url, status = 302) {
		if (!isRedirect(status)) {
			throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
		}

		return new Response(null, {
			headers: {
				location: new URL(url).toString()
			},
			status
		});
	}

	static error() {
		const response = new Response(null, {status: 0, statusText: ''});
		response[response_INTERNALS].type = 'error';
		return response;
	}

	get [Symbol.toStringTag]() {
		return 'Response';
	}
}

Object.defineProperties(Response.prototype, {
	type: {enumerable: true},
	url: {enumerable: true},
	status: {enumerable: true},
	ok: {enumerable: true},
	redirected: {enumerable: true},
	statusText: {enumerable: true},
	headers: {enumerable: true},
	clone: {enumerable: true}
});

;// CONCATENATED MODULE: external "url"
const external_url_namespaceObject = require("url");
;// CONCATENATED MODULE: ./node_modules/node-fetch/src/utils/get-search.js
const getSearch = parsedURL => {
	if (parsedURL.search) {
		return parsedURL.search;
	}

	const lastOffset = parsedURL.href.length - 1;
	const hash = parsedURL.hash || (parsedURL.href[lastOffset] === '#' ? '#' : '');
	return parsedURL.href[lastOffset - hash.length] === '?' ? '?' : '';
};

;// CONCATENATED MODULE: ./node_modules/node-fetch/src/request.js

/**
 * Request.js
 *
 * Request class contains server only options
 *
 * All spec algorithm step numbers are based on https://fetch.spec.whatwg.org/commit-snapshots/ae716822cb3a61843226cd090eefc6589446c1d2/.
 */







const request_INTERNALS = Symbol('Request internals');

/**
 * Check if `obj` is an instance of Request.
 *
 * @param  {*} obj
 * @return {boolean}
 */
const isRequest = object => {
	return (
		typeof object === 'object' &&
		typeof object[request_INTERNALS] === 'object'
	);
};

/**
 * Request class
 *
 * Ref: https://fetch.spec.whatwg.org/#request-class
 *
 * @param   Mixed   input  Url or Request instance
 * @param   Object  init   Custom options
 * @return  Void
 */
class Request extends Body {
	constructor(input, init = {}) {
		let parsedURL;

		// Normalize input and force URL to be encoded as UTF-8 (https://github.com/node-fetch/node-fetch/issues/245)
		if (isRequest(input)) {
			parsedURL = new URL(input.url);
		} else {
			parsedURL = new URL(input);
			input = {};
		}

		let method = init.method || input.method || 'GET';
		method = method.toUpperCase();

		// eslint-disable-next-line no-eq-null, eqeqeq
		if (((init.body != null || isRequest(input)) && input.body !== null) &&
			(method === 'GET' || method === 'HEAD')) {
			throw new TypeError('Request with GET/HEAD method cannot have body');
		}

		const inputBody = init.body ?
			init.body :
			(isRequest(input) && input.body !== null ?
				clone(input) :
				null);

		super(inputBody, {
			size: init.size || input.size || 0
		});

		const headers = new Headers(init.headers || input.headers || {});

		if (inputBody !== null && !headers.has('Content-Type')) {
			const contentType = extractContentType(inputBody, this);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		let signal = isRequest(input) ?
			input.signal :
			null;
		if ('signal' in init) {
			signal = init.signal;
		}

		// eslint-disable-next-line no-eq-null, eqeqeq
		if (signal != null && !isAbortSignal(signal)) {
			throw new TypeError('Expected signal to be an instanceof AbortSignal or EventTarget');
		}

		this[request_INTERNALS] = {
			method,
			redirect: init.redirect || input.redirect || 'follow',
			headers,
			parsedURL,
			signal
		};

		// Node-fetch-only options
		this.follow = init.follow === undefined ? (input.follow === undefined ? 20 : input.follow) : init.follow;
		this.compress = init.compress === undefined ? (input.compress === undefined ? true : input.compress) : init.compress;
		this.counter = init.counter || input.counter || 0;
		this.agent = init.agent || input.agent;
		this.highWaterMark = init.highWaterMark || input.highWaterMark || 16384;
		this.insecureHTTPParser = init.insecureHTTPParser || input.insecureHTTPParser || false;
	}

	get method() {
		return this[request_INTERNALS].method;
	}

	get url() {
		return (0,external_url_namespaceObject.format)(this[request_INTERNALS].parsedURL);
	}

	get headers() {
		return this[request_INTERNALS].headers;
	}

	get redirect() {
		return this[request_INTERNALS].redirect;
	}

	get signal() {
		return this[request_INTERNALS].signal;
	}

	/**
	 * Clone this request
	 *
	 * @return  Request
	 */
	clone() {
		return new Request(this);
	}

	get [Symbol.toStringTag]() {
		return 'Request';
	}
}

Object.defineProperties(Request.prototype, {
	method: {enumerable: true},
	url: {enumerable: true},
	headers: {enumerable: true},
	redirect: {enumerable: true},
	clone: {enumerable: true},
	signal: {enumerable: true}
});

/**
 * Convert a Request to Node.js http request options.
 *
 * @param   Request  A Request instance
 * @return  Object   The options object to be passed to http.request
 */
const getNodeRequestOptions = request => {
	const {parsedURL} = request[request_INTERNALS];
	const headers = new Headers(request[request_INTERNALS].headers);

	// Fetch step 1.3
	if (!headers.has('Accept')) {
		headers.set('Accept', '*/*');
	}

	// HTTP-network-or-cache fetch steps 2.4-2.7
	let contentLengthValue = null;
	if (request.body === null && /^(post|put)$/i.test(request.method)) {
		contentLengthValue = '0';
	}

	if (request.body !== null) {
		const totalBytes = getTotalBytes(request);
		// Set Content-Length if totalBytes is a number (that is not NaN)
		if (typeof totalBytes === 'number' && !Number.isNaN(totalBytes)) {
			contentLengthValue = String(totalBytes);
		}
	}

	if (contentLengthValue) {
		headers.set('Content-Length', contentLengthValue);
	}

	// HTTP-network-or-cache fetch step 2.11
	if (!headers.has('User-Agent')) {
		headers.set('User-Agent', 'node-fetch');
	}

	// HTTP-network-or-cache fetch step 2.15
	if (request.compress && !headers.has('Accept-Encoding')) {
		headers.set('Accept-Encoding', 'gzip,deflate,br');
	}

	let {agent} = request;
	if (typeof agent === 'function') {
		agent = agent(parsedURL);
	}

	if (!headers.has('Connection') && !agent) {
		headers.set('Connection', 'close');
	}

	// HTTP-network fetch step 4.2
	// chunked encoding is handled by Node.js

	const search = getSearch(parsedURL);

	// Manually spread the URL object instead of spread syntax
	const requestOptions = {
		path: parsedURL.pathname + search,
		pathname: parsedURL.pathname,
		hostname: parsedURL.hostname,
		protocol: parsedURL.protocol,
		port: parsedURL.port,
		hash: parsedURL.hash,
		search: parsedURL.search,
		query: parsedURL.query,
		href: parsedURL.href,
		method: request.method,
		headers: headers[Symbol.for('nodejs.util.inspect.custom')](),
		insecureHTTPParser: request.insecureHTTPParser,
		agent
	};

	return requestOptions;
};

;// CONCATENATED MODULE: ./node_modules/node-fetch/src/errors/abort-error.js


/**
 * AbortError interface for cancelled requests
 */
class AbortError extends FetchBaseError {
	constructor(message, type = 'aborted') {
		super(message, type);
	}
}

;// CONCATENATED MODULE: ./node_modules/node-fetch/src/index.js
/**
 * Index.js
 *
 * a request API compatible with window.fetch
 *
 * All spec algorithm step numbers are based on https://fetch.spec.whatwg.org/commit-snapshots/ae716822cb3a61843226cd090eefc6589446c1d2/.
 */

















const supportedSchemas = new Set(['data:', 'http:', 'https:']);

/**
 * Fetch function
 *
 * @param   {string | URL | import('./request').default} url - Absolute url or Request instance
 * @param   {*} [options_] - Fetch options
 * @return  {Promise<import('./response').default>}
 */
async function fetch(url, options_) {
	return new Promise((resolve, reject) => {
		// Build request object
		const request = new Request(url, options_);
		const options = getNodeRequestOptions(request);
		if (!supportedSchemas.has(options.protocol)) {
			throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${options.protocol.replace(/:$/, '')}" is not supported.`);
		}

		if (options.protocol === 'data:') {
			const data = src(request.url);
			const response = new Response(data, {headers: {'Content-Type': data.typeFull}});
			resolve(response);
			return;
		}

		// Wrap http.request into fetch
		const send = (options.protocol === 'https:' ? external_https_ : external_http_namespaceObject).request;
		const {signal} = request;
		let response = null;

		const abort = () => {
			const error = new AbortError('The operation was aborted.');
			reject(error);
			if (request.body && request.body instanceof external_stream_namespaceObject.Readable) {
				request.body.destroy(error);
			}

			if (!response || !response.body) {
				return;
			}

			response.body.emit('error', error);
		};

		if (signal && signal.aborted) {
			abort();
			return;
		}

		const abortAndFinalize = () => {
			abort();
			finalize();
		};

		// Send request
		const request_ = send(options);

		if (signal) {
			signal.addEventListener('abort', abortAndFinalize);
		}

		const finalize = () => {
			request_.abort();
			if (signal) {
				signal.removeEventListener('abort', abortAndFinalize);
			}
		};

		request_.on('error', error => {
			reject(new FetchError(`request to ${request.url} failed, reason: ${error.message}`, 'system', error));
			finalize();
		});

		fixResponseChunkedTransferBadEnding(request_, error => {
			response.body.destroy(error);
		});

		/* c8 ignore next 18 */
		if (process.version < 'v14') {
			// Before Node.js 14, pipeline() does not fully support async iterators and does not always
			// properly handle when the socket close/end events are out of order.
			request_.on('socket', s => {
				let endedWithEventsCount;
				s.prependListener('end', () => {
					endedWithEventsCount = s._eventsCount;
				});
				s.prependListener('close', hadError => {
					// if end happened before close but the socket didn't emit an error, do it now
					if (response && endedWithEventsCount < s._eventsCount && !hadError) {
						const error = new Error('Premature close');
						error.code = 'ERR_STREAM_PREMATURE_CLOSE';
						response.body.emit('error', error);
					}
				});
			});
		}

		request_.on('response', response_ => {
			request_.setTimeout(0);
			const headers = fromRawHeaders(response_.rawHeaders);

			// HTTP fetch step 5
			if (isRedirect(response_.statusCode)) {
				// HTTP fetch step 5.2
				const location = headers.get('Location');

				// HTTP fetch step 5.3
				const locationURL = location === null ? null : new URL(location, request.url);

				// HTTP fetch step 5.5
				switch (request.redirect) {
					case 'error':
						reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, 'no-redirect'));
						finalize();
						return;
					case 'manual':
						// Node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
						if (locationURL !== null) {
							headers.set('Location', locationURL);
						}

						break;
					case 'follow': {
						// HTTP-redirect fetch step 2
						if (locationURL === null) {
							break;
						}

						// HTTP-redirect fetch step 5
						if (request.counter >= request.follow) {
							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 6 (counter increment)
						// Create a new Request object.
						const requestOptions = {
							headers: new Headers(request.headers),
							follow: request.follow,
							counter: request.counter + 1,
							agent: request.agent,
							compress: request.compress,
							method: request.method,
							body: request.body,
							signal: request.signal,
							size: request.size
						};

						// HTTP-redirect fetch step 9
						if (response_.statusCode !== 303 && request.body && options_.body instanceof external_stream_namespaceObject.Readable) {
							reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 11
						if (response_.statusCode === 303 || ((response_.statusCode === 301 || response_.statusCode === 302) && request.method === 'POST')) {
							requestOptions.method = 'GET';
							requestOptions.body = undefined;
							requestOptions.headers.delete('content-length');
						}

						// HTTP-redirect fetch step 15
						resolve(fetch(new Request(locationURL, requestOptions)));
						finalize();
						return;
					}

					default:
						return reject(new TypeError(`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`));
				}
			}

			// Prepare response
			if (signal) {
				response_.once('end', () => {
					signal.removeEventListener('abort', abortAndFinalize);
				});
			}

			let body = (0,external_stream_namespaceObject.pipeline)(response_, new external_stream_namespaceObject.PassThrough(), reject);
			// see https://github.com/nodejs/node/pull/29376
			if (process.version < 'v12.10') {
				response_.on('aborted', abortAndFinalize);
			}

			const responseOptions = {
				url: request.url,
				status: response_.statusCode,
				statusText: response_.statusMessage,
				headers,
				size: request.size,
				counter: request.counter,
				highWaterMark: request.highWaterMark
			};

			// HTTP-network fetch step 12.1.1.3
			const codings = headers.get('Content-Encoding');

			// HTTP-network fetch step 12.1.1.4: handle content codings

			// in following scenarios we ignore compression support
			// 1. compression support is disabled
			// 2. HEAD request
			// 3. no Content-Encoding header
			// 4. no content response (204)
			// 5. content not modified response (304)
			if (!request.compress || request.method === 'HEAD' || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
				response = new Response(body, responseOptions);
				resolve(response);
				return;
			}

			// For Node v6+
			// Be less strict when decoding compressed responses, since sometimes
			// servers send slightly invalid responses that are still accepted
			// by common browsers.
			// Always using Z_SYNC_FLUSH is what cURL does.
			const zlibOptions = {
				flush: external_zlib_namespaceObject.Z_SYNC_FLUSH,
				finishFlush: external_zlib_namespaceObject.Z_SYNC_FLUSH
			};

			// For gzip
			if (codings === 'gzip' || codings === 'x-gzip') {
				body = (0,external_stream_namespaceObject.pipeline)(body, external_zlib_namespaceObject.createGunzip(zlibOptions), reject);
				response = new Response(body, responseOptions);
				resolve(response);
				return;
			}

			// For deflate
			if (codings === 'deflate' || codings === 'x-deflate') {
				// Handle the infamous raw deflate response from old servers
				// a hack for old IIS and Apache servers
				const raw = (0,external_stream_namespaceObject.pipeline)(response_, new external_stream_namespaceObject.PassThrough(), reject);
				raw.once('data', chunk => {
					// See http://stackoverflow.com/questions/37519828
					body = (chunk[0] & 0x0F) === 0x08 ? (0,external_stream_namespaceObject.pipeline)(body, external_zlib_namespaceObject.createInflate(), reject) : (0,external_stream_namespaceObject.pipeline)(body, external_zlib_namespaceObject.createInflateRaw(), reject);

					response = new Response(body, responseOptions);
					resolve(response);
				});
				return;
			}

			// For br
			if (codings === 'br') {
				body = (0,external_stream_namespaceObject.pipeline)(body, external_zlib_namespaceObject.createBrotliDecompress(), reject);
				response = new Response(body, responseOptions);
				resolve(response);
				return;
			}

			// Otherwise, use response as-is
			response = new Response(body, responseOptions);
			resolve(response);
		});

		writeToStream(request_, request);
	});
}

function fixResponseChunkedTransferBadEnding(request, errorCallback) {
	const LAST_CHUNK = Buffer.from('0\r\n\r\n');

	let isChunkedTransfer = false;
	let properLastChunkReceived = false;
	let previousChunk;

	request.on('response', response => {
		const {headers} = response;
		isChunkedTransfer = headers['transfer-encoding'] === 'chunked' && !headers['content-length'];
	});

	request.on('socket', socket => {
		const onSocketClose = () => {
			if (isChunkedTransfer && !properLastChunkReceived) {
				const error = new Error('Premature close');
				error.code = 'ERR_STREAM_PREMATURE_CLOSE';
				errorCallback(error);
			}
		};

		socket.prependListener('close', onSocketClose);

		request.on('abort', () => {
			socket.removeListener('close', onSocketClose);
		});

		socket.on('data', buf => {
			properLastChunkReceived = Buffer.compare(buf.slice(-5), LAST_CHUNK) === 0;

			// Sometimes final 0-length chunk and end of message code are in separate packets
			if (!properLastChunkReceived && previousChunk) {
				properLastChunkReceived = (
					Buffer.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) === 0 &&
					Buffer.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0
				);
			}

			previousChunk = buf;
		});
	});
}

// EXTERNAL MODULE: ./node_modules/rxjs-etc/dist/cjs/operators/index.js
var cjs_operators = __nccwpck_require__(6286);
// EXTERNAL MODULE: ./node_modules/soundcloud-key-fetch/index.js
var soundcloud_key_fetch = __nccwpck_require__(5011);
// EXTERNAL MODULE: external "fs"
var external_fs_ = __nccwpck_require__(5747);
// EXTERNAL MODULE: ./node_modules/ajv/dist/ajv.js
var ajv = __nccwpck_require__(2426);
var ajv_default = /*#__PURE__*/__nccwpck_require__.n(ajv);
;// CONCATENATED MODULE: ./src/schemas/user.schema.json
const user_schema_namespaceObject = JSON.parse('{"$schema":"http://json-schema.org/draft-07/schema#","$id":"user.schema.json","type":"object","properties":{"id":{"type":"number"},"kind":{"const":"user"},"permalink_url":{"type":"string"},"username":{"type":"string"}},"required":["id","kind","permalink_url","username"]}');
;// CONCATENATED MODULE: ./src/schemas/track.schema.json
const track_schema_namespaceObject = JSON.parse('{"$schema":"http://json-schema.org/draft-07/schema#","$id":"track.schema.json","type":"object","properties":{"id":{"type":"number"},"kind":{"const":"track"},"permalink_url":{"type":"string"},"title":{"type":"string"},"user":{"$ref":"user.schema.json"}},"required":["id","kind","permalink_url","title","user"]}');
;// CONCATENATED MODULE: ./src/schemas/tracks.schema.json
const tracks_schema_namespaceObject = JSON.parse('{"$schema":"http://json-schema.org/draft-07/schema#","$id":"tracks.schema.json","type":"array","items":{"$ref":"track.schema.json"}}');
;// CONCATENATED MODULE: ./src/schemas/playlist.schema.json
const playlist_schema_namespaceObject = JSON.parse('{"$schema":"http://json-schema.org/draft-07/schema#","$id":"playlist.schema.json","type":"object","properties":{"id":{"type":"number"},"kind":{"const":"playlist"},"permalink_url":{"type":"string"},"title":{"type":"string"},"track_count":{"type":"number"},"user":{"$ref":"user.schema.json"}},"required":["id","kind","permalink_url","title","track_count","user"]}');
;// CONCATENATED MODULE: ./src/schemas/likes.schema.json
const likes_schema_namespaceObject = JSON.parse('{"$schema":"http://json-schema.org/draft-07/schema#","$id":"likes.schema.json","type":"object","definitions":{"Like":{"type":"object","properties":{"created_at":{"type":"string"},"kind":{"const":"like"},"track":{"$ref":"track.schema.json"},"playlist":{"$ref":"playlist.schema.json"}},"required":["created_at","kind"]}},"properties":{"next_href":{"type":["string","null"]},"collection":{"type":"array","items":{"$ref":"#/definitions/Like"}}},"required":["next_href","collection"]}');
;// CONCATENATED MODULE: ./src/validate.ts
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();






var validate_ajv = undefined;
var ValidationError = /** @class */ (function (_super) {
    __extends(ValidationError, _super);
    function ValidationError(ajvErrors) {
        var _this = this;
        var message = ajvErrors.map(function (_a) {
            var message = _a.message;
            return message;
        }).join(', ');
        _this = _super.call(this, message) || this;
        return _this;
    }
    return ValidationError;
}(Error));
var getAjv = function () {
    validate_ajv = validate_ajv !== null && validate_ajv !== void 0 ? validate_ajv : new (ajv_default())({
        schemas: [user_schema_namespaceObject, track_schema_namespaceObject, tracks_schema_namespaceObject, playlist_schema_namespaceObject, likes_schema_namespaceObject]
    });
    return validate_ajv;
};
function assertDefined(value, msg) {
    if (value === null || value === undefined) {
        throw new Error(msg !== null && msg !== void 0 ? msg : 'value is null or undefined');
    }
}
function validate(data, schemaId) {
    var _a;
    var validateFn = getAjv().getSchema(schemaId);
    assertDefined(validateFn, "no validateFn found for schemaId " + schemaId);
    if (!validateFn(data)) {
        throw new ValidationError((_a = validateFn.errors) !== null && _a !== void 0 ? _a : []);
    }
}
function validateTracks(data) {
    validate(data, tracks_schema_namespaceObject.$id);
}
function validatePlaylist(data) {
    validate(data, playlist_schema_namespaceObject.$id);
}
function validateLikes(data) {
    validate(data, likes_schema_namespaceObject.$id);
}

;// CONCATENATED MODULE: ./src/createLikesLog.ts
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};







var narrowUser = function (_a) {
    var id = _a.id, kind = _a.kind, permalink_url = _a.permalink_url, username = _a.username;
    return ({
        id: id,
        kind: kind,
        permalink_url: permalink_url,
        username: username
    });
};
var narrowTrack = function (_a) {
    var id = _a.id, kind = _a.kind, permalink_url = _a.permalink_url, title = _a.title, user = _a.user;
    return ({
        id: id,
        kind: kind,
        permalink_url: permalink_url,
        title: title,
        user: narrowUser(user)
    });
};
var narrowPlaylist = function (_a) {
    var id = _a.id, kind = _a.kind, permalink_url = _a.permalink_url, title = _a.title, track_count = _a.track_count, user = _a.user;
    return ({
        id: id,
        kind: kind,
        permalink_url: permalink_url,
        title: title,
        track_count: track_count,
        user: narrowUser(user)
    });
};
var narrowLike = function (_a) {
    var created_at = _a.created_at, kind = _a.kind, track = _a.track, playlist = _a.playlist;
    return ({
        created_at: created_at,
        kind: kind,
        track: track ? narrowTrack(track) : undefined,
        playlist: playlist ? narrowPlaylist(playlist) : undefined
    });
};
var addClientId = function (url, clientId) {
    var u = new URL(url);
    u.searchParams.append('client_id', clientId);
    return u.href;
};
var loadJson = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch(url)];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error(response.status + " " + response.statusText + " " + url);
                }
                return [4 /*yield*/, response.json()];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var loadLikes = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var json;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, loadJson(url)];
            case 1:
                json = _a.sent();
                validateLikes(json);
                return [2 /*return*/, json];
        }
    });
}); };
var loadPlaylist = function (clientId, playlistId) { return __awaiter(void 0, void 0, void 0, function () {
    var url, json;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = new URL("https://api-v2.soundcloud.com/playlists/" + playlistId);
                url.searchParams.append('client_id', clientId);
                return [4 /*yield*/, loadJson(url.href)];
            case 1:
                json = _a.sent();
                validatePlaylist(json);
                return [2 /*return*/, json];
        }
    });
}); };
var loadTracks = function (clientId, trackIds) { return __awaiter(void 0, void 0, void 0, function () {
    var url, json;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (trackIds.length === 0) {
                    return [2 /*return*/, []];
                }
                url = new URL('https://api-v2.soundcloud.com/tracks');
                url.searchParams.append('ids', trackIds.join(','));
                url.searchParams.append('client_id', clientId);
                return [4 /*yield*/, loadJson(url.href)];
            case 1:
                json = _a.sent();
                validateTracks(json);
                return [2 /*return*/, json];
        }
    });
}); };
var addTracksToPlaylist = function (clientId, playlist) { return __awaiter(void 0, void 0, void 0, function () {
    var loadedPlaylist, trackIds, loadedTracks;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (playlist === undefined) {
                    return [2 /*return*/, undefined];
                }
                return [4 /*yield*/, loadPlaylist(clientId, playlist.id)];
            case 1:
                loadedPlaylist = _a.sent();
                trackIds = loadedPlaylist.tracks.map(function (_a) {
                    var id = _a.id;
                    return id;
                });
                return [4 /*yield*/, loadTracks(clientId, trackIds)];
            case 2:
                loadedTracks = _a.sent();
                return [2 /*return*/, __assign(__assign({}, playlist), { tracks: loadedTracks.map(narrowTrack) })];
        }
    });
}); };
var getLikes = function (clientId, userId) {
    var url = new URL("https://api-v2.soundcloud.com/users/" + userId + "/likes");
    url.searchParams.append('limit', '100');
    url.searchParams.append('client_id', clientId);
    return (0,cjs.of)({ next_href: url.href, collection: [] })
        .pipe((0,operators.expand)(function (_a) {
        var next_href = _a.next_href;
        return next_href === null ? cjs.EMPTY : loadLikes(addClientId(next_href, clientId));
    }), (0,operators.concatMap)(function (_a) {
        var collection = _a.collection;
        return (0,cjs.from)(collection);
    }), (0,operators.map)(narrowLike), (0,cjs_operators.concatMapEager)(function (like) { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = [__assign({}, like)];
                    _b = {};
                    return [4 /*yield*/, addTracksToPlaylist(clientId, like.playlist)];
                case 1: return [2 /*return*/, (__assign.apply(void 0, _a.concat([(_b.playlist = _c.sent(), _b)])))];
            }
        });
    }); }, 5));
};
var getUserId = function (username) { return __awaiter(void 0, void 0, void 0, function () {
    var response, text, match;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("https://soundcloud.com/" + username)];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.text()];
            case 2:
                text = _a.sent();
                match = text.match(/soundcloud:\/\/users:\d+/);
                if (match === null) {
                    throw new Error("could not resolve user id for user name \"" + username + "\"");
                }
                return [2 /*return*/, match[0].slice(19)];
        }
    });
}); };
/* harmony default export */ const createLikesLog = (function (username, outputPath) { return __awaiter(void 0, void 0, void 0, function () {
    var clientId, userId, likes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0,soundcloud_key_fetch/* fetchKey */.p)()];
            case 1:
                clientId = _a.sent();
                return [4 /*yield*/, getUserId(username)];
            case 2:
                userId = _a.sent();
                return [4 /*yield*/, (0,cjs.firstValueFrom)(getLikes(clientId, userId).pipe((0,operators.toArray)()))];
            case 3:
                likes = _a.sent();
                return [4 /*yield*/, external_fs_.promises.writeFile(outputPath, JSON.stringify(likes, null, 2))];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });

;// CONCATENATED MODULE: ./src/index.ts
var src_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var src_generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


var main = function () { return src_awaiter(void 0, void 0, void 0, function () {
    var username, outputPath;
    return src_generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = (0,core.getInput)('username');
                outputPath = (0,core.getInput)('output-path');
                return [4 /*yield*/, createLikesLog(username, outputPath)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
main().catch(function () {
    process.exit(1);
});


/***/ }),

/***/ 9081:
/***/ ((module) => {

module.exports = eval("require")("stream/web");


/***/ }),

/***/ 8010:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __nccwpck_require__) => {

/* c8 ignore start */
// 64 KiB (same size chrome slice theirs blob into Uint8array's)
const POOL_SIZE = 65536;

if (!globalThis.ReadableStream) {
  try {
    Object.assign(globalThis, __nccwpck_require__(9081))
  } catch (error) {
		// TODO: Remove when only supporting node >= 16.5.0
    Object.assign(globalThis, __nccwpck_require__(1452))
  }
}

try {
  const {Blob} = __nccwpck_require__(4293)
  if (Blob && !Blob.prototype.stream) {
		Blob.prototype.stream = function name(params) {
			let position = 0;
			const blob = this;

			return new ReadableStream({
				type: 'bytes',
				async pull(ctrl) {
					const chunk = blob.slice(position, Math.min(blob.size, position + POOL_SIZE));
					const buffer = await chunk.arrayBuffer();
					position += buffer.byteLength;
					ctrl.enqueue(new Uint8Array(buffer))

					if (position === blob.size) {
						ctrl.close()
					}
				}
			})
		}
	}
} catch (error) {}
/* c8 ignore end */


/***/ }),

/***/ 2228:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"$id":"https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#","description":"Meta-schema for $data reference (JSON AnySchema extension proposal)","type":"object","required":["$data"],"properties":{"$data":{"type":"string","anyOf":[{"format":"relative-json-pointer"},{"format":"json-pointer"}]}},"additionalProperties":false}');

/***/ }),

/***/ 278:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"$schema":"http://json-schema.org/draft-07/schema#","$id":"http://json-schema.org/draft-07/schema#","title":"Core schema meta-schema","definitions":{"schemaArray":{"type":"array","minItems":1,"items":{"$ref":"#"}},"nonNegativeInteger":{"type":"integer","minimum":0},"nonNegativeIntegerDefault0":{"allOf":[{"$ref":"#/definitions/nonNegativeInteger"},{"default":0}]},"simpleTypes":{"enum":["array","boolean","integer","null","number","object","string"]},"stringArray":{"type":"array","items":{"type":"string"},"uniqueItems":true,"default":[]}},"type":["object","boolean"],"properties":{"$id":{"type":"string","format":"uri-reference"},"$schema":{"type":"string","format":"uri"},"$ref":{"type":"string","format":"uri-reference"},"$comment":{"type":"string"},"title":{"type":"string"},"description":{"type":"string"},"default":true,"readOnly":{"type":"boolean","default":false},"examples":{"type":"array","items":true},"multipleOf":{"type":"number","exclusiveMinimum":0},"maximum":{"type":"number"},"exclusiveMaximum":{"type":"number"},"minimum":{"type":"number"},"exclusiveMinimum":{"type":"number"},"maxLength":{"$ref":"#/definitions/nonNegativeInteger"},"minLength":{"$ref":"#/definitions/nonNegativeIntegerDefault0"},"pattern":{"type":"string","format":"regex"},"additionalItems":{"$ref":"#"},"items":{"anyOf":[{"$ref":"#"},{"$ref":"#/definitions/schemaArray"}],"default":true},"maxItems":{"$ref":"#/definitions/nonNegativeInteger"},"minItems":{"$ref":"#/definitions/nonNegativeIntegerDefault0"},"uniqueItems":{"type":"boolean","default":false},"contains":{"$ref":"#"},"maxProperties":{"$ref":"#/definitions/nonNegativeInteger"},"minProperties":{"$ref":"#/definitions/nonNegativeIntegerDefault0"},"required":{"$ref":"#/definitions/stringArray"},"additionalProperties":{"$ref":"#"},"definitions":{"type":"object","additionalProperties":{"$ref":"#"},"default":{}},"properties":{"type":"object","additionalProperties":{"$ref":"#"},"default":{}},"patternProperties":{"type":"object","additionalProperties":{"$ref":"#"},"propertyNames":{"format":"regex"},"default":{}},"dependencies":{"type":"object","additionalProperties":{"anyOf":[{"$ref":"#"},{"$ref":"#/definitions/stringArray"}]}},"propertyNames":{"$ref":"#"},"const":true,"enum":{"type":"array","items":true,"minItems":1,"uniqueItems":true},"type":{"anyOf":[{"$ref":"#/definitions/simpleTypes"},{"type":"array","items":{"$ref":"#/definitions/simpleTypes"},"minItems":1,"uniqueItems":true}]},"format":{"type":"string"},"contentMediaType":{"type":"string"},"contentEncoding":{"type":"string"},"if":{"$ref":"#"},"then":{"$ref":"#"},"else":{"$ref":"#"},"allOf":{"$ref":"#/definitions/schemaArray"},"anyOf":{"$ref":"#/definitions/schemaArray"},"oneOf":{"$ref":"#/definitions/schemaArray"},"not":{"$ref":"#"}},"default":true}');

/***/ }),

/***/ 4293:
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ 5747:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 7211:
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 2087:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 5622:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__nccwpck_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__nccwpck_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__nccwpck_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__nccwpck_require__.o(definition, key) && !__nccwpck_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__nccwpck_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__nccwpck_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module doesn't tell about it's top-level declarations so it can't be inlined
/******/ 	var __webpack_exports__ = __nccwpck_require__(5448);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;