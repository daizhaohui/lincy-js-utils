import URL from '../src/url';

// 标准url  scheme://domain:port/path?query_string#fragment_id

describe('url', () => {
    it('paramsTest', () => {
        const url = new URL('https://www.lincy.com:8080?a=1&b=2#a/b/c?c=1');

        expect(url.hostName).toEqual('www.lincy.com');
        expect(url.port).toEqual('8080');
        expect(url.search).toEqual('?a=1&b=2');
        expect(url.hash).toEqual({ 'path': 'a/b/c', 'params': { 'c': '1' } });
        expect(url.hash.path).toEqual('a/b/c');
        expect(url.hash.params).toEqual({ 'c': '1' });

        expect(url.getSearchParamValue()).toEqual({ 'a': '1', 'b': '2' });
        expect(url.getSearchParamValue('a')).toEqual('1');
        expect(url.getSearchParamValue('1')).toEqual('');
        expect(url.getHashParamValue()).toEqual({ 'c': '1' });
        expect(url.getHashParamValue('c')).toEqual('1');

        expect(url.addSearchParam('c', '3').toString()).toEqual('https://www.lincy.com:8080?a=1&b=2&c=3#a/b/c?c=1');
        expect(url.addSearchParam('c').toString()).toEqual('please check your value');
        expect(url.addSearchParam({ 'k': '9' }).toString()).toEqual('https://www.lincy.com:8080?a=1&b=2&c=3&k=9#a/b/c?c=1');
        expect(url.addSearchParam({ 'x': '8', 'y': '8' }).toString()).toEqual('https://www.lincy.com:8080?a=1&b=2&c=3&k=9&x=8&y=8#a/b/c?c=1');
        expect(url.addSearchParam({ 'aa': '8', 'bb': '8' }).addSearchParam('cc', '33').toString()).toEqual('https://www.lincy.com:8080?a=1&b=2&c=3&k=9&x=8&y=8&aa=8&bb=8&cc=33#a/b/c?c=1');

        expect(url.addHashParam('c', '3').toString()).toEqual('https://www.lincy.com:8080?a=1&b=2&c=3&k=9&x=8&y=8&aa=8&bb=8&cc=33#a/b/c?c=1&c=3');
        expect(url.addHashParam('c').toString()).toEqual('please check your value');
        expect(url.addHashParam({ 'k': '9' }).toString()).toEqual('https://www.lincy.com:8080?a=1&b=2&c=3&k=9&x=8&y=8&aa=8&bb=8&cc=33#a/b/c?c=1&c=3&k=9');
        expect(url.addHashParam({ 'x': '8', 'y': '8' }).toString()).toEqual('https://www.lincy.com:8080?a=1&b=2&c=3&k=9&x=8&y=8&aa=8&bb=8&cc=33#a/b/c?c=1&c=3&k=9&x=8&y=8');
        expect(url.addHashParam({ 'aa': '8', 'bb': '8' }).addHashParam('cc', '33').toString()).toEqual('https://www.lincy.com:8080?a=1&b=2&c=3&k=9&x=8&y=8&aa=8&bb=8&cc=33#a/b/c?c=1&c=3&k=9&x=8&y=8&aa=8&bb=8&cc=33');

        const url2 = new URL('https://www.lincy.com:8080?a=1&b=2#a/b/c');
        expect(url2.hash.path).toEqual('a/b/c');
        expect(url2.hash.params).toEqual(null);

        const url3 = new URL('https://www.lincy.com:8080?a=1&b=2#?c=1');
        expect(url3.hash.path).toEqual('');
        expect(url3.hash.params).toEqual({ 'c': '1' });

        const url4 = new URL('https://www.lincy.com:8080?a=1&b=2#c=1');
        expect(url4.hash.path).toEqual('c=1');
        expect(url4.hash.params).toEqual(null);

        const url5 = new URL('https://www.lincy.com:8080?a=1&b=2#a/b/c?c=1&d=3');
        expect(url5.getHashParamValue()).toEqual({ 'c': '1', 'd': '3' });
        expect(url5.getHashParamValue('c')).toEqual('1');
        expect(url5.getHashParamValue('d')).toEqual('3');
        expect(url5.getHashParamValue('f')).toEqual('');
    });

    it('noParamsTest', () => {
        let url = new URL('https://www.lincy.com:8080');
        expect(url.protocol).toEqual('https:');
        expect(url.hostName).toEqual('www.lincy.com');
        expect(url.port).toEqual('8080');
        expect(url.search).toEqual('');
        expect(url.hash).toEqual(null);

        expect(url.getSearchParamValue()).toEqual(null);
        expect(url.getHashParamValue()).toEqual(null);

        expect(url.addSearchParam('c', '3').toString()).toEqual('https://www.lincy.com:8080?c=3');
        expect(url.addSearchParam({ 'k': '9' }).toString()).toEqual('https://www.lincy.com:8080?c=3&k=9');
        expect(url.addSearchParam({ 'x': '8', 'y': '8' }).toString()).toEqual('https://www.lincy.com:8080?c=3&k=9&x=8&y=8');
        expect(url.addSearchParam({ 'aa': '8', 'bb': '8' }).addSearchParam('cc', '33').toString()).toEqual('https://www.lincy.com:8080?c=3&k=9&x=8&y=8&aa=8&bb=8&cc=33');
        expect(url.addHashParam('c', '3').toString()).toEqual('https://www.lincy.com:8080?c=3&k=9&x=8&y=8&aa=8&bb=8&cc=33#?c=3');
        expect(url.addHashParam('c').toString()).toEqual('please check your value');

        url = new URL('https://www.lincy.com:8080');
        expect(url.addHashParam({ 'k': '9' }).toString()).toEqual('https://www.lincy.com:8080#?k=9');
        url = new URL('https://www.lincy.com:8080');
        expect(url.addHashParam({ 'x': '8', 'y': '8' }).toString()).toEqual('https://www.lincy.com:8080#?x=8&y=8');
        url = new URL('https://www.lincy.com:8080');
        expect(url.addHashParam({ 'aa': '8', 'bb': '8' }).addHashParam('cc', '33').toString()).toEqual('https://www.lincy.com:8080#?aa=8&bb=8&cc=33');
        url = new URL('https://www.lincy.com:8080');
        expect(url.addHashParam('cc', '33').addHashParam({ 'aa': '8', 'bb': '8' }).toString()).toEqual('https://www.lincy.com:8080#?cc=33&aa=8&bb=8');
        url = new URL('https://www.lincy.com:8080');
        expect(url.addHashParam({ 'aa': '8', 'bb': '8' }).addHashParam('cc', '33').addHashParam('dd', '33').toString()).toEqual('https://www.lincy.com:8080#?aa=8&bb=8&cc=33&dd=33');
        url = new URL('https://www.lincy.com:8080');
        expect(url.addHashParam({ 'aa': '8', 'bb': '8' }).addHashParam({ 'dd': '33' }).toString()).toEqual('https://www.lincy.com:8080#?aa=8&bb=8&dd=33');
        url = new URL('https://www.lincy.com:8080');
        expect(url.addHashParam({ 'aa': '8', 'bb': '8' }).addHashParam({ 'dd': '33', 'ee': '22' }).toString()).toEqual('https://www.lincy.com:8080#?aa=8&bb=8&dd=33&ee=22');
    });
})