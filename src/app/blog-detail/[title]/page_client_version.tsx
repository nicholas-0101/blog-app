"use client";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useAccountStore } from "@/lib/store/accountStore";

interface IBlog {
  objectId: string;
  title: string;
  thumbnail: string;
  category: string;
  content: string;
  created: number;
}
function BlogDetailPage() {
  const params = useParams();
  const [detail, setDetail] = useState<IBlog | null>(null);
  const signInHistory = useAccountStore((state) => state.signInHistory);

  const getDetail = async () => {
    try {
      const result = await axios.get(
        `https://upwardskin-us.backendless.app/api/data/blogs?where=%60title%60%20%3D%20'${params.title}'` //get detail from backendless
      );
      console.log(result.data);
      setDetail(result.data[0]); //set detail, so the title can be shown
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDetail();
  }, []);

  return (
    <div>
      <h1>Detail Page</h1>

      {detail ? (
        <div className="mt-10 flex flex-col gap-2 px-50">
          <img src={detail?.thumbnail} />
          <div className="flex gap-2">
            <p className="text-neutral-500">
              {new Date(detail?.created).toLocaleDateString("id-ID")}
            </p>
            <div>
              {signInHistory.map((username, idx) => (
                <p className="text-neutral-500" key={idx}>{`Writer: ${username}`}</p>
              ))}
            </div>
          </div>
          <h1 className="text-5xl font-bold">{detail?.title}</h1>
          <p>{detail?.content}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default BlogDetailPage;
