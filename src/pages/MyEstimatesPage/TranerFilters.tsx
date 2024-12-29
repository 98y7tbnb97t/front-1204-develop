import { FC, useEffect, useState } from "react";
import classNames from "classnames";
import { useAppSelector } from "../../hooks/redux";
import Input from "../../components/UI/Input";
import { IEstimate } from "../../models/IEstimate";
import { IGroup } from "../../models/response/IGroup";
import GroupsSearch from "../../components/Widgets/GroupsSearch";

enum Categories {
    AllEst = 'AllEst',
    CommonEst = 'CommonEst',
    TranerEst = 'TranerEst',
  }

const categoriesNames = {
  [Categories.AllEst]: {
    ru: "Все отзывы родителей",
    am: "Բոլոր ծնողների գնահատականները",
    en: "All parent reviews",
  },
  [Categories.CommonEst]: {
    ru: "Все отзывы родителей - для всех участников группы",
    am: "Բոլոր ծնողների գնահատականները՝ խմբի բոլոր մասնակիցների համար",
    en: "All parent reviews - for all group members",
  },
  [Categories.TranerEst]: {
    ru: "Все отзывы родителей - для тренера",
    am: "Բոլոր ծնողների գնահատականները՝ մարզչի համար",
    en: "All parent reviews - for the trainer",
  },
};

interface TranerFiltersProps {
  className?: string;
	setCurrentEstimates: (est: IEstimate[]) => void;
	searchQuery: string;
	setSearchQuery: (q: string) => void
}

const TranerFilters:FC<TranerFiltersProps> = ({ className, setCurrentEstimates, setSearchQuery, searchQuery }) => {
	const [categorie, setCategorie] = useState<Categories>(Categories.AllEst);
	const estimates = useAppSelector(state => state.EstimatesSlice.estimates);
	const user = useAppSelector(state => state.UserSlice.user);
	const language = useAppSelector(state => state.TranslateSlice.language);
  const [groupSearch, setGroupSearch] = useState<IGroup>(); 
	const [dropdown, setDropDown] = useState<boolean>(false);
	useEffect(() => {
      const estFiltered = estimates
        .filter(est => !groupSearch || groupSearch._id === (est.group as unknown as IGroup)._id);
			const getCurrentEstimates = () => {
					switch (categorie) {
					case Categories.AllEst:
						return estFiltered;
					case Categories.CommonEst:
						return estFiltered.map((est) => ({
							...est,
							reviews: est.reviews.filter((rev) => rev.parentsCanSee),
						}));
					case Categories.TranerEst:
						return estFiltered.map((est) => ({
							...est,
							reviews: est.reviews.filter((rev) => rev.tranerCanSee),
						}));
					}
			};
			setCurrentEstimates(getCurrentEstimates());
			}, [categorie, setCurrentEstimates, estimates, user._id, groupSearch]);

  return (
    <div className={classNames('', {}, [className])}>
			<div className="flex gap-2 justify-center flex-wrap">
          {Object.values(Categories).map(cat => (
            <button
              key={cat}
              onClick={() => setCategorie(cat)}
              className={`px-4 py-2 rounded ${categorie === cat ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {categoriesNames[cat][language]}
            </button>
          ))}
        </div>
        <div className="flex gap-2 mt-2">
          <GroupsSearch dropdown={dropdown} setDropDown={setDropDown} placeholder="Найти группу" onChangeGroup={setGroupSearch}/>
          <Input
            type="search"
            placeholder="Найти комментарий"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
		</div>
  );
}

export default TranerFilters;