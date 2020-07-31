"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "Post",
    embedded: false
  },
  {
    name: "Like",
    embedded: false
  },
  {
    name: "Comment",
    embedded: false
  },
  {
    name: "File",
    embedded: false
  },
  {
    name: "Room",
    embedded: false
  },
  {
    name: "Message",
    embedded: false
  },
  {
    name: "UserProfile",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://us1.prisma.sh/yun_sangho-feaad9/prismagram-2020/dev`
});
exports.prisma = new exports.Prisma();
