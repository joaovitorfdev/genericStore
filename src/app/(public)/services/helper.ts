export function GetMediaLink(complement: string) {
    console.log(String(process.env.NEXT_PUBLIC_BASE_URL + (complement.startsWith('/') ? complement : '/' + complement)));  
    return String(process.env.NEXT_PUBLIC_BASE_URL + (complement.startsWith('/') ? complement : '/' + complement));
}
