module.exports = {
  validators: {
    line_create: require('./validators/line_create'),
    line_edit: require('./validators/line_edit'),
    line_delete: require('./validators/line_delete'),
    line_list: require('./validators/line_list'),
    line_status: require('./validators/line_status'),
    user_create: require('./validators/user_create'),
    users_list: require('./validators/users_list'),
    user_edit: require('./validators/user_edit')
  },
  auth: require('./auth')
};
