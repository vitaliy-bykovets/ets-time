module.exports = {
  validators: {
    line_create: require('./validators/line_create'),
    line_edit: require('./validators/line_edit'),
    line_delete: require('./validators/line_delete'),
    line_list: require('./validators/line_list')
  },
  auth: require('./auth')
};
