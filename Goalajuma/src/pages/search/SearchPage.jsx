import { CategoryBox } from "@/components/layouts/headers/CategoryBox";
import SearchInput from "@/components/search/SearchInput";
import { HomeContainer } from "@/styles/Container";
import ErrorScreen from "@/components/common/ErrorScreen";
import Footer from "@/components/layouts/footers/Footer";
import HomeTemplate from "@/components/template/HomeTemplate";
import { useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import Loader from "@/assets/Loader";
import { search } from "@/services/search";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { totalCategoryState } from "@/utils/HeaderAtom";
import styled from "styled-components";

const SearchPage = () => {
  const bottomObserver = useRef(null);
  const categoryData = useRecoilValue(totalCategoryState);
  //추후 헤더 완료 후 수정
  let { query } = useParams();

  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    data,
    isFetching,
    error,
  } = useInfiniteQuery({
    queryKey: ["searchInfo", categoryData],
    queryFn: ({ pageParam = 0 }) => search(categoryData, query, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length;
      const isLast = lastPage?.data.data.isLast;
      return isLast ? undefined : nextPage;
    },
    retry: 0,
  });

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            !isLoading &&
            hasNextPage &&
            !isFetchingNextPage
          ) {
            fetchNextPage();
          }
        });
      },
      {
        threshold: 0.7,
      }
    );

    if (bottomObserver.current) {
      io.observe(bottomObserver.current);
    }

    return () => {
      if (bottomObserver.current) {
        io.unobserve(bottomObserver.current);
      }
    };
  }, [isLoading, hasNextPage, fetchNextPage]);

  const Data = data?.pages.flatMap((param) => param.data.data.votes);

  return (
    <HomeContainer>
      <SearchWrapper>
        <SearchInput></SearchInput>
      </SearchWrapper>

      <CategoryBox />
      {query && (
        <HomeContainer>
          {error ? (
            <ErrorScreen
              status={error.data.status}
              error={error.data.error}
              message={error.data.message}
            ></ErrorScreen>
          ) : (
            <>
              <HomeTemplate datas={Data} isFetching={isFetching} />
              <div ref={bottomObserver}></div>
              {isFetching && <Loader />}
            </>
          )}
        </HomeContainer>
      )}
      <Footer page="main" />
    </HomeContainer>
  );
};

const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default SearchPage;
