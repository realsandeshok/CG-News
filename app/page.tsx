"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Navbar from "@/components/navbar";
import CategoryFilter from "@/components/category-filter";
// import NewsCard from "@/components/news-card"
import BiographyCard from "@/components/biography-card";
import Pagination from "@/components/pagination";
import LoadingSpinner from "@/components/loading-spinner";
// import { fetchNewsByCategory, searchNews } from "@/lib/newsApi";
import { fetchNews } from "@/lib/newsApi";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Fetch news when category or page changes
  // useEffect(() => {
  //   async function loadNews() {
  //     setIsLoading(true)
  //     setError(null)

  //     try {
  //       if (isSearching && searchQuery) {
  //         const data = await searchNews(searchQuery, currentPage, itemsPerPage)
  //         setArticles(data.articles)
  //         setTotalResults(data.totalResults)
  //       } else {
  //         // const data = await fetchNewsByCategory(activeCategory, currentPage, itemsPerPage)
  //         const data = await fetchNews(activeCategory)
  //         setArticles(data.articles)
  //         setTotalResults(data.totalResults)
  //       }
  //     } catch (err) {
  //       setError("Failed")
  //       console.error(err)
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }

  //   loadNews()
  // }, [activeCategory, currentPage, isSearching, searchQuery])

  useEffect(() => {
    async function loadNews() {
      setIsLoading(true);
      setError("");

      try {
        if (isSearching && searchQuery) {
          //         const data = await searchNews(searchQuery, currentPage, itemsPerPage)
          //         setArticles(data.articles)
          //         setTotalResults(data.totalResults)
        } else {
          const data = await fetchNews(activeCategory);
          console.log("API Response:", data); // ✅ Debugging API response

          // Extract articles safely
          const newsArticles = data?.articles?.results ?? [];
          console.log("Extracted articles:", newsArticles);

          setArticles(newsArticles); // Set extracted articles

          // Ensure `totalResults` and `totalPages` are correctly set
          setTotalResults(data?.articles?.totalResults || 0);
          // setTotalPages(data?.articles?.pages || 1); // Default to 1 if not available
        }
      } catch (err) {
        setError("Failed to fetch news");
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadNews();
  }, [activeCategory, currentPage, searchQuery]); // ✅ Ensure dependency triggers re-fetch on page change

  const itemsPerPage = 99;

  const totalPages = Math.ceil(totalResults / itemsPerPage);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
    setIsSearching(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of the grid when page changes
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      setCurrentPage(1);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Explore naradpost.in
        </h1>
        <p className="text-muted-foreground mb-8">
          Discover the latest news from around the world
        </p>

        {/* Search Bar */}
        {/* <form onSubmit={handleSearch} className="relative max-w-md mx-auto mb-8 px-2">
          <input
            type="text"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 bg-transparent border border-input rounded-full text-foreground focus:outline-none focus:border-[#ff6b5b]"
          />
          <button type="submit" className="absolute right-3 top-1 bg-[#ff6b5b] p-2 rounded-full">
            <Search className="h-5 w-5 text-white" />
          </button>
        </form> */}

        {/* Categories */}
          <CategoryFilter onCategoryChange={handleCategoryChange} />
      </section>
      <div>
        {/* <div className="sticky top-0 bg-background z-10 shadow-md">
        </div> */}
        {/* News Grid */}
        <section className="container mx-auto px-4 pb-16 pt-4">
          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : Array.isArray(articles) && articles.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium">No news articles found</h3>
              <p className="text-muted-foreground mt-2">
                {isSearching
                  ? "Try a different search term or browse by category"
                  : "Try a different category or check back later"}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article, index) => (
                  <BiographyCard key={article.id || index} article={article} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}
