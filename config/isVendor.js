module.exports = ({ resource }) =>
  resource && resource.indexOf('node_modules') >= 0 && resource.match(/.js$/);
