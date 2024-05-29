import {useState, useEffect, memo, useMemo} from "react";

function useButtonFetch(url, options) {
    const [data, setData] = useState(null);
    const reqOptions = useMemo(() => options, [JSON.stringify(options)])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [shouldFetch, setShouldFetch] = useState(0);

    const triggerFetch = () => {
        setShouldFetch((value) => 1 - value);
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (!url) return;
                
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
    }, [shouldFetch]);

    return {data, triggerFetch, loading, error};
}

export default useButtonFetch;