export class Security {
    private static checkInput = (value: string, regex: RegExp): boolean  => {
        return regex.test(value) && value != "";
    }

    public static checkValidity<E>(value: string, regex: RegExp, node: keyof E, setErrors: React.Dispatch<React.SetStateAction<E>>): void {
        if (Security.checkInput(value, regex)) {
            setErrors((prevErrors: E) => ({
            ...prevErrors,
            [node]: false,
            }));
        } else {
            setErrors((prevErrors: E) => ({
            ...prevErrors,
            [node]: true,
            }));
        }
    }
}