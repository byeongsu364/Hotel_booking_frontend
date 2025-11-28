import React from "react";
import "../../styles/components/hotelpage/HotelReviews.scss";

import {
    renderStars,
    getRatingLabel,
    calculateAverageRating,
} from "../../util/reviewHelper";

const HotelReviews = ({
    hotelId,
    rating,
    reviewCount,
    createReview,
    updateReview,
    deleteReview,
    reviews = [],
    getReviews,
}) => {
    console.log("HotelReviews reviews:", reviews);

    // ⭐ 평균 평점 미리 계산해두기
    const avgRating = calculateAverageRating(reviews);
    const avgLabel = getRatingLabel(avgRating);

    return (
        <div className="hotel-reviews">

            {/* 리뷰 상단 제목 + 작성 버튼 */}
            <div className="dep header-row">
                <h3>리뷰 ({reviewCount || reviews.length})</h3>
                <button className="btn btn--primary">리뷰 작성</button>
            </div>

            {/* 평균 평점 영역 */}
            <div className="dep avg-row">
                <div className="average-rating">
                    <span className="stars">{renderStars(avgRating)}</span>
                    <span className="score">{avgRating}</span>
                    <span className="label">{avgLabel}</span>
                </div>
            </div>

            {/* 리뷰 내용 */}
            <ul className="review-list">
                {reviews && reviews.length > 0 ? (
                    reviews.map((review) => (
                        <li key={review.id} className="review-item">
                            
                            {/* 프로필 이미지 */}
                            <div className="profile-image">
                                <img
                                    src="sample.jpg"
                                    alt={review.userId?.name || "익명"}
                                />
                            </div>

                            {/* 리뷰 정보 */}
                            <div className="review-content">
                                <span className="review-author">
                                    {review.userId?.name || "익명"}
                                </span>

                                <span className="review-rating">
                                    {renderStars(review.rating)}
                                </span>

                                <span className="review-date">
                                    {new Date(review.createdAt || review.date)
                                        .toLocaleDateString()}
                                </span>

                                <p className="review-comment">{review.comment}</p>
                            </div>

                        </li>
                    ))
                ) : (
                    <li className="no-review">리뷰가 없습니다.</li>
                )}
            </ul>
        </div>
    );
};

export default HotelReviews;
