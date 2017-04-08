import {
    watchPasteHistory,
    watchLoadPastes,
    watchLoadPaste,
    watchSavePaste,
    watchDeletePaste,
    watchCheckAdmin,
    watchLogoutAdmin,
    watchChangePasteAbuse,
} from './pasteSaga';

export default function* rootSaga() {
    yield [
        watchPasteHistory(),
        watchLoadPastes(),
        watchLoadPaste(),
        watchSavePaste(),
        watchDeletePaste(),
        watchCheckAdmin(),
        watchLogoutAdmin(),
        watchChangePasteAbuse(),
    ];
}
