const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require("dotenv-webpack");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].js",
        assetModuleFilename: "assets/images/[hash][ext][query]"
    },
    mode: "development",
    resolve: {
        extensions: [".js"],
        alias: {
            "@utils": path.resolve(__dirname, "src/utils/"),
            "@templates": path.resolve(__dirname, "src/templates/"),
            "@styles": path.resolve(__dirname, "src/styles/"),
            "@images": path.resolve(__dirname, "src/assets/images/"),
        }
    },
    module: {
    rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use:{
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css|.styl$/i,
                use:[
                    MiniCssExtractPlugin.loader, 
                    "css-loader",
                    "stylus-loader"
                ]
            },
            {
                test: /\.png/,
                type: "asset/resource"
            },
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 10000, // O LE PASAMOS UN BOOLEANOS TRUE O FALSE // Habilita o deshabilita la transformación de archivos en base64.
                        mimetype: 'aplication/font-woff',
                       // Especifica el tipo MIME con el que se alineará el archivo. 
                       // Los MIME Types (Multipurpose Internet Mail Extensions)
                       // son la manera standard de mandar contenido a través de la red.
                        name: "[name].[contenthash].[ext]",
                       // EL NOMBRE INICIAL DEL ARCHIVO + SU EXTENSIÓN
                       // PUEDES AGREGARLE [name]hola.[ext] y el output del archivo seria 
                       // ubuntu-regularhola.woff
                        outputPath: './assets/fonts/', 
                       // EL DIRECTORIO DE SALIDA (SIN COMPLICACIONES)
                        publicPath: '../assets/fonts/',
                       // EL DIRECTORIO PUBLICO (SIN COMPLICACIONES)
                        esModule: false 
                       // AVISAR EXPLICITAMENTE SI ES UN MODULO
                }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ // CONFIGURACIÓN DEL PLUGIN
            inject: true, // INYECTA EL BUNDLE AL TEMPLATE HTML
            template: './public/index.html', // LA RUTA AL TEMPLATE HTML
            filename: './index.html' // NOMBRE FINAL DEL ARCHIVO
        }),
        new MiniCssExtractPlugin({
            filename:"assets/[name].[contenthash].css"
        }),
        new CopyPlugin({
            patterns: [{
                from: path.resolve(__dirname,"src","assets/images"),
                to: "assets/images"
            }]
        }),
        new Dotenv(),
    ],
    devServer: {
        static:{
            directory: path.resolve(__dirname, 'dist'),
        },
        compress: true,
        historyApiFallback: true,
        port: 3000,
    },
}