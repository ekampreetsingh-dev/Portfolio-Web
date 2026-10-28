import { RIBBON } from "../data";

export function Ribbon() {
  return (
    <div className="ribbon-wrap" aria-hidden="true">
      <div className="ribbon">
        <div className="ribbon-track">
          {[0, 1].map((group) => (
            <div className="ribbon-group" key={group}>
              {RIBBON.map((item) => (
                <span className="ribbon-item" key={`${group}-${item}`}>
                  {item}
                  <span className="ribbon-star">✶</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
