export interface TestRequest{
    functionEndpoint: string,
    apiKey: string,
    bucketName: string,
    seleniumHost: string,
    seleniumPort: string,
    region: string,
    test_path: string,
    function_id: string
}