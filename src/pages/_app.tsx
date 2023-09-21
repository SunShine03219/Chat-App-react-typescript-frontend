import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store, persistor } from "@/store";
import { PersistGate } from "redux-persist/integration/react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <PersistGate
                persistor={persistor}
                loading={null}
            >
                <Component {...pageProps} />
                <ToastContainer />
            </PersistGate>
        </Provider>
    );
}
