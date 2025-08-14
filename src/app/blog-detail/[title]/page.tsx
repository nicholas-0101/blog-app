// server side version

import axios from "axios";
import Image from "next/image";

interface IBlogDetailPageProps {
  params: Promise<{ title: string }>;
}

const getDetail = async (title: string) => {
  try {
    const result = await axios.get(
      `http://localhost:4001/blog/detail/${title}`
    );
    console.log(result.data.blog); // muncul di terminal vscode / server, bukan di inspect terminal web browser

    return result.data.blog;
  } catch (error) {
    console.log(error);
  }
};

async function BlogDetailPage(props: IBlogDetailPageProps) {
  const params = await props.params;
  const detail = await getDetail(params.title);

  console.log(detail);
  return (
    <section className="flex justify-center ">
      <div className="mt-10 flex flex-col gap-2 px-50 py-10 max-w-6xl">
        <Image // using image from next/image, so the image link automaticly converted to webp and compresed
          src={detail.thumbnail}
          width={1200}
          height={800}
          alt="thumbnail"
        />
        <div className="flex gap-1 text-neutral-500">
          <h2>{new Date(detail?.created).toLocaleDateString("id-ID")}</h2>
          <p>•</p>
          <h2>
            {/* show username on the blog detail */}
            {`Written by: ${detail.author.username}`}
          </h2>
        </div>
        <h1 className="text-3xl font-bold">{detail.title}</h1>
        <p>{detail.content}</p>
      </div>
    </section>
  );
}

export default BlogDetailPage;
