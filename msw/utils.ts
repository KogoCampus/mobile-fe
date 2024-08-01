export function mswApiUrl(path = ''): string {
    return `https://localhost${path}`;
}

export async function sleep(timeout: number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}
