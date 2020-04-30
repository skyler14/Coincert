import { ResolverEngine } from "@openzeppelin/resolver-engine-core";
import { parsers as fsParsers, resolvers as fsResolvers } from "@openzeppelin/resolver-engine-fs";
import { ImportFile, ImportsEngine, parsers as imports_parsers } from "@openzeppelin/resolver-engine-imports";
import { EthPmResolver } from "./resolvers/ethpmresolver";

export function ImportsFsEngine(): ResolverEngine<ImportFile> {
  return ImportsEngine()
    .addResolver(fsResolvers.FsResolver())
    .addResolver(fsResolvers.NodeResolver())
    .addResolver(EthPmResolver())
    .addParser(imports_parsers.ImportParser([fsParsers.FsParser()]));
}
