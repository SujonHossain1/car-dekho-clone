import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import '../../scss/main.scss';

axios.defaults.baseURL = 'http://localhost:3000';

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;
