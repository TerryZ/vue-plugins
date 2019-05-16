const assert = require('assert');
import list from '@test/sample/nba-teams';
import tg from '@/components/v-tablegrid/mixins';

describe('v-tablegrid', function() {
    describe('javascript sourced data(Array[Object]) pagination', function() {
        it('the 4th page records length should be 0 ({pageNumber:4,pageSizeNum:-1})', function() {
            const env = {
                data: list,
                pageNumber: 4,
                pageSizeNum: -1
            }, results = tg.methods.paginationJson.call(env).list;
            assert.equal(results.length, 0);
        });
        it('load first page with no initialize params, have 10 records ({pageNumber:-1,pageSizeNum:-1})', ()=>{
            const env = {
                data: list,
                pageNumber: -1,
                pageSizeNum: -1
            }, results = tg.methods.paginationJson.call(env).list;
            assert.equal(results.length, 10);
        });
        it('string field sort, the value of the "name" field of the first record is "Atlanta Hawks" ({pageNumber:1,pageSizeNum:10,sorting:true,sortCol:"name"})', ()=>{
            const env = {
                data: list,
                pageNumber: 1,
                pageSizeNum: 10,
                sorting: true,
                sortCol: 'name'
            }, results = tg.methods.paginationJson.call(env).list;
            assert.equal(results[0].name, 'Atlanta Hawks');
        });
        it('number field sort, the value of the "id" field of the first record is 30 ({pageNumber:1,pageSizeNum:10,sorting:true,sortCol:"id",sortOrd: "desc"})', ()=>{
            const env = {
                data: list,
                pageNumber: 1,
                pageSizeNum: 10,
                sorting: true,
                sortCol: 'id',
                sortOrd: 'desc'
            }, results = tg.methods.paginationJson.call(env).list;
            assert.equal(results[0].id, 30);
        });
    });
});