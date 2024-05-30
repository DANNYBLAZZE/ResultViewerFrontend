import {useState, useEffect, memo, useMemo} from "react";

function useButtonFetch(url, options) {
    const [data, setData] = useState(null);
    const reqOptions = useMemo(() => options, [JSON.stringify(options)])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [shouldFetch, setShouldFetch] = useState(0);
    const [first, setFirst] = useState(false);

    const triggerFetch = () => {
        setShouldFetch((value) => 1 - value);
    }

    useEffect(() => {
        const fetchData = async () => {

            setLoading(true);
            try {
                if (!url) return;
                
                if (!first) {
                    setFirst(true);
                    return;
                }

                const response = await fetch(url, reqOptions);
                if (!response.ok) {
                    throw new Error(JSON.stringify(await response.json()));
                }

                const data = await response.json();
                setData(data);

            } catch (error) {
                console.log(error);
                setError(JSON.parse(error.message));
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