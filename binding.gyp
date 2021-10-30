{
  "targets": [
    {
      "target_name": "array",
      "cflags!": [ "-fno-exceptions" ],
      "cflags_cc!": [ "-fno-exceptions" ],
      "sources": [ "src/lib/native/array.cc" ],
      "include_dirs": ["<!@(node -p \"require('node-addon-api').include\")"],
      'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ],
    }
  ]
}
