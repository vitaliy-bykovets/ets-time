'use strict';

const IndexCtrl = {
  index: ctx => {
    ctx.body = { lines: [{ 1: 2 }] };
  },

  // Create track lines
  create: async (ctx, next) => {
    let lineObject = ctx._body;
    lineObject.user_id = 1;

    let data = await ctx.knex('track_lines').insert(lineObject);
    if (data) {
      ctx.status = 201;
    } else {
      ctx.status = 401;
    }

    //console.log(ctx.knex);
    //
    //try {
    //  ctx.status = 201;
    //} catch (e) {
    //  console.log(e);
    //  ctx.status = 400;
    //}
  }
};
module.exports = IndexCtrl;
