cmake_minimum_required(VERSION 3.20)
project(kext)

set(CMAKE_CXX_STANDARD 14)

include_directories(node_modules/node-addon-api)

add_executable(kext
        src/lib/native/array.cc
)
