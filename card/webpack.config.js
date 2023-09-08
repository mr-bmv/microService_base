const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin")

module.exports = {
  mode: 'development',
  devServer: {
    port: 8082,
  },
  plugins: [
    // часть микросервисов
    // отвечает за взаимодействие текущего компонента (remote)
    // с главным компонентом (host)
    new ModuleFederationPlugin({
      name: 'cart',
      filename: 'remoteEntry.js',
      exposes: {
        './CartShow': './src/index'
      },
      // указываем библиотеки, которые будут общими с другими компонентами
      //
      // если версия ( первая цифра) библиотеки будет отличатся от аналогичной
      // библиотеки в другом компоненте, то будет загружено 2 версии библиотек
      // Если версии (первые цифры) одинаковые, будет загружен 1 фаил библиотеки
      shared: ['faker']

      // если версия ( первая цифра) библиотеки будет отличатся от аналогичной
      // библиотеки в другом компоненте, то будет загружено 1 версия библиотеки
      // но в консоле появится ошибка о том, что не возможно подгрузить
      // требуемую версию(конфликтующие правила)
      // Unsatisfied version 5.1.0 from products of shared singleton module faker (required ^4.1.0)
      // shared: {
      //   faker: {
      //     singleton: true,
      //   }
      // }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}