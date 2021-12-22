import { useEffect, useState } from "react";

export const useCourses = (url, method = "GET", credentials = null) => {
  const [courses, setCourses] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(null);

  
//require credentials for post.put/delete
  const setfetchOptions = (courseData) => {
    setOptions({
      method,
      headers: {
        "Content-Type": "application/json",
        "Authorization":
          "Basic " +
          Buffer.from(
            `${credentials.username}:${credentials.password}`
          ).toString("base64"),
      },
      body: JSON.stringify(courseData),
    });
  };
  useEffect(() => {
    const fetchCourses = async (fetchOptions) => {
      setIsLoading(true);
      try {
        const res = await fetch(url, fetchOptions);
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const json = await res.json();
        setIsLoading(false);
        setCourses(json);
        setError(null);
      } catch (err) {
        setIsLoading(false);
        setError("We had and issue finding the course");
      }
    };
    if (method === "GET") {
      fetchData();
    } else if (options) {
      fetchData(options);
    }
  }, [url, method, options]);

  return { data, isLoading, error, setfetchOptions };
};
