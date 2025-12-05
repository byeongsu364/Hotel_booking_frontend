import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/components/search/HotelListCards.scss";
import { toggleWishlist, isWishlisted } from "../../util/wishlistService";

const HotelListCards = ({ hotels = [] }) => {
    const navigate = useNavigate();

    // ⭐ 처음에는 6개만 표시
    const [visibleCount, setVisibleCount] = useState(6);

    // ⭐ 현재 보여줄 호텔 목록
    const visibleHotels = hotels.slice(0, visibleCount);

    if (!hotels || hotels.length === 0) {
        return (
            <div className="hotel-list-cards empty">
                호텔을 찾을 수 없습니다.
            </div>
        );
    }

    return (
        <div className="hotel-list-cards">
            {visibleHotels.map((hotel) => {
                const mainRoom =
                    hotel.rooms && hotel.rooms.length > 0 ? hotel.rooms[0] : {};

                const price = mainRoom?.price ?? null;
                const amenitiesCount = mainRoom?.amenities?.length || 0;

                const [liked, setLiked] = useState(
                    isWishlisted(hotel._id || hotel.id)
                );

                const handleWishlist = (e) => {
                    e.stopPropagation();
                    const result = toggleWishlist(hotel);
                    setLiked(result);
                };

                return (
                    <div
                        key={hotel.id}
                        className="hotel-card"
                        onClick={() => navigate(`/hotels/${hotel.id}`)}
                    >
                        <div className="hotel-image">
                            <img src={hotel.image} alt={hotel.name} />
                            {hotel.imageCount && (
                                <div className="image-count">
                                    {hotel.imageCount} images
                                </div>
                            )}
                        </div>

                        <div className="hotel-info">
                            <div className="hotel-header">
                                <h3 className="hotel-name">{hotel.name}</h3>

                                <div className="hotel-price">
                                    <div className="price-label">starting from</div>
                                    <div className="price-amount">
                                        최저가{" "}
                                        <span>
                                            {price
                                                ? `₩${price.toLocaleString()}/night`
                                                : "가격 정보 없음"}
                                        </span>
                                    </div>
                                    <div className="price-note">excl. tax</div>
                                </div>
                            </div>

                            <div className="hotel-location">{hotel.location}</div>

                            <div className="hotel-meta">
                                <div className="hotel-stars">
                                    {"⭐".repeat(hotel.stars || 0)} {hotel.stars} Star Hotel
                                </div>
                                <div className="hotel-amenities">
                                    🏨 {amenitiesCount}+ Amenities
                                </div>
                            </div>

                            <div className="hotel-rating">
                                <span className="rating-score">{hotel.rating}</span>
                                <span className="rating-label">{hotel.ratingLabel}</span>
                                <span className="rating-reviews">
                                    {hotel.reviews} reviews
                                </span>
                            </div>

                            <div className="card-divider"></div>

                            <div className="hotel-footer">
                                <button
                                    className="wishlist-button"
                                    onClick={handleWishlist}
                                >
                                    {liked ? "♥" : "♡"}
                                </button>

                                <button
                                    className="view-button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/hotels/${hotel.id}`);
                                    }}
                                >
                                    View Place
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* ⭐ 더보기는 아직 보이지 않은 호텔이 있을 때만 표시 */}
            {visibleCount < hotels.length && (
                <button
                    className="load-more"
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                >
                    Show more results
                </button>
            )}
        </div>
    );
};

export default HotelListCards;
