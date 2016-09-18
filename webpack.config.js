module.exports = {
  entry: './app.js',
  output: {
    filename: 'lib/bundle.js'
  },
  module: {
   loaders: [
     {
       test: /\.js$/,
       exclude: /node_modules/,
       loader: 'babel',
       query: {
         presets: ['es2015', 'stage-0']
       }
     }
   ]
 }
};
