import { Header } from "@/components/Header";
import { cachedServerFetch } from "@/lib/serverUtils";
import { IBlog } from "@/types";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

const getBlogs = async (id: number = 1) => {
  try {
    const res = await cachedServerFetch(`/blogs/${id}`);
    const data = res.data;
    return data;
  } catch {
    return undefined;
  }
};
export default async function Blog() {
  const blog = (await getBlogs()) as IBlog | undefined;
  const text = await getTranslations("blog");
  return (
    <main>
      <Header />
      {blog ? (
        <section className="md:px-4">
          <div>
            <div className="mx-auto max-w-4xl mb-8">
              <h1 className="text-center mt-8 mb-6">{blog.title}</h1>
              <p className="md:text-lg max-w-[40rem] mx-auto text-center">
                {blog.description}
              </p>
            </div>
            <Image
              width={1700}
              height={1060}
              src={blog.image}
              alt={blog.title}
              className="blog w-full object-cover rounded-xl"
            />{" "}
          </div>
          <div className="prose md:prose prose-sm lg:prose-lg px-4 dark:prose-invert max-w-[65ch] mx-auto py-8">
            <h1>Main Heading (H1)</h1>
            <p>
              This is a paragraph with some <b>bold text</b> and some{" "}
              <i>italic text</i>. You can also find <u>underlined text</u> and{" "}
              <span className="highlight">highlighted text</span> here.
            </p>

            <h2>Secondary Heading (H2)</h2>
            <p>
              Here&apos;s another paragraph with a <a href="#">link</a> to test
              how links are styled. You can also find <sup>superscript</sup> and{" "}
              <sub>subscript</sub> text in this paragraph.
            </p>

            <h3>Tertiary Heading (H3)</h3>
            <blockquote>
              This is a blockquote. It&apos;s used to highlight a quote or a
              piece of text that stands out from the rest of the content. It
              usually has a different style to make it visually distinct.
            </blockquote>

            <h4>Quaternary Heading (H4)</h4>
            <ul>
              <li>Unordered List Item 1</li>
              <li>Unordered List Item 2</li>
              <li>Unordered List Item 3</li>
            </ul>

            <h5>Quinary Heading (H5)</h5>
            <ol>
              <li>Ordered List Item 1</li>
              <li>Ordered List Item 2</li>
              <li>Ordered List Item 3</li>
            </ol>

            <h6>Senary Heading (H6)</h6>
            <p>This is a paragraph with an image:</p>

            <h2>Another H2 Heading</h2>
            <p>
              This paragraph contains some <code>inline code</code> to test how
              code snippets are styled. You can also find a <a href="#">link</a>{" "}
              here.
            </p>

            <h3>Another H3 Heading</h3>

            <h4>Another H4 Heading</h4>
            <p>
              This paragraph contains a <a href="#">link</a> and some{" "}
              <b>bold text</b> to test the styling of these elements.
            </p>

            <h5>Another H5 Heading</h5>
            <p>
              This is a paragraph with a <a href="#">link</a> and some{" "}
              <i>italic text</i>.
            </p>

            <h6>Another H6 Heading</h6>
            <p>
              This is the last paragraph with a <a href="#">link</a> and some{" "}
              <u>underlined text</u>.
            </p>

            <h2>Table Example</h2>
            <table>
              <thead>
                <tr>
                  <th>Header 1</th>
                  <th>Header 2</th>
                  <th>Header 3</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Row 1, Cell 1</td>
                  <td>Row 1, Cell 2</td>
                  <td>Row 1, Cell 3</td>
                </tr>
                <tr>
                  <td>Row 2, Cell 1</td>
                  <td>Row 2, Cell 2</td>
                  <td>Row 2, Cell 3</td>
                </tr>
                <tr>
                  <td>Row 3, Cell 1</td>
                  <td>Row 3, Cell 2</td>
                  <td>Row 3, Cell 3</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <section className="md:px-4">
          <div>
            <div className="mx-auto max-w-4xl mb-8">
              <h1 className="text-center mt-8 mb-6">
                {text("canNotFindThisBlog")}
              </h1>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
