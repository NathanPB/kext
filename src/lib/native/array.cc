#include <node/node.h>

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;
using v8::Function;
using v8::Boolean;
using v8::Number;
using v8::Context;
using v8::Array;
using v8::MaybeLocal;

void indexOfFirst(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  Local<Context> context = isolate->GetCurrentContext();

  Local<Array> array = args[0].As<Array>();
  Local<Function> predicate = Local<Function>::Cast(args[1]);

  uint32_t arrlength = array->Length();
  for (unsigned int i=0; i < arrlength; i++) {
    Local<Value> argIt = array->Get(context, i).ToLocalChecked();
    Local<Number> argIdx = Number::New(isolate, i);

    Local<Value> argv[3] = { argIt, argIdx, array };

    Local<Value> match = predicate->Call(context, Null(isolate), 3, argv).ToLocalChecked();

    if (match->BooleanValue(isolate)) {
      args.GetReturnValue().Set(argIdx);
      return;
    }
  }
  args.GetReturnValue().Set(Number::New(isolate, -1));
}

void Initialize(Local<Object> exports) {
  NODE_SET_METHOD(exports, "indexOfFirst", indexOfFirst);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize)
