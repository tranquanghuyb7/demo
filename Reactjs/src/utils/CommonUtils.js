class CommonUtils {
    static getBase64(file){
        return new Promise((resolve, rejecj) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result)
            reader.onerror = error => rejecj(error)
        })
    }
}

export default CommonUtils;