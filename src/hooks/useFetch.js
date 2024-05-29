import {useState, useEffect, memo, useMemo} from "react";

function useFetch(url, options) {
    const [data, setData] = useState(null);
    const reqOptions = useMemo(() => options, [JSON.stringify(options)])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(url, reqOptions);
                if (!response.ok) {
                    throw new Error(await response.text());
                }
                const jsonData = await response.json();
                // console.log("json", jsonData);
                setData(jsonData);
            } catch (error) {
                console.log(error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        // Clean-up function
        return () => {
            // Optionally, perform clean-up actions here
        };
    }, [url, reqOptions]);

    return {data, loading, error};
}

export default useFetch;