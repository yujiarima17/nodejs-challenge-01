export function buildRoutePath(path){
    // qualquer texto que contenha letras de a-z maiúsculas ou minúsculas, contendo
    //  uma ou mais vezes, regex global
    const routeParametersRegex = /:([a-zA-Z]+)/g
    const pathWithParams = path.replaceAll(routeParametersRegex,'(?<$1>[a-z0-9\-_]+)')
    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)
    return pathRegex
}