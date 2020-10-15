import DocumentPicker from "react-native-document-picker";

class DocumentFile {
    static AllFiles = 1;
    static Camera = 2;
    static Galery = 3;

    static openDocument = async (type) => {
        try {

            let types = { type: null }

            switch(type){
                case DocumentFile.AllFiles:
                    types.type = [DocumentPicker.types.allFiles];
                    break;
                case DocumentFile.Galery:
                    types.type = [DocumentPicker.types.images];
                    break;
            }

            const res = await DocumentPicker.pick(types);

            let file = {
                uri: res.uri,
                type:res.type,
                name:res.name,
                size:res.size
            }
            return file;
            // attachmentAdd(file);
          } catch (err) {
            if (DocumentPicker.isCancel(err)) {
              // User cancelled the picker, exit any dialogs or menus and move on
            } else {
              throw err;
            }
          }
    }
}

export default DocumentFile;