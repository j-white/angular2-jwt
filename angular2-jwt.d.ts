import { Provider } from '@angular/core';
import { Http, Request, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
export interface IAuthConfig {
    globalHeaders: Array<Object>;
    headerName: string;
    headerPrefix: string;
    noJwtError: boolean;
    noTokenScheme?: boolean;
    tokenGetter: () => string | Promise<string>;
    tokenName: string;
}
/**
 * Sets up the authentication configuration.
 */
export declare class AuthConfig {
    globalHeaders: Array<Object>;
    headerName: string;
    headerPrefix: string;
    noJwtError: boolean;
    noTokenScheme: boolean;
    tokenGetter: () => string | Promise<string>;
    tokenName: string;
    constructor(config?: any);
    getConfig(): IAuthConfig;
}
export declare class AuthHttpError extends Error {
}
/**
 * Allows for explicit authenticated HTTP requests.
 */
export declare class AuthHttp {
    private http;
    private defOpts;
    private config;
    tokenStream: Observable<string>;
    constructor(options: AuthConfig, http: Http, defOpts?: RequestOptions);
    private mergeOptions(providedOpts, defaultOpts?);
    private requestHelper(requestArgs, additionalOptions?);
    private requestWithToken(req, token);
    setGlobalHeaders(headers: Array<Object>, request: Request | RequestOptionsArgs): void;
    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response>;
    get(url: string, options?: RequestOptionsArgs): Observable<Response>;
    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>;
    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>;
    delete(url: string, options?: RequestOptionsArgs): Observable<Response>;
    patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>;
    head(url: string, options?: RequestOptionsArgs): Observable<Response>;
    options(url: string, options?: RequestOptionsArgs): Observable<Response>;
}
/**
 * Helper class to decode and find JWT expiration.
 */
export declare class JwtHelper {
    urlBase64Decode(str: string): string;
    decodeToken(token: string): any;
    getTokenExpirationDate(token: string): Date;
    isTokenExpired(token: string, offsetSeconds?: number): boolean;
}
/**
 * Checks for presence of token and that token hasn't expired.
 * For use with the @CanActivate router decorator and NgIf
 */
export declare function tokenNotExpired(tokenName?: string, jwt?: string): boolean;
export declare const AUTH_PROVIDERS: Provider[];
export declare function provideAuth(config?: {}): Provider[];
