import { memo, useEffect } from 'react';
import { connect } from 'react-redux'
import Loading from '../../components/loading';
import { forceCheck } from 'react-lazyload';
import * as actionTypes from './store/actionCreator';
import Slider from '../../components/slider';
import Scroll from '../../components/scroll/index';
import RecommendList from '../../components/list';
import { Content } from './style';

function Recommend(props) {
    const { bannerlist, recommendList, enterLoading } = props;
    const { getBannerDataDispath, getRecommendListDataDispatch } = props;
    useEffect(() => {
        if(!bannerlist.size) {
            getBannerDataDispath();
        }
        if(!recommendList.size) {
            getRecommendListDataDispatch();
        }
    }, [])
    const bannerListJS = bannerlist ? bannerlist.toJS() : [];
    const recommendListJS = recommendList ? recommendList.toJS() : [];
    return (
        <Content>
            <Scroll className="list" onScroll={forceCheck}>
                <div>
                    <Slider bannerlist={bannerListJS}></Slider>
                    <RecommendList recommendList={recommendListJS}></RecommendList>
                </div>
            </Scroll>
            { enterLoading ? <Loading></Loading> : null }
        </Content>
    )
}
const mapStateToProps = (state) => {
    return {
        bannerlist: state.getIn(['recommend', 'bannerList']),
        recommendList: state.getIn(['recommend', 'recommendList']),
        enterLoading: state.getIn(['recommend', 'enterLoading'])
    }
};
const mapDispathToProps = (dispath) => {
    return {
        getBannerDataDispath() {
            dispath(actionTypes.getBannerList());
        },
        getRecommendListDataDispatch() {
            dispath(actionTypes.getRecommendList());
        }
    }
}
export default connect(mapStateToProps, mapDispathToProps)(memo(Recommend))