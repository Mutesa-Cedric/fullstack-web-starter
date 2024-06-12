
export function generatePageTitle(title: string) {
    return title.concat(" | Restful NE")
}

export const getObjValue = (key: string | number, obj: any) => {
    const keys = key.toString().split('.');
    let result = obj;
    for (const key of keys) {
        if (result && Object.prototype.hasOwnProperty.call(result, key)) {
            result = result[key];
        } else {
            return undefined;
        }
    }
    return result as string;
};