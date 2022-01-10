import AppNavigator from './navigation/AppNavigator'
import { Provider } from 'react-redux'
import store, { persistor } from './store/index'
import { PersistGate } from 'redux-persist/integration/react'

export default App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <AppNavigator />
            </PersistGate>
        </Provider>
    )
}
