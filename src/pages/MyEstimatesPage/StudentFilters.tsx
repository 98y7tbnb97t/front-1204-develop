import { FC, useEffect, useState } from "react";
import classNames from "classnames";
import { useAppSelector } from "../../hooks/redux";
import { User } from "../../models/User";
import Input from "../../components/UI/Input";
import UsersSearch from "../../components/Widgets/UsersSearch";
import GroupsSearch from "../../components/Widgets/GroupsSearch";
import { UserRoles } from "../../utils/userRoles";
import { IEstimate } from "../../models/IEstimate";
import { IGroup } from "../../models/response/IGroup";

enum Categories {
    AllMyEst = 'AllMyEst',
    CommonEst = 'CommonEst',
    TranerEst = 'TranerEst',
    AdministrationEst = 'AdministrationEst',
    OtherParents = 'OtherParents'
  }
  
const categoriesNames = {
  [Categories.AllMyEst]: {
    ru: "Все мои отзывы",
    en: "All my reviews",
    am: "Իմ բոլոր գնահատականները"
  },
  [Categories.CommonEst]: {
    ru: "Все мои отзывы - для всех участников группы",
    en: "All my reviews - for all group members",
    am: "Իմ բոլոր գնահատականները՝ խմբի բոլոր մասնակիցների համար"
  },
  [Categories.TranerEst]: {
    ru: "Все мои отзывы - для тренера",
    en: "All my reviews - for the trainer",
    am: "Իմ բոլոր գնահատականները՝ մարզչի համար"
  },
  [Categories.AdministrationEst]: {
    ru: "Все мои отзывы - для ТОЛЬКО администрации школы",
    en: "All my reviews - ONLY for the school administration",
    am: "Իմ բոլոր գնահատականները՝ ՄԻԱՅՆ դպրոցի ադմինիստրացիայի համար"
  },
  [Categories.OtherParents]: {
    ru: "Общедоступные отзывы других родителей, если они есть",
    en: "Public reviews from other parents, if available",
    am: "Հասանելի այլ ծնողների հանրային գնահատականները, եթե կան"
  },
};

interface StudentFiltersProps {
  className?: string;
	setCurrentEstimates: (est: IEstimate[]) => void;
	searchQuery: string;
	setSearchQuery: (q: string) => void
}

const StudentFilters:FC<StudentFiltersProps> = ({ className, setCurrentEstimates, setSearchQuery, searchQuery }) => {
	const [categorie, setCategorie] = useState<Categories>(Categories.AllMyEst);
	const estimates = useAppSelector(state => state.EstimatesSlice.estimates);
	const [tranerSearch, setTranerSearch] = useState<User>(); 
  const [groupSearch, setGroupSearch] = useState<IGroup>(); 
	const [dropdown, setDropDown] = useState<boolean>(false);
	const user = useAppSelector(state => state.UserSlice.user);
	const language = useAppSelector(state => state.TranslateSlice.language);
	useEffect(() => {
			const estFiltered = estimates.filter(
					(est) => !tranerSearch || tranerSearch._id === est.traner._id
			)
      .filter(est => !groupSearch || groupSearch._id === (est.group as unknown as IGroup)._id);
			const getCurrentEstimates = () => {
					switch (categorie) {
					case Categories.AllMyEst:
						return estFiltered.map((est) => ({
							...est,
							reviews: est.reviews.filter((rev) => rev.from._id === user._id),
						}));
					case Categories.CommonEst:
						return estFiltered.map((est) => ({
							...est,
							reviews: est.reviews.filter((rev) => rev.from._id === user._id && rev.parentsCanSee),
						}));
					case Categories.AdministrationEst:
						return estFiltered.map((est) => ({
							...est,
							reviews: est.reviews.filter((rev) => rev.from._id === user._id && !rev.parentsCanSee && !rev.tranerCanSee),
						}));
					case Categories.TranerEst:
						return estFiltered.map((est) => ({
							...est,
							reviews: est.reviews.filter((rev) => rev.from._id === user._id && rev.tranerCanSee),
						}));
					case Categories.OtherParents:
						return estFiltered.map((est) => ({
							...est,
							reviews: est.reviews.filter((rev) => rev.from._id !== user._id && rev.parentsCanSee),
						}));
					}
			};
			setCurrentEstimates(getCurrentEstimates());
			}, [categorie, setCurrentEstimates, estimates, user._id, tranerSearch, groupSearch]);

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
          {
            [Categories.CommonEst, Categories.AdministrationEst, Categories.TranerEst].includes(categorie) &&
            [UserRoles.DIRECTOR, UserRoles.ZDIRECTOR].includes(user.role) &&
            <UsersSearch dropdown={dropdown} setDropDown={setDropDown} role={UserRoles.TRANER} placeholder="Найти тренера" onChangeUser={setTranerSearch}/>
          }
          <GroupsSearch className="ml-2" dropdown={dropdown} setDropDown={setDropDown} placeholder="Найти группу" onChangeGroup={setGroupSearch}/>
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

export default StudentFilters;